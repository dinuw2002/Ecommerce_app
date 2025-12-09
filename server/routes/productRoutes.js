const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Product = require('../models/ProductModel');
const { protectAdmin } = require('../middleware/adminMiddleware');

// ----------------------------------------------------------------------
// --- PUBLIC ROUTES (Accessible by everyone) ---
// ----------------------------------------------------------------------

// @desc    GET all products (Supports Search Query)
// @route   GET /api/products?keyword=iphone
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    // 1. Build the search object based on the URL query
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword, // Partial match (e.g. "pho" matches "iPhone")
            $options: 'i',             // Case insensitive
        },
    } : {};

    // 2. Find products using the keyword filter (or find all if empty)
    const products = await Product.find({ ...keyword });
    res.json(products);
}));

// @desc    GET product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
}));


// ----------------------------------------------------------------------
// --- PROTECTED ADMIN ROUTES (Requires JWT + isAdmin) ---
// ----------------------------------------------------------------------

// @desc    Create a new product (Manual Entry)
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protectAdmin, asyncHandler(async (req, res) => {
    const { name, price, description, imageUrl, category, countInStock } = req.body;

    // Create a new product instance with the data sent from frontend
    const product = new Product({
        name,
        price,
        description,
        imageUrl,
        category,
        countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
}));

// @desc    Update an existing product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protectAdmin, asyncHandler(async (req, res) => {
    const { name, price, description, imageUrl, countInStock, category } = req.body;
    
    const product = await Product.findById(req.params.id);

    if (product) {
        // Update fields if they exist in the request, otherwise keep old value
        product.name = name || product.name;
        product.price = price !== undefined ? price : product.price;
        product.description = description || product.description;
        product.imageUrl = imageUrl || product.imageUrl;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.category = category || product.category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
}));

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protectAdmin, asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne(); 
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
}));

module.exports = router;
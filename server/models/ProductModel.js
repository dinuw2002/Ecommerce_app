const mongoose = require('mongoose');

// Define the structure of a single product document
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true, // Product names should ideally be unique
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        // Optional: Adding a rating/review field shows complexity
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true, // Mongoose automatically adds 'createdAt' and 'updatedAt' fields
    }
);

// Export the model so it can be used in your controllers/routes
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const generateToken = require('../utils'); // Import the token generator

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user (the password will be hashed by the pre-save hook!)
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({ // 201 means 'Created'
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // Send the JWT token
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check if user exists AND if the password matches the hashed password
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // Send the JWT token
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' }); // 401 means 'Unauthorized'
    }
});

module.exports = router;
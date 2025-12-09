const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel'); // Import User Model to fetch details

// Middleware to check if the user is authenticated and is an admin
const protectAdmin = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with 'Bearer'
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (it comes as 'Bearer TOKEN')
            token = req.headers.authorization.split(' ')[1];

            // Verify token and get user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user from DB using the ID in the token, but exclude password
            const user = await User.findById(decoded.id).select('-password');

            if (user && user.isAdmin) {
                req.user = user; // Attach the user object to the request
                next(); // Allow the request to proceed
            } else {
                res.status(401); // 401: Unauthorized
                throw new Error('Not authorized as an admin.');
            }
        } catch (error) {
            console.error('Admin Check Failed:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed.');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token.');
    }
});

module.exports = { protectAdmin };
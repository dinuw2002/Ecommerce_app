const jwt = require('jsonwebtoken');

// Utility function to generate a JWT token
const generateToken = (id) => {
    // Creates the token, signing it with the user's MongoDB ID
    // Uses a secret key from the .env file (WE MUST ADD THIS NEXT!)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires after 30 days
    });
};

module.exports = generateToken;
const errorHandler = (err, req, res, next) => {
    // Check if the status code is a 200 (OK), if so, set it to 500 (Internal Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        // Only include stack trace if not in production (good for debugging)
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, 
    });
};

module.exports = errorHandler;
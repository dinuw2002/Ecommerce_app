const notFound = (req, res, next) => {
    // Creates a new Error object indicating the requested URL was not found
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Passes the error to the next middleware (our errorHandler)
};

module.exports = notFound;
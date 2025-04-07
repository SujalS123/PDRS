/**
 * Error Handling Middleware
 * 
 * This middleware provides centralized error handling for the application.
 * It catches all errors, processes them based on their type, and returns
 * appropriate error responses. In development mode, it also includes
 * stack traces for debugging.
 * 
 * @module middleware/errorHandler
 */

/**
 * Error handling middleware function
 * 
 * @function errorMiddleware
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 * 
 * @example
 * // Throwing errors in routes/controllers
 * throw new Error('Something went wrong');
 * 
 * // Custom error with status code
 * const err = new Error('Not found');
 * err.statusCode = 404;
 * throw err;
 */
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    // Default error status and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(error => error.message).join(', ');
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    } else if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorMiddleware; 
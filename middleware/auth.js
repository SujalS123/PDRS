/**
 * Authentication Middleware
 * 
 * This middleware handles JWT token verification and user authentication.
 * It extracts the JWT token from the Authorization header, verifies it,
 * and attaches the decoded user information to the request object.
 * 
 * @module middleware/auth
 * @requires jsonwebtoken
 */

const jwt = require('jsonwebtoken');

/**
 * Authentication middleware function
 * 
 * @function authMiddleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 * 
 * @example
 * // Usage in routes
 * router.get('/protected-route', authMiddleware, (req, res) => {
 *   // Access user data
 *   const userId = req.userId;
 *   const user = req.user;
 * });
 */
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store the entire decoded token
        req.userId = decoded.userId; // Also store userId for convenience
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware; 
// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization']; // standard way
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.startsWith("Bearer ") 
        ? authHeader.slice(7) // remove 'Bearer ' prefix
        : authHeader;

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach payload to request
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

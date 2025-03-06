const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.header('Authorization');

        // Support token from HTTP-only cookies
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        // Validate if token exists
        if (!token) {
            return res.status(401).json({ message: '❌ No token, authorization denied' });
        }

        // Remove "Bearer " prefix if present
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trim();
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: '❌ Invalid token' });
        }

        // Fetch user and attach to request
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: '❌ User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: '⏳ Token expired, please login again' });
        }
        res.status(401).json({ message: '❌ Unauthorized' });
    }
};

module.exports = authMiddleware;


const jwt = require('jsonwebtoken');
const Facility = require('../models/Facility');

// ─────────────────────────────────────────────────────────────────────────────
// Middleware: protect
// Verifies the JWT from the Authorization header and attaches the facilityId
// to req so downstream route handlers can identify the current user.
//
// Usage: router.get('/protected', protect, handler)
// Header format: Authorization: Bearer <token>
// ─────────────────────────────────────────────────────────────────────────────
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Bu işlem için giriş yapmanız gerekiyor.',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.facilityId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.',
        });
    }
};

/**
 * maybeProtect
 * Extracts facilityId if token is present, but doesn't block if missing.
 */
const maybeProtect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.facilityId = decoded.id;
        } catch (err) {
            // Silently ignore invalid tokens for "maybe" protect
        }
    }
    next();
};

module.exports = { protect, maybeProtect };

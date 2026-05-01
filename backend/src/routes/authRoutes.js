const express  = require('express');
const jwt       = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const Facility  = require('../models/Facility');

const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// Rate Limiters
//
// loginLimiter    — protects against brute-force password attacks
//                   max 10 attempts per IP in a 15-minute window
//
// registerLimiter — protects against automated account creation spam
//                   max 5 registrations per IP in a 1-hour window
// ─────────────────────────────────────────────────────────────────────────────

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,   // 15 minutes
    max: 10,                     // max 10 login attempts per window per IP
    standardHeaders: true,       // send RateLimit-* headers (RFC 6585)
    legacyHeaders: false,        // disable X-RateLimit-* headers
    message: {
        success: false,
        message: 'Çok fazla giriş denemesi yapıldı. Lütfen 15 dakika sonra tekrar deneyin.',
    },
    skipSuccessfulRequests: true, // successful logins don't count toward the limit
});

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,   // 1 hour
    max: 5,                      // max 5 registrations per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Bu IP adresinden çok fazla kayıt denemesi yapıldı. Lütfen 1 saat sonra tekrar deneyin.',
    },
});

// ─── Helper: sign a JWT for a facility ──────────────────────────────────────
const signToken = (facilityId) => {
    return jwt.sign(
        { id: facilityId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
};

const facilityPayload = (facility) => ({
    _id:           facility._id,
    name:          facility.name,
    email:         facility.email,
    role:          facility.role,
    type:          facility.type,
    region:        facility.region,
    sector:        facility.sector,
    location:      facility.location,
    wasteProduced: facility.wasteProduced,
    resourceNeeded: facility.resourceNeeded,
});


// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/register
// @desc    Register a new facility (= create a new account)
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
router.post('/register', registerLimiter, async (req, res) => {
    try {
        const { name, email, password, type, region, sector, location } = req.body;

        // 1. Check duplicate email
        const existing = await Facility.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Bu e-posta adresiyle zaten bir hesap mevcut.',
            });
        }

        // 2. Create the facility — password is hashed automatically by the pre-save hook
        const facility = await Facility.create({
            name,
            email,
            password,
            type:   type   || 'Factory',
            region: region || 'Marmara',
            sector: sector || '',
            location: location || {},
        });

        // 3. Sign JWT
        const token = signToken(facility._id);

        res.status(201).json({
            success: true,
            token,
            facility: facilityPayload(facility),
        });
    } catch (err) {
        // Mongoose validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: err.message });
    }
});


// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/login
// @desc    Login with email + password, returns JWT
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
router.post('/login', loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Basic input check
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Lütfen e-posta ve şifrenizi girin.',
            });
        }

        // 2. Find facility — explicitly select password (select: false means it's excluded by default)
        const facility = await Facility.findOne({ email: email.toLowerCase().trim() }).select('+password');
        if (!facility || !facility.password) {
            return res.status(401).json({
                success: false,
                message: 'Geçersiz e-posta veya şifre.',
            });
        }

        // 3. Compare passwords
        const isMatch = await facility.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Geçersiz e-posta veya şifre.',
            });
        }

        // 4. Sign JWT
        const token = signToken(facility._id);

        res.json({
            success: true,
            token,
            facility: facilityPayload(facility),
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/auth/me
// @desc    Get the currently logged-in facility (token required)
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const protect = require('../middlewares/authMiddleware');

router.get('/me', protect, async (req, res) => {
    try {
        const facility = await Facility.findById(req.facilityId);
        if (!facility) {
            return res.status(404).json({ success: false, message: 'Facility not found' });
        }
        res.json({ success: true, facility: facilityPayload(facility) });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   PUT /api/auth/me
// @desc    Update the currently logged-in facility's profile info OR password.
//
//   Profile fields : name, email, type, region, sector  (any subset)
//   Password change: currentPassword + newPassword       (both required together)
//
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
router.put('/me', protect, async (req, res) => {
    try {
        const { name, email, type, region, sector, currentPassword, newPassword } = req.body;

        const facility = await Facility.findById(req.facilityId).select('+password');
        if (!facility) {
            return res.status(404).json({ success: false, message: 'Tesis bulunamadı.' });
        }

        // ── Password change path ──────────────────────────────────────────────
        if (currentPassword || newPassword) {
            // Both fields are required when changing password
            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Şifre değiştirmek için mevcut şifre ve yeni şifre gereklidir.',
                });
            }
            if (newPassword.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Yeni şifre en az 6 karakter olmalıdır.',
                });
            }

            // Verify the current password
            const isMatch = await facility.comparePassword(currentPassword);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Mevcut şifreniz hatalı.',
                });
            }

            facility.password = newPassword; // pre-save hook will hash it
        }

        // ── Profile info update path ──────────────────────────────────────────
        if (name  !== undefined) facility.name   = name.trim();
        if (email !== undefined) {
            // Check if new email is already taken by another facility
            if (email.toLowerCase() !== facility.email) {
                const existing = await Facility.findOne({
                    email: email.toLowerCase().trim(),
                    _id:   { $ne: facility._id },
                });
                if (existing) {
                    return res.status(400).json({
                        success: false,
                        message: 'Bu e-posta adresi zaten başka bir hesap tarafından kullanılıyor.',
                    });
                }
            }
            facility.email = email.toLowerCase().trim();
        }
        if (type   !== undefined) facility.type   = type;
        if (region !== undefined) facility.region = region;
        if (sector !== undefined) facility.sector = sector;

        await facility.save();

        res.json({ success: true, facility: facilityPayload(facility) });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: err.message });
    }
});


module.exports = router;

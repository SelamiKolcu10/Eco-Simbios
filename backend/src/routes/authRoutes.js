const express = require('express');
const jwt = require('jsonwebtoken');
const Facility = require('../models/Facility');

const router = express.Router();

// ─── Helper: sign a JWT for a facility ──────────────────────────────────────
const signToken = (facilityId) => {
    return jwt.sign(
        { id: facilityId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
};

// ─── Helper: build safe facility payload (no password) ──────────────────────
const facilityPayload = (facility) => ({
    _id:           facility._id,
    name:          facility.name,
    email:         facility.email,
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
router.post('/register', async (req, res) => {
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
router.post('/login', async (req, res) => {
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


module.exports = router;

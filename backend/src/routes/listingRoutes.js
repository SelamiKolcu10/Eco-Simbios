const express = require('express');
const Listing = require('../models/Listing');
const Facility = require('../models/Facility');
const protect = require('../middlewares/authMiddleware');
const { calculateMatchScore } = require('../utils/aiMatcher');

const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/listings
// @desc    Get all active listings
// @access  Public (or could be Private, depending on requirements)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const { category, type } = req.query;
        let query = {};
        
        if (category) query.category = category;
        if (type) query.type = type;

        // Fetch listings, sorting descending by creation, and eagerly loading the owner info
        const listings = await Listing.find(query)
            .populate('createdBy', 'name type region location sector')
            .sort({ createdAt: -1 });
            
        res.status(200).json({ success: true, data: listings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/listings
// @desc    Create a new listing
// @access  Private (Authentication Required)
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', protect, async (req, res) => {
    try {
        const { wasteType, amount, energyValue, description, status, type, category } = req.body;

        // Create new listing using the logged-in user's facility ID
        const listing = await Listing.create({
            wasteType,
            amount,
            energyValue,
            description,
            status: status || 'active',
            type, // adding extra fields dynamically handled by schema flexibility/adjustments
            category,
            createdBy: req.facilityId
        });

        // Populate so caller has fresh object with owner info immediately
        await listing.populate('createdBy', 'name type region location sector');

        res.status(201).json({ success: true, data: listing });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/listings/:id/matches
// @desc    Find synergistic facility matches for a specific listing
// @access  Public or Private
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id/matches', async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('createdBy');
        if (!listing) return res.status(404).json({ success: false, message: 'İlan bulunamadı.' });

        const ownerFacility = listing.createdBy;
        if (!ownerFacility) return res.status(400).json({ success: false, message: 'İlanın sahibi tesis bulunamadı.' });

        // 1. Find all other facilities in the database EXCEPT the source facility
        let potentialPartners = await Facility.find({
            _id: { $ne: ownerFacility._id }
        });

        const matches = [];

        // 2. Evaluate each potential partner using the analytical engine
        for (let partner of potentialPartners) {
            const { score, distance } = calculateMatchScore(listing, partner, ownerFacility);

            if (score >= 40) {
                matches.push({
                    partner: {
                        _id: partner._id,
                        name: partner.name,
                        type: partner.type,
                        region: partner.region,
                        sector: partner.sector
                    },
                    matchScore: score,
                    distance: distance,
                    reasoning: `Bölgesel ve sektörel uyum analizi tamamlandı.`
                });
            }
        }

        // Sort by score descending
        matches.sort((a, b) => b.matchScore - a.matchScore);

        // Return top 3 matches
        res.status(200).json({ success: true, data: matches.slice(0, 3) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

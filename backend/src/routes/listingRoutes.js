const express = require('express');
const Listing = require('../models/Listing');
const Facility = require('../models/Facility');
const protect = require('../middlewares/authMiddleware');
const { calculateMatchScore } = require('../utils/aiMatcher');
const Notification = require('../models/Notification');
const Match = require('../models/Match');

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

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/listings/my
// @desc    Get all listings belonging to the currently logged-in facility
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
router.get('/my', protect, async (req, res) => {
    try {
        const listings = await Listing.find({ createdBy: req.facilityId })
            .populate('createdBy', 'name type region location sector')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: listings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   PATCH /api/listings/:id/status
// @desc    Update the status of a listing (active → matched / closed)
// @access  Private — only the owner of the listing can change its status
// ─────────────────────────────────────────────────────────────────────────────
router.patch('/:id/status', protect, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, message: 'İlan bulunamadı.' });
        }

        // Ownership check — only the creator can update
        if (listing.createdBy.toString() !== req.facilityId) {
            return res.status(403).json({
                success: false,
                message: 'Bu ilanı güncelleme yetkiniz yok.',
            });
        }

        const { status } = req.body;
        const allowed = ['active', 'matched', 'closed'];
        if (!allowed.includes(status)) {
            return res.status(400).json({ success: false, message: 'Geçersiz durum değeri.' });
        }

        listing.status = status;
        await listing.save();

        await listing.populate('createdBy', 'name type region location sector');
        res.status(200).json({ success: true, data: listing });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/listings/:id/match
// @desc    Initiate a match with a listing (creates notification for owner)
// @access  Private — any logged-in facility can initiate
// ─────────────────────────────────────────────────────────────────────────────
router.post('/:id/match', protect, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, message: 'İlan bulunamadı.' });
        }

        // Prevent matching with your own listing
        if (listing.createdBy.toString() === req.facilityId) {
            return res.status(400).json({ success: false, message: 'Kendi ilanınızla eşleşemezsiniz.' });
        }

        // Find the facility that initiated the match
        const initiator = await Facility.findById(req.facilityId);

        // Update listing status
        listing.status = 'matched';
        await listing.save();

        // Create a notification for the listing owner
        await Notification.create({
            recipient: listing.createdBy,
            type: 'match',
            message: `${initiator.name} tesisinden ilanınız için eşleşme sağlandı!`,
            relatedId: listing._id
        });

        // 3. Create a Match record for history
        await Match.create({
            fromFacility: req.facilityId,
            toListing: listing._id
        });

        res.status(200).json({ success: true, message: 'Eşleşme başarıyla sağlandı ve ilan sahibine bildirildi.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   DELETE /api/listings/:id
// @desc    Delete a listing permanently
// @access  Private — only the owner of the listing can delete it
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, message: 'İlan bulunamadı.' });
        }

        // Ownership check — only the creator can delete
        if (listing.createdBy.toString() !== req.facilityId) {
            return res.status(403).json({
                success: false,
                message: 'Bu ilanı silme yetkiniz yok.',
            });
        }

        await listing.deleteOne();
        res.status(200).json({ success: true, message: 'İlan başarıyla silindi.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

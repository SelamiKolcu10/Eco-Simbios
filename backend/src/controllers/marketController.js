const MarketItem = require('../models/MarketItem');
const Listing = require('../models/Listing');
const Facility = require('../models/Facility');
const { evaluateMatch, calculateMatchScore } = require('../utils/aiMatcher');

// @desc    Get all market opportunities
// @route   GET /api/market
// @access  Public
exports.getMarketItems = async (req, res, next) => {
    try {
        const items = await MarketItem.find();

        res.status(200).json({
            success: true,
            count: items.length,
            data: items,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a new market opportunity (Runs AI Matcher automatically)
// @route   POST /api/market
// @access  Private (Needs auth later)
exports.createMarketItem = async (req, res, next) => {
    try {
        const { material, source, buyer, income } = req.body;

        // AI matching logic kicks in
        const aiScore = calculateMatchScore(material, buyer);

        const newItem = await MarketItem.create({
            material,
            source,
            buyer,
            income,
            matchScore: aiScore
        });

        res.status(201).json({
            success: true,
            data: newItem,
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Find top AI synergies for a listing
// @route   GET /api/market/synergies/:listingId
// @access  Public (or Private depending on route setup)
exports.findSynergies = async (req, res, next) => {
    try {
        const { listingId } = req.params;
        const requestedAmount = req.query.requestedAmount || req.body.requestedAmount;

        const listing = await Listing.findById(listingId).populate('createdBy');
        if (!listing) {
            return res.status(404).json({ success: false, error: 'Listing not found' });
        }

        const facilities = await Facility.find();
        let matches = [];

        for (const facility of facilities) {
            // Do not match the facility with itself
            if (listing.createdBy && facility._id.toString() === listing.createdBy._id.toString()) {
                continue;
            }

            const matchResult = evaluateMatch(listing, facility, requestedAmount);

            if (matchResult.isMatch && matchResult.matchScore > 0) {
                matches.push({
                    facility,
                    matchData: matchResult,
                });
            }
        }

        matches.sort((a, b) => b.matchData.matchScore - a.matchData.matchScore);
        const topMatches = matches.slice(0, 5);

        res.status(200).json({
            success: true,
            count: topMatches.length,
            data: topMatches,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

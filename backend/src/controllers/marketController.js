const MarketItem = require('../models/MarketItem');
const { calculateMatchScore } = require('../utils/aiMatcher');

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

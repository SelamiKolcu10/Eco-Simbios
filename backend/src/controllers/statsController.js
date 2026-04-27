const Listing = require('../models/Listing');

// @route   GET /api/stats/summary
// @desc    Get dashboard KPIs for the logged-in user
// @access  Private
exports.getSummary = async (req, res) => {
    try {
        const facilityId = req.facilityId;

        // Fetch all listings created by the user
        const listings = await Listing.find({ createdBy: facilityId });

        let activeListingsCount = 0;
        let matchedListingsCount = 0;
        let totalWasteProcessed = 0; // in tons
        let totalCarbonSaved = 0; // estimate

        // Constant multiplier: 1 ton of waste processed = ~2.3 tons of CO2 saved (average industrial estimate)
        const CO2_MULTIPLIER = 2.3;

        listings.forEach(listing => {
            if (listing.status === 'active') {
                activeListingsCount++;
            } else if (listing.status === 'matched') {
                matchedListingsCount++;
                totalWasteProcessed += (listing.tons || 0);
                totalCarbonSaved += (listing.tons || 0) * CO2_MULTIPLIER;
            }
        });

        res.status(200).json({
            success: true,
            data: {
                activeListingsCount,
                matchedListingsCount,
                totalWasteProcessed,
                totalCarbonSaved: Math.round(totalCarbonSaved * 10) / 10 // Round to 1 decimal
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

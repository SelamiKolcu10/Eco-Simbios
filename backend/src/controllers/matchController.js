const Match = require('../models/Match');
const Listing = require('../models/Listing');

// @route   GET /api/matches/history
// @desc    Get match history for the logged-in user (both initiated and received)
// @access  Private
exports.getMatchHistory = async (req, res) => {
    try {
        const facilityId = req.facilityId;

        // Find matches where the user is either the initiator (fromFacility)
        // OR the listing owner (toListing -> createdBy)
        
        // Step 1: Find matches initiated by this facility
        const initiatedMatches = await Match.find({ fromFacility: facilityId })
            .populate({
                path: 'toListing',
                populate: { path: 'createdBy', select: 'name' }
            })
            .sort({ createdAt: -1 });

        // Step 2: Find matches received (someone matched with my listing)
        // We first need to find all listings owned by this facility
        const myListingIds = await Listing.find({ createdBy: facilityId }).distinct('_id');
        const receivedMatches = await Match.find({ toListing: { $in: myListingIds } })
            .populate('fromFacility', 'name type region')
            .populate('toListing')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: {
                initiated: initiatedMatches,
                received: receivedMatches
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

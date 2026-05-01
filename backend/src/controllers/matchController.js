const Match = require('../models/Match');
const Listing = require('../models/Listing');
const Facility = require('../models/Facility');

// @route   GET /api/matches/history
// @desc    Get match history for the logged-in user (both initiated and received, or all for admin)
// @access  Private
exports.getMatchHistory = async (req, res) => {
    try {
        const facilityId = req.facilityId;
        const facility = await Facility.findById(facilityId);

        // If admin, return ALL matches globally
        if (facility && facility.role === 'admin') {
            const allMatches = await Match.find()
                .populate('fromFacility', 'name type region')
                .populate({
                    path: 'toListing',
                    populate: { path: 'createdBy', select: 'name type region' }
                })
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                data: {
                    all: allMatches,
                    initiated: [],
                    received: []
                }
            });
        }

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

exports.cleanupInvalidMatches = async (req, res) => {
    try {
        const matches = await Match.find()
            .populate('fromFacility')
            .populate({
                path: 'toListing',
                populate: { path: 'createdBy' }
            });
            
        let deletedCount = 0;
        const matchDetails = [];
        
        for (const match of matches) {
            const fromName = match.fromFacility?.name || 'Unknown';
            const ownerName = match.toListing?.createdBy?.name || 'Unknown';
            const fromId = match.fromFacility?._id?.toString() || match.fromFacility?.toString();
            const ownerId = match.toListing?.createdBy?._id?.toString() || match.toListing?.createdBy?.toString();
            
            const isSameId = fromId === ownerId;
            const isSameName = fromName !== 'Unknown' && fromName === ownerName;
            
            matchDetails.push({ 
                id: match._id, 
                fromName, 
                ownerName, 
                isSameId, 
                isSameName 
            });
            
            if (isSameId || isSameName) {
                await Match.findByIdAndDelete(match._id);
                deletedCount++;
            } else if (!match.toListing) {
                await Match.findByIdAndDelete(match._id);
                deletedCount++;
            }
        }

        res.status(200).json({ success: true, message: `Deleted ${deletedCount} invalid matches.`, matchDetails });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const Match = require('../models/Match');
const Listing = require('../models/Listing');
const Facility = require('../models/Facility');
const Transaction = require('../models/Transaction');
const Notification = require('../models/Notification');

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
                .populate('fromFacility', 'name type region email')
                .populate({
                    path: 'toListing',
                    populate: { path: 'createdBy', select: 'name type region email' }
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
                populate: { path: 'createdBy', select: 'name email' }
            })
            .sort({ createdAt: -1 });

        // Step 2: Find matches received (someone matched with my listing)
        // We first need to find all listings owned by this facility
        const myListingIds = await Listing.find({ createdBy: facilityId }).distinct('_id');
        const receivedMatches = await Match.find({ toListing: { $in: myListingIds } })
            .populate('fromFacility', 'name type region email')
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

// @route   PATCH /api/matches/:id/approve
// @desc    Admin approves a pending match — triggers listing status change, commission, notifications
// @access  Private (Admin only)
exports.approveMatch = async (req, res) => {
    try {
        const facility = await Facility.findById(req.facilityId);
        if (!facility || facility.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Bu işlem için yetkiniz yok.' });
        }

        const match = await Match.findById(req.params.id)
            .populate('fromFacility', 'name email')
            .populate({
                path: 'toListing',
                populate: { path: 'createdBy', select: 'name email subscription billing' }
            });

        if (!match) {
            return res.status(404).json({ success: false, message: 'Eşleşme bulunamadı.' });
        }

        if (match.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'Bu eşleşme zaten işlenmiş.' });
        }

        // 1. Approve the match
        match.status = 'approved';
        await match.save();

        // 2. Update listing status to matched
        const listing = await Listing.findById(match.toListing._id);
        if (listing) {
            listing.status = 'matched';
            await listing.save();
        }

        // 3. Calculate commission and create Transaction
        const sellerFacility = await Facility.findById(match.toListing.createdBy._id);
        const commissionRates = { free: 3, pro: 2, enterprise: 1 };
        const sellerPlan = sellerFacility?.subscription?.plan || 'free';
        const rate = commissionRates[sellerPlan];
        const estimatedValue = (listing?.amount || 0) * 2.5;
        const commissionAmount = estimatedValue * (rate / 100);

        await Transaction.create({
            match: match._id,
            seller: match.toListing.createdBy._id,
            buyer: match.fromFacility._id,
            listing: match.toListing._id,
            estimatedValue: Math.round(estimatedValue),
            commissionRate: rate,
            commissionAmount: Math.round(commissionAmount),
            sellerPlan,
            status: 'completed',
        });

        // Update seller billing
        if (sellerFacility) {
            sellerFacility.billing = sellerFacility.billing || { totalCommissionPaid: 0, totalTransactionValue: 0, transactionCount: 0 };
            sellerFacility.billing.totalCommissionPaid += Math.round(commissionAmount);
            sellerFacility.billing.totalTransactionValue += Math.round(estimatedValue);
            sellerFacility.billing.transactionCount += 1;
            await sellerFacility.save();
        }

        // 4. Notify both parties that match is approved + share emails
        const buyerEmail = match.fromFacility.email || 'Belirtilmemiş';
        const sellerEmail = match.toListing.createdBy.email || 'Belirtilmemiş';

        await Notification.create({
            recipient: match.fromFacility._id,
            type: 'match',
            message: `✅ Eşleşme onaylandı! ${match.toListing.createdBy.name} ile iletişime geçebilirsiniz: ${sellerEmail}`,
            relatedId: match.toListing._id
        });

        await Notification.create({
            recipient: match.toListing.createdBy._id,
            type: 'match',
            message: `✅ Eşleşme onaylandı! ${match.fromFacility.name} ile iletişime geçebilirsiniz: ${buyerEmail}`,
            relatedId: match.toListing._id
        });

        res.status(200).json({
            success: true,
            message: 'Eşleşme onaylandı ve her iki tarafa bildirim gönderildi.'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route   PATCH /api/matches/:id/reject
// @desc    Admin rejects a pending match
// @access  Private (Admin only)
exports.rejectMatch = async (req, res) => {
    try {
        const facility = await Facility.findById(req.facilityId);
        if (!facility || facility.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Bu işlem için yetkiniz yok.' });
        }

        const match = await Match.findById(req.params.id)
            .populate('fromFacility', 'name')
            .populate({
                path: 'toListing',
                populate: { path: 'createdBy', select: 'name' }
            });

        if (!match) {
            return res.status(404).json({ success: false, message: 'Eşleşme bulunamadı.' });
        }

        if (match.status !== 'pending') {
            return res.status(400).json({ success: false, message: 'Bu eşleşme zaten işlenmiş.' });
        }

        match.status = 'rejected';
        await match.save();

        // Notify both parties
        await Notification.create({
            recipient: match.fromFacility._id,
            type: 'system',
            message: `❌ Eşleşme talebiniz yönetici tarafından reddedildi.`,
            relatedId: match.toListing._id
        });

        await Notification.create({
            recipient: match.toListing.createdBy._id,
            type: 'system',
            message: `❌ ${match.fromFacility.name} ile olan eşleşme talebi yönetici tarafından reddedildi.`,
            relatedId: match.toListing._id
        });

        res.status(200).json({
            success: true,
            message: 'Eşleşme talebi reddedildi.'
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

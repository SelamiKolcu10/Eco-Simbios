const express = require('express');
const Listing = require('../models/Listing');
const Facility = require('../models/Facility');
const { protect } = require('../middlewares/authMiddleware');
const { evaluateMatch } = require('../utils/aiMatcher');
const Notification = require('../models/Notification');
const Match = require('../models/Match');
const Transaction = require('../models/Transaction');

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
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id/matches', protect, async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('createdBy');
        if (!listing) return res.status(404).json({ success: false, message: 'İlan bulunamadı.' });

        const ownerFacility = listing.createdBy;
        if (!ownerFacility) return res.status(400).json({ success: false, message: 'İlanın sahibi tesis bulunamadı.' });

        const currentFacilityId = req.facilityId;
        const currentFacility = await Facility.findById(currentFacilityId);

        if (ownerFacility._id.toString() === currentFacilityId) {
            // İlan sahibi kendi ilanına "Eşleşme Bul" dediyse sistemdeki herkesi tara
            let potentialPartners = await Facility.find({ _id: { $ne: ownerFacility._id } });
            const matches = [];

            for (let partner of potentialPartners) {
                const { matchScore, isMatch, distanceKm, reason } = evaluateMatch(listing, partner);
                if (isMatch && matchScore >= 40) {
                    matches.push({
                        partner: {
                            _id: partner._id,
                            name: partner.name,
                            type: partner.type,
                            region: partner.region,
                            sector: partner.sector
                        },
                        matchScore: matchScore,
                        distance: distanceKm,
                        reasoning: reason || `Bölgesel ve sektörel uyum analizi tamamlandı.`
                    });
                }
            }
            matches.sort((a, b) => b.matchScore - a.matchScore);
            return res.status(200).json({ success: true, data: matches.slice(0, 3) });
        } else {
            // Başka bir tesis, başkasının ilanına "Sinerji Bul" dediyse sadece kendi tesisini analiz et
            const { matchScore, isMatch, distanceKm, reason } = evaluateMatch(listing, currentFacility);
            
            const matchData = {
                partner: {
                    _id: currentFacility._id,
                    name: currentFacility.name,
                    type: currentFacility.type,
                    region: currentFacility.region,
                    sector: currentFacility.sector
                },
                matchScore: matchScore > 0 ? matchScore : 35, // Minimum bir skor göster ki heves kırılmasın
                distance: distanceKm,
                reasoning: isMatch ? reason : "Sektörel olarak tam eşleşmese de, lojistik ve işbirliği potansiyeli mevcut."
            };

            return res.status(200).json({ success: true, data: [matchData] });
        }

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

        const { partnerId } = req.body; 
        
        let buyerFacilityId;
        let notificationRecipientId;
        let notificationMessage;
        let initiatorName;

        if (listing.createdBy.toString() === req.facilityId) {
            // İlan sahibi kendi ilanından bir partner seçti
            if (!partnerId) {
                return res.status(400).json({ success: false, message: 'Kendi ilanınızla eşleşemezsiniz. Lütfen listeden bir partner seçin.' });
            }
            buyerFacilityId = partnerId; // Eşleşilen partner
            notificationRecipientId = partnerId; // Bildirim partnere gidecek
            
            const ownerFacility = await Facility.findById(req.facilityId);
            initiatorName = ownerFacility.name;
            notificationMessage = `${ownerFacility.name} tesisi, bir ilanı için sizinle sinerji sağladı!`;
            
        } else {
            // Başka bir tesis (Alıcı) ilana başvurdu
            buyerFacilityId = req.facilityId; 
            notificationRecipientId = listing.createdBy.toString(); // Bildirim ilan sahibine gidecek
            
            const buyerFacility = await Facility.findById(req.facilityId);
            initiatorName = buyerFacility.name;
            notificationMessage = `${buyerFacility.name} tesisi ilanınızla sinerji sağladı!`;
        }

        // Update listing status to pending (waiting for admin approval)
        listing.status = 'active'; // stays active until admin approves
        await listing.save();

        // Create a notification for the recipient
        await Notification.create({
            recipient: notificationRecipientId,
            type: 'match',
            message: `${initiatorName} tesisi ilanınızla eşleşme talebinde bulundu. Yönetici onayı bekleniyor.`,
            relatedId: listing._id
        });

        // Broadcast notification to all admins — they need to approve
        const adminFacilities = await Facility.find({ role: 'admin' });
        if (adminFacilities.length > 0) {
            const adminNotifications = adminFacilities.map(f => ({
                recipient: f._id,
                type: 'system',
                message: `⏳ Onay Bekliyor: ${initiatorName} tesisi bir eşleşme talebinde bulundu. Onayınız bekleniyor.`,
                relatedId: listing._id
            }));
            await Notification.insertMany(adminNotifications);
        }

        // 3. Create a Match record with PENDING status (no commission yet)
        await Match.create({
            fromFacility: buyerFacilityId,
            toListing: listing._id,
            status: 'pending'
        });

        res.status(200).json({ success: true, message: 'Eşleşme talebi oluşturuldu. Yönetici onayı bekleniyor.' });
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

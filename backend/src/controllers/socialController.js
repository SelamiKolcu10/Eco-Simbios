const SocialRequest = require('../models/SocialRequest');
const Notification = require('../models/Notification');

exports.getSocialRequests = async (req, res, next) => {
    try {
        const requests = await SocialRequest.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: requests.length, data: requests });
    } catch (error) {
        console.error('Error fetching social requests:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.updateSocialRequestStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const reqId = req.params.id;
        
        const request = await SocialRequest.findByIdAndUpdate(
            reqId,
            { status },
            { new: true, runValidators: true }
        );
        
        if (!request) {
            return res.status(404).json({ success: false, error: 'Request not found' });
        }
        
        // MVP: Just returning success, no actual email sent
        res.status(200).json({ success: true, data: request });
    } catch (error) {
        console.error('Error updating social request status:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.createSocialRequest = async (req, res, next) => {
    try {
        const {
            fullName,
            institution,
            university,
            email,
            phone,
            requestType,
            budget,
            date,
            location,
            specialization,
            amount,
            message
        } = req.body;

        const newRequest = await SocialRequest.create({
            fullName,
            institution,
            university,
            email,
            phone,
            requestType,
            budget,
            date,
            location,
            specialization,
            amount,
            message
        });

        // Create a notification for the facility that requested it
        await Notification.create({
            recipient: req.facilityId,
            type: 'social_update',
            message: `Sosyal Etki başvurunuz başarıyla alındı ve inceleme sürecine girdi. (${requestType})`,
            relatedId: newRequest._id
        });

        res.status(201).json({
            success: true,
            data: newRequest
        });
    } catch (error) {
        console.error('Error creating social request:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.createPublicSocialRequest = async (req, res, next) => {
    try {
        const {
            fullName,
            institution,
            email,
            requestType,
            message,
            amount
        } = req.body;

        const newRequest = await SocialRequest.create({
            fullName,
            institution,
            email,
            requestType,
            message,
            amount
        });

        // Broadcast notification to admin users (facilities with login capability)
        const Facility = require('../models/Facility');
        const Notification = require('../models/Notification');
        
        const adminFacilities = await Facility.find({ role: 'admin' });
        
        if (adminFacilities.length > 0) {
            const notificationsToCreate = adminFacilities.map(f => ({
                recipient: f._id,
                type: 'social_update',
                message: `Yeni Demo Talebi: ${institution || fullName} tarafından yeni bir talep oluşturuldu.`,
                relatedId: newRequest._id
            }));
            await Notification.insertMany(notificationsToCreate);
        }

        res.status(201).json({
            success: true,
            data: newRequest
        });
    } catch (error) {
        console.error('Error creating public social request:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

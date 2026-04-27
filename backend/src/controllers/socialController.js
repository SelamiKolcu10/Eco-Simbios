const SocialRequest = require('../models/SocialRequest');
const Notification = require('../models/Notification');

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

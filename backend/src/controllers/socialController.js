const SocialRequest = require('../models/SocialRequest');

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

        res.status(201).json({
            success: true,
            data: newRequest
        });
    } catch (error) {
        console.error('Error creating social request:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

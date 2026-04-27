const Notification = require('../models/Notification');

// @route   GET /api/notifications
// @desc    Get all notifications for logged-in user
// @access  Private
exports.getNotifications = async (req, res) => {
    try {
        // Fetch up to 50 most recent notifications
        const notifications = await Notification.find({ recipient: req.facilityId })
            .sort({ createdAt: -1 })
            .limit(50);

        res.status(200).json({ success: true, count: notifications.length, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route   PATCH /api/notifications/:id/read
// @desc    Mark a specific notification as read
// @access  Private
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, recipient: req.facilityId },
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ success: false, message: 'Bildirim bulunamadı.' });
        }

        res.status(200).json({ success: true, data: notification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route   PATCH /api/notifications/read-all
// @desc    Mark all notifications as read for logged-in user
// @access  Private
exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.facilityId, read: false },
            { read: true }
        );

        res.status(200).json({ success: true, message: 'Tüm bildirimler okundu olarak işaretlendi.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

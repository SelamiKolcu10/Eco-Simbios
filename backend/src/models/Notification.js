const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Facility',
            required: true,
        },
        type: {
            type: String,
            enum: ['match', 'social_update', 'listing_expiry', 'system'],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
        relatedId: {
            type: mongoose.Schema.Types.ObjectId, // Can reference Listing, Match, SocialRequest etc.
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

// Auto-delete notifications older than 30 days to prevent bloat
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

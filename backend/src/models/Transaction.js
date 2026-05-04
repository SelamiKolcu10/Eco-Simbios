const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
    {
        // The match record that triggered this transaction
        match: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Match',
            required: true,
        },
        // Seller = listing owner, Buyer = the facility that matched
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Facility',
            required: true,
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Facility',
            required: true,
        },
        listing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing',
            required: true,
        },
        // Financial data
        estimatedValue: {
            type: Number,
            required: true,
            min: 0,
        },
        commissionRate: {
            type: Number, // stored as percentage, e.g. 3 = 3%
            required: true,
        },
        commissionAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        sellerPlan: {
            type: String,
            enum: ['free', 'pro', 'enterprise'],
            default: 'free',
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'cancelled'],
            default: 'completed',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Transaction', TransactionSchema);

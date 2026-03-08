const mongoose = require('mongoose');

const marketItemSchema = new mongoose.Schema(
    {
        material: {
            type: String,
            required: [true, 'Please add a material name'],
            trim: true,
            maxlength: [100, 'Material name cannot be more than 100 characters'],
        },
        source: {
            type: String,
            required: [true, 'Please add a source description'],
        },
        buyer: {
            type: String,
            required: [true, 'Please define a potential buyer or industry'],
        },
        income: {
            type: Number,
            required: [true, 'Please estimate the income value in TL'],
        },
        matchScore: {
            type: Number,
            default: 0, // Assigned by AI Engine later
            min: [0, 'Score must be at least 0'],
            max: [100, 'Score cannot be more than 100'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('MarketItem', marketItemSchema);

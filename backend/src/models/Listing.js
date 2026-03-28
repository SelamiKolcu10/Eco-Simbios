const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema(
    {
        wasteType: {
            type: String,
            required: [true, 'Waste type is required'],
            trim: true,
            // e.g. 'Plastik Atık', 'Organik Atık', 'Metal Atık'
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            min: [0, 'Amount cannot be negative'],
            // unit: kg
        },
        energyValue: {
            type: Number,
            required: [true, 'Energy value is required'],
            min: [0, 'Energy value cannot be negative'],
            // unit: kWh equivalent
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        type: {
            type: String,
            enum: ['Satılık Atık', 'Aranan Hammadde'],
            default: 'Satılık Atık'
        },
        category: {
            type: String,
            enum: ['Metal', 'Tekstil', 'Plastik', 'Kimyasal', 'Ahşap', 'Tümü'],
            required: [true, 'Category is required'],
        },
        status: {
            type: String,
            enum: ['active', 'matched', 'closed'],
            default: 'active',
        },
        expiresAt: {
            type: Date,
            // optional expiry date for the listing
        },

        // ─── Owner ────────────────────────────────────────────────────
        // The Facility that created this listing (Facility = the User in B2B)
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Facility',
            required: [true, 'A listing must belong to a facility'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Listing', ListingSchema);

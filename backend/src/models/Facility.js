const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Facility name is required'],
            trim: true,
        },
        id: {
            type: String, // 'm1', 'mc1' etc.
        },
        type: {
            type: String,
            enum: ['Factory', 'Greenhouse', 'Cooperative'],
            required: [true, 'Facility type is required'],
        },
        region: {
            type: String,
            enum: ['Marmara', 'Ege', 'İç Anadolu', 'Akdeniz', 'Karadeniz'],
            required: [true, 'Region is required'],
        },
        wasteProduced: { type: [String], default: [] },
        resourceNeeded: { type: [String], default: [] },
        location: {
            lat: { type: Number },
            lng: { type: Number },
        },
        // Operational metadata
        sector: { type: String, default: '' },
        tons:   { type: Number, default: 0 },
        // Cooperative-specific IoT fields
        women:        { type: Number },
        carbon:       { type: Number },
        temp:         { type: Number },
        humidity:     { type: Number },
        soilMoisture: { type: Number },
        iot:          { type: String },
        efficiency:   { type: Number },
        source:       { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Facility', FacilitySchema);


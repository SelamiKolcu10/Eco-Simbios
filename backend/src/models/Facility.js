const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

        // ─── Subscription & Billing Fields ──────────────────────────
        subscription: {
            plan: {
                type: String,
                enum: ['free', 'pro', 'enterprise'],
                default: 'free',
            },
            startDate: { type: Date, default: Date.now },
            endDate:   { type: Date },
            isActive:  { type: Boolean, default: true },
        },
        billing: {
            totalCommissionPaid:   { type: Number, default: 0 },
            totalTransactionValue: { type: Number, default: 0 },
            transactionCount:      { type: Number, default: 0 },
        },

        // ─── Auth Fields ────────────────────────────────────────────
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        email: {
            type: String,
            unique: true,
            sparse: true,           // allows existing facilities without email
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },
        password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters'],
            select: false,          // never returned in queries by default
        },
    },
    {
        timestamps: true,
    }
);

// ─── Hash password before saving ────────────────────────────────────────────
FacilitySchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ─── Compare candidate password with hashed password ────────────────────────
FacilitySchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Facility', FacilitySchema);


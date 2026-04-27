const mongoose = require('mongoose');

const SocialRequestSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: [true, 'Ad Soyad zorunludur'] },
        institution: { type: String }, 
        university: { type: String }, 
        email: { type: String, required: [true, 'E-posta zorunludur'] },
        phone: { type: String },
        requestType: { 
            type: String, 
            enum: ['Burs', 'Kooperatif', 'Eğitim', 'Kulüp', 'Lojistik', 'Diğer'], 
            required: [true, 'Başvuru türü zorunludur'] 
        },
        budget: { type: Number },
        date: { type: Date },
        location: { type: String },
        specialization: { type: String },
        amount: { type: Number },
        message: { type: String },
        status: { 
            type: String, 
            enum: ['Pending', 'Reviewed', 'Approved', 'Rejected'], 
            default: 'Pending' 
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('SocialRequest', SocialRequestSchema);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Facility = require('./src/models/Facility');

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const updateData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Test amaçlı olarak tüm tesislerin ihtiyaç listesine temel kategorileri ekliyoruz
        const categories = ['Plastik', 'Metal', 'Ahşap', 'Kimyasal', 'Tekstil', 'Organik', 'Diğer'];
        
        const result = await Facility.updateMany(
            {}, 
            { $set: { resourceNeeded: categories } }
        );

        console.log(`\n--- Güncelleme Tamamlandı ---`);
        console.log(`Güncellenen tesis sayısı: ${result.modifiedCount}`);

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateData();

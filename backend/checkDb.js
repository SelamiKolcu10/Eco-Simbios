const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Facility = require('./src/models/Facility');
const Listing = require('./src/models/Listing');
const MarketItem = require('./src/models/MarketItem');

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');


        const facilityCount = await Facility.countDocuments();
        const listingCount = await Listing.countDocuments();
        const marketItemCount = await MarketItem.countDocuments();

        console.log(`\n--- Döküman Sayıları ---`);
        console.log(`Tesisler (Facilities): ${facilityCount}`);
        console.log(`İlanlar (Listings): ${listingCount}`);
        console.log(`Pazar Ürünleri (MarketItems): ${marketItemCount}`);

        console.log(`\n--- Örnek Veriler ---`);
        
        if (facilityCount > 0) {
            const sampleFacility = await Facility.findOne().select('name sector location');
            console.log(`Tesis Örneği:`, sampleFacility);
            const facilityTypes = await Facility.aggregate([ { $group: { _id: "$sector", count: { $sum: 1 } } }]);
            console.log(`Tesis Sektörleri:`, facilityTypes);
        }

        if (listingCount > 0) {
            const sampleListing = await Listing.findOne().select('title category quantity price.amount');
            console.log(`İlan Örneği:`, sampleListing);
            const listingTypes = await Listing.aggregate([ { $group: { _id: "$category", count: { $sum: 1 } } }]);
            console.log(`İlan Kategorileri:`, listingTypes);
        }

        if (marketItemCount > 0) {
            const sampleMarketItem = await MarketItem.findOne();
            console.log(`Pazar Ürünü Örneği:`, sampleMarketItem);
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkData();

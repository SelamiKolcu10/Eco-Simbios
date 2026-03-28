const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Facility = require('./src/models/Facility');
const Listing = require('./src/models/Listing');

dotenv.config();

const mockListings = [
    { category: 'Metal', wasteType: 'Alüminyum Hurda', amount: 1500, energyValue: 200, status: 'active', type: 'Satılık Atık' },
    { category: 'Metal', wasteType: 'Bakır Kablo', amount: 500, energyValue: 120, status: 'active', type: 'Satılık Atık' },
    { category: 'Metal', wasteType: 'Sarı Pirinç', amount: 300, energyValue: 80, status: 'active', type: 'Satılık Atık' },
    { category: 'Metal', wasteType: 'Çelik Talaşı', amount: 5000, energyValue: 400, status: 'active', type: 'Satılık Atık' },
    { category: 'Tekstil', wasteType: 'Pamuklu Kırpıntı', amount: 2000, energyValue: 150, status: 'active', type: 'Satılık Atık' },
    { category: 'Tekstil', wasteType: 'Polyester Kumaş', amount: 1200, energyValue: 100, status: 'active', type: 'Satılık Atık' },
    { category: 'Tekstil', wasteType: 'Naylon İplik', amount: 800, energyValue: 60, status: 'active', type: 'Satılık Atık' },
    { category: 'Plastik', wasteType: 'PET Şişe', amount: 3000, energyValue: 250, status: 'active', type: 'Satılık Atık' },
    { category: 'Plastik', wasteType: 'HDPE Bidon', amount: 1000, energyValue: 90, status: 'active', type: 'Satılık Atık' },
    { category: 'Plastik', wasteType: 'PVC Boru Hurdası', amount: 2500, energyValue: 180, status: 'active', type: 'Satılık Atık' },
    { category: 'Kimyasal', wasteType: 'Atık Yağ', amount: 4000, energyValue: 800, status: 'active', type: 'Satılık Atık' },
    { category: 'Kimyasal', wasteType: 'Çözücü (Solvent)', amount: 600, energyValue: 300, status: 'active', type: 'Satılık Atık' },
    { category: 'Kimyasal', wasteType: 'Boya Çamuru', amount: 1500, energyValue: 120, status: 'active', type: 'Satılık Atık' },
    { category: 'Ahşap', wasteType: 'Ahşap Palet', amount: 800, energyValue: 320, status: 'active', type: 'Satılık Atık' },
    { category: 'Ahşap', wasteType: 'MDF Tozu', amount: 1200, energyValue: 180, status: 'active', type: 'Satılık Atık' },
    { category: 'Ahşap', wasteType: 'Talaş', amount: 2000, energyValue: 220, status: 'active', type: 'Satılık Atık' },
    { category: 'Tümü', wasteType: 'Organik Atık', amount: 5000, energyValue: 600, status: 'active', type: 'Satılık Atık' },
    { category: 'Metal', wasteType: 'Elektronik Hurda', amount: 200, energyValue: 50, status: 'active', type: 'Satılık Atık' }
];

const seedListings = async () => {
    try {
        await connectDB();

        // 1. Fetch available facilities to assign ownership
        const facilities = await Facility.find();
        
        if (facilities.length === 0) {
            console.error('No facilities found. Please seed facilities first.');
            process.exit(1);
        }

        // 2. Clear existing listings
        await Listing.deleteMany();
        console.log('Existing listings deleted.');

        // 3. Assign createdBy randomly to mock listings
        const listingsToInsert = mockListings.map(listing => {
            const randomFacility = facilities[Math.floor(Math.random() * facilities.length)];
            return {
                ...listing,
                createdBy: randomFacility._id,
                description: `${randomFacility.name} tarafından sağlanan ${listing.amount} kg ${listing.wasteType}.`
            };
        });

        // 4. Insert into database
        await Listing.insertMany(listingsToInsert);
        console.log(`Successfully seeded ${listingsToInsert.length} listings!`);

        process.exit();
    } catch (error) {
        console.error('Error seeding listings:', error);
        process.exit(1);
    }
};

seedListings();

const mongoose = require('mongoose');
require('dotenv').config();

const Match = require('./src/models/Match');
const Listing = require('./src/models/Listing');
const Facility = require('./src/models/Facility');

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected');

        const matches = await Match.find()
            .populate('fromFacility')
            .populate({
                path: 'toListing',
                populate: { path: 'createdBy' }
            });

        console.log(`Total Matches: ${matches.length}`);
        
        for (const m of matches) {
            const fromName = m.fromFacility?.name || 'Unknown';
            const ownerName = m.toListing?.createdBy?.name || 'Unknown';
            console.log(`Match ${m._id}: From ${fromName} (${m.fromFacility?._id}) -> Owner ${ownerName} (${m.toListing?.createdBy?._id})`);
            
            if (fromName === ownerName && fromName !== 'Unknown') {
                console.log('MATCH DETECTED! Deleting...');
                await Match.findByIdAndDelete(m._id);
            }
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
check();

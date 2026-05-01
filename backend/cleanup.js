const mongoose = require('mongoose');
require('dotenv').config();

const Match = require('./src/models/Match');
const Listing = require('./src/models/Listing');

async function cleanupMatches() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to DB');

        const matches = await Match.find().populate('toListing');
        let deletedCount = 0;

        for (const match of matches) {
            if (match.toListing && match.fromFacility) {
                if (match.fromFacility.toString() === match.toListing.createdBy.toString()) {
                    console.log(`Deleting invalid match: ${match._id} (User matched with own listing)`);
                    await Match.findByIdAndDelete(match._id);
                    deletedCount++;
                }
            } else if (!match.toListing) {
                console.log(`Deleting orphaned match: ${match._id} (Listing no longer exists)`);
                await Match.findByIdAndDelete(match._id);
                deletedCount++;
            }
        }

        console.log(`Cleanup complete. Deleted ${deletedCount} matches.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

cleanupMatches();

const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
    try {
        // Force Google Public DNS for SRV resolution
        // (fixes ECONNREFUSED on networks that block SRV queries)
        dns.setServers(['8.8.8.8', '8.8.4.4']);

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`\n🟢 MongoDB Connected: ${conn.connection.host}\n`);
    } catch (error) {
        console.error(`\n🔴 MongoDB Connection Error: ${error.message}\n`);
        process.exit(1);
    }
};

module.exports = connectDB;

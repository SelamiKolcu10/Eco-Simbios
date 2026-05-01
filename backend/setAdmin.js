const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

dotenv.config();

const Facility = require('./src/models/Facility');

const makeAdmin = async () => {
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const email = 'selamikolcu52@gmail.com';
        
        const facility = await Facility.findOneAndUpdate(
            { email },
            { role: 'admin' },
            { new: true }
        );

        if (facility) {
            console.log(`Success: ${facility.email} is now an admin.`);
        } else {
            console.log(`Error: Facility with email ${email} not found.`);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        mongoose.connection.close();
    }
};

makeAdmin();

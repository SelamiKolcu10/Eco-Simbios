const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const marketRoutes = require('./src/routes/marketRoutes');
const facilityRoutes = require('./src/routes/facilityRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ─── Routes ───────────────────────────────────────────────
app.use('/api/market', marketRoutes);
app.use('/api/facilities', facilityRoutes);

// Base health-check route
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Eco-Simbios Backend is Alive!',
        version: '1.0.0',
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});

// Global error handler
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on port ${PORT} [${process.env.NODE_ENV || 'development'} mode]\n`);
});

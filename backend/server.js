const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const marketRoutes = require('./src/routes/marketRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
// connectDB(); // Uncomment when MongoDB string is added to .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/market', marketRoutes);

// Base route test
app.get('/', (req, res) => {
    res.json({ message: 'Eco-Symbiosis API running perfectly 🚀' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

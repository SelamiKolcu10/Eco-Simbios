const express = require('express');
const { getMarketItems, createMarketItem } = require('../controllers/marketController');

const router = express.Router();

router
    .route('/')
    .get(getMarketItems)
    .post(createMarketItem);

module.exports = router;

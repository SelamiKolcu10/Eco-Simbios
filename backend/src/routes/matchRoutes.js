const express = require('express');
const router = express.Router();
const { getMatchHistory } = require('../controllers/matchController');
const protect = require('../middlewares/authMiddleware');

router.get('/history', protect, getMatchHistory);

module.exports = router;

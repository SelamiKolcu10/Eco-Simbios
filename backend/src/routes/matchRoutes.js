const express = require('express');
const router = express.Router();
const { getMatchHistory, cleanupInvalidMatches } = require('../controllers/matchController');
const protect = require('../middlewares/authMiddleware');

router.get('/history', protect, getMatchHistory);
router.get('/cleanup', cleanupInvalidMatches);

module.exports = router;

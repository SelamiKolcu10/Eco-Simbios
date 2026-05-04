const express = require('express');
const router = express.Router();
const { getMatchHistory, approveMatch, rejectMatch, cleanupInvalidMatches } = require('../controllers/matchController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/history', protect, getMatchHistory);
router.patch('/:id/approve', protect, approveMatch);
router.patch('/:id/reject', protect, rejectMatch);
router.get('/cleanup', cleanupInvalidMatches);

module.exports = router;

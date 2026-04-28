const express = require('express');
const router = express.Router();
const { createSocialRequest, getSocialRequests, updateSocialRequestStatus } = require('../controllers/socialController');
const protect = require('../middlewares/authMiddleware');

router.post('/', protect, createSocialRequest);
router.get('/', protect, getSocialRequests);
router.put('/:id/status', protect, updateSocialRequestStatus);

module.exports = router;

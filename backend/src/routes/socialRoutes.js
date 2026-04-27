const express = require('express');
const router = express.Router();
const { createSocialRequest } = require('../controllers/socialController');
const protect = require('../middlewares/authMiddleware');

router.post('/', protect, createSocialRequest);

module.exports = router;

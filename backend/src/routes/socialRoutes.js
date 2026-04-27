const express = require('express');
const router = express.Router();
const { createSocialRequest } = require('../controllers/socialController');

router.post('/', createSocialRequest);

module.exports = router;

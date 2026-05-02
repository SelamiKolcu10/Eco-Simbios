const express = require('express');
const router = express.Router();
const { getSummary } = require('../controllers/statsController');
const { maybeProtect } = require('../middlewares/authMiddleware');

router.get('/summary', maybeProtect, getSummary);

module.exports = router;

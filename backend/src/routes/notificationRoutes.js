const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead, markAllAsRead } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

// All notification routes require authentication
router.use(protect);

router.get('/', getNotifications);
router.patch('/read-all', markAllAsRead); // Must be before /:id/read to prevent 'read-all' being parsed as an ID
router.patch('/:id/read', markAsRead);

module.exports = router;

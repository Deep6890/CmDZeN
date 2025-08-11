// src/routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const { logActivity, getUserActivities } = require('../controllers/activityController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, logActivity);
router.get('/', auth, getUserActivities);

module.exports = router;

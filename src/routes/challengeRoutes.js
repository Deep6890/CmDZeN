const express = require('express');
const router = express.Router();
const { createChallenge, joinChallenge, getLeaderboard } = require('../controllers/challengeController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createChallenge);
router.post('/:id/join', auth, joinChallenge);
router.get('/:id/leaderboard', auth, getLeaderboard);

module.exports = router;

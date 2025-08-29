const express = require('express');
const router = express.Router();
const answerController = require('./../controllers/answerController');

router.post('/:id', answerController.createAnswer); // post answer to a question

module.exports = router;

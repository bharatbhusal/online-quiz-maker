const express = require('express');
const router = express.Router();
const { questionController } = require('../controllers/questionController');

// Create a new question
router.post('/', questionController.createQuestion);

module.exports = router;

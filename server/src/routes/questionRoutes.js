const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionControllers');
// Create a new question
router.post('/', questionController.createQuestion);

// Get all questions
router.get('/', questionController.getAllQuestions);

// Get question by ID
router.get('/id/:id', questionController.getQuestionById);

// Get questions by category
router.get('/category/:category', questionController.getQuestionsByCategory);

// Get questions by creator
router.get('/creator/:creator', questionController.getQuestionsByCreator);

module.exports = router;

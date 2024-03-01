const express = require('express');
const router = express.Router();
const { quizController } = require('../controllers/quizController');
const auth = require('../middleware/auth'); // Authentication middleware

// Create a new quiz
router.post('/', quizController.createQuiz);

// Get all quizzes
router.get('/', quizController.getAllQuizzes);

// Get quiz by ID
router.get('/:id', quizController.getQuizById);

module.exports = router;

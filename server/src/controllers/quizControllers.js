const QuizModel = require('../models/QuizModel');

const createQuiz = async (req, res) => {
    try
    {
        const { title, questions } = req.body;
        // Create the new quiz
        const newQuiz = await QuizModel.create({ title, questions });
        res.status(201).json(newQuiz);
    } catch (error)
    {
        res.status(500).json({ message: 'Error creating quiz', error: error.message });
    }
};

const getAllQuizzes = async (req, res) => {
    try
    {
        // Fetch all quizzes
        const quizzes = await QuizModel.find();
        res.status(200).json(quizzes);
    } catch (error)
    {
        res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
    }
};

const getQuizById = async (req, res) => {
    try
    {
        const quizId = req.params.id;
        // Fetch quiz by ID
        const quiz = await QuizModel.findById(quizId);
        if (!quiz)
        {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error)
    {
        res.status(500).json({ message: 'Error fetching quiz', error: error.message });
    }
};

module.exports = {
    createQuiz,
    getAllQuizzes,
    getQuizById
};

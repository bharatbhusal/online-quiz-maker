const QuestionModel = require('../models/QuestionModel');
const createQuestion = async (req, res) => {
    try
    {
        const { question, category, creator, options } = req.body;
        // Create the new question
        const newQuestion = await QuestionModel.create({ question, category, creator, options });
        res.status(201).json(newQuestion);
    } catch (error)
    {
        res.status(500).json({ message: 'Error creating question', error: error.message });
    }
};

const getAllQuestions = async (req, res) => {
    try
    {
        // Fetch all questions
        const questions = await QuestionModel.find();
        res.status(200).json(questions);
    } catch (error)
    {
        res.status(500).json({ message: 'Error fetching questions', error: error.message });
    }
};


// Get question by ID
const getQuestionById = async (req, res) => {
    try
    {
        const questionId = req.params.id;
        const question = await QuestionModel.findById(questionId);
        if (!question)
        {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error)
    {
        res.status(500).json({ message: 'Error fetching question', error: error.message });
    }
};

// Get questions by category
const getQuestionsByCategory = async (req, res) => {
    try
    {
        const category = req.params.category;
        console.log(category)
        const questions = await QuestionModel.find({ category });
        res.status(200).json(questions);
    } catch (error)
    {
        res.status(500).json({ message: 'Error fetching questions', error: error.message });
    }
};

// Get questions by creator
const getQuestionsByCreator = async (req, res) => {
    try
    {
        const creatorId = req.params.creator;
        const questions = await QuestionModel.find({ creator: creatorId });
        res.status(200).json(questions);
    } catch (error)
    {
        res.status(500).json({ message: 'Error fetching questions', error: error.message });
    }
};


module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionsByCategory,
    getQuestionsByCreator,
    getQuestionById
};

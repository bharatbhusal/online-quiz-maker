const QuestionModel = require('../models/QuestionModel');
const createQuestion = async (req, res) => {
    try
    {
        const { question, category, user, options } = req.body;

        // Check for null or empty values
        const requiredFields = { question, category, user };
        for (const field in requiredFields)
        {
            if (!requiredFields[field] || requiredFields[field].trim() === '')
            {
                return res.status(400).json({ message: `Please provide a non-empty ${field}` });
            }
        }

        // Check for missing options or options with missing text or isCorrect properties
        if (!options || options.length === 0)
        {
            return res.status(400).json({ message: 'Please provide at least one option' });
        }

        let hasCorrectOption = false;
        for (const option of options)
        {
            if (!option.text || option.text.trim() === '')
            {
                return res.status(400).json({ message: 'Each option must have a non-empty text' });
            }
            if (option.isCorrect === undefined)
            {
                return res.status(400).json({ message: 'Each option must have an isCorrect property' });
            }
            if (option.isCorrect)
            {
                hasCorrectOption = true;
            }
        }

        // Check if at least one option is marked as correct
        if (!hasCorrectOption)
        {
            return res.status(400).json({ message: 'At least one option must be marked as correct' });
        }

        // Create the new question
        const newQuestion = await QuestionModel.create({ question, category, creator: user, options });
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

const getCategories = async (req, res) => {
    try
    {
        // Fetch all questions
        const questions = await QuestionModel.find();

        // Extract unique categories using Set
        const uniqueCategoriesSet = new Set();
        questions.forEach((each) => uniqueCategoriesSet.add(each.category));

        // Convert Set to array
        const uniqueCategories = Array.from(uniqueCategoriesSet);

        res.status(200).json({ categories: uniqueCategories });
    } catch (error)
    {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
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
    getQuestionById,
    getCategories
};

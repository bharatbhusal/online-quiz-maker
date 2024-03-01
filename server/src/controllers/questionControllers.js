const QuestionModel = require('../models/QuestionModel');

const createQuestion = async (req, res) => {
    try
    {
        const { text, options } = req.body;
        // Create the new question
        const newQuestion = await QuestionModel.create({ text, options });
        res.status(201).json(newQuestion);
    } catch (error)
    {
        res.status(500).json({ message: 'Error creating question', error: error.message });
    }
};

module.exports = {
    createQuestion
};

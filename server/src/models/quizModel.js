const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

module.exports = mongoose.model('Quiz', quizSchema);

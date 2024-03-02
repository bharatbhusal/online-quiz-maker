const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    options: [{
        text: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            default: false
        }
    }]
});

module.exports = mongoose.model('Question', questionSchema);

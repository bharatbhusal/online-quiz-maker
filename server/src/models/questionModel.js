const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
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

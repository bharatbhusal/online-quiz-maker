import React, { useState, useEffect } from 'react';
import Question from './Question';

const QuizAttempt = ({ category }) => {
    const proxy = process.env.REACT_APP_DATABASE_URL
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        // Fetch questions for the specified category when component mounts
        fetchQuestionsByCategory();
    }, [category]);

    const fetchQuestionsByCategory = async () => {
        try
        {
            const response = await fetch(`${proxy}/questions/category/${category}`);
            const data = await response.json();
            setQuestions(data);
        } catch (error)
        {
            console.error('Error fetching questions:', error);
        }
    };
    const handleOptionChange = (option) => {
        setSelectedOption(option);
        handleSubmitAnswer
    };
    const handleNextQuestion = () => {
        // Move to the next question if not already on the last question

        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');

    };

    const handleSubmitAnswer = (e) => {

        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.options.find(option => option.isCorrect)?.text;
        if (selectedOption === correctAnswer)
        {
            setScore(score + 1);
        }

        // Move to the next question or complete the quiz
        if (currentQuestionIndex < questions.length - 1)
        {
            handleNextQuestion();
        } else
        {
            setQuizCompleted(true);
        }
    };


    if (quizCompleted)
    {
        return (
            <div>
                <h2>Quiz Completed!</h2>
                <p>Your score: {score} / {questions.length}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Quiz: {category}</h2>
            <p>Question {currentQuestionIndex + 1} / {questions.length}</p>
            <Question
                question={questions[currentQuestionIndex]?.question}
                options={questions[currentQuestionIndex]?.options}
                selectedOption={selectedOption}
                onOptionChange={handleOptionChange}
            />
            <button onClick={handleSubmitAnswer}>Submit Answer</button>
        </div>
    );
}

export default QuizAttempt;

import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import "../styles/quizAttempt.css"
import { useParams } from 'react-router-dom';
import { useUserContext } from '../context/useUserContext';
import { useQuestions } from '../context/useQuestionContext';

const QuizAttempt = () => {
    const proxy = process.env.REACT_APP_DATABASE_URL;
    const { token } = useUserContext();
    const { category } = useQuestions()
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        startQuiz();
    }, []);

    const startQuiz = async () => {
        try
        {
            const response = await fetch(`${proxy}/questions/category/${category}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data)
            setQuestions(data);
        } catch (error)
        {
            console.error('Error fetching questions:', error);
        }
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
    };

    const handleSubmitAnswer = () => {
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswer = currentQuestion.options.find(option => option.isCorrect)?.text;

        if (selectedOption === correctAnswer)
        {
            setScore(score + 1);
        }

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
        <div className="quiz-container">
            <h2 className="quiz-title">Quiz: {category}</h2>
            <p className="question-number">Question {currentQuestionIndex + 1} / {questions.length}</p>
            <div className="question-text">
                <Question
                    question={questions[currentQuestionIndex]?.question}
                    options={questions[currentQuestionIndex]?.options}
                    selectedOption={selectedOption}
                    onOptionChange={handleOptionChange}
                />
            </div>
            <button className="submit-button" onClick={handleSubmitAnswer}>Submit Answer</button>
        </div>
    );
};

export default QuizAttempt;

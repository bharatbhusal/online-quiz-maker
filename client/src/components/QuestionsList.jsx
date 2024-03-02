import React, { useState, useEffect } from 'react';

function QuestionsList() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getAllQuestions();
    }, []);

    const getAllQuestions = async () => {
        try
        {
            const response = await fetch('http://localhost:8081/questions');
            const data = await response.json();
            setQuestions(data);
        } catch (error)
        {
            console.error('Error fetching questions:', error);
        }
    };

    return (
        <div>
            <h2>Questions</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question.question}</li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionsList;

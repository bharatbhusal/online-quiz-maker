import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    // State for user details
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: ''
    });

    // State for questions
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        category: '',
        creator: '',
        options: ['', ''],
        isCorrect: [false, false]
    });

    useEffect(() => {
        // Fetch questions when component mounts
        getAllQuestions();
    }, []);

    // Function to fetch all questions
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

    // Function to handle form input change for user details
    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    // Function to handle form input change for new question
    const handleNewQuestionChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox')
        {
            const isCorrect = [...newQuestion.isCorrect];
            isCorrect[index] = checked;
            setNewQuestion({ ...newQuestion, isCorrect });
        } else
        {
            const options = [...newQuestion.options];
            options[index] = value;
            setNewQuestion({ ...newQuestion, [name]: options });
        }
    };

    // Function to add new option for new question
    const addNewOption = () => {
        const options = [...newQuestion.options, ''];
        const isCorrect = [...newQuestion.isCorrect, false];
        setNewQuestion({ ...newQuestion, options, isCorrect });
    };

    // Function to handle form submission for creating a new question
    const handleSubmitNewQuestion = async (e) => {
        e.preventDefault();
        try
        {
            const payload = {
                question: newQuestion.question,
                category: newQuestion.category,
                creator: newQuestion.creator,
                options: newQuestion.options.map((text, index) => ({ text, isCorrect: newQuestion.isCorrect[index] }))
            };
            const response = await fetch('http://localhost:8081/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log(data);
        } catch (error)
        {
            console.error('Error creating question:', error);
        }
    };

    // Function to handle form submission for user registration
    const handleSubmitRegistration = async (e) => {
        e.preventDefault();
        try
        {
            console.log(userDetails)
            const response = await fetch('http://localhost:8081/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            });
            const data = await response.json();
            console.log(data);
        } catch (error)
        {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="App">
            <h1>Quiz App</h1>
            <h2>Register</h2>
            <form onSubmit={handleSubmitRegistration}>
                <input type="text" name="username" placeholder="Username" value={userDetails.username} onChange={handleUserDetailsChange} required />
                <input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleUserDetailsChange} required />
                <input type="password" name="password" placeholder="Password" value={userDetails.password} onChange={handleUserDetailsChange} required />
                <button type="submit">Register</button>
            </form>

            <h2>Create Question</h2>
            <form onSubmit={handleSubmitNewQuestion}>
                <input type="text" name="question" placeholder="Question" value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} required />
                <input type="text" name="category" placeholder="Category" value={newQuestion.category} onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })} required />
                <input type="text" name="creator" placeholder="Creator" value={newQuestion.creator} onChange={(e) => setNewQuestion({ ...newQuestion, creator: e.target.value })} required />
                {newQuestion.options.map((option, index) => (
                    <div key={index}>
                        <input type="text" value={option} onChange={(e) => handleNewQuestionChange(e, index)} required />
                        <input type="checkbox" checked={newQuestion.isCorrect[index]} onChange={(e) => handleNewQuestionChange(e, index)} />
                        <label>Correct</label>
                    </div>
                ))}
                <button type="button" onClick={addNewOption}>Add Option</button>
                <button type="submit">Create Question</button>
            </form>

            <h2>Questions</h2>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question.question}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;

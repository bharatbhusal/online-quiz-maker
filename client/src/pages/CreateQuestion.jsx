// CreateQuestion.jsx
import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/useUserContext';
import '../styles/createQuestion.css'; // Import CSS for styling
import Footer from '../components/Footer';
import ErrorBox from '../components/ErrorBox';
import SuccessBox from '../components/SuccessBox';

function CreateQuestion() {
    const [question, setQuestion] = useState('who are you');
    const [category, setCategory] = useState('personal');
    const [options, setOptions] = useState(['']);
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
    const [creator, setCreator] = useState('bharat');


    const [errorMessages, setErrorMessages] = useState([]); // State variable for error messages
    const [successMessages, setSuccessMessages] = useState([]); // State variable for success messages

    const { token } = useUserContext();

    const handleQuestionChange = (e) => setQuestion(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleOptionChange = (index, e) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
    };

    const handleCorrectOptionChange = (index) => setCorrectOptionIndex(index);

    const addOption = () => setOptions([...options, '']);



    useEffect(() => {
        // Remove the oldest error message from the array every 2 seconds
        const interval = setInterval(() => {

            setErrorMessages(errorMessages.slice(1));
        }, 500);

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, [errorMessages]); // Re-run effect whenever errorMessages change

    useEffect(() => {
        // Remove the oldest error message from the array every 2 seconds
        const interval = setInterval(() => {
            setSuccessMessages(successMessages.slice(1));
        }, 500);

        // Cleanup function to clear the interval
        return () => clearInterval(interval);
    }, [successMessages]); // Re-run effect whenever errorMessages change


    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            const payload = {
                question,
                category,
                creator,
                options: options.map((option, index) => ({
                    text: option,
                    isCorrect: index === correctOptionIndex
                }))
            };
            console.log(payload)
            console.log(token)
            const response = await fetch('http://localhost:8081/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            setSuccessMessages([...successMessages, 'Question added']); // Add success message to array
        } catch (error)
        {
            setErrorMessages([...errorMessages, data.message]); // Add error message to array
            console.error('Error creating question:', error);
        }
    };

    return (
        <div className="create-question-container">
            <h2>Create Question</h2>
            <form >
                <input type="text" placeholder="Question" value={question} onChange={handleQuestionChange} required />
                <input type="text" placeholder="Category" value={category} onChange={handleCategoryChange} required />
                <input type="text" placeholder="Creator" value={creator} onChange={(e) => setCreator(e.target.value)} required />
                {options.map((option, index) => (
                    <div key={index} className='options'>
                        <input type="text" placeholder={`Option ${index + 1}`} value={option} onChange={(e) => handleOptionChange(index, e)} required />
                        <input type="radio" checked={correctOptionIndex === index} onChange={() => handleCorrectOptionChange(index)} required />
                    </div>
                ))}
                <button type="button" onClick={addOption}>Add Option</button>
                <button type="button" onClick={handleSubmit}>Create Question</button>

                {/* Render ErrorBar for each error message in the array */}
                <ErrorBox errors={errorMessages} />
                {/* Render SuccessBar for each success message in the array */}
                <SuccessBox successes={successMessages} />
            </form>
        </div>
    );
}

export default CreateQuestion;

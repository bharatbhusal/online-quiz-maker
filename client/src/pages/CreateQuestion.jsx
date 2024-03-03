// CreateQuestion.jsx
import React, { useState } from 'react';
import { useUserContext } from '../context/useUserContext';
import '../styles/createQuestion.css'; // Import CSS for styling

function CreateQuestion() {
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [options, setOptions] = useState(['']);
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
    const [creator, setCreator] = useState('');
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
            // console.log(payload)
            console.log(token)
            const response = await fetch('http://localhost:8081/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log(data)
        } catch (error)
        {
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
            </form>
        </div>
    );
}

export default CreateQuestion;

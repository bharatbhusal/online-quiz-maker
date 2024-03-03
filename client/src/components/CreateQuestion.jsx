import React, { useState } from 'react';
import { useUserContext } from '../context/useUserContext';

function CreateQuestion() {
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('');
    const [options, setOptions] = useState(['']);
    const [correctOptionIndex, setCorrectOptionIndex] = useState(null);
    const [creator, setCreator] = useState(''); // New state variable for creator
    const { token } = useUserContext()
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
                creator, // Include the creator in the payload
                options: options.map((option, index) => ({
                    text: option,
                    isCorrect: index === correctOptionIndex
                }))
            };
            const response = await fetch('http://localhost:8081/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
        } catch (error)
        {
            console.error('Error creating question:', error);
        }
    };

    return (
        <div>
            <h2>Create Question</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Question" value={question} onChange={handleQuestionChange} required />
                <input type="text" placeholder="Category" value={category} onChange={handleCategoryChange} required />
                <input type="text" placeholder="Creator" value={creator} onChange={(e) => setCreator(e.target.value)} required />
                {options.map((option, index) => (
                    <div key={index}>
                        <input type="radio" checked={correctOptionIndex === index} onChange={() => handleCorrectOptionChange(index)} required />
                        <input type="text" placeholder={`Option ${index + 1}`} value={option} onChange={(e) => handleOptionChange(index, e)} required />
                    </div>
                ))}
                <button type="button" onClick={addOption}>Add Option</button>
                <button type="submit">Create Question</button>
            </form>
        </div>
    );
}

export default CreateQuestion;

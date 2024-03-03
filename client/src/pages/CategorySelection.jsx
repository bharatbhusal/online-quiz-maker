import React, { useState, useEffect } from 'react';
import "../styles/quizAttempt.css";
import { useUserContext } from '../context/useUserContext';
import { NavLink } from 'react-router-dom';
import { useQuestions } from '../context/useQuestionContext';

const CategorySelection = () => {
    const proxy = process.env.REACT_APP_DATABASE_URL;
    const { token } = useUserContext();
    const [categories, setCategories] = useState([]);
    const { setCategory } = useQuestions()
    useEffect(() => {
        token && fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try
        {
            const response = await fetch(`${proxy}/questions/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setCategories(data.categories);
        } catch (error)
        {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div className="category-selection">
            <h2>Select a Category</h2>
            <div>
                {categories && categories.map((category, index) => (
                    <NavLink key={index} to={`/quiz`} >
                        <button onClick={() => setCategory(category)}>{category}</button>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default CategorySelection;

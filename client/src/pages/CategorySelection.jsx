import React, { useState, useEffect } from 'react';
import "../styles/categorySelection.css";
import { useUserContext } from '../context/useUserContext';
import { NavLink } from 'react-router-dom';
import { useQuestions } from '../context/useQuestionContext';
import Footer from '../components/Footer';
import Unauthorized from './Unauthorized';

const CategorySelection = () => {
    const proxy = process.env.REACT_APP_DATABASE_URL;
    const { token } = useUserContext();
    const [categories, setCategories] = useState([]);
    const { setCategory } = useQuestions();

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
        <>
            {token ? <div className="category-selection flex flex-column">
                <h2>Select a Category</h2>
                <div className='category-buttons'>
                    {categories && categories.map((category, index) => (
                        <NavLink key={index} to={`/quiz`}>
                            <button onClick={() => setCategory(category)}>{category}</button>
                        </NavLink>
                    ))}
                </div>
            </div>
                :
                <Unauthorized />}
        </>
    );
};

export default CategorySelection;

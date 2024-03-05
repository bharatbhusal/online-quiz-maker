import React, { useState, useEffect } from 'react';
import ErrorBox from '../components/ErrorBox'; // Import the ErrorBar component
import SuccessBox from '../components/SuccessBox'; // Import the SuccessBar component
import "../styles/login.css";
import { useUserContext } from '../context/useUserContext';
import { NavLink, Navigate, redirect, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';


function Login() {
    const [email, setEmail] = useState('bhusal@gmail.com');
    const [password, setPassword] = useState('bhafds323fdrat');
    const [errorMessages, setErrorMessages] = useState([]); // State variable for error messages
    const [successMessages, setSuccessMessages] = useState([]); // State variable for success messages
    const { token, setToken } = useUserContext()
    const navigator = useNavigate()
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

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
            const response = await fetch('http://localhost:8081/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok)
            {
                const data = await response.json();
                setErrorMessages([...errorMessages, data.message]); // Add error message to array
                return;
            }

            const data = await response.json();
            setToken(data.accessToken);
            setSuccessMessages([...successMessages, 'Login successful']); // Add success message to array
            navigator('/category')

        } catch (error)
        {
            console.error('Error logging in:', error.message);
            setErrorMessages([...errorMessages, error.message]); // Add error message to array
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {/* Render ErrorBar for each error message in the array */}
            <ErrorBox errors={errorMessages} />
            {/* Render SuccessBar for each success message in the array */}
            <SuccessBox successes={successMessages} />
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                <button type="submit">Login</button>
            </form>
            <NavLink to={'/registration'}>New here</NavLink>
        </div>
    );
}

export default Login;

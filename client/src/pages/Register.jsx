import React, { useState, useEffect } from 'react';
import ErrorBox from '../components/ErrorBox'; // Import the ErrorBar component
import SuccessBox from '../components/SuccessBox'; // Import the SuccessBar component
import "../styles/register.css";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]); // State variable for error messages
    const [successMessages, setSuccessMessages] = useState([]); // State variable for success messages

    const handleUsernameChange = (e) => setUsername(e.target.value);
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
            const response = await fetch('http://localhost:8081/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok)
            {
                const data = await response.json();
                setErrorMessages([...errorMessages, data.message]); // Add error message to array
                return;
            }

            const data = await response.json();
            setSuccessMessages([...successMessages, 'Registration successful']); // Add success message to array
        } catch (error)
        {
            console.error('Error registering user:', error.message);
            setErrorMessages([...errorMessages, error.message]); // Add error message to array
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <ErrorBox errors={errorMessages} />
            {/* Render SuccessBar for each success message in the array */}
            <SuccessBox successes={successMessages} />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required />
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;

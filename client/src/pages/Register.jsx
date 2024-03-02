import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

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
            const data = await response.json();
            console.log(data); // Handle registration success
        } catch (error)
        {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
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

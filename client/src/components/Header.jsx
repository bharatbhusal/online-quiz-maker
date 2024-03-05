// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import { useUserContext } from "../context/useUserContext"

const Header = () => {
    const { token } = useUserContext()
    return (
        <header className="header">
            <div className="header-container">
                <h1 className="logo"><Link to="/">OQM.</Link></h1>
                <nav className="nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/create-questions">Create Questions</Link></li>
                        <li><Link to="/category">Quiz</Link></li>
                        <li><Link to="/about-us">About</Link></li>
                        <li><Link to="/contacts">Contact</Link></li>
                        {!token && <li><Link to="/login"><button>LogIn</button></Link></li>}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

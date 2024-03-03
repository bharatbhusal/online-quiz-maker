import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import "../styles/notFoundPage.css"
const NotFoundPage = () => {
    return (
        <div className="not-found-container flex space-around">
            <div className="content">
                <h1 className="heading">404 Error</h1>
                <p className="message">Oops! The page you're looking for does not exist.</p>
                <Link to="/" className="link">Go back to Home</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import "../styles/notFoundPage.css"
import Footer from '../components/Footer';
import Header from '../components/Header';
const NotFoundPage = () => {
    return (
        <div className="not-found-container flex space-around">
            <Header />
            <div className="content">
                <h1 className="heading">404 Error</h1>
                <p className="message">Oops! The page you're looking for does not exist.</p>
            </div>
            <Footer />
        </div>
    );
};

export default NotFoundPage;
import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import "../styles/unauthorized.css"
import Footer from '../components/Footer';
import Header from '../components/Header';
const Unauthorized = () => {
    return (
        <div className="unauthorized flex space-around">
            <Header />
            <div className="content">
                <h1 className="heading">Are you logged In!!</h1>
                <p className="message">Please login first to access this page</p>
            </div>
            <Footer />
        </div>
    );
};

export default Unauthorized;
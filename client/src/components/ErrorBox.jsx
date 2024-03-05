// ErrorBar.jsx
import React, { useState, useEffect } from 'react';
import '../styles/errorBox.css';


const ErrorBox = ({ errors }) => {
    return (
        <div className="error-box ">
            {errors.map((each, index) => (
                <div className="error-bar" key={index} >{each}</div>
            ))}
        </div>
    );
};

export default ErrorBox;

// ErrorBar.jsx
import React, { useState, useEffect } from 'react';
import '../styles/successBox.css';

const SuccessBox = ({ successes }) => {
    return (
        <div className="success-box">
            {successes.map((each, index) => (
                <div className="success-bar" key={index}>{each}</div>
            ))}
        </div>
    );
};

export default SuccessBox;

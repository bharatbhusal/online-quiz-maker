import React, { useState } from 'react';
import "../styles/quizAttempt.css"
const Question = ({ question, options, selectedOption, onOptionChange }) => {

    return (
        <>
            <p>{question}</p>
            {options?.map((option, index) => (
                <div key={index}>
                    <div className="choices">

                        <input
                            type="radio"
                            id={`option${index}`}
                            name="options"
                            value={option.text}
                            checked={selectedOption === option.text}
                            onChange={() => onOptionChange(option.text)}
                        />
                        <label htmlFor={`option${index}`}>{option.text}</label>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Question;

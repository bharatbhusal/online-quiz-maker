import React, { useState } from 'react';

const Question = ({ question, options, selectedOption, onOptionChange }) => {
    return (
        <>
            <p>{question}</p>
            <div>
                {options?.map((option, index) => (
                    <div key={index}>
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
                ))}
            </div>
        </>
    );
}

export default Question;

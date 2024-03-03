import React, { createContext, useState } from "react";

export const QuestionContext = createContext()

export const QuestionProvider = ({ children }) => {
    const [question, setQuestion] = useState([])
    const [category, setCategory] = useState([])
    // Create the context value
    const value = {
        question,
        category,
        setCategory,
        setQuestion
    };

    return (
        <QuestionContext.Provider value={value}>
            {children}
        </QuestionContext.Provider>
    );
};
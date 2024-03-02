import React, { createContext, useState } from "react";

export const QuestionContext = createContext()

export const QuestionProvider = ({ children }) => {
    const [question, setQuestion] = useState([])
    // Create the context value
    const value = {
        question,
        setQuestion
    };

    return (
        <QuestionsContext.Provider value={value}>
            {children}
        </QuestionsContext.Provider>
    );
};
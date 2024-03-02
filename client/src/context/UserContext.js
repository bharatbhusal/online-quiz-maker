import React, { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState([])
    // Create the context value
    const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
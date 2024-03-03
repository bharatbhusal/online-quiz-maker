import React, { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    // Create the context value
    const value = {
        token,
        setToken,
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
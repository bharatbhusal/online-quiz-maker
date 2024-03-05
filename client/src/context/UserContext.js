import React, { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYmhhcmF0QGdtYWlsLmNvbSIsImlhdCI6MTcwOTYxODc0NH0.Fr7kDMVJRQ0rY-VpGD3DzaCDsA6r7QWl66b7p9gU77w")
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
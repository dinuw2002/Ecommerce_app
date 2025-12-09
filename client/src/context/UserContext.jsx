import React, { createContext, useState, useEffect } from 'react';

// 1. Create the Context object
export const UserContext = createContext();

// 2. Create the Provider component (manages state and provides values)
export const UserProvider = ({ children }) => {
    // Check local storage for existing user data on mount
    const [user, setUser] = useState(() => {
        const localUser = localStorage.getItem('userInfo');
        return localUser ? JSON.parse(localUser) : null;
    });

    // 3. Update local storage whenever the user state changes
    useEffect(() => {
        if (user) {
            // Save token and user details to localStorage
            localStorage.setItem('userInfo', JSON.stringify(user));
        } else {
            // Remove user info if they log out
            localStorage.removeItem('userInfo');
        }
    }, [user]);

    // Function to handle logout
    const logout = () => {
        setUser(null);
    };

    // The context value provides the state and the updater functions
    const contextValue = {
        user,
        setUser,
        logout,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
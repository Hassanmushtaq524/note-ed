import React, { createContext, useState, useContext, useEffect } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is already authenticated (e.g., in localStorage or session)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, []);


    /**
     * Use the credential from google login and verify it on the backend.
     * Use the returned user and save it
     * 
     * @param {*} credential The credential passed from google login 
     */
    const handleLoginSuccess = async (credential) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, { 
            credentials: 'include', 
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ token: credential })
        });
        if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
    };


    /**
     * Handles the login failure
     */
    const handleLoginFailure = () => {
        console.error('Login failed');
    };



    /**
     * Logout the user
     */
    const handleLogout = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, { 
            credentials: 'include', 
            headers: {
                "content-type": "application/json"
            },
            method: "POST"
        });
        if (response.ok) {
            setUser(null);
            localStorage.removeItem('user'); 
        }
    };



    return (
        <AuthContext.Provider value={{ user, handleLoginSuccess, handleLoginFailure, handleLogout }}>
        {children}
        </AuthContext.Provider>
    );
};

'use client';

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Replace Vite env var with Next.js env var
    const djangoApi = process.env.NEXT_PUBLIC_DJANGO_API;
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') { // Check if we're in the browser
            const fetchUserData = async () => {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const response = await axios.get(`${djangoApi}/app/user/`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        setUser(response.data.user);
                        setIsLogin(true);
                    } catch (error) {
                        console.error('Error fetching protected data:', error);
                        setIsLogin(false);
                    }
                }
            };
            
            fetchUserData();
        }
    }, [djangoApi]);

    return (
        <UserContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>
            {children}
        </UserContext.Provider>
    );
};
// src/context/FormContext.jsx
'use client';

import React, { createContext, useState, useEffect } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  // Initialize with true (closed) by default
  const [closeForm, setCloseForm] = useState(true); // Start closed
  const [closeSpecial, setCloseSpecial] = useState(true);
  const [initialized, setInitialized] = useState(false);
  
  // Check localStorage on initial load
  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized) {
      const hasVisited = localStorage.getItem('hasVisited');
      const token = localStorage.getItem('token');
      
      // If user has token, they're logged in - keep form closed
      if (token) {
        setCloseForm(true);
        // Ensure hasVisited is set so we don't show the form later
        if (hasVisited !== 'true') {
          localStorage.setItem('hasVisited', 'true');
        }
      } 
      // If no token but has visited before, keep form closed
      else if (hasVisited === 'true') {
        setCloseForm(true);
      } 
      // First time visitor, no token - show the form
      else {
        setCloseForm(false);
        // Don't mark as visited yet - we'll do that when they log in or close the form
      }
      
      setInitialized(true);
    }
  }, [initialized]);
  
  // Create a stable version of setCloseForm that won't cause multiple re-renders
  const updateCloseForm = React.useCallback((newValue) => {
    setCloseForm(newValue);
    // When manually closing the form, make sure we mark the user as visited
    if (newValue === true) {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const updateCloseSpecial = React.useCallback((newValue) => {
    setCloseSpecial(newValue);
  }, []);
  
  return (
    <FormContext.Provider value={{
      closeForm, 
      setCloseForm: updateCloseForm,
      closeSpecial, 
      setCloseSpecial: updateCloseSpecial,
      initialized
    }}>
      {children}
    </FormContext.Provider>
  );
};
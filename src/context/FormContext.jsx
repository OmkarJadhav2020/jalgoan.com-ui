'use client';

import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  // Initialize with true (closed) by default
  const [closeForm, setCloseForm] = useState(true);
  const [closeSpecial, setCloseSpecial] = useState(true);
  
  // Create a stable version of setCloseForm that won't cause multiple re-renders
  const updateCloseForm = React.useCallback((newValue) => {
    setCloseForm(newValue);
  }, []);

  const updateCloseSpecial = React.useCallback((newValue) => {
    setCloseSpecial(newValue);
  }, []);
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    closeForm, 
    setCloseForm: updateCloseForm,
    closeSpecial, 
    setCloseSpecial: updateCloseSpecial
  }), [closeForm, updateCloseForm, closeSpecial, updateCloseSpecial]);

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};
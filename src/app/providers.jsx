'use client';

import React from 'react';
import { FormProvider } from '@/context/FormContext';
import { LoginProvider } from '@/context/LoginContext';
import { UserProvider } from '@/context/UserContext';

const Providers = ({ children }) => {
    return (
        <UserProvider>
            <LoginProvider>
                <FormProvider>
                    {children}
                </FormProvider>
            </LoginProvider>
        </UserProvider>
    );
};

export default Providers;
// src/app/providers.jsx
'use client';

import React from 'react';
import { FormProvider } from '@/context/FormContext';
import { LoginProvider } from '@/context/LoginContext';
import { UserProvider } from '@/context/UserContext';
import { SubCategoryProvider } from '@/context/SubCategoryContext';

const Providers = ({ children }) => {
    return (
        <UserProvider>
            <LoginProvider>
                <FormProvider>
                    <SubCategoryProvider>
                        {children}
                    </SubCategoryProvider>
                </FormProvider>
            </LoginProvider>
        </UserProvider>
    );
};

export default Providers;
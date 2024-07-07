// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";

const AdminAuthContext = createContext({});

export const AdminAuthProvider = ({ children }: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [adminToken, setAdminToken] = useState('');

    useEffect(()=> {
        if(!localStorage.getItem('adminTz')){
            setIsAuthenticated(false);
        }
    }, [])

    const value = useMemo(() => ({
        isAuthenticated, setIsAuthenticated,
        adminToken, setAdminToken
    }), [adminToken, isAuthenticated]);

    return (
        <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
    );
};

export const useAuth = () => useContext(AdminAuthContext);

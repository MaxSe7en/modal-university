// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useMemo } from "react";

const AdminAuthContext = createContext({});

export const AdminAuthProvider = ({ children }: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const value = useMemo(() => ({
        isAuthenticated, setIsAuthenticated
    }), [isAuthenticated]);

    return (
        <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
    );
};

export const useAuth = () => useContext(AdminAuthContext);

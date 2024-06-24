import React, { createContext, useContext, useMemo, useState } from "react";

const AdminContext = createContext(
    {}
);


export const AdminProvider = ({ children }: any) => {
    const [activeTab, setActiveTab] = useState('personal');
    const value = useMemo(() => ({
        activeTab, setActiveTab
    }), [activeTab]);

    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    )
};


export const useAdmin = () => useContext(AdminContext);
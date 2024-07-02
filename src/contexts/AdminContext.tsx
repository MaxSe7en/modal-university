import AcademicInfo from "@/components/Admin/AcademicInfo/AcademicInfo";
import Declaration from "@/components/Admin/Declaration/Declaration";
import PersonalInfo from "@/components/Admin/PersonalInfo/PersonalInfo";
import React, { createContext, useContext, useMemo, useState } from "react";

const AdminContext = createContext(
    {}
);


export const AdminProvider = ({ children }: any) => {
    const [activeTab, setActiveTab] = useState('personal');
    // const renderContent = () => {
    //     switch (activeTab) {
    //         case 'personal':
    //             return <PersonalInfo users={[]} />;
    //         case 'academic':
    //             return <AcademicInfo academicInfo={[]} users={[]} />;
    //         case 'declaration':
    //             return <Declaration users={[]} />;
    //         default:
    //             return <PersonalInfo users={[]} />;
    //     }
    // };

    const renderContent = (selectedUser: any) => {
        if (!selectedUser) {
            return <div>Please select a student to view details.</div>;
        }
    
        return (
            <div>
                {activeTab === 'personal' && <PersonalInfo users={[selectedUser]} />}
                {activeTab === 'academic' && <AcademicInfo users={[selectedUser]} />}
                {activeTab === 'declaration' && <Declaration users={[selectedUser]} />}
            </div>
        );
    };
    
    const value = useMemo(() => ({
        activeTab,renderContent, setActiveTab
    }), [activeTab]);

    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    )
};


export const useAdmin = () => useContext(AdminContext);
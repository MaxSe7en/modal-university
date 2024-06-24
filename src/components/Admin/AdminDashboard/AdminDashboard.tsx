import { useAdmin } from '@/contexts/AdminContext';
import React, { useState } from 'react';
import AcademicInfo from '../AcademicInfo/AcademicInfo';
import Declaration from '../Declaration/Declaration';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import styles from './AdminDashboard.module.css';

const AdminDashboard: React.FC = () => {
    const {activeTab, setActiveTab}: any = useAdmin();

    const renderContent = () => {
        switch (activeTab) {
            case 'personal':
                return <PersonalInfo />;
            case 'academic':
                return <AcademicInfo />;
            case 'declaration':
                return <Declaration />;
            default:
                return <PersonalInfo />;
        }
    };
    
    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.title}>Backend Page Display</h1>
                <button className={styles.logoutBtn}>Logout</button>
            </header>
            <nav className={styles.navigation}>
                <button className={styles.navItem}>Prospective Students</button>
                <div className={styles.separator}></div>
                <button
                        className={`${styles.navItem} ${activeTab === 'personal' ? styles.active : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        Personal Information
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'academic' ? styles.active : ''}`}
                        onClick={() => setActiveTab('academic')}
                    >
                        Academic Information
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'declaration' ? styles.active : ''}`}
                        onClick={() => setActiveTab('declaration')}
                    >
                        Declaration
                    </button>
            </nav>
            <main className={styles.content}>
                <aside className={styles.sidebar}>
                    <h2>Prospective Students</h2>
                    <ul className={styles.studentList}>
                        <li className={styles.studentItem}>Bernard Aveh</li>
                        <li className={styles.studentItem}>Kofi Mensah</li>
                        <li className={styles.studentItem}>James Ansah</li>
                    </ul>
                </aside>
                <section className={styles.mainContent}>
                {renderContent()}
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
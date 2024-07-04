// import { useAdmin } from '@/contexts/AdminContext';
// import React, { useEffect, useState } from 'react';
// import AcademicInfo from '../AcademicInfo/AcademicInfo';
// import Declaration from '../Declaration/Declaration';
// import PersonalInfo from '../PersonalInfo/PersonalInfo';
// import styles from './AdminDashboard.module.css';

// const AdminDashboard: React.FC = () => {
//     const { activeTab, setActiveTab, renderContent }: any = useAdmin();
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('/api/users');
//             const data = await response.json();
//             setUsers(data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const fetchUserDetails = async (userId: number) => {
//         try {
//             const response = await fetch(`/api/users/${userId}`);
//             const data = await response.json();
//             setSelectedUser(data);
//         } catch (error) {
//             console.error('Error fetching user details:', error);
//         }
//     };

//     return (
//         <div className={styles.dashboard}>
//             <header className={styles.header}>
//                 <h1 className={styles.title}>Backend Page Display</h1>
//                 <button className={styles.logoutBtn}>Logout</button>
//             </header>
//             <nav className={styles.navigation}>
//                 <button className={styles.navItem}>Prospective Students</button>
//                 <div className={styles.separator}></div>
//                 <button
//                     className={`${styles.navItem} ${activeTab === 'personal' ? styles.active : ''}`}
//                     onClick={() => setActiveTab('personal')}
//                 >
//                     Personal Information
//                 </button>
//                 <button
//                     className={`${styles.navItem} ${activeTab === 'academic' ? styles.active : ''}`}
//                     onClick={() => setActiveTab('academic')}
//                 >
//                     Academic Information
//                 </button>
//                 <button
//                     className={`${styles.navItem} ${activeTab === 'declaration' ? styles.active : ''}`}
//                     onClick={() => setActiveTab('declaration')}
//                 >
//                     Declaration
//                 </button>
//             </nav>
//             <main className={styles.content}>
//                 <aside className={styles.sidebar}>
//                     <h3>Prospective Students</h3>
//                     <ul className={styles.studentList}>
//                         {users.map((user: any) => (
//                             <li
//                                 key={user.id}
//                                 className={styles.studentItem}
//                                 onClick={() => fetchUserDetails(user.id)}
//                             >
//                                 {user.surname} {user.firstname}
//                             </li>
//                         ))}
//                     </ul>
//                 </aside>
//                 <section className={styles.mainContent}>
//                     {renderContent()}
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default AdminDashboard;


import React, { ReactInstance, useEffect, useRef, useState } from 'react';
import AcademicInfo from '../AcademicInfo/AcademicInfo';
import Declaration from '../Declaration/Declaration';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import styles from './AdminDashboard.module.css';
import { useAdmin } from '@/contexts/AdminContext';
import { user_url } from '@/Utils/endpoints';
import { useReactToPrint } from 'react-to-print';
import PrintableStudentInfo from '../PrintableStudentInfo/PrintableStudentInfo';

const AdminDashboard: React.FC = () => {
    const { activeTab, setActiveTab, renderContent }: any = useAdmin();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(user_url);
            const data = await response.json();
            console.log(
                "Fetched users", data
            );
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserDetails = (studentId: number) => {
        console.log(`Fetching details for student ID: ${studentId}`);
        const user = users.find((user:any) => user.studentId === studentId);
        if (user) {
            setSelectedUser(user);
        } else {
            console.error('User not found');
        }
    };

    const fetchUserDetailsOld = async (userId: number) => {
        console.log(`sssssssssssssssssssssssssss============>${user_url}/${userId}`);
        try {
            const response = await fetch(`${user_url}/${userId}`);
            const data = await response.json();
            setSelectedUser(data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const componentRef = useRef<any>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.title}>Backend Page Display</h1>
                <button className={styles.logoutBtn}>Logout</button>
            </header>
            <div className={styles.content}>
                <aside className={styles.sidebar}>
                    <h3 className={styles.sidebarTitle}>Prospective Students</h3>
                    <ul className={styles.studentList}>
                        {users.map((user: any) => (
                            <li
                                key={user.id}
                                className={styles.studentItem}
                                onClick={() => fetchUserDetails(user.studentId)}
                            >
                                {user.surname} {user.firstname}
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className={styles.mainContent}>
                    <nav className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === 'personal' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('personal')}
                        >
                            Personal Information
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'academic' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('academic')}
                        >
                            Academic Information
                        </button>
                        <button
                            className={`${styles.tab} ${activeTab === 'declaration' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('declaration')}
                        >
                            Declaration
                        </button>
                    </nav>
                    <div className={styles.tabContent}>
                        {/* <h2 className={styles.contentTitle}>Student Application Details</h2> */}
                        {renderContent(selectedUser)}
                    </div>
                    <button onClick={handlePrint} className={styles.printButton}>
                        Print All Details
                    </button>
                </main>
                <div style={{ display: 'none' }}>
                    <PrintableStudentInfo ref={componentRef} user={selectedUser} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

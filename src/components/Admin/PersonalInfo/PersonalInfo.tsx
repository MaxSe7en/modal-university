import React from 'react';
import styles from './PersonalInfo.module.css';

interface User {
    id: number;
    studentId: number;
    surname: string;
    firstname: string;
    othernames: string;
    email: string;
    phone: string;
    // Add other relevant fields
}

interface Props {
    users: User[];
}


const PersonalInfo: React.FC<Props> = ({ users }) => {
    //     return (
    //         <div>
    //             <h2>Personal Information</h2>
    //             <table className={styles.table}>
    //                 <thead>
    //                     <tr>
    //                         <th>ID</th>
    //                         <th>Student ID</th>
    //                         <th>Surname</th>
    //                         <th>First Name</th>
    //                         <th>Other Names</th>
    //                         <th>Email</th>
    //                         <th>Phone</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {users.map(user => (
    //                         <tr key={user.id}>
    //                             <td>{user.id}</td>
    //                             <td>{user.studentId}</td>
    //                             <td>{user.surname}</td>
    //                             <td>{user.firstname}</td>
    //                             <td>{user.othernames}</td>
    //                             <td>{user.email}</td>
    //                             <td>{user.phone}</td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>
    //     );
    // };
    return (
        <div className={styles.personalInfo}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            {users.map((user: any) => (
                <div key={user.id} className={styles.infoCard}>
                    <div className={styles.userHeader}>
                        <h4 className={styles.userName}>{`${user.surname} ${user.firstname} ${user.othernames}`}</h4>
                        <span className={styles.studentId}>Student ID: {user.studentId}</span>
                    </div>
                    <div className={styles.infoColumns}>
                        <div className={styles.leftColumn}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Email:</span>
                                <span className={styles.value}>{user.email}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Phone:</span>
                                <span className={styles.value}>{user.phone}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Date of Birth:</span>
                                <span className={styles.value}>{user.dateOfBirth}</span>
                            </div>
                        </div>
                        <div className={styles.rightColumn}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Gender:</span>
                                <span className={styles.value}>{user.gender}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Nationality:</span>
                                <span className={styles.value}>{user.nationality}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Address:</span>
                                <span className={styles.value}>{user.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default PersonalInfo;
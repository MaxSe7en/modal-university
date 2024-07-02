import React from 'react';
import styles from '../css/Table.module.css';

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
    return (
        <div>
            <h2>Personal Information</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student ID</th>
                        <th>Surname</th>
                        <th>First Name</th>
                        <th>Other Names</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.studentId}</td>
                            <td>{user.surname}</td>
                            <td>{user.firstname}</td>
                            <td>{user.othernames}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PersonalInfo;
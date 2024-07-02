import React from 'react';
import styles from '../css/Table.module.css';

interface Subject {
    id: number;
    subject: string;
    grade: string;
    fkAcademicInfoId: number;
}

interface AcademicInformation {
    id: number;
    userId: number;
    indexNumber: string;
    examinationTitle: string;
    monthYear: string;
    awaiting: string;
    numberRows: string;
    subjects: Subject[];
}

interface User {
    id: number;
    studentId: number;
    surname: string;
    firstname: string;
    othernames: string;
    academicInformation: AcademicInformation;
}

interface Props {
    users: User[];
}

const AcademicInfo: React.FC<Props> = ({ users }) => {
    return (
        <div>
            <h2>Academic Information</h2>{JSON.stringify(users)}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Examination Title</th>
                        <th>Month/Year</th>
                        <th>Index Number</th>
                        <th>Awaiting</th>
                        <th>Number of Rows</th>
                        <th>Subjects</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        const info = user.academicInformation;
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.studentId}</td>
                                <td>{`${user.surname} ${user.firstname} ${user.othernames}`}</td>
                                <td>{info.examinationTitle}</td>
                                <td>{info.monthYear}</td>
                                <td>{info.indexNumber}</td>
                                <td>{info.awaiting}</td>
                                <td>{info.numberRows}</td>
                                <td>
                                    <ul>
                                        {info.subjects.map(subject => (
                                            <li key={subject.id}>{`${subject.subject}: ${subject.grade}`}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AcademicInfo;
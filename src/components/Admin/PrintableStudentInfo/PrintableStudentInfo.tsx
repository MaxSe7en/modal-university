import React, { forwardRef } from "react";
import styles from "./PrintableStudentInfo.module.css";

interface Subject {
  id: number;
  subject: string;
  grade: string;
}

interface AcademicInfo {
  examinationTitle: string;
  monthYear: string;
  indexNumber: string;
  subjects: Subject[];
}

interface User {
  id: number;
  studentId: string;
  surname: string;
  firstname: string;
  othernames: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  address: string;
  academicInfo: AcademicInfo;
  declarationDate: string;
}

interface Props {
  user: any;
}

const PrintableStudentInfo: React.ForwardRefRenderFunction<
  HTMLDivElement,
  Props
> = ({ user }, ref: any) => {
  const pageStyle = `
    @page {
      margin: 70pt 60pt 70pt;
    }
  `;
  return (
    <div ref={ref} className={styles.printable}>
      <style>{pageStyle}</style>
      <h1 className={styles.title}>Student Information</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Personal Information</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Full Name:</span>
            <span
              className={styles.value}
            >{`${user?.surname} ${user?.firstname} ${user?.othernames}`}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Student ID:</span>
            <span className={styles.value}>{user?.studentId}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{user?.email}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Phone:</span>
            <span className={styles.value}>{user?.phone}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Title:</span>
            <span className={styles.value}>{user?.title}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Date of Birth:</span>
            <span className={styles.value}>{user?.dob}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Gender:</span>
            <span className={styles.value}>{user?.gender}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Nationality:</span>
            <span className={styles.value}>{user?.nationality}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Address:</span>
            <span className={styles.value}>{user?.address}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Marital Status:</span>
            <span className={styles.value}>{user?.maritalstatus}</span>
          </div>
          
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Academic Information</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Examination Title:</span>
            <span className={styles.value}>
              {user?.academicInformation?.examinationTitle}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Month/Year:</span>
            <span className={styles.value}>
              {user?.academicInformation?.monthYear}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Index Number:</span>
            <span className={styles.value}>
              {user?.academicInformation?.indexNumber}
            </span>
          </div>
        </div>
        <h3 className={styles.subSectionTitle}>Subjects and Grades</h3>
        <table className={styles.subjectsTable}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {user?.academicInformation?.subjects.map(
              (subject: { id: React.Key; subject: any; grade: any }) => (
                <tr key={subject.id}>
                  <td>{subject.subject}</td>
                  <td>{subject.grade}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Declaration</h2>
        <p className={styles.declaration}>
          I,{" "}
          <em>
            {user?.surname} {user?.firstname}
          </em>
          , hereby declare that all the information provided in this application
          is true and correct to the best of my knowledge.
        </p>
        <div className={styles.signature}>
          <div className={styles.signatureLine}></div>
          <span className={styles.signatureLabel}>Signature</span>
        </div>
        <div className={styles.date}>
          <span className={styles.label}>Date:</span>
          <span className={styles.value}>{user?.declarationDate}</span>
        </div>
      </section>
    </div>
  );
};

export default forwardRef(PrintableStudentInfo);

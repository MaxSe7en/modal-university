import React, { useRef } from "react";
import styles from "./AcademicInfo.module.css";
import { useReactToPrint } from "react-to-print";
import PrintAcademicInfo from "./PrintAcademicInfo";

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
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className={styles.academicInfo}>
      <div className={styles.header}>
        <h3 className={styles.sectionTitle}>Academic Information</h3>
        <button onClick={handlePrint} className={styles.printButton}>
          Print
        </button>
      </div>
      {users.map((user) => (
        <div key={user.id} className={styles.academicCard}>
          {/* {JSON.stringify(user.academicInformation)} */}
          <h4
            className={styles.studentName}
          >{`${user.surname} ${user.firstname}`}</h4>
          <div className={styles.examInfo}>
            <p>
              <strong>Examination:</strong>{" "}
              {user.academicInformation.examinationTitle}
            </p>
            <p>
              <strong>Month/Year:</strong> {user.academicInformation.monthYear}
            </p>
            <p>
              <strong>Index Number:</strong>{" "}
              {user.academicInformation.indexNumber}
            </p>
            <p>
              <strong>Results Status</strong>{" "}
              <span className={`${styles.resultStatus} ${user.academicInformation.awaiting == "1" ? styles.awaiting : styles.released}`}>
                {user.academicInformation.awaiting == "1" ? 'Awaiting' : 'Released'}
              </span>
            </p>
          </div>
          <div className={styles.subjectsGrid}>
            {user.academicInformation.subjects.map((subject) => (
              <div key={subject.id} className={styles.subjectItem}>
                <span className={styles.subjectName}>{subject.subject}</span>
                <span className={styles.subjectGrade}>{subject.grade}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'none' }}>
            <PrintAcademicInfo ref={componentRef} user={user} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default AcademicInfo;

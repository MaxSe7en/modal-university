import React, { forwardRef } from "react";
import styles from "./PrintAcademicInfo.module.css";

interface Props {
  user: any;
}

const PrintAcademicInfo = forwardRef<HTMLDivElement, Props>(({ user }, ref) => {
  return (
    <div className={styles.printAcademicInfo} ref={ref}>
      <h2 className={styles.printTitle}>Academic Information</h2>
      <div className={styles.academicCard}>
        <h3
          className={styles.studentName}
        >{`${user.surname} ${user.firstname}`}</h3>
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
            <strong>Results Status:</strong>
            <span
              className={`${styles.resultStatus} ${
                user.academicInformation.awaiting == "1"
                  ? styles.awaiting
                  : styles.released
              }`}
            >
              {user.academicInformation.awaiting == "1"
                ? "Awaiting"
                : "Released"}
            </span>
          </p>
        </div>
        <h4 className={styles.subjectsTitle}>Subjects and Grades</h4>
        <div className={styles.subjectsGrid}>
          {user.academicInformation.subjects.map((subject: any) => (
            <div key={subject.id} className={styles.subjectItem}>
              <span className={styles.subjectName}>{subject.subject}</span>
              <span className={styles.subjectGrade}>{subject.grade}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

PrintAcademicInfo.displayName = "PrintAcademicInfo";

export default PrintAcademicInfo;

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
        <h3 className={styles.studentName}>
          {`${user.surname} ${user.firstname}`}
        </h3>
        <div className={styles.examInfo}>
          <p>
            <strong>Examination:</strong>{" "}
            {user.academicInformation.examinationTitle}
          </p>
          <p>
            <strong>School Attended:</strong>{" "}
            {user.academicInformation.schoolAttended || "N/A"}
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
                  ? styles.awaitinga
                  : styles.releaseda
              }`}
            >
              {user.academicInformation.awaiting == "1"
                ? "Awaiting"
                : "Released"}
            </span>
          </p>
          <p>
            <strong>Programme:</strong> {user.academicInformation.programme || "N/A"}
          </p>
        </div>
        <h4 className={styles.subjectsTitle}>Subjects and Grades</h4>
        <table className={styles.subjectsTable}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {user.academicInformation.subjects.map((subject: any) => (
              <tr key={subject.id}>
                <td>{subject.subject}</td>
                <td>{subject.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

PrintAcademicInfo.displayName = "PrintAcademicInfo";

export default PrintAcademicInfo;

import React from 'react';
import styles from './ReviewPage.module.css';

const ReviewPage = ({ userInfo, academicInformation, onBack }: any) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Application Review</h1>
      
      <section className={styles.section}>
        <h2>Personal Information</h2>
        <div className={styles.infoGrid}>
          {Object.entries(userInfo).map(([key, value]) => (
            <div key={key} className={styles.infoItem}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value as React.ReactNode}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Academic Information</h2>
        <div className={styles.academicInfo}>
        {/* {JSON.stringify(academicInformation)} */}
        {academicInformation.schoolAttended && academicInformation.schoolAttended.trim() !== "" && (
          <div className={styles.schoolNameDisplay}>
            <span className={styles.schoolNameLabel}>School Name:</span>
            <span className={styles.schoolNameValue}>{academicInformation.schoolAttended}</span>
          </div>
        )}
          <p><strong>Admission Status:</strong> {academicInformation.admissionStatus}</p>
          {/* <p><strong>Created At:</strong> {new Date(academicInformation.createdAt).toLocaleString()}</p> */}
          
          {academicInformation.slips.map((slip:any, index: number) => (
            <div key={index} className={styles.slip}>
              <h3>Examination Details</h3>
              <p><strong>Title:</strong> {slip.examinationTitle}</p>
              <p><strong>Date:</strong> {slip.monthYear}</p>
              <p><strong>Index Number:</strong> {slip.indexNumber}</p>
              <p><strong>Awaiting Results:</strong> {slip.awaiting === "1" ? "Yes" : "No"}</p>
              
              <h4>Subjects</h4>
              <ul className={styles.subjectList}>
                {slip.subjects.map((subject: any, subIndex: any) => (
                  <li key={subIndex}>
                    {subject.subject}: {subject.grade || 'Awaiting'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <button className={styles.fab} onClick={onBack} aria-label="Back to Dashboard">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          <text>Go back</text>
        </svg>
      </button>
      {/* <button className={styles.backButton} onClick={onBack}>Back to Dashboard</button> */}
      {/* <section className={styles.section}>
        <h2>Declaration</h2>
        <p>{declaration === "true" ? "I confirm that all the information provided is true and correct." : "Declaration not confirmed."}</p>
      </section>

      <button className={styles.submitButton}>Submit Application</button> */}
    </div>
  );
};

export default ReviewPage;
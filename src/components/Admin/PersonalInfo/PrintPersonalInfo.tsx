import React, { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import styles from "./PrintPersonalInfo.module.css";
interface Props {
  user: any;
}
const PrintPersonalInfo = forwardRef(({ user }:any, ref: any) => {
  return (
    <div className={styles.personalInfo}>
      <div className={styles.headerSection}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        
      </div>
      <div ref={ref}>
          <div key={user.id} className={styles.infoCard}>
            <div className={styles.userHeader}>
              <h4
                className={styles.userName}
              >{`${user.surname} ${user.firstname} ${user.othernames}`}</h4>
              <span className={styles.studentId}>
                Student ID: {user.studentId}
              </span>
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
                  <span className={styles.value}>{user.dob}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Gender:</span>
                  <span className={styles.value}>{user.gender}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Nationality:</span>
                  <span className={styles.value}>{user.nationality}</span>
                </div>
              </div>
              <div className={styles.rightColumn}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Religion:</span>
                  <span className={styles.value}>{user.religion}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Title:</span>
                  <span className={styles.value}>{user.title}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Place of Birth:</span>
                  <span className={styles.value}>{user.placeofbirth}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Marital Status:</span>
                  <span className={styles.value}>{user.maritalstatus}</span>
                </div>
              </div>
            </div>
            <div className={styles.emergencyHeader}>
              <h4 className={styles.userName}>Emergency Contact Information</h4>
            </div>
            <div className={styles.infoColumns}>
              <div className={styles.leftColumn}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Name:</span>
                  <span className={styles.value}>
                    {user.emergencycontactname}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Relationship:</span>
                  <span className={styles.value}>
                    {user.emergencycontactrelationship}
                  </span>
                </div>
              </div>
              <div className={styles.rightColumn}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Contact Number:</span>
                  <span className={styles.value}>
                    {user.emergencycontactnumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
});

PrintPersonalInfo.displayName = 'PrintPersonalInfo';
export default PrintPersonalInfo;

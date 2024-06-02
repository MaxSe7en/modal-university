import React from 'react';
import styles from './css/AcademicInfoMobile.module.css';
import { gradeOptions } from '@/Utils/constants';

type AcademicInfoMobileProp = {
  activeStep: number;
  parentStyles: {
    readonly [key: string]: string;
  };
};

export default function AcademicInfoMobile({
  activeStep,
  parentStyles,
}: Readonly<AcademicInfoMobileProp>) {


  return (
    <div
      className={`${parentStyles["formbold-form-step-2"]} ${
        activeStep === 2 ? parentStyles["active"] : ""
      }`}
    >
      <div className={styles.formboldInputFlex}>
        <div className={parentStyles["formbold-form-label"]}>
          <h4>Entry Qualifications</h4>
        </div>
        <span>
          Please list the qualification with which you are applying, including
          grades obtained in every examination you took.
        </span>
        <span>INDICATE IF YOU ARE AWAITING EXAMINATION RESULTS.</span>
        <div className={styles.formboldGrid}>
          {[1, 2, 3].map((row) => (
            <div className={styles.formboldGridRow} key={row}>
              <div className={styles.formboldGridColumn}>
                <label>EXAMINATION TITLE</label>
                <input type="text" placeholder="eg. WASSCE" />
              </div>
              <div className={styles.formboldGridColumn}>
                <label>MONTH AND YEAR ATTEMPTED</label>
                <input type="text" placeholder="eg. June 2006" />
              </div>
              <div className={styles.formboldGridColumn}>
                <label>INDEX NUMBER</label>
                <input type="text" placeholder="eg 00103620202" />
              </div>
              <div className={`${styles.formboldGridColumn} ${styles.awaitingColumn}`}>
                <label>AWAITING</label>
                <input type="checkbox" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.formboldInputFlex}>
        <label className={parentStyles["formbold-form-label"]}>
          Subjects and WASSCE Grades
        </label>
        <div className={styles.formboldGrid}>
          {Array.from({ length: 10 }, (_, index) => (
            <div className={styles.formboldGridRow} key={index}>
              <div className={styles.subjectColumn}>
                <label>SUBJECTS TAKEN</label>
                <input type="text" placeholder="Subject" />
              </div>
              {["1st", "2nd", "3rd"].map((attempt, idx) => (
                <div className={styles.gradeColumn} key={idx}>
                  <label>{attempt}</label>
                  <select>
                    {gradeOptions.map((grade, i) => (
                      <option key={i} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

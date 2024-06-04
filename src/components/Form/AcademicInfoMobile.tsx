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
      className={`${parentStyles["formbold-form-step-2"]} ${activeStep === 2 ? parentStyles["active"] : ""
        }`}
    >
      <div className={styles.formboldInputFlex}>
        <div className={parentStyles["formbold-form-label"]}>
          <span className={`${styles.fontBoldMainHeaders} ${parentStyles["formbold-form-label"]}`}>Entry Qualifications</span>
        </div>
        <span className={styles.qualificationNote}>
          Please list the qualification with which you are applying, including
          grades obtained in every examination you took.
        </span>
        <span className={styles.qualificationNote}>Indicate if you are awaiting examination results.</span>
        <div className={styles.formboldGrid}>
          {[1, 2, 3].map((row) => (
            <div className={styles.formboldGridRow} key={row}>
              <div className={styles.formboldGridColumn}>
                <span>EXAMINATION TITLE</span>
                <input type="text" placeholder="e.g. WASSCE" />
              </div>
              <div className={styles.formboldGridColumn}>
                <span>MONTH AND YEAR ATTEMPTED</span>
                <input type="text" placeholder="e.g. June, 2006" />
              </div>
              <div className={styles.formboldGridColumn}>
                <span>INDEX NUMBER</span>
                <input type="text" placeholder="e.g. 00103620202" />
              </div>
              <div className={`${styles.formboldGridColumn} ${styles.awaitingColumn}`}>
                <div>AWAITING</div>
                <label htmlFor={`awaitingLabel${row}`} className={styles["formbold-awaiting-info"]}>
                  <input type="checkbox" id={`awaitingLabel${row}`} className={`awaitingLabel ${styles.awaitingChecbox}`} />(check if awaiting results)</label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.formboldInputFlex}>
        <span className={`${styles.fontBoldMainHeaders} ${parentStyles["formbold-form-label"]}`}>
          Subjects and WASSCE Grades
        </span>
        <div className={styles.formboldGrid}>
          {Array.from({ length: 10 }, (_, index) => (
            <div className={styles.formboldGridRow} key={index}>
              <div className={styles.subjectColumn}>
                <div className={styles.subjectColumnTxt}>Subject Taken</div>
                <input type="text" placeholder="Subject" />
              </div>
              {["1st", "2nd", "3rd"].map((attempt, idx) => (
                <div className={styles.gradeColumn} key={idx}>
                  <label className={styles.subjectColumnTxt}>{attempt}</label>
                  <select className={styles.subjectColumnSelectBox}>
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
      <div className={styles.formboldInputFlex}>
        <div className={parentStyles["formbold-form-label"]}>
          <span className={`${styles.fontBoldMainHeaders} ${parentStyles["formbold-form-label"]} ${styles.lineHeight}`}>
            NON-WAEC EXAMINATION and FOREIGN APPLICANTS ONLY<span className={styles.foreignNoteTxt}>(Post Diploma - Diploma in Education-International Baccalaureate)</span>
          </span>
          <div className={`${styles.formboldGrid} ${styles.addMargin}`}>
          {[1,2].map((row) => (
            <div className={styles.formboldGridRow} key={row}>
              <div className={styles.formboldGridColumn}>
                <span className={styles.careerFieldsTxt}>NAME OF INSTITUTION</span>
                <input type="text" placeholder="Enter name of Institution" />
              </div>
              <div className={styles.formboldGridColumn}>
                <span className={styles.careerFieldsTxt}>DATE</span>
                <input type="month" className={styles.fixDateWidth} placeholder="mon - year" />
              </div>
              <div className={styles.formboldGridColumn}>
                <span className={styles.careerFieldsTxt}>QUALIFICATION</span>
                <input type="text" placeholder="Enter your qualification" />
              </div>
              <div className={styles.formboldGridColumn}>
                <span className={styles.careerFieldsTxt}>GRADE / GPA</span>
                <input type="text" placeholder="Enter your grade" />
              </div>
              <div className={styles.formboldGridColumn}>
                <span className={styles.careerFieldsTxt}>CLASS / HONOUR</span>
                <input type="text" placeholder="Enter your class" />
              </div>
              {/* <div className={`${styles.formboldGridColumn} ${styles.awaitingColumn}`}>
                <div>AWAITING</div>
                <label htmlFor="" className={styles["formbold-awaiting-info"]}>
                  <input type="checkbox" className={styles.awaitingChecbox} />(check if awaiting results)</label>
              </div> */}
            </div>
          ))}
        </div>
        </div>
      </div>

    </div>
  );
}

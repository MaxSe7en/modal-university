import React from "react";
import styles from "./css/AccademicInfotion.module.css";
import { gradeOptions } from "@/Utils/constants";

type AcademicInformationProp = {
  activeStep: number;
  parentStyles: {
    readonly [key: string]: string;
  };
};

export default function AcademicInformation({
  activeStep,
  parentStyles,
}: Readonly<AcademicInformationProp>) {

  return (
    <div
      className={`${parentStyles["formbold-form-step-2"]} ${activeStep === 2 ? parentStyles["active"] : ""
        }`}
    >
      <div className={styles.formboldInputFlex}>
        <div className={parentStyles["formbold-form-label"]}>
          <span className={`${styles.fontBoldMainHeaders} ${parentStyles["formbold-form-label"]}`}>Entry Qualifications</span>
        </div>
        <span className={`${styles.fontBoldMainHeadersTxt}`}>
          Please list the qualification with which you are applying, including
          grades obtained in every examination you took.
        </span>
        <span className={`${styles.fontBoldMainHeadersTxt}`}>Indicate if you are awaiting examination results.</span>
        <table className={styles.formboldTable}>
          <thead>
            <tr>
              <th>EXAMINATION TITLE</th>
              <th>MONTH AND YEAR ATTEMPTED</th>
              <th>INDEX NUMBER</th>
              <th>AWAITING</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((row) => (
              <tr key={row}>
                <td>
                  <input type="text" placeholder="eg. WASSCE" />
                </td>
                <td>
                  <input type="text" placeholder="eg. June 2006" />
                </td>
                <td>
                  <input type="text" placeholder="eg 00103620202" />
                </td>
                <td className={styles.awaitingCell}>
                  <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.formboldInputFlex}>
        <span className={`${styles.fontBoldMainHeaders} ${parentStyles["formbold-form-label"]}`}>
          Subjects and WASSCE Grades
        </span>
        <table className={styles.formboldTable}>
          <thead>
            <tr>
              <th rowSpan={2}>SUBJECTS TAKEN</th>
              <th colSpan={3}>WASSCE GRADES OBTAINED</th>
            </tr>
            <tr>
              <th>1st</th>
              <th>2nd</th>
              <th>3rd</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, index) => (
              <tr key={index}>
                <td className={styles.subjectCell}>
                  <input type="text" placeholder="Subject" />
                </td>
                <td className={styles.gradeCell}>
                  <select>
                    {gradeOptions.map((grade, i) => (
                      <option key={i} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </td>
                <td className={styles.gradeCell}>
                  <select>
                    {gradeOptions.map((grade, i) => (
                      <option key={i} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </td>
                <td className={styles.gradeCell}>
                  <select>
                    {gradeOptions.map((grade, i) => (
                      <option key={i} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
}

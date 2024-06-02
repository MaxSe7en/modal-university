import React from "react";
import styles from "./css/AccademicInfotion.module.css";

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
  const gradeOptions = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"];

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
        <label className={parentStyles["formbold-form-label"]}>
          Subjects and WASSCE Grades
        </label>
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

import React, { useState } from "react";
import styles from "./css/AcademicInfoMobile.module.css";
import { gradeOptions, validationRules } from "@/Utils/constants";
import { validateInput } from "@/Utils/utils";


type AcademicInfoMobileProp = {
  activeStep: number;
  parentStyles: {
    readonly [key: string]: string;
  };
};

type SlipData = {
  examinationTitle: string;
  monthYear: string;
  indexNumber: string;
  awaiting: boolean;
  numSubjects: number;
  subjects: { subject: string; grade: string }[];
};

export default function AcademicInfoMobile({
  activeStep,
  parentStyles,
}: Readonly<AcademicInfoMobileProp>) {
  const [numRows, setNumRows] = useState(0);
  const [slips, setSlips] = useState<SlipData[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleResultSlipsChange = (event: { target: { value: string } }) => {
    const numSlips = parseInt(event.target.value);
    setNumRows(numSlips);
    setSlips(
      Array.from({ length: numSlips }, () => ({
        examinationTitle: "",
        monthYear: "",
        indexNumber: "",
        awaiting: false,
        numSubjects: 0,
        subjects: [],
      }))
    );
  };

  const handleSlipChange = (
    slipIndex: number,
    field: keyof SlipData,
    value: string | boolean | number
  ) => {
    setSlips((prevSlips) => {
      const updatedSlips = [...prevSlips];
      updatedSlips[slipIndex] = {
        ...updatedSlips[slipIndex],
        [field]: value,
      };

      // Validate the input field
      const isValid = validateInput(value.toString(), validationRules[field]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`${field}_${slipIndex}`]: isValid ? "" : `Invalid ${field}`,
      }));

      return updatedSlips;
    });
  };

  const handleSubjectChange = (
    slipIndex: number,
    subjectIndex: number,
    field: "subject" | "grade",
    value: string
  ) => {
    setSlips((prevSlips) => {
      const updatedSlips = [...prevSlips];
      const updatedSubjects = [...updatedSlips[slipIndex].subjects];
      if (!updatedSubjects[subjectIndex]) {
        updatedSubjects[subjectIndex] = { subject: "", grade: "" };
      }
      updatedSubjects[subjectIndex][field] = value;
      updatedSlips[slipIndex].subjects = updatedSubjects;

      // Validate the subject field
      if (field === "subject") {
        const isValid = validateInput(value, validationRules.subject);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`subject_${slipIndex}_${subjectIndex}`]: isValid
            ? ""
            : "Invalid subject",
        }));
      }

      return updatedSlips;
    });
  };

  return (
    <div
      className={`${parentStyles["formbold-form-step-2"]} ${
        activeStep === 2 ? parentStyles["active"] : ""
      }`}
    >
      <div className={styles.formboldInputFlex}>
        <div className={parentStyles["formbold-form-label"]}>
          <span
            className={`${styles.fontBoldMainHeaders} ${parentStyles["formbold-form-label"]}`}
          >
            Entry Qualifications
          </span>
        </div>
        <span className={styles.qualificationNote}>
          Please list the qualification with which you are applying, including
          grades obtained in every examination you took.
        </span>
        <span className={styles.qualificationNote}>
          Indicate if you are awaiting examination results.
        </span>
        <div className={styles.rowSelectContainer}>
          <label htmlFor="rowSelect">
            How many results slips are you applying with:
          </label>
          <select
            id="rowSelect"
            value={numRows}
            onChange={handleResultSlipsChange}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option disabled={num === 0} key={num} value={num}>
                {num === 0 ? "Select number of results slips" : num}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formboldGrid}>
          {slips.map((slip, slipIndex) => (
            <div className={styles.formboldGridRow} key={slipIndex}>
              <div className={styles.formboldGridColumn}>
                <span>EXAMINATION TITLE</span>
                <input
                  type="text"
                  placeholder="e.g. WASSCE"
                  value={slip.examinationTitle}
                  onChange={(e) =>
                    handleSlipChange(
                      slipIndex,
                      "examinationTitle",
                      e.target.value
                    )
                  }
                  required
                />
                {errors[`examinationTitle_${slipIndex}`] && (
                  <span className="error">
                    {errors[`examinationTitle_${slipIndex}`]}
                  </span>
                )}
              </div>
              <div className={styles.formboldGridColumn}>
                <span>MONTH AND YEAR ATTEMPTED</span>
                <input
                  type="text"
                  placeholder="e.g. June, 2006"
                  value={slip.monthYear}
                  onChange={(e) =>
                    handleSlipChange(slipIndex, "monthYear", e.target.value)
                  }
                  required
                />
                {errors[`monthYear_${slipIndex}`] && (
                  <span className="error">
                    {errors[`monthYear_${slipIndex}`]}
                  </span>
                )}
              </div>
              <div className={styles.formboldGridColumn}>
                <span>INDEX NUMBER</span>
                <input
                  type="text"
                  placeholder="e.g. 00103620202"
                  value={slip.indexNumber}
                  onChange={(e) =>
                    handleSlipChange(slipIndex, "indexNumber", e.target.value)
                  }
                  required
                />
                {errors[`indexNumber_${slipIndex}`] && (
                  <span className="error">
                    {errors[`indexNumber_${slipIndex}`]}
                  </span>
                )}
              </div>
              <div
                className={`${styles.rowSelectContainer} ${styles.formboldGridColumn}`}
              >
                <span>NUMBER OF SUBJECTS</span>
                <select
                  id="rowSelect"
                  value={slip.numSubjects}
                  onChange={(e) =>
                    handleSlipChange(
                      slipIndex,
                      "numSubjects",
                      parseInt(e.target.value)
                    )
                  }
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} disabled={num === 0} value={num}>
                      {num === 0 ? "Select number of subjects" : num}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={`${styles.formboldGridColumn} ${styles.awaitingColumn}`}
              >
                <div>AWAITING</div>
                <label
                  htmlFor={`awaitingLabel${slipIndex}`}
                  className={styles["formbold-awaiting-info"]}
                >
                  <input
                    type="checkbox"
                    id={`awaitingLabel${slipIndex}`}
                    className={`awaitingLabel ${styles.awaitingChecbox}`}
                    checked={slip.awaiting}
                    onChange={(e) =>
                      handleSlipChange(slipIndex, "awaiting", e.target.checked)
                    }
                  />
                  (check if awaiting results)
                </label>
              </div>
              {slip.numSubjects > 0 && (
                <div className={styles.formboldInputFlex}>
                  <span
                    className={`${styles.fontBoldMainHeaders} ${parentStyles["formbold-form-label"]}`}
                  >
                    Subjects and WASSCE Grades
                  </span>
                  <table className={styles.subjectGradeTable}>
                    <thead>
                      <tr>
                        <th>Subject Taken</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(
                        { length: slip.numSubjects },
                        (_, subjectIndex) => (
                          <tr key={subjectIndex}>
                            <td>
                              <input
                                type="text"
                                placeholder="Subject"
                                value={
                                  slip.subjects[subjectIndex]
                                    ? slip.subjects[subjectIndex].subject
                                    : ""
                                }
                                onChange={(e) =>
                                  handleSubjectChange(
                                    slipIndex,
                                    subjectIndex,
                                    "subject",
                                    e.target.value
                                  )
                                }
                                required
                              />
                              {errors[
                                `subject_${slipIndex}_${subjectIndex}`
                              ] && (
                                <span className="error">
                                  {
                                    errors[
                                      `subject_${slipIndex}_${subjectIndex}`
                                    ]
                                  }
                                </span>
                              )}
                            </td>
                            <td>
                              <select
                                className={styles.subjectColumnSelectBox}
                                value={
                                  slip.subjects[subjectIndex]
                                    ? slip.subjects[subjectIndex].grade
                                    : ""
                                }
                                onChange={(e) =>
                                  handleSubjectChange(
                                    slipIndex,
                                    subjectIndex,
                                    "grade",
                                    e.target.value
                                  )
                                }
                              >
                                {gradeOptions.map((grade, i) => (
                                  <option key={i} value={grade}>
                                    {grade}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* <div className={styles.formboldInputFlex}>
 <div className={parentStyles["formbold-form-label"]}>
   <span className={`${styles.fontBoldMainHeaders} ${parentStyles["formbold-form-label"]} ${styles.lineHeight}`}>
     NON-WAEC EXAMINATION and FOREIGN APPLICANTS ONLY<span className={styles.foreignNoteTxt}>(Post Diploma - Diploma in Education-International Baccalaureate)</span>
   </span>
   <div className={`${styles.formboldGrid} ${styles.addMargin}`}>
     {[1, 2].map((row) => (
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
         <div className={`${styles.formboldGridColumn} ${styles.awaitingColumn}`}>
         <div>AWAITING</div>
         <label htmlFor="" className={styles["formbold-awaiting-info"]}>
           <input type="checkbox" className={styles.awaitingChecbox} />(check if awaiting results)</label>
       </div>
       </div>
     ))}
   </div>
 </div>
</div> */}
    </div>
  );
}

import React from "react";
import styles from "./css/AccademicInfotion.module.css";
import { gradeOptions } from "@/Utils/constants";
import { useForm } from "@/contexts/FormContext";

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
  const { academicInfo, handleAcademicChange, errors }: any = useForm();

  const handleResultSlipsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const numSlips = parseInt(event.target.value);
    const newSlips = Array.from({ length: numSlips }, () => ({
      examinationTitle: "",
      monthYear: "",
      indexNumber: "",
      awaiting: false,
      numSubjects: 0,
      subjects: [],
    }));
    handleAcademicChange({ ...academicInfo, numRows: numSlips, slips: newSlips });
  };

  const handleSlipChange = (slipIndex: number, field: string, value: any) => {
    const updatedSlips = [...academicInfo.slips];
    updatedSlips[slipIndex] = { ...updatedSlips[slipIndex], [field]: value };
  
    if (field === "awaiting" && value === true) {
      // Clear grades when awaiting is checked
      updatedSlips[slipIndex].subjects = updatedSlips[slipIndex].subjects.map((subject: any)  => ({
        ...subject,
        grade: ""
      }));
    }
  
    handleAcademicChange({ ...academicInfo, slips: updatedSlips });
  };

  const handleSubjectChange = (slipIndex: number, subjectIndex: number, field: string, value: string) => {
    const updatedSlips = [...academicInfo.slips];
    const updatedSubjects = [...updatedSlips[slipIndex].subjects];
    if (!updatedSubjects[subjectIndex]) {
      updatedSubjects[subjectIndex] = { subject: "", grade: "" };
    }
    updatedSubjects[subjectIndex][field] = value;
    
    // If a grade is being added, uncheck the awaiting checkbox
    if (field === "grade" && value !== "") {
      updatedSlips[slipIndex].awaiting = false;
    }
    
    updatedSlips[slipIndex].subjects = updatedSubjects;
    handleAcademicChange({ ...academicInfo, slips: updatedSlips });
  };

  return (
    <div className={`${parentStyles["formbold-form-step-2"]} ${activeStep === 2 ? parentStyles["active"] : ""}`}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.fontBoldMainHeaders}>Entry Qualifications</h2>
          <p className={styles.qualificationNote}>
            Please list the qualification with which you are applying, including
            grades obtained in every examination you took.
          </p>
          <p className={styles.qualificationNote}>
            Indicate if you are awaiting examination results.
          </p>
        </div>
        <div className={styles.rowSelectContainer}>
          <label htmlFor="rowSelect" className={styles.resultSlip}>
            How many results slips are you applying with:
          </label>
          <select
            id="rowSelect"
            value={academicInfo?.numRows}
            onChange={handleResultSlipsChange}
            className={styles.selectInput}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option disabled={num === 0} key={num} value={num}>
                {num === 0 ? "Select number of results slips" : num}
              </option>
            ))}
          </select>
          {errors.numRows && <span className={styles.error}>{errors.numRows}</span>}
        </div>
        <div className={styles.formboldGrid}>
          {academicInfo?.slips.map((slip: any, slipIndex: number) => (
            <div className={styles.formboldGridRow} key={slipIndex}>
              <div className={styles.formboldGridColumn}>
                <span>EXAMINATION TITLE</span>
                <input
                  type="text"
                  placeholder="e.g. WASSCE"
                  value={slip.examinationTitle}
                  onChange={(e) => handleSlipChange(slipIndex, "examinationTitle", e.target.value)}
                  required
                />
                {errors[`examinationTitle_${slipIndex}`] && (
                  <span className={styles.error}>{errors[`examinationTitle_${slipIndex}`]}</span>
                )}
              </div>
              <div className={styles.formboldGridColumn}>
                <span>MONTH AND YEAR ATTEMPTED</span>
                <input
                  type="text"
                  placeholder="e.g. June, 2006"
                  value={slip.monthYear}
                  onChange={(e) => handleSlipChange(slipIndex, "monthYear", e.target.value)}
                  required
                />
                {errors[`monthYear_${slipIndex}`] && (
                  <span className={styles.error}>{errors[`monthYear_${slipIndex}`]}</span>
                )}
              </div>
              <div className={styles.formboldGridColumn}>
                <span>INDEX NUMBER</span>
                <input
                  type="text"
                  placeholder="e.g. 00103620202"
                  value={slip.indexNumber}
                  onChange={(e) => handleSlipChange(slipIndex, "indexNumber", e.target.value)}
                  required
                />
                {errors[`indexNumber_${slipIndex}`] && (
                  <span className={styles.error}>{errors[`indexNumber_${slipIndex}`]}</span>
                )}
              </div>
              <div className={styles.formboldGridColumn}>
                <span>NUMBER OF SUBJECTS</span>
                <select
                  value={slip.numSubjects}
                  onChange={(e) => handleSlipChange(slipIndex, "numSubjects", parseInt(e.target.value))}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} disabled={num === 0} value={num}>
                      {num === 0 ? "Select number of subjects" : num}
                    </option>
                  ))}
                </select>
                {errors[`numSubjects_${slipIndex}`] && (
                  <span className={styles.error}>{errors[`numSubjects_${slipIndex}`]}</span>
                )}
              </div>
              <div className={styles.awaitingColumn}>
                <span>AWAITING</span>
                <label htmlFor={`awaitingLabel${slipIndex}`} className={styles.awaitingLabel}>
                  <input
                    type="checkbox"
                    id={`awaitingLabel${slipIndex}`}
                    className={styles.awaitingChecbox}
                    checked={slip.awaiting}
                    onChange={(e) => handleSlipChange(slipIndex, "awaiting", e.target.checked)}
                  />
                  (check if awaiting results)
                </label>
              </div>
              {slip.numSubjects > 0 && (
                <div className={styles.formboldGridColumn}>
                  <h3 className={styles.fontBoldMainHeaders}>Subjects and WASSCE Grades</h3>
                  <table className={styles.subjectGradeTable}>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: slip.numSubjects }, (_, subjectIndex) => (
                        <tr key={subjectIndex}>
                          <td>
                            <input
                              type="text"
                              placeholder="Subject"
                              value={slip.subjects[subjectIndex]?.subject || ""}
                              onChange={(e) => handleSubjectChange(slipIndex, subjectIndex, "subject", e.target.value)}
                              required
                            />
                            {errors[`subject_${slipIndex}_${subjectIndex}`] && (
                              <span className={styles.error}>{errors[`subject_${slipIndex}_${subjectIndex}`]}</span>
                            )}
                          </td>
                          <td>
                            <select
                              value={slip.subjects[subjectIndex]?.grade || ""}
                              onChange={(e) => handleSubjectChange(slipIndex, subjectIndex, "grade", e.target.value)}
                              // disabled={slip.awaiting}
                            >
                              {gradeOptions.map((grade) => (
                                <option disabled={grade === "Z0"} key={grade}>
                                  {grade === "Z0" ? "" : grade}
                                </option>
                              ))}
                            </select>
                            {errors[`grade_${slipIndex}_${subjectIndex}`] && (
                              <span className={styles.error}>{errors[`grade_${slipIndex}_${subjectIndex}`]}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
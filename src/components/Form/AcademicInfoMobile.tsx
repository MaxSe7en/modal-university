import React, { useEffect, useState } from "react";
import styles from "./css/AcademicInfoMobile.module.css";
import { gradeOptions, validationRules } from "@/Utils/constants";
import { validateInput } from "@/Utils/utils";
import { useForm } from "@/contexts/FormContext";
import { programmes_url } from "@/Utils/endpoints";


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
  const { academicInfo, handleAcademicChange, errors, handleSchoolNameChange }: any = useForm();
  const [tertiaryProgrammes, setTertiaryProgrammes] = useState<string[]>([]);
  const [selectedProgramme, setSelectedProgramme] = useState<string>("");

  const handleResultSlipsChange = (event: { target: { value: string; }; }) => {
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
 
 
  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await fetch(programmes_url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTertiaryProgrammes(data.data); // Adjust the key based on your API response structure
        } else {
          console.error("Failed to fetch tertiary programmes");
        }
      } catch (error) {
        console.error("An error occurred while fetching programmes:", error);
      }
    };

    fetchProgrammes();
  }, []);

  // Handle Programme Selection Change
  const handleProgrammeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProgramme(event.target.value);
    handleAcademicChange({ ...academicInfo, programme: event.target.value });
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
    <div
      className={`${parentStyles["formbold-form-step-2"]} ${activeStep === 2 ? parentStyles["active"] : ""
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
        <div className={styles.formboldGridColumn}>
          <span>SCHOOL ATTENDED NAME (Optional)</span>
          <input
            type="text"
            placeholder="e.g. Accra Academy"
            value={academicInfo.schoolName}
            onChange={handleSchoolNameChange}
          />
        </div>
        <div className={styles.formboldGridColumn}>
          <span>TERTIARY PROGRAMME OF INTEREST</span>
          <select
            value={selectedProgramme}
            onChange={handleProgrammeChange}
          >
            <option value="" disabled>
              Select a programme
            </option>
            {tertiaryProgrammes && tertiaryProgrammes.map((programme: any) => (
              <option key={programme.id} value={programme.name}>
                {programme.name}
              </option>
            ))}
          </select>
          {errors.selectedProgramme && (
            <span className={`${styles.error} ${styles["formbold-error"]}`}>
              {errors.selectedProgramme}
            </span>
          )}
        </div>
        <div className={styles.rowSelectContainer}>
          <label htmlFor="rowSelect" className={styles.resultSlip}>
            How many results slips are you applying with:
          </label>
          <select
            id="rowSelect"
            value={academicInfo?.numRows}
            onChange={handleResultSlipsChange}
          >
            {[0, 1, 2, 3].map((num) => (
              <option disabled={num === 0} key={num} value={num}>
                {num === 0 ? "Select number of results slips" : num}
              </option>
            ))}
          </select>
          {errors.numRows && <span className={`${styles.error} ${styles["formbold-error"]}`}>{errors.numRows}</span>}
        </div>
        <div className={styles.formboldGrid}>
          {academicInfo?.slips.map((slip: {
            numSubjects: any;
            awaiting: boolean | undefined;
            subjects: any; examinationTitle: any; monthYear: any; indexNumber: any
          }, slipIndex: number) => (
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
                  <span className={`${styles.error} ${styles["formbold-error"]}`}>{errors[`examinationTitle_${slipIndex}`]}</span>
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
                  <span className={`${styles.error} ${styles["formbold-error"]}`}>{errors[`monthYear_${slipIndex}`]}</span>
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
                  <span className={`${styles.error} ${styles["formbold-error"]}`}>{errors[`indexNumber_${slipIndex}`]}</span>
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
                {errors[`numSubjects_${slipIndex}`] && (
                  <span className={`${styles.error} ${styles["formbold-error"]}`}>{errors[`numSubjects_${slipIndex}`]}</span>
                )}
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
                    checked={Boolean(slip?.awaiting == undefined ? 0 : +slip?.awaiting)}
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
                        <th>Subject</th>
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
                              {errors[`subject_${slipIndex}_${subjectIndex}`] && (
                                <span className={`${styles.error} ${styles["formbold-error"]}`}>{errors[`subject_${slipIndex}_${subjectIndex}`]}</span>
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
                                // disabled={slip.awaiting}
                              >
                                {gradeOptions.map((grade, i) => (
                                  <option disabled={grade === "Z0"} key={grade} >
                                    {grade === "Z0" ? "" : grade}
                                  </option>
                                ))}
                              </select>
                              {errors[`grade_${slipIndex}_${subjectIndex}`] && (
                                <span className={`${styles.error} ${styles["formbold-error"]}`}>{errors[`grade_${slipIndex}_${subjectIndex}`]}</span>
                              )}
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
    </div>
  );
}


// const handleSlipChangeOld = (slipIndex: any, field: string, value: any) => {
//   const updatedSlips: any = [...academicInfo.slips];
//   updatedSlips[slipIndex] = { ...updatedSlips[slipIndex], [field]: value };
//   const updatedSubjects = [...updatedSlips[slipIndex].subjects];
//   console.log("jjjjjjjjjjjjjjjjjjjjjjj", updatedSubjects, field, value)
//   // updatedSubjects[index] = {};
//   if (field == "numSubjects") {

//     for (let index = 0; index < value; index++) {
//       updatedSubjects[index] = { subject: "", grade: "" };

//     }
//   }
//   updatedSlips[slipIndex].subjects = updatedSubjects;
//   // if (!updatedSubjects[subjectIndex]) {
//   // updatedSubjects[subjectIndex] = { subject: "", grade: "" };
//   // }
//   handleAcademicChange({ ...academicInfo, slips: updatedSlips });
// };

// const handleSlipChange = (slipIndex: number, field: string, value: any) => {
//   const updatedSlips = [...academicInfo.slips];
//   updatedSlips[slipIndex] = { ...updatedSlips[slipIndex], [field]: value };
//   if (field === "awaiting" && value === true) {
//     // Clear grades when awaiting is checked
//     updatedSlips[slipIndex].subjects = updatedSlips[slipIndex].subjects.map((subject: any) => ({
//       ...subject,
//       grade: ""
//     }));
//   }
//   if (field === "numSubjects") {
//     const numSubjects = parseInt(value);
//     let updatedSubjects = [...updatedSlips[slipIndex].subjects];

//     // Resize the subjects array based on the new number of subjects
//     if (numSubjects < updatedSubjects.length) {
//       // If reducing the number of subjects, remove excess entries
//       updatedSubjects = updatedSubjects.slice(0, numSubjects);
//     } else {
//       // If increasing the number of subjects, add new empty entries
//       for (let i = updatedSubjects.length; i < numSubjects; i++) {
//         updatedSubjects.push({ subject: "", grade: "" });
//       }
//     }

//     updatedSlips[slipIndex].subjects = updatedSubjects;
//   }

//   handleAcademicChange({ ...academicInfo, slips: updatedSlips });
// };

// const handleSubjectChange = (slipIndex: any, subjectIndex: number, field: string, value: string) => {
//   const updatedSlips: any = [...academicInfo.slips];
//   const updatedSubjects = [...updatedSlips[slipIndex].subjects];
//   console.log("jjjjjjjjdsffffffffffffffffffffffffjjjjjjjjjjjjjjj", updatedSubjects, subjectIndex, field)
//   if (!updatedSubjects[subjectIndex]) {
//     updatedSubjects[subjectIndex] = { subject: "", grade: "" };
//   }
//   updatedSubjects[subjectIndex][field] = value;
//   updatedSlips[slipIndex].subjects = updatedSubjects;
//   handleAcademicChange({ ...academicInfo, slips: updatedSlips });
// };

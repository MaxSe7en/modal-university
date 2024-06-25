import React, { useState } from "react";
import dynamic from "../../../node_modules/next/dynamic";
import styles from "./form.module.css";
import FormHeader from "../FormHeader/FormHeader";
import FormTitleCheckbox from "./FormTitleCheckbox";
import { getYear } from "@/Utils/utils";
import FormInput from "./FormInput";
import { requiredInfo, studentInformation } from "@/Utils/constants";
import { useMediaQuery } from "react-responsive";
import DateOfBirthInput from "./DateOfBirth";
import { useForm } from "@/contexts/FormContext";
// import AcademicInformation from "./AcademicInformation";
// import AcademicInfoMobile from "./AcademicInfoMobile";

const AcademicInfoMobile = dynamic(() => import("./AcademicInfoMobile"), {
  ssr: false,
});

const AcademicInformation = dynamic(() => import("./AcademicInformation"), {
  ssr: false,
});

const Form = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const {
    inputValues,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    validate,
    academicInfo,
    validateAcademicInfo,
    activeStep,
    setActiveStep,
    declarationError,
    declareState,
    setDeclareState,
  }: any = useForm();
  const handleNext = () => {
    const validationErrors = validate(inputValues);
    const academicValidationErrors = validateAcademicInfo(academicInfo);
    const combinedErrors = { ...validationErrors, ...academicValidationErrors };


    switch (activeStep) {
      case 1: {
        if (Object.keys(validationErrors).length === 0) {
          // if (activeStep < 3) {
          setActiveStep(activeStep + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
          // }
        } else {
          setErrors(validationErrors);
          // setErrors(combinedErrors);
          // Handle errors, e.g., show a message to the user
          console.log("Please fill in all required fields.");
        }
        break;
      }
      case 2: {
        if (Object.keys(academicValidationErrors).length === 0) {
          // if (activeStep < 3) {
          setActiveStep(activeStep + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
          // }
        } else {
          setErrors(academicValidationErrors);
          // setErrors(combinedErrors);
          // Handle errors, e.g., show a message to the user
          console.log("Please fill in all required fields.", academicValidationErrors);
        }
        break;
      }
      default:
        return "nothing";
    }

    // if (Object.keys(combinedErrors).length === 0) {



    //   // if (Object.keys(validationErrors).length === 0) {
    //   if (activeStep < 3) {
    //     setActiveStep(activeStep + 1);
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    //   } else {
    //     // Submit form logic
    //     alert("Form submitted");
    //   }
    // } else {
    //   // setErrors(validationErrors);
    //   setErrors(combinedErrors);
    //   // Handle errors, e.g., show a message to the user
    //   console.log("Please fill in all required fields.");
    // }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className={styles["formbold-main-wrapper"]}>
      <div className={styles["formbold-form-wrapper"]}>
        <form action="https://formbold.com/s/FORM_ID" method="POST">
          <FormHeader />
          <div className={styles["form-academic-year"]}>
            {getYear()} ACADEMIC YEAR
          </div>
          <div className={styles["formbold-steps"]}>
            <ul>
              <li
                className={`${styles["formbold-step-menu1"]} ${activeStep === 1 ? styles["active"] : ""
                  }`}
              >
                <span>1</span>PERSONAL INFORMATION
              </li>
              <li
                className={`${styles["formbold-step-menu2"]} ${activeStep === 2 ? styles["active"] : ""
                  }`}
              >
                <span>2</span>ACADEMIC INFORMATION
              </li>
              <li
                className={`${styles["formbold-step-menu3"]} ${activeStep === 3 ? styles["active"] : ""
                  }`}
              >
                <span>3</span>DECLARATION
              </li>
            </ul>
          </div>
          <PersonalInformation activeStep={activeStep} />
          {isMobile ? (
            <AcademicInfoMobile activeStep={activeStep} parentStyles={styles} />
          ) : (
            <AcademicInformation
              activeStep={activeStep}
              parentStyles={styles}
            />
          )}
          <div
            className={`${styles["formbold-form-step-3"]} ${activeStep === 3 ? styles["active"] : ""
              }`}
          >
            <div className={styles["formbold-form-label"]}>
              <span
                className={`${styles.fontBoldMainHeaders} ${styles["formbold-form-label"]}`}
              >
                DECLARATION
              </span>
            </div>
            <div className={styles["formbold-form-confirm"]}>
              <p style={{ marginTop: "1rem" }}>
                <span className={styles.declarationTxt}>Declaration by applicant.</span> I {" "}
                {/* <span className={styles.inlineLine}></span> */}
                declare that the
                statements on this form are correct. I understand that any offer
                of admission may be withdrawn if the information provided is
                fraudulent or if I cannot provide documentary evidence.
              </p>

              <div style={{ display: "flex", justifyContent: "center" }}>
                {declareState ? (
                  <button
                    onClick={() => setDeclareState(!declareState)}
                    type="button"
                    className={`${styles["formbold-confirm-btn"]} ${styles["active"]}`}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="10.5"
                        fill="white"
                        stroke="#DDE3EC"
                      />
                      <g clipPath="url(#clip0_1667_1314)">
                        <path
                          d="M9.83343 12.8509L15.1954 7.48828L16.0208 8.31311L9.83343 14.5005L6.12109 10.7882L6.94593 9.96336L9.83343 12.8509Z"
                          fill="#536387"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1667_1314">
                          <rect
                            width="14"
                            height="14"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Yes! I declare.
                  </button>
                ) : (
                  <button
                    onClick={() => setDeclareState(!declareState)}
                    type="button"
                    className={styles["formbold-confirm-btn"]}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="10.5"
                        fill="white"
                        stroke="#DDE3EC"
                      />
                      <defs>
                        <clipPath id="clip0_1667_1314">
                          <rect
                            width="14"
                            height="14"
                            fill="white"
                            transform="translate(4 4)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Yes! I declare.
                  </button>
                )}
                {/* {JSON.stringify(declarationError)} */}
              </div>
              {declarationError && <p style={{ textAlign: "center", color: "red" }} className={styles['formbold-error']}>Accept to complete application</p>}
            </div>
          </div>

          <div className={styles["formbold-form-enquiries-text"]}>
            For assistance filling forms, call: 0234113444
          </div>
          <div className={styles["formbold-form-btn-wrapper"]}>
            <button
              type="button"
              className={`${styles["formbold-back-btn"]} ${activeStep > 1 ? styles["active"] : ""
                }`}
              onClick={handleBack}
            >
              Back
            </button>

            <button
              type="button"
              className={styles["formbold-btn"]}
              onClick={activeStep === 3 ? handleSubmit : handleNext}
            >
              {activeStep === 3 ? "Submit" : "Next Step"}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1675_1807)">
                  <path
                    d="M10.7814 7.33312L7.20541 3.75712L8.14808 2.81445L13.3334 7.99979L8.14808 13.1851L7.20541 12.2425L10.7814 8.66645H2.66675V7.33312H10.7814Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1675_1807">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

function PersonalInformation({
  activeStep,
}: Readonly<PersonalInformationProp>) {
  const { inputValues, errors, handleChange, handleSubmit }: any = useForm();

  const {
    surname,
    firstname,
    othernames,
    address,
    email,
    nationality,
    phone,
    dob,
    placeOfBirth,
    religion,
    emergencyContact,
    emergencyContactName,
    emergencyContactRelationship,
  } = studentInformation;

  const handleDateChange = (field: string, value: any) => {
    handleChange({ target: { name: field, value } });
  };

  return (
    <div
      className={`${styles["formbold-form-step-1"]} ${activeStep === 1 ? styles["active"] : ""
        }`}
    >
      <div className={styles["formbold-form-label"]}>
        <span
          className={`${styles.fontBoldMainHeaders} ${styles["formbold-form-label"]}`}
        >
          PERSONAL DETAILS
        </span>
      </div>
      <div className={styles["formbold-input-flex"]}>
        <FormInput
          styles={styles}
          formField={{
            ...surname,
            inputValue: inputValues.surname,
            onChange: handleChange,
            error: errors.surname,
          }}
        />
        <FormInput
          styles={styles}
          formField={{
            ...firstname,
            inputValue: inputValues.firstname,
            onChange: handleChange,
            error: errors.firstname,
          }}
        />
        <FormInput
          styles={styles}
          formField={{
            ...othernames,
            inputValue: inputValues.othernames,
            onChange: handleChange,
            error: errors.othernames,
          }}
        />
      </div>
      <div className={styles["formbold-input-flex"]}>
        <FormTitleCheckbox information={requiredInfo.title} />
        {/* <FormTitleCheckbox information={requiredInfo.title} /> */}
      </div>
      <div className={styles["formbold-input-flex"]}>
        {/* <FormInput styles={styles} formField={dob} /> */}
        <DateOfBirthInput
          error={errors.dob}
          day={inputValues.day}
          month={inputValues.month}
          year={inputValues.year}
          setDay={(value: any) => handleDateChange("day", value)}
          setMonth={(value: any) => handleDateChange("month", value)}
          setYear={(value: any) => handleDateChange("year", value)}
        />
        {/* <FormInput styles={styles} formField={placeOfBirth} />
        <FormInput styles={styles} formField={nationality} /> */}
        <FormInput
          styles={styles}
          formField={{
            ...placeOfBirth,
            inputValue: inputValues.placeofbirth,
            onChange: handleChange,
            error: errors.placeofbirth,
          }}
        />
        <FormInput
          styles={styles}
          formField={{
            ...nationality,
            inputValue: inputValues.nationality,
            onChange: handleChange,
            error: errors.nationality,
          }}
        />
      </div>
      <div className={styles["formbold-input-flex"]}>
        <FormTitleCheckbox information={requiredInfo.gender} />
        <FormTitleCheckbox information={requiredInfo.status} />
      </div>
      <div className={styles["formbold-input-flex"]}>
        {/* <FormInput styles={styles} formField={religion} />
        <FormInput styles={styles} formField={phone} />
        <FormInput styles={styles} formField={email} /> */}
        <FormInput
          styles={styles}
          formField={{
            ...religion,
            inputValue: inputValues.religion,
            onChange: handleChange,
            error: errors.religion,
          }}
        />
        <FormInput
          styles={styles}
          formField={{
            ...phone,
            inputValue: inputValues.phone,
            onChange: handleChange,
            error: errors.phone,
          }}
        />
        <FormInput
          styles={styles}
          formField={{
            ...email,
            inputValue: inputValues.email,
            onChange: handleChange,
            error: errors.email,
          }}
        />
      </div>
      <div className={styles["formbold-emergency-contact"]}>
        <div
          className={`${styles.fontBoldMainHeaders} ${styles["formbold-emergency-title"]}`}
        >
          Emergency Contact
        </div>
        <div className={styles["formbold-input-flex"]}>
          {/* <FormInput styles={styles} formField={emergencyContact} />
          <FormInput styles={styles} formField={emergencyContactName} />
          <FormInput styles={styles} formField={emergencyContactRelationship} /> */}
          <FormInput
            styles={styles}
            formField={{
              ...emergencyContactName,
              inputValue: inputValues.emergencycontactname,
              onChange: handleChange,
              error: errors.emergencycontactname,
            }}
          />

          <FormInput
            styles={styles}
            formField={{
              ...emergencyContactRelationship,
              inputValue: inputValues.emergencycontactrelationship,
              onChange: handleChange,
              error: errors.emergencycontactrelationship,
            }}
          />

          <FormInput
            styles={styles}
            formField={{
              ...emergencyContact,
              inputValue: inputValues.emergencycontactnumber,
              onChange: handleChange,
              error: errors.emergencycontactnumber,
            }}
          />

        </div>
      </div>
    </div>
  );
}

type PersonalInformationProp = {
  activeStep: number;
  // handleNext: () => void,
  // handleBack: () => void,
};


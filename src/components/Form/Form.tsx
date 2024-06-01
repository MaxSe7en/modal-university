import React, { useState } from "react";
import styles from "./form.module.css";
import FormHeader from "../FormHeader/FormHeader";
import FormTitleCheckbox from "./FormTitleCheckbox";
import { getYear } from "@/Utils/utils";
import FormInput from "./FormInput";
const requiredInfo = {
  title: { title: "Title", options: ["Miss", "Mr", "Mrs."] },
  status: {
    title: "Marital Status",
    options: ["Single", "Married"],
  },
  gender: {
    title: "Gender",
    options: ["Male", "Female"],
  },
};

const studentInformation = {
  surname: {
    title: "Surname",
    type: "text",
    placeholder: "Andrio",
    required: true,
  },
  firstname: {
    title: "Firstname",
    type: "text",
    placeholder: "Andrio",
    required: true,
  },
  othernames: {
    title: "Othernames",
    type: "text",
    placeholder: "Andrio",
    required: true,
  },
  email: {
    title: "Email",
    type: "email",
    placeholder: "Andrio",
    required: true,
  },
  phone: {
    title: "Phone",
    type: "text",
    placeholder: "0123456789",
    required: true,
  },
  address: {
    title: "Address",
    type: "text",
    placeholder: "Andrio",
    required: true,
  },
  nationality: {
    title: "Nationality",
    type: "text",
    placeholder: "country",
    required: true,
  },
  dob: {
    title: "Date of Birth",
    type: "date",
    placeholder: "dob",
    required: true,
  },
  placeOfBirth: {
    title: "Place of Birth",
    type: "text",
    placeholder: "Accra",
    required: true,
  },
  religion: {
    title: "Religion",
    type: "text",
    placeholder: "your religion",
    required: false,
  },
  emergencyContact: {
    title: "Contact",
    type: "phone",
    placeholder: "contact",
    required: true,
  },
  emergencyContactName: {
    title: "Name",
    type: "text",
    placeholder: "name",
    required: true,
  },
  emergencyContactRelationship: {
    title: "Relationship",
    type: "text",
    placeholder: "relationship",
    required: true,
  },
  emergencyContactContact: {
    title: "Name",
    type: "phone",
    placeholder: "name",
    required: true,
  },
};
const Form = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      // Submit form logic
      alert("Form submitted");
    }
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
                className={`${styles["formbold-step-menu1"]} ${
                  activeStep === 1 ? styles["active"] : ""
                }`}
              >
                <span>1</span>PERSONAL INFORMATION
              </li>
              <li
                className={`${styles["formbold-step-menu2"]} ${
                  activeStep === 2 ? styles["active"] : ""
                }`}
              >
                <span>2</span>ACADEMIC INFORMATION
              </li>
              <li
                className={`${styles["formbold-step-menu3"]} ${
                  activeStep === 3 ? styles["active"] : ""
                }`}
              >
                <span>3</span>Confirm
              </li>
            </ul>
          </div>
          <PersonalInformation activeStep={activeStep} />
          <AcademicInformation activeStep={activeStep} />
          <div
            className={`${styles["formbold-form-step-3"]} ${
              activeStep === 3 ? styles["active"] : ""
            }`}
          >
            <div className={styles["formbold-form-confirm"]}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>

              <div>
                <button
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
                  Yes! I want it.
                </button>

                <button
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
                  No! I don’t want it.
                </button>
              </div>
            </div>
          </div>

          <div className={styles["formbold-form-btn-wrapper"]}>
            <button
              type="button"
              className={`${styles["formbold-back-btn"]} ${
                activeStep > 1 ? styles["active"] : ""
              }`}
              onClick={handleBack}
            >
              Back
            </button>

            <button
              type="button"
              className={styles["formbold-btn"]}
              onClick={handleNext}
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
  return (
    <div
      className={`${styles["formbold-form-step-1"]} ${
        activeStep === 1 ? styles["active"] : ""
      }`}
    >
      <div className={styles["formbold-input-flex"]}>
        <FormInput styles={styles} formField={surname} />
        <FormInput styles={styles} formField={firstname} />
        <FormInput styles={styles} formField={othernames} />
      </div>
      <div className={styles["formbold-input-flex"]}>
        <FormTitleCheckbox information={requiredInfo.title} />
        {/* <FormTitleCheckbox information={requiredInfo.title} /> */}
      </div>
      <div className={styles["formbold-input-flex"]}>
        <FormInput styles={styles} formField={dob} />
        <FormInput styles={styles} formField={placeOfBirth} />
        <FormInput styles={styles} formField={nationality} />
      </div>

      <div className={styles["formbold-input-flex"]}>
        <FormTitleCheckbox information={requiredInfo.status} />
        <FormTitleCheckbox information={requiredInfo.gender} />
      </div>

      <div className={styles["formbold-input-flex"]}>
        <FormInput styles={styles} formField={religion} />
        <FormInput styles={styles} formField={phone} />
        <FormInput styles={styles} formField={email} />
      </div>
      <div className={styles["formbold-emergency-contact"]}>
        <div className={styles["formbold-emergency-title"]}>
          Emergency Contact
        </div>
        <div className={styles["formbold-input-flex"]}>
          <FormInput styles={styles} formField={emergencyContact} />
          <FormInput styles={styles} formField={emergencyContactName} />
          <FormInput styles={styles} formField={emergencyContactRelationship} />
        </div>
      </div>
      <div>
        <label htmlFor="address" className={styles["formbold-form-label"]}>
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Flat 4, 24 Castle Street, Perth, PH1 3JY"
          className={`${styles["formbold-form-input"]}`}
        />
      </div>
    </div>
  );
}

function AcademicInformation({
  activeStep,
}: Readonly<AcademicInformationProp>) {
  return (
    <div
      className={`${styles["formbold-form-step-2"]} ${
        activeStep === 2 ? styles["active"] : ""
      }`}
    >
      <div>
        <label htmlFor="message" className={styles["formbold-form-label"]}>
          Message
        </label>
        <textarea
          rows={6}
          name="message"
          id="message"
          placeholder="Type your message"
          className={`${styles["formbold-form-input"]}`}
        ></textarea>
      </div>
    </div>
  );
}

type PersonalInformationProp = {
  activeStep: number;
  // handleNext: () => void,
  // handleBack: () => void,
};
type AcademicInformationProp = {
  activeStep: number;
  // handleNext: () => void,
  // handleBack: () => void,
};

{
  /* <div>
          <label htmlFor="email" className={styles["formbold-form-label"]}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            id="email"
            className={`${styles["formbold-form-input"]}`}
          />
        </div> */
}

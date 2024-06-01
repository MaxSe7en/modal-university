import React, { useState } from "react";
import styles from "./form.module.css";
import FormHeader from "../FormHeader/FormHeader";
import FormTitleCheckbox from "./FormTitleCheckbox";
import { getYear } from "@/Utils/utils";

const Form = () => {
  const [activeStep, setActiveStep] = useState(1);
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
  return (
    <div
      className={`${styles["formbold-form-step-1"]} ${
        activeStep === 1 ? styles["active"] : ""
      }`}
    >
      <div className={styles["formbold-input-flex"]}>
        <div>
          <label htmlFor="surname" className={styles["formbold-form-label"]}>
            Surname
          </label>
          <input
            type="text"
            name="surname"
            placeholder="Andrio"
            id="surname"
            className={`${styles["formbold-form-input"]}`}
          />
        </div>
        <div>
          <label htmlFor="firstname" className={styles["formbold-form-label"]}>
            First name
          </label>
          <input
            type="text"
            name="firstname"
            placeholder="Andrio"
            id="firstname"
            className={`${styles["formbold-form-input"]}`}
          />
        </div>
        <div>
          <label htmlFor="lastname" className={styles["formbold-form-label"]}>
            Other name
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Dolee"
            id="lastname"
            className={`${styles["formbold-form-input"]}`}
          />
        </div>
      </div>
      <FormTitleCheckbox information={undefined} />
      <div className={styles["formbold-input-flex"]}>
        <div>
          <label htmlFor="dob" className={styles["formbold-form-label"]}>
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            id="dob"
            placeholder=""
            className={`${styles["formbold-form-input"]} ${styles["formbold-datetime"]}`}
          />
        </div>
        <div>
          <label htmlFor="pob" className={styles["formbold-form-label"]}>
            Place of Birth
          </label>
          <input
            type="text"
            name="pob"
            placeholder="place of birth"
            id="pob"
            className={`${styles["formbold-form-input"]}`}
          />
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

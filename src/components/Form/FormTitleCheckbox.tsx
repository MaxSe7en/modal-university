import React from "react";
import styles from "./css/FormTitleCheckbox.module.css";

type FormTitleCheckboxProps = {
  information: {
    title: string;
    options: string[];
  };
};
const FormTitleCheckbox = ({ information }: FormTitleCheckboxProps) => {
  return (
    <div className={styles.formboldTitleCheckbox}>
      <p className={styles.formboldFormLabel}>{information.title}</p>
      <div className={styles.formboldCheckboxGroup}>
        {information.options.map((option, index) => {
          const lowerCaseOption = option.toLowerCase();
          return (
            <div key={option[index]} className={styles.formboldCheckboxItem}>
              <input
                type="radio"
                id={lowerCaseOption}
                name={information.title.toLowerCase()}
                value={option}
                className={styles.formboldCheckboxInput}
              />
              <label
                htmlFor={lowerCaseOption}
                className={styles.formboldCheckboxLabel}
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormTitleCheckbox;
{
  /* <div className={styles.formboldCheckboxItem}>
              <input
                type="radio"
                id="mrs"
                name="title"
                value="Mrs"
                className={styles.formboldCheckboxInput}
              />
              <label htmlFor="mrs" className={styles.formboldCheckboxLabel}>
                Mrs.
              </label>
            </div>
            <div className={styles.formboldCheckboxItem}>
              <input
                type="radio"
                id="mr"
                name="title"
                value="Mr"
                className={styles.formboldCheckboxInput}
              />
              <label htmlFor="mr" className={styles.formboldCheckboxLabel}>
                Mr.
              </label>
            </div> */
}

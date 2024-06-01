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
      <p className={styles.formboldFormLabel}>Title</p>
      <div className={styles.formboldCheckboxGroup}>
        <div className={styles.formboldCheckboxItem}>
          <input
            type="radio"
            id="miss"
            name="title"
            value="Miss"
            className={styles.formboldCheckboxInput}
          />
          <label htmlFor="miss" className={styles.formboldCheckboxLabel}>
            Miss
          </label>
        </div>
        <div className={styles.formboldCheckboxItem}>
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
        </div>
      </div>
    </div>
  );
};

export default FormTitleCheckbox;

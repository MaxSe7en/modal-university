import React from "react";
type FormInputProps = {
  styles: {
    readonly [key: string]: string;
  };
  formField: {
    title: string;
    type: string;
    placeholder: string;
    required: boolean;
  };
};
const FormInput = ({ styles, formField }: FormInputProps) => {
    const {title, type, placeholder, required} = formField
  return (
    <div>
      <label htmlFor="surname" className={styles["formbold-form-label"]}>
        {title}
      </label>
      <input
        type={type}
        name={title.toLowerCase()}
        placeholder={placeholder}
        id={title.toLowerCase()}
        required={required} 
        className={`${styles["formbold-form-input"]} ${styles["formbold-datetime"]}`}
      />
    </div>
    // <div>FormInput</div>
  );
};

export default FormInput;

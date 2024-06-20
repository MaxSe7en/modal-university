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
    error: any;
    inputValue: string;
    onChange: any;
  };
};
const FormInput = ({ styles, formField }: FormInputProps) => {
  const { title, type, placeholder, required, error, inputValue,onChange } = formField
  return (
    <div>
      <label htmlFor={title.replace(/\s/g, "").toLowerCase()} className={styles["formbold-form-label"]}>
        {title}{inputValue}
      </label>
      <input
        type={type}
        name={title.replace(/\s/g, "").toLowerCase()}
        placeholder={placeholder}
        id={title.replace(/\s/g, "").toLowerCase()}
        required={required}
        // value={inputValue}
        onChange={onChange}
        className={`${styles["formbold-form-input"]} ${placeholder == 'dob' ? styles["formbold-datetime"] : ""}`}
      />
      {error && <p className={styles['formbold-error']}>{error}</p>}
    </div>
    // <div>FormInput</div>
  );
};

export default FormInput;

import React, { useState } from "react";
import styles from "./css/FormTitleCheckbox.module.css";

type FormTitleCheckboxProps = {
  information: {
    title: string;
    options: string[];
  };
  setInputValues: React.Dispatch<React.SetStateAction<any>>;

};

const FormTitleCheckbox: React.FC<FormTitleCheckboxProps> = ({ information, setInputValues }) => {
  const [selectedOption, setSelectedOption] = useState(information.options[0]); // Initialize with the first option

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);

    // Update context or state with the selected option
    setInputValues((prevInputValues: any) => ({
      ...prevInputValues,
      [information.title.replace(/\s/g, "").toLowerCase()]: e.target.value,
    }));
  };

  return (
    <div className={styles.formboldTitleCheckbox}>
      <p className={styles.formboldFormLabel}>{information.title}</p>
      <div className={styles.formboldCheckboxGroup}>
        {information.options.map((option, index) => {
          const lowerCaseOption = option.replace(/\s/g, "").toLowerCase();
          return (
            <div key={index} className={styles.formboldCheckboxItem}>
              <input
                type="radio"
                id={lowerCaseOption}
                name={information.title.replace(/\s/g, "").toLowerCase()}
                value={option}
                className={styles.formboldCheckboxInput}
                checked={option === selectedOption}
                onChange={handleOptionChange}
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

// const FormTitleCheckbox = ({ information }: FormTitleCheckboxProps) => {
//   return (
//     <div className={styles.formboldTitleCheckbox}>
//       <p className={styles.formboldFormLabel}>{information.title}</p>
//       <div className={styles.formboldCheckboxGroup}>
//         {information.options.map((option, index) => {
//           const lowerCaseOption = option.toLowerCase();
//           return (
//             <div key={option[index]} className={styles.formboldCheckboxItem}>
//               <input
//                 type="radio"
//                 id={lowerCaseOption}
//                 name={information.title.toLowerCase()}
//                 value={option}
//                 className={styles.formboldCheckboxInput}
//                 defaultChecked={index === 0}
//               />
//               <label
//                 htmlFor={lowerCaseOption}
//                 className={styles.formboldCheckboxLabel}
//               >
//                 {option}
//               </label>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

export default FormTitleCheckbox;

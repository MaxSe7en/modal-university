import React, { useState } from "react";
import styles from "./css/DateOfBirthInput.module.css";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const DateOfBirthInput = ({ day, month, year, setDay, setMonth, setYear,error}:any) => {
  // const [day, setDay] = useState("");
  // const [month, setMonth] = useState("");
  // const [year, setYear] = useState("");

  return (
    <div className={styles.dateOfBirthContainer}>
      <div className={styles["formbold-form-label"]}>Date of Birth:</div>
      <div className={styles["selectWrapper"]}>
        <div className={styles.selectContainer}>
          <select
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className={styles.select}
          >
            <option value="">Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectContainer}>
          {/* <label htmlFor="month" className={styles.label}>Month:</label> */}
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={styles.select}
          >
            <option value="">Month</option>
            {months.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectContainer}>
          {/* <label htmlFor="year" className={styles.label}>Year:</label> */}
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={styles.select}
          >
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className={'formbold-error'}>{error}</p>}
    </div>
  );
};

export default DateOfBirthInput;

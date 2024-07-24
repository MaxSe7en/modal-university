import { useForm } from "@/contexts/FormContext";
import React, { useState, useEffect } from "react";
import styles from "./form.module.css";
const AcademicYearDisplay = () => {
  const [activeYear, setActiveYear] = useState<any>(null);
  const [error, setError] = useState("");
  const { fetchCurrentActiveAcademicYear }: any = useForm();
  useEffect(() => {
    fetchCurrentActiveAcademicYear()
      .then((year: any) => setActiveYear(year))
      .catch((err: any) => {
        fetchCurrentActiveAcademicYear();
        setError("Failed to load active academic year");
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activeYear) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["form-academic-year"]}>
      {activeYear.year} ACADEMIC YEAR
    </div>
  );
};

export default AcademicYearDisplay;

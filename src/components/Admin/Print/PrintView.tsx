import { useRef, useState } from "react";
import styles from "./PrintView.module.css";
import { useAdmin } from "@/contexts/AdminContext";
import { useReactToPrint } from "react-to-print";
import PrintableStudentInfo from "../PrintableStudentInfo/PrintableStudentInfo";

const PrintView: React.FC = () => {
  const {
    getUsersToPrint,
    printOption,
    setPrintOption,
  }: any = useAdmin();
  const usersToPrint = getUsersToPrint();
  const componentRef:any = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={styles.printView}>
      <h2>Print User Information</h2>
      <div className={styles.optionButtons}>
        <button
          onClick={() => setPrintOption("selected")}
          className={printOption === "selected" ? styles.activeOption : ""}
        >
          Selected Student
        </button>
        <button
          onClick={() => setPrintOption("topToSelected")}
          className={printOption === "topToSelected" ? styles.activeOption : ""}
        >
          Top to Selected
        </button>
        <button
          onClick={() => setPrintOption("all")}
          className={printOption === "all" ? styles.activeOption : ""}
        >
          All Filtered
        </button>
      </div>
      <p>Users to print: {usersToPrint.length}</p>
      <button onClick={handlePrint} className={styles.printButton}>
        Print
      </button>
      <div className={styles.printableContent}>
        {usersToPrint.map((user: any) => (
          <div key={user.id} className={styles.userCard}>
            <h3>
              {user.surname} {user.firstname} {user.othernames}
            </h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Academic Year: {user.academicInformation.academicYear}</p>
            <p>Admission Status: {user.academicInformation.admissionStatus}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          {usersToPrint.map((user: any, index:number) => (
            <PrintableStudentInfo key={user.id} user={user} isLast={index === usersToPrint.length - 1}
             />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintView;

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useAdmin } from "@/contexts/AdminContext";
import PrintableStudentInfo from "../PrintableStudentInfo/PrintableStudentInfo";
import styles from "./PrintView.module.css";
import { useToast } from "@/contexts/ToastContext";

const PrintView: React.FC = () => {
  const { getUsersToPrint, printOption, setPrintOption }: any = useAdmin();
  const usersToPrint = getUsersToPrint();
  const componentRef = useRef<HTMLDivElement>(null);
  const { showToast }: any = useToast();
  
  const handlePrint = useReactToPrint({
    content: () => {
      if (usersToPrint.length < 1) {
        showToast({
          message: "Please select user to print",
          position: "top",
          color: "#FF3333",
        });
        return null;
      }
      return componentRef.current;
    },
  });

  const printOptions = [
    { value: "selected", label: "Selected Student" },
    { value: "topToSelected", label: "Top to Selected" },
    { value: "all", label: "All Filtered" },
  ];

  return (
    <div className={styles.printView}>
      <h2 style={{textAlign: "center", marginBottom: "1rem"}}>Print User Information</h2>
      <hr  className={styles.printViewHr}/>
      <div className={styles.optionButtons}>
        <h4 className={styles.selectPrint}>Choose print option</h4>
        {printOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setPrintOption(value)}
            className={printOption === value ? styles.activeOption : ""}
          >
            {label}
          </button>
        ))}
      </div>
      <p>Users to print: {usersToPrint.length}</p>
      <div className={styles.printableContent}>
        {usersToPrint.map((user:any) => (
          <UserCard key={user?.id} user={user} />
        ))}
      </div>
      <button onClick={handlePrint} className={`${styles.printButton} ${styles["button-3"]}`}>
        Print
      </button>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          {usersToPrint.map((user: any, index: any) => (
            <PrintableStudentInfo
              key={user.id}
              user={user}
              isLast={index === usersToPrint?.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const UserCard: React.FC<{ user: any }> = ({ user }) => (
  <div className={styles.userCard}>
    <h3>
      {user.surname} {user?.firstname} {user?.othernames}
    </h3>
    <p>Email: {user?.email}</p>
    <p>Phone: {user?.phone}</p>
    <p>Academic Year: {user?.academicInformation?.academicYear}</p>
    <p>Admission Status: {user?.academicInformation?.admissionStatus}</p>
  </div>
);

export default PrintView;

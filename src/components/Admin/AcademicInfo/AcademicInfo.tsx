import React, { useRef } from "react";
import styles from "./AcademicInfo.module.css";
import { useReactToPrint } from "react-to-print";
import PrintAcademicInfo from "./PrintAcademicInfo";
import { useToast } from "@/contexts/ToastContext";
import { useAdmin } from "@/contexts/AdminContext";
import { sendSms } from "@/Utils/utils";
import PrintableStudentInfo from "../PrintableStudentInfo/PrintableStudentInfo";

interface Subject {
  id: number;
  subject: string;
  grade: string;
  fkAcademicInfoId: number;
}

interface AcademicInformation {
  id: number;
  userId: number;
  indexNumber: string;
  examinationTitle: string;
  monthYear: string;
  awaiting: string;
  numberRows: string;
  subjects: Subject[];
}

interface User {
  id: number;
  studentId: number;
  surname: string;
  firstname: string;
  othernames: string;
  phone: string;
  academicInformation: AcademicInformation;
}

interface Props {
  users: User[];
}

const AcademicInfo: React.FC<Props> = ({ users }) => {
  const componentRef = useRef(null);

  const {
    selectedUser,
    handleStatusChange,
    getStatusColor,
    setSelectedUser,
    smsMessage,
    setSmsMessage,
  }: any = useAdmin();
  const { showToast }: any = useToast();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  const handleSendSingleSms = async () => {
    if (!selectedUser) {
      // alert("Please select a user first");
      showToast({
        message: "Please select a user first",
        position: "top",
      });
      return;
    }
    try {
      await sendSms(selectedUser.phone, smsMessage);

      showToast({
        message:
          "SMS sent successfully to " +
          selectedUser.surname +
          " " +
          selectedUser.firstname,
        position: "top",
      }); // Show success toast
    } catch (error) {
      console.error("Error sending SMS:", error);
      // alert("Failed to send SMS. Please try again.");
      showToast({
        message: "Failed to send SMS. Please try again.",
        position: "top",
        color: "#FF3333",
      });
    }
  };

  const handleSendAllSms = async () => {
    try {
      for (const user of users) {
        await sendSms(user?.phone, smsMessage);
      }
      // alert("SMS sent successfully to all users");
      showToast({
        message: "SMS sent successfully to all users",
        position: "top",
      });
    } catch (error) {
      console.error("Error sending SMS to all users:", error);
      // alert("Failed to send SMS to all users. Please try again.");
      showToast({
        message: "Failed to send SMS to all users. Please try again.",
        position: "top",
        color: "#FF3333",
      });
    }
  };
  return (
    <div className={styles.academicInfo}>
      <div className={styles.header}>
        <h3 className={styles.sectionTitle}>Academic Information</h3>
        <button onClick={handlePrint} className={styles.printButton}>
          Print
        </button>
      </div>
      {users.map((user) => (
        <div key={user.id} className={styles.academicCard}>
          {/* {JSON.stringify(user.academicInformation)} */}
          <h4
            className={styles.studentName}
          >{`${user.surname} ${user.firstname}`}</h4>
          <div className={styles.examInfo}>
            <p>
              <strong>Examination:</strong>{" "}
              {user.academicInformation.examinationTitle}
            </p>
            <p>
              <strong>Month/Year:</strong> {user.academicInformation.monthYear}
            </p>
            <p>
              <strong>Index Number:</strong>{" "}
              {user.academicInformation.indexNumber}
            </p>
            <p>
              <strong>Results Status</strong>{" "}
              <span
                className={`${styles.resultStatus} ${
                  user.academicInformation.awaiting == "1"
                    ? styles.awaiting
                    : styles.released
                }`}
              >
                {user.academicInformation.awaiting == "1"
                  ? "Awaiting"
                  : "Released"}
              </span>
            </p>
          </div>
          <div className={styles.subjectsGrid}>
            {user.academicInformation.subjects.map((subject) => (
              <div key={subject.id} className={styles.subjectItem}>
                <span className={styles.subjectName}>{subject.subject}</span>
                <span className={styles.subjectGrade}>{subject.grade}</span>
              </div>
            ))}
          </div>
          {selectedUser && (
            <div className={styles.statusSection}>
              <label htmlFor="status">Update Application Status: </label>
              <select
                id="status"
                value={selectedUser?.academicInformation?.admissionStatus}
                onChange={handleStatusChange}
                style={{
                  backgroundColor: getStatusColor(
                    selectedUser?.academicInformation?.admissionStatus
                  ),
                  color: "white",
                  fontWeight: "bold",
                  outline: "none",
                }}
              >
                <option value="Awaiting results">Awaiting results</option>
                <option value="Under Review">Under Review</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          )}
          <div className={styles.smsSection}>
            <h3>Send SMS</h3>
            <textarea
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              placeholder="Enter SMS message"
              className={styles.smsTextarea}
            />
            <div className={styles.smsButtons}>
              <button style={{opacity: 0, cursor: "unset"}}
                disabled={true}
                onClick={handleSendAllSms}
                className={styles.smsSendAllButton}
              >
                Send to All Students
              </button>

              <button
                onClick={handleSendSingleSms}
                className={styles.smsSendButton}
              >
                Send sms to {selectedUser?.surname} {selectedUser?.firstname}
              </button>
            </div>
          </div>
          {/* <div style={{ display: "none" }}>
            <PrintableStudentInfo ref={componentRef} user={selectedUser} />
          </div> */}
          <div style={{ display: "none" }}>
            <PrintAcademicInfo ref={componentRef} user={user} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default AcademicInfo;

import { useState } from "react";
import styles from "./SmsView.module.css";
import { useAdmin } from "@/contexts/AdminContext";
import { sendSms } from "@/Utils/utils";
import { useToast } from "@/contexts/ToastContext";

const SmsView: React.FC = () => {
  const {
    message,
    setMessage,
    recipientOption,
    setRecipientOption,
    filteredUsers,
    users,
    getRecipients
  }: any = useAdmin();
  const { showToast }: any = useToast();
  const recipients = getRecipients();

  const handleSend = async () => {
    try {
      for (const user of recipients) {
        await sendSms(user?.student?.phoneNumber, message);
      }
      showToast({
        message: "SMS sent successfully to all selected recipients",
        position: "top",
      });
    } catch (error) {
      console.error("Error sending SMS to recipients:", error);
      showToast({
        message: "Failed to send SMS to all recipients. Please try again.",
        position: "top",
        color: "#FF3333",
      });
    }
  };
console.log(recipients, users)
  return (
    <div className={styles.smsView}>
      <h2>Send SMS</h2>
      <div className={styles.optionButtons}>
        <button
          onClick={() => setRecipientOption("selected")}
          className={recipientOption === "selected" ? styles.activeOption : ""}
        >
          Selected Student
        </button>
        <button
          onClick={() => setRecipientOption("topToSelected")}
          className={
            recipientOption === "topToSelected" ? styles.activeOption : ""
          }
        >
          Top to Selected
        </button>
        <button
          onClick={() => setRecipientOption("all")}
          className={recipientOption === "all" ? styles.activeOption : ""}
        >
          All Filtered
        </button>
      </div>
      <p>Recipients: {recipients.length}</p>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here"
        rows={5}
        className={styles.messageInput}
      />
      <button onClick={handleSend} className={styles.sendButton}>
        Send SMS
      </button>
      <div className={styles.recipientList}>
        <h3>Recipients:</h3>
        <ul>
          {recipients.map((user: any) => (
            <li key={user.id}>
              {/* {JSON.stringify(user)} */}
              {user.surname} {user.firstname} - {user.student.phoneNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SmsView;

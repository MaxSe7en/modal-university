import { useState } from "react";
import styles from "./SmsView.module.css";
import { useAdmin } from "@/contexts/AdminContext";
import { sendSms } from "@/Utils/utils";
import { useToast } from "@/contexts/ToastContext";
import Spinner from "@/components/Spinner/Spinner";

const SmsView: React.FC = () => {
  const {
    message,
    setMessage,
    recipientOption,
    setRecipientOption,
    filteredUsers,
    users,
    isLoading,
      setIsLoading,
    getRecipients
  }: any = useAdmin();
  const { showToast }: any = useToast();
  const recipients = getRecipients();

  const handleSend = async () => {
    if(recipients.length < 1) {
      showToast({
        message: "Please select recipients",
        position: "top",
        color: "#FF3333",
      });
      return;
    }
    setIsLoading(true);
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
      setIsLoading(false);
    } finally{
      setIsLoading(false);
    }
  };
console.log(recipients, users)
  return (
    <div className={styles.smsView}>
      <h2 className={styles.smsViewH1}>Send SMS</h2>
      <hr  className={styles.printViewHr}/>
      <div className={styles.optionButtons}>
      <h4 className={styles.selectPrint}>Choose SMS option</h4>
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
      <h4>Number of Recipients: {recipients.length}</h4>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here"
        rows={5}
        className={styles.messageInput}
      />
      <div className={styles.recipientList}>
        <h3>Recipients:</h3>
        <ul>
          {recipients.map((user: any) => (
            <li key={user.id}>
              {/* {JSON.stringify(user)} */}
              {user?.surname} {user?.firstname} - {user?.student?.phoneNumber}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSend} disabled={isLoading} className={`${styles.printButton} ${styles["button-3"]}`}>
      {isLoading ? (
        <Spinner />
      ) : (
        "Send SMS"
      )}
      </button>
    </div>
  );
};
export default SmsView;

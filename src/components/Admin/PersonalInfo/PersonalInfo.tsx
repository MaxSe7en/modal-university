import React, { useRef } from "react";
import styles from "./PersonalInfo.module.css";
import PrintPersonalInfo from "./PrintPersonalInfo";
import { useReactToPrint } from "react-to-print";

interface User {
  id: number;
  studentId: number;
  surname: string;
  firstname: string;
  othernames: string;
  email: string;
  phone: string;
  dob?: string;
  religion?: string;
  title?: string;
  gender?: string;
  nationality?: string;
  placeofbirth?: string;
  maritalstatus?: string;
  emergencycontactname?: string;
  emergencycontactrelationship?: string;
  emergencycontactnumber?: string;
}

interface Props {
  users: User[];
}

const PersonalInfo = ({ users }: Props) => {
  const componentRef = useRef<any>(null);

  const handlePrint = useReactToPrint({
    content: () => (componentRef.current ? componentRef.current : null),
  });

  return (
    <div className={styles.personalInfo}>
      <div className={styles.personalInfoPrint}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        <button onClick={handlePrint} className={styles.printButton}>
          Print
        </button>
      </div>
      {users.map((user: any) => (
        <div key={user.id} className={styles.infoCard}>
          <div className={styles.userHeader}>
            <h4
              className={styles.userName}
            >{`${user.surname} ${user.firstname} ${user.othernames}`}</h4>
            <span className={styles.studentId}>
              Student ID: {user.studentId}
            </span>
          </div>
          <div className={styles.infoColumns}>
            <div className={styles.leftColumn}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{user.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Phone:</span>
                <span className={styles.value}>{user.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Date of Birth:</span>
                <span className={styles.value}>{user.dob}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Religion:</span>
                <span className={styles.value}>{user.religion}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Title:</span>
                <span className={styles.value}>{user.title}</span>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Gender:</span>
                <span className={styles.value}>{user.gender}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Nationality:</span>
                <span className={styles.value}>{user.nationality}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Place of Birth:</span>
                <span className={styles.value}>{user.placeofbirth}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Marital Status:</span>
                <span className={styles.value}>{user.maritalstatus}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Gender:</span>
                <span className={styles.value}>{user.gender}</span>
              </div>
            </div>
          </div>
          <div className={styles.emergencyHeader}>
            <h4 className={styles.userName}>Emergency Contact Information</h4>
            {/* <span className={styles.studentId}>Student ID: {user.emergencycontactrelationship}</span>
                        <span className={styles.studentId}>Student ID: {user.emergencycontactrelationship}</span> */}
          </div>
          <div className={styles.infoColumns}>
            <div className={styles.leftColumn}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Emergency Contact Name:</span>
                <span className={styles.value}>
                  {user.emergencycontactname}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>
                  Emergency Contact Relationship:
                </span>
                <span className={styles.value}>
                  {user.emergencycontactrelationship}
                </span>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Emergency Contact Number:</span>
                <span className={styles.value}>
                  {user.emergencycontactnumber}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "none" }}>
            <PrintPersonalInfo user={user} ref={componentRef} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonalInfo;

//     return (
//         <div>
//             <h2>Personal Information</h2>
//             <table className={styles.table}>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Student ID</th>
//                         <th>Surname</th>
//                         <th>First Name</th>
//                         <th>Other Names</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.id}</td>
//                             <td>{user.studentId}</td>
//                             <td>{user.surname}</td>
//                             <td>{user.firstname}</td>
//                             <td>{user.othernames}</td>
//                             <td>{user.email}</td>
//                             <td>{user.phone}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

import React from 'react';
import styles from './Declaration.module.css';


interface User {
  id: number;
  surname: string;
  firstname: string;
  // Add any declaration-related fields
}

interface Props {
  users: User[];
}

// const Declaration: React.FC<Props> = ({ users }) => {
//   return (
//     <div>
//       <h2>Declaration</h2>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Name</th>
//             <th>Declaration Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{`${user.surname} ${user.firstname}`}</td>
//               <td>Submitted</td> {/* You may need to add a declaration status field to your User model */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
const Declaration: React.FC<Props> = ({ users }) => {
  return (
    <div className={styles.declaration}>
      <h3 className={styles.sectionTitle}>Declaration</h3>
      {users.map(user => (
        <div key={user.id} className={styles.declarationCard}>
          {/* <h4 className={styles.studentName}>{`${user.surname} ${user.firstname}`}</h4> */}
          <p className={styles.declarationText}>
            I, <em>{user.surname} {user.firstname}</em>, hereby declare that all the information provided in my application is true and correct to the best of my knowledge.
          </p>
          <div className={styles.declarationStatus}>
            <span className={styles.statusLabel}>Status:</span>
            <span className={styles.statusValue}>Submitted</span>
          </div>
          <div className={styles.declarationDate}>
            <span className={styles.dateLabel}>Date:</span>
            <span className={styles.dateValue}>April 15, 2024</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Declaration;
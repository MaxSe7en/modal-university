import React from 'react';
import styles from '../css/Table.module.css';


interface User {
  id: number;
  surname: string;
  firstname: string;
  // Add any declaration-related fields
}

interface Props {
  users: User[];
}

const Declaration: React.FC<Props> = ({ users }) => {
  return (
    <div>
      <h2>Declaration</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Declaration Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.surname} ${user.firstname}`}</td>
              <td>Submitted</td> {/* You may need to add a declaration status field to your User model */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Declaration;
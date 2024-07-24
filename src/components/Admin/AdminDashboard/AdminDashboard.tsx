// import { useAdmin } from '@/contexts/AdminContext';
// import React, { useEffect, useState } from 'react';
// import AcademicInfo from '../AcademicInfo/AcademicInfo';
// import Declaration from '../Declaration/Declaration';
// import PersonalInfo from '../PersonalInfo/PersonalInfo';
// import styles from './AdminDashboard.module.css';

// const AdminDashboard: React.FC = () => {
//     const { activeTab, setActiveTab, renderContent }: any = useAdmin();
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('/api/users');
//             const data = await response.json();
//             setUsers(data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const fetchUserDetails = async (userId: number) => {
//         try {
//             const response = await fetch(`/api/users/${userId}`);
//             const data = await response.json();
//             setSelectedUser(data);
//         } catch (error) {
//             console.error('Error fetching user details:', error);
//         }
//     };

//     return (
//         <div className={styles.dashboard}>
//             <header className={styles.header}>
//                 <h1 className={styles.title}>Backend Page Display</h1>
//                 <button className={styles.logoutBtn}>Logout</button>
//             </header>
//             <nav className={styles.navigation}>
//                 <button className={styles.navItem}>Prospective Students</button>
//                 <div className={styles.separator}></div>
//                 <button
//                     className={`${styles.navItem} ${activeTab === 'personal' ? styles.active : ''}`}
//                     onClick={() => setActiveTab('personal')}
//                 >
//                     Personal Information
//                 </button>
//                 <button
//                     className={`${styles.navItem} ${activeTab === 'academic' ? styles.active : ''}`}
//                     onClick={() => setActiveTab('academic')}
//                 >
//                     Academic Information
//                 </button>
//                 <button
//                     className={`${styles.navItem} ${activeTab === 'declaration' ? styles.active : ''}`}
//                     onClick={() => setActiveTab('declaration')}
//                 >
//                     Declaration
//                 </button>
//             </nav>
//             <main className={styles.content}>
//                 <aside className={styles.sidebar}>
//                     <h3>Prospective Students</h3>
//                     <ul className={styles.studentList}>
//                         {users.map((user: any) => (
//                             <li
//                                 key={user.id}
//                                 className={styles.studentItem}
//                                 onClick={() => fetchUserDetails(user.id)}
//                             >
//                                 {user.surname} {user.firstname}
//                             </li>
//                         ))}
//                     </ul>
//                 </aside>
//                 <section className={styles.mainContent}>
//                     {renderContent()}
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default AdminDashboard;

import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/contexts/ToastContext";
import { user_url } from "@/Utils/endpoints";
import { sendSms } from "@/Utils/utils";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import styles from "./AdminDashboard.module.css";
import router from "next/router";

const ITEMS_PER_PAGE = 10; // Number of users per page

const AdminDashboard: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    renderContent,
    selectedUser,
    setSelectedUser,
    smsMessage,
    setSmsMessage,
    users,
    setUsers,
    handleAcademicYearFilter,
    handleAdmissionStatusFilter,
    filteredUsers,
  }: any = useAdmin();

  const { showToast }: any = useToast();
  const [selectedUserId, setSelectedUserId] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminTz");
      const response = await fetch(user_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Fetched users", data);
      if (response.status === 200) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserDetails = (studentId: number) => {
    console.log(`Fetching details for student ID: ${studentId}`);
    const user = users.find((user: any) => user.studentId === studentId);
    if (user) {
      setSelectedUser(user);
      setSelectedUserId(studentId);
    } else {
      console.error("User not found");
    }
  };

  const fetchUserDetailsOld = async (userId: number) => {
    console.log(
      `sssssssssssssssssssssssssss============>${user_url}/${userId}`
    );
    try {
      const response = await fetch(`${user_url}/${userId}`);
      const data = await response.json();
      if (response.status === 200) {
        setSelectedUser(data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // const handleStatusChange = async (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const newStatus = event.target.value;
  //   const userId = selectedUser?.id;
  //   setSelectedUser((prevUser: any) => ({
  //     ...prevUser,
  //     status: newStatus,
  //   }));
  //   try {
  //     const token = localStorage.getItem("adminTz");
  //     const response = await fetch(`${admission_status_url}/${userId}/status`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ status: newStatus }),
  //     });

  //     if (response.ok) {
  //       console.log("Status updated successfully");
  //     } else {
  //       console.error("Failed to update status");
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>MODAL COLLEGE APLLICANTS</h1>
        <div className={styles.logoutBtnMa}></div>
        <button
          className={styles.settingsBtn}
          onClick={() => router.push("/admin/settings")}
        >
          Settings
        </button>
        <button className={styles.logoutBtn}>Logout</button>
      </header>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Prospective Students</h3>
          {/* <ul className={styles.studentList}>
            {users !== undefined
              ? users.map((user: any) => (
                  <li
                    key={user.id}
                    className={`${styles.studentItem} ${
                      selectedUserId === user.studentId
                        ? styles.selected
                        : "www"
                    }`}
                    onClick={() => fetchUserDetails(user.studentId)}
                  >
                    {user.surname} {user.firstname} {selectedUserId}
                  </li>
                ))
              : null}
          </ul> */}

          <div className={styles.filter}>
            <h3>Filters</h3>
            <select
              onChange={handleAcademicYearFilter}
              className={styles.filterSelect}
            >
              <option value="">All Academic Years</option>
              {/* Add options dynamically based on available years */}
            </select>
            <select
              onChange={handleAdmissionStatusFilter}
              className={styles.filterSelect}
            >
              <option value="">All Admission Statuses</option>
              <option value="Awaiting results">Awaiting results</option>
              <option value="Under Review">Under Review</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className={styles.studentCount}>
            Total Students: <span>{filteredUsers.length}</span>
          </div>
          {/* {JSON.stringify(filteredUsers)} */}

          <div className={styles.container}>
            {/* <ul className={styles.studentList}>
              {currentUsers.map((user: any) => (
                <li
                  key={user.id}
                  className={`${styles.studentItem} ${
                    selectedUserId === user.studentId ? styles.selected : ""
                  }`}
                  onClick={() => fetchUserDetails(user.studentId)}
                >
                  {user.surname} {user.firstname}
                </li>
              ))}
            </ul> */}
            <ul className={styles.studentList}>
              {filteredUsers.map((user: any) => (
                <li
                  key={user.id}
                  className={`${styles.studentItem} ${
                    selectedUser?.id === user.id ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  {user.firstname} {user.lastname}
                </li>
              ))}
            </ul>
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </aside>
        <main className={styles.mainContent}>
          <nav className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "personal" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Information
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "academic" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("academic")}
            >
              Academic Information
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "declaration" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("declaration")}
            >
              Declaration
            </button>
          </nav>
          <div className={styles.tabContent}>
            {/* <h2 className={styles.contentTitle}>Student Application Details</h2> */}
            {renderContent(selectedUser)}
            {/* add update application status here */}
            {/* {JSON.stringify(selectedUser.academicInformation.admissionStatus)} */}
          </div>
        </main>
        {/* <div style={{ display: "none" }}>
          <PrintableStudentInfo ref={componentRef} user={selectedUser} />
        </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;

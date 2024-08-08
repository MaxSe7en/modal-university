import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/contexts/ToastContext";
import { user_url } from "@/Utils/endpoints";
import { sendSms } from "@/Utils/utils";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import styles from "./AdminDashboard.module.css";
import router from "next/router";
import SmsView from "../Sms/SmsView";
import PrintView from "../Print/PrintView";

const ITEMS_PER_PAGE = 10; // Number of users per page

const AdminDashboard: React.FC = () => {
  const {
    activeTab,
    newYear,
    setActiveTab,
    renderContent,
    selectedUser,
    setSelectedUser,
    academicYearFilter,
    smsMessage,
    setSmsMessage,
    academicYears,
    smsRecipients,
    setSmsRecipients,
    printUsers,
    setPrintUsers,
    handleSmsClick,
    handlePrintClick,
    users,
    setUsers,
    handleAcademicYearFilter,
    handleAdmissionStatusFilter,
    filteredUsers,
    fetchAcademicYears,
  }: any = useAdmin();

  const { showToast }: any = useToast();
  const [selectedUserId, setSelectedUserId] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
    fetchAcademicYears();
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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Calculate total pages
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>MODAL COLLEGE APLLICANTS</h1>
        <div className={styles.logoutBtnMa}></div>
        <button
          className={styles.applicantInfoBtn}
          onClick={() => {
            setActiveTab("applicantInfo");
            setSelectedUser(null);
            setActiveTab("personal");
          }}
        >
          Applicant Information
        </button>
        <button className={styles.smsBtn} onClick={handleSmsClick}>
          Sms
        </button>
        <button className={styles.printBtn} onClick={handlePrintClick}>
          Print
        </button>
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
          <div className={styles.filter}>
            <h3>Filters</h3>
            <select
              onChange={handleAcademicYearFilter}
              className={styles.filterSelect}
            >
              <option value="">All Academic Years</option>
              {academicYears.map((year: any) => (
                <option key={year.id} value={year?.year}>
                  {year.year}
                </option>
              ))}
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
            Total Students: <span>{filteredUsers?.length}</span>
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
              {currentUsers.map((user: any) => (
                <li
                  key={user.id}
                  className={`${styles.studentItem} ${
                    selectedUser?.id === user.id ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  {user?.surname} {user?.firstname} {user?.othernames}
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
          {activeTab !== "sms" && activeTab !== "print" && (
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
          )}

          <div className={styles.tabContent}>
            {/* {renderContent(selectedUser)} */}
            {activeTab === "sms" && <SmsView />}
            {activeTab === "print" && <PrintView />}
            {activeTab !== "sms" &&
              activeTab !== "print" &&
              renderContent(selectedUser)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import styles from "./AdminSettings.module.css";
import { academic_year_admin_url, admin_base_url } from "@/Utils/endpoints";
import { useAdmin } from "@/contexts/AdminContext";
import { Router, useRouter } from "next/router";
import ProgrammeSettings from "./SideBarMenuContent/Programmes/ProgrammeSettings";
interface AcademicYear {
  id: number;
  year: string;
  isActive: boolean;
}
const AdminSettings = () => {
  const {
    newYear,
    error,
    editYearId,
    editYearValue,
    setEditYearId,
    setEditYearValue,
    fetchAcademicYears,
    setNewYear,
    handleAddYear,
    academicYears,
    handleUpdateYear,
    handleSetActive,
    handleRemoveYear,
    selectedMenu,
    setSelectedMenu,
  }: any = useAdmin();
  const router = useRouter();
  useEffect(() => {
    fetchAcademicYears();
  }, []);

  const handleEditYear = (year: AcademicYear) => {
    setEditYearId(year.id);
    setEditYearValue(year.year);
  };

  const handleCancelEdit = () => {
    setEditYearId(null);
    setEditYearValue("");
  };
  const handleBackToAdmin = () => {
    router.push("/admin"); // Adjust the path to the admin main page as needed
  };
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.sidebar}>
        <h2>Settings</h2>
        <ul className={styles.sidebarMenu}>
          <li
            className={selectedMenu === "Academic Years" ? styles.active : ""}
            onClick={() => setSelectedMenu("Academic Years")}
          >
            Academic Years
          </li>
          <li
            className={selectedMenu === "Programmes" ? styles.active : ""}
            onClick={() => setSelectedMenu("Programmes")}
          >
            Programmes
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        <h1>Admin Settings</h1>
        <div className={styles.header}>
          <button onClick={handleBackToAdmin} className={styles.backButton}>
            Back to Admin Page
          </button>
        </div>
        {selectedMenu === "Academic Years" && (
          <div className={styles.academicYears}>
            <h2>Academic Years</h2>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.addYear}>
              <input
                type="text"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="Enter new academic year (e.g., 2023/2024)"
              />
              <button onClick={handleAddYear}>Add Year</button>
            </div>
            <ul className={styles.yearList}>
              {academicYears.map((year: any) => (
                <li
                  key={year.id}
                  className={year.isActive ? styles.activeYear : ""}
                >
                  {editYearId === year.id ? (
                    <>
                      <input
                        type="text"
                        value={editYearValue}
                        onChange={(e) => setEditYearValue(e.target.value)}
                      />
                      <button onClick={handleUpdateYear}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {year.year}
                      {year.isActive && (
                        <span className={styles.activeTxt}> Active</span>
                      )}
                      <div className={styles.yearActions}>
                        <button
                          onClick={() => handleEditYear(year)}
                          className={styles.editBtn}
                        >
                          Edit
                        </button>
                        {!year.isActive && (
                          <button
                            onClick={() => handleSetActive(year.id)}
                            className={styles.setActiveBtn}
                          >
                            Set Active
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveYear(year.id)}
                          className={styles.removeBtn}
                        >
                          Remove
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedMenu === "Programmes" && <ProgrammeSettings />}
      </div>
    </div>
  );
};

export default AdminSettings;

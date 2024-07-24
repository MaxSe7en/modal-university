import React, { useEffect, useState } from "react";
import styles from "./AdminSettings.module.css";
import { academic_year_admin_url, admin_base_url } from "@/Utils/endpoints";
interface AcademicYear {
    id: number;
    year: string;
    isActive: boolean;
  }
const AdminSettings = () => {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [newYear, setNewYear] = useState("");
  const [error, setError] = useState('');
  //   const handleAddYear = () => {
  //     if (newYear && !academicYears.includes(newYear)) {
  //       setAcademicYears([...academicYears, newYear]);
  //       setNewYear('');
  //     }
  //   };

  //   const handleRemoveYear = (year: string) => {
  //     setAcademicYears(academicYears.filter(y => y !== year));
  //   };
  useEffect(() => {
    fetchAcademicYears();
  }, []);

  const fetchAcademicYears = async () => {
    try {
      const response = await fetch(academic_year_admin_url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminTz")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch academic years");
      }
      const data = await response.json();
      console.log(data)
      setAcademicYears(data.data);
    } catch (error) {
      console.error("Error fetching academic years:", error);
      setError("Failed to load academic years");
    }
  };

  const handleAddYear = async () => {
    if (newYear && !academicYears.some(year => year.year === newYear)) {
      try {
        const response = await fetch(academic_year_admin_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminTz')}`,
          },
          body: JSON.stringify({ year: newYear }),
        });

        if (!response.ok) {
          throw new Error('Failed to add academic year');
        }

        await fetchAcademicYears(); // Refresh the list
        setNewYear('');
        setError('');
      } catch (error) {
        console.error('Error adding academic year:', error);
        setError('Failed to add academic year');
      }
    } else if (academicYears.some(year => year.year === newYear)) {
      setError('This academic year already exists');
    }
  };

  const handleRemoveYear = async (id: number) => {
    try {
      const response = await fetch(`${academic_year_admin_url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminTz')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete academic year');
      }

      await fetchAcademicYears(); // Refresh the list
      setError('');
    } catch (error) {
      console.error('Error deleting academic year:', error);
      setError('Failed to delete academic year');
    }
  };

  const handleSetActive = async (id: number) => {
    try {
      const response = await fetch(`${academic_year_admin_url}/${id}/active`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminTz')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to set active academic year');
      }

      await fetchAcademicYears(); // Refresh the list
      setError('');
    } catch (error) {
      console.error('Error setting active academic year:', error);
      setError('Failed to set active academic year');
    }
  };
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.sidebar}>
        <h2>Settings</h2>
        <ul className={styles.sidebarMenu}>
          <li className={styles.active}>Academic Years</li>
          {/* Add more settings options here */}
        </ul>
      </div>
      <div className={styles.content}>
        <h1>Admin Settings</h1>
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
            {academicYears.map(year => (
              <li key={year.id} className={year.isActive ? styles.activeYear : ''}>
                {year.year} 
                {year.isActive && <span className={styles.activeTxt} > Active</span>} 
                {year.isActive && <span className={styles.activeIcon} />}
                {/* {JSON.stringify(year.id)} {JSON.stringify(year.isActive)} */}
                {/* {JSON.stringify(academicYears)} */}
                <div className={styles.yearActions}>
                  {!year.isActive && (
                    <button onClick={() => handleSetActive(year.id)} className={styles.setActiveBtn}>
                      Set Active
                    </button>
                  )}
                  <button onClick={() => handleRemoveYear(year.id)} className={styles.removeBtn}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

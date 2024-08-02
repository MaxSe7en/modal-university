import AcademicInfo from "@/components/Admin/AcademicInfo/AcademicInfo";
import Declaration from "@/components/Admin/Declaration/Declaration";
import PersonalInfo from "@/components/Admin/PersonalInfo/PersonalInfo";
import {
  academic_year_admin_url,
  admission_status_url,
} from "@/Utils/endpoints";
import React, { createContext, useContext, useMemo, useState } from "react";

const AdminContext = createContext({});

export interface User {
  id: number;
  studentId: number;
  surname: string;
  firstname: string;
  phone: string;
  academicInformation: {
    academicYear: string;
    admissionStatus: string;
  };
}
interface AcademicYear {
  id: number;
  year: string;
  isActive: boolean;
}
export const AdminProvider = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [smsMessage, setSmsMessage] = useState("");
  const [academicYearFilter, setAcademicYearFilter] = useState("");
  const [admissionStatusFilter, setAdmissionStatusFilter] = useState("");
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [newYear, setNewYear] = useState("");
  const [error, setError] = useState("");
  const [editYearId, setEditYearId] = useState<number | null>(null);
  const [editYearValue, setEditYearValue] = useState<string>("");

  const handleAcademicYearFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAcademicYearFilter(event.target.value);
  };

  const handleAdmissionStatusFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAdmissionStatusFilter(event.target.value);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
       {
        console.log("-------------->",user, user.academicInformation.academicYear, academicYearFilter)
        return  (academicYearFilter === "" ||
          user.academicInformation.academicYear == academicYearFilter) &&
        (admissionStatusFilter === "" ||
          user.academicInformation.admissionStatus === admissionStatusFilter)
       }
    );
  }, [users, academicYearFilter, admissionStatusFilter]);
  // const renderContent = () => {
  //     switch (activeTab) {
  //         case 'personal':
  //             return <PersonalInfo users={[]} />;
  //         case 'academic':
  //             return <AcademicInfo academicInfo={[]} users={[]} />;
  //         case 'declaration':
  //             return <Declaration users={[]} />;
  //         default:
  //             return <PersonalInfo users={[]} />;
  //     }
  // };
  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = event.target.value;
    const userId = selectedUser?.id;

    // Update the selectedUser state optimistically
    setSelectedUser((prevUser: any) => ({
      ...prevUser,
      academicInformation: {
        ...prevUser.academicInformation,
        admissionStatus: newStatus,
      },
    }));

    try {
      const token = localStorage.getItem("adminTz");
      const response = await fetch(`${admission_status_url}/${userId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        console.log("Status updated successfully");
      } else {
        console.error("Failed to update status");
        // Optionally, you can revert the state update if the request fails
        setSelectedUser((prevUser: any) => ({
          ...prevUser,
          academicInformation: {
            ...prevUser.academicInformation,
            admissionStatus: selectedUser?.academicInformation?.admissionStatus, // revert to previous status
          },
        }));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      // Optionally, revert the state update if there's an error
      setSelectedUser((prevUser: any) => ({
        ...prevUser,
        academicInformation: {
          ...prevUser.academicInformation,
          admissionStatus: selectedUser?.academicInformation?.admissionStatus, // revert to previous status
        },
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Awaiting results":
        return "#90EE90"; // Light green
      case "Under Review":
        return "#32CD32"; // Lime green
      case "Accepted":
        return "#006400"; // Dark green
      case "Rejected":
        return "#8FBC8F"; // Dark sea green
      default:
        return "#2E8B57"; // Sea green
    }
  };
  const renderContent = (selectedUser: any) => {
    if (!selectedUser) {
      return <div>Please select a student to view details.</div>;
    }

    return (
      <div>
        {activeTab === "personal" && <PersonalInfo users={[selectedUser]} />}
        {activeTab === "academic" && <AcademicInfo users={[selectedUser]} />}
        {activeTab === "declaration" && <Declaration users={[selectedUser]} />}
      </div>
    );
  };

  /*** -------------------- SETTINGS PAGE --------------------*/
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
      console.log(data);
      setAcademicYears(data.data);
    } catch (error) {
      console.error("Error fetching academic years:", error);
      setError("Failed to load academic years");
    }
  };

  const handleAddYear = async () => {
    if (newYear && !academicYears.some((year) => year.year === newYear)) {
      try {
        const response = await fetch(academic_year_admin_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminTz")}`,
          },
          body: JSON.stringify({ year: newYear }),
        });

        if (!response.ok) {
          throw new Error("Failed to add academic year");
        }

        await fetchAcademicYears(); // Refresh the list
        setNewYear("");
        setError("");
      } catch (error) {
        console.error("Error adding academic year:", error);
        setError("Failed to add academic year");
      }
    } else if (academicYears.some((year) => year.year === newYear)) {
      setError("This academic year already exists");
    }
  };

  const handleRemoveYear = async (id: number) => {
    try {
      const response = await fetch(`${academic_year_admin_url}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminTz")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete academic year");
      }

      await fetchAcademicYears(); // Refresh the list
      setError("");
    } catch (error) {
      console.error("Error deleting academic year:", error);
      setError("Failed to delete academic year");
    }
  };

  const handleSetActive = async (id: number) => {
    try {
      const response = await fetch(`${academic_year_admin_url}/${id}/active`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminTz")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to set active academic year");
      }

      await fetchAcademicYears(); // Refresh the list
      setError("");
    } catch (error) {
      console.error("Error setting active academic year:", error);
      setError("Failed to set active academic year");
    }
  };

  const handleUpdateYear = async () => {
    if (!editYearId || !editYearValue) return;

    try {
      const response = await fetch(`${academic_year_admin_url}/${editYearId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminTz")}`,
        },
        body: JSON.stringify({ year: editYearValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to update academic year");
      }

      await fetchAcademicYears(); // Refresh the list
      setEditYearId(null);
      setEditYearValue("");
      setError("");
    } catch (error) {
      console.error("Error updating academic year:", error);
      setError("Failed to update academic year");
    }
  };

  const value = useMemo(
    () => ({
      activeTab,
      renderContent,
      selectedUser,
      newYear,
      smsMessage,
      error,
      users,
      editYearId,
      academicYears,
      editYearValue,
      setAcademicYears,
      setNewYear,
      setError,
      setEditYearId,
      setEditYearValue,
      setUsers,
      setSmsMessage,
      setSelectedUser,
      setActiveTab,
      handleStatusChange,
      getStatusColor,
      filteredUsers,
      handleAcademicYearFilter,
      handleAdmissionStatusFilter,
      handleAddYear,
      handleRemoveYear,
      handleSetActive,
      handleUpdateYear,
      fetchAcademicYears,
    }),
    [
      activeTab,
      renderContent,
      selectedUser,
      newYear,
      smsMessage,
      error,
      users,
      editYearId,
      academicYears,
      editYearValue,
      handleStatusChange,
      filteredUsers,
      handleAddYear,
      handleRemoveYear,
      handleSetActive,
      handleUpdateYear,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

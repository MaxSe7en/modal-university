import AcademicInfo from "@/components/Admin/AcademicInfo/AcademicInfo";
import Declaration from "@/components/Admin/Declaration/Declaration";
import PersonalInfo from "@/components/Admin/PersonalInfo/PersonalInfo";
import { admission_status_url } from "@/Utils/endpoints";
import React, { createContext, useContext, useMemo, useState } from "react";

const AdminContext = createContext({});

export interface User {
  id: number;
  studentId: number;
  surname: string;
  firstname: string;
  phone: string;
  academicInformation: {
    admissionStatus: string;
  };
}

export const AdminProvider = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [smsMessage, setSmsMessage] = useState("");
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

  const value = useMemo(
    () => ({
      activeTab,
      renderContent,
      selectedUser,
      smsMessage,
      users,
      setUsers,
      setSmsMessage,
      setSelectedUser,
      setActiveTab,
      handleStatusChange,
      getStatusColor,
    }),
    [activeTab, selectedUser, smsMessage, users]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

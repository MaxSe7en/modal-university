import StudentDashboard from "@/components/StudentDashboard/StudentDashboard";
import React from "react";

type Props = {
  children: React.ReactNode; // Update the type definition for children
};

const StudentDashboardPage = ({ children }: Props) => {
  return <StudentDashboard/>
};

export default StudentDashboardPage;

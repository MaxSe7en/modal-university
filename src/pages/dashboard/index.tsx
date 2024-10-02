import StudentDashboard from "@/components/StudentDashboard/StudentDashboard";
import React from "react";
import Head from "next/head";  // Import Head from next/head

type Props = {
  children: React.ReactNode;
};

const StudentDashboardPage = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Student Dashboard - Modal University College</title>
      </Head>
      <StudentDashboard />
    </>
  );
};

export default StudentDashboardPage;

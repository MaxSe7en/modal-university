import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./StudentDashboard.module.css";
import { useForm } from "@/contexts/FormContext";
import { formatDate } from "@/Utils/utils";

interface ApplicationStatus {
  status: "Pending" | "Under Review" | "Accepted" | "Rejected";
  submissionDate: string;
  expectedResponseDate: string;
}

const StudentDashboard = () => {
  const router = useRouter();
  const { studentId } = router.query;
  const {
    inputValues,
    errors,
    setErrors,
    isLoading,
    admissionStatus,
    handleSubmit,
    validate,
    academicInfo,
    validateAcademicInfo,
    activeStep,
    setActiveStep,
    declarationError,
    declareState,
    setDeclareState,
  }: any = useForm();
  useEffect(() => {
    const authData = localStorage.getItem("authData");
    console.log("---------------->", authData);
    if (!authData) {
      router.push("/login");
    } else {
      const { id } = JSON.parse(authData);
      if (id) {
        fetchApplicationStatus(id);
      }
    }
  }, [router.pathname]);

  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatus | null>({
      status: "Accepted",
      submissionDate: "2024-07-07",
      expectedResponseDate: "2024-08-15",
    });

  useEffect(() => {
    if (studentId) {
      fetchApplicationStatus(studentId as string);
    }
  }, [studentId]);

  const fetchApplicationStatus = async (id: string) => {
    // Replace this with your actual API call
    try {
      // const response = await fetch(`/api/application-status/${id}`);
      // const data = await response.json();
      // setApplicationStatus(data);

      // Mock data for demonstration
      setApplicationStatus({
        status: "Under Review",
        submissionDate: "2024-07-07",
        expectedResponseDate: "2024-08-15",
      });
    } catch (error) {
      console.error("Error fetching application status:", error);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Pending":
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

  const handleLogout = () => {
    localStorage.removeItem("authData");
    router.push("/login");
  };
  const handleUpdateDetails = () => {
    // localStorage.removeItem("authData");
    router.push("/");
  };

  //   if (!applicationStatus) {
  //     return <div className={styles.loading}>Loading...</div>;
  //   }

  return (
    <>
      <div className={styles.backgroundImage}></div>
      <div className={styles.container}>
        <div className={styles.dashboard}>
          {/* {JSON.stringify(inputValues)} */}
          <h1 className={styles.title}>
            Modal University Application Dashboard
          </h1>

          <div className={styles.welcome}>
            <h2>Welcome, {inputValues?.surname}</h2>
            <p>
              Thank you for submitting your application. You can check your
              application status here.
            </p>
          </div>

          <div
            className={styles.status}
            style={{
              backgroundColor: getStatusColor(admissionStatus?.admissionStatus),
            }}
          >
            <h3>Application Status: {admissionStatus?.admissionStatus}</h3>
          </div>

          <div className={styles.dates}>
            <div>
              <h4>Submission Date</h4>
              <p>{formatDate(admissionStatus?.createdAt)}</p>
            </div>
            <div style={{display: "none"}}>
              <h4>Expected Response Date</h4>
              <p>{applicationStatus?.expectedResponseDate}</p>
            </div>
          </div>

          <div className={styles.nextSteps}>
            <h3>Next Steps</h3>
            <ul>
              <li>
                Keep checking this dashboard for updates on your application
                status.
              </li>
              <li>Ensure your contact information is up to date.</li>
              <li>Prepare any additional documents that may be requested.</li>
            </ul>
          </div>
        </div>
        <button className={styles.updateButton} onClick={handleUpdateDetails}>
          Update
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default StudentDashboard;

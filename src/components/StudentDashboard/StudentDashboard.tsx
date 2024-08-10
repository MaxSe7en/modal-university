import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./StudentDashboard.module.css";
import { useForm } from "@/contexts/FormContext";
import { formatDate } from "@/Utils/utils";
import schoolLogo from "../../../public/assets/logo/modal_logo.png";
import Image from "next/image";
import ReviewPage from "./ReviewPage/ReviewPage";
interface ApplicationStatus {
  status: "Awaiting results" | "Under Review" | "Accepted" | "Rejected";
  submissionDate: string;
  expectedResponseDate: string;
}

const StudentDashboard = () => {
  const router = useRouter();
  const { studentId } = router.query;
  const { inputValues, admissionStatus, academicInfo }: any = useForm();
  const [showReview, setShowReview] = useState(false);

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
    return "#fec76f"; // Sea green
    // switch (status) {
    // case "Awaiting results":
    //   return "#90EE90"; // Light green
    // case "Under Review":
    //   return "#32CD32"; // Lime green
    // case "Accepted":
    //   return "#006400"; // Dark green
    // case "Rejected":
    //   return "#8FBC8F"; // Dark sea green
    // default:
    // return "#fec76f"; // Sea green
    // }
  };

  const handleLogout = () => {
    localStorage.removeItem("authData");
    window.location.reload();
    router.push("/login");
  };

  const handleUpdateDetails = () => {
    // localStorage.removeItem("authData");
    router.push("/");
  };
  const handleReview = () => {
    setShowReview(true);
  };
  //   if (!applicationStatus) {
  //     return <div className={styles.loading}>Loading...</div>;
  //   }

  const handleBackToDashboard = () => {
    setShowReview(false);
  };

  return (
    <div className={styles.container}>
      {showReview ? (
        <ReviewPage
          userInfo={inputValues}
          academicInformation={academicInfo}
          // declaration={declaration}
          onBack={handleBackToDashboard}
        />
      ) : (
        <div className={styles.dashboard}>
          <div className={styles.logo_container}>
            <Image src={schoolLogo} alt="school logo" width={80} height={80} />
          </div>
          {/* {JSON.stringify(academicInfo.slips[0]?.awaiting)} */}
          <div className={styles.title_container}>
            <p className={styles.school_name}>MODAL UNIVERSITY COLLEGE</p>
            <h1 className={styles.title}>Application Dashboard</h1>
            <p className={styles.subtitle}>
              Welcome, {inputValues?.surname}. Thank you for submitting your
              application. You can check your application status here.
            </p>
          </div>
          <div
            className={styles.status}
            style={{
              backgroundColor: getStatusColor(admissionStatus?.admissionStatus),
              color: "black",
            }}
          >
            <h3>Application Status: {admissionStatus?.admissionStatus}</h3>
          </div>
          <div className={styles.dates}>
            <div>
              <h4>Submission Date</h4>
              <p>{formatDate(admissionStatus?.createdAt)}</p>
            </div>
          </div>
          <div className={styles.nextSteps}>
            <h3>Next Steps</h3>
            <ul>
              {academicInfo.slips[0]?.awaiting == 1 && (
                <li>Update your grades once results are available.</li>
              )}
              <li>
                Keep checking this dashboard for updates on your application
                status.
              </li>
              <li>Ensure your contact information is up to date.</li>
              <li>Prepare any additional documents that may be requested.</li>
            </ul>
          </div>
          <button className={styles.updateButton} onClick={handleReview}>
            Review
          </button>
          <button className={styles.updateButton} onClick={handleUpdateDetails}>
            Update
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
          <p className={styles.notice}>
            For any inquiries, please contact our support team at{" "}
            <strong>0240766893</strong>.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;

import { sendOtp, verifyOtp } from "@/services/authService";
import { useRouter } from "next/router";
import { createContext, useMemo, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext"; // Import the useToast hook
import { active_academic_year_url, submit_url } from "@/Utils/endpoints";
import { sendSms } from "@/Utils/utils";

const FormContext = createContext({});

export const FormProvider = ({ children }: any) => {
  const bet = {};
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [declareState, setDeclareState] = useState(false);
  const [declarationError, setDeclarationError] = useState(false);
  const router = useRouter();
  const { showToast }: any = useToast();
  const [activeLoginStep, setActiveLoginStep] = useState(1);
  const [loginInputValues, setLoginInputValues] = useState({
    phone: "",
    otp: "",
  });
  const [admissionStatus, setAdmissionStatus] = useState({
    admissionStatus: "",
    createdAt: "",
  });
  const [otpSent, setOtpSent] = useState(false); // State to track OTP sent status
  const [token, setToken] = useState("");
  const [inputValues, setInputValues] = useState({
    surname: "",
    firstname: "",
    othernames: "",
    address: "",
    email: "",
    nationality: "",
    phone: "",
    dob: "",
    gender: "Male",
    maritalstatus: "Single",
    title: "Mr",
    placeofbirth: "",
    religion: "",
    emergencycontactnumber: "",
    emergencycontactname: "",
    emergencycontactrelationship: "",
    day: "",
    month: "",
    year: "",
  });

  const [studentDetails, setStudentDetails] = useState({
    phoneNumber: "",
    id: "",
  });

  const [errors, setErrors] = useState({});

  const [academicInfo, setAcademicInfo] = useState({
    numRows: 0,
    slips: [],
  });

  const message = `Dear ${inputValues.title} ${inputValues.firstname} ${inputValues.surname},

Thank you for submitting your application to Modal College.
We have received it and will review it soon. 

Best regards,
Admissions Team
    `;

  console.log(studentDetails);
  // useEffect(() => {
  //   if (!router.pathname.includes("/admin")) {
  //     if (!studentDetails.phoneNumber || !studentDetails.id) {
  //       router.push("/login"); // Redirect to the home page if studentDetails is empty
  //     }
  //   }
  // }, [studentDetails]);

  useEffect(() => {
    if (!router.pathname.includes("/admin")) {
      const authData: any = localStorage.getItem("authData");
      console.log("---------------->", authData);
      if (!authData || !token) {
        router.push("/login");
      } else {
        const { phoneNumber, id } = JSON.parse(authData);
        setStudentDetails({ phoneNumber, id });
      }
    }
  }, [token]);

  const validate = (values: {
    day: any;
    month: any;
    year: any;
    surname: any;
    firstname: any;
    othernames?: string;
    address?: string;
    email: any;
    nationality?: string;
    phone: any;
    dob?: string;
    placeofbirth?: string;
    religion?: string;
    emergencycontactnumber?: string;
    emergencycontactname?: string;
    emergencycontactrelationship?: string;
  }) => {
    let errors: any = {};

    if (!values.surname) {
      errors.surname = "Surname is required";
    }

    if (!values.firstname) {
      errors.firstname = "First name is required";
    }

    if (!values.othernames) {
      errors.othernames = "Other name is required";
    }

    if (!values.religion) {
      errors.religion = "Religion is required";
    }

    if (!values.nationality) {
      errors.nationality = "Nationality is required";
    }

    if (!values.religion) {
      errors.religion = "Religion is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "Phone number is invalid";
    }

    // Address validation
    if (values.address && values.address.trim().length < 10) {
      errors.address = "Address should be at least 10 characters long";
    }

    // Date of birth validation
    // if (values.dob && !/^\d{4}-\d{2}-\d{2}$/.test(values.dob)) {
    //   errors.dob = "Invalid date of birth format (YYYY-MM-DD)";
    // }

    // Place of birth validation
    if (!values.placeofbirth) {
      errors.placeofbirth = "Place of birth is required";
    } else if (values.placeofbirth.trim().length < 3) {
      errors.placeofbirth =
        "Place of birth should be at least 3 characters long";
    }

    // Emergency contact validation
    if (!values.emergencycontactnumber) {
      errors.emergencycontactnumber = "Emergency contact number is required";
    } else if (!/^\d{10}$/.test(values.emergencycontactnumber)) {
      errors.emergencycontactnumber = "Emergency contact number is invalid";
    }

    if (!values.emergencycontactname) {
      errors.emergencycontactname = "Emergency contact name is required";
    } else if (values.emergencycontactname.trim().length < 3) {
      errors.emergencycontactname =
        "Emergency contact name should be at least 3 characters long";
    }

    if (!values.emergencycontactrelationship) {
      errors.emergencycontactrelationship =
        "Emergency contact relationship is required";
    } else if (values.emergencycontactrelationship.trim().length < 3) {
      errors.emergencycontactrelationship =
        "Emergency contact relationship should be at least 3 characters long";
    }

    if (!values.day || !values.month || !values.year) {
      errors.dob = "Complete Date of Birth is required";
    } else {
      const date = new Date(values.year, values.month - 1, values.day);
      const today = new Date();
      if (date > today) {
        errors.dob = "Date of Birth cannot be in the future";
      }
    }

    return errors;
  };

  const validateAcademicInfo = (info: { numRows: any; slips: any }) => {
    let errors: any = {};

    if (info.numRows === 0) {
      errors.numRows = "Number of result slips is required";
    }

    info.slips.forEach(
      (
        slip: {
          examinationTitle: any;
          monthYear: any;
          indexNumber: any;
          numSubjects: number;
          subjects: any;
          awaiting: boolean;
        },
        slipIndex: any
      ) => {
        if (!slip.examinationTitle) {
          errors[`examinationTitle_${slipIndex}`] =
            "Examination title is required";
        }
        if (!slip.monthYear) {
          errors[`monthYear_${slipIndex}`] =
            "Month and year attempted are required";
        }
        if (!slip.indexNumber) {
          errors[`indexNumber_${slipIndex}`] = "Index number is required";
        }
        if (slip.numSubjects === 0) {
          errors[`numSubjects_${slipIndex}`] = "Number of subjects is required";
        }
        // console.log(slip);
        const slipSubject: any = slip.subjects;
        slipSubject.forEach(
          (subject: { subject: any; grade: any }, subjectIndex: any) => {
            console.log(
              "sdfkdasfdshfkhkdashfhdkashfkhasdkhfas, SUBJECT: ",
              subject
            );
            if (!subject?.subject) {
              errors[`subject_${slipIndex}_${subjectIndex}`] =
                "Subject is required";
            }
            if (!slip.awaiting && !subject?.grade) {
              errors[`grade_${slipIndex}_${subjectIndex}`] =
                "Grade is required";
            }
          }
        );
      }
    );

    return errors;
  };

  const handleChange = useMemo(
    () => (e: { target: { name: any; value: any } }) => {
      const { name, value } = e.target;
      console.log(value, name);
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    },
    [inputValues]
  );

  const handleSubmit = useMemo(
    () => async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (activeStep === 3 && !declareState) {
        setDeclarationError(true);
        return;
      }
      const validationErrors = validate(inputValues);
      const academicValidationErrors = validateAcademicInfo(academicInfo);
      setErrors({ ...validationErrors, ...academicValidationErrors });

      if (
        Object.keys(validationErrors).length === 0 &&
        Object.keys(academicValidationErrors).length === 0
      ) {
        setIsLoading(true);
        try {
          const response = await fetch(submit_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              details: studentDetails,
              userInfo: { ...inputValues, declaration: "" + declareState },
              academicInformation: academicInfo,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            // Store authentication data in localStorage
            localStorage.setItem(
              "authData",
              JSON.stringify({
                phoneNumber: studentDetails.phoneNumber,
                id: studentDetails.id,
              })
            );

            showToast({
              message: "Form submitted successfully!",
              position: "top",
            });
            console.log("Form submitted successfully:", data, studentDetails);
            await sendSms(studentDetails.phoneNumber, message);
            // Redirect to the dashboard page
            router.push(`/dashboard?studentId=${studentDetails.id}`);
          } else {
            showToast({
              message: "Error submitting form, please try again.",
              color: "#FF3333",
            });

            throw new Error(data.message || "Error submitting form");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          showToast({ message: "Error submitting form", color: "#FF3333" });
        } finally {
          setIsLoading(false);
        }
      }
    },
    [
      academicInfo,
      activeStep,
      declareState,
      inputValues,
      showToast,
      studentDetails,
    ]
  );

  const handleSubmitOld = useMemo(
    () => (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (activeStep === 3 && !declareState) {
        setDeclarationError(true);
        return;
      }
      const validationErrors = validate(inputValues);
      const academicValidationErrors = validateAcademicInfo(academicInfo);
      setErrors({ ...validationErrors, ...academicValidationErrors });

      if (
        Object.keys(validationErrors).length === 0 &&
        Object.keys(academicValidationErrors).length === 0
      ) {
        (async () => {
          console.log(inputValues);
          try {
            const response = await fetch(submit_url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                details: studentDetails,
                userInfo: { ...inputValues, declaration: "" + declareState },
                academicInformation: academicInfo,
              }),
            });
            const data = await response.json();
            showToast({
              message: "Form submitted successfully!",
              position: "top",
            }); // Show success toast
            console.log("Form submitted successfully:", data);
          } catch (error) {
            console.error("Error submitting form:", error);
            showToast({
              message: "Error submitting form",
              position: "bottom",
              color: "#FF3333",
            }); // Show success toast
          }
        })();
        console.log("Form submitted successfully:", inputValues, academicInfo);
      }
    },
    [
      academicInfo,
      activeStep,
      declareState,
      inputValues,
      showToast,
      studentDetails,
    ]
  );

  const handleAcademicChange = (info: any) => {
    setAcademicInfo(info);
  };

  const fetchCurrentActiveAcademicYear = async () => {
    try {
      const response = await fetch(`${active_academic_year_url}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch current active academic year");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching current active academic year:", error);
      throw error;
    }
  };

  const handleOtpContinue = useMemo(
    () => async () => {
      if (!loginInputValues.phone) {
        showToast({
          message: "Phone number cannot be empty",
          position: "bottom",
          color: "#FF3333",
        });
        return;
      }
      setIsLoading(true);
      try {
        const response = await sendOtp(loginInputValues.phone);
        console.log(response.status, response);
        if (response.status == 200) {
          console.log("OTP sent successfully:", response.data.message);
          showToast({ message: response.data.message, position: "top" }); // Show success toast
          setToken(response.data.tok);
          setOtpSent(true);
          setActiveLoginStep(2);
        }
      } catch (error) {
        console.error("Failed to send OTP");
        showToast({
          message: "Failed to send OTP",
          position: "bottom",
          color: "#FF3333",
        }); // Show success toast
      } finally {
        setIsLoading(false);
      }
    },
    [loginInputValues.phone, showToast]
  );

  const handleLoginInputChange = useMemo(
    () => (e: { target: { name: string; value: string } }) => {
      const { name, value } = e.target;
      const numericValue = value.replace(/\D/g, "");

      setLoginInputValues({
        ...loginInputValues,
        [name]: numericValue,
      });
    },
    [loginInputValues]
  );

  const handleNumberOtpSubmit = useMemo(
    () => async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!loginInputValues.phone) {
        showToast({ message: "Phone number cannot be empty" });
        return;
      } else if (!loginInputValues.otp) {
        showToast({ message: "OTP cannot be empty", color: "#FF3333" });
        return;
      }
      setIsLoading(true);

      try {
        const { data, status } = await verifyOtp(
          loginInputValues.phone,
          loginInputValues.otp,
          token
        );
        console.log("====== this is the data ===========>", data);
        if (status === 200) {
          setStudentDetails({
            phoneNumber: data?.details?.phoneNumber,
            id: data?.details?.sId,
          });
          setAdmissionStatus({
            admissionStatus: data?.academicInformation?.admissionStatus,
            createdAt: data?.academicInformation?.createdAt,
          });
          setInputValues(data?.userInfo);
          setAcademicInfo(data?.academicInformation);
          setDeclareState(JSON.parse(data?.declaration));
          showToast({ message: "OTP verified successfully!", position: "top" });
          localStorage.setItem(
            "authData",
            JSON.stringify({
              phoneNumber: data?.details.phoneNumber,
              id: data?.details.sId,
            })
          );
          setTimeout(() => {
            if (data?.userInfo.email != "") {
              // Redirect to the dashboard page if email is provided
              router.push(`/dashboard?studentId=${data?.details.sId}`);
            } else {
              router.push("/");
            }
          }, 1000);
        }
      } catch (error: any) {
        console.error("Failed to verify OTP");
        showToast({ message: error.response.data.error, color: "#FF3333" });
      } finally {
        setIsLoading(false);
      }

      if (activeLoginStep === 2) {
        // Add your OTP verification logic here
        console.log("OTP Submitted:", loginInputValues.otp);
      }
    },
    [
      activeLoginStep,
      loginInputValues.otp,
      loginInputValues.phone,
      router,
      showToast,
    ]
  );

  const values = useMemo(
    () => ({
      bet,
      errors,
      inputValues,
      academicInfo,
      activeStep,
      declareState,
      declarationError,
      isLoading,
      admissionStatus,
      setIsLoading,
      setDeclarationError,
      setDeclareState,
      setActiveStep,
      validate,
      setInputValues,
      setErrors,
      handleChange,
      activeLoginStep,
      fetchCurrentActiveAcademicYear,
      setActiveLoginStep,
      loginInputValues,
      setLoginInputValues,
      otpSent,
      setOtpSent,
      handleOtpContinue,
      handleLoginInputChange,
      handleNumberOtpSubmit,
      handleAcademicChange,
      validateAcademicInfo,
      handleSubmit,
    }),
    [
      bet,
      errors,
      isLoading,
      inputValues,
      academicInfo,
      activeStep,
      declareState,
      admissionStatus,
      declarationError,
      handleChange,
      activeLoginStep,
      loginInputValues,
      otpSent,
      handleOtpContinue,
      handleLoginInputChange,
      handleNumberOtpSubmit,
      handleSubmit,
    ]
  );

  return (
    <FormContext.Provider value={values}>
      {/* {JSON.stringify(token)} */}
      {/* {process.env.NODE_ENV} */}
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);

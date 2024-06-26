import { sendOtp, verifyOtp } from "@/services/authService";
import { useRouter } from "next/router";
import { createContext, useMemo, useContext, useState } from "react";
import { useToast } from "./ToastContext"; // Import the useToast hook


const FormContext = createContext({});

export const FormProvider = ({ children }: any) => {
  const bet = {};
  const [activeStep, setActiveStep] = useState(1);
  const [declareState, setDeclareState] = useState(false);
  const [declarationError, setDeclarationError] = useState(false);
  const router = useRouter();
  const { showToast }:any = useToast();
  const [activeLoginStep, setActiveLoginStep] = useState(1);
  const [loginInputValues, setLoginInputValues] = useState({
    phone: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false); // State to track OTP sent status

  const [inputValues, setInputValues] = useState({
    surname: "",
    firstname: "",
    othernames: "",
    address: "",
    email: "",
    nationality: "",
    phone: "",
    dob: "",
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
    id: ""
  });

  const [errors, setErrors] = useState({});

  const [academicInfo, setAcademicInfo] = useState({
    numRows: 0,
    slips: [],
  });

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
            console.log("sdfkdasfdshfkhkdashfhdkashfkhasdkhfas");
            if (!subject?.subject) {
              errors[`subject_${slipIndex}_${subjectIndex}`] =
                "Subject is required";
            }
            if (!subject?.grade) {
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
          try {
            const response = await fetch(
              "http://localhost:5000/api/form/submit",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  details: studentDetails,
                  userInfo: {...inputValues, declaration: ""+declareState},
                  academicInformation: academicInfo,
                }),
              }
            );
            const data = await response.json();
            showToast("Form submitted successfully!"); // Show success toast
            console.log("Form submitted successfully:", data);
          } catch (error) {
            console.error("Error submitting form:", error);
          }
        })();
        console.log("Form submitted successfully:", inputValues, academicInfo);
      }
    },
    [academicInfo, activeStep, declareState, inputValues, showToast, studentDetails]
  );

  const handleAcademicChange = (info: any) => {
    setAcademicInfo(info);
  };

  const handleOtpContinue = useMemo(
    () => async () => {
      try {
        const response = await sendOtp(loginInputValues.phone);
        console.log(response.status, response);
        if (response.status == 200) {
          console.log("OTP sent successfully:", response.data.message);
          showToast(response.data.message); // Show success toast

          setOtpSent(true);
          setActiveLoginStep(2);
        }
      } catch (error) {
        console.error("Failed to send OTP");
      }
    },
    [loginInputValues.phone]
  );

  const handleLoginInputChange = useMemo(
    () => (e: { target: { name: any; value: any } }) => {
      setLoginInputValues({
        ...loginInputValues,
        [e.target.name]: e.target.value,
      });
    },
    [loginInputValues]
  );

  const handleNumberOtpSubmit = useMemo(
    () => async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      try {
        const {data, status} = await verifyOtp(
          loginInputValues.phone,
          loginInputValues.otp
        );
        console.log("====== this is the data ===========>",data);
        if (status === 200) {
          setStudentDetails(data?.details);
          setInputValues(data?.userInfo);
          setAcademicInfo(data?.academicInformation);
          setDeclareState(JSON.parse(data?.declaration));
          showToast("OTP verified successfully!"); // Show success toast
          setTimeout(() =>{
            router.push("/");
          }, 1000)
        }
      } catch (error) {}

      if (activeLoginStep === 2) {
        // Add your OTP verification logic here
        console.log("OTP Submitted:", loginInputValues.otp);
      }
    },
    [activeLoginStep, loginInputValues.otp, loginInputValues.phone, router]
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
      setDeclarationError,
      setDeclareState,
      setActiveStep,
      validate,
      setInputValues,
      setErrors,
      handleChange,
      activeLoginStep,
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
      inputValues,
      academicInfo,
      activeStep,
      declareState,
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

  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};

export const useForm = () => useContext(FormContext);

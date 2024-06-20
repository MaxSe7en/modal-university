import { createContext, useMemo, useContext, useState } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }: any) => {
  const bet = {};

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

  const [errors, setErrors] = useState({});

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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    console.log(value, name);
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationErrors = validate(inputValues);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Submit form
      console.log("Form submitted successfully:", inputValues);
    }
  };

  const values = useMemo(
    () => ({
      bet,
      errors,
      inputValues,
      validate,
      setInputValues,
      setErrors,
      handleChange,
      handleSubmit,
    }),
    [bet, errors, inputValues]
  );

  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};

export const useForm = () => useContext(FormContext);

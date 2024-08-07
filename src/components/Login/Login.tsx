import React from "react";
import styles from "./Login.module.css";
import { useForm } from "@/contexts/FormContext";
import Image from "next/image";
import schoolLogo from "../../../public/assets/logo/modal_logo.png";
import Spinner from "../Spinner/Spinner";

const Login = () => {
  const {
    activeLoginStep,
    setActiveLoginStep,
    loginInputValues,
    setLoginInputValues,
    otpSent,
    setOtpSent,
    isLoading,
    handleOtpContinue,
    handleLoginInputChange,
    handleNumberOtpSubmit,
  }: any = useForm();

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleOtpContinue(e);
  };

  return (
    <div className={styles.form_wrapper}>
      <form className={styles.form_container} onSubmit={handleLogin}>
        {activeLoginStep === 1 && (
          <>
            <div className={styles.logo_container}>
              <Image
                src={schoolLogo}
                alt="school logo"
                width={80}
                className={styles["school-logo"]}
              />
            </div>
            <div className={styles.title_container}>
            <p className={styles.school_name}>MODAL UNIVERSITY COLLEGE</p>
              <p className={styles.title}>ADMISSION PORTAL</p>
              <span className={styles.subtitle}>
                Start or resume your application process by entering your phone
                number
              </span>
            </div>
            <br />
            <div className={styles.input_container}>
              <label className={styles.input_label} htmlFor="number_field">
                Enter your phone number
              </label>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
              >
                {/* <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#141B34"
                  d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
                ></path> */}
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#141B34"
                  d="M3 5.5C3 14.06 9.94 21 18.5 21c.386 0 .77-.018 1.148-.053.435-.04.802-.341.918-.754l1.5-5.345c.12-.427-.066-.882-.455-1.12l-4.145-2.527a1 1 0 00-1.188.142l-2.173 2.173a12.044 12.044 0 01-4.7-4.7l2.173-2.173a1 1 0 00.142-1.188L9.195 1.31C8.957.921 8.502.735 8.075.855L2.73 2.355c-.413.116-.714.483-.754.918C1.968 3.73 1.95 4.114 1.95 4.5"
                />
                {/* <path
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  stroke="#141B34"
                  d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                ></path> */}
              </svg>
              <input
                placeholder="025xxxxxxx"
                title="Input title"
                name="phone"
                type="text"
                className={styles.input_field}
                id="number_field"
                value={loginInputValues.phone}
                onChange={handleLoginInputChange}
              />
            </div>
            <button
              type="button"
              className={styles.sign_in_btn}
              onClick={handleOtpContinue}
            >
              {isLoading ? <Spinner /> : "Continue"}
            </button>
          </>
        )}
        {activeLoginStep === 2 && (
          <>
            <div className={styles.logo_container}>
              <Image
                src={schoolLogo}
                alt="school logo"
                width={80}
                className={styles["school-logo"]}
              />
            </div>
            <div className={styles.title_container}>
              <p className={styles.title}>Enter OTP</p>
              <span className={styles.subtitle}>
                Enter the OTP sent to your phone number.
              </span>
            </div>
            <br />
            <div className={styles.input_container}>
              <label className={styles.input_label} htmlFor="otp_field">
                OTP Code
              </label>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#141B34"
                  d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
                ></path>
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="#141B34"
                  d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
                ></path>
                <path
                  fill="#141B34"
                  d="M21.2046 15.1045L20.6242 15.6956V15.6956L21.2046 15.1045ZM21.4196 16.4767C21.7461 16.7972 22.2706 16.7924 22.5911 16.466C22.9116 16.1395 22.9068 15.615 22.5804 15.2945L21.4196 16.4767ZM18.0228 15.1045L17.4424 14.5134V14.5134L18.0228 15.1045ZM18.2379 18.0387C18.5643 18.3593 19.0888 18.3545 19.4094 18.028C19.7299 17.7016 19.7251 17.1771 19.3987 16.8565L18.2379 18.0387ZM14.2603 20.7619C13.7039 21.3082 12.7957 21.3082 12.2394 20.7619L11.0786 21.9441C12.2794 23.1232 14.2202 23.1232 15.4211 21.9441L14.2603 20.7619ZM12.2394 20.7619C11.6914 20.2239 11.6914 19.358 12.2394 18.82L11.0786 17.6378C9.86927 18.8252 9.86927 20.7567 11.0786 21.9441L12.2394 20.7619ZM12.2394 18.82C12.7957 18.2737 13.7039 18.2737 14.2603 18.82L15.4211 17.6378C14.2202 16.4587 12.2794 16.4587 11.0786 17.6378L12.2394 18.82ZM14.2603 18.82C14.8082 19.358 14.8082 20.2239 14.2603 20.7619L15.4211 21.9441C16.6304 20.7567 16.6304 18.8252 15.4211 17.6378L14.2603 18.82ZM15.4211 18.0387C15.0947 17.7182 15.0995 17.1936 15.4196 16.8729L14.2588 15.6908C13.9323 16.0114 13.9371 16.5359 14.2577 16.8565L15.4211 18.0387ZM18.6029 14.5134C18.1471 14.0602 17.3867 14.0602 16.9309 14.5134L18.0917 15.6956C18.2146 15.5747 18.3191 15.4484 18.6029 15.1045L18.0228 15.6956L18.6029 15.1045ZM22.5804 15.2945C21.5995 14.3235 20.025 14.3283 19.0539 15.3091L20.2148 16.4913C20.5166 16.1984 20.8928 16.2076 21.2046 16.4767L22.5804 15.2945ZM18.2379 16.8565C17.2678 15.8757 15.6934 15.8805 14.7125 16.8515L15.8733 18.0336C16.1751 17.7407 16.5513 17.7499 16.8632 18.019L18.2379 16.8565ZM12.2394 20.7619C12.0771 20.5996 11.9864 20.3887 11.9864 20.1667C11.9864 19.9448 12.0771 19.7339 12.2394 19.5716L11.0786 18.3894C10.1642 19.3288 10.1642 21.0308 11.0786 21.9441L12.2394 20.7619ZM15.4211 17.6378C15.5835 17.4755 15.7944 17.3848 16.0163 17.3848C16.2382 17.3848 16.4491 17.4755 16.6115 17.6378L17.7723 16.4556C16.8579 15.5162 15.156 15.5162 14.2416 16.4556L15.4211 17.6378ZM16.6115 17.6378C16.7739 17.8001 16.8646 18.011 16.8646 18.2329C16.8646 18.4548 16.7739 18.6657 16.6115 18.8281L17.7723 20.0102C18.6868 19.0709 18.6868 17.3688 17.7723 16.4556L16.6115 17.6378Z"
                ></path>
              </svg>
              <input
                placeholder="OTP Code"
                title="Input title"
                name="otp"
                type="text"
                className={styles.input_field}
                id="otp_field"
                value={loginInputValues.otp}
                onChange={handleLoginInputChange}
              />
            </div>
            <button
              type="submit"
              className={styles.sign_in_btn}
              onClick={handleNumberOtpSubmit}
            >
              {isLoading ? <Spinner /> : "Sign In"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;

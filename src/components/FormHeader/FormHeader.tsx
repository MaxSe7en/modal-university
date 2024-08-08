import React from "react";
import styles from "./formHeader.module.css";
import schoolLogo from "../../../public/assets/logo/modal_logo.png";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";

const dancingFont = Dancing_Script({ subsets: ["latin"] });

const FormHeader = () => {
  return (
    <div className={styles["header-container"]}>
        <Image src={schoolLogo} alt="school logo" className={styles["school-logo"]} />
        <div className={styles["school-details"]}>
          <h1 className={`${styles["school-name"]}`}>
            Modal University College
          </h1>
          <p>
            The Admission Office, P.O. Box SK 172 Sogakope, Volta Region, Ghana
          </p>
          <p>Mob. +233 240766893, +233 207686304</p>
          <p>Website: www.modalcollege.com</p>
        </div>
        <div className={styles["spacer"]}></div>
      </div>
  );
};

export default FormHeader;

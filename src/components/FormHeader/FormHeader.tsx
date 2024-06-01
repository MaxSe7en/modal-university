import React from "react";
import styles from "./formHeader.module.css";
import schoolLogo from "../../../public/assets/logo/crest.jpeg";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";

const dancingFont = Dancing_Script({ subsets: ["latin"] });

const FormHeader = () => {
  return (
    <>
      <div className={styles["header-container"]}>
        <Image src={schoolLogo} alt="school logo" className={styles["school-logo"]} />
        <div className={styles["school-details"]}>
          <h1 className={`${dancingFont.className} ${styles["school-name"]}`}>
            Modal University College
          </h1>
          <p>
            The Admission Office, P.O. Box SK 172 Sogakope, Volta Region, Ghana
          </p>
          <p>Mob. +233 552482220, +233 207686304</p>
          <p>Website: www.mocalcollege.com</p>
        </div>
        <div className={styles["spacer"]}></div>
      </div>
      {/* <div className={styles["general-info"]}>
        <h4 className={`${styles["form-title"]}`}>
        GENERAL INSTRUCTIONS
        </h4>
        <p className={styles["general-info-instructions"]}>Please read all information on this form carefully before completing the form. Apply as early as possible to avoid disappointment as competition is keen.</p>
      </div> */}
    </>
  );
};

export default FormHeader;

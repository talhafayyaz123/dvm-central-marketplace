import React from "react";
import styles from "./DashboardPageHeading.module.css";

const DashboardPageHeading = ({ heading }) => {
  return (
    <div className={`${styles.info_heading} radius`}>
      <h3 className={styles.faq_heading}>{heading}</h3>
    </div>
  );
};

export default DashboardPageHeading;

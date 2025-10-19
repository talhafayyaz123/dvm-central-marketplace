import React from "react";
import styles from "./LPRights.module.css";
import Link from "next/link";

const LPRights = () => {
  return (
    <div className={styles.rights_container}>
      <div className={`${styles.rights_wrapper} sec-container`}>
        <p>Copyright © 2023 Vet and tech Inc. All Rights Reserved</p>

        {/* <div className={styles.terms_wrapper}>
          <Link href="#">
            <a>Returns</a>
          </Link>
          <span>/</span>
          <Link href="#">
            <a>{`Terms & Condition`}</a>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default LPRights;

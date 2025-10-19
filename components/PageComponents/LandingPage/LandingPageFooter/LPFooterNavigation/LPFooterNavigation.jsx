import React from "react";
import styles from "./LPFooterNavigation.module.css";
import Image from "next/image";
import ftrshape1 from "../../../../../public/landing-page/shape/fo-shape1.png";
import ftrshape2 from "../../../../../public/landing-page/shape/fo-shape2.png";
import ftrmap from "../../../../../public/landing-page/shape/map.png";
import LpFindUs from "./LPFindUs/LPFindUs";
import LPBusinessDetail from "./LPBusinessDetails/LPBusinessDetail";
import LPBuyWithConfidence from "./LPBuyWithConfidence/LPBuyWithConfidence";
import LPVetResources from "./LPVetResources/LPVetResources";

const LPFooterNavigation = () => {
  return (
    <div className={`${styles.lp_footer_outer_wrapper}  sec-p`}>
      <div className={`${styles.lp_footer_wrapper} sec-container`}>
        <div className={`${styles.shape_wrapper} ${styles.shape_1}`}>
          <Image src={ftrshape1} alt="VetandTech" />
        </div>
        <div className={`${styles.shape_wrapper} ${styles.shape_2}`}>
          <Image src={ftrshape2} alt="VetandTech" />
        </div>
        <div className={`${styles.shape_wrapper} ${styles.shape_3}`}>
          <Image src={ftrmap} alt="VetandTech" />
        </div>
        <LpFindUs />
        <LPBuyWithConfidence />
        <LPVetResources />
        <LPBusinessDetail />
      </div>
    </div>
  );
};

export default LPFooterNavigation;

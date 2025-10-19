import Image from "next/image";
import React from "react";
import styles from "./GrowBusiness.module.css";
import bgImg from "/public/imgs/sell-on-vetandtech/grow-business/bg-img.png";
const GrowBusiness = ({ growBusinessSection }) => {
  return (
    <section
      ref={growBusinessSection}
      className="grow-business sec-p"
    >
      <Image layout="fill" src={bgImg} alt="Grow Your Business" />

      <div className="sec-container">
        <div className={`${styles.heading_wrapper} heading_wrapper`}>
          <h2 className="white-color">Ready To Grow Your Business</h2>
          <p className={styles.info}>
            Please fill up the following form to get started!
          </p>
        </div>
      </div>
    </section>
  );
};

export default GrowBusiness;

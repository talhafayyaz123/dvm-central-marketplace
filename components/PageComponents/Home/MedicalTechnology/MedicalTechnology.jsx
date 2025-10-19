import Image from "next/image";
import React from "react";
import styles from "./MedicalTechnology.module.css";
import MedicalImg from "../../../../public/imgs/service-provider.png";
import bgImg from "../../../../public/imgs/service-provider-background.png";
import Link from "next/link";

const MedicalTechnology = () => {
  return (
    <section className="inner-sec-p">
      <Image layout="fill" src={bgImg} alt="Service Provider" />

      <div className={`${styles.medical_technology} sec-container`}>
        <div className={styles.heading_wrapper}>
          <h2>Explore Veterinary Service Providers Organized For Your Easy Search!</h2>
          <h5>We are bringing all of the service providers together in one place to provide you with the best options.</h5>
          <Link href="/service-providers">
            <a className={styles.btn}>
              <button className="primary-btn white-color">
                <span>Service Providers</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="11.341" height="18.092" viewBox="0 0 11.341 18.092">
                  <path id="Op_component_1" data-name="Op component 1" d="M378.154,808.1h0l9.181-9.046-9.181-9.046L376,792.139l7.026,6.923L376,805.986l2.158,2.117Z" transform="translate(-375.996 -790.011)" fill="var(--white)" />
                </svg>
              </button>
            </a>
          </Link>
        </div>
        <div className={styles.right_img_wrapper}>
          <Image width={571} height={439} src={MedicalImg} alt="Service Provider" />
        </div>
      </div>
    </section>
  );
};

export default MedicalTechnology;

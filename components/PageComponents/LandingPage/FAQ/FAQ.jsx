import React from "react";
import HeadingBoxes from "../HeadingBoxes/HeadingBoxes";
import styles from "./FAQ.module.css";
import faqdata from "./faqdata";
import traiangleImg from "../../../../public/landing-page/shape/triangle.webp";
import waveImg from "../../../../public/landing-page/shape/bottom-wave.webp";
import leftCircleImg from "../../../../public/landing-page/shape/left-circle.webp";
import rightCircleImg from "../../../../public/landing-page/shape/right-circle.webp";
import redCircleImg from "../../../../public/landing-page/shape/red-circle.webp";
import dotCircleImg from "../../../../public/landing-page/shape/dot-circle.webp";
import circleLineImg from "../../../../public/landing-page/shape/circle-line.webp";
import Image from "next/image";
import Accordion from "../../../UI/Accordion/Accordion";
import Link from "next/link";
import { useRouter } from "next/router";

const FAQ = () => {
  const router = useRouter();
  return (
    <section
      id="faq"
      className={`${styles.faq_container} ${
        router?.pathname === "/faqs" || router?.pathname === "/"
          ? "sec-p"
          : styles.dashboard_faqs
      }`}
    >
      {(router?.pathname === "/faqs" || router?.pathname === "/") && (
        <>
          <div className={styles.line_circle}>
            <Image src={circleLineImg} alt="DVM Central" />
          </div>
          <div className={styles.dot_circle}>
            <Image src={dotCircleImg} alt="DVM Central" />
          </div>
          <div className={styles.red_circle}>
            <Image src={redCircleImg} alt="DVM Central" />
          </div>
          <div className={styles.left_circle}>
            <Image src={leftCircleImg} alt="DVM Central" />
          </div>
          <div className={styles.wave}>
            <Image src={waveImg} alt="DVM Central" />
          </div>
          <div className={styles.right_circle}>
            <Image src={rightCircleImg} alt="DVM Central" />
          </div>
        </>
      )}
      <div className="sec-container">
        {/* triangle img */}
        {(router?.pathname === "/faqs" || router?.pathname === "/") && (
          <>
            <div className={styles.traiangles_wrapper}>
              <div className={`${styles.img_wrapper} ${styles.triangle}`}>
                <Image src={traiangleImg} alt="DVM Central" />
              </div>
              <div className={`${styles.img_wrapper} ${styles.triangle}`}>
                <Image src={traiangleImg} alt="DVM Central" />
              </div>
              <div className={`${styles.img_wrapper} ${styles.triangle}`}>
                <Image src={traiangleImg} alt="DVM Central" />
              </div>
            </div>
            <div className={`${styles.heading_container} lp-heading-container`}>
              <h4 className="lp-sml-heading">
                <HeadingBoxes />
                Frequently Asked Questions
              </h4>
              <h2 className="lp-heading-wrapper">
                Got a Question? <span>We Are Here to Answer!</span>
              </h2>
            </div>
          </>
        )}

        <div className={`${styles.faqs_wrapper} ${styles.faqs_wrapper_width}`} >
          {faqdata
            .slice(
              0,
              router.pathname === "/" || router.pathname === "/mobile"
                ? 5
                : faqdata.length - 1
            )
            .map((faq, index) => {
              return (
                <Accordion key={index} index={index} question={faq.question} router={router}>
                  <p className={styles.answer}>{faq.answer} </p>
                </Accordion>
              );
            })}
          {router.pathname === "/" && (
            <Link href="/faqs">
              <a className={styles.all_faq_btn}>
                <button className="lp-btn">View All</button>
              </a>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

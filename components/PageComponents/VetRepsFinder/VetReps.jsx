import React from 'react';
import styles from './VetHeading.module.css';
import Link from 'next/link';

const VetHeading = ({ heading, span1, span2, para, btnLink, btnText, type, heading2, externalLink }) => {
  return (
    <div className={styles.wrapper}>
      {type === 'hero' ? (
        <h1 className={styles.heading}>
          {span1} <span className="primary-color"> {heading}</span> {span2 && span2}
        </h1>
      ) : (
        <h2 className={styles.heading}>
          {span1} <span className="primary-color"> {heading}</span> {span2 && span2}
        </h2>
      )}
      {type === 'jobs' && <p className="primary-color">{heading2}</p>}
      <p className={`new-gray-color ${styles.para}`}>{para}</p>
      {btnText &&
        (externalLink ? (
          <a className={styles.btn} href={btnLink} target="_blank" rel="noreferrer">
            <button className="white-color primary-btn shadow">{btnText}</button>
          </a>
        ) : (
          <Link href={btnLink}>
            <a className={styles.btn}>
              <button className="white-color primary-btn shadow">{btnText}</button>
            </a>
          </Link>
        ))}
    </div>
  );
};

export default VetHeading;
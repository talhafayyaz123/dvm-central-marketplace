import Image from 'next/image'
import React, { useState } from 'react'
import styles from './LandingPageNavbar.module.css'
import lplogo from '../../../../public/imgs/logo/dvm-central.png';//'../../../../public/icons/lp-logo.svg'

const LandingPageNavbar = () => {
	const [showNavbar, setShowNavbar] = useState(false)
	return (
    <div className={`${styles.nav_container}`}>
      <div className={`${styles.nav_wrapper} sec-container`}>
        <a href="#lp-hero" className={styles.logo_wrapper}>
          <Image priority src={lplogo} alt="DVM Central" />
        </a>

        <nav className={`${styles.nav} ${showNavbar && "show-bd"} `}>
          <ul className={`${showNavbar && "show-sidebar"}`}>
            <li
              className={styles.nav_close_btn}
              onClick={() => setShowNavbar(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="var(--red)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </li>
            <li className={styles.nav_logo}>
              <div className={styles.logo_wrapper}>
                <Image src={lplogo} alt="DVM Central" />
              </div>
            </li>
            <li className={styles.nav_links}>
              <a href="#lp-hero">{`Vet & Tech`}</a>
            </li>
            <li className={styles.nav_links}>
              <a href="#vet-resources">Vet Resources</a>
            </li>
            <li className={styles.nav_links}>
              <a href="#speakers">Webinar Speakers</a>
            </li>
            <li className={styles.nav_links}>
              <a href="#seller-portal">Seller Portal</a>
            </li>
            <li className={styles.nav_links}>
              <a href="#buy-direct">Buy Direct</a>
            </li>
            <li className={styles.nav_links}>
              <a href="#faq">FAQs</a>
            </li>
            <li className={styles.nav_links}>
              <button>Sign In</button>
            </li>
          </ul>
        </nav>

        <div
          className={styles.nav_open_btn}
          onClick={() => setShowNavbar(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="var(--white)"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default LandingPageNavbar

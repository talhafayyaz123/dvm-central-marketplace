import React from "react";
import Link from "next/link";
import stripeLogo from "../../../../../../public/icons/stripe-logo.svg";
import styles from "./LpBusinessDetail.module.css";
import Image from "next/image";

const LPBusinessDetail = () => {
  return (
    <div className="footer-business-details black-color">
      <h4>Business</h4>
      <ul>
        <li>
          <Link href="/shop">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--gray-icon)">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              Shop
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--gray-icon)">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              Vendors
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--gray-icon)">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              Checkout
            </a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--gray-icon)">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              Login Register
            </a>
          </Link>
        </li>
        {/* <li>
					<div className={styles.stripe_logo_wrapper}>
						<Image src={stripeLogo} layout='intrinsic' alt='secure-payments' />
					</div>
				</li> */}
      </ul>
    </div>
  );
};

export default LPBusinessDetail;

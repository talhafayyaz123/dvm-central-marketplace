import React from 'react'
import Image from 'next/image'
import styles from './LPNewsletter.module.css'
import singupImg from '../../../../../public/landing-page/signup.png'
import shape1 from '../../../../../public/landing-page/shape/n-shape1.webp'
import shape2 from '../../../../../public/landing-page/shape/n-shape2.webp'
import shape3 from '../../../../../public/landing-page/shape/shape-3.webp'

const Newsletter = () => {
	return (
		<section className={styles.signup}>
			<div className={`${styles.signup_outer_container}`}>
				<div className='sec-container'>
					<div className={`${styles.signup_container}  sec-p`}>
						<div className={`${styles.shape_wrapper} ${styles.shape_1}`}>
							<Image src={shape1} alt='singup' />
						</div>

						<div className={styles.inner_container}>
							<div className={`${styles.signup_wrapper}`}>
								<h3 className='lp-heading-wrapper'>
									Sign Up For Our <span>Newsletter</span>
								</h3>
								<div className={styles.input_wrapper}>
									<input type='email' placeholder='Enter your email address' />
									<button className='lp-btn'>Subscribe Now</button>
								</div>
								<p>{`Get Updates On Latest Trends, Webinars, Education Resources, Conference & New Products.`}</p>
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.shape_wrapper} ${styles.shape_2}`}>
					<Image src={shape2} alt='singup' />
				</div>
				<div className={`${styles.shape_wrapper} ${styles.shape_3}`}>
					<Image src={shape3} alt='singup' />
				</div>
			</div>
			<div className={styles.signup_img_wrapper}>
				<Image src={singupImg} alt='Subscribe Now' />
			</div>
		</section>
	)
}

export default Newsletter

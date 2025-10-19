import Image from 'next/image'
import React from 'react'
import styles from './Steps.module.css'
import downArrowIcon from '/public/imgs/sell-on-vetandtech/step-icon/down-arrow.svg'
import rightArrowIcon from '/public/imgs/sell-on-vetandtech/step-icon/right-arrow.svg'
import sellIcon from '/public/imgs/sell-on-vetandtech/step-icon/selling.svg'
import verifyIcon from '/public/imgs/sell-on-vetandtech/step-icon/verification.svg'
import formIcon from '/public/imgs/sell-on-vetandtech/step-icon/form.svg'
import mobRightArrow from '/public/imgs/sell-on-vetandtech/step-icon/mob-arrow.svg'
import H2WithBorder from '../../../UI/H2WithBorder/H2WithBorder'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'

const Steps = ({ scrollToSellerFormHandler }) => {
	return (
		<section className={`${styles.steps} sec-p`}>
			<div className='sec-container'>
				<div className='steps-container'>
					<div className={`${styles.heading_wrapper} heading_wrapper`}>
						<H2WithBorder text='Our Three Easy Steps' />
					</div>
					<div className={`${styles.steps_wrapper} sec-mt`}>
						<div className={styles.step_card}>
							<div className={styles.icon_wrapper}>
								<ImgWithLoader height="130px" width='127px'  src={formIcon} alt='Fill In The Form' />
							</div>
							<div className={`${styles.detail} ${styles.show_mob}`}>
								<div className={styles.down_arrow}>
									<Image  src={downArrowIcon} alt='VetandTech' />
								</div>
								<div className={styles.step_title}>Fill In The Form</div>
							</div>
						</div>

						<div className={styles.right_arrow}>
							<div className={styles.desk_arrow}>
								<Image src={rightArrowIcon} alt='Right Arrow' />
							</div>
							<div className={styles.mob_arrow}>
								<Image src={mobRightArrow} alt='Down Arrow' />
							</div>
						</div>

						<div className={styles.step_card}>
							<div className={styles.icon_wrapper}>
								<ImgWithLoader height="130px" width='127px' src={verifyIcon} alt='Verification Process' />
							</div>
							<div className={`${styles.detail} ${styles.show_mob}`}>
								<div className={styles.down_arrow}>
									<Image src={downArrowIcon} alt='VetandTech' />
								</div>
								<div className={styles.step_title}>Verification Process</div>
							</div>
						</div>

						<div className={styles.right_arrow}>
							<div className={styles.desk_arrow}>
								<Image src={rightArrowIcon} alt='Right Arrow' />
							</div>
							<div className={styles.mob_arrow}>
								<Image src={mobRightArrow} alt='Right Arrow' />
							</div>
						</div>

						<div className={styles.step_card}>
							<div className={styles.icon_wrapper}>
								<ImgWithLoader height="130px" width='127px' src={sellIcon} alt='Start Selling' />
							</div>

							<div className={`${styles.detail} ${styles.show_mob}`}>
								<div className={styles.down_arrow}>
									<Image src={downArrowIcon} alt='VetandTech' />
								</div>
								<div className={styles.step_title}>Start Selling</div>
							</div>
						</div>

						<div className={`${styles.detail} ${styles.show_desk}`}>
							<div className={styles.down_arrow}>
								<Image src={downArrowIcon} alt='VetandTech' />
							</div>
							<div className={styles.step_title}>Fill In The Form</div>
						</div>
						<div />

						<div className={`${styles.detail} ${styles.show_desk}`}>
							<div className={styles.down_arrow}>
								<Image src={downArrowIcon} alt='VetandTech' />
							</div>
							<div className={styles.step_title}>Verification Process</div>
						</div>
						<div />

						<div className={`${styles.detail} ${styles.show_desk}`}>
							<div className={styles.down_arrow}>
								<Image src={downArrowIcon} alt='VetandTech' />
							</div>
							<div className={styles.step_title}>Start Selling</div>
						</div>
					</div>

					<div className={styles.btn_wrapper}>
						<button className={`${styles.get_start_button} primary-btn`} onClick={() => scrollToSellerFormHandler()}>
							Get Started
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Steps

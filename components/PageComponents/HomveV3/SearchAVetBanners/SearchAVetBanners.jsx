import React from 'react'
import styles from './SearchAVetBanners.module.css'
import Hero from '/public/imgs/home/sav-hero.png'
import Frame from '/public/imgs/home/sav-lab.png'
import Meeting from '/public/imgs/home/sav-meeting.png'
import Image from 'next/image'

const SearchAVetBanners = () => {
	return (
		<section className='sec-container'>
			<div className={`sec-m ${styles.banner_wrapper}`}>
				{/* <a href='https://searchavet.com' target='_blank' rel='noreferrer' className={`radius ${styles.first_banner}`}> */}
				<div className={`radius ${styles.first_banner}`}>
					<Image src={Hero} alt='search a vet' />
				</div>
				{/* </a> */}
				<div className={`${styles.sec_banner}`}>
					{/* <a href='https://searchavet.com/veterinarians/our-vets' rel='noreferrer' target='_blank'> */}
					<div className={`radius ${styles.sec_first_banner} gradient-sec`}>
						<div className={styles.info}>
							<h5 className='white-color'>Making Pet Wellness Easy, Accessible, and Reliable</h5>

							{/* <button className='white-btn sml-btn primary-color'>
								Get Appointment{' '}
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
									<path fillRule='evenodd' d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z' clipRule='evenodd' />
								</svg>
							</button> */}
						</div>
						<div className={styles.image_wrapper}>
							<Image src={Frame} width={427} height={395} alt='appoitments' />
						</div>
					</div>
					{/* </a> */}

					{/* <a href='https://searchavet.com/veterinarians/specialist' target='_blank' rel='noreferrer' style={{ alignSelf: 'flex-end' }}> */}
					<div style={{ alignSelf: 'flex-end' }}>
						<div className={`radius ${styles.sec_sec_banner}`}>
							<Image src={Meeting} className='radius' width={1510} height={895} alt='meet' />
							<div className={`radius ${styles.graident}`}>
								<h5 className={'white-color'}>Meet our Specialist for better consulting</h5>
							</div>
						</div>
					</div>
					{/* </a> */}
				</div>
			</div>
		</section>
	)
}

export default SearchAVetBanners

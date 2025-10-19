import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './PromotionBanners.module.css'
import img1 from '/public/imgs/promotion-banners/1.png'
import img2 from '/public/imgs/promotion-banners/2.png'
import img3 from '/public/imgs/promotion-banners/3.png'

const PromotionBanners = () => {
	return (
		<section className='promotion-banners inner-sec-p'>
			<div className='sec-container'>
				<div className={styles.banners_wrapper}>
					<Link href='#'>
						<a className={`${styles.banner_wrapper}`} style={{ backgroundColor: '#f5ede7' }}>
							<div className={styles.text_wrapper}>
								<div>HOME MEDICAL</div>
								<h4 className={styles.heading}>First AID 30% Off</h4>
								<button>
									<span> View Collection </span>
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='#000' className='ml-1 w-3 h-3'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
									</svg>
								</button>
							</div>
							<div className={styles.banner}>
								<Image src={img1} alt='First AID 30% Off' />
							</div>
						</a>
					</Link>

					<Link href='#'>
						<a className={`${styles.banner_wrapper}`} style={{ backgroundColor: '#e4f0ee' }}>
							<div className={styles.text_wrapper}>
								<div>HOSPITAL EQUIPMENT</div>
								<h4 className={styles.heading}>Medical Ventilator</h4>
								<button>
									<span> View Collection </span>
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='#000' className='ml-1 w-3 h-3'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
									</svg>
								</button>
							</div>
							<div className={styles.banner}>
								<Image src={img2} alt='Medical Ventilator' />
							</div>
						</a>
					</Link>

					<Link href='#'>
						<a className={`${styles.banner_wrapper}`} style={{ backgroundColor: '#e7f1f9' }}>
							<div className={styles.text_wrapper}>
								<div>CYBER MONDAY</div>
								<h4 className={styles.heading}>{`Big Sale 40% Off`}</h4>
								<button>
									<span> View Collection </span>
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='#000' className='ml-1 w-3 h-3'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
									</svg>
								</button>
							</div>
							<div className={styles.banner}>
								<Image src={img3} alt={`Big Sale 40% Off`} />
							</div>
						</a>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default PromotionBanners

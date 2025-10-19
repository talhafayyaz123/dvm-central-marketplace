import React from 'react'
import styles from './Testimonials.module.css'
import TestmonialCard from '../../../UI/TestmonialCard/TestmonialCard'
import { SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Navigation } from 'swiper'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import SwiperSlideComponent from '../../../UI/SwiperSlideComponent/SwiperSlideComponent'

const Testimonials = ({ testinmonials }) => {
	return (
		testinmonials?.length > 0 && (
			<section className={`${styles.testimonials} sec-mb`}>
				<div className='sec-container'>
					<h2>Testimonials</h2>
					<SwiperSlideComponent
						modules={[FreeMode, Autoplay, Navigation]}
						spaceBetween={5}
						speed={1500}
						slidesPerView={'auto'}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false
						}}
						centeredSlides={true}
						initialSlide='0'
						loop={true}
						navigation={{
							prevEl: '.testimonial-button-prev',
							nextEl: '.testimonial-button-next'
						}}
						className={`inner-sec-pt`}
					>
						{testinmonials?.map((data) => {
							return (
								<SwiperSlide key={data.id} className={`${styles.slide} testimonial-slide transition`}>
									<TestmonialCard data={data} className={`${styles.testimonial_card} testimonial-card transition`} />
								</SwiperSlide>
							)
						})}

						<div className={styles.swiper_btn_wrapper}>
							<svg xmlns='http://www.w3.org/2000/svg' className='transition testimonial-button-prev' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
							</svg>
							<svg xmlns='http://www.w3.org/2000/svg' className='transition testimonial-button-next' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
							</svg>
						</div>
					</SwiperSlideComponent>
				</div>
			</section>
		)
	)
}

export default Testimonials

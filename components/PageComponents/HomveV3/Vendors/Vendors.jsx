import React, { useRef } from 'react'
import styles from './Vendors.module.css'
import { touchEndHandler, touchStartHandler } from '../../../../utils/SliderTouchEvents'
import SwiperSlideComponent from '../../../UI/SwiperSlideComponent/SwiperSlideComponent'
import { SwiperSlide } from 'swiper/react'
import NewVendorsCard from '../../../UI/NewVendorsCard/NewVendorsCard'
import { Autoplay, FreeMode, Navigation } from 'swiper'
import HeadingWithBtn from '../../../UI/HeadingWithBtn/HeadingWithBtn'

const Newvedors = ({ vendors }) => {
	const vendorsRef = useRef(null)
	return (
		vendors?.length > 0 && (
			<section className={`${styles.vendors_container} sec-m`}>
				<div className='sec-container'>
					<HeadingWithBtn firstSeperator={true} colorHeading='Visit' blackHeading={`Your Preferred Vendors'`} BHLastWord={`Shops!`} svgAfterBH={true} btnText='View All' href='/vendors' />
					<div ref={vendorsRef}>
						<SwiperSlideComponent
							modules={[FreeMode, Autoplay, Navigation]}
							slidesPerView={1}
							spaceBetween={10}
							freeMode={true}
							onTouchStart={() => touchStartHandler(vendorsRef?.current)}
							onTouchMove={() => touchStartHandler(vendorsRef?.current)}
							onTouchEnd={() => touchEndHandler(vendorsRef?.current)}
							speed={1500}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false
							}}
							navigation={{
								prevEl: '.vendors-button-prev',
								nextEl: '.vendors-button-next'
							}}
							breakpoints={{
								481: {
									slidesPerView: 2,
									spaceBetween: 10
								},
								769: {
									slidesPerView: 3,
									spaceBetween: 20
								},
								1251: {
									slidesPerView: 4,
									spaceBetween: 30
								}
							}}
							className={`${styles.slides_wrapper} slide_wrapper inner-sec-pt`}
						>
							{vendors?.map((vendor) => {
								return (
									<SwiperSlide key={vendor?.id} className={`${styles.slide} transition radius`}>
										<NewVendorsCard vendors={vendor} />
									</SwiperSlide>
								)
							})}
							<div className={styles.swiper_btn_wrapper}>
								<div>
									<svg xmlns='http://www.w3.org/2000/svg' className='transition vendors-button-prev' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
									</svg>
									<svg xmlns='http://www.w3.org/2000/svg' className='transition vendors-button-next' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
									</svg>
								</div>
							</div>
						</SwiperSlideComponent>
					</div>
				</div>
			</section>
		)
	)
}

export default Newvedors

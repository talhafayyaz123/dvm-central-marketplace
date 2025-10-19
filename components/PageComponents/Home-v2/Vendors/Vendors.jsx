import React, { useRef } from 'react'
import styles from './Vendors.module.css'

import { SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Navigation } from 'swiper'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import SwiperSlideComponent from '../../../UI/SwiperSlideComponent/SwiperSlideComponent'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import { imgApiUrl } from '../../../../utils/config'
import Link from 'next/link'
import { touchEndHandler, touchStartHandler } from '../../../../utils/SliderTouchEvents'

const Vendors = ({ vendors }) => {
	const vendoSliderRef = useRef(null)
	return (
		vendors?.length > 0 && (
			<section className={`${styles.vendors_container} sec-m`}>
				<div className='sec-container'>
					<h2>Top Vendors</h2>

					<div ref={vendoSliderRef}>
						<SwiperSlideComponent
							modules={[FreeMode, Autoplay, Navigation]}
							slidesPerView={2}
							spaceBetween={20}
							freeMode={true}
							onTouchStart={() => touchStartHandler(vendoSliderRef?.current)}
							onTouchMove={() => touchStartHandler(vendoSliderRef?.current)}
							onTouchEnd={() => touchEndHandler(vendoSliderRef?.current)}
							speed={1500}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false
							}}
							navigation={{
								prevEl: '.deals-button-prev',
								nextEl: '.deals-button-next'
							}}
							breakpoints={{
								481: {
									slidesPerView: 3,
									spaceBetween: 10
								},
								768: {
									slidesPerView: 4,
									spaceBetween: 10
								},
								1024: {
									slidesPerView: 5,
									spaceBetween: 20
								},
								1251: {
									slidesPerView: 7,
									spaceBetween: 30
								}
							}}
							className={`mySwiper inner-sec-pt`}
						>
							{vendors?.map((vendor) => {
								return (
									vendor?.logo !== null && (
										<SwiperSlide key={vendor.id} className={`${styles.slide} transition sml-shadow radius`}>
											<Link href={`/vendors/${vendor?.slug}`}>
												<a className={styles.vendor}>
													<ImgWithLoader className={styles.img} width={100} height={100} src={`${imgApiUrl.vendor.logo}/${vendor?.logo}`} alt={vendor?.name} />
												</a>
											</Link>
										</SwiperSlide>
									)
								)
							})}
							<div className={styles.swiper_btn_wrapper}>
								<div className={styles.inner_wrapper}>
									<div>
										<Link href={'/vendors'}>
											<a>
												<button className='primary-btn white-color'>View More</button>
											</a>
										</Link>
									</div>
									<div>
										<svg xmlns='http://www.w3.org/2000/svg' className='transition deals-button-prev' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
										</svg>
										<svg xmlns='http://www.w3.org/2000/svg' className='transition deals-button-next' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
										</svg>
									</div>
								</div>
							</div>
						</SwiperSlideComponent>
					</div>
				</div>
			</section>
		)
	)
}

export default Vendors

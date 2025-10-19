import React from 'react'
import styles from './Hero.module.css'
import { SwiperSlide } from 'swiper/react'
import slide1Img from '../../../../public/imgs/hero-slider/slide-1-img.png'
import slide2Img from '../../../../public/imgs/hero-slider/slide-2-img.png'
import slide3Img from '../../../../public/imgs/hero-slider/slide-3-img.png'
import slide5Img from '../../../../public/imgs/hero-slider/slide-5-img.png'

// Import Swiper styles

import 'swiper/css/navigation'

import { Navigation, Autoplay } from 'swiper'
import Slide from './Slides/Slide'
import Wave from '../../../UI/Wave/Wave'
import SwiperSlideComponent from '../../../UI/SwiperSlideComponent/SwiperSlideComponent'

const Hero = () => {
	return (
		<section className={`${styles.hero_slider_container} gradient-sec`}>
			<Wave />
			<div className='sec-container inner-sec-mb'>
				<SwiperSlideComponent
					slidesPerView={1}
					spaceBetween={100}
					speed={1500}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false
					}}
					modules={[Navigation, Autoplay]}
					navigation={{
						prevEl: '.swiper-button-prev',
						nextEl: '.swiper-button-next'
					}}
					className={`${styles.swiper_container} inner-sec-p`}
				>
					<SwiperSlide>
						<Slide heading='Get Everything Delivered To Your Door!' info="Purchase Online Whether It's Veterinary Medications Or Supplements." removeButton={true} href='' src={slide1Img} priority />
					</SwiperSlide>
					<SwiperSlide>
						<Slide heading='Conveniently Shop For Surgical Supplies' info='Explore, Compare, And Buy The Best Scissors For Your Surgical Set.' removeButton={true} href='' src={slide5Img} priority />
					</SwiperSlide>
					<SwiperSlide>
						<Slide heading='Sign Up As Seller Today!' info='Join Our Seller Central Portal to Sell Your Veterinary Products.' href='/sell-on-dvm' removeButton={false} src={slide2Img}>
							<ul>
								<li>
									<svg xmlns='http://www.w3.org/2000/svg' width='25.297' height='19.678' viewBox='0 0 25.297 19.678'>
										<path
											id='Path_8508'
											data-name='Path 8508'
											d='M572.883,199.118c.147-.173.219-.271.3-.357q5.955-5.971,11.913-11.939a1.915,1.915,0,0,1,2.314-.465,2.6,2.6,0,0,1,.559.406c.268.244.518.509.773.768a1.946,1.946,0,0,1,0,2.946q-1.835,1.847-3.678,3.687-5.571,5.583-11.14,11.169a1.309,1.309,0,0,1-1.446.414,1.531,1.531,0,0,1-.548-.359q-3.591-3.582-7.167-7.178a1.935,1.935,0,0,1,0-2.88c.269-.274.538-.547.813-.814a1.919,1.919,0,0,1,2.81.01q2.135,2.125,4.256,4.265A3.024,3.024,0,0,1,572.883,199.118Z'
											transform='translate(-564.126 -186.148)'
											fill='#65d94f'
										/>
									</svg>
									<span>Boost Your Business Sales</span>
								</li>

								<li>
									<svg xmlns='http://www.w3.org/2000/svg' width='25.297' height='19.678' viewBox='0 0 25.297 19.678'>
										<path
											id='Path_8508'
											data-name='Path 8508'
											d='M572.883,199.118c.147-.173.219-.271.3-.357q5.955-5.971,11.913-11.939a1.915,1.915,0,0,1,2.314-.465,2.6,2.6,0,0,1,.559.406c.268.244.518.509.773.768a1.946,1.946,0,0,1,0,2.946q-1.835,1.847-3.678,3.687-5.571,5.583-11.14,11.169a1.309,1.309,0,0,1-1.446.414,1.531,1.531,0,0,1-.548-.359q-3.591-3.582-7.167-7.178a1.935,1.935,0,0,1,0-2.88c.269-.274.538-.547.813-.814a1.919,1.919,0,0,1,2.81.01q2.135,2.125,4.256,4.265A3.024,3.024,0,0,1,572.883,199.118Z'
											transform='translate(-564.126 -186.148)'
											fill='#65d94f'
										/>
									</svg>
									<span>Reach More Customers</span>
								</li>

								<li>
									<svg xmlns='http://www.w3.org/2000/svg' width='25.297' height='19.678' viewBox='0 0 25.297 19.678'>
										<path
											id='Path_8508'
											data-name='Path 8508'
											d='M572.883,199.118c.147-.173.219-.271.3-.357q5.955-5.971,11.913-11.939a1.915,1.915,0,0,1,2.314-.465,2.6,2.6,0,0,1,.559.406c.268.244.518.509.773.768a1.946,1.946,0,0,1,0,2.946q-1.835,1.847-3.678,3.687-5.571,5.583-11.14,11.169a1.309,1.309,0,0,1-1.446.414,1.531,1.531,0,0,1-.548-.359q-3.591-3.582-7.167-7.178a1.935,1.935,0,0,1,0-2.88c.269-.274.538-.547.813-.814a1.919,1.919,0,0,1,2.81.01q2.135,2.125,4.256,4.265A3.024,3.024,0,0,1,572.883,199.118Z'
											transform='translate(-564.126 -186.148)'
											fill='#65d94f'
										/>
									</svg>
									<span>Sell Directly</span>
								</li>
							</ul>
						</Slide>
					</SwiperSlide>
					{/* <SwiperSlide>
						<Slide heading='Discover New Ways Of Learning!' info='Learn and Grow Professionally with comprehensive Vet Resources. Get access to CE Courses, Virtual Expo, Educational Programs 	&#38; Much More.' href='#' src={slide3Img} />
					</SwiperSlide> */}
					<div className={styles.swiper_btn_wrapper}>
						<svg xmlns='http://www.w3.org/2000/svg' className='transition swiper-button-prev' fill='none' viewBox='0 0 24 24' stroke='#262626'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
						</svg>
						<svg xmlns='http://www.w3.org/2000/svg' className='transition swiper-button-next' fill='none' viewBox='0 0 24 24' stroke='#262626'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
						</svg>
					</div>
				</SwiperSlideComponent>
			</div>
		</section>
	)
}

export default Hero

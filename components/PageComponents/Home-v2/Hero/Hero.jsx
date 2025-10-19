import React from 'react'
import styles from './Hero.module.css'
import { SwiperSlide } from 'swiper/react'
import slide1Img from '/public/imgs/hero-slider/new-slide-1.png'
import slide2Img from '/public/imgs/hero-slider/new-slide-2.png'
import slide3Img from '/public/imgs/hero-slider/slide-1-img.png'
import slide4Img from '/public/imgs/hero-slider/slide-2-img.png'
import slide5Img from '/public/imgs/hero-slider/slide-5-img.png'
import 'swiper/css/navigation'
import { Navigation, Autoplay } from 'swiper'
import Slide from './Slides/Slide'
import SwiperSlideComponent from '../../../UI/SwiperSlideComponent/SwiperSlideComponent'
import Image from 'next/image'
import bgImg from '/public/imgs/hero-slider/slider-bg.jpg'
import learnLunchImg from '/public/imgs/hero-slider/one.png'
// import webinarSlideImg from '/public/webinar-slide.png'

const Hero = () => {
	return (
		<section className={`${styles.hero_slider_container}`}>
			<Image priority layout='fill' src={bgImg} alt='DVM Central' />
			<div className='sec-container'>
				<SwiperSlideComponent
					autoHeight={true}
					slidesPerView={1}
					spaceBetween={100}
					speed={1500}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false
					}}
					// loop={true}
					modules={[Navigation, Autoplay]}
					navigation={{
						prevEl: '.swiper-button-prev',
						nextEl: '.swiper-button-next'
					}}
					className={`${styles.swiper_container} inner-sec-p`}
				>
					<SwiperSlide>
						<Slide headingType='h1' heading='Get Everything Delivered To Your Door!' info='Whether Medication or Supplements, Our Veterinary Supply Store Features Everything to Meet Your Needs' removeButton={true} width={625} height={613} priority src={slide3Img} />
					</SwiperSlide>

					<SwiperSlide>
						<Slide
							heading={`Lunchtime Learning, Tailored for You: DVM Central's Learn at Lunch`}
							info={`Engage with top manufacturers and elevate your practice through DVM Central's Learn at Lunch`}
							width={625}
							height={591}
							src={learnLunchImg}
							href={`/elevate-your-clinic's-knowledge-with-dvm-central's-learn-at-lunch`}
						/>
					</SwiperSlide>

					{/* <SwiperSlide>
						<Slide
							heading='DVM Central Marketplace Virtual Demonstration'
							info={`Learn, Connect, and Thrive at Our DVM Central Virtual Conference. Don't Miss it!.`}
							href='/dvm-central-marketplace-virtual-demonstration'
							removeButton={false}
							btnText='Register for Demonstration'
							width={625}
							height={591}]
						>
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
									<span>Innovation and Education</span>
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
									<span>Join to win exclusive products from vendors</span>
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
									<span>Unbeatable Discounts and Authenticity</span>
								</li>
							</ul>
						</Slide>
					</SwiperSlide> */}
					<SwiperSlide>
						<Slide heading='Conveniently Shop For Surgical Supplies' info='Explore, Compare, And Buy The Best Scissors For Your Surgical Set.' removeButton={true} width={625} height={591} src={slide4Img} />
					</SwiperSlide>
					<SwiperSlide>
						<Slide heading='Sign Up As Seller Today!' info='Join Our Seller Central Portal to Sell Your Veterinary Products.' href='/sell-on-dvm' removeButton={false} width={625} height={591} src={slide5Img}>
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

					<SwiperSlide>
						<Slide heading='Leading Marketplace for Veterinary Products' removeButton={true} width={625} height={591} src={slide2Img} />
					</SwiperSlide>
					<SwiperSlide>
						<Slide heading={`Your Furry Friend's Favorite Marketplace`} removeButton={true} width={625} height={591} src={slide1Img} />
					</SwiperSlide>

					<div className={styles.swiper_btn_wrapper}>
						<svg xmlns='http://www.w3.org/2000/svg' className='transition swiper-button-prev' fill='none' viewBox='0 0 24 24' stroke='var(--white'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
						</svg>
						<svg xmlns='http://www.w3.org/2000/svg' className='transition swiper-button-next' fill='none' viewBox='0 0 24 24' stroke='var(--white'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
						</svg>
					</div>
				</SwiperSlideComponent>
			</div>
		</section>
	)
}

export default Hero

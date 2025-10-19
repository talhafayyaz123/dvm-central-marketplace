import React from 'react'
import Image from 'next/image'
import rightWaveImg from '../../../../public/landing-page/shape/right-wave.webp'
import styles from './VetResources.module.css'
import HeadingBoxes from '../HeadingBoxes/HeadingBoxes'
import { SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Navigation } from 'swiper'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import ResourceCard from './ResourceCard/ResourceCard'
import resourcesData from './resources-data'
import SwiperSlideComponent from '../../../UI/SwiperSlideComponent/SwiperSlideComponent'

const VetResources = () => {
	return (
		<section id='vet-resources' className='vet-resources sec-p'>
			<div className={styles.img_wrapper}>
				<Image src={rightWaveImg} alt='VetandTech' />
			</div>
			<div className='sec-container'>
				<div className={`${styles.heading_container} lp-heading-container`}>
					<h4 className='lp-sml-heading'>
						<HeadingBoxes />
						Veterinary Resources
					</h4>
					<h2 className='lp-heading-wrapper'>
						Free Vet Tech Resources For <span>Everyone</span>
					</h2>
					<p className='gray-color  '>{`Get Free Access To Educational Programs, Webinars, Guides & CE Courses.`}</p>
				</div>
				<SwiperSlideComponent
					modules={[FreeMode, Autoplay, Navigation]}
					slidesPerView={1}
					spaceBetween={20}
					freeMode={true}
					speed={1500}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false
					}}
					navigation={{
						prevEl: '.resource-button-prev',
						nextEl: '.resource-button-next'
					}}
					breakpoints={{
						577: {
							slidesPerView: 2,
							spaceBetween: 10
						},
						921: {
							slidesPerView: 3,
							spaceBetween: 10
						},
						1251: {
							slidesPerView: 4,
							spaceBetween: 20
						}
					}}
					className={`${styles.resources_wrapper} inner-sec-pt`}
				>
					{resourcesData.map((data, index) => {
						return (
							<SwiperSlide key={index}>
								<ResourceCard src={data.img} title={data.title} info={data.info} href={data.href} />
							</SwiperSlide>
						)
					})}
					<div className={styles.swiper_btn_wrapper}>
						<svg xmlns='http://www.w3.org/2000/svg' className='transition resource-button-prev' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
						</svg>
						<svg xmlns='http://www.w3.org/2000/svg' className='transition resource-button-next' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
						</svg>
					</div>
				</SwiperSlideComponent>
			</div>
		</section>
	)
}

export default VetResources

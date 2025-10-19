import React, { useEffect } from 'react'

import { SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'

import 'swiper/css/pagination'

import styles from './Slider.module.css'
import Image from 'next/image'

import circleImg from '/public/landing-page/sell-on-vetntech/circle-img.webp'

import portalImg from '/public/landing-page/sell-on-vetntech/1-1.webp'
import boothImg from '/public/landing-page/sell-on-vetntech/2-1.webp'
import storeImg from '/public/landing-page/sell-on-vetntech/3-1.webp'
import SwiperSlideComponent from '../../../../UI/SwiperSlideComponent/SwiperSlideComponent'

const Slider = () => {
	return (
		<div className={styles.slider_container}>
			<div className={styles.circle_img_wrapper}>
				<Image src={circleImg} alt='VetandTech' />
			</div>
			<SwiperSlideComponent
				spaceBetween={10}
				slidesPerView={1}
				modules={[Autoplay]}
				speed={1500}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false
				}}
				className={`${styles.slide_imgs_wrapper} mySwiper`}
			>
				<SwiperSlide>
					<Image src={portalImg} alt='Seller Central Portal' />
				</SwiperSlide>
				<SwiperSlide>
					<Image src={boothImg} alt='3D Virtual Booth' />
				</SwiperSlide>
				<SwiperSlide>
					<Image src={storeImg} alt='Personalized Store Page' />
				</SwiperSlide>
			</SwiperSlideComponent>
		</div>
	)
}

export default Slider

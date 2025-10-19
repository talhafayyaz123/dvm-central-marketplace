import Image from 'next/image'
import React, { useEffect } from 'react'
import img1 from '/public/landing-page/buy-instruments/1.png'
import img2 from '/public/landing-page/buy-instruments/2.png'
import img3 from '/public/landing-page/buy-instruments/3.png'
import img4 from '/public/landing-page/buy-instruments/4.png'
import img5 from '/public/landing-page/buy-instruments/5.png'
import styles from './ImgsSlide.module.css'

import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ImgsSlide = () => {
	useEffect(() => {
		let gifTl = gsap.timeline({ paused: true })

		gifTl.fromTo(
			'.buy-direct-imgs-wrapper .img-wrapper',
			{
				autoAlpha: 0
			},
			{
				autoAlpha: 1,
				duration: 0.001,
				ease: 'none',
				repeat: -1,
				stagger: 0.75,
				repeatDelay: 0.75
			},
			[]
		)

		ScrollTrigger.create({
			animation: gifTl,
			trigger: '.buy-direct-imgs-wrapper',
			start: 'top bottom',
			end: 'bottom top',
			onEnter: () => gifTl.play(),
			onEnterBack: () => gifTl.resume(),
			onLeave: () => gifTl.pause(),
			onLeaveBack: () => gifTl.pause()
		})
	})
	return (
		<div className={`${styles.imgs_wrapper} buy-direct-imgs-wrapper`}>
			<div className={`${styles.img_wrapper} img-wrapper`}>
				<Image src={img1} alt='VetandTech' />
			</div>
			<div className={`${styles.img_wrapper} img-wrapper`}>
				<Image src={img2} alt='VetandTech' />
			</div>
			<div className={`${styles.img_wrapper} img-wrapper`}>
				<Image src={img3} alt='VetandTech' />
			</div>
			<div className={`${styles.img_wrapper} img-wrapper`}>
				<Image src={img4} alt='VetandTech' />
			</div>
			<div className={`${styles.img_wrapper} img-wrapper`}>
				<Image src={img5} alt='VetandTech' />
			</div>
		</div>
	)
}

export default ImgsSlide

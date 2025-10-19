import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Wave from '../../../UI/Wave/Wave'
import styles from './Hero.module.css'

import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// import 'splitting/dist/splitting.css'

import Image from 'next/image'

import marketImg from '/public/landing-page/hero-banners/marketplace.png'
import eduResImg from '/public/landing-page/hero-banners/edu-res.png'
import webinarImg from '/public/landing-page/hero-banners/webinar.png'
import courseImg from '/public/landing-page/hero-banners/courses.png'
import eduProgImg from '/public/landing-page/hero-banners/edu-pro.png'
import guideImg from '/public/landing-page/hero-banners/guides.png'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
	const [btnHref, setbtnHref] = useState('/shop')
	const heroComponent = useRef(null)

	const heroAnimaton = async () => {}

	useEffect(() => {
		let spanWrapper = document.querySelectorAll('.changing-text-wrapper')
		for (let i = 0; i < spanWrapper.length; i++) {
			spanWrapper[i].innerHTML = spanWrapper[i].textContent.replace(/\S/g, "<span class='char'>$&</span>")
		}

		// gsap.set('.changing-text-wrapper ,.img-wrapper:not(:first-of-type)', {
		// 	autoAlpha: 0
		// })

		// let btnShowDuration = 0.0000001,
		// 	heroBtn = document.querySelector('.shop-btn'),
		// 	heroBtnText = document.querySelector('.shop-btn span')

		// let heroTl = gsap.timeline({ paused: true, repeat: -1, delay: 1, defaults: { duration: 1, ease: 'linear' } })

		// heroTl

		// 	// .add(() => (heroBtn.href = '/shop'))
		// 	// .add(() => (heroBtnText.innerHTML = 'MarketPlace'), '<')
		// 	.set('.changing-text-wrapper', { autoAlpha: 1 })
		// 	.fromTo(
		// 		'.first-w .char',
		// 		{
		// 			autoAlpha: 0
		// 		},
		// 		{
		// 			autoAlpha: 1,
		// 			stagger: 0.05
		// 		},
		// 		'<'
		// 	)

		// 	.fromTo(
		// 		'.lp-hero-imgs-container .first-img',
		// 		{
		// 			autoAlpha: 0,
		// 			xPercent: 50
		// 		},
		// 		{
		// 			autoAlpha: 1,
		// 			xPercent: 0
		// 		},
		// 		'<'
		// 	)
		// 	.to('.first-w .char', {
		// 		autoAlpha: 0,
		// 		stagger: {
		// 			each: 0.05,
		// 			from: 'end'
		// 		}
		// 	})
		// 	.to(
		// 		'.lp-hero-imgs-container .first-img',
		// 		{
		// 			delay: 0.5,
		// 			autoAlpha: 0,
		// 			xPercent: 50
		// 		},
		// 		'<'
		// 	)

		// .add(() => (heroBtn.href = '/resources/educational-programs'))
		// .add(() => (heroBtnText.innerHTML = 'Resources'), '<')

		// .fromTo(
		// 	'.sec-w .char',
		// 	{
		// 		autoAlpha: 0
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		stagger: 0.05
		// 	}
		// )
		// .fromTo(
		// 	'.lp-hero-imgs-container .sec-img',
		// 	{
		// 		autoAlpha: 0,
		// 		xPercent: 50
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		xPercent: 0
		// 	},
		// 	'<'
		// )
		// .to('.sec-w .char', {
		// 	autoAlpha: 0,
		// 	stagger: {
		// 		each: 0.05,
		// 		from: 'end'
		// 	}
		// })
		// .to(
		// 	'.lp-hero-imgs-container .sec-img',
		// 	{
		// 		delay: 0.5,
		// 		autoAlpha: 0,
		// 		xPercent: 100,
		// 		duration: 1
		// 	},
		// 	'<'
		// )

		// .add(() => (heroBtn.href = '/speakers'))
		// .add(() => (heroBtnText.innerHTML = 'Webinars'), '<')
		// .fromTo(
		// 	'.third-w .char',
		// 	{
		// 		autoAlpha: 0
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		stagger: 0.05
		// 	},
		// 	'<'
		// )
		// .fromTo(
		// 	'.lp-hero-imgs-container .third-img',
		// 	{
		// 		autoAlpha: 0,
		// 		xPercent: 50
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		xPercent: 0
		// 	},
		// 	'<'
		// )
		// .to('.third-w .char', {
		// 	autoAlpha: 0,
		// 	stagger: {
		// 		each: 0.05,
		// 		from: 'end'
		// 	}
		// })
		// .to(
		// 	'.lp-hero-imgs-container .third-img',
		// 	{
		// 		delay: 0.5,
		// 		autoAlpha: 0,
		// 		xPercent: 100
		// 	},
		// 	'<'
		// )

		// .add(() => (heroBtn.href = '/courses/categories'))
		// .add(() => (heroBtnText.innerHTML = 'CE Courses'), '<')
		// .fromTo(
		// 	'.fourth-w .char',
		// 	{
		// 		autoAlpha: 0
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		stagger: 0.05
		// 	}
		// )
		// .fromTo(
		// 	'.lp-hero-imgs-container .fourth-img',
		// 	{
		// 		autoAlpha: 0,
		// 		xPercent: 50
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		xPercent: 0
		// 	},
		// 	'<'
		// )
		// .to('.fourth-w .char', {
		// 	autoAlpha: 0,
		// 	stagger: {
		// 		each: 0.05,
		// 		from: 'end'
		// 	}
		// })
		// .to(
		// 	'.lp-hero-imgs-container .fourth-img',
		// 	{
		// 		delay: 0.5,
		// 		autoAlpha: 0,
		// 		xPercent: 100
		// 	},
		// 	'<'
		// )

		// .add(() => (heroBtn.href = '/resources/educational-programs'))
		// .add(() => (heroBtnText.innerHTML = 'Education'), '<')
		// .fromTo(
		// 	'.fifth-w .char',
		// 	{
		// 		autoAlpha: 0
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		stagger: 0.05
		// 	}
		// )
		// .fromTo(
		// 	'.lp-hero-imgs-container .fifth-img',
		// 	{
		// 		autoAlpha: 0,
		// 		xPercent: 50
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		xPercent: 0
		// 	},
		// 	'<'
		// )
		// .to('.fifth-w .char', {
		// 	autoAlpha: 0,
		// 	stagger: {
		// 		each: 0.05,
		// 		from: 'end'
		// 	}
		// })
		// .to(
		// 	'.lp-hero-imgs-container .fifth-img',
		// 	{
		// 		delay: 0.5,
		// 		autoAlpha: 0,
		// 		xPercent: 100
		// 	},
		// 	'<'
		// )

		// .add(() => (heroBtn.href = '/resources/online-resources'))
		// .add(() => (heroBtnText.innerHTML = 'Guides'), '<')
		// .fromTo(
		// 	'.six-w .char',
		// 	{
		// 		autoAlpha: 0
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		stagger: 0.05
		// 	}
		// )
		// .fromTo(
		// 	'.lp-hero-imgs-container .six-img',
		// 	{
		// 		autoAlpha: 0,
		// 		xPercent: 50
		// 	},
		// 	{
		// 		autoAlpha: 1,
		// 		xPercent: 0
		// 	},
		// 	'<'
		// )
		// .to('.six-w .char', {
		// 	autoAlpha: 0,
		// 	stagger: {
		// 		each: 0.05,
		// 		from: 'end'
		// 	}
		// })
		// .to(
		// 	'.lp-hero-imgs-container .six-img',
		// 	{
		// 		autoAlpha: 0,
		// 		xPercent: 100,
		// 		duration: 1
		// 	},
		// 	'<'
		// )

		// ScrollTrigger.create({
		// 	animation: heroTl,
		// 	trigger: '.lp-hero',
		// 	start: 'top bottom',
		// 	end: 'bottom top',
		// 	onEnter: () => heroTl.play(),
		// 	onEnterBack: () => heroTl.resume(),
		// 	onLeave: () => heroTl.pause(),
		// 	onLeaveBack: () => heroTl.pause()
		// })
	}, [])

	return (
		<section id='lp-hero' className={`${styles.lp_hero} lp-hero sec-p`} ref={heroComponent}>
			<Wave />
			<div className='sec-container inner-sec-pb'>
				<div className={styles.lp_hero_wrapper}>
					<div className={styles.text_wrapper}>
						<h1 className='white-color'>
							Single Source For
							<span className={`${styles.changing_text_container} changing-text-container black-color`}>
								<span className={`${styles.changing_text_wrapper} changing-text-wrapper first-w`}>Marketplace</span>
								<span className={`${styles.changing_text_wrapper} changing-text-wrapper ${styles.relative} relative sec-w`}>Educational Resources</span>
								<span className={`${styles.changing_text_wrapper} changing-text-wrapper third-w`}>Webinars</span>
								<span className={`${styles.changing_text_wrapper} changing-text-wrapper fourth-w`}>CE Courses</span>
								<span className={`${styles.changing_text_wrapper} changing-text-wrapper fifth-w`}>Educational Programs</span>
								<span className={`${styles.changing_text_wrapper} changing-text-wrapper six-w`}>Guides</span>
							</span>
						</h1>

						<Link href={btnHref}>
							<a className={styles.shop_btn}>
								<button className='white-color'>
									Explore <span>MarketPlace</span>
								</button>
							</a>
						</Link>
					</div>

					<div className={`${styles.lp_hero_imgs_container} lp-hero-imgs-container`}>
						<div className={`${styles.img_wrapper} first-img`}>
							<Image priority blurDataURL={marketImg} src={marketImg} alt='MarketPlace' />
						</div>
						<div className={`${styles.img_wrapper} sec-img`}>
							<Image blurDataURL={eduResImg} src={eduResImg} alt='Educational Resources' />
						</div>
						<div className={`${styles.img_wrapper} third-img`}>
							<Image blurDataURL={webinarImg} src={webinarImg} alt='Webinars' />
						</div>
						<div className={`${styles.img_wrapper} fourth-img`}>
							<Image blurDataURL={courseImg} src={courseImg} alt='CE Courses' />
						</div>
						<div className={`${styles.img_wrapper} fifth-img`}>
							<Image blurDataURL={eduProgImg} src={eduProgImg} alt='Educational Programs' />
						</div>
						<div className={`${styles.img_wrapper} six-img`}>
							<Image blurDataURL={guideImg} src={guideImg} alt='Guides' />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero

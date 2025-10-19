import React, { useEffect } from 'react'
import styles from './ServerErrorPage.module.css'
import errorImg from '/public/imgs/server-error.png'
import Image from 'next/image'
import { gsap } from 'gsap/dist/gsap'

const ServerErrorPage = () => {
	console.log("500 error");
	const animation = async () => {
		let errorTl = gsap.timeline()

		errorTl
			.set('.error-wrapper', {
				autoAlpha: 1,
				delay: 0.5
			})

			.fromTo(
				'.img-wrapper',
				{
					y: 75,
					autoAlpha: 0
				},
				{
					y: 0,
					autoAlpha: 1,
					ease: 'back(2)',
					duration: 1.5
				}
			)

			.fromTo(
				'.error-wrapper h1 span:not(.img-wrapper span)',
				{
					y: -50,
					autoAlpha: 0
				},
				{
					y: 0,
					autoAlpha: 1,
					stagger: {
						from: 'center',
						each: 0.05
					},
					ease: 'back.out(5)',
					duration: 1
				},
				'<'
			)

			.fromTo(
				'.error-wrapper h5 ',
				{
					y: 25,
					autoAlpha: 0
				},
				{
					y: 0,
					autoAlpha: 1
				}
			)
	}

	useEffect(() => {
		animation()
	}, [])

	return (
		<section className={`${styles.wrapper} error-wrapper sec-container`}>
			<div className='sec-m'>
				<h1>
					<span>E</span>
					<span>R</span>
					<span>R</span>
					<span>0</span>
					<span>R</span>
					<div className={`${styles.img_wrapper} img-wrapper`}>
						<Image priority layout='fill' src={errorImg} alt='Something went wrong' />
					</div>
				</h1>
				<h5 className='gray-color'>OOPS, it looks like, something went wrong...</h5>
			</div>
		</section>
	)
}

export default ServerErrorPage

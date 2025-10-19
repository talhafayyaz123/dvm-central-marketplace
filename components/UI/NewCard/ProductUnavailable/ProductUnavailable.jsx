import React, { useEffect } from 'react'
import styles from './ProductUnavailable.module.css'

const ProductUnavailable = () => {
	const animation = async () => {
		const gsap = (await import('gsap')).default
		let errorTl = gsap.timeline()

		errorTl
			.set('.error-wrapper', {
				autoAlpha: 1,
				delay: 0.5
			})

			.fromTo(
				'.error-wrapper h1 span',
				{
					y: -50,
					autoAlpha: 0
				},
				{
					y: 0,
					autoAlpha: 1,
					stagger: {
						from: 'start',
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
	// const string =
	// const split = string.split('')
	return (
		<section className={`${styles.wrapper} error-wrapper`}>
			<div className='sec-m'>
				<h1>
					{'PRODUCT NOT FOUND'?.split('')?.map((word, index) => {
						return <span key={index}>{word?.includes(' ') ? <>{word}&nbsp;</> : word}</span>
					})}
				</h1>
				<h5 className='gray-color'>Oops, Look like this product has been deleted...</h5>
			</div>
		</section>
	)
}

export default ProductUnavailable

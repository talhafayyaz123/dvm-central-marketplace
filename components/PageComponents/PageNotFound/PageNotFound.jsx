import Head from 'next/head'
import styles from './PageNotFound.module.css'
import Link from 'next/link'
import { useEffect } from 'react'

const PageNotFound = () => {
	const animation = async () => {
		const gsap = (await import('gsap')).default

		let errorTl = gsap.timeline()

		errorTl
			.set('.error-wrapper', {
				autoAlpha: 1,
				delay: 0.3
			})
			.fromTo(
				'.error-wrapper h1:first-of-type span',
				{
					x: 500,

					scaleX: 1.5,
					autoAlpha: 0
				},
				{
					x: 0,
					scaleX: 1,
					autoAlpha: 1,
					stagger: 0.07,
					ease: 'back.out(2)',
					duration: 0.75
				}
			)
			.fromTo(
				'.error-wrapper h1:last-of-type span',
				{
					x: -500,

					scaleX: 1.5,
					autoAlpha: 0
				},
				{
					x: 0,
					scaleX: 1,
					autoAlpha: 1,
					stagger: 0.07,
					ease: 'back.out(1)',
					duration: 0.75
				},
				'<'
			)

			.fromTo(
				'.wave-loader, .wave-loader div',
				{
					scale: 0
				},
				{
					scale: 1,
					ease: 'back.out(2)',
					duration: 1,
					stagger: 0.1,
					onComplete: () => {
						gsap.fromTo(
							'.wave-loader div',
							{
								rotate: 0
							},
							{
								rotate: 360,
								duration: 7,
								repeat: -1,
								ease: 'none'
							}
						)
					}
				}
			)

			.fromTo(
				'.error-wrapper h2, .error-wrapper p ',
				{
					y: 25,
					autoAlpha: 0
				},
				{
					y: 0,
					autoAlpha: 1,
					stagger: 0.2
				},
				'<90%'
			)
			.fromTo(
				'.error-btn-wrapper div',
				{
					y: 25,
					autoAlpha: 0
				},
				{
					y: 0,
					autoAlpha: 1,
					stagger: 0.1
				},
				'<90%'
			)
	}

	useEffect(() => {
		animation()
	}, [])
	return (
		<>
			<Head>
				<meta name='Page Not Found' content='noindex' />
			</Head>
			<section className={styles.page_not_found_container}>
				<div className={`${styles.error_wrapper} error-wrapper`}>
					<div className={styles.heading_wrapper}>
						<div className={`${styles.wave_loader} wave-loader`}>
							<div className={`${styles.wave} ${styles.wave_0} ${styles.animate}`} />
							<div className={`${styles.wave} ${styles.wave_1} ${styles.animate}`} />
							<div className={`${styles.wave} ${styles.wave_2} ${styles.animate}`} />
						</div>
						<h1 className='font-semibold'>
							<span>E</span>
							<span>r</span>
							<span>r</span>
							<span>o</span>
							<span>r</span>
						</h1>
						<h1 className='font-semibold'>
							<span>4</span>
							<span>0</span>
							<span>4</span>
						</h1>
					</div>

					<h2 className='inner-sec-mt'>OOPS! The requested page Cannot be found.</h2>
					<p className='gray-color'>{`We can't seem to find the page you are looking for, seems like you may have mis-typed the URL, or the page has been removed, or had its name changed, or is temporarily unavailable.`}</p>
					<p className='gray-color'>Please go back to home page or contact us.</p>
					<div className={`${styles.error_btn_wrapper} error-btn-wrapper`}>
						<Link href='/'>
							<a>
								<div>
									<button className='btn primary-btn white-color'>Home Page</button>
								</div>
							</a>
						</Link>
						<Link href='/contact'>
							<a>
								<div>
									<button className='btn white-btn primary-border primary-color'>Contact Us</button>
								</div>
							</a>
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}
export default PageNotFound

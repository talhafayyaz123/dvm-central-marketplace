import Link from 'next/link'
import React from 'react'
import styles from './Slide.module.css'
// import SocialLinks from './SocialLinks/SocialLinks'
import ImgWithLoader from '../../../../UI/ImgWithLoader/ImgWithLoader'

const Slide = ({ heading, headingType, info, href, removeButton, children, src, priority, width, height, btnText }) => {
	return (
		<div className={styles.slide}>
			<div className={styles.text_slide_wrapper}>
				{headingType === 'h1' ? <h1 className={`${styles.heading} white-color`}>{heading}</h1> : <h2 className={`${styles.heading} white-color`}>{heading}</h2>}
				{/* <p className={styles.info}>{info}</p> */}
				{children && <div>{children}</div>}

				{!removeButton && (
					<Link href={href}>
						<a className={styles.btn}>
							<button className='white-color'>
								<span>{btnText ? btnText : 'Learn More'}</span>
								<svg className='ml-4' xmlns='http://www.w3.org/2000/svg' width='19.625' height='18.092' viewBox='0 0 19.625 18.092'>
									<path id='Arrow' d='M10.444,18.092,8.285,15.975l7.026-6.924L8.285,2.128,10.446,0l9.18,9.046-9.18,9.046Zm-8.285,0h0L0,15.975,7.026,9.051,0,2.128,2.159,0l9.181,9.046L2.159,18.092Z' fill='var(--white)' />
								</svg>
							</button>
						</a>
					</Link>
				)}
				{/* <SocialLinks /> */}
			</div>
			<div className={styles.img_container}>
				<ImgWithLoader className={styles.img_wrapper} width={width} height={height} loaderColor='var(--secondary)' priority={priority} src={src} alt={heading} />
			</div>
		</div>
	)
}

export default Slide

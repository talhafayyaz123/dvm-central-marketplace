import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './Slide.module.css'
// import SocialLinks from './SocialLinks/SocialLinks'
import ImgWithLoader from '../../../../UI/ImgWithLoader/ImgWithLoader'

const Slide = ({ heading, info, href, removeButton, children, src, priority, layout }) => {
	return (
		<div className={styles.slide}>
			<div className={styles.text_slide_wrapper}>
				<h1 className={`${styles.heading} white-color`}>{heading}</h1>
				<p className={styles.info}>{info}</p>
				{children && <div>{children}</div>}

				{!removeButton && (
					<Link href={href}>
						<a className={styles.btn}>
							<button className='white-btn primary-color'>
								<span>Learn More</span>
								<svg className='ml-4' xmlns='http://www.w3.org/2000/svg' width='19.625' height='18.092' viewBox='0 0 19.625 18.092'>
									<path id='Arrow' d='M10.444,18.092,8.285,15.975l7.026-6.924L8.285,2.128,10.446,0l9.18,9.046-9.18,9.046Zm-8.285,0h0L0,15.975,7.026,9.051,0,2.128,2.159,0l9.181,9.046L2.159,18.092Z' fill='#c46de1' />
								</svg>
							</button>
						</a>
					</Link>
				)}
				{/* <SocialLinks /> */}
			</div>
			<div className={styles.img_wrapper}>
				<ImgWithLoader loaderColor='white' priority={priority} src={src} alt={heading} layout={layout} />
			</div>
		</div>
	)
}

export default Slide

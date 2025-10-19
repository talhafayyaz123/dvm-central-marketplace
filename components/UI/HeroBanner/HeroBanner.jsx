import React from 'react'
import Wave from '../Wave/Wave'
import styles from './HeroBanner.module.css'
import Image from 'next/image'
// import banner from '../../../public/imgs/Artboard.png'

const HeroBanner = ({ className, imgClassName, title, info, info_2, src, pageType, children, width, height, heroType, unoptimized, fullImg, mobImgSrc }) => {
	return (
		<section className={`${styles.hero_banner} ${className} ${!fullImg ? 'gradient-sec' : styles.full_img} `}>
			{!fullImg ? (
				<Wave />
			) : (
				<>
					{src && <Image quality={85} unoptimized={unoptimized} priority className={styles.img_wrapper} src={src} alt={title} width={width || 1200} height={height || 400} style={{ objectFit: 'cover' }} />}
					{/* {mobImgSrc && <ImgWithLoader priority quality={99} unoptimized={unoptimized} className={styles.mob_img_wrapper} src={mobImgSrc} alt={title} width={width ? width : ''} height={height ? height : ''} />} */}
				</>
			)}
			<div className='inner-sec-p'>
				<div className={`${styles.header_wrapper} ${pageType === 'single_col' ? styles.single_col : undefined} ${heroType === 'course_video' ? styles.course_col : undefined} sec-container white-color`}>
					<div className={`${styles.header_content} ${heroType === 'course_video' || heroType === 'course_single_video' ? styles.course_info : undefined}`}>
						{title && <h1>{title}</h1>}
						{/* {heroType === 'course_video' && <h5>About chapter</h5>} */}
						{info && (heroType === 'course_video' ? <div className={styles.info} dangerouslySetInnerHTML={{ __html: info }} /> : <p className={`${styles.info} ${heroType === 'coursePage' ? styles.course_herobnr : undefined}`}>{info}</p>)}
						{info_2 && <p>{info_2}</p>}
						{children && children}
					</div>
					{src && !fullImg && (
						<div className={`${styles.img_wrapper} ${imgClassName}`}>
							<Image priority loaderColor='white' src={src} alt={title} width={width || 600}  height={height || 300} />
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default React.memo(HeroBanner);

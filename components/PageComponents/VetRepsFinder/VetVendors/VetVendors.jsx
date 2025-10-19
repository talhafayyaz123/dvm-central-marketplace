import React, { useRef } from 'react'
import { SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Navigation } from 'swiper'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import SwiperSlideComponent from '../../../UI/SwiperSlideComponent/SwiperSlideComponent'
import { touchEndHandler, touchStartHandler } from '../../../../utils/SliderTouchEvents'
import styles from './VetVendors.module.css'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import { imgApiUrlVetRep } from '../../../../utils/config'
import placeHolderImg from '/public/imgs/no-img.webp'

const VetVendors = ({ companies }) => {
	const companiessRef = useRef(null)

	return (
		companies?.length > 0 && (
			<div ref={companiessRef} className={styles.card_wrapper}>
				<SwiperSlideComponent
					modules={[FreeMode, Autoplay, Navigation]}
					slidesPerView={1}
					spaceBetween={20}
					freeMode={true}
					speed={1500}
					onTouchStart={() => touchStartHandler(companiessRef?.current)}
					onTouchMove={() => touchStartHandler(companiessRef?.current)}
					onTouchEnd={() => touchEndHandler(companiessRef?.current)}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false
					}}
					navigation={{
						prevEl: '.top-vendor-button-prev',
						nextEl: '.top-vendor-button-next'
					}}
					breakpoints={{
						361: {
							slidesPerView: 2,
							spaceBetween: 10
						},
						481: {
							slidesPerView: 3,
							spaceBetween: 10
						},
						768: {
							slidesPerView: 4,
							spaceBetween: 10
						},
						1024: {
							slidesPerView: 5,
							spaceBetween: 20
						},
						1251: {
							slidesPerView: 7,
							spaceBetween: 30
						}
					}}
				>
					{companies?.map((companies) => {
						const vetRepBaseUrl = process.env.NEXT_PUBLIC_APP_ENV === 'dev' ? 'https://vet-rep-finder-dev-mhtjv.ondigitalocean.app' : process.env.NEXT_PUBLIC_APP_ENV === 'live' ? 'https://vetrepfinder.com' : 'https://vet-rep-finder-qa-dloqq.ondigitalocean.app'

						return (
							<SwiperSlide key={companies.id} className={`${styles.card} transition`}>
								<a href={`${vetRepBaseUrl}/companies/${companies?.slug}`} className={`shadow radius primary-bb ${styles.vendor}`} target='_blank' rel='noopener noreferrer'>
									<ImgWithLoader className={styles.img} width={100} height={100} src={companies?.logo !== null ? `${imgApiUrlVetRep.vendor.logo}/${companies?.logo}` : placeHolderImg} alt={companies?.name} />
								</a>
							</SwiperSlide>
						)
					})}
					<div className={styles.slider_btn}>
						<svg xmlns='http://www.w3.org/2000/svg' className='transition top-vendor-button-prev' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
						</svg>
					</div>
					<div className={styles.slider_btn}>
						<svg xmlns='http://www.w3.org/2000/svg' className='transition top-vendor-button-next' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
						</svg>
					</div>
				</SwiperSlideComponent>
			</div>
		)
	)
}
 
export default VetVendors
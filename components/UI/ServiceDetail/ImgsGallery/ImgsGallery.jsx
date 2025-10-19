import React, { useState, useEffect } from 'react'
import { imgApiUrl } from '../../../../utils/config'
import styles from './ImgsGallery.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'
import { FreeMode, Thumbs, Navigation } from 'swiper'
import placeHolderImg from '/public/imgs/no-img.webp'
// import { GlassMagnifier } from 'react-image-magnifiers'
import Modal from '../../Modal/Modal'
import VideoModal from './VideoModal/VideoModal'
import ImgWithLoader from '../../ImgWithLoader/ImgWithLoader'

const ImgsGallery = ({ media, name }) => {
	// const { price, price_catalog, type, price_discounted, price_discounted_end } = data
	const [thumbsSwiper, setThumbsSwiper] = useState(null)

	const [videoModal, setvideoModal] = useState(false)
	const [videoModalData, setvideoModalData] = useState('')

	const openVideoModalHandler = (video) => {
		setvideoModalData(video)
		setvideoModal(true)
	}

	useEffect(() => {
		var lazyloadImages = document.querySelectorAll('.imageMagnifier img')
		lazyloadImages.forEach(function (img) {
			{
				media.map((data) => {
					if (data.name === img.getAttribute('alt')) {
						var src = `${imgApiUrl.vendor.services}/${data.name}`
						img.setAttribute('src', src)
						img.setAttribute('width', '100%')
						img.setAttribute('height', '100%')
					}
				})
			}
		})
	}, [])

	return (
		<>
			<Modal modal={videoModal} setmodal={setvideoModal} modalType='video'>
				{videoModal && <VideoModal videoData={videoModalData} modal={setvideoModalData} />}
			</Modal>

			{/* big imgs gallery */}
			<div className={`${styles.img_wrapper} img_wrapper2 shadow`}>
				{/* {price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date())
					? type !== 'variation' &&
					  price_discounted !== price_catalog && (
							<div className={`${styles.img_disc_wrapper} full-radius`}>
								<div className={styles.disc}>{(100 - (Number(price_discounted) / Number(price_catalog)) * 100).toFixed(2)}%</div>
								<div>Off</div>
							</div>
					  )
					: type !== 'variation' &&
					  price !== price_catalog && (
							<div className={`${styles.img_disc_wrapper} full-radius`}>
								<div className={styles.disc}>{(100 - (Number(price) / Number(price_catalog)) * 100).toFixed(2)}%</div>
								<div>Off</div>
							</div>
					  )} */}

				{media?.length > 0 ? (
					<Swiper
						slidesPerView={1}
						spaceBetween={10}
						thumbs={{
							swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
						}}
						modules={[FreeMode, Thumbs, Navigation]}
						className='mySwiper2'
					>
						{media?.map((data) => {
							return (
								data?.type === 'images' && (
									<SwiperSlide key={data?.id} className={styles.img_slide}>
										<div className={styles.m_img_wrapper}>
											<ImgWithLoader src={data?.name !== null ? `${imgApiUrl.vendor.services}/${data.name}` : placeHolderImg} alt={data.name} layout='fill' className={styles.productImage} />
										</div>
									</SwiperSlide>
								)
							)
						})}
					</Swiper>
				) : (
					media?.length === 0 && <ImgWithLoader loaderType='sml' className={styles.placeHolderImg} width={350} height={350} src={placeHolderImg} alt={name} />
				)}
			</div>

			{media?.length > 0 && (
				<div className={`${styles.imgs_gallery} image_gallery2`}>
					<Swiper
						onSwiper={setThumbsSwiper}
						spaceBetween={10}
						slidesPerView={3}
						breakpoints={{
							577: {
								slidesPerView: 4
							}
						}}
						freeMode={true}
						watchSlidesProgress={true}
						navigation={{
							prevEl: '.prod-button-prev',
							nextEl: '.prod-button-next'
						}}
						modules={[FreeMode, Navigation, Thumbs]}
						className={`${styles.thumbs_swiper} product_thumbs mySwiper`}
					>
						{media?.length > 0 &&
							media?.map((data) => {
								return (
									data?.type === 'images' && (
										<SwiperSlide key={data.id}>
											<ImgWithLoader loaderType='sml' className={`${styles.thumb_img} transition`} width={80} height={80} src={data?.name !== null ? `${imgApiUrl.vendor.services}/${data?.name}` : placeHolderImg} alt={name} />
										</SwiperSlide>
									)
								)
							})}
					</Swiper>

					<svg xmlns='http://www.w3.org/2000/svg' className={`${styles.next_btn} prod-button-next`} fill='none' viewBox='0 0 24 24' stroke='var(--primary)'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7'></path>
					</svg>

					<svg xmlns='http://www.w3.org/2000/svg' className={`${styles.prev_btn} prod-button-prev`} fill='none' viewBox='0 0 24 24' stroke='var(--primary)'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7'></path>
					</svg>
				</div>
			)}
		</>
	)
}

export default ImgsGallery

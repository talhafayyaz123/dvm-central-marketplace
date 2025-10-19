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
import Magnifier from 'react-magnifier'
import Modal from '../../Modal/Modal'
import VideoModal from './VideoModal/VideoModal'
import ImgWithLoader from '../../ImgWithLoader/ImgWithLoader'

const ImgsGallery = ({ data, videos, images, name }) => {
	const { price, price_catalog, type, price_discounted, price_discounted_end } = data
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
				images?.map((data) => {
					if (data.name === img.getAttribute('alt')) {
						var src = `${imgApiUrl.products.large}/${data.name}`
						img.setAttribute('src', src)
						img.setAttribute('width', '100%')
						img.setAttribute('height', '100%')
					}
				})
			}
		})
	}, [images])

	return (
		<>
			<Modal modal={videoModal} setmodal={setvideoModal} modalType='video'>
				{videoModal && <VideoModal videoData={videoModalData} modal={setvideoModalData} />}
			</Modal>

			{/* big imgs gallery */}
			<div className={`${styles.img_wrapper} img_wrapper2 shadow`}>
				{price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date())
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
					  )}

				{images?.length > 0 ? (
					<Swiper
						slidesPerView={1}
						spaceBetween={10}
						thumbs={{
							swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
						}}
						modules={[FreeMode, Thumbs, Navigation]}
						className='mySwiper2'
					>
						{images?.map((img) => {
							return (
								<SwiperSlide key={img.id} className={styles.img_slide}>
									{/* <GlassMagnifier className={`${styles.productImage} imageMagnifier`} magnifierSize='50%' data-imageSrc={img?.name !== null ? `${imgApiUrl.products.large}/${img.name}` : placeHolderImg} imageAlt={img.name} /> */}
									<div className={styles.m_img_wrapper}>{img?.name !== null ? <Magnifier src={`${imgApiUrl.products.large}/${img.name}`} alt={img.name} /> : <ImgWithLoader src={placeHolderImg} alt={img.name} />}</div>
								</SwiperSlide>
							)
						})}

						{videos?.length > 0 &&
							videos.map((vid) => {
								return (
									<SwiperSlide key={vid.id}>
										<div className={styles.vid_wrapper} onClick={() => openVideoModalHandler(vid)}>
											<div className={`${styles.play_icon} white-bg full-radius primary-border shadow`}>
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='var(--primary)'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z' />
												</svg>
											</div>

											<ImgWithLoader loaderType='sml' className={`${styles.video_img}`} width={350} height={350} src={vid?.video_image !== null ? `${imgApiUrl.products.videos.images}/${vid?.video_image}` : placeHolderImg} alt={name} />
										</div>
									</SwiperSlide>
								)
							})}
					</Swiper>
				) : (
					images?.length === 0 && <ImgWithLoader loaderType='sml' className={styles.placeHolderImg} width={350} height={350} src={placeHolderImg} alt={name} />
				)}
			</div>

			{images?.length > 0 && (
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
						{images?.length > 0 &&
							images?.map((img) => {
								return (
									<SwiperSlide key={img.id}>
										<ImgWithLoader loaderType='sml' className={`${styles.thumb_img} transition`} width={80} height={80} src={img.name !== null ? `${imgApiUrl.products.thumbnail}/${img.name}` : placeHolderImg} alt={name} />
									</SwiperSlide>
								)
							})}
						{videos?.length > 0 &&
							videos.map((vid) => {
								return (
									<SwiperSlide key={vid.id}>
										<div className={`${styles.thumb_img} transition`}>
											<div className={`${styles.play_icon} white-bg full-radius primary-border shadow`}>
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='var(--primary)'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z' />
												</svg>
											</div>
											<ImgWithLoader loaderType='sml' width={80} height={80} src={vid?.video_thumbnail !== null && vid?.video_thumbnail !== '' ? `${imgApiUrl.products.videos.images}/${vid.video_image}` : placeHolderImg} alt={name} />
										</div>
									</SwiperSlide>
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

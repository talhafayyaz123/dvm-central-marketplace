import React, { useEffect, useState } from 'react'
import styles from './Reviews.module.css'
import axios from 'axios'
import { baseApiUrl, imgApiUrl } from '../../../../../../utils/config'
import { DarkLoader } from '../../../../../Loader/Loader'
import ImgWithLoader from '../../../../../UI/ImgWithLoader/ImgWithLoader'
import profileImg from '/public/imgs/no-profile-img.png'
import Rating from '../../../../../UI/Rating/Rating'
import Modal from '../../../../../UI/Modal/Modal'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'
import { lockScroll } from '../../../../../../utils/scrollLock'
import InfiniteScroll from 'react-infinite-scroll-component'
import getTimezoneDate from '../../../../../../utils/getTimezoneDate'

// import Reviews from './Reviews/Reviews'

const ReviewsAndSubmit = ({ serviceId, rating, ratingBars, reviewCount }) => {
	const [reviewsData, setreviewsData] = useState([])
	const [hasMoreData, sethasMoreData] = useState(true)
	const [currentPage, setcurrentPage] = useState(1)
	const [lastPage, setlastPage] = useState(null)
	const [reviewsLoading, setreviewsLoading] = useState(true)
	const [modal, setmodal] = useState(false)
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const [modalImgs, setmodalImgs] = useState([])
	const [modalVideoSrc, setmodalVideoSrc] = useState('')
	const [activeIndex, setactiveIndex] = useState(null)

	const getReviews = async () => {
		const res = await axios.get(`${baseApiUrl}/get-service-reviews/${serviceId}`)
		setreviewsData(res?.data?.data?.data)
		setcurrentPage(res?.data?.data?.current_page)
		setlastPage(res?.data?.data?.last_page)
		if (res?.data?.data?.data?.length > 0) {
			sethasMoreData(true)
		} else sethasMoreData(false)

		setreviewsLoading(false)
		console.log('res frm services', res)
	}
	useEffect(() => {
		getReviews()
	}, [])

	const fetchData = async () => {
		const res = await axios.get(`${baseApiUrl}/get-service-reviews/${serviceId}?page=${currentPage + 1}`)
		console.log('res form pagi', res)
		setreviewsData((prev) => [...prev, ...res?.data?.data?.data])
		setcurrentPage(res?.data?.data?.current_page)
		setlastPage(res?.data?.data?.last_page)
		if (res?.data?.data?.data?.length > 0) {
			sethasMoreData(true)
		} else sethasMoreData(false)
	}

	// useEffect(() => {
	// 	console.log('activeIndex', activeIndex, 'length', modalImgs?.length)
	// 	!modal && setactiveIndex(null)
	// }, [modal, activeIndex])

	return reviewsLoading ? (
		<DarkLoader />
	) : (
		<>
			<Modal modal={modal} setmodal={setmodal} modalType={'reviews'}>
				{modal && (
					<div className={styles.modal_wrapper}>
						<Swiper
							initialSlide={activeIndex}
							slidesPerView={1}
							spaceBetween={10}
							grabCursor={true}
							thumbs={{
								swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
							}}
							modules={[Thumbs]}
							className={`${styles.main_swiper} mySwiper2`}
						>
							{modalImgs?.length > 0 &&
								modalImgs?.map((img, index) => {
									return (
										img?.image !== null && (
											<SwiperSlide key={index}>
												<ImgWithLoader className={`${styles.modal_img}`} width='500' height='500' src={`${imgApiUrl.reviews.img}/${img?.image}`} />
											</SwiperSlide>
										)
									)
								})}
							{modalVideoSrc !== null && (
								<SwiperSlide>
									<video className={styles.video} controls autoPlay={activeIndex === modalImgs?.length ? true : false} src={`${imgApiUrl.reviews.video}/${modalVideoSrc}`} type='video/*' />
								</SwiperSlide>
							)}
						</Swiper>

						<div className={styles.imgs_gallery}>
							<Swiper
								onSwiper={setThumbsSwiper}
								spaceBetween={10}
								slidesPerView={3}
								grabCursor={true}
								breakpoints={{
									577: {
										slidesPerView: 5
									}
								}}
								watchSlidesProgress={true}
								navigation={{
									prevEl: '.prod-button-prev',
									nextEl: '.prod-button-next'
								}}
								modules={[Thumbs, Navigation]}
								className={`${styles.thumbs_swiper} review-slider mySwiper`}
							>
								{modalImgs?.length > 0 &&
									modalImgs?.map((img, index) => {
										return (
											img?.image !== null && (
												<SwiperSlide key={index}>
													<ImgWithLoader className={`gray-border ${styles.img}`} width='70' height='70' src={`${imgApiUrl.reviews.img}/${img?.image}`} />
												</SwiperSlide>
											)
										)
									})}
								{modalVideoSrc !== null && (
									<SwiperSlide>
										<div className={`${styles.play_icon} gray-border ${styles.img}`}>
											<svg xmlns='http://www.w3.org/2000/svg' fill='var(--primary)' viewBox='0 0 24 24' strokeWidth={1} stroke='var(--white)'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
												<path strokeLinecap='round' strokeLinejoin='round' d='M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z' />
											</svg>
										</div>
									</SwiperSlide>
								)}
							</Swiper>

							<svg xmlns='http://www.w3.org/2000/svg' className={`${styles.next_btn} prod-button-next primary-bg full-radius`} fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7'></path>
							</svg>

							<svg xmlns='http://www.w3.org/2000/svg' className={`${styles.prev_btn} prod-button-prev primary-bg full-radius`} fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7'></path>
							</svg>
						</div>
					</div>
				)}
			</Modal>

			<InfiniteScroll className={styles.scroller} dataLength={reviewsData?.length} next={fetchData} scrollThreshold={0.6} hasMore={hasMoreData} loader={lastPage > 1 && <DarkLoader className={styles.pagination_loader} />}>
				<div className={styles.wrapper}>
					{reviewsData?.length > 0 ? (
						reviewsData?.map((data, index) => {
							const { name, purchase, video, rating, vendor_approved, admin_approved, time, review_images, comments, customer } = data
							const [date, localTime12HoursBase, pmAm] = getTimezoneDate(time)
							return (
								comments !== null &&
								comments !== '' && (
									<div key={index} className={`${styles.comment} gray-border radius`}>
										<svg className={styles.qoutes} version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 57 57' xmlSpace='preserve'>
											<g>
												<circle style={{ fill: 'var(--gray-border)' }} cx='18.5' cy='31.5' r='5.5' />
												<path
													style={{ fill: 'var(--gray-border)' }}
													d='M18.5,38c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5S22.084,38,18.5,38z
		 M18.5,27c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5S20.981,27,18.5,27z'
												/>
											</g>
											<g>
												<circle style={{ fill: 'var(--gray-border)' }} cx='35.5' cy='31.5' r='5.5' />
												<path
													style={{ fill: 'var(--gray-border)' }}
													d='M35.5,38c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5S39.084,38,35.5,38z
		 M35.5,27c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5S37.981,27,35.5,27z'
												/>
											</g>
											<path
												style={{ fill: 'var(--gray-border)' }}
												d='M13,32c-0.553,0-1-0.447-1-1c0-7.72,6.28-14,14-14c0.553,0,1,0.447,1,1s-0.447,1-1,1
	c-6.617,0-12,5.383-12,12C14,31.553,13.553,32,13,32z'
											/>
											<path
												style={{ fill: 'var(--gray-border)' }}
												d='M30,32c-0.553,0-1-0.447-1-1c0-7.72,6.28-14,14-14c0.553,0,1,0.447,1,1s-0.447,1-1,1
	c-6.617,0-12,5.383-12,12C31,31.553,30.553,32,30,32z'
											/>
										</svg>

										<div className={styles.imgs}>
											{review_images?.length > 0 &&
												review_images?.map((img, index) => {
													return (
														img?.image !== null && (
															<ImgWithLoader
																key={index}
																className={`gray-border ${styles.img} ${styles.thumbnail}`}
																loaderType='sml'
																width='70'
																height='70'
																src={`${imgApiUrl.reviews.img}/${img?.image}`}
																onClick={() => (setmodalImgs(review_images), setmodalVideoSrc(video), setmodal(true), setactiveIndex(index), lockScroll())}
															/>
														)
													)
												})}
											{video !== null && (
												<div className={`${styles.play_icon} gray-border ${styles.img} ${styles.thumbnail}`} onClick={() => (setmodalImgs(review_images), setmodalVideoSrc(video), setmodal(true), setactiveIndex(review_images?.length), lockScroll())}>
													<svg xmlns='http://www.w3.org/2000/svg' fill='var(--primary)' viewBox='0 0 24 24' strokeWidth={1} stroke='var(--white)'>
														<path strokeLinecap='round' strokeLinejoin='round' d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
														<path strokeLinecap='round' strokeLinejoin='round' d='M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z' />
													</svg>
												</div>
											)}
										</div>

										<div className={styles.img_name}>
											<ImgWithLoader
												className={styles.reviewer_img}
												width='50'
												height='50'
												src={customer?.vet_dvm_profile_image?.includes('base64') ? customer?.vet_dvm_profile_image : customer?.vet_dvm_profile_image !== null && customer?.vet_dvm_profile_image !== undefined ? `${imgApiUrl?.profileImg}/${customer?.vet_dvm_profile_image}` : profileImg}
												alt={name}
											/>{' '}
											<div>{name}</div>
										</div>

										<Rating className={styles.rating} data={rating} />
										{purchase === 'Y' && vendor_approved === 'Y' && admin_approved === 'Y' ? <div className={`${styles.batch} ${styles.verified}`}>Verified Purchase </div> : <div className={`${styles.batch} ${styles.not_verified}`}>Not Verified</div>}

										<div className={`gray-color ${styles.msg}`}>{comments}</div>
										<div className={`gray-color ${styles.time}`}>
											{date} {localTime12HoursBase.slice(0, localTime12HoursBase.lastIndexOf(':'))}
											{pmAm}
										</div>
									</div>
								)
							)
						})
					) : (
						<div>No review available.</div>
					)}
				</div>
			</InfiniteScroll>
			{/* <div className={styles.reviews_wrapper}>{rating !== null && rating !== 0 && rating !== undefined ? <Reviews rating={rating} ratingBars={ratingBars} reviewCount={reviewCount} /> : <div>No rating available</div>}</div> */}
		</>
	)
}

export default ReviewsAndSubmit

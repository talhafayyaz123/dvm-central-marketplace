import React, { useContext, useEffect, useRef, useState } from 'react'
import { baseApiUrl } from '../../../utils/config'
import { FreeMode, Autoplay, Navigation } from 'swiper'
import { SwiperSlide } from 'swiper/react'
import { DarkLoader, LiteLoader } from '../../Loader/Loader'
import Link from 'next/link'
import styles from './OrderPlaced.module.css'
import confetti from 'canvas-confetti'
import axios from 'axios'
import SwiperSlideComponent from '../../UI/SwiperSlideComponent/SwiperSlideComponent'
import Modal from '../../UI/Modal/Modal'
import VideoModal from '../../UI/ModalProductDetail/ImgsGallery/VideoModal/VideoModal'
import ModalProductDetail from '../../UI/ModalProductDetail/ProductDetail'
import ServiceCard from '../../UI/ServiceCard/ServiceCard'
import NewCard from '../../UI/NewCard/NewCard'
import { GlobalProvider } from '../../../context/AppProvider'
import { useSession } from 'next-auth/react'
import NotAuthorized from '../../UI/NotAuthorized/NotAuthorized'

const OrderPlaced = () => {
	const { loginUser, userData } = useContext(GlobalProvider)
	const [productLoading, setproductLoading] = useState(false)
	const [relatedProducts, setrelatedProducts] = useState([])
	const [relatedServices, setrelatedServices] = useState([])

	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	const [modalLoading, setmodalLoading] = useState(false)

	const relatedProductWrapperRef = useRef(null)
	const relatedservicesWrapperRef = useRef(null)

	const { data: session, status } = useSession()

	const getRelatedproducts = async () => {
		setproductLoading(true)
		// const id = localStorage.getItem('vendor_ids')
		// const splitIds = id === null ? [] : id.split(',')

		// console.log('splitIds', splitIds)

		const data = {
			vendor_ids: JSON.parse(localStorage.getItem('vendor_ids')),
			customer_id: loginUser?.id
		}
		const res = await axios.post(`${baseApiUrl}/checkout-related-products`, data)
		console.log('res from order placed', res)

		setrelatedProducts(res?.data?.relatedProducts)
		setrelatedServices(res?.data?.relatedServices)
		setproductLoading(false)
	}

	useEffect(() => {
		if (userData?.position !== 'Sales Rep' && status !== 'loading') {
			var count = 200
			var defaults = {
				origin: { y: 0.8 }
			}

			function fire(particleRatio, opts) {
				confetti({
					...defaults,
					...opts,
					particleCount: Math.floor(count * particleRatio)
				})
			}

			fire(0.25, {
				spread: 26,
				startVelocity: 55
			})
			fire(0.2, {
				spread: 60
			})
			fire(0.35, {
				spread: 100,
				decay: 0.91,
				scalar: 0.8
			})
			fire(0.1, {
				spread: 120,
				startVelocity: 25,
				decay: 0.92,
				scalar: 1.2
			})
			fire(0.1, {
				spread: 120,
				startVelocity: 45
			})

			JSON.parse(localStorage.getItem('vendor_ids'))?.length > 0 && getRelatedproducts()
		}
	}, [userData?.position])

	return (
		<div style={{ minHeight: '70vh' }}>
			{status !== 'loading' &&
				(userData?.position !== undefined && userData?.position !== 'Sales Rep' ? (
					<>
						<LiteLoader className={`modal-bg transition ${modalLoading ? 'show-bd' : 'hide-bd'}`} />
						<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='cart-modal'>
							{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
						</Modal>
						<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
							{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
						</Modal>
						<section className='sec-p'>
							<div className={`${styles.container} sec-container`}>
								<div className={styles.icons_wrapper}>
									<div className={styles.icons}>
										<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--green)'>
											<path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
										</svg>
									</div>
								</div>

								<h1 className='primary-color'>Congratulations</h1>
								<h4 className='gray-color'>Your order has placed successfully!</h4>
								<Link href='/'>
									<a>
										<button className='primary-btn'>Continue Shopping</button>
									</a>
								</Link>
							</div>
							{productLoading ? (
								<DarkLoader className={styles.loader} />
							) : (
								<>
									{relatedProducts?.length > 0 && (
										<div className='sec-container' ref={relatedProductWrapperRef}>
											<div className={styles.products_headers}>
												<h4 className='primary-color'>Related Products</h4>
												<div className={styles.swiper_btn_wrapper}>
													<svg xmlns='http://www.w3.org/2000/svg' className='transition related-pro-button-prev' fill='none' viewBox='0 0 24 24' stroke='var(--primary)'>
														<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
													</svg>
													<svg xmlns='http://www.w3.org/2000/svg' className='transition related-pro-button-next' fill='none' viewBox='0 0 24 24' stroke='var(--primary)'>
														<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
													</svg>
												</div>
											</div>
											<SwiperSlideComponent
												modules={[FreeMode, Autoplay, Navigation]}
												slidesPerView={1}
												spaceBetween={10}
												freeMode={true}
												speed={1500}
												autoplay={{
													delay: 3000,
													disableOnInteraction: false
												}}
												navigation={{
													prevEl: '.related-pro-button-prev',
													nextEl: '.related-pro-button-next'
												}}
												breakpoints={{
													481: {
														slidesPerView: 2
													},
													769: {
														slidesPerView: 3,
														spaceBetween: 10
													},
													1025: {
														slidesPerView: 4,
														spaceBetween: 20
													}
												}}
												className={`${styles.related_prosducts_wrapper} swiper-slide`}
											>
												{relatedProducts?.map((product) => {
													return (
														<SwiperSlide key={product?.id} className='transition'>
															<NewCard setmodalLoading={setmodalLoading} data={product} setmodal={setmodal} setModalData={setModalData} />
														</SwiperSlide>
													)
												})}
											</SwiperSlideComponent>
										</div>
									)}
									{relatedServices?.length > 0 && (
										<div className='sec-container inner-sec-mt' ref={relatedservicesWrapperRef}>
											<div className={styles.products_headers} style={{ marginBottom: '1rem' }}>
												<h4 className='primary-color'>Related Services</h4>
												<div className={styles.swiper_btn_wrapper}>
													<svg xmlns='http://www.w3.org/2000/svg' className='transition related-ser-button-prev' fill='none' viewBox='0 0 24 24' stroke='var(--primary)'>
														<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
													</svg>
													<svg xmlns='http://www.w3.org/2000/svg' className='transition related-ser-button-next' fill='none' viewBox='0 0 24 24' stroke='var(--primary)'>
														<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
													</svg>
												</div>
											</div>
											<SwiperSlideComponent
												modules={[FreeMode, Autoplay, Navigation]}
												slidesPerView={1}
												spaceBetween={10}
												freeMode={true}
												speed={1500}
												autoplay={{
													delay: 3000,
													disableOnInteraction: false
												}}
												navigation={{
													prevEl: '.related-ser-button-prev',
													nextEl: '.related-ser-button-next'
												}}
												breakpoints={{
													481: {
														slidesPerView: 2
													},
													769: {
														slidesPerView: 3,
														spaceBetween: 10
													},
													1024: {
														slidesPerView: 4,
														spaceBetween: 20
													}
												}}
												className={`${styles.related_services_wrapper} service-swiper-slide`}
											>
												{relatedServices?.map((service) => {
													return (
														<SwiperSlide key={service?.id} className='transition'>
															<ServiceCard data={service} />
														</SwiperSlide>
													)
												})}
											</SwiperSlideComponent>
										</div>
									)}
								</>
							)}
						</section>
					</>
				) : (
					<NotAuthorized heading='You are not authorized to access this page.' />
				))}
		</div>
	)
}

export default OrderPlaced

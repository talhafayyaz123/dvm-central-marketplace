import React, { useRef, useState } from 'react'
import styles from './TopCategories.module.css'
import DealsCard from '../../../UI/DealsCard/DealsCard'
import Modal from '../../../UI/Modal/Modal'
import ModalProductDetail from '../../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import { SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Navigation } from 'swiper'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import SwiperSlideComponent from '../../../UI/SwiperSlideComponent/SwiperSlideComponent'
import bgImg from '/public/imgs/home/top-cat-bg.png'
import Image from 'next/image'
import { touchEndHandler, touchStartHandler } from '../../../../utils/SliderTouchEvents'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
// import dynamic from 'next/dynamic'

const TopCategories = ({ diffProducts }) => {
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	const categoriesRef = useRef(null)

	const { data: session } = useSession()

	// const Modal = dynamic(() => import('../../../UI/Modal/Modal'), { ssr: false })
	// const ModalProductDetail = dynamic(() => import('../../../UI/ModalProductDetail/ProductModal'), { ssr: false })
	// const VideoModal = dynamic(() => import('../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'), { ssr: false })

	return (
		<>
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='sidebar'>
				{modal && <ModalProductDetail displayType='sidebar' data={modalData} setmodal={setmodal} setModalData={setModalData} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>
			{diffProducts?.length > 0 && (
				<section className={`${styles.top_categories_container} sec-mt`}>
					<div className={styles.bg_img}>
						<Image unoptimized src={bgImg} width={1920} height={496} layout='responsive' alt='Veterinary Marketplace' />
					</div>
					<div className='top_categories_wrapper sec-container'>
						<div className='heading_wrapper'>
							<h2>Marketplace Veterinary, Shop Now!</h2>
							<p className='gray-color'>Start shopping right away by exploring our extensive product categories featuring excellent quality animal health products from potential suppliers.</p>
						</div>

						<div ref={categoriesRef}>
							<SwiperSlideComponent
								modules={[FreeMode, Autoplay, Navigation]}
								slidesPerView={1}
								spaceBetween={20}
								freeMode={true}
								speed={1500}
								onTouchStart={() => touchStartHandler(categoriesRef?.current)}
								onTouchMove={() => touchStartHandler(categoriesRef?.current)}
								onTouchEnd={() => touchEndHandler(categoriesRef?.current)}
								autoplay={{
									delay: 3000,
									disableOnInteraction: false
								}}
								navigation={{
									prevEl: '.top-categ-button-prev',
									nextEl: '.top-categ-button-next'
								}}
								breakpoints={{
									601: {
										slidesPerView: 2,
										spaceBetween: 10
									},
									921: {
										slidesPerView: 3,
										spaceBetween: 10
									},
									1279: {
										slidesPerView: 4,
										spaceBetween: 30
									}
								}}
								className={`${styles.todays_deals_inner_wrapper} inner-sec-pt`}
							>
								{diffProducts?.map((deals, index) => {
									return (
										deals?.image !== null &&
										deals?.image !== 'na.webp' &&
										deals?.image !== '' && (
											<SwiperSlide key={deals.id} className='transition'>
												<DealsCard key={deals.id} data={deals} pageType='home-v2' setmodal={setmodal} setModalData={setModalData} index={index} />
											</SwiperSlide>
										)
									)
								})}
								<div className={styles.swiper_btn_wrapper}>
									<div className={styles.swiper_inner_wrapper}>
										<div>
											<Link href={'/featured-products'}>
												<a>
													<button className='primary-btn white-color'>View More</button>
												</a>
											</Link>
										</div>
										<div>
											<svg xmlns='http://www.w3.org/2000/svg' className='transition top-categ-button-prev' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
											</svg>
											<svg xmlns='http://www.w3.org/2000/svg' className='transition top-categ-button-next' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
												<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
											</svg>
										</div>
									</div>
								</div>
							</SwiperSlideComponent>
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default TopCategories

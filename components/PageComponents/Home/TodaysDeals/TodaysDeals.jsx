import React, { useState } from 'react'
import DealsCard from '../../../UI/DealsCard/DealsCard'
import styles from './TodaysDeals.module.css'
import { SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Navigation } from 'swiper'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import SwiperSlideComponent from '../../../UI/SwiperSlideComponent/SwiperSlideComponent'
import Modal from '../../../UI/Modal/Modal'
import ModalProductDetail from '../../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import Wave from '../../../UI/Wave/Wave'

const TodaysDeals = ({ todaysDeals }) => {
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	return (
		<>
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='sidebar'>
				{modal && <ModalProductDetail data={modalData} displayType='sidebar' setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>

			<section className='todays-deals sec-mt gradient-sec sec-p'>
				<Wave />
				<div className='sec-container'>
					<div className={`${styles.todays_deals_heading} heading_wrapper`}>
						<h4>{`Today's Deals`}</h4>
						<h2>Vet Supply Store With Best Offers</h2>
						<p>{`Don't miss out on exploring the deals of the day, handpicked exclusively for you.`}</p>
					</div>
					<SwiperSlideComponent
						modules={[FreeMode, Autoplay, Navigation]}
						slidesPerView={1}
						spaceBetween={20}
						freeMode={true}
						speed={1500}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false
						}}
						navigation={{
							prevEl: '.deals-button-prev',
							nextEl: '.deals-button-next'
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
						{todaysDeals.map((deals, index) => {
							return (
								<SwiperSlide key={deals.id}>
									<DealsCard pageType='home' data={deals} index={index} setmodal={setmodal} setModalData={setModalData} />
								</SwiperSlide>
							)
						})}
						<div className={styles.swiper_btn_wrapper}>
							<svg xmlns='http://www.w3.org/2000/svg' className='transition deals-button-prev' fill='none' viewBox='0 0 24 24' stroke='#262626'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
							</svg>
							<svg xmlns='http://www.w3.org/2000/svg' className='transition deals-button-next' fill='none' viewBox='0 0 24 24' stroke='#262626'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
							</svg>
						</div>
					</SwiperSlideComponent>
				</div>
			</section>
		</>
	)
}

export default TodaysDeals

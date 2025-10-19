import React, { useState } from 'react'
import styles from './BlogsSlider.module.css'
import { SwiperSlide } from 'swiper/react'
import SwiperSlideComponent from '../SwiperSlideComponent/SwiperSlideComponent'
import { Navigation, Autoplay } from 'swiper'
import 'swiper/css/navigation'
import BlogCard from '../BlogCard/BlogCard'
import ModalProductDetail from '../ModalProductDetail/ProductDetail'
import Modal from '../Modal/Modal'
import VideoModal from '../ModalProductDetail/ImgsGallery/VideoModal/VideoModal'
import VirtualExpoCard from '../../UI/VirtualExpoCard/VirtualExpoCard'
import NewCard from '../NewCard/NewCard'

const BlogsSlider = ({ data, setmodalLoading }) => {
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	const { feautured_blog, sponsored_product, upcoming_event } = data
	return (
		<div className={`${styles.main_slider_container} inner-sec-mb`}>
			{data !== undefined && data !== null && (
				<SwiperSlideComponent
					slidesPerView={1}
					spaceBetween={100}
					autoHeight={true}
					speed={1500}
					pauseOnMouseEnter={true}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false
					}}
					modules={[Navigation, Autoplay]}
					navigation={{
						prevEl: '.swiper-button-prev',
						nextEl: '.swiper-button-next'
					}}
					className={`${styles.swiper_container} swiper-main-wrapper`}
				>
					{feautured_blog !== null && feautured_blog !== undefined && (
						<SwiperSlide>
							<div className={styles.slide_wrapper}>
								<button className={`sml-btn primary-color blink ${styles.adv_buttons}`}>Featured Blog</button>
								<BlogCard className={`shadow ${styles.featured_blog}`} data={feautured_blog} type='recent-blogs' />
							</div>
						</SwiperSlide>
					)}
					{sponsored_product !== null && sponsored_product !== undefined && (
						<SwiperSlide>
							<div className={styles.slide_wrapper}>
								<button className={`sml-btn primary-color blink ${styles.adv_buttons}`}>Sponsored Product</button>
								<NewCard data={sponsored_product} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} />
							</div>
						</SwiperSlide>
					)}
					{upcoming_event !== undefined && upcoming_event !== null && (
						<SwiperSlide>
							<div className={styles.upcoming_wrapper}>
								<button className={`sml-btn primary-color blink ${styles.adv_buttons}`}>Upcoming Events</button>
								<VirtualExpoCard data={upcoming_event} className={styles.upcoming_container} pageType='slider' />
							</div>
						</SwiperSlide>
					)}
					{Object.keys(data)?.length > 1 && (
						<div className={styles.swiper_btn_wrapper}>
							<svg xmlns='http://www.w3.org/2000/svg' className='transition swiper-button-prev' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
							</svg>
							<svg xmlns='http://www.w3.org/2000/svg' className='transition swiper-button-next' fill='none' viewBox='0 0 24 24' stroke='var(--white)'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
							</svg>
						</div>
					)}
				</SwiperSlideComponent>
			)}
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>
			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>
		</div>
	)
}

export default BlogsSlider

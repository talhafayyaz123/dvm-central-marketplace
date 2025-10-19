import React, { useRef } from 'react'
import SwiperSlideComponent from '../SwiperSlideComponent/SwiperSlideComponent'
import styles from './RelatedProducrsSlider.module.css'
import { SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay, Navigation } from 'swiper'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
// import RelatedProductCard from '../../UI/RelatedProductCard/RelatedProductCard'
import { touchStartHandler } from '../../../utils/SliderTouchEvents'
import NewCard from '../NewCard/NewCard'

const RelatedProducrsSlider = ({ data, className, setmodal, setModalData, setmodalLoading }) => {
	const relatedWrapperRef = useRef(null)

	return (
		<div className={`${styles.related_products_container} ${className}`}>
			<SwiperSlideComponent
				modules={[FreeMode, Autoplay, Navigation]}
				slidesPerView={1}
				spaceBetween={10}
				freeMode={true}
				speed={1500}
				onTouchStart={() => relatedWrapperRef?.current !== null && touchStartHandler(relatedWrapperRef?.current)}
				onTouchMove={() => relatedWrapperRef?.current !== null && touchStartHandler(relatedWrapperRef?.current)}
				onTouchEnd={() => relatedWrapperRef?.current !== null && touchEndHandler(relatedWrapperRef?.current)}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false
				}}
				navigation={{
					prevEl: '.related-button-prev',
					nextEl: '.related-button-next'
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
				className={`${styles.related_products_wrapper} swiper-slide`}
			>
				{data?.map((data, index) => {
					return (
						<SwiperSlide key={data?.id} className='transition'>
							<NewCard data={data} index={index} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} />
							{/* <RelatedProductCard data={data} index={index} setmodal={setmodal} setModalData={setModalData} /> */}
						</SwiperSlide>
					)
				})}
			</SwiperSlideComponent>
			<svg xmlns='http://www.w3.org/2000/svg' className={`${styles.prev_btn} transition radius shadow related-button-prev`} fill='none' viewBox='0 0 24 24' stroke='var(--gray-icon)'>
				<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
			</svg>
			<svg xmlns='http://www.w3.org/2000/svg' className={`${styles.next_btn} transition radius shadow related-button-next`} fill='none' viewBox='0 0 24 24' stroke='var(--gray-icon)'>
				<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
			</svg>
		</div>
	)
}

export default RelatedProducrsSlider

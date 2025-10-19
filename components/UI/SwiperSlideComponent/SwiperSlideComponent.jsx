import React from 'react'
import { Swiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

const SwiperSlideComponent = ({ className, slidesPerView, pagination, spaceBetween, speed, autoplay, breakpoints, freeMode, modules, navigation, loop, centeredSlides, initialSlide, children, onTouchStart, onTouchMove, onTouchEnd, onTransitionEnd, pauseOnMouseEnter, autoHeight, props }) => {
	return (
		<Swiper
			slidesPerView={slidesPerView}
			spaceBetween={spaceBetween}
			pagination={pagination}
			autoHeight={autoHeight}
			speed={speed}
			// pauseOnMouseEnter={true}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			onTransitionEnd={onTransitionEnd}
			autoplay={{
				...autoplay,
				pauseOnMouseEnter: true
			}}
			pauseOnMouseEnter={pauseOnMouseEnter}
			freeMode={freeMode}
			breakpoints={breakpoints}
			navigation={navigation}
			modules={modules}
			loop={loop}
			grabCursor={true}
			initialSlide={initialSlide}
			centeredSlides={centeredSlides}
			className={`mySwiper ${className}`}
			{...props}
		>
			{children}
		</Swiper>
	)
}

export default SwiperSlideComponent

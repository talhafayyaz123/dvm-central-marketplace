import React, { useEffect, useState } from 'react'
import styles from './DealsDiscounts.module.css'
import Image from 'next/image'
import overlay from '/public/imgs/home/overlay.png'
import animal from '/public/imgs/home/animal.png'
import HorizontalCard from '../../../UI/HorizontalCard/HorizontalCard'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'
import Link from 'next/link'

const DealsDiscounts = ({ data, setmodalLoading, setmodal, setModalData }) => {
	const [swiperLoaded, setSwiperLoaded] = useState(false)
	const [SwiperComponent, setSwiperComponent] = useState(null)

	const loadSwiper = async () => {
		const { Swiper, SwiperSlide } = await import('swiper/react')
		const { FreeMode, Pagination } = await import('swiper')

		setSwiperComponent(() => ({
			Swiper,
			SwiperSlide,
			FreeMode,
			Pagination
		}))
		setSwiperLoaded(true)
	}

	useEffect(() => {
		loadSwiper()
	}, [])

	return (
		<section className='sec-container'>
			<div className='sec-m lite-pink-bg'>
				<div className={`${styles.container} radius`}>
					<Image layout='fill' src={animal} alt='Deals and Discounrs' />
					<Image layout='fill' src={overlay} alt='Deals and Discounrs' />
					<div className={styles.wrapper}>
						<div className={styles.content}>
							<h2 className='white-color'>Enjoy Deals & Discounts</h2>
							<p className='white-color'>Get your hands on multiple offers, limited-time discounts, and savings from top animal health product vendors.</p>
						</div>

						{!swiperLoaded ? (
							<>{data?.[0] && <HorizontalCard key={data[0]?.id} data={data[0]} setmodalLoading={setmodalLoading} setmodal={setmodal} setModalData={setModalData} />}</>
						) : (
							SwiperComponent && (
								<SwiperComponent.Swiper
									autoHeight={true}
									slidesPerView={1}
									spaceBetween={10}
									pagination={{
										clickable: true
									}}
									modules={[SwiperComponent.FreeMode, SwiperComponent.Pagination]}
									breakpoints={{
										481: {
											slidesPerView: 2,
											spaceBetween: 10
										},

										769: {
											slidesPerView: 2,
											spaceBetween: 30
										}
									}}
									className={`${styles.slides} mySwiper deals-discount`}
								>
									{data?.map((item) => {
										return (
											<SwiperComponent.SwiperSlide SwiperSlide key={item?.id}>
												<HorizontalCard data={item} setmodalLoading={setmodalLoading} setmodal={setmodal} setModalData={setModalData} />
											</SwiperComponent.SwiperSlide>
										)
									})}
									<Link href='/today-deals'>
										<a style={{ width: 'max-content', margin: '2rem auto 0 auto' }}>
											<button className='white-btn primary-color shadow'>View More</button>
										</a>
									</Link>
								</SwiperComponent.Swiper>
							)
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default DealsDiscounts

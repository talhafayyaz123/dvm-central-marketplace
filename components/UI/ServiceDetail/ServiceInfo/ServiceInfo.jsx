import React, { useContext, useEffect, useRef, useState } from 'react'
import Quantity from './Quantity'
import styles from './ServiceInfo.module.css'
import ServicePrice from './ServicePrice'
import ServiceRating from './ServiceRating'
import { LiteLoader } from '../../../Loader/Loader'
import currencyFormat from '../../../../utils/currencyFormat'
import 'swiper/css/navigation'
import { GlobalProvider } from '../../../../context/AppProvider'
import Wave from '../../../UI/Wave/Wave'
import Link from 'next/link'
import { touchStartHandler, touchEndHandler } from '../../../../utils/SliderTouchEvents'

const ServiceInfo = ({ data }) => {
	const { addTocartItem, cartBtnLoading, cartBtndisabled, clickedProduct, qty, setqty, loginUser, userData } = useContext(GlobalProvider)

	const { service } = data

	const plansSliderRef = useRef(null)

	const [swiperLoaded, setSwiperLoaded] = useState(false)
	const [SwiperComponent, setSwiperComponent] = useState(null)

	const loadSwiper = async () => {
		const { Swiper, SwiperSlide } = await import('swiper/react')
		const { Navigation } = await import('swiper')

		setSwiperComponent(() => ({
			Swiper,
			SwiperSlide,
			Navigation
		}))
		setSwiperLoaded(true)
	}

	useEffect(() => {
		loadSwiper()
	}, [])

	return (
		<>
			<div className={styles.product_detail_container}>
				<h1>{service?.name}</h1>
				<ServiceRating data={data} userPosition={userData?.position} />
				<ServicePrice data={data} />
				<div className={`gray-color ${styles.dynamic_data}`} style={{ marginTop: '1rem' }}>
					<div dangerouslySetInnerHTML={{ __html: service?.short_description }} />
				</div>

				{loginUser?.id !== undefined && userData?.position !== undefined && userData?.position !== 'Sales Rep' && <Quantity qty={qty} setqty={setqty} />}
				{service?.plans?.length > 0 ? (
					<>
						<div className={styles.swipers_btns_wrapper}>
							<h2 className={styles.select_plan}>Select Your Plan</h2>
							{swiperLoaded && (
								<div>
									<svg xmlns='http://www.w3.org/2000/svg' className={`${styles.prev_btn} transition related-button-prev`} fill='none' viewBox='0 0 24 24' stroke='var(--primary)'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M15 19l-7-7 7-7' />
									</svg>
									<svg xmlns='http://www.w3.org/2000/svg' className={`${styles.next_btn} transition related-button-next`} fill='none' viewBox='0 0 24 24' stroke='var(--primary)'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M9 5l7 7-7 7' />
									</svg>
								</div>
							)}
						</div>

						<div ref={plansSliderRef}>
							{!swiperLoaded ? (
								<>
									{service?.plans?.slice(0, 1).map((plan, index) => {
										const { id, service_id, vendor_id, name, type, fee, additional_fee, equipment_fee, terms_and_conditions } = plan
										return (
											<div key={id} className='transition' style={{ marginTop: '1rem' }}>
												<div className={`${styles.plan} radius gray-border`}>
													<div className={`gradient-sec white-color ${styles.info}`}>
														<Wave />
														<div className={styles.type}>{type}</div>
														{name !== null && <div className={styles.name}>{name}</div>}
													</div>

													<div className={`${styles.price} ${styles.plan_price} full-radius gradient-sec`}> ${Number(fee).toFixed(0)}</div>
													<div className={`white-bg ${styles.others} semibold-text`}>
														{additional_fee !== null && <div>Additional license fee: {currencyFormat(additional_fee)}</div>}
														{equipment_fee !== null && <div>Equipment fee: {currencyFormat(equipment_fee)}</div>}
														<div className='dynamic-data' dangerouslySetInnerHTML={{ __html: terms_and_conditions }} />

														{loginUser?.id !== undefined ? (
															userData?.position !== undefined &&
															userData?.position !== 'Sales Rep' && (
																<button disabled={cartBtndisabled} className='primary-btn' onClick={() => addTocartItem(id, vendor_id, qty, index, 'addition', 'service-provider-seller', service_id)}>
																	Add to Cart {cartBtnLoading && clickedProduct === index && <LiteLoader className={styles.cart_loader} />}
																</button>
															)
														) : (
															<Link href='/auth/signin'>
																<a>
																	<button className='primary-btn'>Signin to Add Plan</button>
																</a>
															</Link>
														)}
													</div>
												</div>
											</div>
										)
									})}
								</>
							) : (
								SwiperComponent && (
									<SwiperComponent.Swiper
										modules={[SwiperComponent.Navigation]}
										slidesPerView={'auto'}
										spaceBetween={10}
										freeMode={true}
										onTouchStart={() => touchStartHandler(plansSliderRef?.current)}
										onTouchMove={() => touchStartHandler(plansSliderRef?.current)}
										onTouchEnd={() => touchEndHandler(plansSliderRef?.current)}
										navigation={{
											prevEl: '.related-button-prev',
											nextEl: '.related-button-next'
										}}
										className={`${styles.swiper_container} ${service?.plans?.length !== 1 ? `plans-container` : undefined}`}
									>
										{service?.plans?.map((plan, index) => {
											const { id, service_id, vendor_id, name, type, fee, additional_fee, equipment_fee, terms_and_conditions } = plan
											return (
												<SwiperComponent.SwiperSlide key={id} className='transition'>
													<div className={`${styles.plan} radius gray-border`}>
														<div className={`gradient-sec white-color ${styles.info}`}>
															<Wave />
															<div className={styles.type}>{type}</div>
															{name !== null && <div className={styles.name}>{name}</div>}
														</div>

														<div className={`${styles.price} ${styles.plan_price} full-radius gradient-sec`}> ${Number(fee).toFixed(0)}</div>
														<div className={`white-bg ${styles.others} semibold-text`}>
															{additional_fee !== null && <div>Additional license fee: {currencyFormat(additional_fee)}</div>}
															{equipment_fee !== null && <div>Equipment fee: {currencyFormat(equipment_fee)}</div>}
															<div className='dynamic-data' dangerouslySetInnerHTML={{ __html: terms_and_conditions }} />

															{loginUser?.id !== undefined ? (
																userData?.position !== undefined &&
																userData?.position !== 'Sales Rep' && (
																	<button disabled={cartBtndisabled} className='primary-btn' onClick={() => addTocartItem(id, vendor_id, qty, index, 'addition', 'service-provider-seller', service_id)}>
																		Add to Cart {cartBtnLoading && clickedProduct === index && <LiteLoader className={styles.cart_loader} />}
																	</button>
																)
															) : (
																<Link href='/auth/signin'>
																	<a>
																		<button className='primary-btn'>Signin to Add Plan</button>
																	</a>
																</Link>
															)}
														</div>
													</div>
												</SwiperComponent.SwiperSlide>
											)
										})}
									</SwiperComponent.Swiper>
								)
							)}
						</div>
					</>
				) : (
					<div className='red-color' style={{ marginTop: '1rem' }}>
						No plan is found...
					</div>
				)}
			</div>
		</>
	)
}

export default ServiceInfo

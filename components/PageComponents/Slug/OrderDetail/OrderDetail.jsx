import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './OrderDetail.module.css'
import DashboardHeading from '../../../UI/DashboardHeading/DashboardHeading'
import Link from 'next/link'
import currencyFormat from '../../../../utils/currencyFormat'
import { baseApiUrl, imgApiUrl, siteUrl } from '../../../../utils/config'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import Modal from '../../../UI/Modal/Modal'
import Submit from '../Product/TabContent/ReviewsAndSubmit/Submit/Submit'
import { lockScroll } from '../../../../utils/scrollLock'
import ChatModal from '../Vendor/Hero/ChatModal/ChatModal'
import axios from 'axios'
import getTimezoneDate from '../../../../utils/getTimezoneDate'
import { GlobalProvider } from '../../../../context/AppProvider'
import NotAuthorized from '../../../UI/NotAuthorized/NotAuthorized'
import { DarkLoader } from '../../../Loader/Loader'

const OrderDetail = (result) => {
	const { order } = result?.result

	const [showChatModal, setshowChatModal] = useState(false)
	const [localTime12HoursBase, setLocalTime12HoursBase] = useState('')
	const [pmAm, setPmAm] = useState('')
	const [date, setdate] = useState('')
	const [chatLoading, setchatLoading] = useState(false)
	const [chatData, setchatData] = useState([])
	const [chatLoaded, setchatLoaded] = useState(false)
	const [vendorId, setvendorId] = useState(null)
	const [vendorName, setvendorName] = useState('')
	const [chatUpdating, setchatUpdating] = useState(false)

	const { loginUser, userData } = useContext(GlobalProvider)
	const [productId, setproductId] = useState(null)
	const [modal, setmodal] = useState(false)

	const chatApiRef = useRef(null)

	const reviewHandler = (id) => {
		lockScroll()
		setproductId(id)
		setmodal(true)
	}

	// chat message listing
	const chatModalHandler = async (id) => {
		setvendorId((prev) => (id !== undefined ? id : prev))
		!chatLoading && setchatLoading(true)

		const data = {
			vendor_id: id !== undefined ? id : vendorId,
			customer_id: loginUser?.id
		}

		const res = await axios.post(`${baseApiUrl}/chat-box/user`, data)
		setchatData([...res?.data?.user_chat]?.reverse())
		setchatLoaded(true)
		setTimeout(
			() => {
				if (!chatUpdating) {
					const chat = document.querySelector('.chat-group-wrapper')
					chat.scrollTop = chat.scrollHeight

					chatLoading && setchatLoading(false)
				}
			},
			chatLoaded ? 1000 : 0
		)
		!chatUpdating && setchatUpdating(true)
	}

	useEffect(() => {
		if (showChatModal && chatUpdating && loginUser?.id !== undefined) {
			chatApiRef.current = setInterval(() => {
				chatModalHandler(vendorId)
			}, 2000)
			return () => {
				if (chatApiRef.current !== null) clearInterval(chatApiRef.current)
			}
		}
	}, [showChatModal, chatUpdating, chatApiRef && loginUser])

	useEffect(() => {
		const [date, localTime12HoursBase, pmAm] = getTimezoneDate(order?.date_and_time)
		setdate(date)
		setLocalTime12HoursBase(localTime12HoursBase)
		setPmAm(pmAm)
	}, [])

	return userData?.position !== undefined && userData?.position !== 'Sales Rep' ? (
		<>
			{/* review modal */}
			<Modal modal={modal} setmodal={setmodal} modalType='review'>
				<div className={`${styles.reveiw} radius`}>
					<Submit modal={modal} setmodal={setmodal} productId={productId} loginUser={loginUser} userPosition={userData?.position} className={styles.files_wrapper} />
				</div>
			</Modal>

			<ChatModal
				showChatModal={showChatModal}
				setshowChatModal={setshowChatModal}
				chatLoading={chatLoading}
				chatData={chatData}
				setchatData={setchatData}
				vendorId={vendorId}
				customerId={loginUser?.id}
				chatModalHandler={chatModalHandler}
				vendorName={vendorName}
				chatUpdating={chatUpdating}
				setchatUpdating={setchatUpdating}
			/>

			<section className='sec-m white-bg'>
				<div className='sec-container'>
					<DashboardHeading heading='Order Details' />
					<div className={`${styles.order_wrapper} white-bg`}>
						{result?.result?.success === false ? (
							<div className={styles.no_detail}>{result?.result?.message}</div>
						) : (
							<>
								<div className={`${styles.order_id_wrapper}`}>
									<div className='gray-color'>
										<a className='semibold-text black-color'>
											Order # <span className='primary-color'>{order?.main_order_id}</span>
										</a>
										<div className={styles.date}>
											Placed on {date} {localTime12HoursBase?.slice(0, localTime12HoursBase?.lastIndexOf(':'))} {pmAm}
										</div>
									</div>
									<div className={`${styles.total} semibold-text primary-color`}>Total: {currencyFormat(order?.grand_total)}</div>
								</div>
								{order?.vendororders?.map((vendor, index) => {
									const { vendor_order_id, vendor_name, shipping_service, deliverOrdertime, vendor_slug, vendor_items, order_status, order_updates, vendor_user_id, cancel_reason, tracking_url } = vendor
									let newLocalTime12HoursBase, newDate, newPmAm

									if (deliverOrdertime !== null) {
										const [date, localTime12HoursBase, pmAm] = getTimezoneDate(deliverOrdertime)
										newDate = date
										newLocalTime12HoursBase = localTime12HoursBase
										newPmAm = pmAm
									}

									return (
										<div key={vendor_order_id} className={`${styles.vendor_wrapper} white-bg sml-shadow`}>
											<div className={`${styles.package_wrapper}`}>
												<div className={`${styles.package_vendor} gray-color`}>
													<a className={`${styles.package} semibold-text black-color`}>
														<svg fill='var(--black)' width='30px' height='30px' viewBox='0 0 100 100' data-name='Layer 1' id='Layer_1' xmlns='http://www.w3.org/2000/svg'>
															<path d='M56,81.29a1.5,1.5,0,0,1-.45-2.93l16.46-5.15a1.5,1.5,0,0,1,.9,2.86L56.49,81.22A1.41,1.41,0,0,1,56,81.29Z' />
															<path d='M56,74.29a1.5,1.5,0,0,1-.45-2.93l10.53-3.29A1.5,1.5,0,1,1,67,70.93L56.49,74.22A1.41,1.41,0,0,1,56,74.29Z' />
															<path d='M23.32,54.08h0Z' />
															<path d='M23.26,30.08A.94.94,0,0,0,23,30a.05.05,0,0,0,0,0h.06A1.37,1.37,0,0,1,23.26,30.08Z' />
															<path d='M37.74,35.48a1.41,1.41,0,0,0-.37.8,1,1,0,0,1,.05-.3,1.59,1.59,0,0,1,.22-.43Z' />
															<path d='M89.37,28a.51.51,0,0,0,0-.17.84.84,0,0,0,0-.17,1.11,1.11,0,0,0-.07-.16,1.24,1.24,0,0,0-.31-.42L88.77,27a1.22,1.22,0,0,0-.29-.17l-.08,0-26.06-11L50.87,10.94l-.09,0a1.29,1.29,0,0,0-.26-.08,1.38,1.38,0,0,0-.64,0,1.29,1.29,0,0,0-.26.08l-.06,0-38,15.8h0a1.3,1.3,0,0,0-.26.14h0a.66.66,0,0,0-.15.14.24.24,0,0,0-.1.1,1.43,1.43,0,0,0-.34.6,1.34,1.34,0,0,0-.06.4V76.87A1.49,1.49,0,0,0,11.7,78.3L49.16,90h0l1.42.17L70,84.11h0l18.27-5.72a1.48,1.48,0,0,0,1-1.43V28.19A1.09,1.09,0,0,0,89.37,28ZM48.54,86.67l-34.9-10.9V30.14l7.28,2.28V52.66a1.51,1.51,0,0,0,1,1.42l.23.08.12,0h0l.1,0a1.09,1.09,0,0,0,.26,0h.11a.18.18,0,0,0,.1,0,.4.4,0,0,0,.15,0l.23-.07,0,0h0a.6.6,0,0,0,.15-.09.61.61,0,0,0,.16-.12l.08-.07,6.82-6,7,10.92.09.15a1.51,1.51,0,0,0,1,.68h.44a.28.28,0,0,0,.13,0,.19.19,0,0,0,.1,0l.12,0a1,1,0,0,0,.23-.12l0,0a1.24,1.24,0,0,0,.22-.18L40,59a1.09,1.09,0,0,0,.13-.17.94.94,0,0,0,.14-.26,1.31,1.31,0,0,0,.09-.28,1.53,1.53,0,0,0,0-.3V38.5l8.18,2.55ZM38.37,35l-.1.07-.53.4a1.41,1.41,0,0,0-.37.8,1.09,1.09,0,0,0,0,.18V52.88l-5.2-8.14a.25.25,0,0,0,0-.08,1,1,0,0,0-.13-.18,1.8,1.8,0,0,0-.21-.19.79.79,0,0,0-.23-.14l-.14-.07a.64.64,0,0,0-.18-.06L31,44a1.27,1.27,0,0,0-.39,0l-.21,0a1.19,1.19,0,0,0-.35.15l-.2.14,0,0-.12.11-5.83,5.16V32.81a.92.92,0,0,0,.27-.08l16.57-6.89,9.42,4.26Zm11.8,3.41-6.94-2.18,11.3-4.7.24-.13a1.24,1.24,0,0,0,.22-.18,1.39,1.39,0,0,0,.33-.46s0,0,0,0a1.13,1.13,0,0,0,.08-.24.15.15,0,0,0,0-.07,1.09,1.09,0,0,0,0-.26,1.47,1.47,0,0,0-.07-.46s0-.09-.05-.13a2,2,0,0,0-.1-.21l-.13-.18a1.26,1.26,0,0,0-.2-.2l-.07,0a.87.87,0,0,0-.26-.16L41.51,22.89h-.07a1.43,1.43,0,0,0-1.23,0L23.06,30a1.37,1.37,0,0,1,.2.13A.94.94,0,0,0,23,30a.05.05,0,0,0,0,0,.31.31,0,0,0-.13-.06l-6.33-2,33.66-14,11,4.63L83.52,28ZM86.38,75.85,69.16,81.24,51.54,86.75V41.13l34.84-10.9Z' />
															<path d='M23.26,30.08A.94.94,0,0,0,23,30h0A1.37,1.37,0,0,1,23.26,30.08Z' />
															<path d='M37.74,35.48a1.41,1.41,0,0,0-.37.8,1.09,1.09,0,0,0,0,.18v.27a1.46,1.46,0,0,1,.28-1.18Z' />
															<path d='M23.31,54.08h0Z' />
														</svg>
														Package {index + 1}
													</a>
													<div className={styles.date}>
														Sold by{' '}
														<Link href={`/vendors/${vendor_slug}`}>
															<a className='primary-color link semibold-text'>{vendor_name}</a>
														</Link>
													</div>
												</div>
												{loginUser?.id !== undefined ? (
													<button className={`${styles.total} primary-bg white-color sml-btn`} onClick={() => (setshowChatModal(true), chatModalHandler(vendor_user_id), setvendorName(vendor_name))}>
														Chat with Seller{' '}
														<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--white)'>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
															/>
														</svg>
													</button>
												) : (
													<a href={`${siteUrl}auth/signin`}>
														<button className={`${styles.total} primary-bg white-color sml-btn`}>
															Sign in to Start Chat{' '}
															<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--white)'>
																<path
																	strokeLinecap='round'
																	strokeLinejoin='round'
																	d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
																/>
															</svg>
														</button>
													</a>
												)}
											</div>

											<div className={styles.delivery_details_wrapper}>
												<div className={`${styles.delivery_detail} gray-color`}>
													<div className={styles.delivery_wrapper}>
														{deliverOrdertime && <div className={styles.delivery}>{`Delivered on ${newDate} ${newLocalTime12HoursBase.slice(0, newLocalTime12HoursBase.lastIndexOf(':'))} ${newPmAm}`}</div>}
														{tracking_url && (
															<a href={tracking_url} target='__blank' rel='noreferrer' style={{ marginTop: deliverOrdertime ? '0.5rem' : '0' }}>
																<button className='sml-btn primary-border white-bg primary-color'>
																	Track Delivery Status{' '}
																	<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)'>
																		<path
																			strokeLinecap='round'
																			strokeLinejoin='round'
																			d='M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
																		/>
																	</svg>
																</button>
															</a>
														)}
													</div>

													{shipping_service && (
														<div className={styles.delivery_method}>
															<svg fill='var(--black)' width='30px' height='30px' viewBox='0 0 100 100' data-name='Layer 1' id='Layer_1' xmlns='http://www.w3.org/2000/svg'>
																<path d='M56,81.29a1.5,1.5,0,0,1-.45-2.93l16.46-5.15a1.5,1.5,0,0,1,.9,2.86L56.49,81.22A1.41,1.41,0,0,1,56,81.29Z' />
																<path d='M56,74.29a1.5,1.5,0,0,1-.45-2.93l10.53-3.29A1.5,1.5,0,1,1,67,70.93L56.49,74.22A1.41,1.41,0,0,1,56,74.29Z' />
																<path d='M23.32,54.08h0Z' />
																<path d='M23.26,30.08A.94.94,0,0,0,23,30a.05.05,0,0,0,0,0h.06A1.37,1.37,0,0,1,23.26,30.08Z' />
																<path d='M37.74,35.48a1.41,1.41,0,0,0-.37.8,1,1,0,0,1,.05-.3,1.59,1.59,0,0,1,.22-.43Z' />
																<path d='M89.37,28a.51.51,0,0,0,0-.17.84.84,0,0,0,0-.17,1.11,1.11,0,0,0-.07-.16,1.24,1.24,0,0,0-.31-.42L88.77,27a1.22,1.22,0,0,0-.29-.17l-.08,0-26.06-11L50.87,10.94l-.09,0a1.29,1.29,0,0,0-.26-.08,1.38,1.38,0,0,0-.64,0,1.29,1.29,0,0,0-.26.08l-.06,0-38,15.8h0a1.3,1.3,0,0,0-.26.14h0a.66.66,0,0,0-.15.14.24.24,0,0,0-.1.1,1.43,1.43,0,0,0-.34.6,1.34,1.34,0,0,0-.06.4V76.87A1.49,1.49,0,0,0,11.7,78.3L49.16,90h0l1.42.17L70,84.11h0l18.27-5.72a1.48,1.48,0,0,0,1-1.43V28.19A1.09,1.09,0,0,0,89.37,28ZM48.54,86.67l-34.9-10.9V30.14l7.28,2.28V52.66a1.51,1.51,0,0,0,1,1.42l.23.08.12,0h0l.1,0a1.09,1.09,0,0,0,.26,0h.11a.18.18,0,0,0,.1,0,.4.4,0,0,0,.15,0l.23-.07,0,0h0a.6.6,0,0,0,.15-.09.61.61,0,0,0,.16-.12l.08-.07,6.82-6,7,10.92.09.15a1.51,1.51,0,0,0,1,.68h.44a.28.28,0,0,0,.13,0,.19.19,0,0,0,.1,0l.12,0a1,1,0,0,0,.23-.12l0,0a1.24,1.24,0,0,0,.22-.18L40,59a1.09,1.09,0,0,0,.13-.17.94.94,0,0,0,.14-.26,1.31,1.31,0,0,0,.09-.28,1.53,1.53,0,0,0,0-.3V38.5l8.18,2.55ZM38.37,35l-.1.07-.53.4a1.41,1.41,0,0,0-.37.8,1.09,1.09,0,0,0,0,.18V52.88l-5.2-8.14a.25.25,0,0,0,0-.08,1,1,0,0,0-.13-.18,1.8,1.8,0,0,0-.21-.19.79.79,0,0,0-.23-.14l-.14-.07a.64.64,0,0,0-.18-.06L31,44a1.27,1.27,0,0,0-.39,0l-.21,0a1.19,1.19,0,0,0-.35.15l-.2.14,0,0-.12.11-5.83,5.16V32.81a.92.92,0,0,0,.27-.08l16.57-6.89,9.42,4.26Zm11.8,3.41-6.94-2.18,11.3-4.7.24-.13a1.24,1.24,0,0,0,.22-.18,1.39,1.39,0,0,0,.33-.46s0,0,0,0a1.13,1.13,0,0,0,.08-.24.15.15,0,0,0,0-.07,1.09,1.09,0,0,0,0-.26,1.47,1.47,0,0,0-.07-.46s0-.09-.05-.13a2,2,0,0,0-.1-.21l-.13-.18a1.26,1.26,0,0,0-.2-.2l-.07,0a.87.87,0,0,0-.26-.16L41.51,22.89h-.07a1.43,1.43,0,0,0-1.23,0L23.06,30a1.37,1.37,0,0,1,.2.13A.94.94,0,0,0,23,30a.05.05,0,0,0,0,0,.31.31,0,0,0-.13-.06l-6.33-2,33.66-14,11,4.63L83.52,28ZM86.38,75.85,69.16,81.24,51.54,86.75V41.13l34.84-10.9Z' />
																<path d='M23.26,30.08A.94.94,0,0,0,23,30h0A1.37,1.37,0,0,1,23.26,30.08Z' />
																<path d='M37.74,35.48a1.41,1.41,0,0,0-.37.8,1.09,1.09,0,0,0,0,.18v.27a1.46,1.46,0,0,1,.28-1.18Z' />
																<path d='M23.31,54.08h0Z' />
															</svg>
															Delivery Method: <span className='primary-color'>{shipping_service}</span>
														</div>
													)}
												</div>
											</div>

											<h3 className={styles.status}>Order # {vendor_order_id} Status</h3>

											{/* steps */}
											{order_status !== 'Cancel' ? (
												<div className={`${styles.steps_wrapper}`}>
													{/* pending */}
													<div className={styles.icon_container}>
														<div className={`${styles.icon} ${styles.active_icon} gray-border full-radius`} />
														<div className={`${styles.step_title} ${styles.basic_details} ${styles.active_title}`}>Pending</div>
													</div>

													<div className={`${styles.setp} ${(order_status == 'Processing' || order_status == 'Dispatched' || order_status == 'Delivered') && styles.active_step} gray-bg`} />

													{/* processing */}
													<div className={styles.icon_container}>
														<div className={`${styles.icon} ${(order_status == 'Processing' || order_status == 'Dispatched' || order_status == 'Delivered') && styles.active_icon} gray-border full-radius`} />

														<div className={`${styles.step_title} ${(order_status == 'Processing' || order_status == 'Dispatched' || order_status == 'Delivered') && styles.active_title}`}>Processing</div>
													</div>

													<div className={`${styles.setp} ${(order_status == 'Dispatched' || order_status == 'Delivered') && styles.active_step} gray-bg`} />

													{/* in-transit */}
													<div className={styles.icon_container}>
														<div className={`${styles.icon} ${(order_status == 'Dispatched' || order_status == 'Delivered') && styles.active_icon} gray-border full-radius`} />

														<div className={`${styles.step_title} ${(order_status == 'Dispatched' || order_status == 'Delivered') && styles.active_title}`}>In Transit</div>
													</div>

													<div className={`${styles.setp} ${order_status == 'Dispatched' && styles.active_step} gray-bg`} />

													{/* delivered */}
													<div className={styles.icon_container}>
														<div className={`${styles.icon} ${order_status == 'Dispatched' && styles.active_icon} gray-border full-radius`} />

														<div className={`${styles.step_title} ${order_status == 'Dispatched' && styles.active_title}`}>Delivered</div>
													</div>
												</div>
											) : (
												<div className={styles.cancelled}>
													<h4 className='primary-color'>Cancelled</h4>
													<p className='gray-color'>{cancel_reason}</p>
												</div>
											)}

											{/* order updates timeline */}
											{order_updates?.length > 0 && (
												<div className={`${styles.updates_wrapper} gray-border`}>
													{order_updates?.map((update, index) => {
														const { date_and_time, message } = update
														const [date, localTime12HoursBase, pmAm] = getTimezoneDate(date_and_time)

														return (
															<div key={index} className={styles.update}>
																<div className='gray-color'>
																	{date} {localTime12HoursBase.slice(0, localTime12HoursBase.lastIndexOf(':'))} {pmAm}
																</div>
																<div>{message}</div>
															</div>
														)
													})}
												</div>
											)}

											{/* items */}
											<div className={styles.items_wrapper}>
												{vendor_items?.map((item) => {
													const { id, product_id, name, sku, quantity, image, price, slug } = item

													return (
														<div key={id} className={`${styles.item} gray-color`}>
															<Link href={`/${slug}`}>
																<a className={styles.img_name_wrapper}>
																	<ImgWithLoader className={`${styles.img} gray-border radius`} src={`${imgApiUrl?.products?.thumbnail}/${image}`} width={100} height={100} />
																	<div>
																		<div className={styles.name}>{name}</div>
																		<div className={`${styles.sku} black-color`}>
																			SKU: <span className='primary-color'>{sku}</span>
																		</div>
																	</div>
																</a>
															</Link>
															<div className={styles.qty_price_wrapper}>
																<div className={styles.qty}>
																	<span>Qty: </span>
																	<span className='black-color'>{quantity}</span>
																</div>
																<div className={`${styles.price} semibold-text black-color`}>{currencyFormat(price)}</div>

																<button className='sml-btn white-btn primary-border primary-color' onClick={() => reviewHandler(product_id)}>
																	Write a Review{' '}
																	<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--primary)'>
																		<path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125' />
																	</svg>
																</button>
															</div>
														</div>
													)
												})}
											</div>
										</div>
									)
								})}
							</>
						)}
					</div>
				</div>
			</section>
		</>
	) : userData?.position !== undefined ? (
		<NotAuthorized heading='You are not authorized to access this page.' />
	) : (
		<DarkLoader className={styles.loader} />
	)
}

export default OrderDetail

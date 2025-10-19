import axios from 'axios'
import Image from 'next/image'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { baseApiUrl, imgApiUrl, siteUrl } from '../../../../../utils/config'
import Rating from '../../../../UI/Rating/Rating'
import styles from './Hero.module.css'
import { LiteLoader } from '../../../../Loader/Loader'
import ChatModal from './ChatModal/ChatModal'
import noImg from '../../../.././../public/imgs/no-img.webp'
import headerBg from '../../../../../public/imgs/banner.jpg'
import Wave from '../../../../UI/Wave/Wave'
import ImgWithLoader from '../../../../UI/ImgWithLoader/ImgWithLoader'
import { GlobalProvider } from '../../../../../context/AppProvider'
import { useRouter } from 'next/router'
// import Modal from '../../../../UI/Modal/Modal'
// import ContactVendor from '../HotSelling/LeftColContent/ContactVendor/ContactVendor'
// import { lockScroll } from '../../../../../utils/scrollLock'

const Hero = (result) => {
	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [checkuseFollowing, setcheckuseFollowing] = useState('')
	const [checkingFollowStatus, setcheckingFollowStatus] = useState(true)
	const [totalFollowers, settotalFollowers] = useState(result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.followers : result?.result?.vendor?.followers)
	const [showChatModal, setshowChatModal] = useState(false)
	const [chatLoading, setchatLoading] = useState(false)
	const [chatData, setchatData] = useState([])
	const [chatLoaded, setchatLoaded] = useState(false)
	const [chatUpdating, setchatUpdating] = useState(false)
	const [messageCount, setmessageCount] = useState()
	const [clearCountInterval, setclearCountInterval] = useState(false)

	// const [showMeetingModal, setshowMeetingModal] = useState(false)
	const { setresMsgforPopup, setpopupSuccess, setshowresMsg, loginUser } = useContext(GlobalProvider)

	const chatApiRef = useRef(null)
	const countRef = useRef(null)

	const router = useRouter()

	let vendorId = result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.user : result?.result?.vendor?.user
	const customerId = loginUser?.id

	// follow and unfollow handler
	const vendorFollowHandler = async () => {
		setloading(true)
		setbtndisabled(true)
		const data = {
			customer_id: loginUser?.id,
			vendor_id: result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.id : result?.result?.vendor?.id
		}

		const res = await axios.post(`${baseApiUrl}/follow`, data)
		setcheckuseFollowing(() => (res?.data?.type === 'Follow' ? 'Following' : 'Follow'))
		settotalFollowers((prev) => (res?.data?.type === 'Follow' ? prev + 1 : prev - 1))
		setloading(false)
		setbtndisabled(false)
	}

	// check follow status of user
	const checkFollow = async () => {
		setcheckingFollowStatus(true)
		const data = {
			customer_id: loginUser?.id,
			vendor_id: result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.id : result?.result?.vendor?.id
		}
		const res = await axios.post(`${baseApiUrl}/check-following`, data)
		setcheckuseFollowing(() => (res?.data?.success === true ? 'Following' : 'Follow'))
		setcheckingFollowStatus(false)
	}

	// check follow status on window load or session changes
	useEffect(() => {
		loginUser?.id !== undefined && checkFollow()
	}, [loginUser?.email])

	// chat message listing
	const chatModalHandler = async () => {
		setclearCountInterval(true)
		!chatLoading && setchatLoading(true)

		setshowChatModal(true)
		const data = {
			vendor_id: vendorId,
			customer_id: customerId
		}

		const res = await axios.post(`${baseApiUrl}/chat-box/user`, data)
		console.log('res form cht', res)

		if (res?.data?.ReceiveNewMsg) {
			console.log('new msg')
			setresMsgforPopup(`New message recieved from ${result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.name : result?.result?.vendor?.name}`)
			setpopupSuccess(true)
			setshowresMsg(true)
			setTimeout(() => {
				setshowresMsg(false)
			}, 3000)
		}

		setchatData([...res?.data?.user_chat]?.reverse())
		setchatLoaded(true)
		setTimeout(() => {
			setmessageCount(0)
		}, 1100)
		setTimeout(
			() => {
				if (!chatUpdating) {
					const chat = document.querySelector('.chat-group-wrapper')
					chat.scrollTop = chat.scrollHeight
					chatLoading && setchatLoading(false)
					!chatUpdating && setchatUpdating(true)
				}
			},
			chatLoaded ? 1000 : 0
		)
	}

	useEffect(() => {
		router?.asPath?.includes('#chat') && (chatModalHandler(vendorId), setshowChatModal(true))
	}, [])

	const MessageCount = async () => {
		const body = {
			user_id: loginUser?.id,
			vendor_id: result?.result?.page_type === 'Shop_Vendor' ? result?.result?.vendor_id : result?.result?.serviceProviderDetail?.id
		}
		const res = await axios.post(`${baseApiUrl}/messages-count`, body)
		res?.data?.success && setmessageCount(res?.data?.data?.msgCount)
	}

	useEffect(() => {
		if (!showChatModal && loginUser?.id !== undefined) {
			countRef.current = setInterval(() => {
				MessageCount()
			}, 3000)
			return () => {
				if (countRef?.current !== null) {
					clearInterval(countRef.current)
				}
			}
		}
	}, [loginUser, countRef, countRef?.current, clearCountInterval])

	useEffect(() => {
		if (showChatModal && chatUpdating && loginUser?.id !== undefined) {
			chatApiRef.current = setInterval(() => {
				chatModalHandler(vendorId)
			}, 2000)
			return () => {
				if (chatApiRef.current !== null) clearInterval(chatApiRef.current)
			}
		}
	}, [showChatModal, chatUpdating, chatApiRef, loginUser])

	return (
		<section className={styles.vendor_hero}>
			{/* <Modal modal={showMeetingModal} setmodal={setshowMeetingModal}>
				{showMeetingModal && <ContactVendor type='meeting' vendorName={result?.result?.vendor?.name} user={loginUser} setshowMeetingModal={setshowMeetingModal} />}
			</Modal> */}

			{/* {showChatModal && (
				<div> */}
			<ChatModal
				type='vendor_interval_chat'
				showChatModal={showChatModal}
				setclearCountInterval={setclearCountInterval}
				setshowChatModal={setshowChatModal}
				chatLoading={chatLoading}
				chatData={chatData}
				// setchatData={setchatData}
				vendorId={vendorId}
				customerId={customerId}
				chatModalHandler={chatModalHandler}
				vendorName={result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.name : result?.result?.vendor?.name}
				chatUpdating={chatUpdating}
				setchatUpdating={setchatUpdating}
			/>
			{/* </div>
			)} */}
			{/* {(result?.result?.page_type === 'Shop_vendor' ? result?.result?.vendor?.header_image !== null : result?.result?.serviceProviderDetail?.header_image !== null) && (
				<ImgWithLoader
					className={styles.header_image_wrapper}
					priority
					layout='fill'
					src={`${imgApiUrl.vendor.header_banner}/${result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.header_image : result?.result?.vendor?.header_image}`}
					alt={result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.name : result?.result?.vendor?.name}
				/>
			)} */}
			{(result?.result?.page_type === 'Shop_vendor' || result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.vendor?.header_image !== null : result?.result?.serviceProviderDetail?.header_image !== null) && (
				<ImgWithLoader
					unoptimized={result?.result?.page_type === 'Service_Provider_seller' ? (result?.result?.serviceProviderDetail?.header_image === null ? true : false) : result?.result?.vendor?.header_image === null ? true : false}
					className={`${styles.header_image_wrapper} ${
						(result?.result?.page_type === 'Service_Provider_seller' && result?.result?.serviceProviderDetail?.header_image === null && result?.result?.serviceProviderDetail?.name !== null) || (result?.result?.vendor?.header_image === null && result?.result?.vendor?.name !== null)
							? styles.noheader_img
							: undefined
					}`}
					priority
					layout='fill'
					src={
						result?.result?.page_type === 'Service_Provider_seller'
							? result?.result?.serviceProviderDetail?.header_image !== null
								? `${imgApiUrl.vendor.header_banner}/${result?.result?.serviceProviderDetail?.header_image}`
								: headerBg
							: result?.result?.vendor?.header_image !== null
							? `${imgApiUrl.vendor.header_banner}/${result?.result?.vendor?.header_image}`
							: headerBg
					}
					alt={result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.name : result?.result?.vendor?.name}
				>
					{((result?.result?.page_type === 'Service_Provider_seller' && result?.result?.serviceProviderDetail?.header_image === null && result?.result?.serviceProviderDetail?.name !== null) || (result?.result?.vendor?.header_image === null && result?.result?.vendor?.name !== null)) && (
						<h1>
							{result?.result?.page_type === 'Service_Provider_seller' && result?.result?.serviceProviderDetail?.header_image === null && result?.result?.serviceProviderDetail?.name !== null
								? result?.result?.serviceProviderDetail?.name
								: result?.result?.vendor?.header_image === null && result?.result?.vendor?.name !== null && result?.result?.vendor?.name}
						</h1>
					)}
				</ImgWithLoader>
			)}
			<div className={`${styles.vendor_info_container} gradient-sec`}>
				<div className={`${styles.vendor_info_wrapper} sec-container`}>
					<Wave />
					{/* logo, rating, info */}
					<div className={styles.info_inner_container}>
						<div className={styles.logo_vendor_wrapper}>
							<div className={styles.logo_rating}>
								<div className={`${styles.logo_wrapper} ${(result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.header_image !== null : result?.result?.vendor?.header_image !== null) ? styles.with_header : undefined} white-bg radius shadow`}>
									<Image
										priority
										layout='fill'
										src={
											result?.result?.page_type === 'Service_Provider_seller'
												? result?.result?.serviceProviderDetail?.logo !== null
													? `${imgApiUrl.vendor.logo}/${result?.result?.serviceProviderDetail?.logo}`
													: noImg
												: result?.result?.vendor?.logo !== null
												? `${imgApiUrl.vendor.logo}/${result?.result?.vendor?.logo}`
												: noImg
										}
										alt={result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.name : result?.result?.vendor?.name}
									/>
								</div>
								<div className={styles.vendor_rating_wrapper}>
									{result?.result?.page_type === 'Service_Provider_seller'
										? result?.result?.serviceProviderDetail?.name !== null && <div className={`${styles.vendor_name} white-color`}>{result?.result?.serviceProviderDetail?.name}</div>
										: result?.result?.vendor?.name !== null && <div className={`${styles.vendor_name} white-color`}>{result?.result?.vendor?.name}</div>}
									{(result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.rating > 0 : result?.result?.vendor?.rating > 0) && (
										<div className={`${styles.rating} white-color`}>
											<Rating data={result?.result?.vendor?.rating} type='card' />
											<span className={styles.rating_count}>
												{result?.result?.vendor?.rating_counts} rating
												{result?.result?.vendor?.rating_counts > 1 && 's'}
											</span>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* rating and followers */}
						<div className={`${styles.rating_info} white-color`}>
							<div className={styles.wrapper}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--white)'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
									/>
								</svg>
								{result?.result?.page_type === 'Service_Provider_seller' ? result?.result?.serviceProviderDetail?.positive_seller_rating.toFixed(2) : result?.result?.vendor?.positive_seller_rating.toFixed(2)}% Positive Seller Ratings
							</div>
							<div className={styles.wrapper}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--white)'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
									/>
								</svg>
								<span>
									{totalFollowers} Follower{totalFollowers > 1 ? 's' : ''}
								</span>
							</div>
						</div>

						{/* follow and chat buttons */}
						<div className={styles.btn_wrapper}>
							{loginUser?.id !== undefined ? (
								<div className={styles.wrapper}>
									{checkingFollowStatus ? (
										<LiteLoader loaderType='sml' className={styles.follow_loader} />
									) : (
										<button className={`${styles.follow_btn} sml-btn white-color`} disabled={btndisabled} onClick={() => vendorFollowHandler()}>
											{checkuseFollowing} {loading && <LiteLoader loaderType='sml' className={styles.loader} />}
										</button>
									)}
									<button className={`${styles.chat_btn} sml-btn white-btn primary-color`} onClick={() => chatModalHandler()}>
										Chat {messageCount > 0 && <div className={`${styles.cart_qty} ${styles.badge} primary-color`}>{messageCount > 99 ? '99+' : messageCount}</div>}
									</button>
								</div>
							) : (
								<a href={`${siteUrl}auth/signin`}>
									<button className={`${styles.chat_btn} sml-btn`}>Sign in to Follow or chat</button>
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero

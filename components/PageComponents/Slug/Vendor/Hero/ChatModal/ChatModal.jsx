import React, { useState } from 'react'
import styles from './ChatModal.module.css'
import { DarkLoader } from '../../../../../Loader/Loader'
import axios from 'axios'
import { baseApiUrl } from '../../../../../../utils/config'
import getTimezoneDate from '../../../../../../utils/getTimezoneDate'

const ChatModal = ({ showChatModal, setshowChatModal, chatLoading, chatData, chatModalHandler, vendorId, customerId, vendorName, chatUpdating, setchatUpdating, setclearCountInterval, type }) => {
	const [newChatMsg, setnewChatMsg] = useState('')
	const [sendingMsg, setsendingMsg] = useState(false)

	// const [currentPage, setcurrentPage] = useState(chatData?.current_page)
	// const [lastPage, setlastPage] = useState(chatData?.last_page)
	// const [hasMoreData, sethasMoreData] = useState(true)

	// let gsap, ScrollTrigger

	const sendMessageHandler = async () => {
		const data = {
			customer_id: customerId,
			user_id: vendorId,
			message: newChatMsg,
			message_type: 'Customer'
		}
		if (newChatMsg.trim().length !== 0) {
			setnewChatMsg('')
			setsendingMsg(true)
			await axios.post(`${baseApiUrl}/chat-box/send-message`, data)
			setsendingMsg(false)
			await chatModalHandler()
			setTimeout(() => {
				const chat = document.querySelector('.chat-group-wrapper')
				chat.scrollTop = chat.scrollHeight
			}, 0)
		}
	}

	const enterPressHandler = (e) => {
		if (e.key === 'Enter' && newChatMsg.trim().length !== 0) {
			sendMessageHandler()
		}
	}

	// const fetchData = async () => {
	// 	if (hasMoreData) {
	// 		const data = {
	// 			vendor_id: vendorId,
	// 			customer_id: customerId
	// 		}
	// 		const res = await axios.post(`${baseApiUrl}/chat-box/user`, data)

	// 		console.log('res from page pagin', res)

	// 		setchatData((prev) => [...prev, res?.data?.user_chat?.data])
	// 		setcurrentPage(res?.data?.user_chat?.current_page)
	// 		setlastPage(res?.data?.data?.last_page)
	// 		if (res?.data?.user_chat?.data?.length > 0) {
	// 			sethasMoreData(true)
	// 		} else sethasMoreData(false)
	// 		console.log('hit the pagination')
	// 	}
	// }

	// const loadLibs = async () => {
	// 	gsap = (await import('gsap')).default
	// 	ScrollTrigger = (await import('gsap/dist/ScrollTrigger')).default
	// 	gsap.registerPlugin(ScrollTrigger)

	// 	showChatModal &&
	// 		ScrollTrigger.create({
	// 			trigger: '.chat-group-wrapper',
	// 			start: 'bottom 90%',
	// 			end: 'top 10%',
	// 			scroller: '.chat-group-wrapper',
	// 			onEnter: () => fetchData(),
	// 			onEnterBack: () => fetchData(),
	// 			markers: true
	// 		})
	// }

	// useEffect(() => {
	// 	loadLibs()
	// }, [showChatModal])

	return (
		<div className={`${styles.chat_modal_wrapper} chat-modal-wrapper white-bg radius shadow transition ${showChatModal ? styles.show_chat_modal : undefined} `}>
			{/* vendor detail */}
			<div className={`${styles.vendor_name_wrapper} primary-color`}>
				<div className='semibold-text'>{chatLoading && !chatUpdating ? <DarkLoader className={styles.chat_loader} /> : vendorName}</div>

				<svg
					onClick={() => {
						type === 'vendor_interval_chat' && setclearCountInterval(false)
						setshowChatModal(false)
						setchatUpdating(false)
					}}
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={2}
					stroke='var(--primary)'
					className='transition'
				>
					<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
				</svg>
			</div>

			<div className={`${styles.chat_group_wrapper} chat-group-wrapper active-scrollbar ${chatLoading && !chatUpdating ? styles.chat_loading : undefined}`}>
				<svg className={styles.doodles} width={77} height={77} viewBox='0 0 77 77' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<g clippath='url(#clip0_613_363)'>
						<path
							d='M23.1877 47.1475C21.7763 47.9624 20.302 48.1639 18.7648 47.752C17.2276 47.3401 16.0515 46.4285 15.2366 45.0171C14.4218 43.6057 14.2203 42.1314 14.6322 40.5942C15.0441 39.057 15.9557 37.8809 17.3671 37.0661C18.7785 36.2512 20.2528 36.0497 21.79 36.4616C23.3272 36.8735 24.5033 37.7851 25.3181 39.1965C26.133 40.6079 26.3345 42.0822 25.9226 43.6194C25.5107 45.1566 24.5991 46.3327 23.1877 47.1475ZM27.6046 33.8439C26.1932 34.6587 24.7189 34.8602 23.1817 34.4483C21.6445 34.0364 20.4684 33.1248 19.6535 31.7134C18.8387 30.302 18.6372 28.8277 19.0491 27.2905C19.461 25.7533 20.3726 24.5772 21.784 23.7624C23.1954 22.9475 24.6697 22.746 26.2069 23.1579C27.7441 23.5698 28.9202 24.4814 29.735 25.8928C30.5499 27.3042 30.7514 28.7785 30.3395 30.3157C29.9276 31.8529 29.016 33.029 27.6046 33.8439ZM39.7024 26.8592C38.291 27.6741 36.8167 27.8756 35.2795 27.4637C33.7423 27.0518 32.5662 26.1401 31.7513 24.7287C30.9365 23.3173 30.735 21.843 31.1469 20.3058C31.5588 18.7686 32.4704 17.5926 33.8818 16.7777C35.2932 15.9628 36.7675 15.7613 38.3047 16.1732C39.8419 16.5851 41.018 17.4968 41.8328 18.9082C42.6477 20.3196 42.8492 21.7939 42.4373 23.3311C42.0254 24.8683 41.1138 26.0443 39.7024 26.8592ZM53.4322 29.6859C52.0207 30.5008 50.5464 30.7023 49.0092 30.2904C47.472 29.8785 46.296 28.9668 45.4811 27.5554C44.6663 26.144 44.4648 24.6697 44.8767 23.1325C45.2885 21.5953 46.2002 20.4193 47.6116 19.6044C49.023 18.7895 50.4973 18.588 52.0345 18.9999C53.5717 19.4118 54.7477 20.3235 55.5626 21.7349C56.3775 23.1463 56.579 24.6206 56.1671 26.1578C55.7552 27.695 54.8436 28.871 53.4322 29.6859ZM39.1638 64.8077C37.6516 65.6808 36.0478 65.8334 34.3524 65.2655C32.657 64.6976 31.3549 63.6249 30.4459 62.0473C29.437 60.2999 29.151 58.4263 29.588 56.4265C30.025 54.4268 30.4622 52.4493 30.8998 50.494C31.2729 48.8896 31.4584 47.2707 31.4563 45.6374C31.4542 44.004 31.6297 42.3677 31.9826 40.7283C32.2174 39.4277 32.6572 38.2105 33.3019 37.0765C33.9466 35.9426 34.8399 35.0451 35.9817 34.3841C37.1243 33.7245 38.338 33.3821 39.623 33.3572C40.908 33.3322 42.1723 33.5431 43.4161 33.99C44.9779 34.5221 46.4793 35.2011 47.9204 36.027C49.3614 36.8528 50.879 37.5225 52.473 38.036C54.3865 38.6339 56.3177 39.244 58.2667 39.8662C60.2156 40.4884 61.6953 41.6729 62.7055 43.4196C63.6174 44.999 63.8954 46.6648 63.5395 48.417C63.1836 50.1692 62.2499 51.4808 60.7382 52.3517C58.9236 53.3994 57.0384 54.2862 55.0827 55.012C53.127 55.7379 51.2418 56.6247 49.4272 57.6724C47.6125 58.7201 45.9019 59.9093 44.2955 61.24C42.689 62.5708 40.9785 63.76 39.1638 64.8077Z'
							fill='#C196D5'
						/>
					</g>
					<defs>
						<clipPath id='clip0_613_363'>
							<rect width='55.8773' height='55.8773' fill='white' transform='translate(0 27.9385) rotate(-30)' />
						</clipPath>
					</defs>
				</svg>

				<svg className={styles.doodles} width={71} height={85} viewBox='0 0 71 85' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M69.6864 15.1484C69.6864 11.9342 68.4096 8.85168 66.1368 6.5789C63.864 4.30613 60.7815 3.0293 57.5673 3.0293C54.3531 3.0293 51.2706 4.30613 48.9978 6.5789C46.725 8.85168 45.4482 11.9342 45.4482 15.1484C45.4617 18.3574 46.7474 21.4301 49.0233 23.6924L23.6943 49.0214C21.432 46.7455 18.3594 45.4597 15.1504 45.4462C11.9362 45.4462 8.85363 46.7231 6.58086 48.9958C4.30808 51.2686 3.03125 54.3511 3.03125 57.5653C3.03125 60.7795 4.30808 63.8621 6.58086 66.1348C8.85363 68.4076 11.9362 69.6845 15.1504 69.6845C15.1504 72.8986 16.4272 75.9812 18.7 78.254C20.9728 80.5267 24.0553 81.8036 27.2695 81.8036C30.4837 81.8036 33.5662 80.5267 35.839 78.254C38.1118 75.9812 39.3886 72.8986 39.3886 69.6845C39.3751 66.4755 38.0894 63.4028 35.8135 61.1405L61.1424 35.8115C63.4048 38.0874 66.4774 39.3731 69.6864 39.3867C72.9006 39.3867 75.9831 38.1098 78.2559 35.837C80.5287 33.5643 81.8055 30.4817 81.8055 27.2675C81.8055 24.0533 80.5287 20.9708 78.2559 18.698C75.9831 16.4252 72.9006 15.1484 69.6864 15.1484Z'
						stroke='#C196D5'
						strokeWidth='2.9003'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>

				<svg className={styles.doodles} width={85} height={58} viewBox='0 0 85 58' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M69.6854 15.1484C69.6854 11.9342 68.4086 8.85168 66.1358 6.5789C63.863 4.30613 60.7805 3.0293 57.5663 3.0293C54.3521 3.0293 51.2696 4.30613 48.9968 6.5789C46.724 8.85168 45.4472 11.9342 45.4472 15.1484C45.4607 18.3574 46.7464 21.4301 49.0223 23.6924L23.6934 49.0214C21.431 46.7455 18.3584 45.4597 15.1494 45.4462C11.9352 45.4462 8.85266 46.7231 6.57988 48.9958C4.30711 51.2686 3.03027 54.3511 3.03027 57.5653C3.03027 60.7795 4.30711 63.8621 6.57988 66.1348C8.85266 68.4076 11.9352 69.6845 15.1494 69.6845C15.1494 72.8986 16.4262 75.9812 18.699 78.254C20.9718 80.5267 24.0543 81.8036 27.2685 81.8036C30.4827 81.8036 33.5652 80.5267 35.838 78.254C38.1108 75.9812 39.3876 72.8986 39.3876 69.6845C39.3741 66.4755 38.0884 63.4028 35.8125 61.1405L61.1415 35.8115C63.4038 38.0874 66.4764 39.3731 69.6854 39.3867C72.8996 39.3867 75.9822 38.1098 78.2549 35.837C80.5277 33.5643 81.8046 30.4817 81.8046 27.2675C81.8046 24.0533 80.5277 20.9708 78.2549 18.698C75.9822 16.4252 72.8996 15.1484 69.6854 15.1484Z'
						stroke='#C196D5'
						strokeWidth='2.9003'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>

				<svg className={styles.doodles} width={61} height={61} viewBox='0 0 61 61' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<g clipPath='url(#clip0_613_385)'>
						<path
							d='M18.3553 37.3201C17.2381 37.9651 16.0711 38.1246 14.8544 37.7986C13.6376 37.4726 12.7067 36.751 12.0617 35.6338C11.4167 34.5166 11.2572 33.3496 11.5832 32.1328C11.9092 30.916 12.6309 29.9851 13.7481 29.3401C14.8653 28.6951 16.0322 28.5356 17.249 28.8617C18.4658 29.1877 19.3967 29.9093 20.0417 31.0265C20.6867 32.1437 20.8462 33.3107 20.5202 34.5275C20.1941 35.7442 19.4725 36.6751 18.3553 37.3201ZM21.8515 26.7896C20.7343 27.4346 19.5673 27.5941 18.3506 27.2681C17.1338 26.9421 16.2029 26.2204 15.5579 25.1032C14.9129 23.986 14.7534 22.8191 15.0794 21.6023C15.4054 20.3855 16.1271 19.4546 17.2443 18.8096C18.3615 18.1646 19.5284 18.0051 20.7452 18.3311C21.962 18.6572 22.8929 19.3788 23.5379 20.496C24.1829 21.6132 24.3424 22.7802 24.0164 23.9969C23.6903 25.2137 22.9687 26.1446 21.8515 26.7896ZM31.4275 21.2609C30.3103 21.9059 29.1433 22.0654 27.9266 21.7394C26.7098 21.4133 25.7789 20.6917 25.1339 19.5745C24.4889 18.4573 24.3294 17.2904 24.6554 16.0736C24.9814 14.8568 25.703 13.9259 26.8202 13.2809C27.9374 12.6359 29.1044 12.4764 30.3212 12.8024C31.538 13.1285 32.4689 13.8501 33.1139 14.9673C33.7589 16.0845 33.9184 17.2515 33.5923 18.4682C33.2663 19.685 32.5447 20.6159 31.4275 21.2609ZM42.2953 23.4984C41.1781 24.1434 40.0111 24.3029 38.7943 23.9768C37.5776 23.6508 36.6467 22.9292 36.0017 21.812C35.3567 20.6948 35.1972 19.5278 35.5232 18.3111C35.8492 17.0943 36.5708 16.1634 37.688 15.5184C38.8052 14.8734 39.9722 14.7139 41.189 15.0399C42.4058 15.3659 43.3366 16.0876 43.9817 17.2048C44.6267 18.322 44.7862 19.4889 44.4601 20.7057C44.1341 21.9225 43.4125 22.8534 42.2953 23.4984ZM31.0012 51.299C29.8042 51.9901 28.5347 52.1109 27.1928 51.6613C25.8508 51.2118 24.82 50.3627 24.1005 49.114C23.3019 47.7308 23.0756 46.2478 23.4215 44.6649C23.7674 43.082 24.1135 41.5167 24.4598 39.969C24.7552 38.699 24.902 37.4176 24.9003 36.1247C24.8987 34.8319 25.0376 33.5366 25.3169 32.239C25.5028 31.2095 25.8509 30.246 26.3612 29.3484C26.8716 28.4509 27.5786 27.7405 28.4824 27.2173C29.3868 26.6951 30.3476 26.4241 31.3647 26.4044C32.3818 26.3846 33.3826 26.5516 34.3671 26.9053C35.6033 27.3265 36.7918 27.864 37.9325 28.5177C39.0731 29.1714 40.2743 29.7014 41.5361 30.1079C43.0507 30.5812 44.5793 31.0641 46.122 31.5566C47.6648 32.0491 48.8359 32.9867 49.6356 34.3692C50.3574 35.6194 50.5774 36.938 50.2958 38.325C50.0141 39.7119 49.2749 40.7501 48.0784 41.4395C46.642 42.2688 45.1498 42.9707 43.6018 43.5453C42.0538 44.1198 40.5616 44.8217 39.1252 45.651C37.6888 46.4803 36.3348 47.4217 35.0632 48.475C33.7916 49.5284 32.4376 50.4697 31.0012 51.299Z'
							fill='#C196D5'
						/>
					</g>
					<defs>
						<clipPath id='clip0_613_385'>
							<rect width='44.2296' height='44.2296' fill='white' transform='translate(0 22.1152) rotate(-30)' />
						</clipPath>
					</defs>
				</svg>
				{/* <DarkLoader loaderType='sml' /> */}
				{chatData?.length > 0 ? (
					chatData?.map((chat, i) => {
						const link = chat?.message?.split(' ')
						const [date, localTime12HoursBase, pmAm] = getTimezoneDate(chat?.created_at),
							today = new Date(),
							todayDate = today.toString().slice(4, 10) + ',' + today.toString().slice(10, 15)

						return (
							<div key={chat?.id} className={styles.msg_container} style={{ justifyContent: chat?.message_type === 'Customer' ? 'flex-end' : 'flex-start', marginTop: i > 0 ? '1rem' : '0' }}>
								{chat?.created_at !== undefined && chat?.created_at?.slice(0, 12) !== chatData[i - 1]?.created_at?.slice(0, 12) && (
									<div className={styles.sep_date}>
										<div className={` ${styles.date} white-bg gray-border full-radius sml-shadow`}>{todayDate == date ? 'Today' : date}</div>
									</div>
								)}

								{chat?.message_type === 'Customer' ? (
									<div className={styles.user_msg_wrapper}>
										<div className={`${styles.user_msg} white-color active-scrollbar`}>
											{link?.map((link, index) => {
												const slashLink = link?.includes('/') && link.split('/')
												const linkCheck = slashLink[0]?.includes('.') && slashLink[0]?.slice(slashLink[0].lastIndexOf('.'), slashLink[0].lastIndexOf('/'))?.length
												return link.includes('.') && link.slice(link.lastIndexOf('.'))?.length < (linkCheck < 4 && link.slice(link.lastIndexOf('.'))?.includes('/') && link.slice(0, link.lastIndexOf('/'))?.length > 10 ? 5000 : 5) && link.slice(link.lastIndexOf('.'))?.length > 2 ? (
													<a key={index} href={link?.includes('https://') ? link : `https://${link}`} target='_blank' rel='noreferrer' className={`link ${styles.user_message_link}`}>
														{' ' + link + ' '}
													</a>
												) : (
													<span key={index}>{' ' + link + ' '}</span>
												)
											})}
										</div>
										<div className={styles.date}>
											{localTime12HoursBase.slice(0, localTime12HoursBase.lastIndexOf(':'))} {pmAm}
										</div>
									</div>
								) : (
									chat?.message_type === 'Vendor' && (
										<div className={styles.vendor_msg_wrapper}>
											<div className={`${styles.vendor_msg} primary-color active-scrollbar `}>
												{link?.map((link, index) => {
													const slashLink = link?.includes('/') && link.split('/')
													const linkCheck = slashLink[0]?.includes('.') && slashLink[0]?.slice(slashLink[0].lastIndexOf('.'), slashLink[0].lastIndexOf('/'))?.length
													return link.includes('.') && link.slice(link.lastIndexOf('.'))?.length < (linkCheck < 4 && link.slice(link.lastIndexOf('.'))?.includes('/') && link.slice(0, link.lastIndexOf('/'))?.length > 10 ? 5000 : 5) && link.slice(link.lastIndexOf('.'))?.length > 2 ? (
														<a href={link?.includes('https://') ? link : `https://${link}`} key={index} target='_blank' rel='noreferrer' className={`link ${styles.vendor_message_link}`}>
															{' ' + link + ' '}
														</a>
													) : (
														<span>{' ' + link + ' '}</span>
													)
												})}
											</div>
											<div className={styles.date}>
												{localTime12HoursBase.slice(0, localTime12HoursBase.lastIndexOf(':'))} {pmAm}
											</div>
										</div>
									)
								)}
							</div>
						)
					})
				) : (
					<div className={styles.no_chat}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={0.5} stroke='var(--gray-icon)' className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
							/>
						</svg>
						<div className='gray-color'>No chat data found, start now...</div>
					</div>
				)}
			</div>

			{/* send msg */}
			<div className={`${styles.input_wrapper} ${chatLoading && !chatUpdating ? styles.chat_loading : undefined} white-bg`}>
				<input type='text' placeholder='Enter text here' value={newChatMsg} onKeyDown={(e) => enterPressHandler(e)} onChange={(e) => setnewChatMsg(e.target.value)} />
				{sendingMsg ? (
					<DarkLoader loaderType='sml' />
				) : (
					<div className={`${styles.send_btn} primary-bg full-radius`}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--white)' onClick={() => sendMessageHandler()}>
							<path strokeLinecap='round' strokeLinejoin='round' d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5' />
						</svg>
					</div>
				)}
			</div>
		</div>
	)
}

export default ChatModal

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styles from './NotificationIcons.module.css'
import { DarkLoader } from '../../Loader/Loader'
import NotifiListing from '../NotifiListing/NotifiListing'
import axios from 'axios'
import { useRouter } from 'next/router'
import { baseApiUrl } from '../../../utils/config'
import { lockScroll, unlockScroll } from '../../../utils/scrollLock'

const NotificationIcons = ({ loginUser, Listingtype, showNotifications, setshowNotifications, notificationData, setnotificationData, userPosition }) => {
	const [notificationsLoading, setnotificationsLoading] = useState(false)
	const [notiCount, setnotiCount] = useState(0)
	const [moreDara, setmoreData] = useState()

	const router = useRouter()

	const intervalRef = useRef(null)

	const notificationHandler = async () => {
		if (router?.asPath?.includes('/notifications')) {
			unlockScroll()
			return
		} else {
			lockScroll()
			setshowNotifications(true)
			setnotificationsLoading(true)

			const res = await axios(`${baseApiUrl}/user/notifications/${loginUser?.id}`)
			res?.data?.success && setnotificationData(userPosition === 'Sales Rep' ? res?.data?.notifications?.data?.filter((noti) => noti?.type !== 'order') : res?.data?.notifications?.data)

			setmoreData(userPosition === 'Sales Rep' ? res?.data?.notifications?.data?.filter((noti) => noti?.type !== 'order')?.length : res?.data?.notifications?.total)

			setnotiCount(res?.data?.count)

			console.log('res from notifi', res)
			setTimeout(() => {
				setnotificationsLoading(false)
			}, 500)
		}
	}

	const notificationCount = async () => {
		const res = await axios.get(`${baseApiUrl}/user/notifications/count/${loginUser?.id}`)
		notiCount != res?.data?.count && setnotiCount(res?.data?.count)
	}

	useEffect(() => {
		if (loginUser?.id !== undefined) {
			intervalRef.current = setInterval(() => {
				notificationCount()
			}, 3000)

			return () => {
				if (intervalRef.current !== null || showNotifications) clearInterval(intervalRef.current)
			}
		}
	}, [loginUser, intervalRef.current])
	return (
		<>
			<a className={`${styles.icon_wrapper} ${styles.noti_icon} ${Listingtype === 'mobile_header_modal' ? `${styles.notification_container} ${styles.noti_main_wrapper}` : styles.desktop_noti_icon}`} onClick={() => !showNotifications && notificationHandler()}>
				<div className={Listingtype === 'mobile_header_modal' ? styles.noti_main_wrapper : undefined}>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--new-gray)'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5'
						/>
					</svg>

					{notiCount !== undefined && notiCount !== null && <div className={`${styles.badge} ${Listingtype === 'mobile_header_modal' ? styles.mobile_badge : styles.desktop_badge} lite-dark-primary-bg white-color`}>{notiCount}</div>}
				</div>
				{Listingtype === 'mobile_header_modal' && <span style={{ color: 'var(--new-gray)' }}>Notifications</span>}
			</a>
			{router?.asPath?.includes('notifications') ? (
				<></>
			) : (
				<div className={`white-bg shadow transition ${showNotifications ? styles.notification_menu : undefined} ${styles.notification_wrapper} ${Listingtype === 'mobile_header_modal' ? styles.mobile_wrapper : styles.desktop_wrapper}`}>
					{Listingtype === 'mobile_header_modal' ? (
						<div className={`${styles.title} ${styles.font} primary-color lite-pink-bg`}>
							<h5>Notifications</h5>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)' className='full-radius transition' onClick={() => (unlockScroll(), setshowNotifications(false))}>
								<path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
							</svg>
						</div>
					) : (
						<h5 className={`${styles.title} ${styles.notification_container} primary-color lite-pink-bg`}>Notifications</h5>
					)}
					<div className={styles.overflow_noti}>
						{!notificationsLoading ? (
							<>
								{notificationData?.length > 0 ? (
									<>
										{notificationData?.map((data) => {
											return <NotifiListing data={data} key={data?.id} Listingtype={'header_modal'} setnotificationData={setnotificationData} setshowNotifications={setshowNotifications} loginUser={loginUser} />
										})}
									</>
								) : (
									<div className={styles.no_result}>No notifications found!</div>
								)}
								{moreDara > 20 && notificationData?.length > 0 ? (
									<Link href={`/dashboard/notifications`}>
										<a
											onClick={() => (
												setshowNotifications(false),
												setTimeout(() => {
													setnotificationData([])
												}, 300)
											)}
											className={styles.more_results}
										>
											View All
										</a>
									</Link>
								) : (
									moreDara < 20 && <div className={styles.no_more_result}>No more notifications</div>
								)}
							</>
						) : (
							<DarkLoader className={styles.notification_loader} />
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default NotificationIcons

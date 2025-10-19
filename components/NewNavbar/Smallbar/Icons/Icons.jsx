import React, { useContext, useState } from 'react'
import Link from 'next/link'
import styles from './Icons.module.css'
import { useSession } from 'next-auth/react'
import { GlobalProvider } from '../../../../context/AppProvider'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'
import { useRouter } from 'next/router'
import NotificationIcons from '../../../UI/NotificationIcons/NotificationIcons'

const HeaderIcons = ({ setshowCartSidebar }) => {
	const { data: status } = useSession()
	const { wishListItemsLength, cartitemsLength, searchBD, loginUser, userData } = useContext(GlobalProvider)
	const [notificationData, setnotificationData] = useState()
	const [showNotifications, setshowNotifications] = useState(false)

	const router = useRouter()

	// close dropdown if clicked elsewhere
	if (typeof window !== 'undefined') {
		let notificationWrapper = document.querySelector('.notification-wrapper')
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showNotifications === true) {
				if (!notificationWrapper.contains(e.target)) {
					setshowNotifications(false)
					unlockScroll()
					setTimeout(() => {
						setnotificationData([])
					}, 300)
				}
			} else {
				return
			}
		})
	}

	const cartClickHandler = () => {
		if (router.asPath === '/cart') {
			return
		} else if (router.asPath === '/checkout') {
			router.push('/cart')
		} else {
			setshowCartSidebar(true)
			lockScroll()
		}
	}

	return (
		<div className={styles.header_icons_container}>
			<div className={styles.header_icons_wrapper}>
				{loginUser?.id !== undefined && status !== 'loading' && (
					<>
						{/*  wishlist icon */}
						{userData?.position !== undefined &&
							userData?.position !== 'Sales Rep' &&
							(router?.asPath !== `/dashboard/wishlist` ? (
								<Link href={`/dashboard/wishlist`}>
									<a className={`${styles.whishlist_icon_wrapper} ${styles.icon_wrapper}`}>
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--new-gray)'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z' />
										</svg>

										{wishListItemsLength !== undefined && wishListItemsLength !== null && <div className={`whishlist_qty ${styles.badge} lite-dark-primary-bg white-color`}>{wishListItemsLength > 99 ? 99 + '+' : wishListItemsLength}</div>}
									</a>
								</Link>
							) : (
								<a className={`${styles.whishlist_icon_wrapper} ${styles.icon_wrapper}`}>
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--new-gray)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z' />
									</svg>
									{wishListItemsLength !== undefined && wishListItemsLength !== null && <div className={`whishlist_qty ${styles.badge} lite-dark-primary-bg white-color`}>{wishListItemsLength > 99 ? 99 + '+' : wishListItemsLength}</div>}
								</a>
							))}

						{/* cart icon*/}
						{userData?.position !== undefined && userData?.position !== 'Sales Rep' && (
							<div className={`${styles.cart_icon_wrapper} ${styles.icon_wrapper} transition`} onClick={() => cartClickHandler()}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--new-gray)'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
									/>
								</svg>

								{cartitemsLength !== undefined && cartitemsLength !== null && <div className={`${styles.cart_qty} ${styles.badge} lite-dark-primary-bg white-color`}>{cartitemsLength > 99 ? 99 + '+' : cartitemsLength}</div>}
							</div>
						)}

						{/* notification icon */}
						<div className={`notification-wrapper ${styles.noti_main_wrapper}`}>
							<NotificationIcons loginUser={loginUser} userPosition={userData?.position} notificationData={notificationData} showNotifications={showNotifications} setnotificationData={setnotificationData} setshowNotifications={setshowNotifications} />
						</div>
					</>
				)}

				{/* contact-icon */}
				{router?.pathname !== '/contact' ? (
					<Link href='/contact'>
						<a className={`${styles.contact_icon_wrapper} ${styles.icon_wrapper} white-color`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--new-gray)' className='size-6'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
								/>
							</svg>

							{/* Contact */}
						</a>
					</Link>
				) : (
					<a className={`${styles.contact_icon_wrapper} ${styles.icon_wrapper} white-color`}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--new-gray)' className='size-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
							/>
						</svg>
						{/* Contact */}
					</a>
				)}
			</div>
		</div>
	)
}

export default HeaderIcons

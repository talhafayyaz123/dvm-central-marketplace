import React, { useContext, useState } from 'react'
import Link from 'next/link'
import styles from './HeaderIcons.module.css'
import { useSession } from 'next-auth/react'
import ProfileMenu from '../../../UI/ProfileMenu/ProfileMenu'
import { GlobalProvider } from '../../../../context/AppProvider'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'
import { useRouter } from 'next/router'
import NotificationIcons from '../../../UI/NotificationIcons/NotificationIcons'

const HeaderIcons = ({ setshowCartSidebar }) => {
	const { data: status } = useSession()
	const { wishListItemsLength, cartitemsLength, userData, searchBD, userCoins, loginUser, setloginUser, setactiveProvider, gettingSocialLoginData } = useContext(GlobalProvider)
	const [notificationData, setnotificationData] = useState()
	const [showNotifications, setshowNotifications] = useState(false)
	const [showProfileMenu, setshowProfileMenu] = useState(false)

	const router = useRouter()

	const coinsforAnim = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

	const profileMenuHandler = () => {
		setshowProfileMenu(!showProfileMenu)
	}

	// close dropdown if clicked elsewhere
	if (typeof window !== 'undefined') {
		let profileMenuWrapper = document.querySelector('.profile-menu-wrapper'),
			notificationWrapper = document.querySelector('.notification-wrapper')
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showProfileMenu === true) {
				if (!profileMenuWrapper.contains(e.target)) {
					setshowProfileMenu(false)
				}
			} else if (showNotifications === true) {
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
						{/* cart icon*/}
						<div className={`${styles.cart_icon_wrapper} ${styles.icon_wrapper} transition`} onClick={() => cartClickHandler()}>
							<svg id='Icon_Glyph_25_Shipping' data-name='Icon/Glyph/25/Shipping' xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24'>
								<g id='iconspace_Stroller_25px'>
									<path id='path' d='M0,0H24V24H0Z' fill='none' />
									<path
										id='path-2'
										data-name='path'
										d='M16.079,20.16a2.255,2.255,0,0,1-2.266-2.239,2.218,2.218,0,0,1,.129-.746H11.166a2.2,2.2,0,0,1,.13.746,2.266,2.266,0,0,1-4.532,0,2.22,2.22,0,0,1,.547-1.459,3.727,3.727,0,0,1-1.535-2.635l-.012-.113a3.509,3.509,0,0,1-2.258-2.952L3.2,7.323c0-.022-.008-.043-.011-.066L2.865,4.107l-.183-1.5A1.25,1.25,0,0,0,1.43,1.493H.755A.752.752,0,0,1,0,.746.751.751,0,0,1,.755,0H1.43A2.749,2.749,0,0,1,4.185,2.458l.138,1.329H19.656a.5.5,0,0,1,.391.184.492.492,0,0,1,.1.409l-1.339,6.749a3.52,3.52,0,0,1-3.459,2.812H7.323a2.275,2.275,0,0,0,2.21,1.741h6.323a.268.268,0,0,1,.061,0h.007c.046,0,.1,0,.156,0a2.239,2.239,0,1,1,0,4.477Zm0-3.234a1,1,0,1,0,1.007.994A1,1,0,0,0,16.079,16.926Zm-7.05,0a1,1,0,1,0,1.007.994A1,1,0,0,0,9.03,16.926Z'
										transform='translate(0.96 1.92)'
										fill='#fff'
									/>
								</g>
							</svg>

							{cartitemsLength !== undefined && cartitemsLength !== null && <div className={`${styles.cart_qty} ${styles.badge} lite-dark-primary-bg white-color`}>{cartitemsLength > 99 ? 99 + '+' : cartitemsLength}</div>}
						</div>
						{/* whishlist icon */}
						{router?.asPath !== `/dashboard/wishlist` ? (
							<Link href={`/dashboard/wishlist`}>
								<a className={`${styles.whishlist_icon_wrapper} ${styles.icon_wrapper}`}>
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--white)'>
										<path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z' />
									</svg>

									{wishListItemsLength !== undefined && wishListItemsLength !== null && <div className={`whishlist_qty ${styles.badge} lite-dark-primary-bg white-color`}>{wishListItemsLength > 99 ? 99 + '+' : wishListItemsLength}</div>}
								</a>
							</Link>
						) : (
							<a className={`${styles.whishlist_icon_wrapper} ${styles.icon_wrapper}`}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--white)'>
									<path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z' />
								</svg>
								{wishListItemsLength !== undefined && wishListItemsLength !== null && <div className={`whishlist_qty ${styles.badge} lite-dark-primary-bg white-color`}>{wishListItemsLength > 99 ? 99 + '+' : wishListItemsLength}</div>}
							</a>
						)}

						{/* notification icon */}
						<div style={{ position: 'relative', zIndex: searchBD ? 1 : 21 }} className={`notification-wrapper ${styles.noti_main_wrapper}`}>
							<NotificationIcons loginUser={loginUser} notificationData={notificationData} showNotifications={showNotifications} setnotificationData={setnotificationData} setshowNotifications={setshowNotifications} />
						</div>

						{/* coins */}
						<Link href={`/dashboard/coins`}>
							<a className={`${styles.coin_icon_wrapper} ${styles.icon_wrapper}`}>
								<svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' width={20} height={20} viewBox='0 0 256 256' xmlSpace='preserve'>
									<defs></defs>
									<g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'>
										<path
											d='M 87.531 77.813 H 32.56 c -1.363 0 -2.469 1.105 -2.469 2.469 v 3.192 c 20.66 1.252 40.67 1.327 59.908 0 v -3.192 C 90 78.918 88.895 77.813 87.531 77.813 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 90 83.474 c 0 1.41 -1.143 2.554 -2.554 2.554 H 32.645 c -1.41 0 -2.554 -1.143 -2.554 -2.554 H 90 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,180,54)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 87.531 69.598 H 32.56 c -1.363 0 -2.469 1.105 -2.469 2.469 v 3.192 c 20.66 1.252 40.67 1.327 59.908 0 v -3.192 C 90 70.703 88.895 69.598 87.531 69.598 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 90 75.259 c 0 1.41 -1.143 2.554 -2.554 2.554 H 32.645 c -1.41 0 -2.554 -1.143 -2.554 -2.554 H 90 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,180,54)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 87.531 61.383 H 32.56 c -1.363 0 -2.469 1.105 -2.469 2.469 v 3.192 c 20.66 1.252 40.67 1.327 59.908 0 v -3.192 C 90 62.489 88.895 61.383 87.531 61.383 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 90 67.044 c 0 1.41 -1.143 2.554 -2.554 2.554 H 32.645 c -1.41 0 -2.554 -1.143 -2.554 -2.554 H 90 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,180,54)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 87.531 53.169 H 32.56 c -1.363 0 -2.469 1.105 -2.469 2.469 v 3.192 c 20.66 1.252 40.67 1.327 59.908 0 v -3.192 C 90 54.274 88.895 53.169 87.531 53.169 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 90 58.83 c 0 1.41 -1.143 2.554 -2.554 2.554 H 32.645 c -1.41 0 -2.554 -1.143 -2.554 -2.554 H 90 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,180,54)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 87.531 44.954 H 32.56 c -1.363 0 -2.469 1.105 -2.469 2.469 v 3.192 c 20.66 1.252 40.67 1.327 59.908 0 v -3.192 C 90 46.059 88.895 44.954 87.531 44.954 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 90 50.615 c 0 1.41 -1.143 2.554 -2.554 2.554 H 32.645 c -1.41 0 -2.554 -1.143 -2.554 -2.554 H 90 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,180,54)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 87.531 36.739 H 32.56 c -1.363 0 -2.469 1.105 -2.469 2.469 V 42.4 c 20.66 1.252 40.67 1.327 59.908 0 v -3.192 C 90 37.845 88.895 36.739 87.531 36.739 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 90 42.4 c 0 1.41 -1.143 2.554 -2.554 2.554 H 32.645 c -1.41 0 -2.554 -1.143 -2.554 -2.554 H 90 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,180,54)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 87.531 28.525 H 32.56 c -1.363 0 -2.469 1.105 -2.469 2.469 v 3.192 c 20.66 1.252 40.67 1.327 59.908 0 v -3.192 C 90 29.63 88.895 28.525 87.531 28.525 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 90 34.186 c 0 1.41 -1.143 2.554 -2.554 2.554 H 32.645 c -1.41 0 -2.554 -1.143 -2.554 -2.554 H 90 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,180,54)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 87.531 20.31 H 32.56 c -1.363 0 -2.469 1.105 -2.469 2.469 v 3.192 c 20.66 1.252 40.67 1.327 59.908 0 v -3.192 C 90 21.415 88.895 20.31 87.531 20.31 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 90 25.971 c 0 1.41 -1.143 2.554 -2.554 2.554 H 32.645 c -1.41 0 -2.554 -1.143 -2.554 -2.554 H 90 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,180,54)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 87.531 12.095 H 32.56 c -1.363 0 -2.469 1.105 -2.469 2.469 v 3.192 c 20.66 1.252 40.67 1.327 59.908 0 v -3.192 C 90 13.201 88.895 12.095 87.531 12.095 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 90 17.756 c 0 1.41 -1.143 2.554 -2.554 2.554 H 32.645 c -1.41 0 -2.554 -1.143 -2.554 -2.554 H 90 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,180,54)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 87.531 3.881 H 32.56 c -1.363 0 -2.469 1.105 -2.469 2.469 v 3.192 c 20.66 1.252 40.67 1.327 59.908 0 V 6.349 C 90 4.986 88.895 3.881 87.531 3.881 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 90 9.541 c 0 1.41 -1.143 2.554 -2.554 2.554 H 32.645 c -1.41 0 -2.554 -1.143 -2.554 -2.554 H 90 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,180,54)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										{/* <circle cx='32.077' cy='54.047' r='32.077' style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,200,67)', fillRule: 'nonzero', opacity: 1 }} transform='  matrix(1 0 0 1 0 0) ' />
									<circle cx='32.078' cy='54.038' r='24.948' style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(211,135,0)', fillRule: 'nonzero', opacity: 1 }} transform='  matrix(1 0 0 1 0 0) ' />
									<path
										d='M 35.449 51.357 h -6.745 c -0.487 0 -0.899 -0.412 -0.899 -0.899 v -5.233 c 0 -0.487 0.412 -0.899 0.899 -0.899 h 6.745 c 0.487 0 0.899 0.412 0.899 0.899 c 0 1.38 1.119 2.5 2.5 2.5 s 2.5 -1.119 2.5 -2.5 c 0 -3.253 -2.646 -5.899 -5.899 -5.899 h -0.872 v -1.71 c 0 -1.381 -1.119 -2.5 -2.5 -2.5 s -2.5 1.119 -2.5 2.5 v 1.71 h -0.873 c -3.253 0 -5.899 2.646 -5.899 5.899 v 5.233 c 0 3.253 2.646 5.899 5.899 5.899 h 6.745 c 0.487 0 0.899 0.412 0.899 0.899 v 5.232 c 0 0.487 -0.412 0.899 -0.899 0.899 h -6.745 c -0.487 0 -0.899 -0.412 -0.899 -0.899 c 0 -1.381 -1.119 -2.5 -2.5 -2.5 s -2.5 1.119 -2.5 2.5 c 0 3.253 2.646 5.899 5.899 5.899 h 0.873 v 2.082 c 0 1.381 1.119 2.5 2.5 2.5 s 2.5 -1.119 2.5 -2.5 v -2.082 h 0.872 c 3.253 0 5.899 -2.646 5.899 -5.899 v -5.232 C 41.348 54.004 38.702 51.357 35.449 51.357 z'
										style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(255,200,67)', fillRule: 'nonzero', opacity: 1 }}
										transform=' matrix(1 0 0 1 0 0) '
										strokeLinecap='round'
									/> */}
									</g>
								</svg>
								<svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' width={20} height={20} viewBox='0 0 256 256' xmlSpace='preserve'>
									<defs />
									<g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'>
										<circle cx='45.001' cy='47.211' r='42.791' style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }} transform='  matrix(1 0 0 1 0 0) ' />
										<circle cx={45} cy='42.79' r={35} style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(243,158,9)', fillRule: 'nonzero', opacity: 1 }} transform='  matrix(1 0 0 1 0 0) ' />
										<path
											d='M 45 13.791 c 17.977 0 32.78 13.555 34.766 31 c 0.15 -1.313 0.234 -2.647 0.234 -4 c 0 -19.33 -15.67 -35 -35 -35 s -35 15.67 -35 35 c 0 1.353 0.085 2.687 0.234 4 C 12.22 27.346 27.023 13.791 45 13.791 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 83.422 23.947 l -7.339 7.339 c 1.241 3.352 1.947 6.961 2.035 10.723 l 8.623 -8.623 C 85.999 30.079 84.88 26.916 83.422 23.947 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 44.218 75.909 c -3.762 -0.087 -7.371 -0.794 -10.723 -2.035 l -7.339 7.339 c 2.969 1.459 6.132 2.578 9.439 3.32 L 44.218 75.909 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 15.236 57.365 l -7.118 7.118 c 3.188 5.408 7.526 10.054 12.685 13.598 l 6.975 -6.975 C 22.396 67.826 18.027 63.053 15.236 57.365 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 66.692 5.909 l -7.118 7.118 c 5.688 2.791 10.461 7.16 13.741 12.541 l 6.975 -6.975 C 76.745 13.435 72.1 9.097 66.692 5.909 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 49.861 10.012 c 1.441 0.212 2.849 0.522 4.223 0.913 l 7.565 -7.565 c -1.224 -0.517 -2.478 -0.976 -3.756 -1.379 L 49.861 10.012 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 5.569 59.44 l 7.565 -7.565 c -0.391 -1.374 -0.701 -2.782 -0.913 -4.223 L 4.19 55.683 C 4.593 56.962 5.052 58.216 5.569 59.44 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 44.737 67.688 c -4.711 0 -9.153 -2.883 -10.902 -7.546 c -0.582 -1.552 0.204 -3.281 1.756 -3.862 c 1.549 -0.586 3.28 0.203 3.862 1.755 c 1.089 2.906 4.34 4.389 7.248 3.294 c 2.905 -1.09 4.384 -4.341 3.294 -7.248 c -0.624 -1.664 -1.967 -2.908 -3.685 -3.412 l -0.188 -0.062 l -4.224 -1.547 c -3.497 -1.06 -6.231 -3.618 -7.512 -7.033 c -1.091 -2.909 -0.983 -6.068 0.302 -8.896 c 1.285 -2.828 3.595 -4.986 6.504 -6.077 c 6.002 -2.25 12.72 0.801 14.972 6.806 c 0.582 1.551 -0.204 3.281 -1.755 3.863 c -1.547 0.579 -3.281 -0.203 -3.862 -1.755 c -1.09 -2.907 -4.341 -4.385 -7.249 -3.295 c -1.408 0.528 -2.526 1.573 -3.148 2.941 c -0.622 1.369 -0.674 2.898 -0.146 4.307 c 0.624 1.665 1.967 2.908 3.685 3.413 l 0.187 0.062 l 4.225 1.547 c 3.496 1.06 6.23 3.618 7.512 7.033 c 2.251 6.005 -0.803 12.722 -6.806 14.973 C 47.467 67.449 46.091 67.688 44.737 67.688 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 45 32.323 c -1.657 0 -3 -1.343 -3 -3 V 24.5 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 4.823 C 48 30.979 46.657 32.323 45 32.323 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 45 72.5 c -1.657 0 -3 -1.343 -3 -3 v -4.823 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 V 69.5 C 48 71.157 46.657 72.5 45 72.5 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 44.737 63.688 c -4.711 0 -9.153 -2.883 -10.902 -7.546 c -0.582 -1.552 0.204 -3.281 1.756 -3.862 c 1.549 -0.586 3.28 0.203 3.862 1.755 c 1.089 2.906 4.34 4.389 7.248 3.294 c 2.905 -1.09 4.384 -4.341 3.294 -7.248 c -0.624 -1.664 -1.967 -2.908 -3.685 -3.412 l -0.188 -0.062 l -4.224 -1.547 c -3.497 -1.06 -6.231 -3.618 -7.512 -7.033 c -1.091 -2.909 -0.983 -6.068 0.302 -8.896 c 1.285 -2.828 3.595 -4.986 6.504 -6.077 c 6.002 -2.25 12.72 0.801 14.972 6.806 c 0.582 1.551 -0.204 3.281 -1.755 3.863 c -1.547 0.579 -3.281 -0.203 -3.862 -1.755 c -1.09 -2.907 -4.341 -4.385 -7.249 -3.295 c -1.408 0.528 -2.526 1.573 -3.148 2.941 c -0.622 1.369 -0.674 2.898 -0.146 4.307 c 0.624 1.665 1.967 2.908 3.685 3.413 l 0.187 0.062 l 4.225 1.547 c 3.496 1.06 6.23 3.618 7.512 7.033 c 2.251 6.005 -0.803 12.722 -6.806 14.973 C 47.467 63.449 46.091 63.688 44.737 63.688 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 45 28.323 c -1.657 0 -3 -1.343 -3 -3 V 20.5 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 4.823 C 48 26.979 46.657 28.323 45 28.323 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
										<path
											d='M 45 68.5 c -1.657 0 -3 -1.343 -3 -3 v -4.823 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 V 65.5 C 48 67.157 46.657 68.5 45 68.5 z'
											style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
											transform=' matrix(1 0 0 1 0 0) '
											strokeLinecap='round'
										/>
									</g>
								</svg>

								{userCoins !== null && userCoins !== undefined && <div className={`coins-badge ${styles.badge} lite-dark-primary-bg white-color`}>{userCoins !== null ? (userCoins.toString().length > 5 ? Number(userCoins?.toString()?.slice(0, 5)) + '...' : userCoins) : 0}</div>}
								<div className={`coins-anim ${styles.coins_anim}`}>
									{coinsforAnim?.map((coin, i) => (
										<svg key={i} xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' width={20} height={20} viewBox='0 0 256 256' xmlSpace='preserve'>
											<defs />
											<g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'>
												<circle cx='45.001' cy='47.211' r='42.791' style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }} transform='  matrix(1 0 0 1 0 0) ' />
												<circle cx={45} cy='42.79' r={35} style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(243,158,9)', fillRule: 'nonzero', opacity: 1 }} transform='  matrix(1 0 0 1 0 0) ' />
												<path
													d='M 45 13.791 c 17.977 0 32.78 13.555 34.766 31 c 0.15 -1.313 0.234 -2.647 0.234 -4 c 0 -19.33 -15.67 -35 -35 -35 s -35 15.67 -35 35 c 0 1.353 0.085 2.687 0.234 4 C 12.22 27.346 27.023 13.791 45 13.791 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 83.422 23.947 l -7.339 7.339 c 1.241 3.352 1.947 6.961 2.035 10.723 l 8.623 -8.623 C 85.999 30.079 84.88 26.916 83.422 23.947 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 44.218 75.909 c -3.762 -0.087 -7.371 -0.794 -10.723 -2.035 l -7.339 7.339 c 2.969 1.459 6.132 2.578 9.439 3.32 L 44.218 75.909 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 15.236 57.365 l -7.118 7.118 c 3.188 5.408 7.526 10.054 12.685 13.598 l 6.975 -6.975 C 22.396 67.826 18.027 63.053 15.236 57.365 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 66.692 5.909 l -7.118 7.118 c 5.688 2.791 10.461 7.16 13.741 12.541 l 6.975 -6.975 C 76.745 13.435 72.1 9.097 66.692 5.909 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 49.861 10.012 c 1.441 0.212 2.849 0.522 4.223 0.913 l 7.565 -7.565 c -1.224 -0.517 -2.478 -0.976 -3.756 -1.379 L 49.861 10.012 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 5.569 59.44 l 7.565 -7.565 c -0.391 -1.374 -0.701 -2.782 -0.913 -4.223 L 4.19 55.683 C 4.593 56.962 5.052 58.216 5.569 59.44 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 44.737 67.688 c -4.711 0 -9.153 -2.883 -10.902 -7.546 c -0.582 -1.552 0.204 -3.281 1.756 -3.862 c 1.549 -0.586 3.28 0.203 3.862 1.755 c 1.089 2.906 4.34 4.389 7.248 3.294 c 2.905 -1.09 4.384 -4.341 3.294 -7.248 c -0.624 -1.664 -1.967 -2.908 -3.685 -3.412 l -0.188 -0.062 l -4.224 -1.547 c -3.497 -1.06 -6.231 -3.618 -7.512 -7.033 c -1.091 -2.909 -0.983 -6.068 0.302 -8.896 c 1.285 -2.828 3.595 -4.986 6.504 -6.077 c 6.002 -2.25 12.72 0.801 14.972 6.806 c 0.582 1.551 -0.204 3.281 -1.755 3.863 c -1.547 0.579 -3.281 -0.203 -3.862 -1.755 c -1.09 -2.907 -4.341 -4.385 -7.249 -3.295 c -1.408 0.528 -2.526 1.573 -3.148 2.941 c -0.622 1.369 -0.674 2.898 -0.146 4.307 c 0.624 1.665 1.967 2.908 3.685 3.413 l 0.187 0.062 l 4.225 1.547 c 3.496 1.06 6.23 3.618 7.512 7.033 c 2.251 6.005 -0.803 12.722 -6.806 14.973 C 47.467 67.449 46.091 67.688 44.737 67.688 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 45 32.323 c -1.657 0 -3 -1.343 -3 -3 V 24.5 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 4.823 C 48 30.979 46.657 32.323 45 32.323 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 45 72.5 c -1.657 0 -3 -1.343 -3 -3 v -4.823 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 V 69.5 C 48 71.157 46.657 72.5 45 72.5 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 44.737 63.688 c -4.711 0 -9.153 -2.883 -10.902 -7.546 c -0.582 -1.552 0.204 -3.281 1.756 -3.862 c 1.549 -0.586 3.28 0.203 3.862 1.755 c 1.089 2.906 4.34 4.389 7.248 3.294 c 2.905 -1.09 4.384 -4.341 3.294 -7.248 c -0.624 -1.664 -1.967 -2.908 -3.685 -3.412 l -0.188 -0.062 l -4.224 -1.547 c -3.497 -1.06 -6.231 -3.618 -7.512 -7.033 c -1.091 -2.909 -0.983 -6.068 0.302 -8.896 c 1.285 -2.828 3.595 -4.986 6.504 -6.077 c 6.002 -2.25 12.72 0.801 14.972 6.806 c 0.582 1.551 -0.204 3.281 -1.755 3.863 c -1.547 0.579 -3.281 -0.203 -3.862 -1.755 c -1.09 -2.907 -4.341 -4.385 -7.249 -3.295 c -1.408 0.528 -2.526 1.573 -3.148 2.941 c -0.622 1.369 -0.674 2.898 -0.146 4.307 c 0.624 1.665 1.967 2.908 3.685 3.413 l 0.187 0.062 l 4.225 1.547 c 3.496 1.06 6.23 3.618 7.512 7.033 c 2.251 6.005 -0.803 12.722 -6.806 14.973 C 47.467 63.449 46.091 63.688 44.737 63.688 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 45 28.323 c -1.657 0 -3 -1.343 -3 -3 V 20.5 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 4.823 C 48 26.979 46.657 28.323 45 28.323 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
												<path
													d='M 45 68.5 c -1.657 0 -3 -1.343 -3 -3 v -4.823 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 V 65.5 C 48 67.157 46.657 68.5 45 68.5 z'
													style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
													transform=' matrix(1 0 0 1 0 0) '
													strokeLinecap='round'
												/>
											</g>
										</svg>
									))}
								</div>
							</a>
						</Link>
					</>
				)}

				{/* contact-icon */}
				{router?.pathname !== '/contact' ? (
					<Link href='/contact'>
						<a className={`${styles.contact_icon_wrapper} ${styles.icon_wrapper} white-color`}>
							<svg id='Menu' xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24'>
								<g id='Iconspace_Message_25px'>
									<path id='Path' d='M0,0H24V24H0Z' fill='none' />
									<path
										id='Combined_Shape'
										data-name='Combined Shape'
										d='M3.36,15.359a3.334,3.334,0,0,1-1.96-.631l7.081-6.2a.519.519,0,0,0,.133-.169,3.8,3.8,0,0,0,2.946-.006.512.512,0,0,0,.136.175l7.074,6.189a3.332,3.332,0,0,1-1.969.637ZM.706,14.06h0A3.332,3.332,0,0,1,0,12V3.36A3.367,3.367,0,0,1,.11,2.5L7.774,7.875.706,14.06Zm18.755-.008h0L12.395,7.869,20.05,2.5a3.347,3.347,0,0,1,.11.856V12a3.331,3.331,0,0,1-.7,2.052ZM8.6,7.242.512,1.576A3.357,3.357,0,0,1,3.36,0H16.8a3.357,3.357,0,0,1,2.848,1.576L11.563,7.242a2.7,2.7,0,0,1-2.966,0Z'
										transform='translate(1.92 4.8)'
										fill='#fff'
									/>
								</g>
							</svg>
							{/* Contact */}
						</a>
					</Link>
				) : (
					<a className={`${styles.contact_icon_wrapper} ${styles.icon_wrapper} white-color`}>
						<svg id='Menu' xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24'>
							<g id='Iconspace_Message_25px'>
								<path id='Path' d='M0,0H24V24H0Z' fill='none' />
								<path
									id='Combined_Shape'
									data-name='Combined Shape'
									d='M3.36,15.359a3.334,3.334,0,0,1-1.96-.631l7.081-6.2a.519.519,0,0,0,.133-.169,3.8,3.8,0,0,0,2.946-.006.512.512,0,0,0,.136.175l7.074,6.189a3.332,3.332,0,0,1-1.969.637ZM.706,14.06h0A3.332,3.332,0,0,1,0,12V3.36A3.367,3.367,0,0,1,.11,2.5L7.774,7.875.706,14.06Zm18.755-.008h0L12.395,7.869,20.05,2.5a3.347,3.347,0,0,1,.11.856V12a3.331,3.331,0,0,1-.7,2.052ZM8.6,7.242.512,1.576A3.357,3.357,0,0,1,3.36,0H16.8a3.357,3.357,0,0,1,2.848,1.576L11.563,7.242a2.7,2.7,0,0,1-2.966,0Z'
									transform='translate(1.92 4.8)'
									fill='#fff'
								/>
							</g>
						</svg>
						{/* Contact */}
					</a>
				)}

				{/* login-icon */}
				{status === 'loading' || gettingSocialLoginData ? (
					<button className='sml-btn black-color'>Authenticating</button>
				) : (
					<div className={`${styles.profile_container} profile-menu-wrapper`}>
						<a className={`${styles.login_icon_wrapper} ${styles.desktop_user_btn} profile_open_btn black-color`} onClick={() => profileMenuHandler()}>
							<button className='sml-btn black-color rotate-svg'>
								{loginUser?.id !== undefined ? <>{userData?.first_name}</> : <>Sign in</>}
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
								</svg>
							</button>
						</a>

						<a className={`${styles.login_icon_wrapper} ${styles.mob_user_btn} profile_open_btn black-color rotate-svg`} onClick={() => profileMenuHandler()}>
							<button className={`sml-btn black-color ${loginUser?.id !== undefined ? styles.mob_session : undefined}`}>
								{loginUser?.id !== undefined ? <>{userData?.first_name?.slice(0, 1)} </> : <>Sign in</>}
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
								</svg>
							</button>
						</a>
						<ProfileMenu className={`${styles.profile_menu}`} setshowProfileMenu={setshowProfileMenu} showProfileMenu={showProfileMenu} loginUser={loginUser} setloginUser={setloginUser} setactiveProvider={setactiveProvider} />
					</div>
				)}
			</div>
		</div>
	)
}

export default HeaderIcons

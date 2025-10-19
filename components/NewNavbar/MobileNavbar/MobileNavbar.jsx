import React, { useState, useContext } from 'react'
import { GlobalProvider } from '../../../context/AppProvider'
import styles from './MobileNavbar.module.css'
import MobSearch from './MobSearch/MobSearch'
import PageNavigation from './PageNavigation/PageNavigation'
import { lockScroll, unlockScroll } from '../../../utils/scrollLock'
import Link from 'next/link'
import { useRouter } from 'next/router'
import NotificationIcons from '../../UI/NotificationIcons/NotificationIcons'

const MobileNavbar = ({ setshowCartSidebar, setmodal, setModalData, closeSearchHanlder }) => {
	const router = useRouter()

	const [notificationData, setnotificationData] = useState()
	const [showNotifications, setshowNotifications] = useState(false)

	const [showMobPagesNav, setShowMobPagesNav] = useState(false)
	const { cartitemsLength, showMobSearchNav, setshowMobSearchNav, loginUser, userData } = useContext(GlobalProvider)

	if (typeof window !== 'undefined') {
		let notificationWrapper = document.querySelector('.notification-wrappers')
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

	return (
		<>
			<header aria-label='mobile navigation' className={`${styles.nav_bottom_bar_container} sec-container`}>
				<div className={`${styles.icon_wrapper} page-navigation-icon-wrapper`} onClick={() => setShowMobPagesNav(true)}>
					<svg xmlns='http://www.w3.org/2000/svg' className='page-navigation-icon cursor-pointer' fill='none' viewBox='0 0 24 24' stroke='var(--new-gray)'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M4 6h16M4 12h16M4 18h16' />
					</svg>
					<span>Menu</span>
				</div>

				<div className={`${styles.icon_wrapper} nav-search-icon-wrapper`} onClick={() => (setshowMobSearchNav(true), lockScroll())}>
					<svg xmlns='http://www.w3.org/2000/svg' className='cursor-pointer nav-search-icon' fill='none' viewBox='0 0 24 24' stroke='var(--new-gray)'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
					</svg>
					<span>Search</span>
				</div>
				{loginUser?.id !== undefined && userData?.position !== undefined && userData?.position !== 'Sales Rep' && (
					<div className={`${styles.icon_wrapper} nav-cart-icon-wrapper`} onClick={() => (setshowCartSidebar(true), lockScroll())}>
						<div style={{ position: 'relative', marginTop: '0.2rem' }}>
							<svg xmlns='http://www.w3.org/2000/svg' width='24.5' height={24} viewBox='0 0 24.5 24'>
								<g id='Group_1877' data-name='Group 1877' transform='translate(16721 54)'>
									<path id='path' d='M0,0H24V24H0Z' transform='translate(-16721 -54)' fill='none' />
									<path
										id='Subtraction_2'
										data-name='Subtraction 2'
										d='M16.079,20.16a2.255,2.255,0,0,1-2.266-2.239,2.212,2.212,0,0,1,.129-.746H11.166a2.2,2.2,0,0,1,.13.746,2.266,2.266,0,0,1-4.532,0,2.221,2.221,0,0,1,.547-1.459,3.727,3.727,0,0,1-1.534-2.635l-.012-.113a3.509,3.509,0,0,1-2.258-2.952L3.2,7.323c0-.022-.008-.043-.011-.066L2.865,4.107l-.183-1.5A1.249,1.249,0,0,0,1.43,1.493H.755A.752.752,0,0,1,0,.746.751.751,0,0,1,.755,0H1.43A2.749,2.749,0,0,1,4.185,2.458l.138,1.329h12.73c-.009.094-.014.192-.014.293A3.012,3.012,0,0,0,19.62,7.051l-.809,4.078a3.52,3.52,0,0,1-3.459,2.812H7.323a2.275,2.275,0,0,0,2.209,1.741h6.323a.334.334,0,0,1,.06,0h.007c.047,0,.1,0,.156,0a2.239,2.239,0,1,1,0,4.477Zm0-3.234a1,1,0,1,0,1.007.994A1,1,0,0,0,16.079,16.926Zm-7.05,0a1,1,0,1,0,1.007.994A1,1,0,0,0,9.03,16.926Z'
										transform='translate(-16720.039 -52.08)'
										fill='none'
										stroke='var(--new-gray)'
										strokeWidth={1}
									/>
									<rect id='Fill' width={6} height={6} rx={3} transform='translate(-16703 -51)' fill='none' stroke='var(--new-gray)' strokeWidth={1} />
								</g>
							</svg>

							<div className={`lite-dark-primary-bg cart-quantity ${styles.badge} white-color`}>{cartitemsLength}</div>
						</div>
						<span>Cart</span>
					</div>
				)}
				{loginUser?.id !== undefined && (
					<div className={`${styles.noti_main_wrapper} notification-wrappers`}>
						<NotificationIcons Listingtype='mobile_header_modal' loginUser={loginUser} notificationData={notificationData} showNotifications={showNotifications} setnotificationData={setnotificationData} setshowNotifications={setshowNotifications} />
					</div>
				)}
				{router?.pathname !== '/shop-now' ? (
					<Link href='/shop-now'>
						<a className={`${styles.shop_now} gray-color`}>
							{/* <button className='sml-btn primary-btn'> */}
							Shop Now
							{/* </button> */}
						</a>
					</Link>
				) : (
					<a className={`${styles.shop_now} primary-color semibold-text`}>
						{/* <button className='sml-btn primary-btn'> */}
						Shop Now
						{/* </button> */}
					</a>
				)}
			</header>
			{/* add animation */}
			{
				showMobPagesNav && (
					<PageNavigation showMobPagesNav={showMobPagesNav} setShowMobPagesNav={setShowMobPagesNav} loginUser={loginUser} userPosition={userData?.position} />
				)
			}
			{
				showMobSearchNav && (
					<MobSearch showMobSearchNav={showMobSearchNav} setshowMobSearchNav={setshowMobSearchNav} setmodal={setmodal} setModalData={setModalData} closeSearchHanlder={closeSearchHanlder} />
				)
			}
		</>
	)
}

export default MobileNavbar

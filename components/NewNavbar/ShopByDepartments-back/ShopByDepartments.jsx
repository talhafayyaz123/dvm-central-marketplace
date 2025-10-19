import React, { useContext, useRef, useState } from 'react'
import styles from './ShopByDepartments.module.css'
import ShopByDeptsLists from './ShopByDeptsLists/ShopByDeptsLists'
import Image from 'next/image'
import { imgApiUrl, siteUrl } from '../../../utils/config'
import { GlobalProvider } from '../../../context/AppProvider'
import { unlockScroll } from '../../../utils/scrollLock'
import profileImg from '../../../public/imgs/no-profile-img.png'

const ShopByDepartments = ({ showShopByDepts, setShowByDepts }) => {
	const shopByContainer = useRef(null)
	const [hideScroller, setHideScroller] = useState(false)
	const { userData, loginUser, setloginUser } = useContext(GlobalProvider)

	// close sidebar if clicked elsewhere
	if (typeof window !== 'undefined') {
		let listWrapper = document.querySelector('.shop-by-dpts-wrapper')

		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showShopByDepts === true) {
				if (!listWrapper.contains(e.target)) {
					setShowByDepts(false)
					unlockScroll()
				}
			} else return
		})
	}

	return (
		<div className={`${styles.shop_by_dpts_container} shop-by-dpts-container modal-bg transition ${showShopByDepts ? 'show-bd' : 'hide-bd'}`}>
			<div className={`${styles.shop_by_depts_wrapper} shop-by-dpts-wrapper sidebar white-bg transition ${showShopByDepts && 'show-sidebar'} ${hideScroller && 'hidden-scroller'}`} ref={shopByContainer}>
				<div className={`${styles.sign_in_wrapper} white-color black-bg`}>
					{loginUser?.id !== undefined ? (
						<>
							<div className={`${styles.profile_img_wrapper} primary-border full-radius`}>
								{userData?.vet_dvm_profile_image !== null ? (
									<Image
										src={userData?.vet_dvm_profile_image?.includes('base64') ? userData?.vet_dvm_profile_image : userData?.vet_dvm_profile_image !== null && userData?.vet_dvm_profile_image !== undefined ? `${imgApiUrl?.profileImg}/${userData?.vet_dvm_profile_image}` : profileImg}
										layout='fill'
										alt='VetandTech'
									/>
								) : (
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' width={40}>
										<path
											fillRule='evenodd'
											d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
											clipRule='evenodd'
										/>
									</svg>
								)}
							</div>
							<span>{userData?.name}</span>
						</>
					) : (
						<>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' width={40}>
								<path
									fillRule='evenodd'
									d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
									clipRule='evenodd'
								/>
							</svg>

							<a href={`${siteUrl}auth/signin`} onClick={() => setShowByDepts(false)} className={`white-color`}>
								Hi, Sign in
							</a>
						</>
					)}

					<svg onClick={() => (setShowByDepts(false), unlockScroll())} xmlns='http://www.w3.org/2000/svg' className={`${styles.cls_btn} page-navigation-close-btn transition`} fill='none' width={25} viewBox='0 0 24 24' stroke='#fff'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
					</svg>
				</div>

				<div className='shop-by-depts-lists-wrapper'>
					<ShopByDeptsLists showShopByDepts={showShopByDepts} setShowByDepts={setShowByDepts} shopByContainer={shopByContainer} setHideScroller={setHideScroller} loginUser={loginUser} setloginUser={setloginUser} />
				</div>
			</div>
		</div>
	)
}

export default ShopByDepartments

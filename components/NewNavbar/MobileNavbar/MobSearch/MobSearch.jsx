import React from 'react'
import SearchInput from '../../SearchInput/SearchInput'
import styles from './MobSearch.module.css'
import { unlockScroll } from '../../../../utils/scrollLock'

const MobSearch = ({ showMobSearchNav, setshowMobSearchNav, setmodal, setModalData, closeSearchHanlder }) => {
	// if (typeof window !== 'undefined') {
	// 	const backdrop = document.querySelector('.mob-search-wrapper')
	// 	document.body.addEventListener('mousedown', (e) => {
	// 		e.stopPropagation()
	// 		if (showMobSearchNav === true) {
	// 			if (!backdrop.contains(e.target)) {
	// 				setshowMobSearchNav(false)
	// 			}
	// 		} else return
	// 	})
	// }

	let mobSearchSidebar
	if (typeof window !== 'undefined') {
		mobSearchSidebar = document.querySelector('.mob-search-sidebar')
	}

	return (
		<div className={`${styles.mob_search_container} modal-bg transition ${showMobSearchNav ? 'show-bd' : 'hide-bd'}`}>
			<div className={`sidebar ${styles.mob_search_wrapper} mob-search-wrapper white-bg mob-search-sidebar  transition ${showMobSearchNav && 'show-sidebar'}`}>
				<h4 className='white-color black-bg'>
					<span>Search</span>

					<svg onClick={() => (setshowMobSearchNav(false), unlockScroll())} xmlns='http://www.w3.org/2000/svg' className='page-navigation-close-btn' fill='none' width={25} viewBox='0 0 24 24' stroke='#fff'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
					</svg>
				</h4>

				<SearchInput searchType='mobile' mobSearchSidebar={mobSearchSidebar} setmodal={setmodal} setModalData={setModalData} closeSearchHanlder={closeSearchHanlder} />
			</div>
		</div>
	)
}

export default MobSearch

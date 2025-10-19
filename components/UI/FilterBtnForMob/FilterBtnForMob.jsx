import React, { useEffect, useRef, useState } from 'react'
import styles from './FilterBtnForMob.module.css'
import { lockScroll, unlockScroll } from '../../../utils/scrollLock'

const FilterBtnForMob = ({ children, className, btnText, icon, closeSideBar, setcloseSideBar, type }) => {
	const [showFilterSidebar, setshowFilterSidebar] = useState(false)

	const sidebarBd = useRef(null)

	if (typeof window !== 'undefined') {
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showFilterSidebar) {
				if (!sidebarBd?.current?.contains(e.target)) {
					type !== undefined ? setcloseSideBar(false) : setshowFilterSidebar(false)
					unlockScroll()
				}
			} else return
		})

		window.addEventListener('resize', () => {
			if (window.matchMedia('(min-width: 1025px)').matches) {
				if (showFilterSidebar) {
					type !== undefined ? setcloseSideBar(false) : setshowFilterSidebar(false)
					unlockScroll()
				}
			}
		})
	}

	return (
		<>
			<div className={`${styles.filter_btn_wrapper} ${className}`}>
				<button className={`${styles.filter} primary-btn sml-btn white-color`} onClick={() => (setshowFilterSidebar(true), lockScroll(), type !== undefined && setcloseSideBar(true))}>
					<div>{btnText ? btnText : 'Filters'}</div>
					{icon ? (
						icon
					) : (
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--white)'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
							/>
						</svg>
					)}
				</button>
			</div>

			<div className={`${type === undefined ? showFilterSidebar && 'show-bd' : closeSideBar && 'show-bd'} hide-bd modal-bg transition`}>
				<div ref={sidebarBd} className={`${type === undefined ? showFilterSidebar && 'show-sidebar' : closeSideBar && 'show-sidebar'} ${styles.filter_sidebar} sidebar white-bg transition`}>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--white)' className={styles.close_sidebar} onClick={() => (setshowFilterSidebar(false), unlockScroll(), type !== undefined && setcloseSideBar(false))}>
						<path strokeLinecap='round' strokeLinejoin='round' d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
					</svg>

					<div className={`${styles.inner_wrapper} white-bg`}>{children}</div>
				</div>
			</div>
		</>
	)
}

export default FilterBtnForMob

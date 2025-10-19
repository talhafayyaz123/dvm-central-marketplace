import React from 'react'
import styles from './Smallbar.module.css'
import SmallbarNavigation from './SmallbarNavigation/SmallbarNavigation'
import { lockScroll } from '../../../utils/scrollLock'
import Icons from './Icons/Icons'

const Smallbar = ({ setShowByDepts, loginUser, userPosition, setshowCartSidebar }) => {
	return (
		<nav aria-label='small navbar below main navigation' className='white-bg'>
			<div className='sec-container'>
				<div className={styles.small_header_wrapper}>
					<button className={styles.shop_by_wrapper} onClick={() => (setShowByDepts(true), lockScroll())}>
						<svg width={18} height={19} viewBox='0 0 18 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M1.38462 0.125H6.92308C7.68669 0.125 8.30769 0.743029 8.30769 1.50299V7.01495C8.30769 7.77491 7.68669 8.39294 6.92308 8.39294H1.38462C0.621 8.39294 0 7.77491 0 7.01495V1.50299C0 0.743029 0.621 0.125 1.38462 0.125ZM1.38462 1.50299H6.92308V7.01495H1.38462V1.50299Z'
								fill='var(--new-gray)'
							/>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M0 16.6609V11.1489C0 10.389 0.621 9.77093 1.38462 9.77093H6.92308C7.68669 9.77093 8.30769 10.389 8.30769 11.1489V16.6609C8.30769 17.4208 7.68669 18.0389 6.92308 18.0389H1.38462C0.621 18.0389 0 17.4208 0 16.6609ZM1.38462 16.6609H6.92308V11.1489H1.38462V16.6609Z'
								fill='var(--new-gray)'
							/>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M18 1.50299C18 0.743029 17.379 0.125 16.6154 0.125H11.0769C10.3133 0.125 9.69231 0.743029 9.69231 1.50299V7.01495C9.69231 7.77491 10.3133 8.39294 11.0769 8.39294H16.6154C17.379 8.39294 18 7.77491 18 7.01495V1.50299ZM16.6154 7.01495V1.50299H11.0769V7.01495H16.6154Z'
								fill='var(--new-gray)'
							/>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M16.6154 18.0389H11.0769C10.3133 18.0389 9.69231 17.4208 9.69231 16.6609V11.1489C9.69231 10.389 10.3133 9.77093 11.0769 9.77093H16.6154C17.379 9.77093 18 10.389 18 11.1489V16.6609C18 17.4208 17.379 18.0389 16.6154 18.0389ZM16.6154 16.6609H11.0769V11.1489H16.6154V16.6609Z'
								fill='var(--new-gray)'
							/>
						</svg>

						<div style={{ color: 'var(--new-gray' }}>Categories</div>
					</button>

					<SmallbarNavigation loginUser={loginUser} userPosition={userPosition} />
					<Icons setshowCartSidebar={setshowCartSidebar} />
				</div>
			</div>
		</nav>
	)
}

export default Smallbar

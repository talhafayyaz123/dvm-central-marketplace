import React, { useState } from 'react'
import styles from './FilterAccordion.module.css'

const FilterAccordion = ({ title, children, pageType, className }) => {
	const [isClose, setIsClose] = useState(false)
	return (
		<div className={`${styles.accordion_wrapper} ${className} active-scrollbar`}>
			<div className={`${styles.title_wrapper} ${pageType === 'all-products' && isClose ? styles.padding : undefined} white-bg`} onClick={() => setIsClose(!isClose)}>
				<div className={`${styles.title} title primary-color`}>{title}</div>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='var(--primary)' className={`${!isClose && 'icon-rotated'} transition`}>
					<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
				</svg>
			</div>

			<div className={styles.opened_accordion} style={{ maxHeight: isClose ? '0' : '999999px' }}>
				{children}
			</div>
		</div>
	)
}

export default FilterAccordion

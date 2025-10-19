import React from 'react'
import styles from './VendorActivation.module.css'

const VendorActivation = () => {
	return (
		<section className='sec-p'>
			<div className={`${styles.container} sec-container`}>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={0.75} stroke='var(--green)'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
				</svg>

				<h3 className='primary-color'>{`Congratulations!`}</h3>
				<h5 className='gray-color'>{`Vendor activated successfully. You can close this page safely.`}</h5>
			</div>
		</section>
	)
}

export default VendorActivation

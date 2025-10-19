import React from 'react'
import styles from './ListingLayout.module.css'

const ListingLayout = ({ children, className }) => {
	return (
		<section className='inner-sec-p' style={{ height: '100%' }}>
			<div className='sec-container'>
				<div className={`${styles.listing_container} ${className}`}>{children}</div>
			</div>
		</section>
	)
}

export default ListingLayout

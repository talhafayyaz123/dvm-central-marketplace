import React from 'react'
import styles from './ListingLayout2.module.css'

const ListingLayout2 = ({ children, className = '' }) => {
	return <div className={`${styles.grid_wrapper} ${className}`}>{children}</div>
}

export default ListingLayout2

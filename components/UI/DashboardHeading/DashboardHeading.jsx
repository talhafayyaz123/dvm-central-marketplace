import React from 'react'
import styles from './DashboardHeading.module.css'

const DashboardHeading = ({ heading, children, className }) => {
	return (
		<div className={`${styles.heading} radius ${className}`}>
			<h3>{heading}</h3>
			{children && children}
		</div>
	)
}

export default DashboardHeading

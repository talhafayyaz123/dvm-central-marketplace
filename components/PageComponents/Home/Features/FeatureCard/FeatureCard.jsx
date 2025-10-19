import React from 'react'
import Image from 'next/image'
import styles from '../Features.module.css'

const FeatureCard = ({ src, title, children }) => {
	return (
		<div className={styles.feature}>
			<div className={`${styles.feature_icon_wrapper} transition`}>
				<Image src={src} alt={title} />
			</div>
			<h5>{title}</h5>
			{children}
		</div>
	)
}

export default FeatureCard

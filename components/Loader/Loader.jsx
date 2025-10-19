import React from 'react'
import styles from './Loader.module.css'

const LiteLoader = ({ className = '', loaderType }) => {
	return (
		<div className={`${styles.loader_wrapper} ${className}`}>
			<span className={`${styles.lite_loader} ${styles.loader} ${loaderType === 'sml' && styles.sml}`} />
		</div>
	)
}

const DarkLoader = ({ className = '', loaderType, alertType }) => {
	return (
		<div className={`${styles.loader_wrapper} ${alertType !== 'delete' && className}`}>
			<span className={`${styles.dark_loader} ${styles.loader} ${loaderType === 'sml' && styles.sml} ${alertType === 'delete' && className}`} />
		</div>
	)
}

const SecondaryLoader = ({ className = '', loaderType, alertType }) => {
	return (
		<div className={`${styles.loader_wrapper} ${alertType !== 'delete' && className}`}>
			<div className={`${styles.secondary_loader} ${styles.loader} ${loaderType === 'sml' && styles.sml} ${alertType === 'delete' && className}`} />
		</div>
	)
}

const BlackLoader = ({ className = '', loaderType }) => {
	return (
		<div className={`${styles.loader_wrapper} ${className}`}>
			<div className={`${styles.black_loader} ${styles.loader} ${loaderType === 'sml' && styles.sml}`} />
		</div>
	)
}

export { LiteLoader, DarkLoader, SecondaryLoader, BlackLoader }

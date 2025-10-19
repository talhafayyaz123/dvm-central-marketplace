import React from 'react'
import styles from './HomeCardsLayout.module.css'

const HomeCardsLayout = ({ children, className }) => {
	return <div className={`${styles.wrapper} ${className}`}>{children}</div>
}

export default HomeCardsLayout

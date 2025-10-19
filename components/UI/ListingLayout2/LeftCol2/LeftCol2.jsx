import React from 'react'
import styles from './LeftCol2.module.css'

const LeftCol2 = ({ children, className = '' }) => {
	return <div className={`${styles.left_col} ${className}`}>{children}</div>
}

export default LeftCol2

import React from 'react'
import styles from './LeftCol.module.css'

const LeftCol = ({ children, className = '' }) => {
	return <div className={`${styles.left_col} ${className}`}>{children}</div>
}

export default LeftCol

import React from 'react'
import styles from './RightCol2.module.css'

const RightCol2 = ({ children, className = '' }) => {
	return <div className={`${styles.right_col} ${className}`}>{children}</div>
}

export default RightCol2

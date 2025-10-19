import React from 'react'
import styles from './H2WithBorder.module.css'

const H2WithBorder = ({ text, className = '' }) => {
	return <h2 className={`${styles.h2_with_border} ${className}`}>{text}</h2>
}

export default H2WithBorder

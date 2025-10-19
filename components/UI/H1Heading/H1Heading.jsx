import React from 'react'
import styles from './H1Heading.module.css'

const H1Heading = ({ heading, className }) => {
	return <h1 className={`${styles.title} ${className} black-color`}>{heading}</h1>
}

export default H1Heading

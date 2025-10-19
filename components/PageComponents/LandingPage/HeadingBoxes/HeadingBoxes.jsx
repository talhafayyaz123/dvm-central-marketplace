import React from 'react'
import styles from './HeadingBoxes.module.css'

const HeadingBoxes = () => {
	return (
		<div className={styles.boxes_wrapper}>
			<div className={`${styles.box} ${styles.purple_box}`} />
			<div className={`${styles.box} ${styles.pink_box}`} />
			<div className={`${styles.box} ${styles.terqois_s_box}`} />
			<div className={`${styles.box} ${styles.terqois_b_box}`} />
		</div>
	)
}

export default HeadingBoxes

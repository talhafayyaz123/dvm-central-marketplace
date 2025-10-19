import React from 'react'
import styles from './RatingBars.module.css'

const RatingBars = ({ ratingBars }) => {
	return (
		<div className={styles.bars_wrapper}>
			<div className={styles.bar}>{/* {ratingBars?.1 stars} */}</div>
		</div>
	)
}

export default RatingBars

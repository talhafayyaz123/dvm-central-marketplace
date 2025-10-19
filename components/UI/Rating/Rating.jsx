import React from 'react'
import styles from './Rating.module.css'
import { Rating as RatingP } from '@smastrom/react-rating'

const Rating = ({ data, type, className = '' }) => {
	return (
		data !== null &&
		data !== undefined && (
			<div className={`${styles.stars_wrapper} ${className}`}>
				{/* <div className={`${styles.star_wrapper} ${type !== 'card' && styles.big_stars_wrapper}`}>
					<RatingP className='custom-classname' style={{ maxWidth: 150 }} readOnly value={data} />
				</div> */}
			</div>
		)
	)
}

export default Rating

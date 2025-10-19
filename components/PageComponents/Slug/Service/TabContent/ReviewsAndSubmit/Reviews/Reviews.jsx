import React from 'react'
import styles from './Reviews.module.css'
import Rating from '../../../../../UI/Rating/Rating'
import RatingBars from './RatingBars/RatingBars'

const Reviews = ({ rating, ratingBars, reviewCount }) => {
	return (
		<div>
			<h5>Customer Reviews</h5>

			<div className={styles.star_rating}>
				<Rating data={rating} />
				<div className={`${styles.count} orange-color semibold-text`}>{rating}/5</div>
				<div className='gray-color'>{`(${reviewCount})`}</div>
			</div>

			<RatingBars ratingBars={ratingBars} />
		</div>
	)
}

export default Reviews

import React from 'react'
import styles from './SellerDetail.module.css'
import Rating from '../../../../../../UI/Rating/Rating'
import Link from 'next/link'

const SellerDetail = ({ data: { name, rating, slug } }) => {
	return (
		<div className={styles.seller_detail_wrapper}>
			<div className={styles.sold_text}>Sold by</div>
			<div className={styles.space_bet}>
				<h5 className={styles.vendor}>{name}</h5>
				<Rating data={rating} />
			</div>

			{/* <div className={styles.other_ratings_wrapper}>
				<div>Positive Seller Ratings</div>
				<div>Ship on Time</div>
				<div>Response Rate</div>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='var(--primary)'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
					/>
				</svg>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='var(--primary)'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
				</svg>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='var(--primary)'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99' />
				</svg>

				<h5>N/A </h5>
				<h5>N/A </h5>
				<h5>N/A </h5>
			</div> */}

			<Link href={`vendors/${slug}`}>
				<a className={styles.btn}>
					<button className='white-btn primary-border sml-btn primary-color'>Visit Store</button>
				</a>
			</Link>
		</div>
	)
}

export default SellerDetail

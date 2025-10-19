import React from 'react'
import styles from './SellerDetail.module.css'
import Rating from '../../../../../../UI/Rating/Rating'
import Link from 'next/link'

const SellerDetail = ({ data: { name, rating, slug } }) => {
	return (
		<div className={styles.seller_detail_wrapper}>
			<div className={styles.sold_text}>Services by</div>
			<div className={styles.space_bet}>
				<h5 className={styles.vendor}>{name}</h5>
				<Rating data={rating} />
			</div>

			<Link href={`service-providers/${slug}`}>
				<a className={styles.btn}>
					<button className='white-btn primary-border sml-btn primary-color'>Visit Store</button>
				</a>
			</Link>
		</div>
	)
}

export default SellerDetail

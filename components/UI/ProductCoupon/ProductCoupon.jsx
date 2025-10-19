import React from 'react'
import styles from './ProductCoupon.module.css'

const ProductCoupon = ({ name }) => {
	return (
		<div className={styles.coupon_data_wrapper}>
			<div className='blink'>
				<div className={styles.coupon_data}>
					{' '}
					<span className=''>Coupon Applied</span>{' '}
					<span className={styles.coupon}>
						<span>{name}</span>
					</span>
				</div>
			</div>
			{/* <div className={`${styles.apply}`}>Will be applied on checkout</div> */}
		</div>
	)
}

export default ProductCoupon

import React from 'react'
import shippingIcon from '/public/imgs/product/features/shipping.svg'
import returnIcon from '/public/imgs/product/features/return.svg'
import billsIcon from '/public/imgs/product/features/bills.svg'
import payIcon from '/public/imgs/product/features/pay.svg'
import Image from 'next/image'
import styles from './Features.module.css'

const Features = () => {
	return (
		<section className='features sec-p'>
			<div className='sec-container'>
				<div className={styles.features_wrapper}>
					<div className={`${styles.feature} radius`}>
						<div className={styles.icon_wrapper}>
							<Image src={shippingIcon} alt='Shipping Worldwide' />
						</div>
						<div className={`${styles.title} semibold-text`}>Shipping Worldwide</div>
					</div>

					<div className={`${styles.feature} radius`}>
						<div className={styles.icon_wrapper}>
							<Image src={returnIcon} alt={`Free 7-day return if eligible, so easy`} />
						</div>
						<div className={`${styles.title} semibold-text`}>{`Free 7-day return if eligible, so easy`}</div>
					</div>

					<div className={`${styles.feature} radius`}>
						<div className={styles.icon_wrapper}>
							<Image src={billsIcon} alt='Supplier give bills for this product' />
						</div>
						<div className={`${styles.title} semibold-text`}>Supplier give bills for this product</div>
					</div>

					<div className={`${styles.feature} radius`}>
						<div className={styles.icon_wrapper}>
							<Image src={payIcon} alt='Pay online or when receiving goods' />
						</div>
						<div className={`${styles.title} semibold-text`}>Pay online or when receiving goods</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Features

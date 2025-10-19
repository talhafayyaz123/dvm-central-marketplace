import React from 'react'
import styles from './TrackOrder.module.css'
import placeHolderImg from '/public/imgs/no-img.webp'
import { imgApiUrl } from '../../../utils/config'
import ImgWithLoader from '../../UI/ImgWithLoader/ImgWithLoader'

const OrderDetail = ({ orderTrackDetail }) => {
	return (
		<div className='sec-container'>
			<div className='sec-mb'>
				<h3 className={`${styles.order_detail_heading} inner-sec-mt`}>Order #{orderTrackDetail?.id} Details</h3>
				{orderTrackDetail?.vendor_items?.length > 0 ? (
					<div className={styles.order_detail_container}>
						<div className={styles.heading_wrapper}>
							<div className={`${styles.order_detail_wrapper} `}>
								<div className={`${styles.border} ${styles.wrapper}`}>
									<h5 className={styles.title}>Seller Name</h5>
								</div>
								<div className={`${styles.border} ${styles.wrapper}`}>
									<h5 className={styles.title}>Product Image</h5>
								</div>
								<div className={`${styles.border} ${styles.wrapper} ${styles.two_col}`}>
									<h5 className={styles.title}>Product</h5>
								</div>
								<div className={`${styles.border} ${styles.wrapper}`}>
									<h5 className={styles.title}>Amount</h5>
								</div>
								<div className={`${styles.border} ${styles.wrapper}`}>
									<h5 className={styles.title}>Quantity</h5>
								</div>
								<div className={`${styles.border} ${styles.wrapper}`}>
									<h5 className={styles.title}>Status</h5>
								</div>
								<div className={`${styles.wrapper}`}>
									<h5 className={styles.title}>Date & Time</h5>
								</div>
							</div>
						</div>
						{orderTrackDetail?.vendor_items?.map((data, index) => {
							const { image } = data
							return (
								<div key={index} className={`${styles.order_detail_wrapper} radius gray-border`}>
									<div className={`${styles.border} ${styles.wrapper} ${styles.text} black-color semibold-text`}>{data?.vendor?.name}</div>
									<div className={`${styles.wrapper}  ${styles.border}`}>
										<ImgWithLoader width={100} height={100} className={`${styles.img} radius`} src={image !== null ? `${imgApiUrl.products?.thumbnail}/${image}` : placeHolderImg} alt={data?.name} />
									</div>
									<div className={`${styles.border} ${styles.wrapper} ${styles.text} ${styles.name} black-color ${styles.two_col}`}>{data?.name}</div>
									<div className={`${styles.border} ${styles.wrapper} ${styles.text} primary-color ${styles.name}`}>${data?.price.toFixed(2)}</div>
									<div className={`${styles.border} ${styles.wrapper} ${styles.text} white-color`}>
										<div className={`${styles.qty} primary-bg full-radius`}>{data?.quantity}</div>
									</div>
									<div className={`${styles.border} ${styles.wrapper} ${styles.text} ${styles.status}`}>
										<div>{data?.order_status ? data?.order_status : 'Pending'}</div>
									</div>
									<div className={`${styles.wrapper} ${styles.text} gray-color`}>{orderTrackDetail?.creation_time}</div>
								</div>
							)
						})}
					</div>
				) : (
					<div className='red-color'>No Oder detail found. Recheck your order number.</div>
				)}
			</div>
		</div>
	)
}

export default OrderDetail

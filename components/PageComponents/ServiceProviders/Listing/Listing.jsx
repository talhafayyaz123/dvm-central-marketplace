import React from 'react'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import styles from './Listing.module.css'
import Link from 'next/link'
import { imgApiUrl } from '../../../../utils/config'
import placeHolderImg from '/public/imgs/no-img.webp'

const Listing = ({ initialData, resultWrapper }) => {
	return (
		<div ref={resultWrapper}>
			{initialData?.length === 0 ? (
				<div className='red-color'>No result found...</div>
			) : (
				initialData?.map((serviceProviders) => {
					return (
						<Link key={serviceProviders?.id} href={`/service-providers/${serviceProviders?.slug}`}>
							<a className={`${styles.card} primary-bb shadow bg-white radius`}>
								<ImgWithLoader className={styles.img} layout='fill' src={serviceProviders?.logo !== null ? `${imgApiUrl.vendor.logo}/${serviceProviders?.logo}` : placeHolderImg} alt={serviceProviders?.name} />
								<div className={styles.card_content}>
									<div className={styles.heading_wrapper}>
										<h4>{serviceProviders?.name}</h4>
										<div className={`primary-color semibold-text link ${styles.link}`}>View Details</div>
									</div>
									<div className={styles.btns_wrapper}>
										{serviceProviders?.services_seller === 'Y' && (
											<button role='presentation' className='blink primary-btn sml-btn btn white-color'>
												Seller
											</button>
										)}
										{serviceProviders?.sp_preferred === 'Y' && (
											<button role='presentation' className='sml-btn primary-border white-btn'>
												{' '}
												DVM Preferred
											</button>
										)}
										{serviceProviders?.sp_deal && (
											<button role='presentation' className='sml-btn primary-border white-btn'>
												DVM Deals
											</button>
										)}
									</div>
									<div className={`${styles.info} gray-color`} dangerouslySetInnerHTML={{ __html: serviceProviders?.sp_short_details }} />
								</div>
							</a>
						</Link>
					)
				})
			)}
		</div>
	)
}

export default Listing

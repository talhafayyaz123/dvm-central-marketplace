import Link from 'next/link'
import React, { useContext } from 'react'
import styles from './ServiceCard.module.css'
import WishlistIcon from '../WishlistIcon/WishlistIcon'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import { imgApiUrl } from '../../../utils/config'
import { GlobalProvider } from '../../../context/AppProvider'

const ServiceCard = ({ data }) => {
	const { id, name, image, slug, short_description, plan_range } = data

	const { loginUser, userData } = useContext(GlobalProvider)

	return (
		<div className={`${styles.card} sml-shadow radius transition white-bg`}>
			{loginUser?.id !== undefined && userData?.position !== undefined && userData?.position !== 'Sales Rep' && (
				<div className={`full-radius primary-border white-bg ${styles.wishlist}`}>
					<WishlistIcon id={id} type='services' />
				</div>
			)}
			<Link href={`/${slug}`}>
				<a>
					<ImgWithLoader className={styles.img} width={320} height={320} src={`${imgApiUrl.vendor.services}/${image}`} />

					<div className={styles.content}>
						<div className={styles.name}>
							{name?.substring(0, 50)}
							{name?.length > 50 ? '...' : ''}
						</div>
						<p className='gray-color'>{short_description?.length > 50 ? short_description?.substring(0, 50) + '...' : short_description}</p>
						<div className={`${styles.price} primary-color semibold-text`}>{plan_range}</div>
					</div>
				</a>
			</Link>
			<div className={styles.btns_wrapper}>
				<Link href={`/${slug}`}>
					<a>
						<button className='primary-btn sml-btn'>Click to View</button>
					</a>
				</Link>
			</div>
		</div>
	)
}

export default ServiceCard

import React from 'react'
import styles from './NewVendorsCard.module.css'
import ImgWithLoader from '../../UI/ImgWithLoader/ImgWithLoader'
import { imgApiUrl } from '../../../utils/config'
import placeHolderImg from '/public/imgs/no-img.webp'
import WishlistIcon from '../../UI/WishlistIcon/WishlistIcon'
import Rating from '../../UI/Rating/Rating'
import Link from 'next/link'

const NewVendorsCard = ({ vendors }) => {
	const { rating, name, logo, slug, id, rating_counts } = vendors
	return (
		<Link href={`/vendors/${slug}`}>
			<a className={styles.wrapper}>
				<div className={`radius shadow ${styles.image_wrapper}`}>
					<ImgWithLoader src={logo !== null ? `${imgApiUrl.vendor.logo}/${logo}` : placeHolderImg} width={200} height={200} alt={name} />
					{/* <div className={styles.wishlist_wrapper}>
						<WishlistIcon id={id} />
					</div> */}
				</div>
				<div className={styles.vendor_info}>
					<div className={`${styles.name} black-color semibold-text`}>{name}</div>
					{rating_counts > 0 && (
						<div className={styles.stars}>
							<Rating type='card' data={rating} className={styles.rating_stars} />
							<span className='gray-color'>
								({rating_counts} review{rating_counts > 1 ? 's' : ''})
							</span>
						</div>
					)}
				</div>
			</a>
		</Link>
	)
}

export default NewVendorsCard

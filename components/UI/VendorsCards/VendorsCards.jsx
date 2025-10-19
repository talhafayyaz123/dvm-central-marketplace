import Image from 'next/image'
import React, { useContext, useState } from 'react'
import styles from './VendorsCards.module.css'
import { baseApiUrl, imgApiUrl } from '../../../utils/config'
import Link from 'next/link'
// import Rating from '../Rating/Rating'
import placeHolderImg from '/public/imgs/no-img.webp'
import { DarkLoader } from '../../Loader/Loader'
import axios from 'axios'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import { GlobalProvider } from '../../../context/AppProvider'

const VendorsCards = ({ data, followStatusChanged, setfollowStatusChanged, followType, pageType, type, onClick }) => {
	const { id, name, logo, slug, rating, reviewsCounts, products_count, followers } = data

	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)

	const { loginUser } = useContext(GlobalProvider)

	const vendorFollowHandler = async () => {
		followStatusChanged !== undefined && setfollowStatusChanged(false)
		setloading(true)
		setbtndisabled(true)
		const data = {
			customer_id: loginUser?.id,
			vendor_id: id
		}

		await axios.post(`${baseApiUrl}/follow`, data)
		setloading(false)
		setbtndisabled(false)
		followStatusChanged !== undefined && setfollowStatusChanged(true)
	}

	return (
		<div className={`${styles.card} shadow radius white-bg primary-bb ${type === 'meeting' ? styles.appointment : undefined}`}>
			{type !== 'meeting' && (
				<div className={`${styles.bgimg_wrapper} radius`}>
					<Image src={logo !== null ? `${imgApiUrl.vendor.logo}/${logo}` : placeHolderImg} alt={name} layout='fill' />
				</div>
			)}
			<div className={styles.content_wrapper}>
				<div className={styles.card_content}>
					<div className={styles.inner_wrapper}>
						<Link href={`/vendors/${slug}`}>
							<a>
								<div className={`${styles.name} primary-color semibold-text`}>{name}</div>
								{/* 
								{rating !== null && rating !== 0 && reviewsCounts !== 0 && (
									<div className={`${styles.rating_wrapper} gray-color`}>
										<Rating className={styles.rating} data={rating} type='card' />
										<div className={styles.rating_num}>{rating}/5</div>
										<div className={styles.count}>{reviewsCounts} Ratings</div>
									</div>
								)} */}
							</a>
						</Link>
						{pageType === 'following' && (
							<div className={styles.follow_wrapper}>
								<button role='presentation' className={`${styles.followers_btn} sml-btn primary-color`}>
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
										/>
									</svg>
									<span>
										{followers} Follower{followers > 1 ? 's' : ''}
									</span>
								</button>
								{loginUser?.id !== undefined ? (
									<button className={`${styles.follow_btn} sml-btn primary-border primary-color`} disabled={btndisabled} onClick={() => vendorFollowHandler()}>
										{followType === 'followed' ? 'Following' : 'Follow'} {loading && <DarkLoader loaderType='sml' className={styles.loader} />}
									</button>
								) : (
									<button className={`${styles.chat_btn} sml-btn`} onClick={() => chatModalHandler()}>
										Sign in to Follow or chat
									</button>
								)}
							</div>
						)}

						{/* <Link href={`/vendors/${slug}`}>
							<a className={`${styles.products}`}>Number of Products: {products_count}</a>
						</Link> */}
					</div>

					<div className={styles.btns_wrapper}>
						{type === 'meeting' && (
							<button className={`${styles.appointment_btn} primary-border primary-color white-btn sml-btn`} onClick={onClick}>
								Reserve Virtual Meeting
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
									/>
								</svg>
							</button>
						)}
						<Link href={`/vendors/${slug}`}>
							<a className={`${styles.view_btn} primary-color`}>
								<button className='primary-btn white-color sml-btn'>
									View Store
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='currentColor' className='w-6 h-6'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75' />
									</svg>
								</button>
							</a>
						</Link>
					</div>
				</div>

				<Link href={`/vendors/${slug}`}>
					<a className={styles.vendor_logo_wrapper}>
						<ImgWithLoader className={`${styles.vendor_logo} radius gray-border`} layout='fill' src={logo !== null ? `${imgApiUrl.vendor.logo}/${logo}` : placeHolderImg} alt={name} />
					</a>
				</Link>
			</div>
		</div>
	)
}

export default VendorsCards

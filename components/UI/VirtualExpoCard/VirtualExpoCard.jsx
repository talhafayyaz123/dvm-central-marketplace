import Image from 'next/image'
import React from 'react'
import styles from './VirtualExpoCard.module.css'
import { imgApiUrl } from '../../../utils/config'
import Link from 'next/link'
import getDate from '../../../utils/getDate'
import { useRouter } from 'next/router'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import noImg from '/public/imgs/expo-no-img.png'

const VirtualExpoCard = ({ data, pageType, className = '' }) => {
	const { location, name, start_date, slug, image, time_zone } = data

	const router = useRouter()

	// const slicedStartDate = getDate(start_date.slice(0, 10))
	// const slicedEndDate = getDate(end_date.slice(0, 10))

	const slicedStartTime = start_date?.slice(-8)
	const startHourMnt = slicedStartTime?.slice(0, 5)
	const startCorrectHourMnt = (startHourMnt?.slice(0, 2) > 12 ? startHourMnt?.slice(0, 2) - 12 + ':' + startHourMnt?.slice(-2) : startHourMnt?.slice(0, 2) + ':' + startHourMnt?.slice(-2)) + `${startHourMnt?.slice(0, 2) < 12 ? ' AM' : ' PM'}`

	// const slicedEndTime = end_date.slice(-8)
	// const endHourMnt = slicedEndTime.slice(0, 5)
	// const endCorrectHourMnt = endHourMnt.slice(0, 2) >= 12 ? endHourMnt.slice(0, 2) - 12 + ':' + endHourMnt.slice(-2) + ' PM' : endHourMnt + ' AM'

	return router.pathname !== '/mobile' ? (
		<Link href={`/virtual-expo/${slug}`}>
			<a className={`${styles.webinar_card} ${className} shadow radius white-bg gray-color primary-bb`}>
				<ImgWithLoader loaderType='sml' bg='bg' lazyBoundary='400px' className={`${pageType !== undefined ? styles.slider_blog : undefined} ${styles.eventimg_wrapper} radius`} width={638} height={510} src={image !== null ? `${imgApiUrl.virtualExpo.img}/${image}` : noImg} alt={name} />

				<h5 className={`${styles.name} primary-color ${pageType === 'slider' ? styles.slider_title : undefined} `}>{name}</h5>
				{start_date && (
					<div className={styles.start_date}>
						<span>Date:</span> {name === 'DVM Central Expo, Lunch & Learn' ? 'July 2, 2024' : getDate(start_date)}
					</div>
				)}

				{start_date && (
					<div className={styles.start_date}>
						<span>Time:</span> {name === 'DVM Central Expo, Lunch & Learn' ? '2:00 PM' : startCorrectHourMnt} {time_zone !== undefined && time_zone !== null && `(${time_zone})`}
					</div>
				)}

				{location !== null && location !== undefined && location !== 'Online' && (
					<address>
						<span className='semibold-text'>Location :</span> {location}
					</address>
				)}
			</a>
		</Link>
	) : (
		<div className={`${styles.webinar_card} ${className} radius white-bg gray-color shadow`}>
			<ImgWithLoader loaderType='sml' lazyBoundary='400px' className={`${styles.eventimg_wrapper} radius`} layout='fill' src={image !== null ? `${imgApiUrl.virtualExpo.img}/${image}` : noImg} alt={name} />

			<h5 className={`${styles.name} primary-color`}>{name}</h5>
			{start_date && (
				<div className={styles.start_date}>
					<span>Start Date:</span> {getDate(start_date)}
				</div>
			)}

			{start_date && (
				<div className={styles.start_date}>
					<span>Start Time:</span> {startCorrectHourMnt} {time_zone !== undefined && time_zone !== null && `(${time_zone})`}
				</div>
			)}

			{location !== null && location !== undefined && location !== 'Online' && (
				<address>
					<span className='semibold-text'>Location :</span> {location}
				</address>
			)}
		</div>
	)
}

export default VirtualExpoCard

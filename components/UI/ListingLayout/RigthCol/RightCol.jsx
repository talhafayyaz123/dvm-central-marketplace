import React, { useEffect, useState } from 'react'
import styles from './RightCol.module.css'
import Wave from '../../../UI/Wave/Wave'
import H1Heading from '../../../UI/H1Heading/H1Heading'

const RigthCol = ({ listingTitle, description, long_description, children, pageType, className = '' }) => {
	const [showMore, setshowMore] = useState(false)
	const [longDescription, setlongDescription] = useState()

	useEffect(() => {
		pageType == 'category-listing' && long_description !== null && setlongDescription(() => `${long_description?.substring(0, 1000)}${long_description?.length > 1000 && !showMore ? '...' : ''}`)
	}, [])

	useEffect(() => {
		const links = document.querySelectorAll('.dynamic-data a')
		links?.length > 0 && links.forEach((link) => (!link.querySelector('img') && link.classList.add('link'), link.setAttribute('target', '_blank')))
	}, [longDescription])

	return (
		<div id='d-pages' className={`${styles.listing_wrapper} ${className}`}>
			{pageType === 'sub-category-listing' && (
				<div className={`${styles.banner_wrapper} inner-sec-p gradient-sec radius`}>
					<Wave />
					<div className={`${styles.heading_wrapper} ${styles.product_sub_category} heading_wrapper white-color`}>
						<H1Heading heading={listingTitle} />
						<div className={`${styles.short_info} white-color dynamic-data`} dangerouslySetInnerHTML={{ __html: description }} />
					</div>
				</div>
			)}
			{pageType === 'category-listing' && (
				<div className={`${styles.heading_wrapper} heading_wrapper white-color`}>
					<H1Heading heading={listingTitle} />
					{description !== null && <div className={`${styles.short_info} dynamic-data gray-color`} dangerouslySetInnerHTML={{ __html: description }} />}
				</div>
			)}

			{children}

			{pageType === 'category-listing' && long_description !== null && <div className={`${styles.long_info} dynamic-data gray-color`} dangerouslySetInnerHTML={{ __html: `${longDescription}` }} />}
			{long_description?.length > 1000 && !showMore && long_description !== null && (
				<button className={`${styles.read_more} primary-btn white-color`} onClick={() => (setlongDescription(long_description), setshowMore(true))}>
					Read More
				</button>
			)}
		</div>
	)
}

export default RigthCol

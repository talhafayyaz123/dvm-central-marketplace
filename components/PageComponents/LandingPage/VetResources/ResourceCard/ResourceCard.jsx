import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './ResourceCard.module.css'

const ResourceCard = ({ src, title, info, href }) => {
	return (
		<div className={`${styles.resource_card} transition`}>
			<div className={styles.icon_wrapper}>
				<div className={styles.icon_bg} />
				<Image width={60} height={60} src={src} alt={title} />
			</div>
			<h4 className={styles.title}>{title}</h4>
			<p className='gray-color'>{info}</p>
			<Link href={href}>
				<a className={styles.button}>
					<button className='lp-btn'>Learn More</button>
				</a>
			</Link>
		</div>
	)
}

export default ResourceCard

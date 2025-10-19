import React from 'react'
import styles from './CourseCard.module.css'
import { imgApiUrl } from '../../../utils/config'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import Link from 'next/link'
import currencyFormat from '../../../utils/currencyFormat'

const CourseCard = ({ data, vendor }) => {
	const { id, short_description, price_discounted, slug, title, thumbnail, price, is_buyed, course_chapter_id } = data

	return (
		<Link href={`/vendors/${vendor}/${slug}`}>
			<a key={id} className={`sml-shadow radius white-bg ${styles.course}`}>
				<ImgWithLoader width={300} height={300} src={course_chapter_id !== null ? `${imgApiUrl?.courses?.image}/${thumbnail}` : `${imgApiUrl?.courses?.video?.thumbnail}/${thumbnail}`} alt={title} />
				<div className={styles.info}>
					<h5>{title}</h5>
					{price_discounted !== null && price_discounted !== 0 ? (
						<>
							<span className={styles.dis_price}>{currencyFormat(price)}</span> <span className='secondary-color'>{currencyFormat(price_discounted)} </span>{' '}
							<span className='gray-color'>{price !== 0 && price !== null ? <>{(100 - (price_discounted / price) * 100).toFixed(0)}%Off </> : <>100%Off</>}</span>{' '}
						</>
					) : (
						<span>{currencyFormat(price)}</span>
					)}

					{short_description !== undefined && short_description !== null ? (
						<p className='gray-color'>{short_description?.length > 30 ? short_description.substring(0, 30) + '...' : short_description}</p>
					) : (
						<p className='gray-color'>{data?.description?.length > 30 ? data?.description.substring(0, 30) + '...' : data?.description}</p>
					)}
				</div>
			</a>
		</Link>
	)
}

export default CourseCard

import React from 'react'
import styles from './NewCourseCard.module.css'
import Link from 'next/link'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import { imgApiUrl } from '../../../utils/config'
import currencyFormat from '../../../utils/currencyFormat'
import noImg from '/public/imgs/no-img.webp'
import Message from '../Message/Message'

const NewCourseCard = ({ data, vendor }) => {
	const { id, price_discounted, slug, title, thumbnail, price_original, course_chapter_id } = data
	return (
		<Link href={`/vendors/${vendor}/${slug}`}>
			<a className={`white-bg radius shadow transition primary-bb ${styles.main_wrapper}`}>
				<div className={styles.info}>
					<ImgWithLoader bg={thumbnail !== null ? 'bg' : undefined} className={styles.image} width={300} height={200} src={thumbnail !== null ? (course_chapter_id !== null ? `${imgApiUrl?.courses?.image}/${thumbnail}` : `${imgApiUrl?.courses?.video?.thumbnail}/${thumbnail}`) : noImg} alt={title} />
					<h5>
						{title?.slice(0, 30)}
						{title?.length > 30 ? '...' : ''}
					</h5>
				</div>
				<div className={styles.price_wrapper}>
					{price_discounted !== null && price_discounted !== 0 && price_discounted !== price_original && price_discounted < price_original ? (
						<div className={styles.price_container}>
							<span className={`primary-color semibold-text`}>{currencyFormat(price_discounted)}</span>
							<span className={`red-color ${styles.disc_price}`}>{currencyFormat(price_original)}</span>
							<span className='gray-color'>{(100 - (price_discounted / price_original) * 100).toFixed(0)} %Off</span>
						</div>
					) : (
						<div className={styles.price_container}>{price_original !== null && price_original !== 0 ? <span className='semibold-text'>{currencyFormat(price_original)}</span> : <Message className={styles.no_price} resMsg={'Price N/A'} formSuccess={false} />}</div>
					)}
					<span className={`primary-color link ${styles.read_more}`}>Read More</span>
				</div>
			</a>
		</Link>
	)
}

export default NewCourseCard

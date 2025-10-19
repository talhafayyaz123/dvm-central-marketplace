import React from 'react'
import styles from './TestmonialCard.module.css'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import placeholderImg from '/public/imgs/no-img.webp'
import Rating from '../Rating/Rating'
import { imgApiUrl } from '../../../utils/config'

const TestmonialCard = ({ data, className }) => {
	const { name, rating, comments, customer } = data
	const { vet_dvm_profile_image } = customer

	return (
		<div className={`${styles.card} ${className} shadow radius white-bg`}>
			<ImgWithLoader
				className={`${styles.img} gray-border full-radius`}
				width={100}
				height={100}
				src={vet_dvm_profile_image?.includes('base64') ? vet_dvm_profile_image : vet_dvm_profile_image !== null && vet_dvm_profile_image !== undefined ? `${imgApiUrl?.profileImg}/${vet_dvm_profile_image}` : placeholderImg}
				alt={name}
			/>
			<div className={`${styles.name} semibold-text`}>{name}</div>
			<Rating data={rating} type='card' />
			<p className='gray-color'>{comments}</p>
		</div>
	)
}

export default TestmonialCard

import React, { memo } from 'react'
import Link from 'next/link'
import styles from './CategoryCard.module.css'
import { imgApiUrl } from '../../../utils/config'
import placeHolderImg from '/public/imgs/no-img.webp'
import ImgWithLoader from '../../UI/ImgWithLoader/ImgWithLoader'
import Image from 'next/image'


const CategoryCard = memo(({ data, pageType, index, className = '' }) => {
	const { slug, icon_image, name } = data


	const imageSrc = pageType === 'shop-now' && icon_image 
		? `${imgApiUrl.bussinessType.image}/${icon_image}` 
		: data?.image 
			? `${imgApiUrl.categories.medium}/${data?.image}` 
			: placeHolderImg


	const cardClassName = `${styles.category_card} ${pageType !== 'home' ? styles.global_category_card : ''} shadow ${className}`.trim()

	return (
		<Link href={`/${slug}`}>
			<a className={cardClassName}>
			{index === 0 ? (
					// Use Next js Image for the first index
					<Image priority src={imageSrc} width={180} height={180} alt={name} />
				) : (
					<ImgWithLoader src={imageSrc} width={180} height={180} alt={name} />
				)}
				<div className={`semibold-text ${styles.name}`}>{name}</div>
			</a>
		</Link>
	)
})

export default CategoryCard

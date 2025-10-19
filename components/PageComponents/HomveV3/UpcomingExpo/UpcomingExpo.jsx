import React from 'react'
import styles from './UpcomingExpo.module.css'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import { imgApiUrl } from '../../../../utils/config'
import placeholderImg from '/public/imgs/expo-no-img.png'
import HeadingWithBtn from '../../../UI/HeadingWithBtn/HeadingWithBtn'

const UpcomingExpo = ({ data }) => {
	const { name, image, slug, short_detail } = data
	return (
		<section className='sec-m'>
			<div className='sec-container'>
				<div className={styles.wrapper}>
					<ImgWithLoader className={styles.img} width={638} height={510} src={image !== null ? `${imgApiUrl.virtualExpo.img}/${image}` : placeholderImg} alt={name} />

					<HeadingWithBtn className={styles.content} blackHeading='DVM Central' colorHeading={`Virtual Events/Expos`} svg={true} btnText='Register Today' href={`/virtual-expo/${slug}`} reverse={true}>
						<h5 className='primary-color'>Offering a Dynamic Experience</h5>
						<p className='gray-color'>{short_detail}</p>
					</HeadingWithBtn>
				</div>
			</div>
		</section>
	)
}

export default UpcomingExpo

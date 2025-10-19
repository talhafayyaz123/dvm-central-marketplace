import React, { useContext, useState } from 'react'
import styles from './NewArrivalCard.module.css'
import { baseApiUrl, imgApiUrl } from '../../../utils/config'
import Image from 'next/image'
import placeHolderImg from '/public/imgs/no-img.webp'
import { DarkLoader } from '../../Loader/Loader'
import { lockScroll } from '../../../utils/scrollLock'
import { GlobalProvider } from '../../../context/AppProvider'

const NewArrivalCard = ({ data, index, setModalData, setmodal }) => {
	const { image, type, name, price, price_catalog, slug } = data
	const discountPercent = (100 - (Number(price) / Number(price_catalog)) * 100).toFixed(2)

	const [modalLoading, setmodalLoading] = useState(false)
	const [activeModal, setactiveModal] = useState(null)

	const { loginUser } = useContext(GlobalProvider)

	const modalHandler = async (slug, index) => {
		setactiveModal(index)
		setmodalLoading(true)
		const res = await fetch(loginUser?.id !== undefined ? `${baseApiUrl}/product-view/${slug}/${loginUser?.id}` : `${baseApiUrl}/product-view/${slug}`).then((resp) => resp.json())
		await setModalData(res)
		setTimeout(() => {
			setmodal(true)
			lockScroll()
			setmodalLoading(false)
			setactiveModal()
		}, 500)
	}

	return (
		// <Link href={`/${slug}`}>
		<div className={`${styles.new_arrival_card} full-radius transition`} onClick={() => modalHandler(slug, index)}>
			<div className={styles.img_wrapper}>
				<Image width={150} height={150} src={image !== null ? `${imgApiUrl.products.thumbnail}/${image}` : placeHolderImg} alt={name} />
			</div>
			<div className={styles.new_arrival_detail}>
				<div className={styles.name}>
					{name?.substring(0, 50)}
					{name?.length > 50 ? '...' : ''}
				</div>
				{type === 'variation' ? (
					<div className={styles.sku}>Multiple SKU</div>
				) : price === price_catalog ? (
					<div className={styles.price}>${price.toFixed(2)}</div>
				) : (
					<div className={styles.price}>
						<span>${price.toFixed(2)}</span>
						<span>${price_catalog.toFixed(2)}</span>
						<span>{discountPercent}% Off</span>
					</div>
				)}
				<div className={styles.btn_wrapper}>
					<div>Click For Details</div>
					{modalLoading && activeModal === index ? (
						<DarkLoader className={`${styles.loader} transition`} loaderType='sml' />
					) : (
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='var(--primary)' className='transition'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
						</svg>
					)}
				</div>
			</div>
		</div>
		// </Link>
	)
}

export default NewArrivalCard

import React, { useContext, useRef, useState } from 'react'
import styles from './SameProductCard.module.css'
import Rating from '../Rating/Rating'
import { baseApiUrl, imgApiUrl } from '../../../utils/config'
import WishlistIcon from '../WishlistIcon/WishlistIcon'
import { DarkLoader } from '../../Loader/Loader'
import placeHolderImg from '/public/imgs/no-img.webp'
import { lockScroll } from '../../../utils/scrollLock'
import currencyFormat from '../../../utils/currencyFormat'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import Link from 'next/link'
import { GlobalProvider } from '../../../context/AppProvider'

const SameProductCard = ({ data: { id, rating, slug, name, image, price, price_catalog, range, type, price_discounted, price_discounted_end, see_price }, setmodal, setModalData, index, className = '' }) => {
	const { loginUser } = useContext(GlobalProvider)

	const [modalLoading, setmodalLoading] = useState(false)
	const [activeModal, setactiveModal] = useState(null)

	const hidePriceRef = useRef(null)

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

	const modalOpenHandler = (e, slug, index) => {
		if (e.target !== hidePriceRef?.current) {
			modalHandler(slug, index)
		}
	}

	return (
		<div className={`${styles.same_product} radius shadow ${className}`}>
			<div className={styles.wrapper}>
				<div className={`${styles.best_sell} sml-btn primary-color primary-border radius`} onClick={() => modalHandler(slug, index)}>
					Best Sell
				</div>

				<div className={styles.icon_wrapper}>
					<WishlistIcon id={id} />
				</div>
			</div>

			<div className={styles.detail_wrapper} onClick={(e) => modalOpenHandler(e, slug, index)}>
				<ImgWithLoader className={styles.img_wrapper} width={100} height={100} src={image !== null ? `${imgApiUrl.products.thumbnail}/${image}` : placeHolderImg} alt={name} />

				<div className={styles.name_wrapper}>
					<div className={styles.name_price_wrapper}>
						<div className={styles.name}>
							{name?.substring(0, 50)}
							{name?.length > 50 ? '...' : ''}
						</div>
						{(see_price === 'login' && loginUser?.id !== undefined) || see_price !== 'request' ? (
							type === 'variation' ? (
								<>
									<div className={styles.sku}>Multiple SKU</div>
									<div className={styles.price}>{range}</div>
								</>
							) : price_discounted !== null && price_discounted !== 0 && price_discounted !== price_catalog && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? (
								<div className={styles.price}>
									<span>{currencyFormat(price_discounted)}</span>
									<span>{currencyFormat(price_catalog)}</span>
									<span>{(100 - (Number(price_discounted) / Number(price_catalog)) * 100).toFixed(2)}% Off</span>
								</div>
							) : price !== price_catalog ? (
								<div className={styles.price}>
									<span>{currencyFormat(price)}</span>
									<span>{currencyFormat(price_catalog)}</span>
									<span>{(100 - (Number(price) / Number(price_catalog)) * 100).toFixed(2)}% Off</span>
								</div>
							) : (
								<div className={styles.price}>{price !== 0 && price !== null ? currencyFormat(price) : 'Price N/A'}</div>
							)
						) : (
							loginUser?.id === undefined &&
							see_price === 'login' && (
								<Link href='/auth/signin'>
									<a ref={hidePriceRef} className={`link primary-color`}>
										Signin to see the price
									</a>
								</Link>
							)
						)}

						{rating > 0 && <Rating className={styles.rating} data={rating} />}

						{price_discounted !== null && price_discounted !== 0 && price_discounted !== price_catalog && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) && (
							<div className={`${styles.special_price} blink`}>
								<span style={{ marginRight: `${price_discounted_end !== null ? '3px' : undefined}` }}>Discounted Price</span>
								{price_discounted_end !== null && <span>ends on:</span>}
								{price_discounted_end !== null && <span className={styles.disc_end_date}>{price_discounted_end}</span>}
							</div>
						)}
					</div>
					{modalLoading && activeModal === index && <DarkLoader className={`${styles.modal_loader} transition`} loaderType='sml' />}
				</div>
			</div>
		</div>
	)
}

export default SameProductCard

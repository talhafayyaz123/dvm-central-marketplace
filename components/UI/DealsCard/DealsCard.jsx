import React, { useContext, useRef, useState } from 'react'
import styles from './DealsCard.module.css'
import { baseApiUrl, imgApiUrl } from '../../../utils/config'
import Rating from '../Rating/Rating'
import WishlistIcon from '../WishlistIcon/WishlistIcon'
import { DarkLoader } from '../../Loader/Loader'
import placeHolderImg from '/public/imgs/no-img.webp'
import { lockScroll } from '../../../utils/scrollLock'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import currencyFormat from '../../../utils/currencyFormat'
import Link from 'next/link'
import { GlobalProvider } from '../../../context/AppProvider'

const DealsCard = ({ data, pageType, iscolumn, index, setmodal, setModalData, currentData, searchResultAllProducts, initialData }) => {
	const { name, price, price_catalog, image, type, short_description, rating, slug, id, hot, range, price_discounted, price_discounted_end, see_price } = data

	const [modalLoading, setmodalLoading] = useState(true)
	const [activeModal, setactiveModal] = useState(null)

	const { loginUser } = useContext(GlobalProvider)

	const hidePriceRef = useRef(null)

	// console.log('range', range)

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

	const modalOpenHandler = (e, index, slug) => {
		if (e.target !== hidePriceRef?.current) {
			modalHandler(slug, index)
		}
	}

	return (
		<div className={`${styles.deals_card} ${iscolumn && styles.column_layout} ${pageType !== 'home' ? styles.global_deals_card : styles.home_deals_card} ${pageType === 'home-v2' ? styles.home_prod_card : 'undefined'} transition`}>
			<div className={styles.deals_info}>
				{pageType !== 'home' && pageType !== 'home-v2' && (
					<div className={`${styles.disc_heart_wrapper}`}>
						{hot === 'Y' && pageType !== 'hot-products' ? (
							<div className={`${styles.disc} ${styles.hot} red-bg`} style={{ marginBottom: iscolumn && '0.5rem' }}>
								Hot
							</div>
						) : (
							<div />
						)}

						<div className={`${styles.eye_heart_wrapper}`}>
							<WishlistIcon id={id} currentData={currentData} searchResultAllProducts={searchResultAllProducts} initialData={initialData} />
						</div>
					</div>
				)}

				{(pageType === 'home' || pageType === 'home-v2') && (
					<div className={`${styles.disc_heart_wrapper} ${type === 'variation' && styles.not_hot}`}>
						{type !== 'variation' ? (
							price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) && price_discounted !== price_catalog ? (
								<div className={styles.disc} style={{ alignSelf: 'flex-start' }}>
									{`${pageType === 'home-v2' ? 'OFF' : 'Save'}`} {(100 - (Number(price_discounted) / Number(price_catalog)) * 100)?.toFixed(2)}%
								</div>
							) : price !== price_catalog ? (
								<div className={`${styles.disc} red-bg`} style={{ alignSelf: 'flex-start' }}>
									{`${pageType === 'home-v2' ? 'OFF' : 'Save'}`} {(100 - (Number(price) / Number(price_catalog)) * 100)?.toFixed(2)}%
								</div>
							) : (
								<div />
							)
						) : (
							<div />
						)}

						<div className={`${styles.eye_heart_wrapper}`}>
							<WishlistIcon id={id} index={index} />
						</div>
					</div>
				)}
				<div className={styles.deals_info_inner_wrapper}>
					<ImgWithLoader onClick={(e) => modalOpenHandler(e, index, slug)} className={styles.img_wrapper} width={180} height={180} src={image !== null ? `${imgApiUrl.products.thumbnail}/${image}` : placeHolderImg} alt={name} />

					<div className={styles.info}>
						<div className={styles.name}>
							{name?.substring(0, 50)}
							{name?.length > 50 ? '...' : ''}
						</div>
						{((see_price === 'login' && loginUser?.id !== undefined) || see_price !== 'request') && (
							<div className={styles.price_rating} onClick={(e) => modalOpenHandler(e, index, slug)}>
								{type === 'variation' ? (
									<>
										<div className={styles.sku}>Multiple SKU</div>
										<div className={styles.price}>{range}</div>
									</>
								) : price_discounted !== null && price_discounted !== 0 && price_discounted !== price_catalog && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? (
									<>
										<div className={styles.price}>
											<span>{currencyFormat(price_discounted)}</span>
											<span>{currencyFormat(price_catalog)}</span>
											<span>{(100 - (Number(price_discounted) / Number(price_catalog)) * 100)?.toFixed(2)}% Off</span>
										</div>
										<div className={`${styles.special_price} blink`}>
											<span
												style={{
													marginRight: `${price_discounted_end !== null ? '3px' : undefined}`
												}}
											>
												Discounted Price
											</span>
											{price_discounted_end !== null && <span>ends on:</span>}
											{price_discounted_end !== null && <span className={styles.disc_end_date}>{price_discounted_end}</span>}
										</div>
									</>
								) : price === price_catalog ? (
									<div className={`${styles.price} ${price === 0 ? styles.no_price : undefined}`}>{price !== 0 ? currencyFormat(price) : 'Price N/A'}</div>
								) : (
									<div className={styles.price}>
										<span>{currencyFormat(price)}</span>
										<span>{currencyFormat(price_catalog)}</span>
										<span>{(100 - (Number(price) / Number(price_catalog)) * 100)?.toFixed(2)}% Off</span>
									</div>
								)}

								{rating > 0 && <Rating className={styles.rating} type='card' data={rating} />}
							</div>
						)}

						{loginUser?.id === undefined && see_price === 'login' && (
							<Link href='/auth/signin'>
								<a ref={hidePriceRef} className={`${styles.price} link ${styles.hide_price}`}>
									Signin to see the price
								</a>
							</Link>
						)}

						{iscolumn && short_description && (
							<div
								onClick={(e) => modalOpenHandler(e, index, slug)}
								className={`${styles.short_desc} gray-color`}
								dangerouslySetInnerHTML={{
									__html: `${short_description?.slice(0, 400)}${short_description?.length > 400 ? '...' : ''}`
								}}
							/>
						)}
					</div>
				</div>
			</div>

			{modalLoading && activeModal === index && <DarkLoader className={`${styles.loader} transition`} loaderType='sml' />}
		</div>
	)
}

export default DealsCard

import React, { useContext, useRef } from 'react'
import styles from './NewCard.module.css'
import { baseApiUrl, imgApiUrl } from '../../../utils/config'
import WishlistIcon from '../WishlistIcon/WishlistIcon'
import currencyFormat from '../../../utils/currencyFormat'
import Rating from '../Rating/Rating'
import { GlobalProvider } from '../../../context/AppProvider'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import { lockScroll } from '../../../utils/scrollLock'
import Link from 'next/link'
import noImg from '../../../public/imgs/webianr-no-img.png'

const NewCard = ({ data, setmodal, setModalData, setmodalLoading, searchResultAllProducts, iscolumn, currentData, index }) => {
	const { image, name, price, range, price_catalog, price_discounted, price_discounted_end, slug, rating, reviews_count, id, categories, type, vendor_id, see_price, short_description } = data

	const { loginUser, userData } = useContext(GlobalProvider)

	const hidePriceRef = useRef(null)

	const modalHandler = async (slug) => {
		setmodalLoading(true)
		const res = await fetch(loginUser?.id !== undefined ? `${baseApiUrl}/product-view/${slug}/${loginUser?.id}` : `${baseApiUrl}/product-view/${slug}`).then((resp) => resp.json())

		setModalData(res)
		setTimeout(() => {
			setmodalLoading(false)
			setmodal(true)
			lockScroll()
		}, 500)
	}
	return (
		<div className={`${styles.main_card_wrapper} ${iscolumn ? styles.is_column : undefined}`}>
			{/* wishlist icon */}
			<div className={styles.disc_heart_wrapper}>
				<div className={`${styles.eye_heart_wrapper}`}>
					{loginUser?.id !== undefined && userData?.position !== undefined && userData?.position !== 'Sales Rep' && <WishlistIcon className={styles.wish} id={id} searchResultAllProducts={searchResultAllProducts} currentData={currentData} />}
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)' className={styles.eye_icon} onClick={() => modalHandler(slug)}>
						<path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
						<path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
					</svg>
				</div>
			</div>

			<Link href={`/${slug}`}>
				<a className={styles.card}>
					<ImgWithLoader priority={index && index == 0} className={`shadow radius white-bg ${styles.image}`} src={image !== null ? `${imgApiUrl?.products?.thumbnail}/${image}` : noImg} width={200} height={200} alt={name} />

					<div className={styles.product_info}>
						<div className={`semibold-text ${styles.name}`}>{iscolumn ? name : `${name?.substring(0, 45)}${name?.length > 45 ? '...' : ''}`}</div>

						<div className={styles.price_cart}>
							<div className={styles.price_wrapper}>
								{type === 'variation' ? (
									<>
										<div className={styles.sku}>Multiple SKU</div>
										{((see_price === 'login' && loginUser?.id !== undefined) || see_price === 'without_login') && <div className={styles.price}>{range}</div>}
									</>
								) : (
									((see_price === 'login' && loginUser?.id !== undefined) || see_price === 'without_login') &&
									(price_discounted !== null && price_discounted !== 0 && price_discounted < price_catalog && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? (
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
									))
								)}
							</div>
						</div>

						{categories?.length > 0 && (
							<div className={`${styles.categories} gray-color`}>
								<span>Category: </span>
								{categories?.slice(0, 2)?.map((category, index) => {
									let name = category?.name
									name = index === 1 && categories.length > 2 && category?.name?.slice(-1) === ',' ? category?.name?.substring(0, category?.name.length - 1) : category?.name
									return <span key={category?.id}>{name} </span>
								})}
								{categories.length > 2 ? <span>...</span> : ''}
							</div>
						)}
						{reviews_count > 0 && (
							<div className={styles.rating}>
								<Rating data={rating} type='card' />{' '}
								<span className='gray-color'>
									({reviews_count} review{reviews_count > 1 ? 's' : ''})
								</span>
							</div>
						)}

						{iscolumn && short_description && (
							<div
								className={`${styles.short_desc} gray-color`}
								dangerouslySetInnerHTML={{
									__html: `${short_description?.slice(0, 400)}${short_description?.length > 400 ? '...' : ''}`
								}}
							/>
						)}
					</div>
				</a>
			</Link>
			{loginUser?.id === undefined && see_price === 'login' && (
				<Link href='/auth/signin'>
					<a ref={hidePriceRef} className={`${styles.price} ${styles.hide_price}`}>
						Signin to see the price
					</a>
				</Link>
			)}
		</div>
	)
}

export default NewCard

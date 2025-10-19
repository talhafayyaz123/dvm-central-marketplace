import React, { useContext, useRef } from 'react'
import styles from './HorizontalCard.module.css'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import { baseApiUrl, imgApiUrl } from '../../../utils/config'
import placeholderImg from '/public/imgs/no-img.webp'
import currencyFormat from '../../../utils/currencyFormat'
import { lockScroll } from '../../../utils/scrollLock'
import Rating from '../Rating/Rating'
import Link from 'next/link'
import WishlistIcon from '../WishlistIcon/WishlistIcon'
import { GlobalProvider } from '../../../context/AppProvider'

const HorizontalCard = ({ data, setmodalLoading, setmodal, setModalData, cardType, iscolumn }) => {
	const { id, actual_quantity, image, vendor_id, type, name, price, range, price_catalog, price_discounted, price_discounted_end, see_price, slug, quantity_left, reviews_count, short_description, in_stock } = data
	const qtySold = ((actual_quantity - quantity_left) / actual_quantity) * 100

	// console.log(qtySold)

	const hidePriceRef = useRef(null)

	const { loginUser, userData } = useContext(GlobalProvider)

	const modalHandler = async () => {
		setmodalLoading(true)
		const res = await fetch(loginUser?.id !== undefined ? `${baseApiUrl}/product-view/${slug}/${loginUser?.id}` : `${baseApiUrl}/product-view/${slug}`).then((resp) => resp.json())

		// console.log('res from product modal', res, 'url', loginUser?.id !== undefined ? `${baseApiUrl}/product-view/${slug}/${loginUser?.id}` : `${baseApiUrl}/product-view/${slug}`)

		setModalData(res)
		setTimeout(() => {
			setmodalLoading(false)
			setmodal(true)
			lockScroll()
		}, 500)
	}

	return (
		// <div className={`white-bg ${styles.card} radius`} style={{ padding: cardType === 'featured' ? '0' : undefined }} onClick={(e) => e.target !== hidePriceRef?.current && modalHandler()}>
		<div className={`white-bg ${styles.card} radius ${iscolumn ? styles.single_col : undefined}`} style={{ padding: cardType === 'featured' ? '0' : undefined }}>
			{/* wishlist and eye icon for tablet and mobile */}
			<div className={`${styles.wish_icon} ${styles.hide_desk}`} style={{ top: cardType === 'featured' ? '0' : '1rem' }}>
				{userData?.position !== undefined && userData?.position !== 'Sales Rep' && <WishlistIcon className={styles.wish} id={id} />}
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)' className={styles.eye_icon} onClick={() => modalHandler(slug)}>
					<path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
					<path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
				</svg>
			</div>
			<div className={styles.wrapper}>
				<Link href={`/${slug}`}>
					<a>
						<ImgWithLoader className={`${styles.img} shadow radius`} width={iscolumn ? 200 : 80} height={iscolumn ? 200 : 80} src={image !== null ? `${imgApiUrl.products.thumbnail}/${image}` : placeholderImg} alt={name} />
					</a>
				</Link>
				<div className={styles.inner_wrapper}>
					<Link href={`/${slug}`}>
						<a className={styles.content}>
							<div>
								<div className={`${styles.name} semibold-text`}>{name?.length > 50 ? name?.slice(0, 50) + '...' : name}</div>

								<div className={`${styles.price_qty} ${qtySold === undefined ? styles.center : undefined}`}>
									{type === 'variation' ? (
										<div className={styles.price_wrapper} style={{ width: cardType === 'featured' ? '100%' : undefined }}>
											<div className={styles.sku}>Multiple SKU</div>
											{((see_price === 'login' && loginUser?.id !== undefined) || see_price === 'without_login') && <div className={styles.price}>{range}</div>}
										</div>
									) : (
										((see_price === 'login' && loginUser?.id !== undefined) || see_price === 'without_login') &&
										(price_discounted !== null && price_discounted !== 0 && price_discounted !== price_catalog && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? (
											<div className={styles.price_wrapper} style={{ width: cardType === 'featured' ? '100%' : undefined }}>
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
											</div>
										) : price === price_catalog ? (
											<div className={styles.price_wrapper} style={{ width: cardType === 'featured' ? '100%' : undefined }}>
												<div className={`${styles.price} ${price === 0 ? styles.no_price : undefined}`}>{price !== 0 ? currencyFormat(price) : 'Price N/A'}</div>
											</div>
										) : (
											<div className={styles.price_wrapper} style={{ width: cardType === 'featured' ? '100%' : undefined }}>
												<div className={styles.price}>
													<span>{currencyFormat(price)}</span>
													<span>{currencyFormat(price_catalog)}</span>
													<span>{(100 - (Number(price) / Number(price_catalog)) * 100)?.toFixed(2)}% Off</span>
												</div>
											</div>
										))
									)}

									{qtySold > 0 && cardType !== 'featured' && (
										<div className={`${styles.qty_sold} gray-color`} style={{ minWidth: 'max-content' }}>
											{quantity_left} left
										</div>
									)}
								</div>

								{iscolumn && short_description && (
									<div
										className={`${styles.short_desc} gray-color`}
										dangerouslySetInnerHTML={{
											__html: `${short_description?.slice(0, 400)}${short_description?.length > 400 ? '...' : ''}`
										}}
									/>
								)}

								{reviews_count > 0 && cardType !== 'featured' && (
									<div className={styles.stars}>
										<Rating data={reviews_count} type='card' />{' '}
										<span className='gray-color'>
											({reviews_count} review{reviews_count > 1 ? 's' : ''})
										</span>
									</div>
								)}
							</div>

							{qtySold > 0 && cardType !== 'featured' && (
								<div className={styles.bar_wrapper}>
									<div className='lite-pink-bg radius' />
									<div className='primary-bg radius' style={{ width: `${qtySold.toFixed(2)}%` }} />
								</div>
							)}
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

				{/* wishlist and eye icon */}
				<div className={`${styles.wish_icon} ${styles.hide_mob}`}>
					{userData?.position !== 'Sales Rep' && <WishlistIcon className={styles.wish} id={id} />}
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)' className={styles.eye_icon} onClick={() => modalHandler(slug)}>
						<path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
						<path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
					</svg>
				</div>
			</div>
		</div>
	)
}

export default HorizontalCard

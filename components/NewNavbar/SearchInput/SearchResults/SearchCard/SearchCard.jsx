import React, { useState } from 'react'
import { baseApiUrl, imgApiUrl } from '../../../../../utils/config'
import styles from './SearchCard.module.css'
import placeHolderImg from '/public/imgs/no-img.webp'
import ImgWithLoader from '../../../../UI/ImgWithLoader/ImgWithLoader'
import { LiteLoader } from '../../../../Loader/Loader'
import { elLockScroll, lockScroll } from '../../../../../utils/scrollLock'
import currencyFormat from '../../../../../utils/currencyFormat'
import { useRouter } from 'next/router'

import Link from 'next/link'
import WishlistIcon from '../../../../UI/WishlistIcon/WishlistIcon'

const SearchCard = ({ result, index, setModalData, setmodal, mobSearchSidebar, addTocartItem, setshowSearchResults, setsearchBD, loginUser, userPosition, cartBtnLoading, clickedProduct, closeSearchHanlder, searchType }) => {
	const { image, name, price, price_catalog, sku, type, slug, vendor_product_url, price_discounted, price_discounted_end, see_price, product_type, vendor_name, plan_range, id, in_stock } = result

	const [modalLoading, setmodalLoading] = useState(false)
	const [activeModal, setactiveModal] = useState(null)

	const router = useRouter()

	const openProductDetail = async () => {
		if (!router?.asPath?.includes(slug)) {
			setactiveModal(index)
			setmodalLoading(true)
			const res = await fetch(loginUser?.id !== undefined ? `${baseApiUrl}/product-view/${slug}/${loginUser?.id}` : `${baseApiUrl}/product-view/${slug}`).then((resp) => resp.json())

			await setModalData(res)
			searchType === 'mobile' && closeSearchHanlder()
			setTimeout(() => {
				elLockScroll(mobSearchSidebar)
				setmodal(true)
				lockScroll()
				setmodalLoading(false)
				setactiveModal()
			}, 500)
		} else {
			setshowSearchResults(false)
			setsearchBD(false)
		}
	}

	return (
		<>
			{product_type === 'service' ? (
				<div className={`${styles.wrapper} primary-bb sml-shadow radius`}>
					<Link href={`/${slug}`}>
						<a
							className={styles.search_result_item}
							onClick={() => {
								setsearchBD(false), setshowSearchResults(false)
							}}
						>
							<div className={styles.item_wrapper}>
								<ImgWithLoader className={styles.item_img} layout='fill' src={image !== null ? `${imgApiUrl?.vendor?.services}/${image}` : placeHolderImg} alt={name} />

								<div className={styles.item_detail}>
									<div className={styles.item_title}>
										{name.substring(0, 45)}
										{name?.length > 45 ? '...' : ''}
									</div>
									<p className='primary-color'>{vendor_name}</p>

									<div className={`${styles.price_btn_wrapper} ${styles.item_price} ${styles.service_btn}`}>
										<div className='semibold-text'>{plan_range}</div>
									</div>
								</div>
							</div>
						</a>
					</Link>
					<div className={styles.wishlist_icon}>
						{userPosition !== undefined && userPosition !== 'Sales Rep' && <WishlistIcon className={styles.wish} id={id} />}
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)' className={styles.eye_icon} onClick={() => openProductDetail()}>
							<path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
							<path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
						</svg>
					</div>
				</div>
			) : (
				<div className={`${styles.wrapper} primary-bb shadow radius`}>
					<Link href={`/${slug}`}>
						<a className={styles.search_result_item} onClick={closeSearchHanlder}>
							<LiteLoader className={`${styles.modal_loader} ${modalLoading && activeModal === index ? 'show-bd' : 'hide-bd'} transition`} />
							<div className={styles.item_wrapper}>
								<ImgWithLoader className={styles.item_img} layout='fill' src={image !== null ? `${imgApiUrl.products.thumbnail}/${image}` : placeHolderImg} alt={name} />

								<div className={styles.item_detail}>
									<div className={styles.item_title}>
										{name.substring(0, 45)}
										{name?.length > 45 ? '...' : ''}
									</div>

									{type === 'variation' ? (
										<div className={`${styles.multiple_sku} red-color`}>Multiple SKU, Click For Details</div>
									) : (
										<div className={styles.item_sku}>
											<span>SKU : </span>
											<strong className='sku lite-dark-primary-color'>{sku}</strong>
										</div>
									)}

									{type !== 'variation' && (
										<div className={styles.price_btn_wrapper}>
											{(see_price === 'login' && loginUser?.id !== undefined) || see_price === 'without_login' ? (
												<div className={`${styles.item_price} ${price === 0 ? 'red-color' : undefined} semibold-text`}>
													{price !== 0 ? currencyFormat(price_discounted !== null && price_discounted !== 0 && price_discounted !== price_catalog && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? price_discounted : price) : 'Price N/A'}
												</div>
											) : (
												loginUser?.id === undefined &&
												see_price === 'login' && (
													<Link href='/auth/signin'>
														<a onClick={() => (setshowSearchResults(false), setsearchBD(false))} className={`${styles.hide_price} link primary-color`}>
															Signin to see the price
														</a>
													</Link>
												)
											)}
										</div>
									)}
								</div>
							</div>
						</a>
					</Link>

					<div className={styles.wishlist_icon}>
						{userPosition !== undefined && userPosition !== 'Sales Rep' && <WishlistIcon className={styles.wish} id={id} />}

						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)' className={styles.eye_icon} onClick={() => openProductDetail()}>
							<path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
							<path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
						</svg>
					</div>
					{/* <div className={styles.eye_wrapper}> */}
					{/* <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)' className={styles.eye_icon} onClick={() => openProductDetail()}>
							<path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z' />
							<path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
						</svg> */}

					{/* {loginUser?.id !== undefined && type !== 'variation' && in_stock === 'Y' && (see_price === 'without_login' || see_price === 'login') && (
							<div className={styles.shop} onClick={() => addTocartItem(id, vendor_id, 1, id, 'addition')}>
								{cartBtnLoading && clickedProduct === id ? (
									<LiteLoader loaderType={'sml'} />
								) : (
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='var(--white)' className='size-4'>
										<path d='M1.75 1.002a.75.75 0 1 0 0 1.5h1.835l1.24 5.113A3.752 3.752 0 0 0 2 11.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 0-1.5H3.628A2.25 2.25 0 0 1 5.75 9h6.5a.75.75 0 0 0 .73-.578l.846-3.595a.75.75 0 0 0-.578-.906 44.118 44.118 0 0 0-7.996-.91l-.348-1.436a.75.75 0 0 0-.73-.573H1.75ZM5 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM13 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' />
									</svg>
								)}
							</div>
						)} */}
					{/* </div> */}
					{/* eye and cart icon */}
				</div>
			)}
		</>
	)
}

export default SearchCard

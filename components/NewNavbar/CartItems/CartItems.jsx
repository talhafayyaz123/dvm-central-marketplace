import React, { useContext, useState } from 'react'
import { unlockScroll } from '../../../utils/scrollLock'
import styles from './CartItems.module.css'
import { GlobalProvider } from '../../../context/AppProvider'
import Link from 'next/link'
import { imgApiUrl } from '../../../utils/config'
import Image from 'next/image'
import { DarkLoader, LiteLoader } from '../../Loader/Loader'
import placeholderImg from '../../../public/imgs/no-img.webp'
import currencyFormat from '../../../utils/currencyFormat'
import Message from '../../UI/Message/Message'

const CartItems = ({ showCartSidebar, setshowCartSidebar }) => {
	const { cartItemsData, deleteItemHandler, addTocartItem, getCartItemsLength, totalCartAmount, deleteLoading } = useContext(GlobalProvider)
	const [qtyUpdating, setqtyUpdating] = useState(false)
	const [qtyIndex, setqtyIndex] = useState()

	// close dropdown if clicked elsewhere
	if (typeof window !== 'undefined') {
	let cartSidebar = document.querySelector('.cart-sidebar')
	document.body.addEventListener('mousedown', (e) => {
	e.stopPropagation()
	if (showCartSidebar) {
	if (!cartSidebar.contains(e.target)) {
	setshowCartSidebar(false)
	unlockScroll()
	}
} else {
	return
	}
})
	}

	const qtyChangeHandler = async (id, vendorId, quantity, indexasId, type, pageType, service_id) => {
		if (type === 'deletion' && quantity > 1) {
			setqtyIndex(indexasId)
			setqtyUpdating(true)
			await addTocartItem(id, vendorId, 1, indexasId, type, pageType, service_id)
			await getCartItemsLength()
			await totalCartAmount()
			setqtyUpdating(false)
			setqtyIndex()
		} else if (type === 'addition' && quantity >= 1) {
			setqtyIndex(indexasId)
			setqtyUpdating(true)
			await addTocartItem(id, vendorId, 1, indexasId, type, pageType, service_id)
			await getCartItemsLength()
			await totalCartAmount()
			setqtyUpdating(false)
			setqtyIndex()
		} else {
			return
		}
	}

	return (
		<div className={`${styles.cart_items_container}  modal-bg transition ${showCartSidebar ? 'show-bd' : 'hide-bd'}`}>
			<div className={`${styles.cart_items_wrapper} cart-sidebar sidebar white-bg transition ${showCartSidebar && 'show-sidebar'}`}>
				<LiteLoader className={`${styles.delete_loader} ${deleteLoading ? 'show-bd' : 'hide-bd'} transition`} />
				<div className={styles.inner_sidebar}>
					<h4 className='white-color black-bg'>
						<span>Cart</span>

						<svg onClick={() => (setshowCartSidebar(false), unlockScroll())} xmlns='http://www.w3.org/2000/svg' className='page-navigation-close-btn transition' fill='none' width={25} viewBox='0 0 24 24' stroke='#fff'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
						</svg>
					</h4>
					<div className={`${styles.cart_items_list} `}>
						{cartItemsData?.vendorProducts?.length > 0 && (
							<>
								<h5 className={`primary-color lite-pink-bg ${styles.type}`}>Products</h5>

								{cartItemsData?.vendorProducts?.map((vendor) => {
									return vendor?.products?.map((item) => {
										const { name, id, image, price_catalog, price, price_discounted, price_discounted_end, parent_id, sku, cart_items, slug, parent_slug, max_quantity_threshold, max_available_quantity, minimum_order } = item

										const { quantity } = cart_items

										return (
											<div key={id} className={styles.sidebar_item}>
												<Link href={`/${parent_id === 0 ? slug : parent_slug}`}>
													<a className={`${styles.img_wrapper} gray-border radius`} onClick={() => setshowCartSidebar(false)}>
														<Image layout='fill' src={image !== null ? `${imgApiUrl.products.thumbnail}/${image}` : placeholderImg} alt={name} />
													</a>
												</Link>
												<div className={styles.sidebar_detail}>
													<Link href={`/${parent_id === 0 ? slug : parent_slug}`}>
														<a onClick={() => setshowCartSidebar(false)}>
															<div className={styles.sidebar_name}>{name}</div>
															<div className={`${styles.sidebar_sku} gray-color`}>SKU: {sku}</div>
															<div className={styles.price_icons_wrapper}>
																{price !== null && price_catalog !== null && (
																	<div className={styles.price_wrapper}>
																		{price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? (
																			<div className={styles.inner_wrapper}>
																				<div className={`${styles.disc_price} primary-color semibold-text`}>
																					{cart_items?.quantity} x {currencyFormat(price_discounted)}
																				</div>
																				<div className={`${styles.original_price} red-color`}>{currencyFormat(price_catalog)}</div>
																				<div className={`${styles.disc} gray-color`}>{(100 - (Number(price_discounted) / Number(price_catalog)) * 100).toFixed(0)}% Off</div>
																			</div>
																		) : price !== price_catalog ? (
																			<div className={styles.inner_wrapper}>
																				<div className={`${styles.disc_price} primary-color semibold-text`}>
																					{cart_items?.quantity} x {currencyFormat(price)}
																				</div>
																				<div className={`${styles.original_price} red-color`}>{currencyFormat(price_catalog)}</div>
																				<div className={`${styles.disc} gray-color`}>{(100 - (Number(price) / Number(price_catalog)) * 100).toFixed(0)}% Off</div>
																			</div>
																		) : (
																			<div className={`${styles.price} primary-color semibold-text`}>
																				{cart_items?.quantity} x {currencyFormat(price)}
																			</div>
																		)}
																	</div>
																)}
															</div>
														</a>
													</Link>

													{quantity >= (max_quantity_threshold !== null ? max_quantity_threshold : max_available_quantity) && (
														<Message
															icon={
																<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
																	<path
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
																	/>
																</svg>
															}
															className={styles.thresh_hold_msg}
															formSuccess={false}
															resMsg={`Allowed quantity is ${max_quantity_threshold !== null ? max_quantity_threshold : max_available_quantity}.`}
														/>
													)}

													<div className={`${styles.qty_inner_wrapper} radius transition`}>
														{qtyUpdating && qtyIndex == id && <DarkLoader className={styles.qty_update_loader} loaderType='sml' />}
														{/* minus icon */}
														<svg
															className={!(minimum_order === null || (minimum_order > 0 && quantity > minimum_order)) ? 'no-cursor' : undefined}
															onClick={() => (minimum_order === null || (minimum_order > 0 && quantity > minimum_order)) && qtyChangeHandler(id, vendor?.id, quantity, id, 'deletion')}
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															strokeWidth={1.5}
															stroke='var(--gray-icon)'
														>
															<path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
														</svg>

														<span className='semibold-text primary-color'>{cart_items?.quantity}</span>

														{/* plus icon */}
														<svg
															disabled={quantity >= (max_quantity_threshold !== null ? max_quantity_threshold : max_available_quantity) ? true : false}
															onClick={() => !(quantity >= (max_quantity_threshold !== null ? max_quantity_threshold : max_available_quantity)) && qtyChangeHandler(id, vendor?.id, quantity, id, 'addition')}
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															strokeWidth={1.5}
															stroke='var(--gray-icon)'
														>
															<path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
														</svg>
													</div>
												</div>
												{/* delete icon */}
												<div className={styles.icon_wrapper} onClick={() => deleteItemHandler(cart_items?.id)}>
													<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--red)' className={styles.delete_icon}>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
														/>
													</svg>
												</div>
											</div>
										)
									})
								})}
							</>
						)}

						{cartItemsData?.vendorServices?.length > 0 && (
							<>
								<h5 className={`primary-color ${styles.type}`}>Services</h5>
								{cartItemsData?.vendorServices?.map((service) => {
									return service?.plans?.map((plan) => {
										const { id, service_id, additional_fee, equipment_fee, cart_items, fee, name, type, service, vendor_id } = plan
										return (
											<div key={id} className={styles.sidebar_item}>
												<Link href={`/${service?.slug}`}>
													<a className={`${styles.img_wrapper} gray-border radius`} onClick={() => setshowCartSidebar(false)}>
														<Image layout='fill' src={service?.image !== null ? `${imgApiUrl.vendor.services}/${service?.image}` : placeholderImg} alt={name} />
													</a>
												</Link>
												<div className={styles.sidebar_detail}>
													<Link href={`/${service?.slug}`}>
														<a onClick={() => setshowCartSidebar(false)}>
															<div className={styles.sidebar_name}>{name}</div>
															<div className={`${styles.sidebar_sku} black-color`}>
																Payment:{' '}
																<span className='primary-color semibold-text' style={{ textTransform: 'capitalize' }}>
																	{type}
																</span>
															</div>
															{equipment_fee !== null && (
																<div className={`${styles.price} black-color`}>
																	Equipment fee:{' '}
																	<span className='primary-color semibold-text'>
																		{cart_items?.number_of_license} x {equipment_fee}
																	</span>
																</div>
															)}

															<div className={styles.price_icons_wrapper}>
																<div className={styles.price_wrapper}>
																	{/* {fee !== fee_catalog ? (
																		<div className={styles.inner_wrapper}>
																			<div className={`${styles.disc_price} primary-color semibold-text`}>
																				{cart_items?.number_of_license} x {currencyFormat(fee)}
																			</div>
																			<div className={`${styles.original_price} red-color`}>{currencyFormat(fee_catalog)}</div>
																			<div className={`${styles.disc} gray-color`}>{(100 - (Number(fee) / Number(fee_catalog)) * 100).toFixed(0)}% Off</div>
																		</div>
																	) : ( */}
																	<div className={`${styles.price} black-color`}>
																		License fee: {additional_fee !== null ? '1' : cart_items?.number_of_license} x <span className='primary-color semibold-text'>{currencyFormat(fee)}</span>
																	</div>
																	{cart_items?.number_of_license > 1 && additional_fee !== null && (
																		<div className={`${styles.price} `}>
																			Additional license fee:{' '}
																			<span className='primary-color semibold-text'>
																				{cart_items?.number_of_license - 1} x {currencyFormat(additional_fee)}
																			</span>
																		</div>
																	)}
																	{/* )} */}
																</div>
															</div>
														</a>
													</Link>

													<div className={`${styles.qty_inner_wrapper} radius transition`}>
														{qtyUpdating && qtyIndex == id && <DarkLoader className={styles.qty_update_loader} loaderType='sml' />}
														{/* minus icon */}
														<svg onClick={() => qtyChangeHandler(id, vendor_id, cart_items?.number_of_license, id, 'deletion', 'service-provider-seller', service_id)} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
															<path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
														</svg>

														<span className='semibold-text primary-color'>{cart_items?.number_of_license}</span>

														{/* plus icon */}
														<svg onClick={() => qtyChangeHandler(id, vendor_id, cart_items?.number_of_license, id, 'addition', 'service-provider-seller', service_id)} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
															<path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
														</svg>
													</div>
												</div>
												{/* delete icon */}
												<div className={styles.icon_wrapper} onClick={() => deleteItemHandler(cart_items?.id)}>
													<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--red)' className={styles.delete_icon}>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
														/>
													</svg>
												</div>
											</div>
										)
									})
								})}
							</>
						)}
						{cartItemsData?.vendorProducts?.length === 0 && cartItemsData?.vendorServices?.length === 0 && <div className='red-color'>No product in your cart?</div>}
					</div>
				</div>

				{(cartItemsData?.vendorProducts?.length > 0 || cartItemsData?.vendorServices?.length > 0) && (
					<div className={`${styles.total_wrapper} white-bg`}>
						{/* <div className={styles.total}>Total: {currencyFormat(cartSubTotal)}</div> */}

						<Link href='/cart'>
							<a onClick={() => (setshowCartSidebar(false), unlockScroll())}>
								<button className='primary-btn white-color'>View Cart</button>
							</a>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default CartItems

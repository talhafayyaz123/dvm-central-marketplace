import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './WishlistData.module.css'
import CustomCheckbox from '../../../UI/CustomCheckbox/CustomCheckbox'
import { baseApiUrl, imgApiUrl } from '../../../../utils/config'
import axios from 'axios'
import DashboardHeading from '../../../UI/DashboardHeading/DashboardHeading'
import { GlobalProvider } from '../../../../context/AppProvider'
// import { LiteLoader } from '../../../Loader/Loader'
import Link from 'next/link'
import placeholderImg from '../../../../public/imgs/no-img.webp'
import currencyFormat from '../../../../utils/currencyFormat'

const WishlistData = ({ setloading, initialwishlistData, setinitialwishlistData }) => {
	console.log('initialwishlistData', initialwishlistData)
	// const { addTocartItem, cartBtnLoading, cartBtndisabled, clickedProduct, setresMsgforPopup, setpopupSuccess, setwishListItemsLength, setshowresMsg, getCartItemsLength, loginUser } = useContext(GlobalProvider)
	const { setresMsgforPopup, setpopupSuccess, setwishListItemsLength, setshowresMsg, getCartItemsLength, loginUser } = useContext(GlobalProvider)

	const [wishlistSelectedIds, setwishlistSelectedIds] = useState([])
	const [wishlistSelectedServicesIds, setwishlistSelectedServicesIds] = useState([])

	const [multiSelectedItems, setmultiSelectedItems] = useState([])
	const [selectionChange, setselectionChange] = useState(false)
	const [showDeleteBtn, setshowDeleteBtn] = useState(false)
	const [showCartBtn, setshowCartBtn] = useState(false)
	const userId = loginUser?.id
	const allItems = Array.from(document.querySelectorAll('.select'))

	const selectAllBtn = useRef(null)

	const multiSelectedAddCartHandler = async () => {
		let addtoCartData = multiSelectedItems?.filter((item) => item?.productType !== 'variation' && item?.productType !== 'services')

		if (addtoCartData?.length > 0) {
			setloading(true)

			const res = await axios.post(`${baseApiUrl}/${process.env.NEXT_PUBLIC_APP_ENV === 'dev' ? 'add-to-cart-multiple' : 'add-to-cart-multiple-app'}`, addtoCartData)
			console.log('res from multiple cart', res)
			await getCartItemsLength()
			setloading(false)
			setresMsgforPopup(res?.data?.message)
			setpopupSuccess(res?.data?.success ? true : false)
			addtoCartData = []
			setshowresMsg(true)

			setTimeout(() => {
				setshowresMsg(false)
			}, 3000)
		}
	}

	const deleteWishlishtItemHandler = async (id) => {
		setshowresMsg(false)
		let data
		if (id) {
			data = {
				customer_id: userId,
				product_ids: [id],
				service_ids: [id]
			}
		} else {
			data = {
				customer_id: userId,
				product_ids: wishlistSelectedIds,
				service_ids: wishlistSelectedServicesIds
			}
		}

		setloading(true)

		const res = await axios.post(`${baseApiUrl}/user/wishlist/delete`, data)
		if (res?.data?.success) {
			setinitialwishlistData(res?.data)
			setwishListItemsLength(res?.data?.count)
			setshowDeleteBtn(multiSelectedItems?.length > 0 ? true : false)
			if (id) {
				setmultiSelectedItems(multiSelectedItems?.filter((filter) => filter?.product_id !== id))
				setwishlistSelectedIds(wishlistSelectedIds?.filter((filter) => filter !== id))
				setwishlistSelectedServicesIds(wishlistSelectedServicesIds?.filter((filter) => filter !== id))
			} else {
				setmultiSelectedItems([])
				setwishlistSelectedIds([])
				setwishlistSelectedServicesIds([])
			}
			setshowCartBtn(multiSelectedItems?.filter((item) => item?.productType !== 'variation' && item?.productType !== 'services')?.length > 0 ? true : false)
			allItems?.length > multiSelectedItems?.length && (selectAllBtn.current.innerText = 'Select All')
		}
		setloading(false)
		setresMsgforPopup(res?.data?.message)
		setpopupSuccess(res?.data?.success ? true : false)

		setshowresMsg(true)

		setTimeout(() => {
			setshowresMsg(false)
		}, 3000)
	}

	const multiSelectHandler = async (target, id, vendorId, productType, in_stock, see_price, userCanBuy, minOrderQty) => {
		if (!target.parentElement.querySelector('span').classList.contains('input-checked')) {
			target.parentElement.querySelector('span').classList.add('input-checked')
			setmultiSelectedItems((prev) => [
				...prev,
				{
					customer_id: loginUser?.id,
					product_id: Number(id),
					vendor_id: vendorId,
					quantity: 1,
					type: 'addition',
					productType,
					in_stock,
					see_price,
					userCanBuy: userCanBuy !== undefined ? userCanBuy : true,
					minOrderQty
				}
			])

			if (productType === 'services') {
				setwishlistSelectedServicesIds((prev) => [...prev, Number(target.value)])
			} else {
				setwishlistSelectedIds((prev) => [...prev, Number(target.value)])
			}
		} else {
			target.parentElement.querySelector('span').classList.remove('input-checked')

			setmultiSelectedItems((prev) => prev?.filter((item) => item?.product_id !== Number(target.value)))

			setwishlistSelectedIds((prev) => prev?.filter((id) => id !== Number(target.value)))

			setwishlistSelectedServicesIds((prev) => prev?.filter((id) => id !== Number(target.value)))
		}
		setselectionChange(!selectionChange)
	}

	const checkAllHandler = async (e) => {
		if (e.target.innerText === 'Select All') {
			setwishlistSelectedIds([])
			setwishlistSelectedServicesIds([])
			setmultiSelectedItems([])

			allItems.forEach((item, i) => {
				item.querySelector('span').classList.add('input-checked')
			})
			initialwishlistData?.data?.forEach((item) => {
				setwishlistSelectedIds((prev) => [...prev, prev !== item?.product_id && item?.product_id])
				setmultiSelectedItems((prev) => [
					...prev,
					prev !== item?.product_id && {
						customer_id: loginUser?.id,
						product_id: item?.product_id,
						vendor_id: item?.wishlist_products?.vendor_id,
						quantity: 1,
						type: 'addition',
						productType: item?.wishlist_products?.type,
						in_stock: item?.in_stock,
						see_price: item?.see_price,
						userCanBuy: item?.wishlist_customer?.level >= item?.wishlist_products?.level ? true : false,
						minOrderQty: item?.minOrderQty
					}
				])
			})

			initialwishlistData?.serviceWishlist?.forEach((item) => {
				setwishlistSelectedServicesIds((prev) => [...prev, prev !== item?.service_id && item?.service_id])
				setmultiSelectedItems((prev) => [
					...prev,
					prev !== item?.prdouct_id && {
						customer_id: loginUser?.id,
						product_id: item?.service_id,
						vendor_id: item?.wishlist_services?.vendor_id,
						quantity: 1,
						type: 'addition',
						productType: 'services',
						in_stock: item?.in_stock,
						userCanBuy: true
					}
				])
			})

			e.target.innerText = 'Unselect All'
		} else {
			allItems.forEach((item) => {
				item.querySelector('span').classList.remove('input-checked')
			})
			e.target.innerText = 'Select All'
			setwishlistSelectedIds([])
			setwishlistSelectedServicesIds([])
			setmultiSelectedItems([])
		}
	}

	useEffect(() => {
		setshowDeleteBtn(multiSelectedItems?.length > 0 ? true : false)
		// setshowCartBtn(
		// 	multiSelectedItems?.filter((item) => item?.productType !== 'variation' && item?.productType !== 'services' && item?.in_stock !== 'N' && (item?.see_price === 'login' || item?.see_price === 'without_login') && item?.userCanBuy && (item?.minOrderQty === null || item?.minOrderQtyy > 0))?.length >
		// 		0
		// 		? true
		// 		: false
		// )
		selectAllBtn.current.innerText = allItems?.length === multiSelectedItems?.length ? 'Unselect All' : 'Select All'
		console.log('multiSelectedItems', multiSelectedItems)
	}, [selectionChange, wishlistSelectedIds, multiSelectedItems, wishlistSelectedServicesIds, allItems])

	return (
		<div className={styles.wishlist_container}>
			<div className={styles.wishlist_wrapper}>
				<DashboardHeading heading='My Wishlist' />
				<div className={`${styles.slide_btn_wrapper} transition`}>
					{/* <button ref={selectAllBtn} className={`sml-btn primary-border primary-color ${styles.check_all_btn} ${showDeleteBtn ? `${showCartBtn ? undefined : styles.hide_check_all} ${styles.show_slides_btn}` : undefined}`} onClick={(e) => checkAllHandler(e)}>
						Select All
					</button> */}
					<button ref={selectAllBtn} className={`sml-btn primary-border primary-color ${styles.check_all_btn} ${showDeleteBtn ? `${showCartBtn ? undefined : styles.hide_check_all} ${styles.show_slides_btn}` : undefined}`} onClick={(e) => checkAllHandler(e)}>
						Select All
					</button>
					<button className={`sml-btn primary-btn white-color ${styles.add_all_btn} ${showCartBtn ? `${styles.show_add_all} ${styles.show_slides_btn}` : undefined}`} onClick={() => multiSelectedAddCartHandler()}>
						Add to Cart Selected
					</button>
					<button className={`sml-btn red-color ${styles.delete_all_btn} ${showDeleteBtn ? styles.show_slides_btn : undefined}`} onClick={() => deleteWishlishtItemHandler()}>
						Delete Selected
					</button>
				</div>

				<div className={styles.data_container}>
					<div className={styles.data_inner_container}>
						{/* products wishlist */}
						{initialwishlistData?.data?.length > 0 && (
							<div>
								<div className={`${styles.wrapper} ${styles.headings} lite-pink-bg semibold-text`}>
									<div className={`${styles.fst_two_col} ${styles.tab_two_cols}`}>
										<div className={styles.select} style={{ paddingLeft: '35px' }} />
										<div className={styles.img_wrapper}>Image</div>
										<div>Products</div>
									</div>

									<div className={styles.price}>Price</div>
									<div>In Stock</div>
									{/* <div>Quantity</div> */}
									<div>Action</div>
									<div>Remove</div>
								</div>

								{initialwishlistData?.data?.map((wishlist, index) => {
									const { wishlist_products, wishlist_customer } = wishlist

									// console.log(
									// 	'check 1',
									// 	wishlist_customer?.level >= wishlist_products?.level && wishlist_products?.type !== 'variation' && (wishlist_products?.see_price === 'login' || wishlist_products?.see_price === 'without_login'),
									// 	'wishlist_customer?.level',
									// 	wishlist_customer?.level,
									// 	'wishlist_products?.level',
									// 	wishlist_products?.level,
									// 	' wishlist_products?.type',
									// 	wishlist_products?.type,
									// 	'wishlist_products?.see_price',
									// 	wishlist_products?.see_price,
									// 	'wishlist_products?.minimum_order',
									// 	wishlist_products?.minimum_order === null || wishlist_products?.minimum_order > 0,
									// 	'wishlist_products?.in_stock',
									// 	wishlist_products?.in_stock
									// )

									return (
										<div className={`${styles.wrapper} ${styles.data_wrapper} gray-color wishlist-data-wrapper`} key={wishlist?.id} product-type={wishlist_products?.type}>
											<div className={`${styles.fst_two_col} ${styles.content_wrapper}`}>
												<CustomCheckbox
													className={`${styles.select} select`}
													type='checkbox'
													value={wishlist_products?.id}
													name={wishlist_products?.name}
													labeltitle={wishlist_products?.name}
													onChange={(e) => multiSelectHandler(e.target, wishlist_products?.id, wishlist_products?.vendor_id, wishlist_products?.type, wishlist_products?.in_stock, wishlist_products?.see_price, wishlist_customer?.level >= wishlist_products?.level, wishlist_products?.minimum_order)}
													pageType='wishlist'
												/>
												<Link href={`/${wishlist_products?.slug}`}>
													<a className={styles.img_wrapper}>
														<Image width={80} height={80} src={wishlist_products?.image !== null ? `${imgApiUrl.products.medium}/${wishlist_products?.image}` : placeholderImg} alt={wishlist_products?.name} />
													</a>
												</Link>
												<Link href={`/${wishlist_products?.slug}`}>
													<a className={styles.name}>{wishlist_products?.name?.length > 50 ? wishlist_products?.name.substring(0, 50) + '...' : wishlist_products?.name}</a>
												</Link>
											</div>

											<Link href={`/${wishlist_products?.slug}`}>
												<a className={styles.price}>{wishlist_products?.type === 'variation' ? 'Multiple SKU' : wishlist_products?.see_price === 'login' || wishlist_products?.see_price === 'without_login' ? `${currencyFormat(wishlist_products?.price)}` : '---'}</a>
											</Link>
											<div>{wishlist_products?.in_stock == 'Y' ? 'Yes' : 'No'}</div>
											{/* {wishlist_customer?.level >= wishlist_products?.level && wishlist_products?.type !== 'variation' && (wishlist_products?.see_price === 'login' || wishlist_products?.see_price === 'without_login') ? ( */}
											{
												wishlist_products?.in_stock === 'Y' ? (
													// wishlist_products?.minimum_order === null || wishlist_products?.minimum_order > 0 ? (
													// 	<button disabled={cartBtndisabled} className={`${styles.cart_btn} sml-btn primary-btn`} onClick={() => addTocartItem(wishlist_products?.id, wishlist_products?.vendor_id, 1, index, 'addition')}>
													// 		Add To Cart {clickedProduct === index && cartBtnLoading && <LiteLoader className={styles.loader} loaderType='sml' />}
													// 	</button>
													// ) : (
													<Link href={`/${wishlist_products?.slug}`}>
														<a>
															<button className={`${styles.cart_btn} btn sml-btn primary-btn`}>
																<span className='mr-1'>Click to View</span>
															</button>
														</a>
													</Link>
												) : (
													// )
													<button disabled={true} className={`${styles.cart_btn} sml-btn gray-border`}>
														Out of stock
													</button>
												)
												// : (
												// 	<Link href={`/${wishlist_products?.slug}`}>
												// 		<a>
												// 			<button className={`${styles.cart_btn} btn sml-btn primary-btn`}>
												// 				<span className='mr-1'>Click to View</span>
												// 			</button>
												// 		</a>
												// 	</Link>
												// )
											}

											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className={`${styles.icon} ${styles.delete_icon}`} onClick={() => deleteWishlishtItemHandler(wishlist_products?.id)}>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
												/>
											</svg>
										</div>
									)
								})}
							</div>
						)}

						{/* services wishlist */}
						{initialwishlistData?.serviceWishlist?.length > 0 && (
							<div>
								<div className={`${styles.wrapper} ${styles.headings} lite-pink-bg semibold-text ${initialwishlistData?.data?.length !== 0 ? styles.margin : undefined}`}>
									<div className={`${styles.fst_two_col} ${styles.tab_two_cols}`}>
										<div className={styles.select} style={{ paddingLeft: '35px' }} />
										<div className={styles.img_wrapper}>Image</div>
										<div>Services</div>
									</div>
									<div>Price</div>
									<div>In Stock</div>
									{/* <div>Quantity</div> */}
									<div>Action</div>
									<div>Remove</div>
								</div>

								{initialwishlistData?.serviceWishlist?.map((wishlist) => {
									const { wishlist_services } = wishlist

									return (
										<div className={`${styles.wrapper} ${styles.data_wrapper} gray-color`} key={wishlist?.id}>
											<div className={`${styles.fst_two_col} ${styles.content_wrapper}`}>
												<CustomCheckbox
													className={`${styles.select} select`}
													type='checkbox'
													value={wishlist_services?.id}
													name={wishlist_services?.name}
													labeltitle={wishlist_services?.name}
													onChange={(e) => multiSelectHandler(e.target, wishlist_services?.id, wishlist_services?.vendor_id, 'services', wishlist_services?.in_stock)}
													pageType='wishlist'
												/>
												<Link href={`/${wishlist_services?.slug}`}>
													<a className={styles.img_wrapper}>
														<Image width={80} height={80} src={wishlist_services?.image !== null ? `${imgApiUrl.vendor.services}/${wishlist_services?.image}` : placeholderImg} alt={wishlist_services?.name} />
													</a>
												</Link>
												<Link href={`/${wishlist_services?.slug}`}>
													<a className={styles.name}>{wishlist_services?.name?.length > 50 ? wishlist_services?.name.substring(0, 50) + '...' : wishlist_services?.name}</a>
												</Link>
											</div>

											<Link href={`/${wishlist_services?.slug}`}>
												<a className={styles.price}>{wishlist?.plan_range}</a>
											</Link>
											<div>Yes</div>
											{/* <div>---</div> */}

											<Link href={`/${wishlist_services?.slug}`}>
												<a>
													<button className={`${styles.cart_btn} btn sml-btn primary-btn`}>
														<span className='mr-1'>Click to View</span>
													</button>
												</a>
											</Link>

											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className={`${styles.icon} ${styles.delete_icon}`} onClick={() => deleteWishlishtItemHandler(wishlist_services?.id)}>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
												/>
											</svg>
										</div>
									)
								})}
							</div>
						)}

						{/* unavailable products wishlist */}
						{initialwishlistData?.wishlistInactiveProducts?.length > 0 && (
							<div>
								<div className={`${styles.wrapper} ${styles.headings} white-bg semibold-text ${initialwishlistData?.serviceWishlist?.length !== 0 ? styles.margin : undefined}`}>
									<div className={`${styles.fst_two_col} ${styles.tab_two_cols}`}>
										<div className={styles.img_wrapper}>Image</div>
										<div>Unavailale Products</div>
									</div>
									<div>Price</div>
									<div>In Stock</div>
									{/* <div>Quantity</div> */}
									<div>Action</div>
									<div>Remove</div>
								</div>

								{initialwishlistData?.wishlistInactiveProducts?.map((wishlist) => {
									const { wishlist_inactive_products } = wishlist

									return (
										<div className={`${styles.wrapper} ${styles.data_wrapper} gray-color`} key={wishlist?.id} style={{ opacity: 0.7 }}>
											<div className={`${styles.fst_two_col} ${styles.content_wrapper}`}>
												<div className={styles.img_wrapper}>
													<Image width={80} height={80} src={wishlist_inactive_products?.image !== null ? `${imgApiUrl.products.medium}/${wishlist_inactive_products?.image}` : placeholderImg} alt={wishlist_inactive_products?.name} />
												</div>

												<div className={styles.name}>{wishlist_inactive_products?.name?.length > 50 ? wishlist_inactive_products?.name.substring(0, 50) + '...' : wishlist_inactive_products?.name}</div>
											</div>

											<div className={styles.price}>{wishlist_inactive_products?.type === 'variation' ? 'Multiple SKU' : `${currencyFormat(wishlist_inactive_products?.price)}`}</div>

											<div>No</div>
											{/* <div>---</div> */}
											<div>---</div>
											<div>---</div>
										</div>
									)
								})}
							</div>
						)}

						{/* unavailable wishlist services */}
						{initialwishlistData?.wishlistInactiveServices?.length > 0 && (
							<div>
								<div className={`${styles.wrapper} ${styles.headings} white-bg semibold-text ${initialwishlistData?.serviceWishlist?.length !== 0 ? styles.margin : undefined}`}>
									<div className={`${styles.fst_two_col} ${styles.tab_two_cols}`}>
										<div className={styles.img_wrapper}>Image</div>
										<div>Unavailale Services</div>
									</div>
									<div>Price</div>
									<div>In Stock</div>
									{/* <div>Quantity</div> */}
									<div>Action</div>
									<div>Remove</div>
								</div>

								{initialwishlistData?.wishlistInactiveServices?.map((wishlist) => {
									const { wishlist_inactive_services } = wishlist

									return (
										<div className={`${styles.wrapper} ${styles.data_wrapper} gray-color`} key={wishlist?.id} style={{ opacity: 0.7 }}>
											<div className={`${styles.fst_two_col} ${styles.content_wrapper}`}>
												<div className={styles.img_wrapper}>
													<Image width={80} height={80} src={wishlist_inactive_services?.image !== null ? `${imgApiUrl.vendor.services}/${wishlist_inactive_services?.image}` : placeholderImg} alt={wishlist_inactive_services?.name} />
												</div>

												<div className={styles.name}>{wishlist_inactive_services?.name?.length > 50 ? wishlist_inactive_services?.name.substring(0, 50) + '...' : wishlist_inactive_services?.name}</div>
											</div>

											<div className={styles.price}>{wishlist_inactive_services?.price}</div>

											<div>No</div>
											{/* <div>---</div> */}
											<div>---</div>
											<div>---</div>
										</div>
									)
								})}
							</div>
						)}

						{initialwishlistData?.data?.length === 0 && initialwishlistData?.serviceWishlist?.length === 0 && initialwishlistData?.wishlistInactiveProducts?.length === 0 && initialwishlistData?.wishlistInactiveServices?.length === 0 && (
							<div className={`${styles.no_data} red-color`}>You have not added any product or service in wishlist...</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default WishlistData

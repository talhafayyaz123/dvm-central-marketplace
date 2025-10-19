import React, { useState, useContext, useEffect, useRef } from 'react'
import Quantity from './Quantity'
import styles from './ProductInfo.module.css'
import ProductPrice from './ProductPrice'
import ProductRating from './ProductRating'
import Variation from './Variation'
import VendorDetail from './VendorDetail'
import { useSession } from 'next-auth/react'
import { GlobalProvider } from '../../../../context/AppProvider'
import { DarkLoader, LiteLoader } from '../../../Loader/Loader'
import { baseApiUrl } from '../../../../utils/config'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'
import Message from '../../../UI/Message/Message'
import MinOrderFreeShipping from '../../../UI/MinOrderFreeShipping/MinOrderFreeShipping'
import axios from 'axios'
import currencyFormat from '../../../../utils/currencyFormat'
import { useRouter } from 'next/router'
import Link from 'next/link'
import coinsAnim from '../../../../utils/coinsAnim'
import { calculateDistance } from '../../../../utils/distance'
import Modal from '../../Modal/Modal'
import AddressForm from '../../AddressForm/AddressForm'

const ProductInfo = ({ data, changingData, setchangingData, setchangingImages, changingImages, vendorName, slug: { slug } }) => {
	const { showCartSidebar, productQtyinCart, setproductQtyinCart, subProudctQtyinCart, setsubProudctQtyinCart, addTocartItem, cartBtnLoading, cartBtndisabled, clickedProduct, cartItemsData, ls_variationData, setls_variationData, qty, setqty, loginUser, userData } = useContext(GlobalProvider)

	const router = useRouter()

	const qtyRef = useRef(null)


	const { data: status } = useSession()
	const [threshHoldError, setthreshHoldError] = useState(false)
	const [subProductMaxThreshHold, setsubProductMaxThreshHold] = useState(null)

	const [selectedVariationSku, setselectedVariationSku] = useState(null)

	const [preSelectedVariationChecked, setpreSelectedVariationChecked] = useState(true)

	const [priceRequesting, setpriceRequesting] = useState(false)

	const [variationData, setvariationData] = useState([])

	const [allowSampleReq, setallowSampleReq] = useState(data?.product?.sample_product ? true : false)

	const [requesingSample, setrequesingSample] = useState(false)

	const [smapleReqMsg, setsmapleReqMsg] = useState('')

	const [showSampleReqMsg, setshowSampleReqMsg] = useState(false)

	const [sampleReqStatus, setsampleReqStatus] = useState(false)

	const [userAddress, setuserAddress] = useState(data?.default_address)

	const [addressModal, setaddressModal] = useState(false)
	const [formSubmit, setformSubmit] = useState(false)
	const [outOfRange, setoutOfRange] = useState(false)
	const [noAddressFound, setnoAddressFound] = useState(false)

	const [requrestedForPrice, setrequrestedForPrice] = useState(data?.product?.see_price === 'already-requested' ? true : false)
	const [userDataLoading, setuserDataLoading] = useState(false)

	// sample request
	const smapleReqHandler = async (vendor_id, product_id, parentType) => {
		const data = {
			customer_id: loginUser?.id,
			vendor_id,
			product_id
		}

		setrequesingSample(true)

		const res = await axios.post(`${baseApiUrl}/ask-for-sample`, data)
		console.log('res', res)
		if (res?.data?.success) {
			setallowSampleReq(res?.data?.allow)
			if (parentType === 'variation' && ls_variationData?.length > 0) {
				const upatedData = ls_variationData.map((item) => {
					if (item?.id === product_id) {
						return { ...item, sample_product: res?.data?.allow }
					} else return item
				})
				setls_variationData(upatedData)
			}
		}
		setsampleReqStatus(res?.data?.success)
		setsmapleReqMsg(res?.data?.message)
		setshowSampleReqMsg(true)
		setrequesingSample(false)

		setTimeout(() => {
			setshowSampleReqMsg(false)
		}, 10000)
	}

	// user coins on page load
	const getUserCoins = async () => {
		const userData = {
			customer_id: loginUser?.id,
			url: router?.asPath?.substring(1, router?.asPath?.length)
		}
		const res = await axios.post(`${baseApiUrl}/save-user-coins`, userData)
		console.log('res from coins', res)
		res?.data?.success && coinsAnim(res?.data?.coins, res?.data?.coins + Number(res?.data?.new_coins))
	}

	// miles and places
	const milesAndPlacesCalculation = async () => {
		console.log('from places func',data)
		// await !gettingUserData
		// miles and places
		if (data?.product?.shipping_type === 'miles') {
			if (userAddress === null || userAddress?.latitude === null || userAddress?.longitude === null) {
				if (userAddress !== null && userAddress?.address1 !== null) {
					const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(userAddress?.address1)}&key=AIzaSyC-r86tO9gWZxzRiELiw3DQYa2D3_o1CVk`)
					console.log('res', res)

					const distance = calculateDistance(Number(data?.vendor?.latitude), Number(data?.vendor?.longitude), Number(response?.data?.result[0]?.geometry?.location?.lat), Number(response?.data?.result[0]?.geometry?.location?.lng))
					console.log('distance', distance)
					// if (distance?.toString()?.substring(0, 2) <= data?.product?.shipping_miles?.slice(0, data?.product?.shipping_miles?.lastIndexOf('.'))) {
					// 	console.log('this product is out of your region')
					// 	setnoAddressFound(false)
					// 	return
					// } else {
					// 	setnoAddressFound(false)
					// 	console.log('you can purchase this product')
					// }
					if (Number(distance) <= Number(data?.product?.shipping_miles?.slice(0, data?.product?.shipping_miles?.lastIndexOf('.')))) {
						console.log('you can purchase this product')
						setoutOfRange(false)
						setnoAddressFound(false)
					} else {
						console.log('Number(userAddress?.longitude)', Number(userAddress?.longitude), 'Number(data?.vendor?.longitude)', Number(data?.vendor?.longitude), 'Number(userAddress?.latitude)', Number(userAddress?.latitude), 'Number(data?.vendor?.latitude)', Number(data?.vendor?.latitude))
						setoutOfRange(true)
						setnoAddressFound(false)
						console.log('this product is out of your region')
					}
				} else {
					console.log('no address found')
					setnoAddressFound(true)
				}
			} else {
				if (Number(userAddress?.longitude) <= Number(data?.vendor?.longitude) && Number(userAddress?.latitude) <= Number(data?.vendor?.latitude)) {
					console.log('you can purchase this product')
					setoutOfRange(false)
				} else {
					const distance = calculateDistance(Number(userAddress?.longitude), Number(userAddress?.latitude), Number(data?.vendor?.latitude), Number(data?.vendor?.longitude))
					if (Number(distance) <= Number(data?.product?.shipping_miles?.slice(0, data?.product?.shipping_miles?.lastIndexOf('.')))) {
						console.log('you can purchase this product')
						setoutOfRange(false)
						setnoAddressFound(false)
					} else {
						console.log('Number(userAddress?.longitude)', Number(userAddress?.longitude), 'Number(data?.vendor?.longitude)', Number(data?.vendor?.longitude), 'Number(userAddress?.latitude)', Number(userAddress?.latitude), 'Number(data?.vendor?.latitude)', Number(data?.vendor?.latitude))
						setoutOfRange(true)
						setnoAddressFound(false)
						console.log('this product is out of your region')
					}
				}
			}
		} else if (data?.product?.shipping_type === 'place') {
			setnoAddressFound(false)

			if (userAddress !== null) {
				let places = data?.product?.shipping_countries?.filter((place) => place?.country?.name === userAddress?.country_name)
				console.log('place', places, userAddress)

				if (places?.length > 0) {
					places?.some((place) => {
						// console.log('place', 'state', place?.state?.name, userAddress?.state_name, places, userAddress, 'city', place?.shipping_city, userAddress?.city, 'zip', place?.shipping_zip_code, userAddress?.zip)
						// console.log('all check', place?.state?.name && place?.state?.name === userAddress?.state_name && place?.shipping_city && place?.shipping_city === userAddress?.city && place?.shipping_zip_code && place?.shipping_zip_code === userAddress?.zip)

						// state, city and zip exists
						if (place?.state?.name && place?.state?.name === userAddress?.state_name && place?.shipping_city && place?.shipping_city === userAddress?.city && place?.shipping_zip_code && place?.shipping_zip_code === userAddress?.zip) {
							console.log('from all', place)
							setoutOfRange(false)
							return true
						}

						// only city and zip exists
						else if (!place?.state?.name && place?.shipping_city && place?.shipping_city === userAddress?.city && place?.shipping_zip_code && place?.shipping_zip_code === userAddress?.zip) {
							setoutOfRange(false)
							console.log('from city and zip', place)
							return true
						}

						// only state and zip exists
						else if (place?.state?.name && place?.state?.name === userAddress?.state_name && !place?.shipping_city && place?.shipping_zip_code && place?.shipping_zip_code === userAddress?.zip) {
							setoutOfRange(false)
							console.log('from state and zip', place)
							return true
						}

						// // state and city exists
						if (place?.state?.name && place?.state?.name === userAddress?.state_name && place?.shipping_city && place?.shipping_city === userAddress?.city && !place?.shipping_zip_code) {
							console.log('from state and city', place)
							setoutOfRange(false)
							return true
						}

						// only state exists
						else if (place?.state?.name && place?.state?.name === userAddress?.state_name && !place?.shipping_city && !place?.shipping_zip_code) {
							setoutOfRange(false)
							console.log('from state only', place)
							return true
						}

						// only city exists
						else if (!place?.state?.name && place?.shipping_city === userAddress?.city && !place?.shipping_zip_code) {
							setoutOfRange(false)
							console.log('from city only', place)
							return true
						}

						// only zip exists
						else if (!place?.state?.name && !place?.shipping_city && place?.shipping_zip_code === userAddress?.zip) {
							setoutOfRange(false)

							console.log('from zip', place)
							return true
						} else {
							setoutOfRange(true)
						}
					})
				} else {
					setoutOfRange(true)
				}
			} else {
				setnoAddressFound(true)
			}
		} else {
			setoutOfRange(false)
		}
	}

	
	// set user base product data
	const setUserBaseProudctData = async () => {
		!router?.asPath?.includes('#') && setchangingData(data?.product)

		// set qty value
		data?.product?.type !== 'variation' &&
			setqty(() =>
				data?.product?.minimum_order !== null && data?.product?.minimum_order > 0
					? data?.product?.quantity_in_cart === 0 || data?.product?.quantity_in_cart === null
						? Number(data?.product?.minimum_order)
						: data?.product?.quantity_in_cart < data?.product?.minimum_order
						? Number(data?.product?.minimum_order) - Number(data?.product?.quantity_in_cart)
						: 1
					: 1
			)

		if (data?.product?.type !== 'variation') {
			setproductQtyinCart(data?.product?.quantity_in_cart !== null ? data?.product?.quantity_in_cart : 0)
		}

		if (data?.sub_products !== undefined) {
			lockScroll()
			setvariationData(data?.sub_products)
			let filterArray = [...data?.sub_products]
			let newfilterArray = filterArray?.map((item) => {
				const { id, quantity_in_cart, max_quantity_threshold, quantity, sample_product } = item
				return { id: id, quantity_in_cart: quantity_in_cart, max_quantity_threshold: max_quantity_threshold, quantity: quantity, sample_product: sample_product }
			})

			let updatedLsVariationData = []
			updatedLsVariationData = updatedLsVariationData?.concat(...newfilterArray)

			const findDuplicateItemIndex = ls_variationData?.findIndex((item) => updatedLsVariationData?.indexOf(item?.id))

			if (updatedLsVariationData?.length > 0 && data?.product?.vendor_product_url === null) {
				if (findDuplicateItemIndex < 0) {
					setls_variationData([...ls_variationData.concat(updatedLsVariationData)])
				} else {
					let newData = []
					ls_variationData?.map((item) => {
						if (updatedLsVariationData?.findIndex((item1) => item1?.id === item?.id) === -1) {
							newData.push(item)
						}
					})
					setls_variationData([...newData.concat(updatedLsVariationData)])
				}
			} else {
				setls_variationData(updatedLsVariationData)
			}

			// await milesAndPlacesCalculation()
			// }

			unlockScroll()
			setuserDataLoading(false)
		}
	}

	useEffect(() => {
		loginUser?.id !== undefined && preSelectedVariationChecked ? (setUserBaseProudctData(), userData?.position !== undefined && userData?.position !== 'Sales Rep' && setTimeout(() => getUserCoins(), 1000)) : !router?.asPath?.includes('#') && setchangingData(data?.product)
		setvariationData(data?.sub_products)
		setTimeout(() => {
			setpreSelectedVariationChecked(false)
		}, 1000)
	}, [loginUser?.id, preSelectedVariationChecked, noAddressFound, outOfRange, userData, userAddress])

	// product type is simple
	useEffect(() => {
		if (loginUser?.id !== undefined && changingData?.price > 0 && data?.product?.type !== 'variation' && data?.product?.quantity > 0 && !preSelectedVariationChecked) {
			setthreshHoldError(() =>
				productQtyinCart >= (data?.product?.max_quantity_threshold !== null ? data?.product?.max_quantity_threshold : data?.product?.quantity)
					? true
					: Number(qty) + Number(productQtyinCart) >= (data?.product?.max_quantity_threshold !== null ? data?.product?.max_quantity_threshold : data?.product?.quantity)
					? true
					: false
			)
		}
	}, [threshHoldError, productQtyinCart, cartItemsData, qty, loginUser, preSelectedVariationChecked])

	// product type is variation
	useEffect(() => {
		if (loginUser?.id !== undefined && data?.product?.type === 'variation' && changingData?.quantity > 0 && subProductMaxThreshHold !== null && !preSelectedVariationChecked) {
			setthreshHoldError(() => (subProudctQtyinCart >= subProductMaxThreshHold ? true : Number(qty) + Number(subProudctQtyinCart) >= subProductMaxThreshHold ? true : false))
		}
	}, [threshHoldError, subProductMaxThreshHold, subProudctQtyinCart, cartItemsData, selectedVariationSku, ls_variationData, qty, loginUser, preSelectedVariationChecked])

	useEffect(() => {
		data?.product?.type === 'variation' && setshowSampleReqMsg(false)
	}, [changingData])

	// price req
	const priceRequestHandler = async (product) => {
		setpriceRequesting(true)

		const data = {
			vendor_id: product?.vendor_id,
			customer_id: loginUser?.id,
			product_id: product?.id
		}

		const res = await axios.post(`${baseApiUrl}/show-price-vendor-email`, data)
		res?.data?.success && setrequrestedForPrice(true)

		setpriceRequesting(false)
	}

	useEffect(() => {
		milesAndPlacesCalculation()
	}, [userAddress])

	return (
		<>
			<Modal modal={addressModal} setmodal={setaddressModal} pageType='address-listing'>
				{addressModal && <AddressForm userData={userAddress} formType='edit-address' pageType='product-detail' setmodal={setaddressModal} setnoAddressFound={setnoAddressFound} setuserAddress={setuserAddress} formSubmit={formSubmit} setformSubmit={setformSubmit} />}
			</Modal>
			<div className={styles.product_detail_container}>
				<h1>{changingData?.name}</h1>
				<ProductRating data={data} loginUser={loginUser} userPosition={userData?.position} />

				<ProductPrice data={data} see_price={data?.product?.see_price} changingData={changingData} loginUser={loginUser} />

				{data?.vendor?.minimum_amount_for_free_shipping !== null && data?.vendor?.minimum_amount_for_free_shipping !== undefined && <MinOrderFreeShipping amount={currencyFormat(data?.vendor?.minimum_amount_for_free_shipping)} />}
				{data?.product?.set_items?.length === 0 && data?.product?.type === 'variation' && (
					<Variation
						changingData={changingData}
						setselectedVariationSku={setselectedVariationSku}
						setsubProudctQtyinCart={setsubProudctQtyinCart}
						setsubProductMaxThreshHold={setsubProductMaxThreshHold}
						captionType={data?.product?.caption_type}
						setchangingData={setchangingData}
						setchangingImages={setchangingImages}
						changingImages={changingImages}
						loginUser={loginUser}
						ls_variationData={ls_variationData}
						preSelectedVariationChecked={preSelectedVariationChecked}
						router={router}
						setqty={setqty}
						variationData={variationData}
						allowSampleReq={allowSampleReq}
						setallowSampleReq={setallowSampleReq}
					/>
				)}

				{data?.product?.set_items?.length > 0 && (
					<>
						<div className={styles.set_includes}>Following is included in this set</div>
						<div className={`${styles.sets_container} active-scrollbar`}>
							<div className={`${styles.set_wrapper}`}>
								<div className='semibold-text'>Qty</div>
								<div className={`${styles.set_sku} semibold-text`}>Sku</div>
								<div className={`${styles.set_prod_name} semibold-text`}>Name</div>
							</div>
							{data?.product?.set_items?.map((set, index) => {
								const { name, sku, pivot } = set
								return (
									<div key={index} className={styles.set_wrapper}>
										<div className={styles.set_qty}>{pivot?.qty}</div>
										<div className={styles.set_sku}>{sku}</div>
										<div>{name}</div>
									</div>
								)
							})}
						</div>
					</>
				)}

				{loginUser?.id !== undefined && data?.customer?.level !== undefined && data?.customer?.level < data?.product?.level && userData?.position !== undefined && userData?.position !== 'Sales Rep' && data?.vendor?.id != 407 && (
					<div className={styles.upgrade_level}>
						<span>
							Upgrade yourself to level <span className='primary-border primary-color full-radius'>{data?.product?.level}</span> to buy this product.
						</span>
					</div>
				)}

				{
					<>
						{threshHoldError && changingData?.quantity > 0 && changingData?.max_quantity_threshold > 0 && userData?.position !== undefined && userData?.position !== 'Sales Rep' && data?.vendor?.id != 407 && (
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
								resMsg={
									<>
										{(data?.product?.type !== 'variation' ? productQtyinCart > 0 : subProudctQtyinCart > 0) && (
											<span>
												You already have {data?.product?.type !== 'variation' ? productQtyinCart : subProudctQtyinCart} quantit{(data?.product?.type !== 'variation' ? productQtyinCart > 1 : subProudctQtyinCart > 1) ? 'ies' : 'y'} of this item in cart.{' '}
											</span>
										)}

										<span>Allowed quantity is {data?.product?.type !== 'variation' ? (changingData?.max_quantity_threshold !== null ? changingData?.max_quantity_threshold : changingData?.quantity) : subProductMaxThreshHold}.</span>
									</>
								}
							/>
						)}

						<div className={styles.qty_coupon_wrapper}>
							{status !== 'loading' &&
								!userDataLoading &&
								// check vendor is not dermazoo
								data?.vendor?.id != 407 &&
								(changingData?.type === 'variation' ? changingData?.range !== null && changingData?.range !== 0 : changingData?.price !== 0 && changingData?.price !== null) &&
								loginUser?.id !== undefined &&
								changingData?.in_stock === 'Y' &&
								changingData?.type !== 'variation' &&
								changingData?.quantity > 0 &&
								data?.customer?.level !== undefined &&
								data?.customer?.level >= data?.product?.level &&
								((data?.product?.see_price === 'login' && loginUser?.id !== undefined) || data?.product?.see_price === 'without_login') &&
								userData?.position !== undefined &&
								userData?.position !== 'Sales Rep' &&
								!outOfRange &&
								!noAddressFound && (
									<Quantity
										qty={qty}
										setqty={setqty}
										threshHoldError={threshHoldError}
										setthreshHoldError={setthreshHoldError}
										productQtyinCart={productQtyinCart}
										subProudctQtyinCart={subProudctQtyinCart}
										subProductMaxThreshHold={subProductMaxThreshHold}
										qtyThreshHold={changingData?.max_quantity_threshold !== null ? (changingData?.type !== 'variation' ? changingData?.max_quantity_threshold : subProductMaxThreshHold) : changingData?.quantity}
										inputQtyThreshHold={changingData?.type !== 'variation' ? changingData?.max_quantity_threshold : subProductMaxThreshHold}
										productType={data?.product?.type}
										selectedVariationSku={selectedVariationSku}
										minOrderQty={changingData?.minimum_order !== null && changingData?.minimum_order > 0 ? changingData?.minimum_order : 0}
										qtyRef={qtyRef}
									/>
								)}
						</div>

						{/* cart btns */}
						<div className={styles.btns_container}>
							<div className={styles.btns_wrapper}>
								{/* check vendor is not dermazoo */}
								{data?.vendor?.id != 407 &&
									(userData?.position !== undefined
										? userData?.position !== 'Sales Rep' &&
										  status !== 'loading' &&
										  // check stock
										  (changingData?.in_stock === 'Y' && changingData?.quantity > 0 ? (
												// check session
												status !== 'loading' && loginUser?.id !== undefined ? (
													// if shipping is in miles or places
													// if no address found
													noAddressFound ? (
														<div>
															<div style={{ margin: '1rem 0', lineHeight: 1.4 }}>
																<p>This product is for specific region. Kindly add an address to purchase this product.</p>
															</div>
															<button className='primary-btn white-color rotate-svg' onClick={() => (setaddressModal(true), lockScroll(), setformSubmit(false))}>
																Add Address{' '}
																<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='var(--white)' className='w-6 h-6'>
																	<path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
																</svg>
															</button>
														</div>
													) : // if out of range
													outOfRange ? (
														<Message resMsg={`This product can't be delivered in your region.`} formSuccess={false} className={styles.out_of_range} />
													) : // check price is not 0
													changingData?.price !== 0 && changingData?.price !== null ? (
														// check customer level
														data?.customer?.level !== undefined &&
														data?.customer?.level >= data?.product?.level &&
														// check price is hide or not
														(data?.product?.see_price === 'login' || data?.product?.see_price === 'without_login') &&
														// if any product thresh-hold error
														// check product not variation and other parameters to show cart btn
														((changingData?.type !== 'variation' ? productQtyinCart >= (changingData?.max_quantity_threshold !== null ? changingData?.max_quantity_threshold : changingData?.quantity) : subProudctQtyinCart >= subProductMaxThreshHold) && threshHoldError ? (
															<button disabled className={`${styles.cart_btn} white-btn gray-color gray-border`}>
																Add To Cart
															</button>
														) : (
															// if no error
															<button
																disabled={cartBtndisabled}
																className={`${styles.cart_btn} primary-btn white-color`}
																onClick={() => {
																	setTimeout(() => addTocartItem(changingData?.id, data?.vendor?.id, qtyRef.current.value, changingData?.id, 'addition', data?.page_type), 100)
																}}
															>
																Add To Cart {cartBtnLoading && clickedProduct === changingData?.id && !showCartSidebar && <LiteLoader className={styles.cart_loader} />}
															</button>
														))
													) : (
														(data?.product?.see_price === 'login' || data?.product?.see_price === 'without_login') && changingData?.type !== 'variation' && <Message className={styles.price_error_msg} resMsg='Price not available' formSuccess={false} />
													)
												) : (
													// if no session

													(data?.product?.see_price === 'login' || data?.product?.see_price === 'without_login') && (
														<Link href='auth/signin'>
															<a className={styles.btns_wrapper}>
																<button className={` primary-btn white-color`}>Sign in to Buy</button>
															</a>
														</Link>
													)
												)
										  ) : (
												// if out of stock

												changingData?.type !== 'variation' && (
													<button role='presentation' disabled className={`${styles.no_stock_btn} gray-border`}>
														Out of Stock
													</button>
												)
										  ))
										: loginUser?.id === undefined && (
												<Link href='auth/signin'>
													<a className={styles.btns_wrapper}>
														<button className={` primary-btn white-color`}>Sign in to Buy</button>
													</a>
												</Link>
										  ))}
								{/* upgrade level */}
								{data?.vendor?.id != 407 && loginUser?.id !== undefined && data?.customer?.level !== undefined && data?.customer?.level < data?.product?.level && status !== 'loading' && userData?.position !== undefined && userData?.position !== 'Sales Rep' && (
									<Link href={`/dashboard/documents`}>
										<a>
											<button className={` primary-btn white-color`}>Upgrade Level</button>
										</a>
									</Link>
								)}
								{/* price req btns */}
								{status !== 'loading' &&
									data?.vendor?.id != 407 &&
									(loginUser?.id !== undefined ? (
										data?.product?.see_price === 'request' && !requrestedForPrice ? (
											<button onClick={() => priceRequestHandler(data?.product)} className={`${styles.request_price} primary-btn white-color`}>
												Request for Price {priceRequesting && <LiteLoader className={styles.request_loader} />}
											</button>
										) : (
											requrestedForPrice && <button className={`${styles.submited_btn}`}>Request for Price Submitted</button>
										)
									) : (
										data?.product?.see_price === 'request' && (
											<Link href='auth/signin'>
												<a className={styles.btns_wrapper}>
													<button className={`primary-btn white-color`}>Sign in to Request for Price</button>
												</a>
											</Link>
										)
									))}
								{/* sample req btn */}
								{data?.vendor?.id != 407 && loginUser?.id !== undefined && status !== 'loading' && allowSampleReq && changingData?.in_stock === 'Y' && changingData?.quantity > 0 && !outOfRange && !noAddressFound && (
									<button disabled={requesingSample} className='primary-border white-btn primary-color' onClick={() => smapleReqHandler(data?.vendor?.id, changingData?.id, data?.product?.type)}>
										Request for Sample {requesingSample && <DarkLoader className={styles.cart_loader} />}
									</button>
								)}
								{showSampleReqMsg && loginUser?.id !== undefined && <Message className={styles.sample_msg} resMsg={smapleReqMsg} formSuccess={sampleReqStatus} />}
							</div>
						</div>
					</>
				}

				<VendorDetail name={data?.vendor?.name} sku={changingData?.sku} data={data?.product_categories} slug={slug} quickFacts={data?.quick_facts} />
			</div>
		</>
	)
}

export default ProductInfo

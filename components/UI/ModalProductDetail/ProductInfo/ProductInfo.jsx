import React, { useState, useContext, useEffect, useRef } from 'react'
import Quantity from './Quantity'
import styles from './ProductInfo.module.css'
import ProductPrice from './ProductPrice'
import ProductRating from './ProductRating'
import Variation from './Variation'
import Link from 'next/link'
import VendorDetail from './VendorDetail'
import { GlobalProvider } from '../../../../context/AppProvider'
import { DarkLoader, LiteLoader } from '../../../Loader/Loader'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'
import Message from '../../Message/Message'
import MinOrderFreeShipping from '../../MinOrderFreeShipping/MinOrderFreeShipping'
import currencyFormat from '../../../../utils/currencyFormat'
import { useRouter } from 'next/router'
import { baseApiUrl } from '../../../../utils/config'
import axios from 'axios'
import Modal from '../../Modal/Modal'
import AddressForm from '../../AddressForm/AddressForm'
import { calculateDistance } from '../../../../utils/distance'

const ProductInfo = ({ data, changingData, setchangingData, setchangingImages, changingImages, vendorName, modal, setmodal, closeSearchHanlder }) => {
	const {
		searchBD,
		showCartSidebar,
		addTocartItem,
		cartBtnLoading,
		cartBtndisabled,
		clickedProduct,
		cartItemsData,
		productModalLs_variationData,
		setproductModalLs_variationData,
		modalProductQtyinCart,
		setmodalProductQtyinCart,
		modalSubProductQtyinCart,
		setmodalSubProductQtyinCart,
		modalQty,
		setmodalQty,
		loginUser,
		userData
	} = useContext(GlobalProvider)

	const qtyRef = useRef(null)

	const router = useRouter()
	const [modalThreshHoldError, setmodalThreshHoldError] = useState(false)
	const [modalSubProductMaxThreshHold, setmodalSubProductMaxThreshHold] = useState(null)

	const [modalSelectedVariationSku, setmodalSelectedVariationSku] = useState(null)

	const [variationDataLoaded, setvariationDataLoaded] = useState(false)

	const [priceRequesting, setpriceRequesting] = useState(false)

	const [allowSampleReq, setallowSampleReq] = useState(changingData?.sample_product)

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

	// sample req
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
			if (parentType === 'variation' && productModalLs_variationData?.length > 0) {
				const upatedData = productModalLs_variationData.map((item) => {
					if (item?.id === product_id) {
						return { ...item, sample_product: res?.data?.allow }
					} else return item
				})
				setproductModalLs_variationData(upatedData)
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

	// close modal
	const closeSidebar = () => {
		setaddressModal(false)
		unlockScroll()
		searchBD && closeSearchHanlder()
	}

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

	console.log('working');
	
	// miles and places
	const milesAndPlacesCalculation = async () => {
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
					console.log('distance', distance, distance?.toString())
					if (Number(distance) <= Number(data?.product?.shipping_miles?.slice(0, data?.product?.shipping_miles?.lastIndexOf('.')))) {
						console.log('you can purchase this product')
						setoutOfRange(false)
						setnoAddressFound(false)
					} else {
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
		if (!variationDataLoaded) {
			if (data?.product?.type === 'variation') {
				let filterArray = [...data?.sub_products]
				let newfilterArray = filterArray?.map((item1) => {
					const { id, quantity_in_cart, max_quantity_threshold, quantity, sample_product } = item1
					return { id: id, quantity_in_cart: quantity_in_cart, max_quantity_threshold: max_quantity_threshold, quantity: quantity, sample_product: sample_product }
				})

				let updatedModalLsVariationData = []
				updatedModalLsVariationData = updatedModalLsVariationData?.concat(newfilterArray)

				const findDuplicateItemIndex = productModalLs_variationData?.findIndex((item) => updatedModalLsVariationData?.indexOf(item?.id))

				if (updatedModalLsVariationData?.length > 0 && data?.product?.vendor_product_url === null) {
					if (findDuplicateItemIndex < 0) {
						setproductModalLs_variationData([...productModalLs_variationData.concat(updatedModalLsVariationData)])
					} else {
						let newData = []
						productModalLs_variationData?.map((item) => {
							if (updatedModalLsVariationData?.findIndex((item1) => item1?.id === item?.id) === -1) {
								newData.push(item)
							}
						})

						setproductModalLs_variationData([...newData.concat(updatedModalLsVariationData)])
					}
				} else setproductModalLs_variationData(updatedModalLsVariationData)
			} else {
				setmodalProductQtyinCart(data?.product?.quantity_in_cart !== null ? data?.product?.quantity_in_cart : 0)
				setmodalQty(
					data?.product?.minimum_order !== null && data?.product?.minimum_order > 0
						? data?.product?.quantity_in_cart < data?.product?.minimum_order
							? Number(data?.product?.minimum_order) - Number(data?.product?.quantity_in_cart)
							: data?.product?.quantity_in_cart === 0 || data?.product?.quantity_in_cart === null
							? data?.product?.minimum_order
							: 1
						: 1
				)
			}

			setvariationDataLoaded(true)
		}
	}

	// page load set values
	useEffect(() => {
		setUserBaseProudctData()
	}, [changingData, variationDataLoaded, noAddressFound, outOfRange])

	useEffect(() => {
		setmodalThreshHoldError(false)
	}, [])

	// product type is simple
	useEffect(() => {
		if (loginUser?.id !== undefined && data?.product?.type !== 'variation' && data?.product?.price > 0 && data?.product?.quantity > 0) {
			setmodalThreshHoldError(() =>
				modalProductQtyinCart >= (data?.product?.max_quantity_threshold !== null ? data?.product?.max_quantity_threshold : data?.product?.quantity)
					? true
					: Number(modalQty) + Number(modalProductQtyinCart) >= (data?.product?.max_quantity_threshold !== null ? data?.product?.max_quantity_threshold : data?.product?.quantity)
					? true
					: false
			)
		}
	}, [modalThreshHoldError, modalProductQtyinCart, cartItemsData, modalQty, loginUser])

	// product type is variation
	useEffect(() => {
		if (loginUser?.id !== undefined && data?.product?.type === 'variation' && changingData?.price > 0 && changingData?.quantity > 0) {
			setmodalThreshHoldError(() => (modalSubProductQtyinCart >= modalSubProductMaxThreshHold ? true : Number(modalQty) + Number(modalSubProductQtyinCart) >= modalSubProductMaxThreshHold ? true : false))
		}
	}, [modalThreshHoldError, modalSubProductMaxThreshHold, modalSubProductQtyinCart, cartItemsData, modalSelectedVariationSku, productModalLs_variationData, modalQty, loginUser])

	useEffect(() => {
		data?.product?.type === 'variation' && setshowSampleReqMsg(false)
	}, [changingData])

	useEffect(() => {
		milesAndPlacesCalculation()
	}, [userAddress])

	return (
		<>
			<Modal modal={addressModal} setmodal={setaddressModal} pageType='address-listing'>
				{addressModal && <AddressForm userData={userAddress} formType='edit-address' pageType='product-detail' setmodal={setaddressModal} setnoAddressFound={setnoAddressFound} setuserAddress={setuserAddress} formSubmit={formSubmit} setformSubmit={setformSubmit} />}
			</Modal>
			<div className={styles.product_detail_container}>
				<h4 className={styles.title}>{changingData?.name}</h4>
				<ProductRating data={data} loginUser={loginUser} userPosition={userData?.position} />

				<ProductPrice data={data} see_price={data?.product?.see_price} changingData={changingData} loginUser={loginUser} />

				{data?.vendor?.minimum_amount_for_free_shipping !== null && data?.vendor?.minimum_amount_for_free_shipping !== undefined && <MinOrderFreeShipping amount={currencyFormat(data?.vendor?.minimum_amount_for_free_shipping)} />}
				{data?.product?.set_items?.length === 0 && data?.product?.type === 'variation' && (
					<Variation
						setmodalSelectedVariationSku={setmodalSelectedVariationSku}
						setmodalSubProductQtyinCart={setmodalSubProductQtyinCart}
						setmodalSubProductMaxThreshHold={setmodalSubProductMaxThreshHold}
						captionType={data?.product?.caption_type ? data?.product?.caption_type : 'Select Variation'}
						setchangingData={setchangingData}
						setchangingImages={setchangingImages}
						changingImages={changingImages}
						loginUser={loginUser}
						modalProductVariationData={productModalLs_variationData}
						router={router}
						setmodalQty={setmodalQty}
						variationData={data?.sub_products}
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

				{data?.customer !== undefined && data?.customer?.level < data?.product?.level && userData?.position !== undefined && userData?.position !== 'Sales Rep' && data?.vendor?.id != 407 && (
					<div className={styles.upgrade_level}>
						<span>
							Upgrade yourself to level <span className='primary-border primary-color full-radius'>{data?.product?.level}</span> to buy this product.
						</span>
					</div>
				)}

				{
					<>
						{modalThreshHoldError && changingData?.quantity > 0 && changingData?.max_quantity_threshold > 0 && userData?.position !== undefined && userData?.position !== 'Sales Rep' && data?.vendor?.id != 407 && (
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
										{(data?.product?.type !== 'variation' ? modalProductQtyinCart > 0 : modalSubProductQtyinCart > 0) && (
											<span>
												You already have {data?.product?.type !== 'variation' ? modalProductQtyinCart : modalSubProductQtyinCart} quantit{(data?.product?.type !== 'variation' ? modalProductQtyinCart > 1 : modalSubProductQtyinCart > 1) ? 'ies' : 'y'} of this item in cart.{' '}
											</span>
										)}
										<span>Allowed quantity is {data?.product?.type !== 'variation' ? (changingData?.max_quantity_threshold !== null ? changingData?.max_quantity_threshold : changingData?.quantity) : modalSubProductMaxThreshHold}.</span>
									</>
								}
							/>
						)}

						{(changingData?.type === 'variation' ? changingData?.range !== null && changingData?.range !== 0 : changingData?.price !== 0 && changingData?.price !== null) &&
							// check vendor is not dermazoo
							data?.vendor?.id != 407 &&
							loginUser?.id !== undefined &&
							changingData?.in_stock === 'Y' &&
							changingData?.type !== 'variation' &&
							changingData?.quantity > 0 &&
							data?.customer !== undefined &&
							data?.customer?.level >= data?.product?.level &&
							((data?.product?.see_price === 'login' && loginUser?.id !== undefined) || data?.product?.see_price === 'without_login') &&
							userData?.position !== undefined &&
							userData?.position !== 'Sales Rep' &&
							!outOfRange &&
							!noAddressFound && (
								<Quantity
									modalQty={modalQty}
									setmodalQty={setmodalQty}
									modalThreshHoldError={modalThreshHoldError}
									setmodalThreshHoldError={setmodalThreshHoldError}
									modalProductQtyinCart={modalProductQtyinCart}
									modalSubProductQtyinCart={modalSubProductQtyinCart}
									modalSubProductMaxThreshHold={modalSubProductMaxThreshHold}
									qtyThreshHold={data?.product?.max_quantity_threshold !== null ? (changingData?.type !== 'variation' ? data?.product?.max_quantity_threshold : modalSubProductMaxThreshHold) : data?.product?.quantity}
									inputQtyThreshHold={changingData?.type !== 'variation' ? data?.product?.max_quantity_threshold : modalSubProductMaxThreshHold}
									productType={data?.product?.type}
									modalSelectedVariationSku={modalSelectedVariationSku}
									minOrderQty={changingData?.minimum_order !== null && changingData?.minimum_order > 0 ? changingData?.minimum_order : 0}
									qtyRef={qtyRef}
								/>
							)}

						{/* cart btns */}
						<div className={styles.btns_container}>
							<div className={styles.btns_wrapper}>
								{/* check vendor is not dermazoo */}
								{data?.vendor?.id != 407 &&
									(userData?.position !== undefined
										? userData?.position !== 'Sales Rep' &&
										  // check stock
										  (changingData?.in_stock === 'Y' && changingData?.quantity > 0 ? (
												// check session
												loginUser?.id !== undefined ? (
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
													changingData?.price !== 0 && changingData?.price !== null ? ( // check customer level
														data?.customer?.level !== undefined &&
														data?.customer?.level >= data?.product?.level &&
														// check price is hide or not
														(data?.product?.see_price === 'login' || data?.product?.see_price === 'without_login') &&
														// check product not variation and other parameters to show cart btn
														// if any product validation error
														((changingData?.type !== 'variation' ? modalProductQtyinCart >= (changingData?.max_quantity_threshold !== null ? changingData?.max_quantity_threshold : changingData?.quantity) : modalSubProductQtyinCart >= modalSubProductMaxThreshHold) && modalThreshHoldError ? (
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
								{modalSelectedVariationSku !== null ? (
									<Link href={`/${data?.product?.slug}#${modalSelectedVariationSku}`}>
										<a onClick={() => closeSidebar()}>
											<button className={`${styles.detail_btn} primary-border white-bg primary-color`}>View Detail</button>
										</a>
									</Link>
								) : (
									<Link href={`/${data?.product?.slug}`}>
										<a onClick={() => closeSidebar()}>
											<button className={`${styles.detail_btn} primary-border white-bg primary-color`}>View Detail</button>
										</a>
									</Link>
								)}
								{/* upgrade level */}
								{loginUser?.id !== undefined && data?.customer?.level !== undefined && data?.customer?.level < data?.product?.level && userData?.position !== undefined && userData?.position !== 'Sales Rep' && data?.vendor?.id != 407 && (
									<Link href={`/dashboard/documents`}>
										<a>
											<button className={` primary-btn white-color`}>Upgrade Level</button>
										</a>
									</Link>
								)}
								{/* price req btns */}
								{data?.vendor?.id != 407 &&
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
								{data?.vendor?.id != 407 && loginUser?.id !== undefined && allowSampleReq && changingData?.in_stock === 'Y' && changingData?.quantity > 0 && !outOfRange && !noAddressFound && (
									<button disabled={requesingSample} className='primary-border white-btn primary-color' onClick={() => smapleReqHandler(data?.vendor?.id, changingData?.id, data?.product?.type)}>
										Request for Sample {requesingSample && <DarkLoader className={styles.cart_loader} />}
									</button>
								)}
								{showSampleReqMsg && loginUser?.id !== undefined && <Message className={styles.sample_msg} resMsg={smapleReqMsg} formSuccess={sampleReqStatus} />}
							</div>
						</div>
					</>
				}

				<VendorDetail productType={changingData?.type} name={data?.vendor?.name} sku={changingData?.sku} data={data?.product_categories} vendorSlug={data?.vendor?.slug} closeSidebar={closeSidebar} quickFacts={data?.product?.quick_facts} />
			</div>
		</>
	)
}

export default ProductInfo

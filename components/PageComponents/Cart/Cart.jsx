import React, { useContext, useState, useEffect, useRef } from 'react'
import styles from './Cart.module.css'
import CartItems from './CartItems/CartItems'
import ListingLayout2 from '../../UI/ListingLayout2/ListingLayout2'
import LeftCol2 from '../../UI/ListingLayout2/LeftCol2/LeftCol2'
import RightCol2 from '../../UI/ListingLayout2/RightCol2/RightCol2'
import Link from 'next/link'
import CartSummary from '../../UI/CartSummary/CartSummary'
import { GlobalProvider } from '../../../context/AppProvider'
import { DarkLoader, LiteLoader } from '../../Loader/Loader'
import Modal from '../../UI/Modal/Modal'
import CartRelatedProducts from './CartRelatedProducts/CartRelatedProducts'
import axios from 'axios'
import { baseApiUrl } from '../../../utils/config'
import AddAddressModal from './AddAddressModal/AddAddressModal'
import { lockScroll, unlockScroll } from '../../../utils/scrollLock'
import CustomCheckbox from '../../UI/CustomCheckbox/CustomCheckbox'
import MetaTags from '../../UI/MetaTags/MetaTags'
import IframeWithLoader from '../../UI/IframeWithLoader/IframeWithLoader'
import NotAuthorized from '../../UI/NotAuthorized/NotAuthorized'
let cartItems = []

const Cart = () => {
	const {
		cartItemsData,
		setcartItemsData,
		cartitemsLength,
		cartLoading,
		deleteItemHandler,
		defaultAddress,
		deleteLoading,
		cartSubTotal,
		// shippingTotal,
		grandTotal,
		// vendorShippingArray,
		// setvendorShippingArray,
		cartRelatedProducts,
		totalCartAmount,
		// totalShippingAmount,
		// allShippingMethods,
		// setallShippingMethods,
		// setshippingTotal,
		// vendorShippingArrayChanged,
		// setvendorShippingArrayChanged,
		getCartItemsLength,
		// setdefaultAddress,
		addTocartItem,
		couponsArray,
		setcouponsArray,
		couponsArrayChanged,
		setcouponsArrayChanged,
		couponsTotal,
		setpopupSuccess,
		setresMsgforPopup,
		setshowresMsg,
		setcouponsTotal,
		// getShippingRates,
		// shippingRatesLoading,
		// setshippingRatesLoading,
		showcheckoutBtn,
		setshowcheckoutBtn,
		// vendorShippingServiceName,
		// vendorShippingServiceRate,
		readyForCheckout,
		setreadyForCheckout,
		vendorsDataChanged,
		setvendorsDataChanged,
		loginUser,
		userData
	} = useContext(GlobalProvider)

	const [showCart, setshowCart] = useState(false)
	const [modal, setmodal] = useState(false)
	const [alertType, setalertType] = useState('')
	const [qtyUpdating, setqtyUpdating] = useState(false)
	const [selectDeleteLoading, setselectDeleteLoading] = useState(false)
	const [deleteProductData, setdeleteProductData] = useState({})
	const [deleteVendorData, setdeleteVendorData] = useState({})
	const [couponLoading, setcouponLoading] = useState(false)
	const [showHelpVideo, setshowHelpVideo] = useState(false)
	const [hideTotal, sethideTotal] = useState(false)
	const [updatingCartDataOnFocus, setupdatingCartDataOnFocus] = useState(false)
	const [cpnsBaseProductsIds, setcpnsBaseProductsIds] = useState([])

	const [getCartData, setgetCartData] = useState(true)

	const [videoSrc, setvideoSrc] = useState('')
	const vendorTotalRef = useRef([])

	const vendorRef = []
	const vendorServiceRef = []

	const freeshippingText = useRef([])
	const couponInputRef = useRef([])
	const couponsListRef = useRef([])

	const serviceCouponInputRef = useRef([])
	const serviceCouponsListRef = useRef(null)

	// update coupon data
	const updateCouponData = async (vendorAmountRef, index, timeout, vendorId, type, productId, sellerType) => {
		// in case of product and type === '' productId is an object of porduct data
		return new Promise(async (resolve, reject) => {
			console.log('data from update ufnc', productId)
			setTimeout(async () => {
				if (type === 'null' || type === 'remove') {
					const newProduct = { ...productId, cart_items: { ...productId.cart_items } }
					const newProductCheck = type === 'remove' ? 'N' : 'Y'
					newProduct.cart_items.checked = newProductCheck

					console.log('newProductCheck', newProductCheck)

					if (sellerType !== 'service-provider') {
						cartItems = cartItemsData?.vendorProducts[index]?.products?.filter((item) => item?.id !== productId?.id)?.concat([newProduct])
					} else {
						cartItems = cartItemsData?.vendorServices[index]?.plans?.filter((item) => item?.id !== productId?.id)?.concat([newProduct])
					}
					console.log('cartItems null', cartItems)
					console.log('nw poroduct', newProduct)
				} else {
					if (sellerType !== 'service-provider') {
						cartItems = cartItemsData?.vendorProducts[index]?.products
					} else {
						cartItems = cartItemsData?.vendorServices[index]?.plans
					}
					console.log('cartItems', cartItems)
				}

				let selectedVendorIndex = couponsArray?.findIndex((coupon) => coupon?.vendorId === vendorId && coupon?.type === 'percent' && coupon?.product_ids?.length === 0)
				let selectedVendorTotal = [...document.querySelectorAll(vendorAmountRef)]
				let cpnsBaseProducts = []

				cpnsBaseProducts = cartItems?.filter((item) => item?.cart_items?.checked === 'Y' && cpnsBaseProductsIds?.includes(item?.id))

				console.log('cpnsBaseProducts', cpnsBaseProducts)

				if (cpnsBaseProducts?.length > 0) {
					let productsTotal = 0,
						productsTotalArr

					if (sellerType !== 'service-provider') {
						productsTotalArr = await cpnsBaseProducts?.map((item) => {
							const { price, price_discounted, price_discounted_end, cart_items } = item

							return (
								(price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? price_discounted : price) *
								(item?.id == productId?.id ? (type === 'addition' ? cart_items?.quantity + 1 : type === 'deletion' ? cart_items?.quantity - 1 : cart_items?.quantity) : cart_items?.quantity)
							)
						})
					} else {
						productsTotalArr = cpnsBaseProducts.map((plan) => {
							const { additional_fee, equipment_fee, cart_items, fee } = plan

							const { number_of_license } = cart_items

							console.log(
								'license fee',
								(plan?.id == productId?.id
									? type === 'addition'
										? additional_fee !== null
											? 1
											: cart_items?.number_of_license + 1
										: type === 'deletion'
										? additional_fee !== null
											? 1
											: cart_items?.number_of_license - 1
										: additional_fee !== null
										? 1
										: cart_items?.number_of_license
									: additional_fee !== null
									? 1
									: cart_items?.number_of_license) * fee,
								'additional fee',
								additional_fee !== null ? (plan?.id == productId?.id ? (type === 'addition' ? number_of_license : type === 'deletion' ? number_of_license - 2 : number_of_license - 1) : number_of_license - 1) * additional_fee : 0,
								'equiment fee',
								equipment_fee !== null ? (plan?.id == productId?.id ? (type === 'addition' ? number_of_license + 1 : type === 'deletion' ? number_of_license - 1 : number_of_license) : equipment_fee * number_of_license) : 0
							)

							return (
								(plan?.id == productId?.id
									? type === 'addition'
										? additional_fee !== null
											? 1
											: cart_items?.number_of_license + 1
										: type === 'deletion'
										? additional_fee !== null
											? 1
											: cart_items?.number_of_license - 1
										: additional_fee !== null
										? 1
										: cart_items?.number_of_license
									: additional_fee !== null
									? 1
									: cart_items?.number_of_license) *
									fee +
								(additional_fee !== null ? (plan?.id == productId?.id ? (type === 'addition' ? number_of_license : type === 'deletion' ? number_of_license - 2 : number_of_license - 1) : number_of_license - 1) * additional_fee : 0) +
								(equipment_fee !== null ? (plan?.id == productId?.id ? (type === 'addition' ? number_of_license + 1 : type === 'deletion' ? number_of_license - 1 : number_of_license) : number_of_license) * equipment_fee : 0)
							)
						})
					}

					for (let i = 0; i < productsTotalArr.length; i++) {
						productsTotal += productsTotalArr[i]
					}

					console.log('cpnsBaseProducts', cpnsBaseProducts, 'productsTotal', productsTotal, 'productsTotalArr', productsTotalArr)

					let newData = couponsArray?.filter((coupon) => coupon?.vendorId !== vendorId)
					let updatedCouponData = couponsArray?.find((coupon) => coupon?.vendorId === vendorId)
					if (updatedCouponData?.type === 'percent') {
						updatedCouponData = { ...updatedCouponData, amount: productsTotal * (updatedCouponData?.couponValue / 100) }
						setcouponsArray(() => [...newData, updatedCouponData])
						setcouponsArrayChanged(true)
					}
					//  else {
					// 	setcouponsArray(() => [...newData])
					// }
					console.log('updatedCouponData', updatedCouponData, 'amount', productsTotal * (updatedCouponData?.couponValue / 100))
				} else if (selectedVendorIndex !== -1) {
					console.log('from else update')
					let newData = couponsArray?.filter((coupon) => coupon?.vendorId !== vendorId)
					let updatedCouponData = couponsArray?.find((coupon) => coupon?.vendorId === vendorId && coupon?.type === 'percent')
					updatedCouponData = { ...updatedCouponData, amount: selectedVendorTotal[index]?.querySelector('span').innerText.slice(1).replaceAll(/\,/g, '') * (updatedCouponData?.couponValue / 100) }

					setcouponsArray(() => [...newData, updatedCouponData])
					setcouponsArrayChanged(true)
				} else {
					const newCpnsArray = couponsArray?.filter((arr) => arr?.vendorId !== vendorId)

					setcouponsArray(() => newCpnsArray)
					setcouponsArrayChanged(true)

					const allVendors = document.querySelectorAll(sellerType !== 'service-provider' ? '.vendor' : '.service-vendor')

					if (sellerType !== 'service-provider') {
						couponInputRef[index].innerText = 'Select coupon'
						;[...couponsListRef[index].querySelectorAll('input')].forEach((input) => {
							input.checked = false
						})
						Array.from(allVendors)[index]?.setAttribute('data-free-shipping', 'false'), freeshippingText[index] && (freeshippingText[index].style.display = 'none')
					} else {
						serviceCouponInputRef[index].innerText = 'Select coupon'
						;[...serviceCouponsListRef[index].querySelectorAll('input')].forEach((input) => {
							input.checked = false
						})
					}
				}
				resolve()
			}, timeout)
		})
	}

	// delete selected
	const selectDeleteHandler = async (type, target) => {
		lockScroll()
		const allProducts = document.querySelectorAll('.item-wrapper'),
			productsChecked = [...allProducts]?.filter((item) => item.querySelector('.product-checkbox input').checked)

		if (type === 'delete') {
			if (productsChecked?.length === 0) {
				setalertType('no-item-selected')
				setmodal(true)

				return
			} else {
				setalertType('delete-checked')
				setmodal(true)

				return
			}
		}

		if (type === 'select') {
			setselectDeleteLoading(true)
			const data = {
				type,
				customer_id: loginUser?.id,
				checked: productsChecked?.length === [...allProducts]?.length ? false : true
			}
			const res = await axios.post(`${baseApiUrl}/delete-and-select-products`, data)
			console.log('res from select', res)
			if (res?.data?.success) {
				await getCartItemsLength()

				target.checked = productsChecked?.length === [...allProducts]?.length ? false : true

				if (target.checked === false) {
					;[...document.querySelectorAll('.free-shipping-text-wrapper')].forEach((text) => {
						text.style.display = 'none'
					})
					;[...document.querySelectorAll('.select-coupon-text')].forEach((text) => {
						text.innerText = 'Select coupon'
					})
					;[...document.querySelectorAll('.coupons-list')].forEach((list) => {
						list.querySelectorAll('input').forEach((input) => {
							input.checked = false
						})
					})
					;[...document.querySelectorAll('.vendor')].forEach((vendor) => {
						vendor.setAttribute('data-free-shipping', 'false')
					})
					setcouponsArray([])
				}

				setTimeout(async () => {
					cartItemsData?.vendorProducts?.map((vendor) => {
						const { id } = vendor
						const selectedVendor = vendorsDataChanged?.filter((vendor) => vendor === id)

						if (selectedVendor.length === 0 && id !== undefined) {
							setvendorsDataChanged((prev) => [...prev, id])
						}
					})
				}, 1000)

				resetMinOrderAnimation(target.checked)
			}

			setselectDeleteLoading(false)
		}
		unlockScroll()
	}

	const cartPageInit = async () => {
		await getCartItemsLength()

		if (defaultAddress !== undefined && defaultAddress !== null && !defaultAddress?.valid) {
			setmodal(true)

			setalertType('address')

			lockScroll()
		}
		!couponsArrayChanged && setcouponsArray([])

		setreadyForCheckout(true)
		setshowCart(true)
		setshowcheckoutBtn(true)
	}

	useEffect(() => {
		!cartLoading && getCartData && (cartPageInit(), setgetCartData(false))
	}, [cartLoading, getCartData, defaultAddress])

	useEffect(() => {
		if (userData?.position !== undefined && userData?.position !== 'Sales Rep' && showCart && (cartItemsData?.vendorProducts?.length > 0 || cartItemsData?.vendorServices?.length > 0)) {
			const selectAllItems = document.querySelector('.select-all-items'),
				allProducts = document.querySelectorAll('.item-wrapper'),
				productsChecked = [...allProducts].filter((item) => item.getAttribute('data-product-checked') == 'true')

			if (productsChecked?.length === allProducts?.length) {
				selectAllItems.querySelector('input').checked = true
			} else {
				selectAllItems.querySelector('input').checked = false
			}
		}
	}, [showCart, cartLoading, cartItemsData])

	const resetMinOrderAnimation = (check) => {
		if (!check) {
			const allVendors = document.querySelectorAll('.vendor')

			const vendorTotalArray = cartItemsData?.vendorProducts?.map((vendor) => {
				let vendorTotalArr =
					// vendor?.checked &&
					vendor?.products.map((item) => {
						const { price, price_discounted, price_discounted_end, cart_items, price_with_coupon } = item
						return (
							cart_items?.checked == 'Y' &&
							(price_with_coupon !== undefined && price_with_coupon !== null ? price_with_coupon : price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? price_discounted : price) * cart_items?.quantity
						)
					})

				let newVendorTotalArr = vendorTotalArr?.length > 0 ? [].concat(...vendorTotalArr?.filter((arr) => arr)) : []

				let vendorTotal = 0

				for (let i = 0; i < newVendorTotalArr.length; i++) {
					vendorTotal += newVendorTotalArr[i]
				}

				return vendorTotal
			})

			let vendorMinOrderArrayRequired = cartItemsData?.vendorProducts?.filter((vendor, index) => {
				const productsChecked = vendor?.products?.filter((pro) => pro?.cart_items?.checked === 'Y')
				return vendorTotalArray[index] < vendor?.minimum_order_amount && productsChecked?.length > 0
			})

			let vendorMinOrderFindIndex = cartItemsData?.vendorProducts?.findIndex((vendor, index) => {
				const productsChecked = vendor?.products?.filter((pro) => pro?.cart_items?.checked === 'Y')
				return vendorTotalArray[index] < vendor?.minimum_order_amount && productsChecked?.length > 0
			})

			if (vendorMinOrderArrayRequired?.length > 0 && allVendors[vendorMinOrderFindIndex] !== null && vendorMinOrderFindIndex !== -1) {
				allVendors[vendorMinOrderFindIndex].classList.remove('red-shadow')
				allVendors[vendorMinOrderFindIndex].querySelector('.min-order-amount').classList.remove('dim')
			}
		}
	}

	useEffect(() => {
		!showHelpVideo &&
			setTimeout(() => {
				setvideoSrc('')
			}, 300)
	}, [showHelpVideo])

	useEffect(() => {
		console.log('cpons array', couponsArray, 'cpnsBaseProductsIds', cpnsBaseProductsIds)
	}, [couponsArray, couponsArrayChanged, cartItemsData, cpnsBaseProductsIds])

	return userData?.position !== undefined && userData?.position !== 'Sales Rep' ? (
		<>
			<MetaTags title={`Cart - Dashboard - DVM Central`} description={`Explore your shopping cart and manage items efficiently within the DVM Central dashboard, ensuring a smooth checkout experience.`} />

			<LiteLoader className={`${styles.delete_loader} transition ${deleteLoading || qtyUpdating || selectDeleteLoading || couponLoading ? 'show-bd' : 'hide-bd'}`} />
			<section className={styles.cart_container}>
				{(!showCart || (cartLoading && getCartData && !qtyUpdating && !selectDeleteLoading)) && <DarkLoader className={styles.cart_loader} />}
				<div style={{ opacity: showCart ? 1 : 0 }}>
					<Modal modal={modal} setmodal={setmodal} alertType={alertType}>
						<AddAddressModal
							getCartItemsLength={getCartItemsLength}
							setselectDeleteLoading={setselectDeleteLoading}
							data={loginUser?.id}
							setmodal={setmodal}
							alertType={alertType}
							deleteProductData={deleteProductData}
							deleteVendorData={deleteVendorData}
							deleteItemHandler={deleteItemHandler}
							couponsArray={couponsArray}
							setcouponsArray={setcouponsArray}
							setcouponsArrayChanged={setcouponsArrayChanged}
							// allShippingMethods={allShippingMethods}
							// vendorShippingServiceName={vendorShippingServiceName}
							// vendorShippingServiceRate={vendorShippingServiceRate}
							// vendorShippingArrayChangeHandler={vendorShippingArrayChangeHandler}
							cartItemsData={cartItemsData}
							vendorTotalRef={vendorTotalRef}
							updateCouponData={updateCouponData}
							freeshippingText={freeshippingText}
							couponInputRef={couponInputRef}
							couponsListRef={couponsListRef}
							serviceCouponInputRef={serviceCouponInputRef}
							serviceCouponsListRef={serviceCouponsListRef}
							sethideTotal={sethideTotal}
							setcpnsBaseProductsIds={setcpnsBaseProductsIds}
						/>
					</Modal>

					<Modal modal={showHelpVideo} setmodal={setshowHelpVideo} modalType='video' className={`${styles.help_video} radius`}>
						<IframeWithLoader loaderColor='white' className='radius' src={videoSrc} />
					</Modal>

					{cartItemsData !== undefined && cartitemsLength !== null && (
						<div className={`${styles.cart_length} white-bg`}>
							<div className='sec-container semibold-text'>
								Your Cart ({cartitemsLength} item{cartitemsLength > 1 && 's'})
							</div>
						</div>
					)}
					<div className='sec-container'>
						{cartItemsData !== undefined && (cartItemsData?.vendorProducts?.length > 0 || cartItemsData?.vendorServices?.length > 0) && (
							<>
								<ListingLayout2 className={`inner-sec-mt ${cartRelatedProducts?.length == 0 ? 'inner-sec-mb' : undefined} ${cartRelatedProducts?.length == 0 ? 'inner-sec-pb' : undefined}`}>
									<LeftCol2>
										<div className={`${styles.address_container} white-bg gray-border`}>
											<div className={styles.address_wrapper}>
												<div className={`${styles.addr_title} semibold-text`}>
													SHIPPING ADDRESS
													{defaultAddress ? (
														<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--green)'>
															<path
																fillRule='evenodd'
																d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
																clipRule='evenodd'
															/>
														</svg>
													) : (
														<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--red)'>
															<path
																fillRule='evenodd'
																d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
																clipRule='evenodd'
															/>
														</svg>
													)}
												</div>
												{defaultAddress?.valid ? (
													<address className='gray-color'>{defaultAddress?.address1}</address>
												) : (
													<Link href={`dashboard/delivery-address`}>
														<a className={`${styles.no_address} red-color`}>No address found, click to add</a>
													</Link>
												)}
											</div>
											<div className={styles.addr_btns_wrapper}>
												{defaultAddress?.valid ? (
													<Link href={`dashboard/delivery-address`}>
														<a className={`${styles.change} link red-color`}>Change</a>
													</Link>
												) : (
													<Link href={`dashboard/delivery-address`}>
														<a>
															<button className='primary-color'>Add</button>
														</a>
													</Link>
												)}
											</div>
										</div>

										<div className={`${styles.address_container} ${styles.select_delete} white-bg gray-border`}>
											<CustomCheckbox className={`${styles.select_input} select-all-items`} type='checkbox' labeltitle='Select All Items' onChange={(e) => selectDeleteHandler('select', e.target)} />
											<div className={styles.delete_check_btn} onClick={() => selectDeleteHandler('delete')}>
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
													/>
												</svg>
												<div className='gray-color'>Delete Selected</div>
											</div>
										</div>
										<CartItems
											cartItemsData={cartItemsData}
											setcartItemsData={setcartItemsData}
											loginUser={loginUser}
											// vendorShippingArray={vendorShippingArray}
											totalCartAmount={totalCartAmount}
											// totalShippingAmount={totalShippingAmount}
											// allShippingMethods={allShippingMethods}
											// setallShippingMethods={setallShippingMethods}
											// setshippingTotal={setshippingTotal}
											// vendorShippingArrayChanged={vendorShippingArrayChanged}
											// setvendorShippingArrayChanged={setvendorShippingArrayChanged}
											addTocartItem={addTocartItem}
											couponsArray={couponsArray}
											setcouponsArray={setcouponsArray}
											couponsArrayChanged={couponsArrayChanged}
											setcouponsArrayChanged={setcouponsArrayChanged}
											setpopupSuccess={setpopupSuccess}
											setresMsgforPopup={setresMsgforPopup}
											setshowresMsg={setshowresMsg}
											setcouponsTotal={setcouponsTotal}
											getCartItemsLength={getCartItemsLength}
											readyForCheckout={readyForCheckout}
											setreadyForCheckout={setreadyForCheckout}
											couponsTotal={couponsTotal}
											// getShippingRates={getShippingRates}
											// shippingRatesLoading={shippingRatesLoading}
											// setshippingRatesLoading={setshippingRatesLoading}
											setshowcheckoutBtn={setshowcheckoutBtn}
											// vendorShippingServiceName={vendorShippingServiceName}
											// vendorShippingServiceRate={vendorShippingServiceRate}
											vendorRef={vendorRef}
											qtyUpdating={qtyUpdating}
											setqtyUpdating={setqtyUpdating}
											setmodal={setmodal}
											setalertType={setalertType}
											setdeleteProductData={setdeleteProductData}
											setdeleteVendorData={setdeleteVendorData}
											// vendorShippingArrayChangeHandler={vendorShippingArrayChangeHandler}
											setcouponLoading={setcouponLoading}
											vendorTotalRef={vendorTotalRef}
											resetMinOrderAnimation={resetMinOrderAnimation}
											vendorServiceRef={vendorServiceRef}
											updateCouponData={updateCouponData}
											freeshippingText={freeshippingText}
											couponInputRef={couponInputRef}
											couponsListRef={couponsListRef}
											serviceCouponInputRef={serviceCouponInputRef}
											serviceCouponsListRef={serviceCouponsListRef}
											sethideTotal={sethideTotal}
											vendorsDataChanged={vendorsDataChanged}
											setvendorsDataChanged={setvendorsDataChanged}
											updatingCartDataOnFocus={updatingCartDataOnFocus}
											setcpnsBaseProductsIds={setcpnsBaseProductsIds}
										/>
									</LeftCol2>
									<RightCol2 className={styles.right_col}>
										<div className={styles.inner_right_col}>
											<div className={styles.sticky}>
												<Link href='/'>
													<a className={`${styles.continue} black-color`}>
														<button className='white-btn gray-border black-color'>CONTINUE SHOPPING</button>
													</a>
												</Link>
												<CartSummary
													defaultAddress={defaultAddress}
													setmodal={setmodal}
													cartSubTotal={cartSubTotal}
													couponsTotal={couponsTotal}
													// shippingTotal={shippingTotal}
													grandTotal={grandTotal}
													readyForCheckout={readyForCheckout}
													showcheckoutBtn={showcheckoutBtn}
													// vendorShippingArray={vendorShippingArray}
													setalertType={setalertType}
													cartItemsData={cartItemsData}
													vendorRef={vendorRef}
													hideTotal={hideTotal}
													updatingCartDataOnFocus={updatingCartDataOnFocus}
													loginUser={loginUser}
												/>
												<div className={styles.help}>
													<p>Need help, click below button to watch video, how cart and checkout works!</p>
													<button className='primary-border primary-color lite-pink-bg' onClick={() => (setshowHelpVideo(true), setvideoSrc('https://player.vimeo.com/video/894460243?pip=0&&autoplay=1'))}>
														Watch Video
														{/* <PlayerBtn size='sml' /> */}
													</button>
												</div>
											</div>
										</div>
									</RightCol2>
								</ListingLayout2>
								{cartRelatedProducts?.length > 0 && <CartRelatedProducts cartRelatedProducts={cartRelatedProducts} />}
							</>
						)}
						{cartItemsData?.vendorProducts?.length === 0 && cartItemsData?.vendorServices?.length === 0 && (
							<>
								<div className='inner-sec-mt red-color'>No item is in your cart...</div>

								<Link href='/'>
									<a className={`${styles.continue_btn} ${styles.continue} black-color`}>
										<button className='primary-btn white-color full-radius'>CONTINUE SHOPPING</button>
									</a>
								</Link>
							</>
						)}
					</div>
				</div>
			</section>
		</>
	) : userData?.position !== undefined ? (
		<NotAuthorized heading='You are not authorized to access this page.' />
	) : (
		<div style={{ minHeight: '70vh' }}>
			<DarkLoader className={styles.cart_loader} />
		</div>
	)
}

export default Cart

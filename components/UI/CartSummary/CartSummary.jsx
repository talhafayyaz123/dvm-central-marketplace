import React, { useEffect, useState } from 'react'
import styles from './CartSummary.module.css'
import { lockScroll, unlockScroll } from '../../../utils/scrollLock'
import currencyFormat from '../../../utils/currencyFormat'
import { scrollToData } from '../../../utils/scrollTo'
import { useRouter } from 'next/router'
import { DarkLoader, LiteLoader } from '../../Loader/Loader'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import Link from 'next/link'
let gsap, ScrollToPlugin

const CartSummary = ({
	pageType,
	defaultAddress,
	setmodal,
	cartSubTotal,
	couponsTotal,
	grandTotal,
	showcheckoutBtn,
	setalertType,
	cartItemsData,
	vendorRef,
	hideTotal,
	shippingTotal,
	vendorShippingArray,
	updatingCartDataOnFocus,
	cashbackAndCoins,
	// lessCashBack,
	// setlessCashBack,
	lessCoins,
	setlessCoins,
	coinsConversionRate,
	// cashBackRef,
	loginUser
}) => {
	const [showShippingTooltip, setshowShippingTooltip] = useState(false)
	const [showCoinsDetails, setshowCoinsDetails] = useState(false)

	const router = useRouter()

	const checkoutHandler = async () => {
		// if address is null
		if (defaultAddress?.valid === false) {
			setmodal(true)
			setalertType('address')
			lockScroll()
		} else {
			const vendorTotalArray = cartItemsData?.vendorProducts?.map((vendor) => {
				let vendorTotalArr =
					// vendor?.checked &&
					vendor?.products.map((item) => {
						const { price, price_discounted, price_discounted_end, cart_items, price_with_coupon } = item
						return cart_items?.checked == 'Y' && (price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? price_discounted : price) * cart_items?.quantity
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

			if (vendorMinOrderArrayRequired?.length > 0) {
				vendorRef[vendorMinOrderFindIndex].classList.add('red-shadow')
				vendorRef[vendorMinOrderFindIndex].querySelector('.min-order-amount').classList.add('dim')
				if (gsap === undefined) {
					gsap = (await import('gsap')).default
					ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

					gsap.registerPlugin(ScrollToPlugin)
				}

				scrollToData(gsap, vendorRef[vendorMinOrderFindIndex], 165)
			} else {
				router?.push('/checkout')
				setmodal(false)
				unlockScroll()
				setalertType('')
			}
		}
	}

	useEffect(() => {
		if (router?.asPath === '/cart') {
			const vendorTotalArray = cartItemsData?.vendorProducts?.map((vendor) => {
				let vendorTotalArr =
					vendor?.checked &&
					vendor?.products.map((item) => {
						const { price, price_discounted, price_discounted_end, cart_items } = item

						return item?.cart_items?.checked == 'Y' && (price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? price_discounted : price) * cart_items?.quantity
					})

				let newVendorTotalArr = vendorTotalArr?.length > 0 ? [].concat(...vendorTotalArr?.filter((arr) => arr)) : []

				let vendorTotal = 0

				for (let i = 0; i < newVendorTotalArr.length; i++) {
					vendorTotal += newVendorTotalArr[i]
				}

				return vendorTotal
			})

			let vendorMinOrderArrayRequired = cartItemsData?.vendorProducts?.filter((vendor, index) => vendor?.checked && vendorTotalArray[index] >= vendor?.minimum_order_amount)

			let vendorMinOrderFindIndex = cartItemsData?.vendorProducts?.findIndex((vendor, index) => vendor?.checked && vendorTotalArray[index] >= vendor?.minimum_order_amount)

			if (vendorMinOrderArrayRequired?.length > 0 && vendorRef[vendorMinOrderFindIndex] !== undefined && vendorRef[vendorMinOrderFindIndex].querySelector('.min-order-amount') !== null) {
				vendorRef[vendorMinOrderFindIndex].classList.remove(styles.min_order_vendor, 'red-shadow')

				vendorRef[vendorMinOrderFindIndex].querySelector('.min-order-amount').classList.remove('dim')
			}
		}
	}, [cartItemsData])

	return (
		<>
			<div className={`${styles.summary} white-bg gray-border`}>
				<div className={`${styles.summary_text} semibold-text`}>Order Summary</div>
				<div className={`${styles.wrapper} ${styles.wrapper_border}`}>
					<div className={`gray-color`}>Sub Total</div>
					<div className={`${styles.total} semibold-text`}>{currencyFormat(cartSubTotal)}</div>
				</div>
				<div className={`${styles.wrapper} ${styles.wrapper_border}`}>
					<div className={`gray-color`}>Promo Discount</div>
					<div className={`${styles.total} semibold-text`}>{currencyFormat(couponsTotal)}</div>
				</div>
				{pageType === 'checkout' && (
					<>
						{/* shipping */}
						<div className={`${styles.wrapper} ${styles.wrapper_border}`}>
							<div className={`${styles.total_shipping} gray-color`} onMouseEnter={() => setshowShippingTooltip(true)} onMouseLeave={() => setshowShippingTooltip(false)}>
								Total Shipping Cost{' '}
								{vendorShippingArray?.length > 0 && (
									<>
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z' />
										</svg>
										<div className={`${styles.shipping_tooltip} shadow white-bg transition ${showShippingTooltip && styles.show_toottip}`}>
											<div className={styles.tooltip_wrapper}>
												<div className={`${styles.heading} primary-color`}>Shipping Details</div>
												<div className={styles.headings_wrapper}>
													<div className={styles.name}>Name</div>
													<div className={styles.shipping_text}>Shipping Service</div>
													<div className={styles.rate}>Shipping Rate</div>
												</div>
												{vendorShippingArray?.map((arr, index) => {
													return (
														arr && (
															<div key={index} className={styles.ship_detail_wrapper}>
																<div className={styles.name}>{arr?.vendor_name}</div>
																<div className={styles.shipping_text}>
																	{arr?.service_type === 'ups' || arr?.service_type === 'fedex' || (arr?.service_type === 'usps' && arr?.service_type?.toUpperCase())} {arr?.shipping_service}
																</div>

																<div className={styles.rate}>{currencyFormat(arr?.shipping_rate)}</div>
															</div>
														)
													)
												})}

												<div className={`${styles.total} semibold-text black-color`}>Total Shipping: {currencyFormat(shippingTotal)}</div>
											</div>
										</div>
									</>
								)}
							</div>
							<div className={`${styles.total} semibold-text`} style={{ opacity: hideTotal ? 0 : 1 }}>
								${shippingTotal}
							</div>
						</div>

						{/* coins */}
						{cashbackAndCoins?.coins !== null && cashbackAndCoins?.coins > 0 && (
							<div className={`${styles.wrapper} ${styles.wrapper_border} ${styles.coins}`}>
								<div className={`${styles.total_shipping} gray-color`}>
									<CustomCheckbox className={styles.cashback_checkbox} labeltitle={`Total Coins`} type='checkbox' value={cashbackAndCoins?.coins} onChange={() => setlessCoins(!lessCoins)} />
									{(cashbackAndCoins?.coins / coinsConversionRate > ((cartSubTotal - couponsTotal) * Number(cashbackAndCoins?.deduct_percent)) / 100
										? cashbackAndCoins?.coins / coinsConversionRate > ((cartSubTotal - couponsTotal) * Number(cashbackAndCoins?.deduct_percent)) / 100
										: cashbackAndCoins?.coins / coinsConversionRate > cartSubTotal - couponsTotal) && (
										<div className={styles.coins_details} style={{ position: 'relative' }} onMouseEnter={() => setshowCoinsDetails(true)} onMouseLeave={() => setshowCoinsDetails(false)}>
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z' />
											</svg>
											<div className={`${styles.shipping_tooltip} ${styles.coins_tooltip} ${styles.cashback_tooltip} shadow white-bg transition ${showCoinsDetails && styles.show_toottip}`}>
												<div className={styles.tooltip_wrapper}>
													<div className={`${styles.heading} primary-color`}>
														Coins Details <br /> {coinsConversionRate} coins = $1.00 <br /> Total Coins: {cashbackAndCoins?.coins}
													</div>

													<div className={`${styles.total} semibold-text primary-color`}>Total Coins Value : {currencyFormat(cashbackAndCoins?.coins / coinsConversionRate)}</div>

													<div className={`${styles.total}  semibold-text primary-btn`}>
														Redeemable Coins Value:{' '}
														{currencyFormat(
															cashbackAndCoins?.coins / coinsConversionRate >= ((cartSubTotal - couponsTotal) * Number(cashbackAndCoins?.deduct_percent)) / 100
																? ((cartSubTotal - couponsTotal) * Number(cashbackAndCoins?.deduct_percent)) / 100
																: cashbackAndCoins?.coins / coinsConversionRate >= cartSubTotal - couponsTotal
																? cartSubTotal - couponsTotal
																: cashbackAndCoins?.coins / coinsConversionRate
														)}
													</div>
													{lessCoins && (
														<div className={`${styles.total} primary-color semibold-text `}>
															Balance Coins Value:{' '}
															{currencyFormat(
																cashbackAndCoins?.coins / coinsConversionRate > ((cartSubTotal - couponsTotal) * Number(cashbackAndCoins?.deduct_percent)) / 100
																	? cashbackAndCoins?.coins / coinsConversionRate - ((cartSubTotal - couponsTotal) * Number(cashbackAndCoins?.deduct_percent)) / 100
																	: cashbackAndCoins?.coins / coinsConversionRate - cartSubTotal - couponsTotal
															)}
														</div>
													)}
												</div>
											</div>
										</div>
									)}
								</div>
								<div className={`${styles.total} semibold-text`} style={{ opacity: hideTotal ? 0 : 1 }}>
									{/* {currencyFormat(cashbackAndCoins?.coins / coinsConversionRate >= cartSubTotal - couponsTotal ? cartSubTotal - couponsTotal : cashbackAndCoins?.coins / coinsConversionRate)} */}
									{currencyFormat(
										cashbackAndCoins?.coins / coinsConversionRate >= ((cartSubTotal - couponsTotal) * Number(cashbackAndCoins?.deduct_percent)) / 100
											? ((cartSubTotal - couponsTotal) * Number(cashbackAndCoins?.deduct_percent)) / 100
											: cashbackAndCoins?.coins / coinsConversionRate >= cartSubTotal - couponsTotal
											? cartSubTotal - couponsTotal
											: cashbackAndCoins?.coins / coinsConversionRate
									)}
								</div>
							</div>
						)}

						{/* cashback */}
						{/* {cashbackAndCoins?.cashback?.amount !== null && cashbackAndCoins?.cashback?.amount > 0 && (
							<div className={`${styles.wrapper} ${styles.wrapper_border}`}>
								<div className={`${styles.total_shipping} gray-color`}>
									<CustomCheckbox className={styles.cashback_checkbox} labeltitle={`Total Cashback `} type='checkbox' value={cashbackAndCoins?.cashback?.amount} onChange={() => setlessCashBack(!lessCashBack)} />
									{cashbackAndCoins?.cashback?.terms?.length > 0 && (
										<div style={{ position: 'relative' }} onMouseEnter={() => setshowCashbackDetails(true)} onMouseLeave={() => setshowCashbackDetails(false)}>
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z' />
											</svg>
											<div className={`${styles.shipping_tooltip} ${styles.cashback_tooltip} shadow white-bg transition ${showCashbackDetails && styles.show_toottip}`}>
												<div className={styles.tooltip_wrapper}>
													<div className={`${styles.heading} primary-color`}>Cashback Details</div>
													<div className={styles.headings_wrapper}>
														<div className={styles.name}>No.</div>
														<div className={styles.shipping_text}>Description</div>
													</div>
													{cashbackAndCoins?.cashback?.terms?.map((arr, index) => {
														return (
															<div key={index} className={styles.ship_detail_wrapper}>
																<div className={styles.name}>{index + 1}</div>
																<div className={styles.shipping_text}>{arr}</div>
															</div>
														)
													})}

													<div className={`${styles.total} semibold-text primary-color`}>Total Earned Cashback: {currencyFormat(cashbackAndCoins?.cashback?.amount)}</div>
													{cashbackAndCoins?.cashback?.amount > cartSubTotal - couponsTotal && (
														<>
															<div className={`${styles.total}  semibold-text primary-btn`}>Redeemable Cashback: {currencyFormat(cartSubTotal - couponsTotal - (lessCoins ? cashbackAndCoins?.coins / coinsConversionRate : 0).toFixed(2))}</div>
															{lessCashBack && <div className={`${styles.total} primary-color semibold-text `}>Balance Cashback: {currencyFormat(cashbackAndCoins?.cashback?.amount - (cartSubTotal - couponsTotal - (lessCoins ? cashbackAndCoins?.coins / coinsConversionRate : 0).toFixed(2)))}</div>}
														</>
													)}
												</div>
											</div>
										</div>
									)}
								</div>

								<div ref={cashBackRef} className={`${styles.total} semibold-text`} style={{ opacity: hideTotal ? 0 : 1 }}>
									{currencyFormat(
										cashbackAndCoins?.cashback?.amount >= cartSubTotal - couponsTotal - (lessCoins ? cashbackAndCoins?.coins / coinsConversionRate : 0) ? cartSubTotal - couponsTotal - (lessCoins ? cashbackAndCoins?.coins / coinsConversionRate : 0).toFixed(2) : cashbackAndCoins?.cashback?.amount
									)}
								</div>
							</div>
						)} */}
					</>
				)}

				<div className={`${styles.wrapper}`}>
					<div className={`${styles.total_text} semibold-text`}>Grand Total</div>
					{hideTotal ? (
						<DarkLoader loaderType='sml' />
					) : (
						<div className={`${styles.total} semibold-text primary-color`}>
							{currencyFormat(
								grandTotal +
									(pageType === 'checkout' ? Number(shippingTotal) : 0) -
									(pageType === 'checkout' && lessCoins
										? Number(
												cashbackAndCoins?.coins / coinsConversionRate >= ((cartSubTotal - couponsTotal) * Number(cashbackAndCoins?.deduct_percent)) / 100
													? ((cartSubTotal - couponsTotal) * Number(cashbackAndCoins?.deduct_percent)) / 100
													: cashbackAndCoins?.coins / coinsConversionRate >= cartSubTotal - couponsTotal
													? cartSubTotal - couponsTotal
													: cashbackAndCoins?.coins / coinsConversionRate
										  )
										: 0)
								// (pageType === 'checkout' && lessCashBack
								// 	? Number(cashbackAndCoins?.cashback?.amount >= cartSubTotal - couponsTotal - (lessCoins ? cashbackAndCoins?.coins / coinsConversionRate : 0) ? cartSubTotal - couponsTotal - (lessCoins ? cashbackAndCoins?.coins / coinsConversionRate : 0) : cashbackAndCoins?.cashback?.amount)
								// 	: 0)
							)}
						</div>
					)}
				</div>

				{pageType !== 'checkout' &&
					(!defaultAddress ? (
						<>
							<button disabled className={`${styles.checkout_btn} primary-btn white-color`}>
								Checkout
							</button>
							<Link href={`dashboard/delivery-address`}>
								<a className='red-color' style={{ marginTop: '0.5rem' }}>
									Click to add address to checkout
								</a>
							</Link>
						</>
					) : showcheckoutBtn ? (
						<button disabled={cartSubTotal > 0 || hideTotal ? false : true} className={`${styles.checkout_btn} primary-btn white-color`} onClick={() => !hideTotal && !updatingCartDataOnFocus && checkoutHandler()}>
							Checkout {updatingCartDataOnFocus && <LiteLoader className={styles.update_loader} loaderType='sml' />}
						</button>
					) : (
						<button disabled className={`${styles.checkout_btn} primary-btn white-color`}>
							Checkout
						</button>
					))}
			</div>
		</>
	)
}

export default CartSummary

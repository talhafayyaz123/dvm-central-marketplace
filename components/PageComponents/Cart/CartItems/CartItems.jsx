import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { baseApiUrl, imgApiUrl } from '../../../../utils/config'
import styles from './CartItems.module.css'
// import { DarkLoader } from '../../../Loader/Loader'
import axios from 'axios'
import CustomCheckbox from '../../../UI/CustomCheckbox/CustomCheckbox'
import Message from '../../../UI/Message/Message'
import placeholderImg from '../../../../public/imgs/no-img.webp'
import currencyFormat from '../../../../utils/currencyFormat'
import MinOrderFreeShipping from '../../../UI/MinOrderFreeShipping/MinOrderFreeShipping'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'

const CartItems = ({
	cartItemsData,
	// setcartItemsData,
	loginUser,
	// vendorShippingArray,
	totalCartAmount,
	// totalShippingAmount,
	// allShippingMethods,
	// setallShippingMethods,
	// setvendorShippingArrayChanged,
	addTocartItem,
	couponsArray,
	setcouponsArray,
	// couponsArrayChanged,
	setcouponsArrayChanged,
	setpopupSuccess,
	setresMsgforPopup,
	setshowresMsg,
	getCartItemsLength,
	readyForCheckout,
	// setreadyForCheckout,
	// getShippingRates,
	// shippingRatesLoading,
	// vendorShippingServiceName,
	// vendorShippingServiceRate,
	setshowcheckoutBtn,
	vendorRef,
	// qtyUpdating,
	setqtyUpdating,
	setmodal,
	setalertType,
	setdeleteProductData,
	setdeleteVendorData,
	// vendorShippingArrayChangeHandler,
	setcouponLoading,
	vendorTotalRef,
	resetMinOrderAnimation,
	vendorServiceRef,
	updateCouponData,
	freeshippingText,
	couponInputRef,
	couponsListRef,
	serviceCouponInputRef,
	serviceCouponsListRef,
	sethideTotal,
	vendorsDataChanged,
	setvendorsDataChanged,
	updatingCartDataOnFocus,
	setcpnsBaseProductsIds
}) => {
	const [clickedVendor, setclickedVendor] = useState()
	const [showCpnList, setshowCpnList] = useState(false)
	const [showServiceCpnList, setshowServiceCpnList] = useState(false)

	const [selectedCouponsType, setselectedCouponsType] = useState([])

	const [cpnSearchVal, setcpnSearchVal] = useState('')
	const [noCpnFound, setnoCpnFound] = useState(false)

	const checkboxContainer = useRef([])
	const vendorServiceTotalRef = useRef([])

	let allVendors, allCheckboxContainers, allServiceVendors

	// toggle product qty
	const qtyChangeHandler = async (product, vendorId, quantity, index, type, i, minimum_amount_for_free_shipping, service_id) => {
		// if you change qty of service items then minimum_amount_for_free_shipping will act as pageType for services add to cart

		if (type === 'deletion' && quantity > 1) {
			lockScroll()
			sethideTotal(true)
			setshowcheckoutBtn(false)
			setclickedVendor(i)
			setqtyUpdating(true)
			if (minimum_amount_for_free_shipping === 'service-provider-seller') {
				const res = await addTocartItem(product?.id, vendorId, 1, index, type, minimum_amount_for_free_shipping, service_id)
				res?.data?.success && (await getCartItemsLength(), await totalCartAmount(), couponsArray?.length > 0 && updateCouponData('.service-vendor-total', i, 300, vendorId, 'deletion', product, 'service-provider'))
			} else {
				const res = await addTocartItem(product?.id, vendorId, 1, index, type)

				res?.data?.success &&
					(await getCartItemsLength(),
					await totalCartAmount(),
					setTimeout(() => {
						let selectedCheckboxContainer = [...document.querySelectorAll('.all-rates-container')]?.find((cont, i) => i == index)
						if (selectedCheckboxContainer !== undefined && !selectedCheckboxContainer.querySelector('input[data-selected = true]').checked) {
							selectedCheckboxContainer.querySelector('input[data-selected = true]').checked = true
						}

						couponsArray?.length > 0 && updateCouponData('.vendor-total', i, 0, vendorId, 'deletion', product, 'products')
					}, 300))
			}

			setclickedVendor()
			setqtyUpdating(false)
		}
		if (type === 'addition' && quantity >= 1) {
			lockScroll()
			sethideTotal(true)
			setshowcheckoutBtn(false)
			setclickedVendor(i)
			setqtyUpdating(true)
			if (minimum_amount_for_free_shipping === 'service-provider-seller') {
				const res = await addTocartItem(product?.id, vendorId, 1, index, type, minimum_amount_for_free_shipping, service_id)

				res?.data?.success && (await getCartItemsLength(), await totalCartAmount(), couponsArray?.length > 0 && updateCouponData('.service-vendor-total', i, 300, vendorId, 'addition', product, 'service-provider'))
			} else {
				const res = await addTocartItem(product?.id, vendorId, 1, index, type)

				res?.data?.success &&
					(await getCartItemsLength(),
					await totalCartAmount(),
					setTimeout(() => {
						let selectedCheckboxContainer = [...document.querySelectorAll('.all-rates-container')]?.find((cont, i) => i == index)
						if ((vendorTotalRef[i].innerText.substring(8) >= minimum_amount_for_free_shipping || allVendors[i]?.getAttribute('data-free-shipping') == 'true') && selectedCheckboxContainer !== undefined && !selectedCheckboxContainer?.querySelector('input[data-selected = true]').checked) {
							selectedCheckboxContainer.querySelector('input[data-selected = true]').checked = true
						}

						couponsArray?.length > 0 && updateCouponData('.vendor-total', i, 0, vendorId, 'addition', product, 'products')
					}, 300))
			}

			setclickedVendor()
		}

		setTimeout(() => {
			resetMinOrderAnimation(false)
			unlockScroll()
			setshowcheckoutBtn(true)
			setqtyUpdating(false)
			sethideTotal(false)
		}, 500)
	}

	// coupons handler function
	const getVendorCouponHandler = async (vendorId, index, couponName, selectedCoupon, sellerType, minimum_amount_for_free_shipping, products, secret) => {
		sethideTotal(true)

		let product_ids = [...products]?.map((item) => item?.id)?.filter((item) => typeof item === 'number')

		if (sellerType === 'service-provider') {
			serviceCouponInputRef[index] && (serviceCouponInputRef[index].innerText = couponName)
		} else {
			couponInputRef[index] && (couponInputRef[index].innerText = couponName)
		}

		// close popup if already opened
		setshowresMsg(false)
		let res

		// setclickedVendor(index)
		setcouponLoading(true)
		const couponData = {
			vendor_id: vendorId,
			customer_id: loginUser?.id,
			couponCode: selectedCoupon,
			product_ids,
			type: sellerType === 'service-provider' ? 'services' : 'products'
		}

		const getCouponsType = async (index, type) => {
			selectedCouponsType.splice(index)
			setselectedCouponsType((prev) => [...prev, type])
		}

		res = await axios.post(`${baseApiUrl}/coupon`, couponData)
		console.log('res from coupon', res)

		let currentCoupon = 0,
			productsBaseTotal

		if (res?.data?.success) {
			let productsTotal = 0,
				productsTotalArr

			const productsValidForCoupon = await products?.filter((item) => item?.cart_items?.checked === 'Y' && res?.data?.vendor_coupons?.products_detail?.some((cpnProudct) => cpnProudct?.id == item?.id))

			if (sellerType !== 'service-provider') {
				productsTotalArr = productsValidForCoupon.map((item) => {
					const { price, price_discounted, price_discounted_end, cart_items } = item

					return (price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? price_discounted : price) * cart_items?.quantity
				})
			} else {
				productsTotalArr = productsValidForCoupon.map((plan) => {
					const { additional_fee, equipment_fee, cart_items, fee } = plan

					const { number_of_license } = cart_items

					return (additional_fee !== null ? 1 : number_of_license) * fee + (additional_fee !== null ? (number_of_license - 1) * additional_fee : 0) + (equipment_fee !== null ? equipment_fee * number_of_license : 0)
				})
			}

			for (let i = 0; i < productsTotalArr.length; i++) {
				productsTotal += productsTotalArr[i]
			}

			// console.log('productsValidForCoupon', productsValidForCoupon, 'productsTotal', productsTotal)

			await getCartItemsLength()
			setTimeout(async () => {
				// if discount is in amount
				if (res?.data?.vendor_coupons?.free_shipping === 'N' && res?.data?.vendor_coupons?.type === 'amount' && res?.data?.vendor_coupons?.value > 0) {
					getCouponsType(index, 'amount')
					currentCoupon = await res?.data?.vendor_coupons?.value
					if (sellerType !== 'service-provider') {
						!(vendorTotalRef[index].innerText.substring(8).replaceAll(/\,/g, '') >= minimum_amount_for_free_shipping) && allVendors[index]?.getAttribute('data-free-shipping') == 'false' && (freeshippingText[index].style.display = 'none')

						allVendors[index]?.setAttribute('data-free-shipping', 'false')
					}
					setresMsgforPopup(`Coupon amount $${currentCoupon.toFixed(2)} applied.`)
				}

				// if discount is in amount and free shipping
				if (res?.data?.vendor_coupons?.free_shipping === 'Y' && res?.data?.vendor_coupons?.type === 'amount' && res?.data?.vendor_coupons?.value > 0) {
					getCouponsType(index, 'shipping-amount')

					currentCoupon = await res?.data?.vendor_coupons?.value

					allVendors[index]?.setAttribute('data-free-shipping', 'true')

					freeshippingText[index].style.display = 'inline-block'

					setresMsgforPopup(sellerType !== 'service-provider' ? `Free shipping activated for ${cartItemsData?.vendorProducts[index]?.name} and coupon amount $${currentCoupon.toFixed(2)} applied.` : `Coupon amount $${currentCoupon} applied.`)
				}

				// if discount is in percent
				if (res?.data?.vendor_coupons?.free_shipping === 'N' && res?.data?.vendor_coupons?.type === 'percent' && res?.data?.vendor_coupons?.value > 0) {
					getCouponsType(index, 'amount')

					currentCoupon =
						((res?.data?.vendor_coupons?.products_detail?.length > 0 && productsTotal > 0 ? productsTotal : sellerType !== 'service-provider' ? vendorTotalRef[index].innerText.substring(8).replaceAll(/\,/g, '') : vendorServiceTotalRef[index].innerText.substring(8).replaceAll(/\,/g, '')) *
							res?.data?.vendor_coupons?.value) /
						100

					if (sellerType !== 'service-provider') {
						!(vendorTotalRef[index].innerText.substring(8).replaceAll(/\,/g, '') >= minimum_amount_for_free_shipping) && allVendors[index]?.getAttribute('data-free-shipping') == 'false' && (freeshippingText[index].style.display = 'none')
						allVendors[index]?.setAttribute('data-free-shipping', 'false')
					}
					setresMsgforPopup(`Coupon amount $${currentCoupon.toFixed(2)} applied.`)
				}

				// if discount is in percent with free shipping
				if (res?.data?.vendor_coupons?.free_shipping === 'Y' && res?.data?.vendor_coupons?.type === 'percent' && res?.data?.vendor_coupons?.value > 0) {
					getCouponsType(index, 'shipping-amount')

					currentCoupon =
						((sellerType !== 'service-provider' ? (res?.data?.vendor_coupons?.products_detail?.length > 0 && productsTotal > 0 ? productsTotal : vendorTotalRef[index].innerText.substring(8).replaceAll(/\,/g, '')) : vendorServiceTotalRef[index].innerText.substring(8).replaceAll(/\,/g, '')) *
							res?.data?.vendor_coupons?.value) /
						100

					allVendors[index]?.setAttribute('data-free-shipping', 'true')

					console.log('allVendors[index]', allVendors[index]?.getAttribute('data-free-shipping'))

					freeshippingText[index].style.display = 'inline-block'

					setresMsgforPopup(`Free shipping activated for ${cartItemsData?.vendorProducts[index]?.name} and coupon amount $${currentCoupon.toFixed(2)} applied.`)
				}

				// if discount is free shipping
				if (res?.data?.vendor_coupons?.free_shipping === 'Y' && res?.data?.vendor_coupons?.value === 0) {
					getCouponsType(index, 'shipping')

					setresMsgforPopup(`Free shipping activated for ${cartItemsData?.vendorProducts[index]?.name}`)

					allVendors[index]?.setAttribute('data-free-shipping', 'true')

					freeshippingText[index].style.display = 'inline-block'
				}

				// discount/coupons calculation and couons array work
				let selectedVendorIndex = await couponsArray?.findIndex((vendor) => vendor?.vendorId === vendorId),
					newProductIds = res?.data?.vendor_coupons?.products_detail?.map((item) => product_ids?.includes(item?.id) && item)
				// newProductIds?.length > 0 && setcpnsBaseProductsIds((prev) => prev.concat(newProductIds?.map((item) => !prev?.includes(item?.id) && item?.id)?.filter((id) => id !== false)))

				newProductIds?.length > 0 && setcpnsBaseProductsIds(() => newProductIds?.map((item) => item?.id))
				productsBaseTotal = res?.data?.vendor_coupons?.products_detail?.length > 0 && productsTotal > 0 ? productsTotal : sellerType !== 'service-provider' ? vendorTotalRef[index].innerText.substring(8).replaceAll(/\,/g, '') : vendorServiceTotalRef[index].innerText.substring(8).replaceAll(/\,/g, '')

				if (productsBaseTotal - currentCoupon >= 0) {
					if (selectedVendorIndex !== -1) {
						let newData = await couponsArray?.filter((vendor) => vendor?.vendorId !== vendorId)

						await setcouponsArray(() => [
							...newData,
							{
								id: res?.data?.vendor_coupons?.id,
								vendorId: vendorId,
								amount: currentCoupon,
								type: res?.data?.vendor_coupons?.type,
								couponValue: res?.data?.vendor_coupons?.value,
								vendor_type: sellerType === 'service-provider' ? 'service' : 'product',
								free_shipping: res?.data?.vendor_coupons?.free_shipping,
								product_ids: newProductIds,
								secret_coupon: secret ? secret : false
							}
						])
						setcouponsArrayChanged(true)
					} else {
						await setcouponsArray((prev) => [
							...prev,
							{
								id: res?.data?.vendor_coupons?.id,
								vendorId: vendorId,
								amount: currentCoupon,
								type: res?.data?.vendor_coupons?.type,
								couponValue: res?.data?.vendor_coupons?.value,
								vendor_type: sellerType === 'service-provider' ? 'service' : 'product',
								free_shipping: res?.data?.vendor_coupons?.free_shipping,
								product_ids: newProductIds,
								secret_coupon: secret ? secret : false
							}
						])
						setcouponsArrayChanged(true)
						setpopupSuccess(true)
					}

					sellerType !== 'service-provider' ? setshowCpnList(false) : setshowServiceCpnList(false)
					setcpnSearchVal('')
					setnoCpnFound(false)
				} else {
					if (sellerType !== 'service-provider') {
						const allVendors = document.querySelectorAll('.vendor')
						couponInputRef[index].innerText = 'Select coupon'
						;[...couponsListRef[index].querySelectorAll('input')].forEach((input) => {
							input.checked = false
						})

						Array.from(allVendors)[index]?.setAttribute('data-free-shipping', 'false'), freeshippingText[index] && (freeshippingText[index].style.display = 'none')
					} else {
						;(serviceCouponInputRef[index].innerText = 'Select coupon'),
							[...serviceCouponsListRef[index].querySelectorAll('input')].forEach((input) => {
								input.checked = false
							})
					}
					setcpnsBaseProductsIds([])
					setpopupSuccess(false)
					setresMsgforPopup(`The coupon value of $${currentCoupon} exceeds the total of your selected products, which amounts to $${productsBaseTotal}. Just add more products worth at least $${currentCoupon - productsBaseTotal} from ${cartItemsData?.vendorProducts[index]?.name} to use this coupon.`)
				}
			}, 500)
		} else {
			let newData = await couponsArray?.filter((vendor) => vendor?.vendorId !== vendorId)
			setcouponsArray([...newData])
			setcouponsArrayChanged(true)
			setcpnsBaseProductsIds([])
			setresMsgforPopup(res?.data?.message)
			setpopupSuccess(false)
			if (sellerType !== 'service-provider') {
				const allVendors = document.querySelectorAll('.vendor')
				couponInputRef[index] &&
					((couponInputRef[index].innerText = 'Select coupon'),
					[...couponsListRef[index].querySelectorAll('input')].forEach((input) => {
						input.checked = false
					}))

				Array.from(allVendors)[index]?.setAttribute('data-free-shipping', 'false'), freeshippingText[index] && (freeshippingText[index].style.display = 'none')
			} else {
				serviceCouponInputRef[index] &&
					((serviceCouponInputRef[index].innerText = 'Select coupon'),
					[...serviceCouponsListRef[index].querySelectorAll('input')].forEach((input) => {
						input.checked = false
					}))
			}
		}
		setTimeout(() => {
			setcouponLoading(false)

			setshowresMsg(true)

			sethideTotal(false)
		}, 1000)

		setTimeout(() => {
			productsBaseTotal - currentCoupon >= 0 && setshowresMsg(false)
		}, 4000)
	}

	// product delete function
	const singleDeleteHandler = (product, index, vendorId, vendorAmountRef) => {
		setdeleteProductData({
			product,
			index,
			vendorId,
			vendorAmountRef,
			type: vendorAmountRef?.includes('service') ? 'service' : 'product'
		})
		setmodal(true)
		setalertType('delete')
		lockScroll()
	}

	// vendor delete function
	const deleteVendorHandler = async (id, index) => {
		lockScroll()
		setdeleteVendorData({
			vendorId: id,
			vendorIndex: index
		})
		setalertType('vendor-delete')
		setmodal(true)
	}

	// vendor or product toggle function
	const toggleVendorProductHandler = async (type, product, user_id, checked, index, vendorId, sellerType) => {
		// in case of vendor product will act as id
		lockScroll()
		sethideTotal(true)
		setqtyUpdating(true)
		let data
		if (type == 'product') {
			data = {
				type: type,
				product_id: product?.id,
				user_id
			}
		} else if (type == 'plan') {
			data = {
				type: type,
				plan_id: product?.id,
				user_id
			}
		} else {
			data = {
				type: type,
				vendor_id: product,
				user_id,
				check: checked
			}
		}

		const res = await axios.post(`${baseApiUrl}/toggle-product-check`, data)
		console.log('res from toggle', res, 'checked', checked, 'type', type)
		if (res?.data?.success) {
			await getCartItemsLength()

			if (type == 'product' && !checked) {
				console.log('from product not checked')

				let checkedBoxes = Array.from(allVendors[index].querySelectorAll('.product-checkbox input.checkbox'))?.filter((box) => {
					return box.getAttribute('data-checked') === 'true'
				})

				if (checkedBoxes.length - 1 === 0) {
					allVendors[index]?.setAttribute('data-free-shipping', 'false')
					freeshippingText[index] && (freeshippingText[index].style.display = 'none')

					if (couponInputRef[index]) {
						;(couponInputRef[index].innerText = 'Select coupon'),
							[...couponsListRef[index].querySelectorAll('input')].forEach((input) => {
								input.checked = false
							})
					}

					const newCpnsArray = couponsArray?.filter((arr) => arr?.vendorId !== vendorId)
					setcouponsArray(() => newCpnsArray)
				} else {
					// console.log('from product not checked else', id)

					couponsArray?.length > 0 && (await updateCouponData('.vendor-total', index, 0, vendorId, 'remove', product, 'products'))
				}
			}

			if (type == 'product' && checked) {
				const selectedVendor = vendorsDataChanged?.filter((vendor) => vendor === vendorId)

				if (type !== 'vendor' && selectedVendor.length === 0 && vendorId !== undefined) {
					setvendorsDataChanged((prev) => [...prev, vendorId])
				}

				// console.log('from product checked', id)

				couponsArray?.length > 0 && (await updateCouponData('.vendor-total', index, 0, vendorId, 'null', product, 'products'))
			}

			if (type == 'plan' && !checked) {
				console.log('from plan')
				// setTimeout(async () => {
				let checkedBoxes = Array.from(allServiceVendors[index].querySelectorAll('.product-checkbox input.checkbox'))?.filter((box) => {
					return box.getAttribute('data-checked') == 'true'
				})

				if (checkedBoxes.length == 0) {
					if (serviceCouponInputRef[index]) {
						;(serviceCouponInputRef[index].innerText = 'Select coupon'),
							[...serviceCouponsListRef[index].querySelectorAll('input')].forEach((input) => {
								input.checked = false
							})
					}
					setcouponsArray(() =>
						couponsArray?.filter((arr) => {
							console.log('array id', arr?.vendorId, 'vendordi', vendorId)
							return arr?.vendorId !== vendorId
						})
					)
				} else {
					couponsArray?.length > 0 && (await updateCouponData('.service-vendor-total', index, 0, vendorId, 'remove', product, 'service-provider'))
				}
				// }, 1000)
			}

			if (type == 'plan' && checked) {
				couponsArray?.length > 0 && (await updateCouponData('.service-vendor-total', index, 300, vendorId, 'null', product, 'service-provider'))
			}

			if (type == 'vendor' && !checked) {
				console.log('from vendor', 'vendor type', sellerType)

				setTimeout(() => {
					if (sellerType === 'service-provider') {
						console.log('from coupon func')
						if (serviceCouponInputRef[index]) serviceCouponInputRef[index].innerText = 'Select coupon'

						setcouponsArray(() => couponsArray?.filter((arr) => arr?.vendorId !== vendorId)),
							[...serviceCouponsListRef[index].querySelectorAll('input')].forEach((input) => {
								input.checked = false
							})
					} else if (couponInputRef[index]) {
						allVendors[index]?.setAttribute('data-free-shipping', 'false')
						freeshippingText[index] && (freeshippingText[index].style.display = 'none')

						if (couponInputRef[index]) couponInputRef[index].innerText = 'Select coupon'
						setcouponsArray(() => couponsArray?.filter((arr) => arr?.vendorId !== vendorId)),
							[...couponsListRef[index].querySelectorAll('input')].forEach((input) => {
								input.checked = false
							})
					}
				}, 300)
			}

			if (type !== 'plan' || sellerType !== 'service-provider') {
				const selectAllItems = document.querySelector('.select-all-items'),
					allProducts = document.querySelectorAll('.item-wrapper'),
					productsChecked = [...allProducts].filter((item) => item.querySelector('.product-checkbox input').checked)

				if (productsChecked?.length === 0 || productsChecked?.length < allProducts?.length) {
					selectAllItems.querySelector('input').checked = false
				}

				if (productsChecked?.length === allProducts?.length) {
					selectAllItems.querySelector('input').checked = true
				}

				resetMinOrderAnimation(false)
			}
		}

		setqtyUpdating(false)
		setpopupSuccess(res?.data?.success ? true : false)
		setresMsgforPopup(res?.data?.message)
		setshowresMsg(true)
		unlockScroll()
		setTimeout(
			() => {
				sethideTotal(false)
			},
			!checked ? 1000 : 0
		)
		setTimeout(() => {
			setshowresMsg(false)
		}, 3000)
	}

	// close dropdown if clicked elsewhere
	if (typeof window !== 'undefined') {
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()

			const allVendorsCouponsMenu = Array.from(document.querySelectorAll('.coupons-list')),
				allServiceProviderCouponsMenu = Array.from(document.querySelectorAll('.service-coupons-list'))

			if (showCpnList === true) {
				const clickedIndex = allVendorsCouponsMenu?.findIndex((menu, i) => menu.getAttribute('data-menu') === 'true')

				if (allVendorsCouponsMenu[clickedIndex] !== undefined && !allVendorsCouponsMenu[clickedIndex].contains(e.target)) {
					setshowCpnList(false)
					setTimeout(() => {
						setcpnSearchVal(''), setnoCpnFound(false)
					}, 400)
				}
			} else if (showServiceCpnList === true) {
				const clickedIndex = allServiceProviderCouponsMenu?.findIndex((menu, i) => menu.getAttribute('data-menu') === 'true')

				if (allServiceProviderCouponsMenu[clickedIndex] !== undefined && !allServiceProviderCouponsMenu[clickedIndex].contains(e.target)) {
					setshowServiceCpnList(false)
					setTimeout(() => {
						setcpnSearchVal(''), setnoCpnFound(false)
					}, 400)
				}
			} else return
		})
	}

	// coupon search handler
	const couponSearchHanlder = (val, vendor_coupons) => {
		const searchData = vendor_coupons?.filter((cpn) => cpn?.coupon?.toLowerCase().includes(val.toLowerCase()))
		if (searchData?.length > 0) {
			setnoCpnFound(false)
		} else setnoCpnFound(true)
	}

	const couponRemoveHandler = (vendorId, index, sellerType) => {
		console.log('clickd')
		const newData = couponsArray?.filter((cpn) => cpn?.vendorId !== vendorId)
		setcouponsArray(newData)
		setcouponsArrayChanged(true)

		if (sellerType === 'service-provider') {
			serviceCouponInputRef[index] && (serviceCouponInputRef[index].innerText = 'Select coupon')
		} else {
			couponInputRef[index] && (couponInputRef[index].innerText = 'Select coupon')
		}
	}

	return (
		cartItemsData !== undefined && (
			<div className={`${styles.cart_wrapper}`}>
				{/* products */}
				{cartItemsData?.vendorProducts?.length > 0 && (
					<div style={{ position: 'relative', zIndex: `${showCpnList ? 3 : 1}` }}>
						<h5 className={`gray-border ${styles.type_title}`}>Products</h5>
						{cartItemsData?.vendorProducts?.map((vendor, i) => {
							const { checked, id, name, products, vendor_coupons, minimum_amount_for_free_shipping, minimum_order_amount, slug } = vendor

							let vendorTotalArr = products.map((item) => {
								const { price, price_discounted, price_discounted_end, cart_items } = item

								return cart_items?.checked == 'Y' && (price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? price_discounted : price) * cart_items?.quantity
							})

							let newVendorTotalArr = vendorTotalArr?.length > 0 ? [].concat(...vendorTotalArr) : []

							let vendorTotal = 0

							for (let i = 0; i < newVendorTotalArr.length; i++) {
								vendorTotal += newVendorTotalArr[i]
							}

							let minOrderPercentage = (vendorTotal / minimum_amount_for_free_shipping) * 100

							allVendors = document.querySelectorAll('.vendor')
							allCheckboxContainers = document.querySelectorAll('.all-rates-container')

							const itemsChecked = vendor?.products?.filter((item) => item?.cart_items?.checked === 'Y')
							const couponAvailed = couponsArray?.find((cpn) => cpn?.vendorId === id && cpn.secret_coupon)

							return (
								products?.length > 0 && (
									<div ref={(el) => (vendorRef[i] = el)} key={id} className={`${styles.vendor_container} white-bg gray-border vendor transition`} data-free-shipping='false'>
										<div className={styles.vendor_detail}>
											<div className={styles.vendor_name_container}>
												<div className={styles.vendor_name_wrapper}>
													{/* <h5>{name}</h5> */}
													<CustomCheckbox checked={checked} className={`${styles.vendor_check} vendor-checkbox`} type='checkbox' labeltitle={name} name={name} value={id} onChange={(e) => !updatingCartDataOnFocus && toggleVendorProductHandler('vendor', id, loginUser?.id, e.target.checked, i, id)} />
													<Link href={`/vendors/${slug}`}>
														<a>{name}</a>
													</Link>
													<svg onClick={() => readyForCheckout && !updatingCartDataOnFocus && deleteVendorHandler(id, i)} disabled={readyForCheckout} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
														/>
													</svg>
												</div>

												{minimum_order_amount !== null && (
													<div
														className={`${styles.min_order_amount} min-order-amount transition`}
														style={{ backgroundColor: vendorTotal >= minimum_order_amount ? 'var(--new-lite-pink)' : 'var(--lite-red)', color: vendorTotal >= minimum_order_amount ? 'var(--primary)' : 'var(--red)', textDecoration: vendorTotal >= minimum_order_amount ? 'line-through' : undefined }}
													>
														Minimum order amount {currencyFormat(minimum_order_amount)}
													</div>
												)}
											</div>
											<div className={`coupon-time-wrapper ${styles.coupon_time_wrapper}`}>
												{vendor_coupons?.length > 0 ? (
													<div className={styles.coupon_inner_wrapper}>
														<div className='primary-color semibold-text'>Discount Coupons</div>
														<div className={`${styles.select_item_cpn} gray-color`}>Select at-least one item to apply coupon</div>

														<div className={styles.coupons_inner_wrapper}>
															<div
																className={`${styles.select_coupon} ${itemsChecked?.length === 0 ? styles.checked : undefined} gray-color ${styles.border_animation}`}
																onClick={() => {
																	itemsChecked?.length > 0 && (setclickedVendor(i), setshowCpnList(true))
																}}
															>
																<div className={`select-coupon-text gray-color ${styles.coupon_text}`}>
																	<span ref={(el) => (couponInputRef[i] = el)}>Select coupon</span>
																	<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='var(--gray-icon)' className='w-6 h-6'>
																		<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
																	</svg>
																</div>
															</div>

															<div data-menu={clickedVendor === i ? 'true' : 'false'} ref={(el) => (couponsListRef[i] = el)} className={`${styles.coupons_list} coupons-list shadow radius transition ${showCpnList && clickedVendor === i && styles.show_all_methods}`}>
																<div>Available coupons</div>
																<div className={styles.cpn_input_btn}>
																	<div className={`${styles.cpn_input_wrapper} gray-border`}>
																		<input type='search' value={cpnSearchVal} placeholder='Search with coupon code' onChange={(e) => (setcpnSearchVal(e.target.value), couponSearchHanlder(e.target.value, vendor_coupons))} />
																		<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className='w-6 h-6'>
																			<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
																		</svg>
																	</div>
																	{noCpnFound && clickedVendor === i && (
																		<button onClick={() => getVendorCouponHandler(id, i, cpnSearchVal, cpnSearchVal, 'vendor', minimum_amount_for_free_shipping, products, true)} className='sml-btn primary-btn'>
																			Apply
																		</button>
																	)}
																</div>
																{vendor_coupons
																	?.filter((cpn) => {
																		if (cpnSearchVal === '') {
																			return cpn
																		} else if (cpn?.coupon.toLowerCase().includes(cpnSearchVal.toLowerCase())) {
																			return cpn
																		}
																	})
																	?.map((coupon) => {
																		return (
																			<div key={coupon?.id}>
																				<CustomCheckbox
																					type='radio'
																					className={styles.cpn_input}
																					name={name}
																					value={coupon?.coupon}
																					labeltitle={coupon?.name}
																					onChange={(e) => (
																						clickedVendor === i && !updatingCartDataOnFocus && getVendorCouponHandler(id, i, coupon?.name, e.target.value, 'vendor', minimum_amount_for_free_shipping, products),
																						setshowCpnList(false),
																						setTimeout(() => {
																							setcpnSearchVal('')
																						}, 400)
																					)}
																				/>
																				{coupon?.date_to !== null && coupon?.date_to !== undefined && <div className={`black-color ${styles.cpn_expiry}`}>Valid upto: {coupon?.date_to}</div>}
																			</div>
																		)
																	})}
															</div>
														</div>

														{couponAvailed !== undefined && (
															<div className={`lite-pink-bg primary-color ${styles.cpn_applied}`}>
																{couponAvailed?.free_shipping === 'Y' && 'Free shipping + '} {currencyFormat(couponAvailed?.amount)} coupon applied.{' '}
																<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='var(--white)' className='primary-bg full-radius transition' onClick={() => couponRemoveHandler(id, i, 'vendor')}>
																	<path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
																</svg>
															</div>
														)}
													</div>
												) : (
													<div className={styles.coupon_inner_wrapper}>
														<div className='primary-color semibold-text'>Discount Coupons</div>
														<div className={`${styles.select_item_cpn} gray-color`}>Select at-least one item to apply coupon</div>
														<div className={styles.cpn_input_btn}>
															<input className={`${styles.cpn_input_wrapper} gray-border`} type='search' value={cpnSearchVal} placeholder='Enter coupon code' onChange={(e) => (setcpnSearchVal(e.target.value), couponSearchHanlder(e.target.value, vendor_coupons))} />

															{itemsChecked?.length > 0 && (
																<button onClick={() => cpnSearchVal?.length > 0 && itemsChecked?.length > 0 && getVendorCouponHandler(id, i, cpnSearchVal, cpnSearchVal, 'vendor', minimum_amount_for_free_shipping, products, true)} className='sml-btn primary-btn'>
																	Apply
																</button>
															)}
														</div>

														{couponAvailed !== undefined && (
															<div className={`lite-pink-bg primary-color ${styles.cpn_applied}`}>
																{couponAvailed?.free_shipping === 'Y' && 'Free shipping + '} {currencyFormat(couponAvailed?.amount)} coupon applied.{' '}
																<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='var(--white)' className='primary-bg full-radius transition' onClick={() => couponRemoveHandler(id, i, 'vendor')}>
																	<path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
																</svg>
															</div>
														)}
													</div>
												)}

												<div className={styles.shipping_container}>
													<div className={styles.time_wrapper} style={{ marginTop: vendor_coupons?.length == 0 ? '1.25rem' : undefined }}>
														<div className={`${styles.shipping_title} primary-color`}>
															{itemsChecked?.length > 0 && (
																<div
																	ref={(el) => (freeshippingText[i] = el)}
																	className={`${styles.free_shipping_text_wrapper} free-shipping-text-wrapper`}
																	style={{
																		display: (minimum_amount_for_free_shipping !== null && vendorTotal >= minimum_amount_for_free_shipping) || allVendors[i]?.getAttribute('data-free-shipping') == 'true' ? 'inline-block' : 'none'
																	}}
																>
																	<Message className={styles.free_shipping_text} formSuccess={true} resMsg={`Free shipping applied`} />
																</div>
															)}
														</div>

														{minimum_amount_for_free_shipping !== null && (
															<>
																<MinOrderFreeShipping className={styles.min_free_ship} amount={currencyFormat(minimum_amount_for_free_shipping)} />
																<div className={styles.free_shipping_bar_wrapper}>
																	{minOrderPercentage < 100 && <div className={styles.min_order_p_text}>Add more products to get free shipping</div>}
																	<div className={`${styles.free_shipping_bar}`} style={{ textAlign: minOrderPercentage <= 50 ? 'right' : undefined, color: minOrderPercentage <= 50 ? 'var(--lite-black)' : 'var(--white)' }}>
																		{minOrderPercentage <= 50 && `${minOrderPercentage.toFixed(2)}%`}
																		<div
																			className={`${styles.inner_free_shipping_bar} transition white-color`}
																			style={{ width: `${minOrderPercentage >= 100 ? '100' : minOrderPercentage.toFixed(0)}%`, backgroundColor: minOrderPercentage >= 100 ? 'var(--green)' : 'var(--primary)', textAlign: minOrderPercentage > 50 ? 'center' : undefined }}
																		>
																			{minOrderPercentage > 50 && (minOrderPercentage >= 100 ? '100%' : `${minOrderPercentage.toFixed(2)}%`)}
																		</div>
																	</div>
																</div>
															</>
														)}
													</div>
												</div>
											</div>
											{products?.map((item, index) => {
												const { image, price_catalog, price, price_discounted, price_discounted_end, sku, cart_items, slug, parent_slug, max_quantity_threshold, max_available_quantity, minimum_order } = item

												const { checked, quantity, customer_id, product_id } = cart_items

												let maxQtyThreshHold = max_quantity_threshold !== null ? max_quantity_threshold : max_available_quantity

												return (
													<div key={item?.id} className={`${styles.item_wrapper} item-wrapper`} data-product-checked={checked == 'Y' ? 'true' : 'false'}>
														<div className={styles.item_inner_wrapper}>
															<div className={styles.img_container}>
																<CustomCheckbox
																	data-checked={checked == 'Y' ? 'true' : 'false'}
																	checked={checked == 'Y' ? true : false}
																	pageType='cart-page'
																	className={`${styles.item_check} product-checkbox`}
																	type='checkbox'
																	name={item?.name}
																	value={item?.id}
																	onChange={(e) => !updatingCartDataOnFocus && toggleVendorProductHandler('product', item, customer_id, e.target.checked, i, id)}
																/>
																<Link href={`/${item?.parent_id === 0 ? slug : parent_slug}`}>
																	<a className={`${styles.img_wrapper} gray-border radius`}>
																		<ImgWithLoader loaderType='sml' width={125} height={125} src={image !== null ? `${imgApiUrl.products.thumbnail}/${image}` : placeholderImg} alt={name} />
																	</a>
																</Link>
															</div>
															<div className={styles.course_details}>
																<div>
																	<Link href={`/${item?.parent_id === 0 ? slug : parent_slug}`}>
																		<a>
																			<h5>{item?.name}</h5>
																			<div className={`${styles.sku} gray-color`}>SKU: {sku}</div>
																		</a>
																	</Link>

																	{quantity >= maxQtyThreshHold && (
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
																			resMsg={`Allowed quantity is ${maxQtyThreshHold}.`}
																		/>
																	)}
																	<div className={styles.qty_container}>
																		<div className={`${styles.qty_inner_wrapper} radius transition`}>
																			{/* minus icon */}
																			<svg
																				// disabled={checked !== 'Y' ? true : false}
																				className={!(minimum_order === null || (minimum_order > 0 && cart_items?.quantity > minimum_order)) ? 'no-cursor' : undefined}
																				onClick={() => (minimum_order === null || (minimum_order > 0 && cart_items?.quantity > minimum_order)) && !updatingCartDataOnFocus && qtyChangeHandler(item, id, quantity, index, 'deletion', i, minimum_amount_for_free_shipping)}
																				xmlns='http://www.w3.org/2000/svg'
																				fill='none'
																				viewBox='0 0 24 24'
																				strokeWidth={1.5}
																				stroke='var(--gray-icon)'
																			>
																				<path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
																			</svg>

																			<span className='semibold-text primary-color'>{quantity}</span>

																			{/* plus icon */}
																			<svg
																				disabled={quantity >= maxQtyThreshHold}
																				onClick={() => !(quantity >= maxQtyThreshHold) && !updatingCartDataOnFocus && qtyChangeHandler(item, id, quantity, index, 'addition', i, minimum_amount_for_free_shipping, vendorTotal)}
																				xmlns='http://www.w3.org/2000/svg'
																				fill='none'
																				viewBox='0 0 24 24'
																				strokeWidth={1.5}
																				stroke='var(--gray-icon)'
																			>
																				<path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
																			</svg>
																		</div>
																		{price !== null && price_catalog !== null && (
																			<div className={styles.product_total_wrapper}>
																				<div className={`${styles.total_text} semibold-text`}>Total: </div>
																				{price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? (
																					<div className={styles.product_total}>
																						<div className={`${styles.disc_price} primary-color semibold-text`}>{currencyFormat(quantity * price_discounted)}</div>
																						<div className={`${styles.original_price} red-color`}>{currencyFormat(quantity * price_catalog)}</div>
																					</div>
																				) : price !== price_catalog ? (
																					<div className={styles.product_total}>
																						<div className={`${styles.disc_price} primary-color semibold-text`}>{currencyFormat(quantity * price)}</div>
																						<div className={`${styles.original_price} red-color`}>{currencyFormat(quantity * price_catalog)}</div>
																					</div>
																				) : (
																					<div className={`${styles.price} semibold-text`}>{currencyFormat(quantity * price)}</div>
																				)}
																			</div>
																		)}
																	</div>
																</div>
																<div className={styles.price_icons_wrapper}>
																	{price !== null && price_catalog !== null && (
																		<div className={styles.price_wrapper}>
																			{price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? (
																				<div className={styles.inner_wrapper}>
																					<div className={`${styles.disc_price} primary-color semibold-text`}>{currencyFormat(price_discounted)}</div>
																					<div className={`${styles.original_price} red-color`}>{currencyFormat(price_catalog)}</div>
																					<div className={`${styles.disc} gray-color`}>{(100 - (Number(price_discounted) / Number(price_catalog)) * 100).toFixed(0)}% Off</div>
																				</div>
																			) : price !== price_catalog ? (
																				<div className={styles.inner_wrapper}>
																					<div className={`${styles.disc_price} primary-color semibold-text`}>{currencyFormat(price)}</div>
																					<div className={`${styles.original_price} red-color`}>{currencyFormat(price_catalog)}</div>
																					<div className={`${styles.disc} gray-color`}>{(100 - (Number(price) / Number(price_catalog)) * 100).toFixed(0)}% Off</div>
																				</div>
																			) : (
																				<div className={`${styles.price} semibold-text`}>{currencyFormat(price)}</div>
																			)}
																		</div>
																	)}
																	<div className={styles.icons_wrapper}>
																		{/* delete icon */}
																		<div className={`${styles.icon_wrapper} gray-border`} onClick={async () => readyForCheckout && !updatingCartDataOnFocus && singleDeleteHandler(item, i, id, '.vendor-total')} disabled={readyForCheckout}>
																			<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className={styles.delete_icon}>
																				<path
																					strokeLinecap='round'
																					strokeLinejoin='round'
																					d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
																				/>
																			</svg>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												)
											})}
											<div className={`${styles.vendor_total_wrapper} semibold-text`}>
												<div ref={(el) => (vendorTotalRef[i] = el)} className={`${styles.vendor_total} vendor-total`}>
													Total: <span>{currencyFormat(vendorTotal)}</span>
												</div>
											</div>
										</div>
									</div>
								)
							)
						})}
					</div>
				)}

				{/* services */}
				{cartItemsData?.vendorServices?.length > 0 && (
					<>
						<h5 className={`gray-border ${styles.type_title}`}>Services</h5>
						{cartItemsData?.vendorServices?.map((service, i) => {
							const { id, name, plans, vendor_coupons, checked, slug } = service

							let vendorServiceTotalArr = plans?.map((plan) => {
								const { fee, additional_fee, equipment_fee, cart_items } = plan
								return cart_items?.checked == 'Y' && (additional_fee !== null ? 1 : cart_items?.number_of_license) * fee + (additional_fee !== null ? (cart_items?.number_of_license - 1) * additional_fee : 0) + (equipment_fee !== null ? equipment_fee * cart_items?.number_of_license : 0)
							})

							let newVendorServiceTotalArr = vendorServiceTotalArr?.length > 0 ? [].concat(...vendorServiceTotalArr) : []

							let vendorServiceTotal = 0

							for (let i = 0; i < newVendorServiceTotalArr.length; i++) {
								vendorServiceTotal += newVendorServiceTotalArr[i]
							}

							allServiceVendors = document.querySelectorAll('.service-vendor')

							const itemsChecked = plans?.filter((plan) => plan?.cart_items?.checked === 'Y')

							const couponAvailed = couponsArray?.find((cpn) => cpn?.vendorId === id && cpn.secret_coupon)

							return (
								<div ref={(el) => (vendorServiceRef[i] = el)} key={id} className={`${styles.vendor_container} white-bg gray-border service-vendor transition`}>
									<div className={styles.vendor_detail}>
										<div className={styles.vendor_name_container}>
											<div className={styles.vendor_name_wrapper}>
												{/* <h5>{name}</h5> */}
												<CustomCheckbox
													checked={checked}
													className={`${styles.vendor_check} vendor-checkbox`}
													type='checkbox'
													labeltitle={name}
													name={name}
													value={id}
													onChange={(e) => !updatingCartDataOnFocus && toggleVendorProductHandler('vendor', id, loginUser?.id, e.target.checked, i, id, 'service-provider')}
												/>

												<Link href={`/service-providers/${slug}`}>
													<a>{name}</a>
												</Link>

												<svg onClick={() => readyForCheckout && !updatingCartDataOnFocus && deleteVendorHandler(id, i)} disabled={readyForCheckout} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
													/>
												</svg>
											</div>
										</div>
										<div className={`coupon-time-wrapper ${styles.coupon_time_wrapper}`}>
											{vendor_coupons?.length > 0 ? (
												<div className={styles.coupon_inner_wrapper}>
													<div className='primary-color semibold-text'>Discount Coupons</div>

													<div className={styles.coupons_inner_wrapper}>
														<div
															className={`${styles.select_coupon} ${itemsChecked?.length === 0 ? styles.checked : undefined} gray-color ${styles.border_animation}`}
															onClick={() => {
																itemsChecked?.length > 0 && !updatingCartDataOnFocus && (setclickedVendor(i), setshowServiceCpnList(true))
															}}
														>
															<div className={`select-coupon-text gray-color ${styles.coupon_text}`}>
																<span ref={(el) => (serviceCouponInputRef[i] = el)}>Select coupon</span>
																<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='var(--gray-icon)' className='w-6 h-6'>
																	<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
																</svg>
															</div>
														</div>
														<div data-menu={clickedVendor === i ? 'true' : 'false'} ref={(el) => (serviceCouponsListRef[i] = el)} className={`${styles.coupons_list} service-coupons-list shadow radius transition ${showServiceCpnList && clickedVendor === i && styles.show_all_methods}`}>
															<div>Available coupons</div>
															<div className={styles.cpn_input_btn}>
																<div className={`${styles.cpn_input_wrapper} gray-border`}>
																	<input type='search' value={cpnSearchVal} placeholder='Search with coupon code' onChange={(e) => (setcpnSearchVal(e.target.value), couponSearchHanlder(e.target.value, vendor_coupons))} />
																	<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className='w-6 h-6'>
																		<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
																	</svg>
																</div>
																{noCpnFound && clickedVendor === i && (
																	<button onClick={() => getVendorCouponHandler(id, i, cpnSearchVal, cpnSearchVal, 'service-provider', 9999999999999, plans, true)} className='sml-btn primary-btn'>
																		Apply
																	</button>
																)}
															</div>
															{vendor_coupons
																?.filter((cpn) => {
																	if (cpnSearchVal === '') {
																		return cpn
																	} else if (cpn?.coupon.toLowerCase().includes(cpnSearchVal.toLowerCase())) {
																		return cpn
																	}
																})
																?.map((coupon) => {
																	return (
																		<div key={coupon?.id}>
																			<CustomCheckbox
																				type='radio'
																				className={styles.cpn_input}
																				name={name}
																				value={coupon?.coupon}
																				labeltitle={coupon?.name}
																				onChange={(e) => (
																					clickedVendor === i && !updatingCartDataOnFocus && getVendorCouponHandler(id, i, coupon?.name, e.target.value, 'service-provider', 9999999999999, plans),
																					setshowServiceCpnList(false),
																					setTimeout(() => {
																						setcpnSearchVal('')
																					}, 400)
																				)}
																			/>
																			{coupon?.date_to !== null && coupon?.date_to !== undefined && <div className={`black-color ${styles.cpn_expiry}`}>Valid upto: {coupon?.date_to}</div>}
																		</div>
																	)
																})}
														</div>
													</div>
													{couponAvailed !== undefined && (
														<div className={`lite-pink-bg primary-color ${styles.cpn_applied}`}>
															{couponAvailed?.free_shipping === 'Y' && 'Free shipping + '} {currencyFormat(couponAvailed?.amount)} coupon applied.{' '}
															<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='var(--white)' className='primary-bg full-radius transition' onClick={() => couponRemoveHandler(id, i, 'service-provider')}>
																<path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
															</svg>
														</div>
													)}
												</div>
											) : (
												<div className={styles.coupon_inner_wrapper}>
													<div className='primary-color semibold-text'>Discount Coupons</div>
													<div className={`${styles.select_item_cpn} gray-color`}>Select at-least one item to apply coupon</div>
													<div className={styles.cpn_input_btn}>
														<input className={`${styles.cpn_input_wrapper} gray-border`} type='search' value={cpnSearchVal} placeholder='Enter coupon code' onChange={(e) => (setcpnSearchVal(e.target.value), couponSearchHanlder(e.target.value, vendor_coupons))} />

														{itemsChecked?.length > 0 && (
															<button onClick={() => cpnSearchVal?.length > 0 && itemsChecked?.length > 0 && getVendorCouponHandler(id, i, cpnSearchVal, cpnSearchVal, 'service-provider', 9999999999999, plans, true)} className='sml-btn primary-btn'>
																Apply
															</button>
														)}
													</div>

													{couponAvailed !== undefined && (
														<div className={`lite-pink-bg primary-color ${styles.cpn_applied}`}>
															{couponAvailed?.free_shipping === 'Y' && 'Free shipping + '} {currencyFormat(couponAvailed?.amount)} coupon applied.{' '}
															<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='var(--white)' className='primary-bg full-radius transition' onClick={() => couponRemoveHandler(id, i, 'vendor')}>
																<path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
															</svg>
														</div>
													)}
												</div>
											)}
										</div>
										{plans?.map((plan, index) => {
											const { id, additional_fee, equipment_fee, cart_items, fee, name, type, service, vendor_id } = plan

											const { checked, number_of_license, customer_id, service_id } = cart_items

											return (
												<div key={id} className={`${styles.item_wrapper} item-wrapper`} data-product-checked={checked == 'Y' ? 'true' : 'false'}>
													<div className={styles.item_inner_wrapper}>
														<div className={styles.img_container}>
															<CustomCheckbox
																data-checked={checked == 'Y' ? 'true' : 'false'}
																checked={checked == 'Y' ? true : false}
																pageType='cart-page'
																className={`${styles.item_check} product-checkbox`}
																type='checkbox'
																name={name}
																value={id}
																onChange={(e) => !updatingCartDataOnFocus && toggleVendorProductHandler('plan', plan, customer_id, e.target.checked, i, vendor_id, 'service-provider')}
															/>
															<Link href={`/${service?.slug}`}>
																<a className={`${styles.img_wrapper} gray-border radius`}>
																	<Image width={125} height={125} src={service?.image !== null ? `${imgApiUrl.vendor.services}/${service?.image}` : placeholderImg} alt={name} />
																</a>
															</Link>
														</div>
														<div className={styles.course_details}>
															<div>
																<Link href={`/${service?.slug}`}>
																	<a>
																		<h5>{name}</h5>
																		<div className={`${styles.sku} gray-color`}>
																			Payment:{' '}
																			<span className='primary-color semibold-text' style={{ textTransform: 'capitalize' }}>
																				{type}
																			</span>
																		</div>
																		{equipment_fee !== null && (
																			<div className={`${styles.sku} gray-color`}>
																				Equipment fee:{' '}
																				<span className='primary-color semibold-text'>
																					{number_of_license} x {equipment_fee}
																				</span>
																			</div>
																		)}

																		<div className={`${styles.sku} gray-color`}>
																			License fee:{' '}
																			<span className='primary-color semibold-text'>
																				{additional_fee !== null ? '1' : number_of_license} x {fee}
																			</span>
																		</div>

																		{number_of_license > 1 && additional_fee !== null && (
																			<div className={`${styles.sku} gray-color`}>
																				Additional license fee:{' '}
																				<span className='primary-color semibold-text'>
																					{number_of_license - 1} x {additional_fee}
																				</span>
																			</div>
																		)}

																		<div className={`${styles.sku} black-color  semibold-text`}>
																			Total: <span className='primary-color'>{currencyFormat((additional_fee !== null ? 1 : number_of_license) * fee + (additional_fee !== null ? (number_of_license - 1) * additional_fee : 0) + (equipment_fee !== null ? number_of_license * equipment_fee : 0))}</span>
																		</div>
																	</a>
																</Link>

																<div className={styles.qty_container}>
																	<div className={`${styles.qty_inner_wrapper} radius transition`}>
																		{/* minus icon */}
																		<svg
																			onClick={() => !updatingCartDataOnFocus && qtyChangeHandler(plan, vendor_id, number_of_license, index, 'deletion', i, 'service-provider-seller', service_id)}
																			xmlns='http://www.w3.org/2000/svg'
																			fill='none'
																			viewBox='0 0 24 24'
																			strokeWidth={1.5}
																			stroke='var(--gray-icon)'
																		>
																			<path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
																		</svg>

																		<span className='semibold-text primary-color'>{number_of_license}</span>

																		{/* plus icon */}
																		<svg
																			onClick={() => !updatingCartDataOnFocus && qtyChangeHandler(plan, vendor_id, number_of_license, index, 'addition', i, 'service-provider-seller', service_id)}
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
															</div>
															<div className={styles.price_icons_wrapper}>
																<div className={styles.price_wrapper}>
																	<div className={`${styles.price} semibold-text`}>{currencyFormat(fee)}</div>
																</div>

																<div className={styles.icons_wrapper}>
																	{/* delete icon */}
																	<div className={`${styles.icon_wrapper} gray-border`} onClick={async () => readyForCheckout && !updatingCartDataOnFocus && singleDeleteHandler(plan, i, vendor_id, '.service-vendor-total')} disabled={readyForCheckout}>
																		<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className={styles.delete_icon}>
																			<path
																				strokeLinecap='round'
																				strokeLinejoin='round'
																				d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
																			/>
																		</svg>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											)
										})}
										<div className={`${styles.vendor_total_wrapper} semibold-text`}>
											<div ref={(el) => (vendorServiceTotalRef[i] = el)} className={`${styles.vendor_total} service-vendor-total`}>
												Total: <span>{currencyFormat(vendorServiceTotal)}</span>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</>
				)}
			</div>
		)
	)
}

export default CartItems

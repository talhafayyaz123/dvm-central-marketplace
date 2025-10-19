import { useRouter } from 'next/router'
import React from 'react'
import styles from './AddAddressModal.module.css'
import { unlockScroll } from '../../../../utils/scrollLock'
import Link from 'next/link'
import axios from 'axios'
import { baseApiUrl } from '../../../../utils/config'

const AddAddressModal = ({
	data,
	setmodal,
	alertType,
	getCartItemsLength,
	setselectDeleteLoading,
	deleteProductData,
	deleteVendorData,
	deleteItemHandler,
	couponsArray,
	setcouponsArray,
	// allShippingMethods,
	// vendorShippingServiceName,
	// vendorShippingServiceRate,
	// vendorShippingArrayChangeHandler,
	cartItemsData,
	// vendorTotalRef,
	// setcouponsArrayChanged,
	updateCouponData,
	freeshippingText,
	couponInputRef,
	couponsListRef,
	serviceCouponInputRef,
	serviceCouponsListRef,
	sethideTotal,
	setcpnsBaseProductsIds
}) => {
	const { push } = useRouter()

	const resetCouponsFields = () => {
		const allVendors = document.querySelectorAll('.vendor'),
			allServiceVendors = document.querySelectorAll('.service-vendor')
		let checkedBoxes = Array.from(allVendors)?.filter((vendor) => vendor?.querySelector('.product-checkbox input.checkbox')?.getAttribute('data-checked') == 'true')

		// console.log('checkedBoxes from delete', checkedBoxes)
		let planscheckedBoxes = Array.from(allServiceVendors)?.filter((plan) => plan?.querySelector('.product-checkbox input.checkbox')?.getAttribute('data-checked') == 'true')

		if (checkedBoxes?.length == 0) {
			Array.from(allVendors)?.forEach((vendor, index) => {
				if (couponInputRef[index]) {
					;(couponInputRef[index].innerText = 'Select coupon'),
						[...couponsListRef[index].querySelectorAll('input')].forEach((input) => {
							input.checked = false
						})
				}
				vendor?.setAttribute('data-free-shipping', 'false'), freeshippingText[index] && (freeshippingText[index].style.display = 'none')
			})
		}
		if (planscheckedBoxes?.length == 0) {
			Array.from(allServiceVendors)?.forEach((vendor, index) => {
				if (serviceCouponInputRef[index]) {
					;(serviceCouponInputRef[index].innerText = 'Select coupon'),
						[...serviceCouponsListRef[index].querySelectorAll('input')].forEach((input) => {
							input.checked = false
						})
				}
			})
		}
	}

	const routingtoAddressPageHandler = () => {
		unlockScroll()
		push(`dashboard/delivery-address`)
		setmodal(false)
	}

	// delete funcs
	const deleteConfirmHandler = async () => {
		console.log('alert type', alertType, 'delete data', deleteProductData)

		setmodal(false)
		setselectDeleteLoading(true)
		sethideTotal(true)

		if (alertType === 'delete-checked') {
			const reqData = {
				type: 'delete',
				customer_id: data
			}

			const res = await axios.post(`${baseApiUrl}/delete-and-select-products`, reqData)
			console.log('res from delete', res)

			if (res?.data?.success) {
				await getCartItemsLength()

				setcouponsArray([])
				setcpnsBaseProductsIds([])

				setTimeout(() => {
					resetCouponsFields()
				}, 1000)
			}
		} else if (alertType === 'delete') {
			const { product, index, vendorId, vendorAmountRef, type } = deleteProductData
			const res = await deleteItemHandler(product?.cart_items?.id)

			if (res?.data?.success) {
				if (type === 'product') {
					const vendor = cartItemsData?.vendorProducts[index]
					if (vendor?.checked && vendor?.products.filter((product) => product?.cart_items?.checked == 'Y').length == 1 && vendor?.products.filter((item) => item?.cart_items?.id == product?.cart_items?.id).length == 1 && couponsArray?.length > 0) {
						const couponAppliedVendor = couponsArray?.find((coupon) => coupon?.vendorId === vendor?.id)

						const newCpnsArray = couponsArray?.filter((coupon) => coupon?.vendorId !== vendor?.id)
						couponAppliedVendor !== undefined && setcouponsArray(() => newCpnsArray)

						resetCouponsFields()
					} else updateCouponData(vendorAmountRef, index, 0, vendorId, 'remove', product, 'products')
				} else {
					const vendor = cartItemsData?.vendorServices[index]

					if (vendor?.checked && vendor?.plans.filter((plan) => plan?.cart_items.checked === 'Y').length === 1 && vendor?.plans.filter((plan) => plan?.cart_items?.id === product?.cart_items?.id).length === 1 && couponsArray?.length > 0) {
						console.log('service vendor not check', vendor.checked)

						const couponAppliedVendor = couponsArray?.find((coupon) => coupon?.vendorId === vendor?.id)
						const newCpnsArray = couponsArray?.filter((coupon) => coupon?.vendorId !== vendor?.id)
						couponAppliedVendor !== undefined && setcouponsArray(() => newCpnsArray)

						resetCouponsFields()
					} else updateCouponData(vendorAmountRef, index, 0, vendorId, 'remove', product, 'service-provider')
				}
				setcpnsBaseProductsIds((prev) => prev?.filter((id) => id !== product?.id))
			}

			console.log('deleteProductData', deleteProductData)
		} else {
			console.log('delete vendor', 'deleteVendorData', deleteVendorData)
			const newCpnsArray = couponsArray?.filter((arr) => arr?.vendorId !== deleteVendorData?.vendorId)
			setcouponsArray(() => newCpnsArray)
			await deleteItemHandler(1, deleteVendorData?.vendorId, 'vendor')
		}
		setselectDeleteLoading(false)
		unlockScroll()
		setTimeout(() => {
			sethideTotal(false)
		}, 500)
	}

	return (
		<div className={`${styles.wrapper}`}>
			<div className={`${styles.title} semibold-text gray-color`} style={{ color: alertType === 'no-item-selected' ? 'var(--red)' : undefined }}>
				{alertType === 'grand-total'
					? 'Something went wrong, kindly contact us.'
					: alertType === 'no-item-selected'
					? 'Please select one or more items to delete.'
					: alertType === 'vendor-delete'
					? 'Are you sure, you want to delete all items of this vendor.'
					: alertType === 'delete-checked'
					? 'Are you sure, you want to delete these item(s)?'
					: alertType === 'delete'
					? 'Are you sure, you want to delete this item?'
					: 'It looks like you have entered invalid zip code. Kindly add a valid zip code to proceed with your order.'}
			</div>

			{alertType === 'grand-total' ? (
				<Link href='/contact'>
					<a>
						<button className={`${styles.add_address} primary-btn white-color`}>Contact Us</button>
					</a>
				</Link>
			) : alertType === 'delete-checked' || alertType === 'delete' || alertType === 'vendor-delete' ? (
				<div className={styles.btns_wrapper}>
					<button className={`${styles.add_address} primary-btn white-color`} onClick={() => deleteConfirmHandler()}>
						Delete
					</button>
					<button className={`${styles.add_address} ${styles.cancel_btn} gray-border`} onClick={() => (setmodal(false), unlockScroll())}>
						Cancel
					</button>
				</div>
			) : alertType == 'no-item-selected' ? (
				<button className={`${styles.add_address} gray-border`} onClick={() => (setmodal(false), unlockScroll())}>
					Close
				</button>
			) : (
				<button className={`${styles.add_address} primary-btn white-color`} onClick={() => routingtoAddressPageHandler()}>
					Edit Address
				</button>
			)}
		</div>
	)
}

export default AddAddressModal

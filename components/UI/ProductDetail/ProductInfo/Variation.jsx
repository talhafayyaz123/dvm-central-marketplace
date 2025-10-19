import React, { useEffect, useState } from 'react'
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox'
import styles from './ProductInfo.module.css'

const Variation = ({ router, loginUser, changingData, setchangingData, setchangingImages, captionType, setselectedVariationSku, setsubProudctQtyinCart, setsubProductMaxThreshHold, ls_variationData, preSelectedVariationChecked, setqty, variationData, allowSampleReq, setallowSampleReq }) => {
	const [activeVariation, setactiveVariation] = useState(null)

	const variationClickHandler = async (subProduct, index) => {
		let getLsVariationMatchItem

		console.log('subProduct', subProduct)

		setactiveVariation(index)
		setselectedVariationSku(subProduct?.sku)
		if (loginUser?.id !== undefined && subProduct?.quantity > 0) {
			getLsVariationMatchItem = ls_variationData?.find((item) => item?.id === subProduct?.id)
			setsubProudctQtyinCart(() => (getLsVariationMatchItem?.quantity_in_cart !== null ? getLsVariationMatchItem?.quantity_in_cart : 0))
			setsubProductMaxThreshHold(() => (getLsVariationMatchItem?.max_quantity_threshold !== null ? getLsVariationMatchItem?.max_quantity_threshold : getLsVariationMatchItem?.quantity))
			setallowSampleReq(getLsVariationMatchItem?.sample_product)
		}

		await setchangingData(subProduct)
		await setchangingImages(subProduct?.files)

		loginUser?.id !== undefined &&
			subProduct?.quantity > 0 &&
			setqty((prev) => {
				if (subProduct?.minimum_order !== null && subProduct?.minimum_order > 0 && (getLsVariationMatchItem?.quantity_in_cart === null || getLsVariationMatchItem?.quantity_in_cart < 1)) {
					return Number(subProduct?.minimum_order)
				} else if (getLsVariationMatchItem?.quantity_in_cart !== null && getLsVariationMatchItem?.quantity_in_cart !== 0 && getLsVariationMatchItem?.quantity_in_cart < subProduct?.minimum_order) {
					return Number(subProduct?.minimum_order) - Number(getLsVariationMatchItem?.quantity_in_cart)
				} else if (getLsVariationMatchItem?.quantity_in_cart === (getLsVariationMatchItem?.max_quantity_threshold !== null ? getLsVariationMatchItem?.max_quantity_threshold : getLsVariationMatchItem?.quantity)) {
					return subProduct?.minimum_order !== null && subProduct?.minimum_order > 0 ? Number(subProduct?.minimum_order) : 1
				} else if (prev >= (getLsVariationMatchItem?.max_quantity_threshold !== null ? getLsVariationMatchItem?.max_quantity_threshold : getLsVariationMatchItem?.quantity) - getLsVariationMatchItem.quantity_in_cart) {
					return (getLsVariationMatchItem?.max_quantity_threshold !== null ? getLsVariationMatchItem?.max_quantity_threshold : getLsVariationMatchItem?.quantity) - getLsVariationMatchItem?.quantity_in_cart
				} else if (getLsVariationMatchItem?.max_quantity_threshold === null && getLsVariationMatchItem?.quantity === 0) {
					return prev
				} else {
					return 1
				}
			})
	}

	useEffect(() => {
		if (router?.asPath?.includes('#') && preSelectedVariationChecked) {
			const selectedVariation = variationData?.find((product) => {
				const skuInRoute = router?.asPath?.slice(router.query.slug[0].length + 2, router?.asPath?.length).replaceAll('%20', ' ')

				return skuInRoute == product?.sku && product
			})

			variationClickHandler(selectedVariation)
			loginUser?.id !== undefined && setallowSampleReq(selectedVariation?.sample_product)
		} else return
	}, [variationData, preSelectedVariationChecked, changingData, allowSampleReq])

	return (
		<div className={styles.variation_wrapper}>
			<div className={styles.dropdown_container}>
				<div className={`${styles.dropdown_wrapper}`}>
					<div className={`${styles.caption} semibold-text`}>{captionType !== null ? captionType : 'Select an option'}</div>
				</div>

				<ul className={`${styles.dropdown_menu} active-scrollbar`}>
					{variationData?.map((subProduct, index) => {
						return (
							<CustomCheckbox
								defaultChecked={router?.asPath?.slice(router.query.slug[0].length + 2, router?.asPath?.length).replaceAll('%20', ' ') === subProduct?.sku}
								className={`${styles.variation} ${activeVariation === index && styles.active_variation}`}
								key={index}
								labeltitle={subProduct?.caption}
								type='radio'
								value={subProduct?.caption}
								name='variation'
								onChange={() => variationClickHandler(subProduct, index)}
								onClick={() => setselectedVariationSku(subProduct?.sku)}
							/>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default Variation

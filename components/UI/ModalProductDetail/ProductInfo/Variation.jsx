import React, { useState } from 'react'
import CustomCheckbox from '../../CustomCheckbox/CustomCheckbox'
import styles from './ProductInfo.module.css'
const Variation = ({ loginUser, variationData, setchangingData, setchangingImages, captionType, setmodalSelectedVariationSku, setmodalSubProductQtyinCart, setmodalSubProductMaxThreshHold, modalProductVariationData, setmodalQty, setallowSampleReq }) => {
	const [modalActiveVariation, setmodalActiveVariation] = useState(null)

	const modalVariationClickHandler = (subProduct, index) => {
		let getModalLsVariationMatchItem
		setmodalActiveVariation(index)
		setmodalSelectedVariationSku(subProduct?.sku)
		if (loginUser?.id !== undefined && subProduct?.quantity > 0) {
			getModalLsVariationMatchItem = modalProductVariationData?.find((item) => item?.id === subProduct?.id)
			setmodalSubProductQtyinCart(() => (getModalLsVariationMatchItem?.quantity_in_cart != null ? getModalLsVariationMatchItem?.quantity_in_cart : 0))
			setmodalSubProductMaxThreshHold(() => (getModalLsVariationMatchItem?.max_quantity_threshold !== null ? getModalLsVariationMatchItem?.max_quantity_threshold : getModalLsVariationMatchItem?.quantity))
			setallowSampleReq(getModalLsVariationMatchItem?.sample_product)
		}
		loginUser?.id === undefined && setallowSampleReq(subProduct?.sample_product)

		setchangingData(subProduct)
		setchangingImages(subProduct?.files)

		loginUser?.id !== undefined &&
			subProduct?.quantity > 0 &&
			setmodalQty((prev) => {
				if (subProduct?.minimum_order !== null && subProduct?.minimum_order > 0 && (getModalLsVariationMatchItem?.quantity_in_cart === null || getModalLsVariationMatchItem?.quantity_in_cart < 1)) {
					return Number(subProduct?.minimum_order)
				} else if (getModalLsVariationMatchItem?.quantity_in_cart !== null && getModalLsVariationMatchItem?.quantity_in_cart !== 0 && getModalLsVariationMatchItem?.quantity_in_cart < subProduct?.minimum_order) {
					return Number(subProduct?.minimum_order) - Number(getModalLsVariationMatchItem?.quantity_in_cart)
				} else if (getModalLsVariationMatchItem?.quantity_in_cart === (getModalLsVariationMatchItem?.max_quantity_threshold !== null ? getModalLsVariationMatchItem?.max_quantity_threshold : getModalLsVariationMatchItem?.quantity)) {
					return 1
				} else if (prev >= (getModalLsVariationMatchItem?.max_quantity_threshold !== null ? getModalLsVariationMatchItem?.max_quantity_threshold : getModalLsVariationMatchItem?.quantity) - getModalLsVariationMatchItem.quantity_in_cart) {
					return (getModalLsVariationMatchItem?.max_quantity_threshold !== null ? getModalLsVariationMatchItem?.max_quantity_threshold : getModalLsVariationMatchItem?.quantity) - getModalLsVariationMatchItem?.quantity_in_cart
				} else if (getModalLsVariationMatchItem?.max_quantity_threshold === null && getModalLsVariationMatchItem?.quantity === 0) {
					return prev
				} else {
					return 1
				}
			})
	}

	return (
		<div className={styles.variation_wrapper}>
			<div className={styles.dropdown_container}>
				<div className={`${styles.dropdown_wrapper}`}>
					<div className={`${styles.caption} semibold-text`}>{captionType}</div>
				</div>

				<ul className={`${styles.dropdown_menu} active-scrollbar`}>
					{variationData?.map((subProduct, index) => {
						return (
							<CustomCheckbox
								className={`${styles.variation} ${modalActiveVariation === index && styles.active_variation}`}
								key={subProduct?.id}
								labeltitle={subProduct?.caption}
								type='radio'
								value={subProduct?.caption}
								name='modal-variation'
								onChange={() => modalVariationClickHandler(subProduct, index)}
								onClick={() => setmodalSelectedVariationSku(subProduct?.sku)}
							/>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default Variation

import React from 'react'
import AdditionalInfo from './AdditionalInfo/AdditionalInfo'
import styles from './ProductInfo.module.css'

const ProductInfo = ({ additionalInfoData, variationType }) => {
	return (
		<section className='product-info'>
			<div className='sec-container'>
				<div className={`${styles.product_info_outer_wrapper} inner-sec-pb`}>
					<div className={`${styles.product_info_wrapper}`}>{variationType == 'variation' && additionalInfoData != null && additionalInfoData != undefined && Object.values(additionalInfoData)?.length > 0 && <AdditionalInfo data={additionalInfoData} variationType={variationType} />}</div>
				</div>
			</div>
		</section>
	)
}

export default ProductInfo

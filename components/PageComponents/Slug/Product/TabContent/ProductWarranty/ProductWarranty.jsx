import React from 'react'
import styles from './ProductWarranty.module.css'

const ProductWarranty = ({ warrantyData }) => {
	return warrantyData !== null ? (
		<div className={styles.warranty_wrapper}>
			<h5>Product Warranty</h5>

			<div className='dynamic-data gray-color' dangerouslySetInnerHTML={{ __html: warrantyData }} />
		</div>
	) : (
		<div className='gray-color'>No warranty information available for this product.</div>
	)
}

export default ProductWarranty

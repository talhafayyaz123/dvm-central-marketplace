import React, { useState } from 'react'
import ImgsGallery from './ImgsGallery/ImgsGallery'
import styles from './ProductDetail.module.css'
import ProductInfo from './ProductInfo/ProductInfo'

const ProductDetail = ({ data, changingData, setchangingData, cartItemsData }) => {
	const [changingImages, setchangingImages] = useState(data?.images)

	return (
		<>
			<div className={`${styles.product_detail_wrapper}`}>
				<div className={`${styles.imgs_container} white-bg radius`}>
					<div className={`${styles.imgs_inner_container}`}>{changingImages && <ImgsGallery data={changingData} name={changingData?.name} images={changingImages} videos={data?.videos} />}</div>
				</div>
				<ProductInfo data={data} slug={data?.vendor} changingData={changingData} setchangingData={setchangingData} setchangingImages={setchangingImages} changingImages={changingImages} videos={data?.data?.videos} vendorName={data?.vendor?.name} cartItemsData={cartItemsData} />
			</div>
		</>
	)
}

export default ProductDetail

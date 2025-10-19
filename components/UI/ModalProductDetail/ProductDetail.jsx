import React, { useState } from 'react'
import ImgsGallery from './ImgsGallery/ImgsGallery'
import styles from './ProductDetail.module.css'
import ProductInfo from './ProductInfo/ProductInfo'

const ProductDetail = ({ data, modal, setmodal, closeSearchHanlder, setsidebarVideoModalData, setsidebarVideoModal, cartItemsData }) => {
	const [changingData, setchangingData] = useState(data?.product)

	const [changingImages, setchangingImages] = useState(data?.images)

	return (
		<>
			{/* <div className={`${styles.sidesbar} ${styles.product_detail_wrapper}`}> */}
			<div className={styles.product_detail_wrapper}>
				<div className={`${styles.imgs_container} white-bg radius`}>
					<div className={`${styles.imgs_inner_container}`}>{changingImages && <ImgsGallery setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} data={changingData} name={changingData?.name} images={changingImages} videos={data?.videos} />}</div>
				</div>
				<ProductInfo
					data={data}
					changingData={changingData}
					setchangingData={setchangingData}
					setchangingImages={setchangingImages}
					changingImages={changingImages}
					videos={data?.data?.videos}
					vendorName={data?.vendor?.name}
					modal={modal}
					setmodal={setmodal}
					closeSearchHanlder={closeSearchHanlder}
					cartItemsData={cartItemsData}
				/>
			</div>
		</>
	)
}

export default ProductDetail

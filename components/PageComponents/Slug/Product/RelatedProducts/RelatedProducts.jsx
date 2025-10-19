import React from 'react'
import RelatedProducrsSlider from '../../../../UI/RelatedProductsSlider/RelatedProducrsSlider'
import styles from './RelatedProducts.module.css'

const RelatedProducts = ({ data, setmodalLoading, setModalData, setmodal }) => {
	return (
		<section className={`${styles.realted_container} inner-sec-pt`}>
			<div className='sec-container'>
				<div className={`${styles.related_products} inner-sec-pb`}>
					<h4>Products related to this item</h4>
					<RelatedProducrsSlider data={data} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} />
				</div>
			</div>
		</section>
	)
}

export default RelatedProducts

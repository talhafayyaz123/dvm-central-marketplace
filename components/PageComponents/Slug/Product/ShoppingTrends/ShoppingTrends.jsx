import React from 'react'
import RelatedProducrsSlider from '../../../../UI/RelatedProductsSlider/RelatedProducrsSlider'
import styles from './ShoppingTrends.module.css'

const ShoppingTrends = ({ data, setmodalLoading, setModalData, setmodal }) => {
	return (
		<section className={`${styles.trends_container} inner-sec-pb sec-pt`}>
			<div className='sec-container'>
				<h4>Recommended Based On Your Shopping Trends</h4>
				<RelatedProducrsSlider className='inner-sec-mt' data={data} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} />
			</div>
		</section>
	)
}

export default ShoppingTrends

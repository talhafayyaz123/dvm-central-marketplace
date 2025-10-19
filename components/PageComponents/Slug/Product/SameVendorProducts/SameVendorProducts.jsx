import React from 'react'
import styles from './SameVendorProducts.module.css'
import NewCard from '../../../../UI/NewCard/NewCard'

const SameVendorProducts = ({ products, setmodalLoading, setModalData, setmodal }) => {
	return (
		<section className='sec-container'>
			<div className={`${styles.same_products_container} inner-sec-p`}>
				<h4>From the same store</h4>
				<div className={`${styles.same_products_wrapper}`}>
					{products?.slice(0, 4)?.map((product) => {
						return <NewCard key={product.id} data={product} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} cardType='featured' />
						// return <SameProductCard className={`${styles.card} ${index === 2 ? styles.last_card : undefined}`} key={product.id} data={product} cartBtnLoading={cartBtnLoading} cartBtndisabled={cartBtndisabled} index={index} setmodal={setmodal} setModalData={setModalData} />
					})}
				</div>
			</div>
		</section>
	)
}

export default SameVendorProducts

import React from 'react'
import ProductsTitle from '../ProductsTitle/ProductsTitle'
import styles from './HotSellingProducts.module.css'
import Link from 'next/link'
import NewCard from '../../../../../../UI/NewCard/NewCard'

const HotSellingProducts = ({ hotProduts, showSearchFilterResult, searchResultAllProducts, vendorSlug, setmodal, setModalData, setmodalLoading }) => {
	return (
		<>
			<ProductsTitle showSearchFilterResult={showSearchFilterResult} />
			{showSearchFilterResult ? (
				searchResultAllProducts?.length > 0 ? (
					<div className={`${styles.all_results_wrapper} sec-mb`}>
						<div className={`${styles.wrapper} inner-sec-pb`}>
							{searchResultAllProducts?.map((product) => {
								return <NewCard key={product?.id} data={product} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} />
							})}
						</div>
						<Link href={`/vendors/${vendorSlug}/all-products`}>
							<a className={styles.btn}>
								<button className='primary-btn white-color'>View All Products</button>
							</a>
						</Link>
					</div>
				) : (
					<div className={`${styles.not_found} red-color sec-mb`}>No product found, revise your search.</div>
				)
			) : (
				<div className={`${styles.wrapper} inner-sec-pb`}>
					{hotProduts?.length > 0 ? (
						hotProduts?.map((product) => {
							return <NewCard key={product?.id} data={product} setmodal={setmodal} setModalData={setModalData} searchResultAllProducts={searchResultAllProducts} setmodalLoading={setmodalLoading} />
						})
					) : (
						<div className={`${styles.not_found} red-color sec-mb`}>No product found ...</div>
					)}
				</div>
			)}
		</>
	)
}

export default HotSellingProducts

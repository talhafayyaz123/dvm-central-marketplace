import Link from 'next/link'
import React from 'react'
import styles from './AllProducts.module.css'
import NewCard from '../../../../../../UI/NewCard/NewCard'

const AllProducts = ({ allProducts, vendorSlug, allProductsPage, setmodal, setModalData, noHotproducts, setmodalLoading }) => {
	return (
		<>
			<div className={`${styles.all_products} inner-sec-p ${noHotproducts ? styles.no_hot_products : undefined}`}>
				<div className={!noHotproducts ? 'sec-container' : undefined}>
					<h4>All Products</h4>
					<div className={`${styles.wrapper} ${!noHotproducts ? 'inner-sec-pb' : undefined}`}>
						{allProducts?.length === 0 && <div className='red-color'> No product found... </div>}
						{allProducts?.slice(0, 16)?.map((product) => {
							return <NewCard key={product?.id} data={product} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} />
						})}
					</div>

					{allProductsPage === true && (
						<div className={styles.btn_wrapper}>
							<Link href={`/vendors/${vendorSlug}/all-products`}>
								<a>
									<button className='primary-btn white-color'>View All Products</button>
								</a>
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default AllProducts

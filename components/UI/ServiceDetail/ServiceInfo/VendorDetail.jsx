import Link from 'next/link'
import React from 'react'
import styles from './ProductInfo.module.css'

const VendorDetail = ({ sku, data, name, slug, productType }) => {
	return (
		<div className={styles.vendor_wrapper}>
			<div className={styles.inner_wrapper}>
				<div>
					Sold By <span>:</span>
				</div>
				<div>
					<Link href={`vendors/${slug}`}>
						<h2 className='semibold-text'>
							<a className={styles.vendors_slug}> {name}</a>
						</h2>
					</Link>
				</div>
			</div>
			<div className={styles.inner_wrapper}>
				<div>
					SKU <span>:</span>
				</div>
				<h2 className='semibold-text'> {sku}</h2>
			</div>
			{data?.length > 0 && (
				<div className={styles.inner_wrapper}>
					<div>
						Categories <span>:</span>
					</div>
					<div className={styles.categories_wrapper}>
						{data?.map((productCategory, index) => {
							const { slug, name } = productCategory
							return (
								<h2 key={index} className='semibold-text'>
									<Link href={`/${slug}`}>
										<a className={`${styles.product_category} primary-color`}>{name}</a>
									</Link>
								</h2>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default VendorDetail

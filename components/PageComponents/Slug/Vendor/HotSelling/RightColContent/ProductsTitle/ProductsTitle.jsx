import React from 'react'
import styles from './ProductsTitle.module.css'

const ProductsTitle = ({ showSearchFilterResult }) => {
	return (
		<div className={`${styles.wrapper} inner-sec-mt`}>
			<h4>{showSearchFilterResult ? 'Search Results' : 'Hot Selling Products'}</h4>
		</div>
	)
}

export default ProductsTitle

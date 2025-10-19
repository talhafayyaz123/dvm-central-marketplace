import React from 'react'
import ProductsListingLayout from '../../UI/ProductsListingLayout/ProductsListingLayout'
import banner from '/public/hot-products-banner.png'

const HotProducts = ({ data }) => {
	return <ProductsListingLayout data={data} filterType='hot_products' pageName='hot-products' hero={true} title='Hot Deals' info={`Find Hot Products by our trusted vendors.`} imgSrc={banner} heading={`Hot Products`} />
}

export default HotProducts

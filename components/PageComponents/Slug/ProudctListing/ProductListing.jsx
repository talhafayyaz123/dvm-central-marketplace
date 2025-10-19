import React, { useContext, useEffect, useRef, useState } from 'react'
import LeftCol from '../../../UI/ListingLayout/LeftCol/LeftCol'
import ListingLayout from '../../../UI/ListingLayout/ListingLayout'
import RigthCol from '../../../UI/ListingLayout/RigthCol/RightCol'
import Filters from '../Filters/Filters'
import ListingResults from '../ListingResults/ListingResults'
import styles from './ProductListing.module.css'
import MetaTags from '../../../UI/MetaTags/MetaTags'
import { imgApiUrl } from '../../../../utils/config'
import { GlobalProvider } from '../../../../context/AppProvider'
import useLocalStorageState from 'use-local-storage-state'

// import PromotionBanners from '../PromotionBanners/PromotionBanners'

const ProductListing = ({ result, router }) => {
	const [filterChange, setfilterChange] = useState(false)
	const [currentData, setcurrentData] = useState(result?.products?.data)
	const [totalResults, settotalResults] = useState(result?.products?.total)
	const [loading, setLoading] = useState(false)

	const [selectedVal, setselectedVal] = useLocalStorageState('productSortedVal', { defaultValue: '' })

	const [categoriesFilter, setcategoriesFilter] = useLocalStorageState('productCategoriesFilter', { defaultValue: [result?.category?.id?.toString()] })

	const [vendorFilter, setvendorFilter] = useLocalStorageState('productVendorFilter', { defaultValue: [] })
	const [priceFilter, setpriceFilter] = useLocalStorageState('productPriceFilter', { defaultValue: [] })

	const [selectedOption, setselectedOption] = useLocalStorageState('selectedSortingOption', { defaultValue: 'Sort By' })

	const [currentPage, setcurrentPage] = useState(result?.products?.current_page)
	const [lastPage, setlastPage] = useState(result?.products?.last_page)
	const [hasMoreData, sethasMoreData] = useState(true)

	const [showFilterData, setshowFilterData] = useLocalStorageState('productShowFilterData', { defaultValue: false })

	const resultWrapper = useRef(null)

	const { loginUser } = useContext(GlobalProvider)

	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			if (selectedOption !== 'Sort By ' || categoriesFilter?.length > 0 || vendorFilter?.length > 0 || priceFilter?.length > 0 || selectedVal !== '') {
				localStorage.removeItem('productSortedVal')
				localStorage.removeItem('productVendorFilter')
				localStorage.removeItem('productCategoriesFilter')
				localStorage.removeItem('productPriceFilter')
				localStorage.removeItem('productShowFilterData')
				localStorage.removeItem('selectedSortingOption')
			}
		})
	}, [router])

	return (
		<>
			<MetaTags title={result?.meta_title} description={result?.meta_description} keywords={result?.meta_keywords} ogWidth={600} ogHeight={600} ogImg={`${imgApiUrl.products.large}/${result?.products?.data[0]?.image}`}>
				{result?.all_seo_products?.length > 0 && (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'CollectionPage',
								name: result?.category?.name,
								id: `https://www.dvmcentral.com${router?.asPath}/#CollectionPage`,
								url: `https://www.dvmcentral.com${router?.asPath}`,
								description: result?.meta_description,
								keywords: result?.meta_keywords,
								mainEntity: {
									'@type': 'BreadcrumbList',
									itemListElement: [
										result?.all_seo_products?.map((data, index) => {
											const { type, name, slug, meta_keywords, meta_description, image, price_range_max, price_range_min, sku, in_stock, vendor, price_catalog, price, price_discounted, price_discounted_end } = data
											return type === 'variation'
												? {
														'@type': 'ListItem',
														position: index + 1,
														item: {
															'@type': 'Product',
															id: `https://www.dvmcentral.com/${slug}/#Product`,
															name: name,
															url: `https://www.dvmcentral.com/${slug}`,
															keywords: meta_keywords,
															image: image !== null ? `${imgApiUrl.products.medium}/${image}` : 'https://www.dvmcentral.com/og-logo.jpg',
															description: meta_description,
															brand: {
																'@type': 'Brand',
																name: vendor?.name
															},
															offers: {
																'@type': 'AggregateOffer',
																priceCurrency: 'USD',
																highPrice: price_range_max,
																lowPrice: price_range_min,
																sku: sku,
																availability: in_stock === 'Y' ? 'Yes' : 'Out of Stock',
																seller: {
																	'@type': 'Organization',
																	name: vendor?.name
																}
															}
														}
												  }
												: {
														'@type': 'ListItem',
														position: index + 1,
														item: {
															'@type': 'Product',
															id: `https://www.dvmcentral.com/${slug}/#Product`,
															name: name,
															url: `https://www.dvmcentral.com/${slug}`,
															keywords: meta_keywords,
															image: image !== null ? `${imgApiUrl.products.medium}/${image}` : 'https://www.dvmcentral.com/og-logo.jpg',
															description: meta_description,
															brand: {
																'@type': 'Brand',
																name: vendor?.name
															},
															offers: {
																'@type': 'Offer',
																priceCurrency: 'USD',
																Price: price_discounted !== null && price_discounted !== 0 && price_discounted !== price_catalog && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? price_discounted?.toFixed(2) : price?.toFixed(2),
																sku: sku,
																availability: in_stock === 'Y' ? 'Yes' : 'Out of Stock',
																seller: {
																	'@type': 'Organization',
																	name: vendor?.name
																}
															}
														}
												  }
										})
									]
								}
							})
						}}
					/>
				)}
			</MetaTags>
			<ListingLayout>
				{result?.products?.data?.length > 0 && (
					<LeftCol className={styles.left_col}>
						<Filters
							categoryId={result?.category?.id?.toString()}
							filterChange={filterChange}
							setfilterChange={setfilterChange}
							setLoading={setLoading}
							setcurrentData={setcurrentData}
							brands={result.brands_list}
							relatedCategories={result.categories_list_array}
							selectedVal={selectedVal}
							resultWrapper={resultWrapper}
							categoriesFilter={categoriesFilter}
							setcategoriesFilter={setcategoriesFilter}
							vendorFilter={vendorFilter}
							setvendorFilter={setvendorFilter}
							priceFilter={priceFilter}
							setpriceFilter={setpriceFilter}
							setcurrentPage={setcurrentPage}
							setlastPage={setlastPage}
							setshowFilterData={setshowFilterData}
							sethasMoreData={sethasMoreData}
							settotalResults={settotalResults}
							loginUser={loginUser}
						/>
					</LeftCol>
				)}
				{/* Change prop to "sub-category-listing" after adding banner on this page */}
				<RigthCol
					className={result?.products?.data?.length == 0 ? styles.single_col : undefined}
					//  pageType='category-listing' listingTitle={result?.category?.name} description={result?.category?.short_description} long_description={result?.category?.description}
				>
					<ListingResults
						setcurrentData={setcurrentData}
						selectedOption={selectedOption}
						setselectedOption={setselectedOption}
						sethasMoreData={sethasMoreData}
						setcurrentPage={setcurrentPage}
						setlastPage={setlastPage}
						currentPage={currentPage}
						lastPage={lastPage}
						hasMoreData={hasMoreData}
						loading={loading}
						currentData={currentData}
						selectedVal={selectedVal}
						setselectedVal={setselectedVal}
						setfilterChange={setfilterChange}
						resultWrapper={resultWrapper}
						showFilterData={showFilterData}
						categoriesFilter={categoriesFilter}
						vendorFilter={vendorFilter}
						priceFilter={priceFilter}
						totalResults={totalResults}
						categoryId={result?.category?.id?.toString()}
						filterChange={filterChange}
						setLoading={setLoading}
						brands={result.brands_list}
						relatedCategories={result.categories_list_array}
						setcategoriesFilter={setcategoriesFilter}
						setvendorFilter={setvendorFilter}
						setpriceFilter={setpriceFilter}
						setshowFilterData={setshowFilterData}
						settotalResults={settotalResults}
						defaultDataLength={result?.products?.data?.length}
						loginUser={loginUser}
						realatedItems={result?.you_may_also_like}
						pageType='category-listing'
						listingTitle={result?.category?.name}
						description={result?.category?.short_description}
						long_description={result?.category?.description}
					/>
				</RigthCol>
			</ListingLayout>
			{/* <PromotionBanners /> */}
		</>
	)
}

export default ProductListing

import React, { useContext, useEffect, useRef, useState, useMemo } from 'react'
import styles from './ProductsListingLayout.module.css'
import ListingLayout from '../ListingLayout/ListingLayout'
import LeftCol from '..//ListingLayout/LeftCol/LeftCol'
import RigthCol from '..//ListingLayout/RigthCol/RightCol'
import Filters from './Filters/Filters'
import ListingResults from './ListingResults/ListingResults'
import HeroBanner from '../HeroBanner/HeroBanner'
import MetaTags from '../MetaTags/MetaTags'
import { GlobalProvider } from '../../../context/AppProvider'
import useLocalStorageState from 'use-local-storage-state'

const ProductsListingLayout = ({ data, filterType, pageName, hero, title, info, imgSrc, heading }) => {
	const [filterChange, setfilterChange] = useState(false)
	const [currentData, setcurrentData] = useState(data?.products?.data)
	const [totalResults, settotalResults] = useState(data?.products?.total)
	const [loading, setLoading] = useState(false)
	const [selectedVal, setselectedVal] = useLocalStorageState(`${filterType === 'deals_of_the_day' ? 'dvm-td_sortedval' : filterType === 'featured_products' ? 'dvm-fp_sortedval' : filterType === 'hot_products' && 'dvm-hp_sortedval'}`, { defaultValue: '' })

	const [selectedOption, setselectedOption] = useLocalStorageState(`${filterType === 'deals_of_the_day' ? 'dvm-td_sortedOption' : filterType === 'featured_products' ? 'dvm-fp_sortedOption' : filterType === 'hot_products' && 'dvm-hp_sortedOption'}`, { defaultValue: 'Sort By' })

	const [vendorFilter, setvendorFilter] = useLocalStorageState(`${filterType === 'deals_of_the_day' ? 'dvm-td_vendorFilter' : filterType === 'featured_products' ? 'dvm-fp_vendorFilter' : filterType === 'hot_products' && 'dvm-hp_vendorFilter'}`, { defaultValue: [] })

	const [priceFilter, setpriceFilter] = useLocalStorageState(`${filterType === 'deals_of_the_day' ? 'dvm-td_priceFilter' : filterType === 'featured_products' ? 'dvm-fp_priceFilter' : filterType === 'hot_products' && 'dvm-hp_priceFilter'}`, { defaultValue: [] })

	const [currentPage, setcurrentPage] = useState(data?.products?.current_page)
	const [lastPage, setlastPage] = useState(data?.products?.last_page)
	const [hasMoreData, sethasMoreData] = useState(true)

	const [showFilterData, setshowFilterData] = useLocalStorageState(`${filterType === 'deals_of_the_day' ? 'dvm-td_showFilterData' : filterType === 'featured_products' ? 'dvm-fp_showFilterData' : filterType === 'hot_products' && 'dvm-hp_showFilterData'}`, { defaultValue: false })

	const resultWrapper = useRef(null)
	const { loginUser } = useContext(GlobalProvider)

	const [mounted, setMounted] = useState(false)
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	})

	// Handle client-side mounting
	useEffect(() => {
		setMounted(true)
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}, [])

	// Handle window resize
	useEffect(() => {
		if (!mounted) return

		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}
		
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [mounted])

	const isMobile = useMemo(() => mounted && windowSize.width <= 768, [mounted, windowSize.width])
	const isDesktop = useMemo(() => mounted && windowSize.width > 768, [mounted, windowSize.width])

	// Memoize the filters component to prevent unnecessary re-renders
	const filtersComponent = useMemo(() => (
		<Filters
			filterChange={filterChange}
			setfilterChange={setfilterChange}
			setLoading={setLoading}
			setcurrentData={setcurrentData}
			brands={data?.brands_list}
			selectedVal={selectedVal}
			resultWrapper={resultWrapper}
			vendorFilter={vendorFilter}
			setvendorFilter={setvendorFilter}
			priceFilter={priceFilter}
			setpriceFilter={setpriceFilter}
			setcurrentPage={setcurrentPage}
			setlastPage={setlastPage}
			setshowFilterData={setshowFilterData}
			sethasMoreData={sethasMoreData}
			settotalResults={settotalResults}
			filterType={filterType}
			setselectedVal={setselectedVal}
			setselectedOption={setselectedOption}
			loginUser={loginUser}
		/>
	), [filterChange, data?.brands_list, selectedVal, vendorFilter, priceFilter, filterType, loginUser]);

	// Memoize the listing results component
	const listingResultsComponent = useMemo(() => (
		<ListingResults
			setcurrentData={setcurrentData}
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
			vendorFilter={vendorFilter}
			priceFilter={priceFilter}
			totalResults={totalResults}
			filterChange={filterChange}
			setLoading={setLoading}
			brands={data?.brands_list}
			setvendorFilter={setvendorFilter}
			setpriceFilter={setpriceFilter}
			setshowFilterData={setshowFilterData}
			settotalResults={settotalResults}
			pageName={pageName}
			filterType={filterType}
			heading={heading}
			selectedOption={selectedOption}
			setselectedOption={setselectedOption}
			defaultDataLength={data?.products?.data?.length}
			loginUser={loginUser}
		/>
	), [currentData, currentPage, lastPage, hasMoreData, loading, selectedVal, showFilterData, vendorFilter, priceFilter, totalResults, filterChange, data?.brands_list, pageName, filterType, heading, selectedOption, loginUser]);

	return (
		<>
			{pageName === 'featured-products' && (
				<MetaTags
					title="DVM Central | Featured Veterinary Products - Best Selection for Your Pet's Health"
					keywords='veterinary products, veterinary services, Surgical Scissors, veterinary supply store, veterinary dental instruments, veterinary supplies, veterinary surgeries, animal care services, veterinary surgical instruments, Veterinary Marketplace, veterinary equipments, veterinary dental elevators, veterinary imaging equipment, veterinary bandage scissors, veterinary medicines, veterinary discounts, veterinary discounts services, featured products'
					description="Explore our curated collection of top-quality veterinary products at DVM Central. Find the latest essentials and specialized items for your pet's health and well-being."
				>
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@graph': [
									{
										'@type': 'WebSite',
										'@id': 'https://www.dvmcentral.com/#website',
										url: 'https://www.dvmcentral.com',
										name: 'DVMCentral',
										description: 'Join DVM Central - A multi-vendor veterinary marketplace promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.',
										image: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
										potentialAction: {
											'@type': 'SearchAction',
											target: {
												'@type': 'EntryPoint',
												urlTemplate: 'https://www.dvmcentral.com/all-search-results/search/{search_term_string}',
												actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/IOSPlatform', 'http://schema.org/AndroidPlatform']
											},
											'query-input': 'required name=search_term_string'
										}
									},

									{
										'@type': 'ItemList',
										itemListElement: data?.seo_data?.map((item, index) => {
											return {
												'@type': 'ListItem',
												position: index + 1,
												url: `https://www.dvmcentral.com/${item}`
											}
										})
									},

									{
										'@type': 'Organization',
										name: 'DVMCentral',
										url: 'https://www.dvmcentral.com',
										logo: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
										description: 'Join DVM Central - A multi-vendor veterinary marketplace promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.',
										sameAs: [
											'https://www.facebook.com/dvmcentralofficial',
											'https://twitter.com/DvmCentral',
											'https://www.instagram.com/dvmcentralofficial/',
											'https://www.youtube.com/@dvmcentral',
											'https://www.linkedin.com/company/dvmcentralofficial/',
											'https://www.pinterest.com/DVMCentralOfficial/'
										],
										contactPoint: {
											'@type': 'ContactPoint',
											telephone: '+14075576073',
											contactType: 'customer support',
											url: 'https://www.dvmcentral.com/contact-us/'
										}
									},
									{
										'@type': 'CollectionPage',
										name: 'Featured Products',
										id: 'https://www.dvmcentral.com/featured-products/#CollectionPage',
										url: 'https://www.dvmcentral.com/featured-products/',
										description: "Explore our curated collection of top-quality veterinary products at DVM Central. Find the latest essentials and specialized items for your pet's health and well-being.",
										keywords:
											'veterinary products, veterinary services, Surgical Scissors, veterinary supply store, veterinary dental instruments, veterinary supplies, veterinary surgeries, animal care services, veterinary surgical instruments, Veterinary Marketplace, veterinary equipments, veterinary dental elevators, veterinary imaging equipment, veterinary bandage scissors, veterinary medicines, veterinary discounts, veterinary discounts services, featured products',
										mainEntity: {
											'@type': 'BreadcrumbList',
											itemListElement: [
												{
													'@type': 'ListItem',
													position: 1,
													name: 'DVM Central - A Veterinary Marketplace',
													item: 'https://www.dvmcentral.com'
												},
												{
													'@type': 'ListItem',
													position: 2,
													name: 'Featured Products',
													item: 'https://www.dvmcentral.com/featured-products'
												}
											]
										}
									},
									{
										'@type': 'ViewAction',
										target: [
											{
												'@type': 'EntryPoint',
												urlTemplate: 'https://play.google.com/store/apps/details?id=com.gtechsources.vetandtech.app',
												actionPlatform: 'http://schema.org/AndroidPlatform'
											},
											{
												'@type': 'EntryPoint',
												urlTemplate: 'https://apps.apple.com/app/1634400448',
												actionPlatform: 'http://schema.org/IOSPlatform'
											}
										]
									}
								]
							})
						}}
					/>
				</MetaTags>
			)}

			{pageName === 'hot-products' && (
				<MetaTags
					title='Shop Trending Pet Supplies | Hot Deals at DVM Central'
					keywords='veterinary products, veterinary services, Surgical Scissors, veterinary supply store, veterinary dental instruments, veterinary supplies, veterinary surgeries, animal care services, veterinary surgical instruments, Veterinary Marketplace, veterinary equipments, veterinary dental elevators, veterinary imaging equipment, veterinary bandage scissors, veterinary medicines, veterinary discounts, veterinary discounts services, hot deals'
					description="Discover the hottest pet supplies and exclusive deals at DVM Central. Explore must-have products that cater to your pet's needs. BUY DIRECT SAVE MORE"
				>
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@graph': [
									{
										'@type': 'WebSite',
										'@id': 'https://www.dvmcentral.com/#website',
										url: 'https://www.dvmcentral.com',
										name: 'DVMCentral',
										description: 'Join DVM Central - A multi-vendor veterinary marketplace promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.',
										image: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
										potentialAction: {
											'@type': 'SearchAction',
											target: {
												'@type': 'EntryPoint',
												urlTemplate: 'https://www.dvmcentral.com/all-search-results/search/{search_term_string}',
												actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/IOSPlatform', 'http://schema.org/AndroidPlatform']
											},
											'query-input': 'required name=search_term_string'
										}
									},
									{
										'@type': 'ItemList',
										itemListElement: data?.seo_data?.map((item, index) => {
											return {
												'@type': 'ListItem',
												position: index + 1,
												url: `https://www.dvmcentral.com/${item}`
											}
										})
									},
									{
										'@type': 'Organization',
										name: 'DVMCentral',
										url: 'https://www.dvmcentral.com',
										logo: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
										description: 'Join DVM Central - A multi-vendor veterinary marketplace promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.',
										sameAs: [
											'https://www.facebook.com/dvmcentralofficial',
											'https://twitter.com/DvmCentral',
											'https://www.instagram.com/dvmcentralofficial/',
											'https://www.youtube.com/@dvmcentral',
											'https://www.linkedin.com/company/dvmcentralofficial/',
											'https://www.pinterest.com/DVMCentralOfficial/'
										],
										contactPoint: {
											'@type': 'ContactPoint',
											telephone: '+14075576073',
											contactType: 'customer support',
											url: 'https://www.dvmcentral.com/contact-us/'
										}
									},
									{
										'@type': 'CollectionPage',
										name: 'Hot Products',
										id: 'https://www.dvmcentral.com/hot-products/#CollectionPage',
										url: 'https://www.dvmcentral.com/hot-products/',
										description: "Discover the hottest pet supplies and exclusive deals at DVM Central. Explore must-have products that cater to your pet's needs. BUY DIRECT SAVE MORE",
										keywords:
											'veterinary products, veterinary services, Surgical Scissors, veterinary supply store, veterinary dental instruments, veterinary supplies, veterinary surgeries, animal care services, veterinary surgical instruments, Veterinary Marketplace, veterinary equipments, veterinary dental elevators, veterinary imaging equipment, veterinary bandage scissors, veterinary medicines, veterinary discounts, veterinary discounts services, hot deals',
										mainEntity: {
											'@type': 'BreadcrumbList',
											itemListElement: [
												{
													'@type': 'ListItem',
													position: 1,
													name: 'DVM Central - A Veterinary Marketplace',
													item: 'https://www.dvmcentral.com'
												},
												{
													'@type': 'ListItem',
													position: 2,
													name: 'Hot Products',
													item: 'https://www.dvmcentral.com/hot-products'
												}
											]
										}
									},
									{
										'@type': 'ViewAction',
										target: [
											{
												'@type': 'EntryPoint',
												urlTemplate: 'https://play.google.com/store/apps/details?id=com.gtechsources.vetandtech.app',
												actionPlatform: 'http://schema.org/AndroidPlatform'
											},
											{
												'@type': 'EntryPoint',
												urlTemplate: 'https://apps.apple.com/app/1634400448',
												actionPlatform: 'http://schema.org/IOSPlatform'
											}
										]
									}
								]
							})
						}}
					/>
				</MetaTags>
			)}

			{hero && <HeroBanner className={`${styles.hero_banner} ${pageName === 'featured-products' || pageName === 'hot-products' ? styles.imgWidth : undefined} gradient-sec`} title={title} info={info} src={imgSrc} />}

			<ListingLayout>
				{data?.products?.data?.length > 0 && isDesktop && (
					<LeftCol className={styles.left_col}>
						{filtersComponent}
					</LeftCol>
				)}

				<RigthCol className={data?.products?.data?.length === 0 ? styles.single_col : undefined}>
					{listingResultsComponent}
				</RigthCol>
			</ListingLayout>
		</>
	)
}

export default React.memo(ProductsListingLayout)

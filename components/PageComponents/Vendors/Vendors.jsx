import React, { useRef, useState } from 'react'
import Search from './Search/Search'
import VendorsCards from '../../UI/VendorsCards/VendorsCards'
import styles from './Vendors.module.css'
import MetaTags from '../../UI/MetaTags/MetaTags'
import HeroBanner from '../../UI/HeroBanner/HeroBanner'
import banner from '../../../public/imgs/vendors-list/Juggling Through Various Stores Is Not Easy.png'
import { baseApiUrl, imgApiUrl } from '../../../utils/config'
import axios from 'axios'
import { DarkLoader } from '../../Loader/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const Vendors = ({ vendors }) => {
	const [initialData, setinitialData] = useState(vendors?.data?.data)

	const [currentPage, setcurrentPage] = useState(vendors?.data?.current_page)
	const [lastPage, setlastPage] = useState(vendors?.last_page)
	const [hasMoreData, sethasMoreData] = useState(true)
	const [searchData, setsearchData] = useState([])
	const [searchCurrentPage, setsearchCurrentPage] = useState(null)
	const [searchLastPage, setsearchLastPage] = useState(null)

	const [showSearchData, setshowSearchData] = useState(false)
	const [searchHasMoreData, setsearchHasMoreData] = useState(false)

	const searchVal = useRef(null)
	const searchReq = useRef(0)

	const fetchData = async () => {
		const currentReq = ++searchReq.current
		if (showSearchData) {
			const res = await axios.get(`${baseApiUrl}/search-vendors?search_input=${searchVal.current.value}&page=${searchCurrentPage + 1}`)

			if (currentReq === searchReq.current) {
				setsearchData((prev) => [...prev, ...res?.data?.data])
				setsearchCurrentPage(res?.data?.current_page)
				setsearchLastPage(res?.data?.last_page)

				if (res?.data?.data?.length > 0) {
					setsearchHasMoreData(true)
				} else setsearchHasMoreData(false)
			}
		} else {
			const res = await axios.get(`${baseApiUrl}/vendors?page=${currentPage + 1}`)

			console.log('res from page pagin', res)

			setinitialData((prev) => [...prev, ...res?.data?.data?.data])
			setcurrentPage(res?.data?.data?.current_page)
			setlastPage(res?.data?.data?.last_page)
			if (res?.data?.data?.data?.length > 0) {
				sethasMoreData(true)
			} else sethasMoreData(false)
		}
	}
	return (
		<>
			<MetaTags
				title='Meet Our Vendors - Quality Veterinary Products at DVM Central'
				description='Explore trusted vendors at DVM Central, offering a wide range of quality veterinary products. Connect with leading suppliers committed to excellence and reliability in veterinary care.'
				keywords='Trusted veterinary vendors, quality vet product suppliers, veterinary partnership opportunities, reliable veterinary brands, veterinary supply vendors, DVM Central partners, vet product manufacturers, veterinary business network, trusted vet product sources, DVM Central vendors'
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
									'@type': 'WebPage',
									'@id': 'https://www.dvmcentral.com/#vendors',
									name: 'DVM Central | Trusted Vendors - Quality Partners in Veterinary Products',
									url: 'https://www.dvmcentral.com/vendors',
									description: 'Discover our trusted network of vendors providing top-quality veterinary products at DVM Central. BUY DIRECT SAVE MORE on products in pet care.',
									mainEntity: {
										'@type': 'ItemList',
										url: 'https://www.dvmcentral.com/vendors',
										itemListElement: vendors?.seo_vendors_data?.map((vendor, i) => {
											const { name, url, meta_description, logo } = vendor
											return {
												'@type': 'ListItem',
												position: i + 1,
												item: {
													'@type': 'Brand',
													name: name,
													url: url,
													description: meta_description,
													logo: `${imgApiUrl.vendor.logo}/${logo}`
												}
											}
										})
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
								},

								{
									'@context': 'https://schema.org',
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
											name: 'Vendors',
											item: 'https://www.dvmcentral.com/vendors'
										}
									]
								}
							]
						})
					}}
				/>
			</MetaTags>

			<HeroBanner className={`${styles.hero_banner} gradient-sec`} title='Juggling Through Various Stores Is Not Easy!' info='Enjoy shopping from multiple vendors in a single, convenient place.' src={banner} />

			<section className={`white-bg`}>
				<div className='sec-container'>
					<div className='sec-pt'>
						<Search searchVal={searchVal} setsearchCurrentPage={setsearchCurrentPage} setsearchLastPage={setsearchLastPage} setsearchHasMoreData={setsearchHasMoreData} setshowSearchData={setshowSearchData} setsearchData={setsearchData} />

						{!showSearchData ? (
							// default data
							<InfiniteScroll
								className={styles.scroller}
								dataLength={initialData?.length}
								next={fetchData}
								scrollThreshold={0.6}
								hasMore={hasMoreData}
								loader={lastPage > 1 && <DarkLoader className={styles.pagination_loader} />}
								// endMessage={
								// 	initialData?.length > 0 &&
								// 	lastPage > 1 && (
								// 		<p style={{ textAlign: 'center' }} className={`${styles.pagination_loader} red-color`}>
								// 			Sorry, no more vendor is available this time...
								// 		</p>
								// 	)
								// }
							>
								{initialData !== null && initialData.length !== 0 ? (
									<div className={`${styles.vendors_wrapper} inner-sec-mt`}>
										{initialData?.map((vendor, index) => {
											return <VendorsCards key={index} data={vendor} />
										})}
									</div>
								) : (
									<div className={`${styles.vendors_wrapper} ${styles.no_found_error} inner-sec-mt`}>
										<span>No vendor found...</span>
									</div>
								)}
							</InfiniteScroll>
						) : (
							// if user opt for search
							<InfiniteScroll
								className={styles.scroller}
								dataLength={searchData?.length}
								next={fetchData}
								scrollThreshold={0.6}
								hasMore={searchHasMoreData}
								loader={searchLastPage > 1 && <DarkLoader className={styles.pagination_loader} />}
								// endMessage={
								// 	searchData?.length > 0 &&
								// 	searchLastPage > 1 && (
								// 		<p style={{ textAlign: 'center' }} className={`${styles.pagination_loader} red-color`}>
								// 			Sorry, no more vendor is available this time...
								// 		</p>
								// 	)
								// }
							>
								{searchData !== null && searchData.length !== 0 ? (
									<div className={`${styles.vendors_wrapper} inner-sec-mt`}>
										{searchData?.map((vendor) => {
											return <VendorsCards key={vendor?.id} data={vendor} />
										})}
									</div>
								) : (
									<div className={`${styles.vendors_wrapper} ${styles.no_found_error} inner-sec-mt`}>
										<span>No vendor found...</span>
									</div>
								)}
							</InfiniteScroll>
						)}
					</div>
				</div>
			</section>
		</>
	)
}

export default Vendors

import React from 'react'
import MetaTags from '../../UI/MetaTags/MetaTags'
import banner from '../../../public/imgs/today-deals/track-order.png'
import ProductsListingLayout from '../../UI/ProductsListingLayout/ProductsListingLayout'

const TodayDeals = ({ data }) => {
	return (
		<>
			<MetaTags title='Today’s Deal | Best Veterinary Deals | DVMCentral' description="Save on your veterinary supplies with the best offers. Don't miss out on the daily deals; browse to find the discounted items you're looking for." keywords='Today Deals, Deals Of The Day, Best Veterinary Deals'>
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
									name: "Today's Deals",
									id: 'https://www.dvmcentral.com/today-deals/#CollectionPage',
									url: 'https://www.dvmcentral.com/today-deals/',
									description: "Save on your veterinary supplies with the best offers. Don't miss out on the daily deals; browse to find the discounted items you're looking for.",
									keywords: 'Today Deals, Deals Of The Day, Best Veterinary Deals',
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
												name: "Today's Deals",
												item: 'https://www.dvmcentral.com/today-deals'
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

			<ProductsListingLayout
				data={data}
				filterType='deals_of_the_day'
				pageName='today-deals'
				hero={true}
				title={`Today's Deals`}
				info={`Take Advantage Of The Best Offers In Town! Avail Today’s Deals To Get The Right Products At The Right Price.`}
				imgSrc={banner}
				heading={`Today's Deals Products`}
			/>
		</>
	)
}

export default TodayDeals

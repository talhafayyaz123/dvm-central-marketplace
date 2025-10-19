import React, { useState, useRef, Suspense, useEffect, useMemo } from 'react'
import Features from './Features/Features'
import HotProducts from './HotProducts/HotProducts'
import DealsDiscounts from './DealsDiscounts/DealsDiscounts'
import dynamic from 'next/dynamic'
import { LiteLoader } from '../../Loader/Loader'
import FeaturedProducts from './FeaturedProducts/FeaturedProducts'
import JoinPortal from './JoinPortal/JoinPortal'
import UpcomingExpo from './UpcomingExpo/UpcomingExpo'
import LatestProducts from './LatestProducts/LatestProducts'
import PracticeNeeds from './PracticeNeeds/PracticeNeeds'
import Vendors from './Vendors/Vendors'
import SearchAVetBanners from './SearchAVetBanners/SearchAVetBanners'
import Hero from './Hero/Hero'
import MetaTags from '../../UI/MetaTags/MetaTags'
import { imgApiUrl } from '../../../utils/config'
import Modal from '../../UI/Modal/Modal'
import VideoModal from '../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import ModalProductDetail from '../../UI/ModalProductDetail/ProductDetail'

const HomeV3 = ({ data }) => {
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)
	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')
	const [modalLoading, setmodalLoading] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const dealsRef = useRef(null)


	console.log('deployed on dev');
	

	const expoData = useMemo(() => {
		if (!data?.upcoming_expo) return null;
		
		return {
			name: data.upcoming_expo.name,
			slug: `https://dvmcentral.com/virtual-expo/${data.upcoming_expo.slug}`,
			description: data.upcoming_expo.short_detail,
			long_description: data.upcoming_expo.full_detail,
			image: `${imgApiUrl.virtualExpo.img}/${data.upcoming_expo.image}`,
			startDate: data.upcoming_expo.start_date?.replace(' ', 'T'),
			endDate: data.upcoming_expo.end_date?.replace(' ', 'T')
		}
	}, [data?.upcoming_expo])

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ rootMargin: '200px' }
		)

		if (dealsRef.current) observer.observe(dealsRef.current)
		return () => observer.disconnect()
	}, [])

	const renderModal = () => {
		if (!modal) return null;
		return (
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				<ModalProductDetail 
					data={modalData} 
					setmodal={setmodal} 
					setsidebarVideoModalData={setsidebarVideoModalData} 
					setsidebarVideoModal={setsidebarVideoModal} 
				/>
			</Modal>
		)
	}

	const renderVideoModal = () => {
		if (!sidebarVideoModal) return null;
		return (
			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				<VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />
			</Modal>
		)
	}

	return (
		<>
			<MetaTags
				title='DVM Central - A Veterinary Marketplace for All Needs'
				description={`Shop or sell on DVM Central, a comprehensive range of veterinary products and supplies. Find everything you need for veterinary care in one place, with expert guidance available.`}
				keywords='DVM Central products, marketplace veterinary, animal health products, vet supply store, veterinary products, buy vet supplies, veterinary supply store, pet health products, animal care supplies'
			>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta key='description' property='description' name='description' content='Join DVM Central -  A multi-vendor veterinary marketplace promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.' />
				<meta name='facebook-domain-verification' content='lpc1or8tzn0imsqw74njfaeceg4kad' />
				{data?.seo_data?.schema_data && (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: data?.seo_data?.schema_data
							// 	{
							// 	'@context': 'https://schema.org',
							// 	'@graph': [
							// 		{
							// 			'@type': 'BreadcrumbList',
							// 			itemListElement: [
							// 				{
							// 					'@type': 'ListItem',
							// 					position: 1,
							// 					name: 'Home',
							// 					item: 'https://www.dvmcentral.com'
							// 				}
							// 			]
							// 		},
							// 		{
							// 			'@type': 'WebSite',
							// 			'@id': 'https://www.dvmcentral.com/#website',
							// 			url: 'https://www.dvmcentral.com',
							// 			name: 'DVMCentral',
							// 			description: 'Join DVM Central - A multi-vendor veterinary marketplace promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.',
							// 			image: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
							// 			potentialAction: {
							// 				'@type': 'SearchAction',
							// 				target: {
							// 					'@type': 'EntryPoint',
							// 					urlTemplate: 'https://www.dvmcentral.com/all-search-results/search/{search_term_string}',
							// 					actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/IOSPlatform', 'http://schema.org/AndroidPlatform']
							// 				},
							// 				'query-input': 'required name=search_term_string'
							// 			}
							// 		},
							// 		{
							// 			'@type': 'WebPage',
							// 			'@id': 'https://www.dvmcentral.com/#homepage',
							// 			name: 'DVM Central',
							// 			url: 'https://www.dvmcentral.com/',
							// 			keywords: 'Marketplace Veterinary, Animal Health Products, Vet Supply Store, Veterinary products, Veterinary supplies, Veterinary supply store',
							// 			audience: [
							// 				{
							// 					'@type': 'MedicalAudience',
							// 					audienceType: 'veterinarians'
							// 				},
							// 				{
							// 					'@type': 'MedicalAudience',
							// 					audienceType: 'veterinary students'
							// 				},
							// 				{
							// 					'@type': 'MedicalAudience',
							// 					audienceType: 'pet owners'
							// 				}
							// 			],
							// 			mainEntity: {
							// 				'@id': 'https://www.dvmcentral.com/#mainEntity'
							// 			}
							// 		},
							// 		{
							// 			'@type': 'LocalBusiness',
							// 			'@id': 'https://www.dvmcentral.com/#localBusiness',
							// 			name: 'DVM Central',
							// 			url: 'https://www.dvmcentral.com/',
							// 			logo: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
							// 			sameAs: ['https://www.facebook.com/DVMCentralofficial/', 'https://www.instagram.com/dvmcentralofficial/', 'https://www.youtube.com/@dvmcentralofficial', 'https://twitter.com/DVMCentral', 'https://www.linkedin.com/company/dvmcentralofficial'],
							// 			address: {
							// 				'@type': 'PostalAddress',
							// 				addressCountry: 'United States',
							// 				addressLocality: 'Orlando'
							// 			}
							// 			// aggregateRating: {
							// 			// 	'@type': 'AggregateRating',
							// 			// 	ratingValue: 5,
							// 			// 	reviewCount: 3
							// 			// }
							// 		},
							// 		{
							// 			'@type': 'VideoObject',
							// 			'@id': 'https://www.dvmcentral.com/#video',
							// 			name: 'Introducing DVM Central - A Veterinary Marketplace',
							// 			description: 'Introducing DVM Central - A Veterinary Marketplace',
							// 			contentUrl: 'https://vimeo.com/784554520',
							// 			uploadDate: '2022-12-27T09:06:28',
							// 			thumbnailUrl: 'https://vimeo.com/784554520'
							// 		},
							// 		{
							// 			'@type': 'ImageObject',
							// 			'@id': 'https://www.dvmcentral.com/#image',
							// 			url: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
							// 			name: 'DVM Central',
							// 			description: 'Join DVM Central - A multi-vendor veterinary supply store promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.',
							// 			contentUrl: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg'
							// 		},
							// 		{
							// 			'@type': 'ViewAction',
							// 			target: [
							// 				{
							// 					'@type': 'EntryPoint',
							// 					urlTemplate: 'https://play.google.com/store/apps/details?id=com.gtechsources.vetandtech.app',
							// 					actionPlatform: 'http://schema.org/AndroidPlatform'
							// 				},
							// 				{
							// 					'@type': 'EntryPoint',
							// 					urlTemplate: 'https://apps.apple.com/app/1634400448',
							// 					actionPlatform: 'http://schema.org/IOSPlatform'
							// 				}
							// 			]
							// 		}
							// 	]
							// }
						}}
					/>
				)}
				{expoData && (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'WebPage',
								name: expoData.name,
								url: expoData.slug,
								description: expoData.description,
								image: expoData.image,
								mainEntity: {
									'@context': 'https://schema.org',
									'@type': 'Event',
									name: expoData.name,
									description: expoData.long_description,
									image: expoData.image,
									startDate: expoData.startDate,
									endDate: expoData.endDate,
									eventStatus: 'https://schema.org/EventScheduled',
									eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
									location: { '@type': 'VirtualLocation', url: expoData.slug },
									organizer: { '@type': 'Organization', name: 'DVM Central', url: 'https://www.dvmcentral.com/' }
								}
							})
						}}
					/>
				)}
			</MetaTags>

			<LiteLoader className={`${modalLoading ? 'show-bd' : 'hide-bd'} modal-bg transition`} />
			{renderModal()}
			{renderVideoModal()}
			
			<Hero />
			<Features />
			
			{data?.hot_products?.length > 0 && (
				<HotProducts 
					hotProducts={data.hot_products} 
					setmodalLoading={setmodalLoading} 
					setmodal={setmodal} 
					setModalData={setModalData} 
				/>
			)}
			
			{data?.deals_of_the_day_limited?.data?.length > 0 && (
				<div ref={dealsRef}>
					{isVisible ? (
						<Suspense fallback={<LiteLoader className="show-bd" />}>
							<DealsDiscounts
								data={data.deals_of_the_day_limited.data}
								setmodalLoading={setmodalLoading}
								setmodal={setmodal}
								setModalData={setModalData}
							/>
						</Suspense>
					) : (
						<div style={{ height: '200px' }} />
					)}
				</div>
			)}
			
			{data?.featured_products?.length > 0 && (
				<FeaturedProducts 
					data={data.featured_products} 
					setmodalLoading={setmodalLoading} 
					setmodal={setmodal} 
					setModalData={setModalData} 
				/>
			)}
			
			<JoinPortal />
			
			{data?.upcoming_expo && <UpcomingExpo data={data.upcoming_expo} />}
			
			{data?.latest_products?.length > 0 && (
				<LatestProducts 
					data={data.latest_products} 
					setmodalLoading={setmodalLoading} 
					setmodal={setmodal} 
					setModalData={setModalData} 
				/>
			)}
			
			{data?.vet_practice_product_categories?.length > 0 && (
				<PracticeNeeds 
					data={data.vet_practice_product_categories} 
					setmodalLoading={setmodalLoading} 
					setmodal={setmodal} 
					setModalData={setModalData} 
				/>
			)}
			
			<SearchAVetBanners />
			
			{data?.sponsored_vendors?.length > 0 && (
				<Vendors vendors={data.sponsored_vendors} />
			)}
		</>
	)
}

export default React.memo(HomeV3)

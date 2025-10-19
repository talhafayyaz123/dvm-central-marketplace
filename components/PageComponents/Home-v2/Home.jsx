import React from 'react'
import MetaTags from '../../UI/MetaTags/MetaTags'
import Hero from './Hero/Hero'
import TopCategories from './TopCategories/TopCategories'
import TodaysDeals from './TodaysDeals/TodaysDeals'
import DealBanner from './DealBanner/DealBanner'
import NewArrivals from './NewArrivals/NewArrivals'
import Features from './Features/Features'
import IntroVideo from './IntroVideo/IntroVideo'
import Vendors from './Vendors/Vendors'
import BecomeSeller from '../../PageComponents/SellOnDvm/Hero/Hero'

const Home = ({ diffProducts, todaysDeals, newArrivalsData, vendors, banners }) => {
	console.log('diffProducts', diffProducts)
	return (
		<>
			<MetaTags title='DVM Central - A Veterinary Marketplace' keywords='Marketplace Veterinary, Animal Health Products, Vet Supply Store, Veterinary products, Veterinary supplies, Veterinary supply store,'>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta key='description' property='description' name='description' content='Join DVM Central -  A multi-vendor veterinary marketplace promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.' />
				<meta name='facebook-domain-verification' content='lpc1or8tzn0imsqw74njfaeceg4kad' />
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'http://schema.org',
							'@type': 'WebPage',
							id: 'https://www.dvmcentral.com/#homepage',
							breadcrumb: ['https://www.dvmcentral.com'],
							name: 'DVM Central',
							url: 'https://www.dvmcentral.com/',
							keywords: 'Marketplace Veterinary, Animal Health Products, Vet Supply Store, Veterinary products, Veterinary supplies, Veterinary supply store,',
							audience: [
								{ '@type': 'MedicalAudience', audienceType: 'veterinarians' },
								{ '@type': 'MedicalAudience', audienceType: 'veterinary students' },
								{ '@type': 'MedicalAudience', audienceType: 'pet owners' }
							],
							mainEntity: [
								{
									'@type': 'LocalBusiness',
									name: 'DVM Central',
									url: 'https://www.dvmcentral.com/',
									logo: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
									sameAs: ['https://www.facebook.com/DVMCentralofficial/', 'https://www.instagram.com/dvmcentralofficial/', 'https://www.youtube.com/@dvmcentralofficial', 'https://twitter.com/DVMCentral', 'https://www.linkedin.com/company/dvmcentralofficial'],
									address: { '@type': 'PostalAddress', addressCountry: 'United States', addressLocality: 'Orlando' },
									interactionStatistic: { '@type': 'InteractionCounter', userInteractionCount: 5000, interactionType: 'https://schema.org/TradeAction' },
									aggregateRating: { '@type': 'AggregateRating', ratingValue: 5, reviewCount: 3 }
								},
								{ '@type': 'VideoObject', name: 'Introducing DVM Central - A Veterinary Marketplace', description: 'Introducing DVM Central - A Veterinary Marketplace', contentUrl: 'https://vimeo.com/784554520', uploadDate: '2022-12-27 09:06:28', thumbnailUrl: 'https://vimeo.com/784554520' },
								{
									'@type': 'ImageObject',
									url: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
									name: 'DVM Central',
									description: 'Join DVM Central - A multi-vendor veterinary supply store promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.',
									contentUrl: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg'
								},
								{
									'@type': 'WebSite',
									url: 'https://www.dvmcentral.com/',
									name: 'DVM Central - Reliable Veterinary marketplace',
									description: 'Join DVM Central - A multi-vendor veterinary marketplace promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.'
								}
							]
						})
					}}
				/>

				{/* virtual expo march edition */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebPage',
							name: 'DVM Central Expo: March Edition with 2 CE Credits',
							url: 'https://dvmcentral.com/dvm-central-expo-march-edition-2-ce-credits',
							description:
								'The DVM Central Expo 2024 is a comprehensive online event that promises an invaluable opportunity for veterinarians seeking to expand their knowledge and stay updated in their practice. This interactive online expo has the following learning opportunities for the attendees. There will be two CE webinars with raffles/giveaways and a Q&A session.',
							image: 'https://dev-dvm-central-6cll2.ondigitalocean.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexpo-m-e-24.99b3a2ad.jpg&w=3840&q=75',
							mainEntity: {
								'@context': 'https://schema.org',
								'@type': 'Event',
								name: 'DVM Central Expo: March Edition with 2 CE Credits',
								description:
									'The DVM Central Expo 2024 is a comprehensive online event that promises an invaluable opportunity for veterinarians seeking to expand their knowledge and stay updated in their practice. This interactive online expo has the following learning opportunities for the attendees. There will be two CE webinars with raffles/giveaways and a Q&A session.',
								image: 'https://dev-dvm-central-6cll2.ondigitalocean.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexpo-m-e-24.99b3a2ad.jpg&w=3840&q=75 ',
								startDate: '2024-03-6T14:00-00:00',
								endDate: '2024-03-6T14:45-00:00',
								eventStatus: 'https://schema.org/EventScheduled',
								eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
								location: { '@type': 'VirtualLocation', url: 'https://dvmcentral.com/dvm-central-expo-march-edition-2-ce-credits' },
								organizer: { '@type': 'Organization', name: 'DVM Central', url: 'https://www.dvmcentral.com/' }
							}
						})
					}}
				/>
			</MetaTags>
			<Hero />
			<TopCategories diffProducts={diffProducts} />
			<TodaysDeals todaysDeals={todaysDeals} />
			<DealBanner banners={banners} />
			<BecomeSeller pageType='home-v2' />
			<NewArrivals newArrivalsData={newArrivalsData} />
			<Features />
			<IntroVideo />
			<Vendors vendors={vendors} />
			{/* <Testimonials testinmonials={testinmonials} /> */}
		</>
	)
}

export default Home

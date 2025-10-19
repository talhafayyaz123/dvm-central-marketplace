import React, { useRef } from 'react'
import Contact from './Contact/Contact'
// import CreateAccount from './CreateAccount/CreateAccount'
import FAQ from './FAQ/FAQ'
import GrowBusiness from './GrowBusiness/GrowBusiness'
import Hero from './Hero/Hero'
import Steps from './Steps/Steps'
import WhySell from './WhySell/WhySell'
import MetaTags from '../../UI/MetaTags/MetaTags'
import scrollToData from '../../../utils/scrollToData'
let gsap, ScrollToPlugin

const Sellondvm = () => {
	const growBusinessSection = useRef(null)

	const scrollToSellerFormHandler = async () => {
		if (gsap === undefined) {
			gsap = (await import('gsap')).default
			ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

			gsap.registerPlugin(ScrollToPlugin)
		}

		scrollToData(gsap, growBusinessSection?.current, 50)
	}

	console.log('ad')

	return (
		<>
			<MetaTags
				title={`Sell Veterinary Supplies Online | Join DVM Central Marketplace Today!`}
				description={`Shop or sell on DVM Central, a comprehensive range of veterinary products and supplies. Find everything you need for veterinary care in one place, with expert guidance available.`}
				keywords='marketplace veterinary, animal health products, vet supply store, veterinary products, veterinary supplies, veterinary supply store, sell veterinary products, online veterinary supplies, DVM Central sellers, Veterinary business growth, pet care products online, animal health marketplace, veterinary e-commerce, sell pet medications, veterinary supply platform'
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
									'@id': 'https://www.dvmcentral.com/sell-on-dvm/#SellonDVM',
									name: 'Sell on DVM',
									url: 'https://www.dvmcentral.com/sell-on-dvm/',
									description: "Become A Seller At DVM Central And Sell Your Veterinary Supplies However You Want! You're only a few clicks away from a great start.",
									mainEntity: {
										'@id': 'https://www.dvmcentral.com/sell-on-dvm/#SellonDVM'
									}
								},
								{
									'@type': 'LocalBusiness',
									'@id': 'https://www.dvmcentral.com',
									name: 'DVM Central',
									url: 'https://www.dvmcentral.com',
									logo: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
									sameAs: ['https://www.facebook.com/DVMCentralofficial/', 'https://www.instagram.com/dvmcentralofficial/', 'https://www.youtube.com/@dvmcentralofficial', 'https://twitter.com/DVMCentral', 'https://www.linkedin.com/company/dvmcentralofficial'],
									address: {
										'@type': 'PostalAddress',
										addressCountry: 'United States',
										addressLocality: 'Orlando'
									}
								},
								{
									'@type': 'VideoObject',
									'@id': 'https://www.dvmcentral.com/#video',
									name: 'Sell on DVM Central | Tutorial Video for New Vendors',
									description:
										'A Specialized Platform Designed Just For Sellers. Join Us To Effectively Reach The Veterinary Market. Set Up Your Store And Become A Seller Today! This is your chance to experience: The Culture Of Direct Buying, Standing Among Leading Manufacturers & Suppliers, Meeting The Needs Of A Versatile Customer Base',
									contentUrl: 'https://vimeo.com/784554520',
									uploadDate: '2024-01-16T09:07:38',
									thumbnailUrl: 'https://vimeo.com/784554520'
								},
								{
									'@type': 'ImageObject',
									'@id': 'https://www.dvmcentral.com/#image',
									url: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
									name: 'DVM Central',
									description: 'Join DVM Central - A multi-vendor veterinary supply store promoting the culture of directly buying veterinary products. Sell and purchase unlimited veterinary supplies.',
									contentUrl: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg'
								},
								{
									'@type': 'FAQPage',
									mainEntity: [
										{
											'@type': 'Question',
											name: 'What is DVM Central?',
											acceptedAnswer: {
												'@type': 'Answer',
												text: 'DVM Central is a veterinary marketplace that promotes the culture of direct buying by connecting manufacturers and suppliers of veterinary health products with customers.'
											}
										},
										{
											'@type': 'Question',
											name: 'Why should I join DVM Central?',
											acceptedAnswer: {
												'@type': 'Answer',
												text: 'If you are a manufacturer or wholesaler of animal health products, you can join the DVM to grow your business. On the other hand, if you are a buyer of animal health products or veterinary supplies, DVM Central is the best place to buy directly at a cost-efficient price.'
											}
										},
										{
											'@type': 'Question',
											name: 'Does DVM offer any deals for buyers using DVM Central?',
											acceptedAnswer: {
												'@type': 'Answer',
												text: 'Yes, DVM offers deals and discounts to buyers. You can learn about new deals by navigating to “Today’s Deal” from the main menu.'
											}
										},
										{
											'@type': 'Question',
											name: 'Is my purchase secure?',
											acceptedAnswer: {
												'@type': 'Answer',
												text: 'All purchases from DVM are securely processed, as we understand our obligation to protect your information. We don’t store or share customers’ credit card details on our servers. All payments are done through Stripe over the SSL protocol on secure servers.'
											}
										},
										{
											'@type': 'Question',
											name: 'Is DVM Central a wholesaler or a distributor of veterinary products?',
											acceptedAnswer: {
												'@type': 'Answer',
												text: 'DVM Central is a marketplace for wholesalers and manufacturers, not distributors. Here, manufacturers and wholesalers of veterinary health supplies can sell their products.'
											}
										},
										{
											'@type': 'Question',
											name: 'Interact Directly With Your Customers',
											acceptedAnswer: {
												'@type': 'Answer',
												text: 'We are promoting the culture of direct buying. Selling direct to clinics & customers online is simple now. Deal with the customers on your own terms.'
											}
										},
										{
											'@type': 'Question',
											name: 'Professional Customer Service For Your Store',
											acceptedAnswer: {
												'@type': 'Answer',
												text: 'We have designed a dashboard to assist sellers in setting up and growing their business online. Sellers can get help by contacting us through online support.'
											}
										}
									]
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
			<Hero scrollToSellerFormHandler={scrollToSellerFormHandler} />
			<Steps scrollToSellerFormHandler={scrollToSellerFormHandler} />
			<GrowBusiness growBusinessSection={growBusinessSection} />
			<Contact />
			<WhySell />
			<FAQ />
			{/* <CreateAccount /> */}
		</>
	)
}

export default Sellondvm

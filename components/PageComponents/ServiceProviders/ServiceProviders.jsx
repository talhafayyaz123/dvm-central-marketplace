import React, { useRef, useState } from 'react'
import ListingLayout from '../../UI/ListingLayout/ListingLayout'
import LeftCol from '../../UI/ListingLayout/LeftCol/LeftCol'
import RightCol from '../../UI/ListingLayout/RigthCol/RightCol'
import styles from './ServiceProviders.module.css'
import Listing from './Listing/Listing'
import LeftColContent from './LeftColContent/LeftColContent'
import Search from './Search/Search'
import MetaTags from '../../UI/MetaTags/MetaTags'
import HeroBanner from '../../UI/HeroBanner/HeroBanner'
import banner from '../../../public/imgs/service-providers/Service Provider.png'
import { LiteLoader } from '../../Loader/Loader'
import { imgApiUrl } from '../../../utils/config'

const ServiceProviders = ({ serviceProviders }) => {
	const [initialData, setinitialData] = useState(serviceProviders?.serviceProviders)
	const [loading, setloading] = useState(false)
	const [showMoreInfo, setshowMoreInfo] = useState(false)
	const resultWrapper = useRef(null)

	return (
		<>
			<LiteLoader className={`${loading ? 'show-bd' : 'hide-bd'} modal-bg transition`} />
			<MetaTags
				title='Find Top Veterinary Services at DVM Central - Expert Veterinary Care'
				description='Connect with trusted veterinary service providers at DVM Central. Explore a comprehensive range of expert services tailored to meet all your pet care needs efficiently and reliably.'
				keywords='Veterinary service providers, expert pet care services, veterinary specialists, trusted vet services, DVM Central veterinary care, pet health services, animal care professionals, veterinary consultations, veterinary treatment providers, professional vet services'
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
									'@context': 'https://schema.org',
									'@type': 'BreadcrumbList',
									itemListElement: [
										{
											'@type': 'ListItem',
											position: 1,
											item: {
												'@id': 'https://www.dvmcentral.com',
												name: 'DVM Central - A Veterinary Marketplace'
											}
										},
										{
											'@type': 'ListItem',
											position: 2,
											item: {
												'@id': 'https://www.dvmcentral.com/service-providers',
												name: 'Service Providers'
											}
										}
									]
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
									'@id': 'https://www.dvmcentral.com/#service-providers',
									name: 'DVM Central | Trusted Veterinary Services Providers - Expert Care for Your Pets',
									url: 'https://www.dvmcentral.com/service-providers',
									description: "Experience expert veterinary care by professionals at DVM Central. Our trusted services cater to your pet's health and well-being.",
									mainEntity: {
										'@type': 'ItemList',
										url: 'https://www.dvmcentral.com/service-providers',
										itemListElement: serviceProviders?.seo_data?.map((data, index) => {
											const { name, slug, logo, meta_description } = data
											return {
												'@type': 'ListItem',
												position: index + 1,
												item: {
													'@type': 'Brand',
													name: name,
													url: `https://www.dvmcentral.com/service-providers/${slug}`,
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
								}
							]
						})
					}}
				/>
			</MetaTags>

			<HeroBanner className={`${styles.hero_banner} gradient-sec`} title='Are You In Search of Veterinary Services?' info='Explore the best veterinary service providers, organized into categories for your convenience.' src={banner} />
			<Search setinitialData={setinitialData} />
			<ListingLayout>
				<LeftCol className={styles.services_list}>
					<LeftColContent data={serviceProviders} serviceProviderCategories={serviceProviders?.service_provider_categories} setinitialData={setinitialData} setloading={setloading} resultWrapper={resultWrapper} />
				</LeftCol>
				<RightCol>
					<Listing initialData={initialData} resultWrapper={resultWrapper} />
				</RightCol>
			</ListingLayout>

			{/* sevice provider content */}
			<div className='sec-container'>
				<div className={styles.hr_container} />
			</div>

			<section className='sec-container dynamic-data'>
				<div className='sec-pb'>
					<h2>Find the Perfect Veterinary Services at DVM Central Marketplace</h2>
					<p>DVM Central Marketplace is the one-stop shop for advanced veterinary services and products suitable for modern veterinary practices.</p>
					<p>So, whether you are a solo veterinarian, a multi-practice entity, or a specialized clinic, we have specifically selected the best services to improve patient care and practice management.</p>
					<p>At our platform, veterinarians can reach trusted service providers to ensure increased efficiency, productivity, and patient outcomes.</p>
					<h2>Expert Veterinary Specialty Services for Every Practice</h2>
					<p>We have enlisted a wide range of veterinary specialty services to fulfill distinct practice needs.</p>
					<p>From the administrative tasks of overseeing financial matters to veterinary software solutions, our platform has been wide enough to have companies and services that appreciate the challenges of the veterinary practice.{!showMoreInfo ? '...' : ''}</p>

					{!showMoreInfo && (
						<div>
							<button className={`${styles.read_more} primary-btn white-color`} onClick={() => setshowMoreInfo(true)}>
								Read More
							</button>
						</div>
					)}
					{showMoreInfo && (
						<>
							<p>Here are some of the top veterinary service providers available on our platform:</p>
							<ul>
								<li>Servistree Veterinary Payments</li>
								<li>ESS Service</li>
								<li>360 Vet Sales</li>
								<li>VetSkribe</li>
								<li>And many more</li>
							</ul>
							<h2>Essential Services for Every Veterinary Practice</h2>
							<p>DVM Central platform is designed to connect veterinarians with essential service providers that can enhance operational efficiency.</p>
							<p>Whether you’re looking for veterinarian services that help streamline day-to-day activities or companies that offer cutting-edge technology to keep your clinic ahead, we have it all.</p>

							<ul>
								<li>VisioCare Services</li>
								<li>NewLane Finance</li>
								<li>ClienTrax</li>
							</ul>
							<h2>Supporting the Well-Being of Veterinarians</h2>
							<p>Our platform includes resources dedicated to the behavioral health and overall well-being of veterinary professionals.</p>
							<p>For example, NOMV (Not One More Vet) and the Veterinary Well-Being Buddy provide support for veterinarians facing stress, burnout, or other challenges.</p>
							<h2>Why Choose DVM Central Veterinary Services?</h2>
							<p>We are dedicated to covering everything our clients could potentially require in the fast-paced world of veterinary practice.</p>
							<p>The marketplace makes certain that veterinarians effortlessly locate and collaborate with providers, such as Brian&apos;s Bandages, Independent Veterinary Practitioners Association, and Pet Parents United, to enhance their practice in every way possible.</p>

							<p>Choosing DVM Central allows veterinarians to join successful and efficient practices.</p>
							<p>Sign up with us today and benefit from our line of veterinary services and improve your practice!</p>
						</>
					)}
				</div>
			</section>
		</>
	)
}

export default ServiceProviders

import React from 'react'
import AboutUs from '../components/PageComponents/LandingPage/AboutUs/AboutUs'
import MetaTags from '../components/UI/MetaTags/MetaTags'

const aboutus = () => {
	return (
		<div>
			<MetaTags title='About Us | DVMCentral' description='DVMCentral is a multi-vendor platform for veterinary products. We are promoting the culture of direct selling and buying vet items from a reliable marketplace.' keywords=''>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'AboutPage',
							mainEntity: {
								'@type': 'Organization',
								name: 'DVM Central',
								url: 'https://www.dvmcentral.com',
								logo: 'https://www.dvmcentral.com/_next/static/media/dvm-logo.3a894e44.svg',
								description: 'DVM Central is a veterinary marketplace for animal health products. We aim to bring suppliers and buyers under the same roof to promote the culture of direct buying. Our goal is to make the buying and selling of veterinary supplies easier.',
								address: {
									'@type': 'PostalAddress',
									streetAddress: '4700 Millenia Boulevard Suite 175 Orlando, FL 32839',
									addressLocality: 'Orlando',
									addressRegion: 'Florida',
									postalCode: '32839',
									addressCountry: 'United States'
								},
								contactPoint: {
									'@type': 'ContactPoint',
									telephone: '+15165937101',
									contactType: 'Customer Support'
								},
								sameAs: ['https://www.facebook.com/dvmcentralofficial', 'https://twitter.com/DvmCentral', 'https://www.linkedin.com/company/dvmcentral/', 'https://www.instagram.com/dvmcentralofficial/', 'https://www.youtube.com/@dvmcentral'],
								keywords: ''
							}
						})
					}}
				/>
			</MetaTags>
			<AboutUs />
		</div>
	)
}

export default aboutus

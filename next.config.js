// const nextConfig = {
// 	reactStrictMode: true,
// 	swcMinify: true,
// 	images: {
// 		domains: ['localhost', 'web.dvmcentral.com', 'gravatar.com']
// 	}
// }

// module.exports = nextConfig

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
			  protocol: 'http',
			  hostname: '127.0.0.1',
			  port: '8001',
			  pathname: '/storage/**', // Adjust based on your actual image path
			},
		  ],
		domains: ['localhost', 'web.dvmcentral.com','127.0.0.1', 'dev.web.dvmcentral.com', 'gravatar.com', 'shippo-static.s3.amazonaws.com', 'dev.seller.dvmcentral.com', 'seller.dvmcentral.com', 'dev.api.vetrepfinder.com', 'api.vetrepfinder.com']
	},
	redirects: async () => {
		const redirect_links = [
			'/winged-dental-elevator-set-of-4-with-straight-tip-having-standard-handle',
			'/sellonvetandtech',
			'/api/v2/gelpi-offset-arm-left-right',
			'/vendors/rh-veterinary-solutions',
			'/vendors/talha-testing',
			'/vendors/carrco',
			'/surgical-instruments/dental-kits-packs/germed-periostomes-kit',
			'/lister-bandage-scissors-3-12_1677504556',
			'/lister-bandage-scissors-8-with-one-large-ring_1677505450',
			'/lister-bandage-scissors-8-angled-tungsten-carbide-one-large-ring_1677825462',
			'/lister-bandage-scissors-8-supercut-one-large-ring_1677563366',
			'/hi-level-bandage-scissors-5-12-supercut_1691143549',
			'/hi-level-bandage-scissors-4-12-supercut_1691143533'
		]

		const redirects = redirect_links.map((url) => {
			return { source: url, destination: '/', permanent: true }
		})

		redirects.push(
			{
				source: '/resources/onlineresources',
				destination: 'https://www.vetandtech.com/resources/online-resources',
				permanent: true
			},
			{
				source: '/dvm-central-marketplace-virtual-demonstration-conference',
				destination: '/virtual-expo/dvm-central-marketplace-virtual-expo',
				permanent: true
			},
			{
				source: '/dvm-central-marketplace-virtual-demonstration',
				destination: '/virtual-expo/dvm-central-marketplace-virtual-expo',
				permanent: true
			},
			{
				source: '/dvm-central-expo-lunch-learn',
				destination: '/virtual-expo/summer-expo-at-dvm-central',
				permanent: true
			},

			{
				source: '/dvm-central-expo-july-edition',
				destination: '/virtual-expo/summer-expo-at-dvm-central',
				permanent: true
			},

			{
				source: '/past-expo/dvm-central-marketplace-virtual-expo',
				destination: '/virtual-expo/dvm-central-marketplace-virtual-expo',
				permanent: true
			},

			{
				source: '/past-expo/dvm-central-expo-march-edition-2-ce-credits',
				destination: '/virtual-expo/dvm-central-expo-march-edition-2-ce-credits',
				permanent: true
			},
			{
				source: '/past-expo/summer-expo-at-dvm-central',
				destination: '/virtual-expo/virtual-exposummer-expo-at-dvm-central',
				permanent: true
			},
			{
				source: '/past-expo/dvm-central-expo-august-edition',
				destination: '/virtual-expo/dvm-central-expo-august-edition',
				permanent: true
			},

			{
				source: '/dvm-central-marketplace-virtual-expo',
				destination: '/virtual-expo/dvm-central-marketplace-virtual-expo',
				permanent: true
			},

			{
				source: '/dvm-central-expo-march-edition-2-ce-credits',
				destination: '/virtual-expo/dvm-central-expo-march-edition-2-ce-credits',
				permanent: true
			},
			{
				source: '/summer-expo-at-dvm-central',
				destination: '/virtual-expo/summer-expo-at-dvm-central',
				permanent: true
			},
			{
				source: '/dvm-central-expo-august-edition',
				destination: '/virtual-expo/dvm-central-expo-august-edition',
				permanent: true
			},

			{
				source: '/vendors/warehouse',
				destination: '/vendors/vetflex',
				permanent: true
			},
			{
				source: '/virtual-expo/diagnosis-and-treatment-of-diseases-of-the-feline-oral-cavity',
				destination: '/virtual-expo/dvm-central-expo-dental-edition-powered-by-vetandtech',
				permanent: false
			},
			{
				source: '/virtual-expo/virtual-learn-at-lunch-webinar',
				destination: '/virtual-expo/virtual-learn-at-lunch-webinar-powered-by-dvm-central-marketplace',
				permanent: true
			},
			{
				source: '/blogs/who-founded-vetrimax-and-what-inspired-its-creation',
				destination: '/blogs/introducing-vetrimax-novel-products-for-veterinary-dermatology',
				permanent: true
			},
			{
				source: '/blogs/why-every-animal-caregiver-needs-the-armor-hand-glove',
				destination: '/blogs/from-injury-to-impact-how-armor-hand-glove-came-to-be',
				permanent: true
			},
			{
				source: '/blogs/why-the-usb-videoscope-redefines-veterinary-diagnostics',
				destination: '/blogs/a-new-era-in-endoscopy-how-endoscopy-support-services-inc-is-changing-the-game',
				permanent: true
			},
			{
				source: '/blogs/can-veterinary-well-being-buddy-boost-your-growth-in-professional-life',
				destination: '/blogs/building-a-company-around-veterinary-empowerment-how-veterinary-well-being-buddy-stands-apart',
				permanent: true
			}
		)

		return redirects
	}
})

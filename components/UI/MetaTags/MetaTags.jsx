import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const MetaTags = ({ title, description, keywords, children, schema, ogImg, ogHeight, ogWidth, pageType }) => {
	const router = useRouter()

	// for live site
	const baseUrl = 'https://www.dvmcentral.com'
	const [canonicalUrl, setCanonicalUrl] = useState('')

	useEffect(() => {
		const url = pageType === 'Business_types' && router?.asPath?.includes('/supplies') ? `${baseUrl}/shop-now` : `${baseUrl}${router?.asPath.split('?')[0]}`
		setCanonicalUrl(url)
	}, [router.asPath, pageType, baseUrl])

	return (
		<Head>
			{router?.asPath !== '/' && (
				<>
					<meta charSet='UTF-8' />
					<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
					<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				</>
			)}

			{/* SEO */}
			<title>{title ? title : 'DVM Central - A Marketplace Veterinary | Buy Direct, Save More'}</title>
			{router?.pathname !== '/' && <meta key='description' property='description' name='description' content={description ? description : 'Explore a marketplace for animal health products. Join this vet supply store to sell or buy veterinary items. Buy The Right Products At The Right Place.'} />}
			<meta key='keywords' property='keywords' name='keywords' content={keywords} />
			<meta key='author' property='author' name='author' content='GTechSources' />

			<link rel='preload' href='/fonts/Poppins/Poppins-Regular.ttf' crossOrigin='anonymous' as='font' type='font/ttf' />
			<link rel='preload' href='/fonts/Poppins/Poppins-Medium.ttf' crossOrigin='anonymous' as='font' type='font/ttf' />
			<link rel='preload' href='/fonts/Poppins/Poppins-SemiBold.ttf' crossOrigin='anonymous' as='font' type='font/ttf' />

			{/* live site canonical */}
			<link href={canonicalUrl} rel='canonical' />

			{/* Google Tag Manager */}
			{/* <script
				dangerouslySetInnerHTML={{
					__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-TKTGZQ9G');
                     `
				}}
			/> */}

			{/* for windows */}
			<meta name='msapplication-TileColor' content='#fff' />
			<meta name='msapplication-TileImage' content='/logox32.png' />
			<meta name='msapplication-config' content='/browserconfig.xml' />

			{/* for facebook sharing  */}
			<meta key='og-title' property='og:title' content={title} />
			<meta key='og-site' property='og:site_name' content={description} />
			<meta key='og-url' property='og:url' content={`https://www.dvmcentral.com${router?.asPath}`} />
			<meta key='og-description' property='og:description' content={description} />
			<meta key='og-type' property='og:type' content='website' />
			<meta key='og-image' property='og:image' content={ogImg ? ogImg : 'https://www.dvmcentral.com/og-logo.jpg'} />
			<meta key='og-width' property='og:image:width' content={ogWidth ? ogWidth : 1200} />
			<meta key='og-height' property='og:image:height' content={ogHeight ? ogHeight : 630} />

			{/* for twitter sharing */}
			<meta key='twitter-card' name='twitter:card' content='summary_large_image' />
			<meta key='twitter-site' name='twitter:site' content='https://twitter.com/DvmCentral' />
			<meta key='twitter-creator' name='twitter:creator' content='https://twitter.com/DvmCentral' />
			<meta key='twitter-title' name='twitter:title' content={title} />
			<meta key='twitter-description' name='twitter:description' content={description} />
			<meta key='twitter-image' name='twitter:image' content={ogImg} />

			{/* favicons */}
			<link rel='shortcut icon' type='image/png' sizes='16x16' href='/logox16.png' />
			<link rel='shortcut icon' type='image/png' sizes='32x32' href='/logox32.png' />
			<link rel='apple-touch-icon' sizes='180x180' type='image/png' href='/logox180.png' />
			<link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
			<link rel='mask-icon' href='/dvm-white-logo.svg' color='#fff' />

			{children}
		</Head>
	)
}

export default MetaTags

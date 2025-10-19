export const GTM_ID = 'GTM-W8CK3JX'

export const pageview = (url) => {
	if (typeof window !== 'undefined' && window.dataLayer) {
		window.dataLayer.push({
			event: 'pageview',
			page: url
		})
	}
}

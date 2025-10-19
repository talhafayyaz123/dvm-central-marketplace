import React from 'react'
import LPFooterNavigation from './LPFooterNavigation/LPFooterNavigation'
import LPNewsletter from './LPNewsletter/LPNewsletter'
import LPRights from './LPRights/LPRights'
const LandingPageFooter = () => {
	return (
		<footer className='lp-footer'>
			<LPNewsletter />
			<LPFooterNavigation />
			<LPRights />
		</footer>
	)
}

export default LandingPageFooter

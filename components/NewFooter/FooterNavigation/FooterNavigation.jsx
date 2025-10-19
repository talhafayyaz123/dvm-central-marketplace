import React from 'react'
// import BusinessDetail from './BusinessDetail'
import BuyWithConfidence from './BuyWithConfidence'
import FindUs from './FindUs'
import styles from './FooterNavigation.module.css'
// import { baseApiUrl } from '../../../utils/config'
import CategoriesLinks from './CategoriesLinks'
// import DownloadApp from './DownloadApp/DownloadApp'
import Newsletter from './Newsletter/Newsletter'

const FooterNavigation = () => {
	return (
		<div className={`${styles.footer_wrapper} sec-p`}>
			{/* <BusinessDetail /> */}
			<FindUs />
			<CategoriesLinks />
			<BuyWithConfidence />
			<Newsletter />
		</div>
	)
}

export default FooterNavigation

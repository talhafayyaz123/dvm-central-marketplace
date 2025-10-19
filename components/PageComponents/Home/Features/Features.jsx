import React from 'react'
import styles from './Features.module.css'
import sellIcon from '../../../../public/icons/features/sell.svg'
import supportIcon from '../../../../public/icons/features/support.svg'
import guaranteeIcon from '../../../../public/icons/features/guarantee.svg'
import commitmentIcon from '../../../../public/icons/features/commitment.svg'
import FeatureCard from './FeatureCard/FeatureCard'

const Features = () => {
	return (
		<section className='features-container sec-mt'>
			<div className={`${styles.features_wrapper} sec-container`}>
				<FeatureCard src={sellIcon} title='Become Seller on DVM Central'>
					<div className={`${styles.feature_detail}`}>
						<div>Join an Exclusive Marketplace</div>
					</div>
				</FeatureCard>
				<FeatureCard src={supportIcon} title='24 / 7 Customer service'>
					<div className={`${styles.feature_detail}`}>
						<div>
							<a href='tel:+1(407) 557 6073'>+1(407) 557 6073</a>
						</div>
						<div>info@dvmcentral.com</div>
					</div>
				</FeatureCard>
				<FeatureCard src={guaranteeIcon} title='Best Industry Guarantee'>
					<div className={`${styles.feature_detail}`}>
						<div>Quality Lifetime Guarantee</div>
					</div>
				</FeatureCard>
				<FeatureCard src={guaranteeIcon} title='Our Commitments'>
					<div className={`${styles.feature_detail}`}>
						<div>Actively working to help our fellow veterinarian</div>
					</div>
				</FeatureCard>
			</div>
		</section>
	)
}

export default Features

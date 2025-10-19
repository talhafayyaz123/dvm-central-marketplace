import React from 'react'
import styles from './Features.module.css'
import sellIcon from '../../../../public/icons/features/sell.svg'
import supportIcon from '../../../../public/icons/features/support.svg'
import guaranteeIcon from '../../../../public/icons/features/guarantee.svg'
import FeatureCard from './FeatureCard/FeatureCard'

const Features = () => {
	return (
		<section className='features-container sec-mt'>
			<div className='sec-container'>
				<h2 className={styles.heading}>Why Choose Us?</h2>
				<div className={`${styles.features_wrapper} inner-sec-mt`}>
					<FeatureCard src={sellIcon} title='Become Seller on DVM Central'>
						<div className={`${styles.feature_detail}`}>
							<div>Join an Exclusive Marketplace</div>
						</div>
					</FeatureCard>
					<FeatureCard src={supportIcon} title='24/7 Customer Service '>
						<div className={`${styles.feature_detail}`}>
							<a href='tel:+1(407) 557 6073'>+1(407) 557 6073</a>
							<a href='mailto:info@dvmcentral.com'>info@dvmcentral.com</a>
						</div>
					</FeatureCard>
					<FeatureCard src={guaranteeIcon} title='Best Industry Guarantee'>
						<div className={`${styles.feature_detail}`}>
							<div>Quality Lifetime Guarantee</div>
						</div>
					</FeatureCard>
					<FeatureCard src={guaranteeIcon} title='Our Commitments'>
						<div className={`${styles.feature_detail}`}>
							<div>Actively Working to Help Veterinary Professionals</div>
						</div>
					</FeatureCard>
				</div>
			</div>
		</section>
	)
}

export default Features

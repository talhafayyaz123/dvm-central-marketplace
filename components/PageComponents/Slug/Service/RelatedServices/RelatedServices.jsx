import React from 'react'
import styles from './RelatedServices.module.css'

import ServiceCard from '../../../../UI/ServiceCard/ServiceCard'

const RelatedServices = ({ data }) => {
	return (
		<>
			<section className={`${styles.realted_container} inner-sec-pt`}>
				<div className='sec-container'>
					<div className='inner-sec-pb'>
						<h4>Related Services</h4>
						<div className={styles.cards_wrapper}>
							{data?.map((data) => {
								return <ServiceCard key={data?.id} data={data} />
							})}
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default RelatedServices

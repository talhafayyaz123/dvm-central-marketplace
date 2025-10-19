import React, { useState } from 'react'
import Hero from './Hero/Hero'
import RelatedServices from './RelatedServices/RelatedServices'
import TabContent from './TabContent/TabContent'

const Service = ({ result }) => {
	const [displayType, setdisplayType] = useState('description')
	return (
		<>
			<Hero data={result} />

			<TabContent displayType={displayType} setdisplayType={setdisplayType} description={result?.service?.full_description} vendorId={result?.vendor?.id} serviceId={result?.service?.id} rating={result?.service_rating} ratingBars={result?.rating_segrigation} reviewCount={result?.reviews_count} />
			{result?.related_services?.length > 0 && <RelatedServices data={result?.related_services} />}
		</>
	)
}

export default Service

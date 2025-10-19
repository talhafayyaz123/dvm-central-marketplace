import React from 'react'
import styles from './VetPlatform.module.css'
import VetHeading from '../../../UI/VetHeading/VetHeading'

const VetPlatform = () => {
	return (
		<div>
			<div></div>
			<VetHeading
				span1='One'
				heading='Platform'
				span2='For All!'
				para={`
Whether you're a manufacturer looking to launch a new product, a vendor needing extra hands, or a rep seeking temporary roles, VetReps Finder is for all. Our platform brings together all the resources you need in one place. Post job listings, search for talented professionals, or find your next temporary role with ease. With a focus on efficiency and quality, we connect the best talent with the right opportunities.`}
				type='platform'
			/>
		</div>
	)
}

export default VetPlatform

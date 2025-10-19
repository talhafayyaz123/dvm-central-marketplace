import React from 'react'
import styles from './OurMission.module.css'

const OurMission = () => {
	return (
		<div className={`${styles.policy} sec-m`}>
			<div className={`${styles.inner_wrapper} sml-sec-container`}>
				<h2 className='secondary-color'>Our Mission</h2>
				<p>{`Our mission is to provide the best online veterinary resources to meet the needs of veterinary professionals. With our interactive and user-friendly online platforms, we are stepping forward with a vision!`}</p>
				<p>
					{`The ultimate goal of Vet and Tech is to provide the very best veterinary continuing education. Our passionate team works diligently to bring all veterinary-related resources, such as CE courses, webinars, guides, blogs, etc., onto a single platform. We believe in going the extra mile to make access to educational sources easier to save time and direct professionals' focus on what really matters.`}
				</p>
				<p>
					{`Our DVM Central, which is a marketplace veterinary, facilitates vet professionals and animal healthcare centers to make healthy choices every day. We promote the culture of direct buying from sellers and manufacturers of veterinary health supplies. We are devoted to enabling veterinary professionals to access the world's best veterinary medical, technical, and surgical supplies.`}
				</p>
				<p>
					{`Our portal, VT Friends, is a user-friendly social networking platform for veterinary professionals. We strive to connect professionals in the veterinary field with our socializing forum. Our social networking platform encourages interaction between like-minded people. It enables veterinarians, veterinary technicians, veterinary nurses, and students to share their posts with their peers.`}
				</p>

				<p>
					{`By offering customer-centric portals, we aim to contribute to the health industry for a better cause. We've made it our mission to live up to the tenants of our core values; Transparency, Operational Excellence, Proactive, and Innovation.`}
				</p>
			</div>
		</div>
	)
}

export default OurMission

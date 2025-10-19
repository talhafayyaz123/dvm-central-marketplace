import React, { useContext, useState } from 'react'
import styles from './LearnandLunch.module.css'
import HeroBanner from '../../UI/HeroBanner/HeroBanner'
import VendorsCards from '../../UI/VendorsCards/VendorsCards'
import Modal from '../../UI/Modal/Modal'
import ContactVendor from '../Slug/Vendor/HotSelling/LeftColContent/ContactVendor/ContactVendor'
import { lockScroll } from '../../../utils/scrollLock'
import MetaTags from '../../UI/MetaTags/MetaTags'
import heroImg from '/public/imgs/learn-lunch-page.png'
import { GlobalProvider } from '../../../context/AppProvider'

const LearnandLunch = ({ data }) => {
	const [showMeetingModal, setshowMeetingModal] = useState(false)

	const [meetingFormSubmit, setmeetingFormSubmit] = useState(false)
	const [activeVendor, setactiveVendor] = useState({})

	const { loginUser } = useContext(GlobalProvider)

	return (
		<>
			<MetaTags title={`Elevate Your Clinic's Knowledge with DVM Central's Learn at Lunch`} />
			<Modal modal={showMeetingModal} setmodal={setshowMeetingModal} modalType={meetingFormSubmit ? 'meeting' : undefined}>
				{showMeetingModal && (
					<ContactVendor
						type='meeting'
						vendorId={activeVendor?.id}
						vendorName={activeVendor?.name}
						user={loginUser}
						showMeetingModal={showMeetingModal}
						setshowMeetingModal={setshowMeetingModal}
						meetingFormSubmit={meetingFormSubmit}
						setmeetingFormSubmit={setmeetingFormSubmit}
						appointmentData={activeVendor?.schedules}
					/>
				)}
			</Modal>

			<HeroBanner title={`Elevate Your Clinic's Knowledge with DVM Central's Learn at Lunch`} src={heroImg} />
			<div className='inner-sec-p'>
				<div className='sec-container'>
					<p className='gray-color'>
						{`Discover a revolutionary way to stay ahead with DVM Central's Learn at Lunch. Our virtual meetings connects clinics with top manufacturers, delivering bite-sized sessions packed with industry insights and product showcases. Say goodbye to travel hassles—simply log in from anywhere, grab
						your lunch, and dive into a world of knowledge.`}
					</p>{' '}
					<p className={`${styles.text} gray-color`}>
						{`Engage directly with experts, ask questions, and network with peers, all while enhancing veterinary care and streamlining clinic operations. Join us in transforming lunch breaks into learning opportunities. With DVM Central's Learn at Lunch, education has never been more accessible or
						convenient. Stay ahead of the curve and elevate your clinic's expertise with our dynamic virtual sessions. Whether you're seeking innovative treatment options or looking to optimize your practice, Learn at Lunch offers the insights and connections you need to thrive in today's veterinary
						landscape.`}
					</p>{' '}
					{data?.vendors?.length > 0 && (
						<div className='inner-sec-pt'>
							<h2 className={styles.title}>Reserve Virtual Meeting</h2>
							<div className={styles.vendors_wrapper}>
								{data?.vendors?.map((vendor) => {
									return <VendorsCards key={vendor?.id} data={vendor} type='meeting' onClick={() => (setshowMeetingModal(true), setactiveVendor(vendor), lockScroll())} />
								})}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default LearnandLunch

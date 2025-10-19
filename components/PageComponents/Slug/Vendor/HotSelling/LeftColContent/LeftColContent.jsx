import React from 'react'
import ContactVendor from './ContactVendor/ContactVendor'
import ImgWithLoader from '../../../../../UI/ImgWithLoader/ImgWithLoader'
// import Filters from './Filters/Filters'
import leftColImg from '/public/imgs/vendor/left-col-banner.svg'
import topBigImg from '/public/imgs/vendor/top-big-img.svg'
import mobImg from '/public/imgs/vendor/mob-img.svg'
import styles from './LeftColContent.module.css'
import { lockScroll } from '../../../../../../utils/scrollLock'

const LeftColContent = ({ vendorId, setshowMeetingModal, appointment, userAddress, loginUser, userPosition }) => {
	return (
		<>
			{/* <Filters /> */}
			{appointment && userPosition !== undefined && userPosition !== 'Sales Rep' && (
				<>
					<ImgWithLoader className={styles.left_img} src={leftColImg} width={324} height={254} alt='Learn at Lunch' onClick={() => (setshowMeetingModal(true), lockScroll())} />
					<ImgWithLoader className={styles.top_img} src={topBigImg} width={922} height={300} alt='Learn at Lunch' onClick={() => (setshowMeetingModal(true), lockScroll())} />
					<ImgWithLoader className={styles.mob_img} src={mobImg} width={587} height={300} alt='Learn at Lunch' onClick={() => (setshowMeetingModal(true), lockScroll())} />
				</>
			)}
			<ContactVendor vendorId={vendorId} setshowMeetingModal={setshowMeetingModal} userAddress={userAddress} loginUser={loginUser} userPosition={userPosition} />
		</>
	)
}

export default LeftColContent

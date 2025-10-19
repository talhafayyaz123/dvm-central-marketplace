import React, { useContext, useRef, useState } from 'react'
import Modal from '../../../UI/Modal/Modal'
import VirtualExpoInfo from './VirtualExpoInfo/VirtualExpoInfo'
import MetaTags from '../../../UI/MetaTags/MetaTags'
import RegisterForm from './RegisterForm/RegisterForm'
import axios from 'axios'
import { baseApiUrl } from '../../../../utils/config'
import { lockScroll } from '../../../../utils/scrollLock'
import styles from './VirtualExpoDetail.module.css'
import IframeWithLoader from '../../../UI/IframeWithLoader/IframeWithLoader'
import { useRouter } from 'next/router'
import { GlobalProvider } from '../../../../context/AppProvider'

const VirtualExpoDetail = ({ result }) => {
	const { loginUser, userData } = useContext(GlobalProvider)

	const [modal, setmodal] = useState(false)
	const [userProfileDataExists, setuserProfileDataExists] = useState(false)

	const [loading, setloading] = useState(false)
	const [imgclickLoading, setimgclickLoading] = useState(false)
	const [btnDisabled, setbtnDisabled] = useState(false)
	const [showVideoModal, setshowVideoModal] = useState(false)
	const [videoSrc, setvideoSrc] = useState(null)
	const [checkingUserData, setcheckingUserData] = useState(loginUser?.id !== undefined ? false : true)

	const imgRef = useRef(null)
	const videoModalRef = useRef(null)

	const router = useRouter()

	const checkUserVirtualExpoData = async (email) => {
		let reqData

		if (loginUser?.id !== undefined) {
			setloading(true)
			setbtnDisabled(true)

			reqData = {
				user_id: loginUser?.email,
				webinar_ids: [result?.webinar?.id],
				session: loginUser?.id !== undefined ? true : false,
				registered_from: 'DVM Central'
			}
		} else {
			reqData = {
				email,
				webinar_ids: [result?.webinar?.id],
				session: loginUser?.id !== undefined ? true : false,
				registered_from: 'DVM Central'
			}
		}
		const res = await axios.post(`${baseApiUrl}/user-virtual-expo-info`, reqData)

		console.log('res from expo check', res)

		setuserProfileDataExists(res?.data)
		if (loginUser?.id !== undefined) {
			setloading(false)
			setbtnDisabled(false)
			setmodal(true)
			lockScroll()
		}
	}
	return (
		<>
			<Modal className={showVideoModal && styles.hide_form} registerType='ListingPage' modal={modal} setmodal={setmodal} modalType={!userProfileDataExists?.user_webinar_data_exists ? 'expo-form' : 'expo-register'} videoModalRef={videoModalRef} setcheckingUserData={setcheckingUserData}>
				{modal && (
					<RegisterForm
						modalData={result?.webinar?.id}
						modal={modal}
						setModal={setmodal}
						latestWebinarId={result?.webinar?.id}
						userProfileDataExists={userProfileDataExists}
						userId={loginUser?.id}
						setshowVideoModal={setshowVideoModal}
						setvideoSrc={setvideoSrc}
						router={router}
						checkingUserData={checkingUserData}
						setcheckingUserData={setcheckingUserData}
						checkUserVirtualExpoData={checkUserVirtualExpoData}
						loginUser={loginUser}
					/>
				)}
			</Modal>

			<div ref={videoModalRef} className={`${styles.video_modal_container} transition ${showVideoModal && styles.show_video}`}>
				<div className={styles.inner_container}>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--black)' className={`${styles.video_close} full-radius`} onClick={() => (setvideoSrc(null), setshowVideoModal(false))}>
						<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
					</svg>
					<div className={styles.video_modal_wrapper}>
						<IframeWithLoader loaderColor='white' className={styles.video} src={videoSrc} title='How to register for virtual expo' />
					</div>
				</div>
			</div>
			<MetaTags title={result?.webinar?.meta_title} description={result?.webinar?.meta_description} keywords={result?.webinar?.meta_keywords}>
				{router?.asPath === '/virtual-expo/dvm-central-marketplace-virtual-expo' ? (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'Event',
								name: 'DVM Central Marketplace Virtual Demonstration Conference',
								description: 'This online event is going to be a rewarding opportunity to expand your knowledge, discover cutting-edge products, and connect with industry experts.',
								image: 'https://www.vetandtech.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2Fup_data%2Fwebiners%2Fimages%2F202311021405.jpg&w=1920&q=75',
								startDate: '2023-12-19T15:00-17:00',
								endDate: '2023-12-19T15:00-17:00',
								eventStatus: 'https://schema.org/EventScheduled',
								eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
								location: {
									'@type': 'VirtualLocation',
									url: 'https://us02web.zoom.us/webinar/register/WN_eEE12CJdS0OEwKeKcjYnww#/registration'
								},
								// performer: {
								// 	'@type': 'Person',
								// 	name: 'Sarah Marvel'
								// },
								offers: {
									'@type': 'Offer',
									name: 'DVM Central Marketplace Virtual Expo',
									price: '00',
									priceCurrency: 'USD',
									validFrom: '2023-11-30',
									url: 'https://www.vetandtech.com/virtual-expo/dvm-central-marketplace-virtual-expo',
									availability: 'https://schema.org/InStock'
								},
								organizer: {
									'@type': 'Organization',
									name: 'Vet and Tech',
									url: 'https://www.vetandtech.com/'
								}
							})
						}}
					/>
				) : (
					result?.webinar?.schema !== null &&
					result?.webinar?.schema !== '' && (
						<script
							type='application/ld+json'
							dangerouslySetInnerHTML={{
								__html: JSON.stringify(JSON.parse(result?.webinar?.schema))
							}}
						/>
					)
				)}
			</MetaTags>

			<VirtualExpoInfo
				loading={loading}
				imgclickLoading={imgclickLoading}
				btnDisabled={btnDisabled}
				data={result?.webinar}
				setmodal={setmodal}
				checkUserVirtualExpoData={checkUserVirtualExpoData}
				loginUser={loginUser}
				userPosition={userData?.position}
				imgRef={imgRef}
				router={router}
				userAddress={result?.address}
			/>
		</>
	)
}

export default VirtualExpoDetail

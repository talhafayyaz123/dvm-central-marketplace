import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { imgApiUrl } from '../../../../../../utils/config'
import styles from './TabContent.module.css'
import gervetLogo from '../../../../../../public/imgs/webinar/gervet-logo.png'
import ContactVendor from '../../../Vendor/HotSelling/LeftColContent/ContactVendor/ContactVendor'
import Modal from '../../../../../UI/Modal/Modal'
import VendorCards from '../../../../../UI/VendorsCards/VendorsCards'
import { lockScroll } from '../../../../../../utils/scrollLock'

const TabContent = ({ speaker, data, router, loginUser, userAddress, userPosition }) => {
	const [displayType, setdisplayType] = useState('about')
	const { course_about, learning_objectives, reviews, faqs } = data

	const [showMeetingModal, setshowMeetingModal] = useState(false)

	const [meetingFormSubmit, setmeetingFormSubmit] = useState(false)
	const [activeVendor, setactiveVendor] = useState({})

	return (
		<>
			<Modal modal={showMeetingModal} setmodal={setshowMeetingModal} modalType={meetingFormSubmit ? 'meeting' : undefined}>
				{showMeetingModal && (
					<ContactVendor
						type='meeting'
						vendorId={activeVendor?.id}
						vendorName={activeVendor?.name}
						loginUser={loginUser}
						showMeetingModal={showMeetingModal}
						setshowMeetingModal={setshowMeetingModal}
						meetingFormSubmit={meetingFormSubmit}
						setmeetingFormSubmit={setmeetingFormSubmit}
						appointmentData={activeVendor?.schedules}
						userAddress={userAddress}
					/>
				)}
			</Modal>
			<section className='sec-container'>
				<div className='sec-mb'>
					<div className={styles.tab_heading_wrapper} style={{ justifyContent: router?.asPath === '/virtual-expo/dvm-central-marketplace-virtual-expo' ? 'space-around' : undefined }}>
						<h5
							className={`${styles.tab_heading} ${displayType === 'about' && styles.active_tab}`}
							onClick={() => {
								setdisplayType('about')
							}}
						>
							About this Course
						</h5>

						{speaker?.length > 0 && (
							<h5
								className={`${styles.tab_heading} ${displayType === 'instructors' && styles.active_tab}`}
								onClick={() => {
									setdisplayType('instructors')
								}}
							>
								Instructor
							</h5>
						)}
						{router?.asPath !== '/virtual-expo/dvm-central-marketplace-virtual-expo' && learning_objectives !== null && (
							<h5
								className={`${styles.tab_heading} ${displayType === 'learning' && styles.active_tab}`}
								onClick={() => {
									setdisplayType('learning')
								}}
							>
								Learning Objectives
							</h5>
						)}
						{data?.vendors?.length > 0 && userPosition !== undefined && userPosition !== 'Sales Rep' && (
							<h5
								className={`${styles.tab_heading} ${displayType === 'appointments' && styles.active_tab}`}
								onClick={() => {
									setdisplayType('appointments')
								}}
							>
								Virtual Meetings
							</h5>
						)}
						<h5
							className={`${styles.tab_heading} ${displayType === 'sponsors' && styles.active_tab}`}
							onClick={() => {
								setdisplayType('sponsors')
							}}
						>
							Sponsors
						</h5>
						{router?.asPath !== '/virtual-expo/dvm-central-marketplace-virtual-expo' && (
							<h5
								className={`${styles.tab_heading} ${displayType === 'links' && styles.active_tab}`}
								onClick={() => {
									setdisplayType('links')
								}}
							>
								Quick Links
							</h5>
						)}

						{reviews?.length > 0 && (
							<h5
								className={`${styles.tab_heading} ${displayType === 'reviews' && styles.active_tab}`}
								onClick={() => {
									setdisplayType('reviews')
								}}
							>
								Reviews
							</h5>
						)}
						{faqs?.length > 0 && (
							<h5
								className={`${styles.tab_heading} ${displayType === 'faqs' && styles.active_tab}`}
								onClick={() => {
									setdisplayType('faqs')
								}}
							>
								FAQs
							</h5>
						)}
					</div>

					{displayType === 'about' && (
						<div className={`${styles.content_wrapper} radius`}>
							<div className='dynamic-data' dangerouslySetInnerHTML={{ __html: course_about }} />
						</div>
					)}

					{/* instructor tab */}
					{displayType === 'instructors' && (
						<div className={styles.speakers_wrapper}>
							{speaker?.map((speaker) => {
								const { id, first_name, last_name, profile, slug, job_title, institute } = speaker

								return router?.asPath === '/virtual-expo/dvm-central-marketplace-virtual-expo' && first_name === 'Dr. Dani' && last_name === 'McVety' ? (
									<a target='_blank' rel='noreferrer' href={`https://www.vetandtech.com/speakers/${slug}`} key={id} className={`${styles.speaker_wrapper} radius`}>
										<div className={`${styles.speakerimg_wrapper} full-radius transition primary-border`}>
											<Image src={`${imgApiUrl.speakers.img}/${profile}`} width={175} height={175} alt={`${first_name} ${last_name}`} />
										</div>
										<div className={styles.speaker_detail}>
											<h5 className={styles.speaker_name}>
												{first_name} {last_name}
											</h5>
											<div className={`${styles.position} primary-color`}>
												<span>Designation: </span>
												<span className='text-semibold'></span>
												{job_title}
											</div>
											<div className='gray-color'>
												<span>Institute: </span>
												{institute}
											</div>
										</div>
									</a>
								) : (
									first_name === 'Dr. William' && last_name === 'Culp' && (
										<a target='_blank' rel='noreferrer' href={`https://www.vetandtech.com/speakers/${slug}`} key={id} className={`${styles.speaker_wrapper} radius`}>
											<div className={`${styles.speakerimg_wrapper} full-radius transition primary-border`}>
												<Image src={`${imgApiUrl.speakers.img}/${profile}`} width={175} height={175} alt={`${first_name} ${last_name}`} />
											</div>
											<div className={styles.speaker_detail}>
												<h5 className={styles.speaker_name}>
													{first_name} {last_name}
												</h5>
												<div className={`${styles.position} primary-color`}>
													<span>Designation: </span>
													<span className='text-semibold'></span>
													{job_title}
												</div>
												<div className='gray-color'>
													<span>Institute: </span>
													{institute}
												</div>
											</div>
										</a>
									)
								)
							})}
							{speaker?.map((speaker) => {
								const { id, first_name, last_name, profile, slug, job_title, institute } = speaker

								return router?.asPath === '/virtual-expo/dvm-central-marketplace-virtual-expo' ? (
									first_name !== 'Dr. Dani' && last_name !== 'McVety' && first_name !== 'Dr. William' && last_name !== 'Culp' && (
										<a target='_blank' rel='noreferrer' href={`https://www.vetandtech.com/speakers/${slug}`} key={id} className={`${styles.speaker_wrapper} radius`}>
											<div className={`${styles.speakerimg_wrapper} full-radius transition primary-border`}>
												<Image src={`${imgApiUrl.speakers.img}/${profile}`} width={175} height={175} alt={`${first_name} ${last_name}`} />
											</div>
											<div className={styles.speaker_detail}>
												<h5 className={styles.speaker_name}>
													{first_name} {last_name}
												</h5>
												<div className={`${styles.position} primary-color`}>
													<span>Designation: </span>
													<span className='text-semibold'></span>
													{job_title}
												</div>
												<div className='gray-color'>
													<span>Institute: </span>
													{institute}
												</div>
											</div>
										</a>
									)
								) : first_name === 'Brian' && last_name === 'Faulkner' ? (
									<div className={`${styles.speaker_wrapper} radius`}>
										<div className={`${styles.speakerimg_wrapper} full-radius transition primary-border`}>
											<Image src={`${imgApiUrl.speakers.img}/${profile}`} width={175} height={175} alt={`${first_name} ${last_name}`} />
										</div>
										<div className={styles.speaker_detail}>
											<h5 className={styles.speaker_name}>
												{first_name} {last_name}
											</h5>
											<div className={`${styles.position} primary-color`}>
												<span>Designation: </span>
												<span className='text-semibold'></span>
												{job_title}
											</div>
											<div className='gray-color'>
												<span>Institute: </span>
												{institute}
											</div>
										</div>
									</div>
								) : (
									<a target='_blank' rel='noreferrer' href={`https://www.vetandtech.com/speakers/${slug}`} key={id} className={`${styles.speaker_wrapper} radius`}>
										<div className={`${styles.speakerimg_wrapper} full-radius transition primary-border`}>
											<Image src={`${imgApiUrl.speakers.img}/${profile}`} width={175} height={175} alt={`${first_name} ${last_name}`} />
										</div>
										<div className={styles.speaker_detail}>
											<h5 className={styles.speaker_name}>
												{first_name} {last_name}
											</h5>
											<div className={`${styles.position} primary-color`}>
												<span>Designation: </span>
												<span className='text-semibold'></span>
												{job_title}
											</div>
											<div className='gray-color'>
												<span>Institute: </span>
												{institute}
											</div>
										</div>
									</a>
								)
							})}
						</div>
					)}
					{displayType === 'learning' && (
						<div className={`${styles.content_wrapper} radius`}>
							<div className='dynamic-data' dangerouslySetInnerHTML={{ __html: learning_objectives }} />
						</div>
					)}

					{displayType === 'appointments' && (
						// router?.asPath === '/virtual-expo/summer-expo-at-dvm-central' && data?.vendors?.length > 0
						<div className={`${styles.content_wrapper} ${styles.vendors_wrapper} radius`}>
							{data?.vendors?.map((vendor) => {
								return <VendorCards key={vendor?.id} data={vendor} type='meeting' onClick={() => (setshowMeetingModal(true), setactiveVendor(vendor), lockScroll())} />
							})}
							{/* <button onClick={setshowMeetingModal}>Open appointments</button>{' '} */}
						</div>
					)}
					{displayType === 'sponsors' && (
						<div className={`${styles.content_wrapper} ${styles.sponsors_wrapper}`}>
							<div className={`${styles.sponsors_inner_wrapper} dynamic-data`}>
								<h4>A complete range of Uniquely Designed Veterinary Dental Instruments for any Procedure.</h4>
								<ul>
									<li>Atraumatic Extraction Forceps</li>
									<li>Luxating Winged, Luxating WingAngle Color Coated</li>
									<li>Preassembled kits for extractions and periodontal </li>
									<li>Feline - Canine – Exotics – Equine </li>
								</ul>
							</div>
							<div className={styles.logo_wrapper}>
								<Image src={gervetLogo} alt='GervetUSA' />
							</div>
						</div>
					)}
					{displayType === 'links' && <div className={`${styles.content_wrapper} radius`}>Coming Soon...</div>}
					{displayType === 'reviews' && (
						<div className={`${styles.content_wrapper} radius`}>
							{reviews?.length > 0 ? (
								<div>
									{reviews?.map((review) => {
										const { username, reviews, time, date, id } = review
										return (
											<div key={id} className={`${styles.review_wrapper} white-bg radius`}>
												<div className={`${styles.review_inner_wrapper} white-bg radius`}>
													{username && <div className={styles.user_review}>{username}</div>}
													<p className={`${styles.review} gray-color`}>{reviews}</p>
													<div className={styles.time}>
														{date} - {time}
													</div>
												</div>
											</div>
										)
									})}
								</div>
							) : (
								<div>No reviews found...</div>
							)}
						</div>
					)}
					{displayType === 'faqs' && (
						<div className={`${styles.content_wrapper} radius`}>
							{faqs?.length > 0 ? (
								<div>
									{faqs?.map((faq) => {
										const { answer, question, date, time, username, id } = faq
										return (
											<div key={id} className={`${styles.review_wrapper} white-bg radius`}>
												<div className={`${styles.review_inner_wrapper} white-bg radius`}>
													{username && <div className={`${styles.user} primary-color`}>{username}: </div>}
													<div className={styles.user_review}>{question}</div>
													<p className={`${styles.review} gray-color`}>{answer}</p>
													<div className={styles.time}>
														{date} - {time}
													</div>
												</div>
											</div>
										)
									})}
								</div>
							) : (
								<div>No FAQs found...</div>
							)}
						</div>
					)}
				</div>
			</section>
		</>
	)
}

export default TabContent

import React, { useRef, useState, useEffect, useContext } from 'react'
import HeroBanner from '../../UI/HeroBanner/HeroBanner'
import styles from './VirtualExpo.module.css'
import VirtualExpoCard from '../../UI/VirtualExpoCard/VirtualExpoCard'
import MetaTags from '../../UI/MetaTags/MetaTags'
import PageContent from '../../UI/PageContent/PageContent'
import ListingLayout from '../../UI/ListingLayout/ListingLayout'
import LeftCol from '../../UI/ListingLayout/LeftCol/LeftCol'
import RightCol from '../../UI/ListingLayout/RigthCol/RightCol'
import Filters from './Filters/Filters'
import Modal from '../../UI/Modal/Modal'
import getDate from '../../../utils/getDate'
import { baseApiUrl, imgApiUrl } from '../../../utils/config'
import RegisterForm from '../Slug/VirtualExpoDetail/RegisterForm/RegisterForm'
import Link from 'next/link'
import FilterBtnForMob from '../../UI/FilterBtnForMob/FilterBtnForMob'
import { BlackLoader, LiteLoader } from '../../Loader/Loader'
import axios from 'axios'
import useLocalStorageState from 'use-local-storage-state'
import { lockScroll } from '../../../utils/scrollLock'
import IframeWithLoader from '../../UI/IframeWithLoader/IframeWithLoader'
import PageLoadFilterLoading from '../../UI/PageLoadFilterLoading/PageLoadFilterLoading'
import { GlobalProvider } from '../../../context/AppProvider'

const VirtualExpo = ({ virtualExpo }) => {
	console.log('virtual expo', virtualExpo)
	const [currentData, setcurrentData] = useState(virtualExpo)
	console.log('currentData', currentData)
	const { latest_webinar, categories, speakers, page_header_content } = virtualExpo
	const [filterLoading, setfilterLoading] = useState(false)
	const [loading, setloading] = useState(false)
	const [btnDisabled, setbtnDisabled] = useState(false)
	const [showVideoModal, setshowVideoModal] = useState(false)
	const [videoSrc, setvideoSrc] = useState(null)
	const [show, setshow] = useState(false)
	const [showPastBtn, setshowPastBtn] = useState(false)
	const [modal, setModal] = useState(false)

	const { loginUser } = useContext(GlobalProvider)

	const [virtualExpoUpcoming, setvirtualExpoUpcoming] = useLocalStorageState('dvm-virtualExpoUpcoming', {
		defaultValue: []
	})

	const [initialFilterLoading, setinitialFilterLoading] = useState(false)

	const [userProfileDataExists, setuserProfileDataExists] = useState(false)

	const [checkingUserData, setcheckingUserData] = useState(loginUser?.id !== undefined ? false : true)

	const result_wrapper = useRef(null)
	const videoModalRef = useRef(null)
	const heightRef = useRef(null)
	const showBtn = useRef(null)

	const slicedStartTime = latest_webinar?.start_date?.slice(-8)
	const startHourMnt = slicedStartTime?.slice(0, 5)
	const timeZone = latest_webinar?.time_zone
	const startCorrectHourMnt = (startHourMnt?.slice(0, 2) > 12 ? startHourMnt?.slice(0, 2) - 12 + ':' + startHourMnt?.slice(-2) : startHourMnt?.slice(0, 2) + ':' + startHourMnt?.slice(-2)) + `${startHourMnt?.slice(0, 2) < 12 ? ' AM' : ' PM'}`

	const checkUserVirtualExpoData = async (email) => {
		let reqData

		if (loginUser?.id !== undefined) {
			setloading(true), setbtnDisabled(true)
			reqData = {
				user_id: loginUser?.email,
				webinar_ids: [latest_webinar?.id],
				session: loginUser?.id !== undefined ? true : false,
				registered_from: 'DVM Central'
			}
		} else {
			reqData = {
				email,
				webinar_ids: [latest_webinar?.id],
				session: loginUser?.id !== undefined ? true : false,
				registered_from: 'DVM Central'
			}
		}
		const res = await axios.post(`${baseApiUrl}/user-virtual-expo-info`, reqData)

		// if (res?.data?.success && typeof window !== 'undefined') {
		// 	window.lintrk('track', { conversion_id: 15070089 })
		// }

		setuserProfileDataExists(res?.data)
		if (loginUser?.id !== undefined) {
			setloading(false)
			setbtnDisabled(false)
			setModal(true)
			lockScroll()
		}
	}

	const ExpoBtn = () => {
		if (window.scrollY < heightRef?.current?.clientHeight + 200) {
			setshow(false)
		} else {
			setshow(true)
		}
	}
	useEffect(() => {
		window.addEventListener('scroll', ExpoBtn)
		setTimeout(() => {
			setshowPastBtn(true)
		}, 100)
	}, [])

	const handlePastWebinar = () => {
		setvirtualExpoUpcoming((prev) => [...prev, 'ondemand'])
	}

	return (
		<>
			<MetaTags title={virtualExpo?.meta_title} description={virtualExpo?.meta_description} keywords={virtualExpo?.meta_keywords}>
				{virtualExpo?.latest_webinar?.schema && virtualExpo?.latest_webinar?.schema !== null && virtualExpo?.latest_webinar?.schema !== '' && (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(JSON.parse(virtualExpo?.latest_webinar?.schema))
						}}
					/>
				)}

				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@graph': [
								{
									'@context': 'https://schema.org',
									'@type': 'BreadcrumbList',
									itemListElement: [
										{
											'@type': 'ListItem',
											position: 1,
											name: 'DVM Central - A Veterinary Marketplace',
											item: 'https://www.dvmcentral.com'
										},
										{
											'@type': 'ListItem',
											position: 2,
											name: 'Virtual Expo',
											item: 'https://www.dvmcentral.com/virtual-expo'
										}
									]
								}
							]
						})
					}}
				/>
			</MetaTags>
			{initialFilterLoading && <PageLoadFilterLoading />}
			<div className={styles.main_wrapper}>
				<LiteLoader className={`${styles.filter_loader} modal-bg ${filterLoading ? 'show-bd' : 'hide-bd'} transition`} />
				<Modal className={showVideoModal && styles.hide_form} registerType='ListingPage' modal={modal} setmodal={setModal} modalType={!userProfileDataExists?.user_webinar_data_exists ? 'expo-form' : 'expo-register'} videoModalRef={videoModalRef} setcheckingUserData={setcheckingUserData}>
					{modal && (
						<RegisterForm
							modalData={latest_webinar?.id}
							setModal={setModal}
							latestVirtualExpoId={latest_webinar?.id}
							userProfileDataExists={userProfileDataExists}
							checkingUserData={checkingUserData}
							userId={loginUser?.id}
							setshowVideoModal={setshowVideoModal}
							setvideoSrc={setvideoSrc}
							checkUserVirtualExpoData={checkUserVirtualExpoData}
							setcheckingUserData={setcheckingUserData}
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
							<IframeWithLoader className={styles.video} src={videoSrc} title='How to register for Virtual expo' loaderColor='white' />
						</div>
					</div>
				</div>

				{/* <HeroBanner className={styles.hero_banner} title='Webinars' info={`Attend Webinars On The Most Up-To-Date Veterinary Practices And Protocols To Expand Your Knowledge And Skills`} src={banner} /> */}
				{virtualExpo?.latest_webinar !== null && (
					<>
						<div ref={heightRef}>
							<HeroBanner
								className={styles.hero_banner}
								smlTitle='Upcoming Webinar'
								title={latest_webinar?.name}
								info={latest_webinar?.short_detail}
								info_2={latest_webinar?.name === 'DVM Central Expo, Lunch & Learn' ? 'July 2, 2024 2:00 PM (US Eastern Time)' : `${getDate(latest_webinar?.start_date)} ${startCorrectHourMnt} (${timeZone})`}
								src={`${imgApiUrl.virtualExpo?.img}/${latest_webinar?.header_image}`}
								width={405}
								height={379}
								pageType='webinar-listing'
							>
								{latest_webinar?.allow_zoom_link && loginUser?.id !== undefined ? (
									<a className={styles.join_link_btn} href={latest_webinar?.zoom_link} target='_blank' rel='noreferrer'>
										<button className={`${styles.btn} black-color`}>
											Join Webinar{' '}
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
											</svg>
										</button>
									</a>
								) : (
									<div className={styles.btn_wrapper}>
										<button disabled={btnDisabled} className={`${styles.btn} ${latest_webinar?.zoom_link === null ? styles.single_btn : undefined} white-btn black-color`} onClick={() => (loginUser?.id !== undefined ? checkUserVirtualExpoData() : (setModal(true), lockScroll()))}>
											Register for Virtual Expo {loading && <BlackLoader className={styles.loader} />}
										</button>
										{latest_webinar?.zoom_link !== null && (
											<a href={latest_webinar?.zoom_link} target='_blank' rel='noreferrer'>
												<button className={`${styles.direct_join} white-btn black-color`}>Join Directly on Zoom</button>
											</a>
										)}
									</div>
								)}
							</HeroBanner>
						</div>

						<button className={`${styles.btn} ${styles.single_btn} ${styles.mobile_btn} ${show ? styles.mobile_btn_show : undefined} black-color`} onClick={() => (loginUser?.id !== undefined ? checkUserVirtualExpoData() : (setModal(true), lockScroll()))}>
							Register for Virtual Expo {loading && <BlackLoader className={styles.loader} />}
						</button>
					</>
				)}
				<div className='inner-sec-m'>
					<div className='sec-container'>
						<PageContent content={page_header_content} />
					</div>
				</div>
				<ListingLayout className={styles.layout}>
					<LeftCol className={styles.left_col}>
						<Filters
							filterLoading={filterLoading}
							setfilterLoading={setfilterLoading}
							setcurrentData={setcurrentData}
							categories={categories}
							speakers={speakers}
							result_wrapper={result_wrapper}
							virtualExpoUpcoming={virtualExpoUpcoming}
							setvirtualExpoUpcoming={setvirtualExpoUpcoming}
							initialFilterLoading={initialFilterLoading}
							setinitialFilterLoading={setinitialFilterLoading}
						/>
					</LeftCol>
					<RightCol>
						<FilterBtnForMob className={styles.filter_mob_btn}>
							<Filters
								filterLoading={filterLoading}
								setfilterLoading={setfilterLoading}
								setcurrentData={setcurrentData}
								categories={categories}
								speakers={speakers}
								result_wrapper={result_wrapper}
								virtualExpoUpcoming={virtualExpoUpcoming}
								setvirtualExpoUpcoming={setvirtualExpoUpcoming}
								initialFilterLoading={initialFilterLoading}
								setinitialFilterLoading={setinitialFilterLoading}
							/>
						</FilterBtnForMob>
						<div ref={result_wrapper} className={styles.expo_wrapper} style={{ gridTemplateColumns: virtualExpo?.webinar?.length === 0 && !currentData?.past && !currentData?.upcoming ? '1fr' : undefined }}>
							{currentData?.webinar?.length > 0 ? (
								<>
									{currentData?.webinar?.map((virtualExpo) => {
										return <VirtualExpoCard key={virtualExpo?.id} className='shadow' data={virtualExpo} />
									})}
								</>
							) : virtualExpo?.webinar?.length === 0 && !currentData?.past && !currentData?.upcoming && !filterLoading && showPastBtn ? (
								<div className='red-color'>
									Expo coming soon. Click the below button to explore our past expos.
									<button className={`${styles.past_btn} primary-btn white-color`} onClick={handlePastWebinar}>
										Past Webinar
									</button>
								</div>
							) : (
								!filterLoading && currentData?.past?.length === 0 && currentData?.upcoming?.length === 0 && <div className='red-color'>No Virtual Expo found...</div>
							)}
						</div>

						{(currentData?.past?.length > 0 || currentData?.upcoming?.length > 0) && (
							<>
								{/* <div className={`${styles.divider}  inner-sec-m`} /> */}

								{currentData?.past?.length > 0 && (
									<div className={`${styles.others_webinars} ${currentData?.webinar?.length > 0 ? 'inner-sec-mt' : undefined}`}>
										{/* <h4>Past Webinars</h4> */}

										{currentData?.past?.map((virtualExpo) => {
											const { name, slug, allow_video, video_id } = virtualExpo
											return allow_video === 0 && video_id === null ? (
												<Link key={virtualExpo?.id} href={`/virtual-expo/${slug}`}>
													<a className={`${styles.other_webinar_card} shadow radius primary-bb`}>
														<div className={`primary-color ${styles.title}`}>{name}</div>
														<div className={styles.wrapper}>
															<div>Video coming soon</div>
															<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
																<path
																	fillRule='evenodd'
																	d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z'
																	clipRule='evenodd'
																/>
															</svg>
														</div>
													</a>
												</Link>
											) : (
												<div className={styles.expo_wrapper}>
													<VirtualExpoCard key={virtualExpo?.id} className='shadow' data={virtualExpo} />
												</div>
											)
										})}
									</div>
								)}

								{currentData?.upcoming?.length > 0 && (
									<>
										<div className={`${styles.divider} inner-sec-m`} />

										<div className={`${styles.others_webinars} ${styles.upcoming_webinars_list}`}>
											<h4>Upcoming Virtual Expo</h4>

											{currentData?.upcoming?.map((virtualExpo) => {
												const { name, start_date, slug, time_zone } = virtualExpo
												const slicedStartTime = start_date.slice(-8)
												const startHourMnt = slicedStartTime.slice(0, 5)
												const startCorrectHourMnt = (startHourMnt?.slice(0, 2) > 12 ? startHourMnt?.slice(0, 2) - 12 + ':' + startHourMnt?.slice(-2) : startHourMnt?.slice(0, 2) + ':' + startHourMnt?.slice(-2)) + `${startHourMnt?.slice(0, 2) < 12 ? ' AM' : ' PM'}`

												return (
													<Link key={virtualExpo?.id} href={`/virtual-expo/${slug}`}>
														<a className={`${styles.other_webinar_card} shadow radius primary-bb`}>
															<div className={`primary-color ${styles.title}`}>{name}</div>
															<div className={styles.wrapper}>
																<div>
																	<div className={styles.start_date}>
																		<span>Start Date:</span> {getDate(start_date)}
																	</div>
																	<div>
																		<span>Start Time:</span> {startCorrectHourMnt} ({time_zone !== null && time_zone})
																	</div>
																</div>
																<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
																	<path
																		fillRule='evenodd'
																		d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z'
																		clipRule='evenodd'
																	/>
																</svg>
															</div>
														</a>
													</Link>
												)
											})}
										</div>
									</>
								)}
							</>
						)}
					</RightCol>
				</ListingLayout>
			</div>

			<section className='sec-container dynamic-data'>
				<div className={`${styles.content_wrapper} sec-pb`}>
					<h1>Upgrade Your Veterinary Knowledge: Explore Upcoming Veterinary Conferences at DVM Central.</h1>

					<p>Whether you&apos;re a seasoned veterinarian, a budding veterinary technician seeking veterinary technician CE credits, or simply passionate about animal health, attending conferences is an invaluable opportunity for your professional growth.</p>
					<h2>Diverse Veterinary Services For Related Fields and Roles</h2>
					<p>
						DVM Central takes great pride in offering diverse{' '}
						<span>
							<Link href='/service-providers'>
								<a className='link'>veterinary services</a>
							</Link>
						</span>{' '}
						to fulfill the veterinary needs of people nationwide
					</p>
					<p>From administrative to overseeing financial matters to veterinary software solutions, DVM Central has always been open to assisting veterinary professionals by bridging the gap between veterinary aspirants and professionals.</p>

					<h2>Get Access to Expert Veterinary Specialists in Interactive Veterinary Conferences.</h2>
					<p>We have immense learning opportunities for veterinary technician CE to learn and grow with the veterinary conferences powered by the Central DVM.</p>
					<h2>Get Amazing Benefits of Attending Veterinary Conferences 2025 at DVM Central</h2>
					<p>The latest research and advancements help you evolve and expand your knowledge. Learn about the latest research, advancements in veterinary medicine, and innovative treatment options. </p>

					<p>Connect with other veterinary professionals, share experiences, and build valuable relationships within the industry. We provide you the chance to network with peers. Get connected with the veterinary professionals.</p>

					<p>Our veterinary conferences upgrade your knowledge and provide you with CE credits. Many veterinary conferences 2025 qualify for continuing education credits, fulfilling your professional development requirements.</p>
					<p>Some conferences offer workshops and hands-on training sessions to veterinary technicians CE.</p>
					<h2>Finding the Right Conference For You</h2>
					<p>DVM Central can help you find the perfect conference to suit your needs and interests. We have a comprehensive list of upcoming veterinary conferences 2025, including dates, locations, topics, and registration information, reach out to learn more about these. </p>
					<p>If you are looking for free online veterinary CE options? We at DVM Central are your ultimate learning platform.</p>
					<h2>Why Choose DVM Central for Veterinary Conferences?</h2>
					<p>
						It is a veterinary marketplace that offers enormous{' '}
						<span>
							<Link href='/'>
								<a className='link'>animal health products.</a>
							</Link>
						</span>{' '}
						We have been dealing with veterinarians and professionals for decades now.
					</p>
					<p>We are a vet and tech company assisting professionals in advancing their practices.</p>
					<p>We provide enormous opportunities to learn at lunch. The marketplace also allows veterinarians to collaborate with providers seamlessly. </p>
					<p>
						Ready to advance your veterinary knowledge? Explore our conference listings,{' '}
						<span>
							<Link href='/blogs'>
								<a className='link'>veterinary blogs</a>
							</Link>
						</span>{' '}
						today and plan your professional development journey with DVM Central.
					</p>
				</div>
			</section>
		</>
	)
}

export default VirtualExpo

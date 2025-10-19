import React, { useState, useRef, useEffect } from 'react'
import { imgApiUrl } from '../../../../../utils/config'
import styles from './VirtualExpoInfo.module.css'
import getDate from '../../../../../utils/getDate'
import ImgWithLoader from '../../../../UI/ImgWithLoader/ImgWithLoader'
import Link from 'next/link'
import HeroBanner from '../../../../UI/HeroBanner/HeroBanner'
import TabContent from './TabContent/TabContent'
import PlayerBtn from '../../../LandingPage/IntroVetandTech/PlayerBtn/PlayerBtn'
import noImg from '/public/imgs/no-img.webp'
import { DarkLoader } from '../../../../Loader/Loader'
import rightWaveImg from '/public/landing-page/shape/right-wave.webp'
import Image from 'next/image'
import IframeWithLoader from '../../../../UI/IframeWithLoader/IframeWithLoader'
import Modal from '../../../../UI/Modal/Modal'
import { lockScroll } from '../../../../../utils/scrollLock'
// import getTimezoneDate from '../../../../../utils/getTimezoneDate'

const VirtualExpoInfo = ({ setmodal, data, loginUser, checkUserVirtualExpoData, loading, imgclickLoading, btnDisabled, imgRef, router, userAddress, userPosition }) => {
	const { name, short_detail, image, start_date, location, speaker, race_approved, categories, ce_hours, registration, allow_video, video_id, slug, time_zone, zoom_link } = data

	const [videoSrc, setvideoSrc] = useState(null)
	const [showVideoModal, setshowVideoModal] = useState(false)
	const [show, setshow] = useState(false)
	const [timeZone, settimeZone] = useState()

	// const slicedStartDate = getDate(start_date.slice(0, 10))
	// const slicedEndDate = getDate(end_date.slice(0, 10))

	const slicedStartTime = start_date?.slice(-8)
	const startHourMnt = slicedStartTime?.slice(0, 5)
	const startCorrectHourMnt = (startHourMnt?.slice(0, 2) > 12 ? startHourMnt?.slice(0, 2) - 12 + ':' + startHourMnt?.slice(-2) : startHourMnt?.slice(0, 2) + ':' + startHourMnt?.slice(-2)) + `${startHourMnt?.slice(0, 2) < 12 ? ' AM' : ' PM'}`

	const heightRef = useRef()
	const showBtn = useRef()

	useEffect(() => {
		if (router?.asPath === '/virtual-expo/dvm-central-expo-lunch-learn') {
			let currentDate = new Date()
			let givenDate = new Date('Thu May 9 2024')
			let time1 = new Date().toLocaleTimeString()
			let time2 = new Date('Thu May 9 2024 18:00:00').toLocaleTimeString()
			currentDate > givenDate ? settimeZone(time1 < time2) : settimeZone(true)
		}
	}, [timeZone, router?.asPath])

	const ExpoBtn = () => {
		if (window.scrollY < heightRef?.current?.clientHeight + 200) {
			setshow(false)
		} else {
			setshow(true)
		}
	}
	useEffect(() => {
		window.addEventListener('scroll', ExpoBtn)
	}, [])

	// const slicedEndTime = end_date.slice(-8)
	// const endHourMnt = slicedEndTime.slice(0, 5)
	// const endCorrectHourMnt = endHourMnt.slice(0, 2) >= 12 ? endHourMnt.slice(0, 2) - 12 + ':' + endHourMnt.slice(-2) + ' PM' : endHourMnt.slice(0, 2) + ':' + endHourMnt.slice(-2) + ' AM'

	return (
		<>
			<Modal modal={showVideoModal} setmodal={setshowVideoModal} modalType='video' setvideoSrc={setvideoSrc}>
				<div className={styles.video_modal_wrapper}>{showVideoModal && <IframeWithLoader className={styles.video} src={videoSrc} title='How to download certificate' />}</div>
			</Modal>
			<div ref={heightRef}>
				<HeroBanner pageType='single_col' title={`${name}`}>
					<div className={styles.btns_wrapper}>
						{registration && (
							<button
								disabled={btnDisabled}
								className={`${styles.register_btn} white-btn primary-color ${zoom_link === null && router?.asPath !== '/virtual-expo/dvm-central-expo-lunch-learn' ? styles.single_btn : styles.lunch_expo}`}
								onClick={(e) => (loginUser?.id !== undefined ? checkUserVirtualExpoData() : (setmodal(true), lockScroll()))}
							>
								Register for Expo
								{loading && <DarkLoader className={styles.loader} />}
							</button>
						)}

						{zoom_link !== null && (
							<a href={zoom_link} className={`${styles.save_btn} ${router?.asPath === '/virtual-expo/dvm-central-expo-lunch-learn' ? styles.single_btn : undefined}`} target='_blank' rel='noreferrer'>
								<button className={` ${styles.direct_join} white-btn primary-color`}>Join Directly on Zoom</button>
							</a>
						)}
						{loginUser?.id !== undefined
							? allow_video === 1 &&
							  video_id !== null &&
							  registration === false && (
									<Link href={`/virtual-expo/${slug}/video`}>
										<a className={zoom_link === null && router?.asPath !== '/virtual-expo/dvm-central-expo-lunch-learn' ? styles.single_btn : undefined}>
											<button className={`primary-color ${styles.register_btn} white-btn`}>Watch Expo</button>
										</a>
									</Link>
							  )
							: registration === false && (
									<Link href='/auth/signin'>
										<a className={zoom_link === null && router?.asPath !== '/virtual-expo/dvm-central-expo-lunch-learn' ? styles.single_btn : undefined}>
											<button className={`primary-color ${styles.register_btn} white-btn`}>Register to Watch Expo</button>
										</a>
									</Link>
							  )}
						{/* {router?.asPath === '/virtual-expo/dvm-central-expo-lunch-learn' && timeZone && (
							<Link href={`https://calendar.google.com/calendar/u/0/r/eventedit/copy/NWZ1aTAzNW4xMmY2ZmU0M2Vic2IxbHJubXUgYXNmYW5keWFyLmdtaXRAbQ/em9oYWlicS5nbWl0QGdtYWlsLmNvbQ`}>
								<a className={`${styles.save_btn} ${styles.single_btn}`} target='_blank' rel='noreferrer noopener'>
									<button className='black-color'>
										Save to Calendar
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--black)' className='w-6 h-6'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
											/>
										</svg>
									</button>
								</a>
							</Link>
						)} */}
					</div>
				</HeroBanner>
			</div>
			{loginUser?.id !== undefined
				? allow_video === 1 &&
				  video_id !== null && (
						<Link href={`/webinars/${slug}/video`}>
							<a ref={showBtn} className={`${styles.mobile_btn} ${show ? styles.mobile_btn_show : undefined}`}>
								<button className={`${styles.register_btn} primary-btn white-color ${styles.single_btn}`}>Watch Expo</button>
							</a>
						</Link>
				  )
				: video_id !== null && (
						<Link href={`auth/signin`}>
							<a ref={showBtn} className={`${styles.mobile_btn} ${show ? styles.mobile_btn_show : undefined}`}>
								<button className={`${styles.register_btn} primary-btn white-color ${styles.single_btn}`}>Register to Watch Expo</button>
							</a>
						</Link>
				  )}

			{registration && (
				<button
					disabled={btnDisabled}
					ref={showBtn}
					className={`${styles.register_btn} primary-btn white-color ${styles.single_btn} ${styles.mobile_btn} ${show ? styles.mobile_btn_show : undefined}`}
					onClick={(e) => (loginUser?.id !== undefined ? checkUserVirtualExpoData() : (setmodal(true), lockScroll()))}
				>
					Register for Expo
					{loading && <DarkLoader className={styles.loader} />}
				</button>
			)}

			<section className={`${styles.container} sec-p`}>
				<div className={styles.img_wrapper}>
					<Image src={rightWaveImg} alt='VetandTech' />
				</div>
				<div className='sec-container'>
					<div className={styles.detail_wrapper}>
						{registration ? (
							// <div disabled={btnDisabled} ref={imgRef} className={`${styles.banner_container}`} onClick={(e) => (session ? checkUserVirtualExpoData(e.target) : setmodal(true))}>
							<div disabled={btnDisabled} ref={imgRef} className={`${styles.banner_container}`} style={{ cursor: 'auto' }}>
								{/* {imgclickLoading && <LiteLoader className={`${styles.img_loader} radius transition`} />} */}
								{loginUser?.id !== undefined && allow_video === 1 && video_id !== null && <PlayerBtn className={`${styles.play_btn}`} btnType='white' />}
								<ImgWithLoader className={`${styles.banner_wrapper} radius`} width={638} height={510} src={image !== null ? `${imgApiUrl.virtualExpo.img}/${image}` : noImg} alt={name} />
							</div>
						) : loginUser?.id !== undefined && allow_video === 1 && video_id !== null ? (
							<Link href={`/virtual-expo/${slug}/video`}>
								<a className={`${styles.banner_container}`}>
									{loginUser?.id !== undefined && allow_video === 1 && video_id !== null && <PlayerBtn className={`${styles.play_btn}`} btnType='white' />}
									<ImgWithLoader className={`${styles.banner_wrapper} radius`} width={638} height={510} src={image !== null ? `${imgApiUrl.virtualExpo.img}/${image}` : noImg} alt={name} />
								</a>
							</Link>
						) : (
							<div className={`${styles.banner_container}`} style={{ cursor: 'unset' }}>
								<ImgWithLoader className={`${styles.banner_wrapper} radius`} width={638} height={510} src={image !== null ? `${imgApiUrl.virtualExpo.img}/${image}` : noImg} alt={name} />
							</div>
						)}

						{/* <div className='dynamic-data gray-color' dangerouslySetInnerHTML={{ __html: full_detail }} /> */}
						<div className={styles.detail_container}>
							{start_date && (
								<>
									{' '}
									<div className={styles.wrapper}>
										<div className={styles.title}>Date: </div>
										<div>{name === 'DVM Central Expo, Lunch & Learn' ? 'July 2, 2024' : getDate(start_date)}</div>
									</div>
									<div className={styles.wrapper}>
										<div className={styles.title}>Time: </div>
										<div>
											{name === 'DVM Central Expo, Lunch & Learn' ? '2:00 PM' : startCorrectHourMnt} ({time_zone !== null && time_zone})
										</div>
									</div>
								</>
							)}
							{location !== null && location !== 'Online' && (
								<div className={styles.wrapper}>
									<div className={styles.title}>Location: </div>
									<address className={`${styles.date} semibold-text`}>{location}</address>
								</div>
							)}
							{categories !== null && (
								<div className={`${styles.wrapper} ${styles.category_wrapper}`}>
									<div className={styles.title}>Category: </div>
									<div>{categories}</div>
								</div>
							)}
							{ce_hours !== null && router?.asPath !== '/virtual-expo/dvm-central-marketplace-virtual-expo' && (
								<div className={styles.wrapper}>
									<div className={styles.title}>CE Credits: </div>
									<div>{ce_hours}</div>
								</div>
							)}
							{race_approved === 1 && (
								<div className={styles.wrapper}>
									<div className={styles.title}>RACE Approved: </div>
									<div>Approved</div>
								</div>
							)}
							{speaker?.length > 0 && (
								<div className={`${styles.wrapper} ${styles.instructor_wrapper}`}>
									<div className={styles.title}>Instructor: </div>
									<div className={styles.speaker_wrapper}>
										{router?.asPath === '/virtual-expo/dvm-central-marketplace-virtual-expo' &&
											speaker?.map((speaker) => {
												const { id, first_name, last_name, slug } = speaker

												return first_name == 'Dr. Dani' && last_name == 'McVety' ? (
													<a target='_blank' rel='noreferrer' href={`https://www.vetandtech.com/speakers/${slug}`} key={id} className='link'>
														{first_name} {last_name}
													</a>
												) : (
													first_name == 'Dr. William' && last_name === 'Culp' && (
														<a target='_blank' rel='noreferrer' href={`https://www.vetandtech.com/speakers/${slug}`} key={id} className='link'>
															{first_name} {last_name}
														</a>
													)
												)
											})}

										{speaker?.map((speaker) => {
											const { id, first_name, last_name, slug } = speaker

											return router?.asPath === '/virtual-expo/dvm-central-marketplace-virtual-expo' ? (
												first_name !== 'Dr. Dani' && last_name !== 'McVety' && first_name !== 'Dr. William' && last_name !== 'Culp' && (
													<a target='_blank' rel='noreferrer' href={`https://www.vetandtech.com/speakers/${slug}`} key={id} className='link'>
														{first_name} {last_name}
													</a>
												)
											) : first_name === 'Brian' && last_name === 'Faulkner' ? (
												<div className='link'>
													{first_name} {last_name}
												</div>
											) : (
												<a target='_blank' rel='noreferrer' href={`https://www.vetandtech.com/speakers/${slug}`} key={id} className='link'>
													{first_name} {last_name}
												</a>
											)
										})}
									</div>
								</div>
							)}
							{short_detail && (
								<div className={`${styles.wrapper} ${styles.short_detail}`}>
									<div className={styles.title}>Description: </div>
									<div style={{ marginTop: '-2px' }}>{short_detail}</div>
								</div>
							)}
							{!router?.asPath.includes('/virtual-expo/dvm-central-marketplace-virtual-expo') && !router?.asPath.includes('/virtual-expo/dvm-central-expo-lunch-learn') && (
								<button className={`${styles.video_modal_btn} primary-btn white-color`} onClick={() => (setvideoSrc(`https://player.vimeo.com/video/847983857`), lockScroll(), setshowVideoModal(true))}>
									How to Download Certificate <PlayerBtn className={styles.modal_play_icon} size='sml' btnType='white' />
								</button>
							)}
						</div>
					</div>
				</div>
			</section>

			<TabContent speaker={speaker} data={data} router={router} loginUser={loginUser} userAddress={userAddress} userPosition={userPosition} />
		</>
	)
}

export default VirtualExpoInfo

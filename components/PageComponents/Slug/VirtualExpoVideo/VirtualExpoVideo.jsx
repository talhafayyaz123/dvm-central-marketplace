import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { baseApiUrl, siteUrl } from '../../../../utils/config'
import { DarkLoader } from '../../../Loader/Loader'
import MetaTags from '../../../UI/MetaTags/MetaTags'
import NotAuthorized from '../../../UI/NotAuthorized/NotAuthorized'
import Video from './Video/Video'
import VideoQuiz from './VideoQuiz/VideoQuiz'
import styles from './VirtualExpoVideo.module.css'
import { useRouter } from 'next/router'
import useLocalStorageState from 'use-local-storage-state'
import { GlobalProvider } from '../../../../context/AppProvider'

const VirtualExpoVideo = ({ result }) => {
	const router = useRouter()
	const { meta_description, meta_keywords, meta_title, webinar } = result

	const { loginUser } = useContext(GlobalProvider)

	const [userWatchTime, setuserWatchTime] = useLocalStorageState('userLocalStorageWatchTime', {
		defaultValue: 0
	})
	const [watchedTime, setwatchedTime] = useState()
	const [pageChanging, setpageChanging] = useState(false)
	const [progressBar, setprogressBar] = useState(0)
	const [loading, setloading] = useState(true)
	const [dataEvaluation, setdataEvaluation] = useState(true)
	const [userVirtualExpoCertificate, setuserVirtualExpoCertificate] = useState('')
	const [pageLoadUserVirtualExpoStatus, setpageLoadUserVirtualExpoStatus] = useState('Fail')

	const getuserVirtualExpoStatus = async () => {
		const res = await axios.get(`${baseApiUrl}/virtual-expo/quiz/status/${webinar?.id}/${loginUser?.id}`)

		console.log('res from webinar', res)
		setuserVirtualExpoCertificate(res?.data?.webinarWithCertificate?.certificate)
		setpageLoadUserVirtualExpoStatus(res?.data?.status)
		setuserWatchTime(() => (res?.data?.watchTimeRecord !== null && res?.data?.watchTimeRecord?.watch_time !== null ? res?.data?.watchTimeRecord?.watch_time : 0))
		setTimeout(() => {
			setloading(false)
		}, 1000)
		setTimeout(() => {
			setdataEvaluation(false)
		}, 2000)
	}

	const sendUserWatchTime = async () => {
		if (localStorage.getItem('userLocalStorageWatchTime') > 0) {
			const res = await axios.get(`${baseApiUrl}/virtual-expo/video/watch-time?watch_time=${localStorage.getItem('userLocalStorageWatchTime')}&webinar_id=${webinar?.id}&user_id=${loginUser?.id}`)
			res?.status === 200 && setwatchedTime(res?.data?.watch_time?.watch_time)

			setpageChanging(false)
		} else return
	}

	useEffect(() => {
		const interval = setInterval(() => {
			sendUserWatchTime()
		}, 60 * 1000)

		watchedTime > userWatchTime ? watchedTime : setwatchedTime(() => userWatchTime)

		return () => {
			pageChanging && sendUserWatchTime() && clearInterval(interval) && setuserWatchTime(0)
		}
	}, [pageChanging])

	useEffect(() => {
		if (loginUser?.id !== undefined) {
			getuserVirtualExpoStatus()
		} else
			setTimeout(() => {
				setloading(false)
			}, 1000)
	}, [loginUser])

	return loading ? (
		<DarkLoader className={styles.loader} />
	) : (
		<>
			<MetaTags title={meta_title} description={meta_description} keywords={meta_keywords} />

			{loginUser?.id !== undefined ? (
				<>
					<Video loading={loading} webinar={webinar} pageChanging={pageChanging} watchedTime={watchedTime} userWatchTime={userWatchTime} setpageChanging={setpageChanging} setuserWatchTime={setuserWatchTime} setprogressBar={setprogressBar} />

					<div className={`inner-sec-mb ${dataEvaluation ? styles.hide_quiz : styles.show_quiz}`}>
						{(watchedTime / 60).toFixed(0) >= (router?.asPath === '/virtual-expo/radiosurgery-an-advanced-surgical-tool/video' ? 25 : 50) ? (
							<>
								{pageLoadUserVirtualExpoStatus === 'Fail' && <VideoQuiz webinarId={webinar?.id} quizData={webinar?.quiz} userVirtualExpoCertificate={userVirtualExpoCertificate} setuserVirtualExpoCertificate={setuserVirtualExpoCertificate} />}

								{pageLoadUserVirtualExpoStatus === 'Pass' && (
									<section className={`${styles.download_container} sec-container`}>
										<h4 className='inner-sec-mt'>You can download the certificate from below link.</h4>

										<a className={styles.download_btn} href={userVirtualExpoCertificate} target='_blank' download rel='noopener noreferrer'>
											<button className='primary-btn'>
												Download Certificate{' '}
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-6 h-6'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
												</svg>
											</button>
										</a>
									</section>
								)}
							</>
						) : (
							<>
								<div className='sml-sec-container'>
									<div className={`${styles.progress_bar_wrapper} sec-container`}>
										<div className={`${styles.bar} transition`} style={{ width: `${progressBar}%` }} />
										<div className={`${styles.percentage} ${progressBar > 80 ? styles.more_than : styles.less_than}`}> {progressBar >= 100 ? 100 : progressBar}% watched</div>
									</div>
								</div>
								<div className={`sec-container`}>
									<div className={`red-color ${styles.note}`}>{`Watch at-least ${router?.asPath === '/virtual-expo/radiosurgery-an-advanced-surgical-tool/video' ? '25' : '50'} minutes of video to access quiz. After passing quiz, you can download your certificate`}.</div>
								</div>
							</>
						)}
					</div>
				</>
			) : (
				<NotAuthorized className='sec-pb' heading={`You need to sign in to access this page...`} btnText={`Sign in`} href={`${siteUrl}auth/signin`} />
			)}
		</>
	)
}

export default VirtualExpoVideo

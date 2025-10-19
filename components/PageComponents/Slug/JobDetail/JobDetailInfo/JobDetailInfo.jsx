import React, { useEffect, useState } from 'react'
import styles from './JobDetailInfo.module.css'
import Link from 'next/link'
import { lockScroll } from '../../../../../utils/scrollLock'

import dynamic from 'next/dynamic'
import currencyFormat from '../../../../../utils/currencyFormat'

const Modal = dynamic(() => import('../../../../UI/Modal/Modal'), { ssr: false })
const JobModal = dynamic(() => import('./JobModal/JobModal'), { ssr: false })

const JobDetail = ({ data, educationList, userDataExists, loginUser, userData, status }) => {
	const [modal, setmodal] = useState(false)

	const [jobAppliedStatus, setjobAppliedStatus] = useState(data?.already_applied)
	const [showApplybtn, setshowApplybtn] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			status !== 'loading' && setshowApplybtn(true)
		}, 500)
	}, [status])

	return (
		<>
			{showApplybtn && (
				<Modal modal={modal} setmodal={setmodal}>
					{modal && <JobModal educationList={educationList} jobDetail={data} setmodal={setmodal} jobAppliedStatus={jobAppliedStatus} setjobAppliedStatus={setjobAppliedStatus} loginUser={loginUser} userDataExists={userDataExists} />}
				</Modal>
			)}

			<div className={`${styles.job_detail_container} sml-shadow radius`}>
				<div className={`${styles.job_detail_wrapper}`}>
					<div className={styles.title_wrapper}>
						<h4 className='primary-color'>{data?.title}</h4>
						{status !== 'loading' &&
							showApplybtn &&
							(loginUser?.id !== undefined ? (
								userData?.position === 'Sales Rep' &&
								(jobAppliedStatus ? (
									<button className='gray-border gray-color' disabled>
										Applied
									</button>
								) : (
									(data?.application_prefrences?.application_deadline === null || data?.application_prefrences?.application_deadline === '' || new Date(data?.application_prefrences?.application_deadline) >= new Date(new Date().setHours(0, 0, 0, 0))) && (
										<button className='primary-btn' onClick={() => (setmodal(true), lockScroll())}>
											Apply Job
										</button>
									)
								))
							) : (
								<Link href='/auth/signin#job-apply'>
									<a>
										<button className='primary-btn'>Sign In to Apply</button>
									</a>
								</Link>
							))}
					</div>

					<div className={`${styles.hiring} ${styles.wrapper}`}>
						{data?.urgent_hiring === 1 && (
							<div className={styles.icon_wrapper}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
									<path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
								</svg>
								<span className='semibold-text'>Urgent Hiring</span>
							</div>
						)}

						{data?.salary !== null && (
							<div className={styles.icon_wrapper}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
									<path d='M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z' />
									<path
										fillRule='evenodd'
										d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z'
										clipRule='evenodd'
									/>
								</svg>

								<span className='semibold-text'>
									{currencyFormat(data?.salary)} {data?.salary_type_?.name}
								</span>
							</div>
						)}

						{data?.application_prefrences?.application_deadline && (
							<div className={styles.validity}>
								<span className='gray-color'>Last date to apply: </span>
								<span className='semibold-text'>{data?.application_prefrences?.application_deadline}</span>
							</div>
						)}
					</div>

					{data?.description !== null && (
						<>
							<h5>Job Description</h5>
							<div className={`${styles.description} dynamic-data gray-color`} dangerouslySetInnerHTML={{ __html: data?.description }} />
						</>
					)}
					{((data?.required_experience_num !== null && data?.required_experience_num > 0) || (data?.minimum_education_level !== null && data?.minimum_education_level?.name !== null)) && (
						<ul className={styles.requirment}>
							<h5>Job Requirements</h5>
							{data?.required_experience_num !== null && data?.required_experience_num > 0 && (
								<li className='gray-color'>
									At least {data?.required_experience_num} {data?.required_experience_duration}
									{data?.required_experience_num > 1 ? 's' : ''} experience in the field of {data?.required_experience_title}.
								</li>
							)}

							{data?.minimum_education_level !== null && data?.minimum_education_level?.name !== null && <li className='gray-color'>Required minimum {data?.minimum_education_level?.name} qualification.</li>}
						</ul>
					)}
				</div>
			</div>
		</>
	)
}

export default JobDetail

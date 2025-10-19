import React, { useState } from 'react'
import styles from './JobModal.module.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { baseApiUrl } from '../../../../../../utils/config'
import { LiteLoader } from '../../../../../Loader/Loader'
import { unlockScroll } from '../../../../../../utils/scrollLock'

import Message from '../../../../../UI/Message/Message'
import Link from 'next/link'

const JobModal = ({ setmodal, jobDetail, jobAppliedStatus, setjobAppliedStatus, loginUser, userDataExists }) => {
	const [btndisabled, setbtndisabled] = useState(false)
	const [loading, setloading] = useState(false)

	const [submitmsg, setsubmitmsg] = useState('')
	const [formsubmit, setformsubmit] = useState(false)
	const [formSuccess, setformSuccess] = useState(false)

	const {
		register,
		setValue,
		setError,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm()

	// const resumeValidation = (val) => {
	// 	if (val?.length === 0) {
	// 		return 'required'
	// 	} else if (val[0]?.type !== 'application/pdf' && val[0]?.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && val[0]?.type !== 'application/msword') {
	// 		return 'Only .pdf, .doc and .docx files are allowed.'
	// 	} else return true
	// }

	const onSubmit = async (data) => {
		setbtndisabled(true)
		setloading(true)

		let formData = new FormData()

		formData.append('cover_letter', data?.cover_letter)
		formData.append('vendor_job_id', jobDetail?.application_prefrences?.vendor_job_id)
		formData.append('customer_id', loginUser?.id)

		jobDetail?.predefined_questions_list?.length > 0 &&
			jobDetail?.predefined_questions_list?.map((quest, i) => {
				const { id } = quest
				formData.append(`predef_question_id[${id}]`, id)
				formData.append(`predef_answer[${id}]`, data?.[`predef_question${i}`])
			})

		jobDetail?.application_questions?.length > 0 &&
			jobDetail?.application_questions?.map((quest, i) => {
				const { id } = quest
				formData.append(`question_id[${id}]`, id)
				formData.append(`answer[${id}]`, data?.[`question${i}`])
			})

		const res = await axios.post(`${baseApiUrl}/apply/job`, formData)
		setsubmitmsg(res?.data?.message)
		setloading(false)
		setbtndisabled(false)
		setformsubmit(true)
		setformSuccess(res?.data?.success)

		if (res?.data?.success) {
			reset()
			setjobAppliedStatus(true)

			unlockScroll()
			setTimeout(() => {
				setformsubmit(false)
				setmodal(false)
			}, 5000)
		}
	}

	return (
		<>
			<div className={`${styles.modal_container} `}>
				<div className={`${styles.modal_wrapper}`}>
					{userDataExists ? (
						<>
							<h4 className={`${styles.title} primary-color`}>Fill The Application Form</h4>
							<p className='gray-color' style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
								Fill the form with your correct information.
							</p>
							<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
								{/* pre-defined questions */}
								{jobDetail?.predefined_questions_list?.length > 0 &&
									jobDetail?.predefined_questions_list?.map((quest, i) => {
										const { name } = quest

										return (
											<div key={name} className={styles.wrapper}>
												<div className={styles.inner_wrapper}>
													<label className='black-color' htmlFor={`predef_question${i}`}>
														{name} <span className='red-color'>*</span>
													</label>

													{errors?.[`predef_question${i}`] && (
														<div className={styles.error_msg} role='alert'>
															required
														</div>
													)}
												</div>

												<input
													className={`${styles.input} ${errors?.[`predef_question${i}`] ? 'input-error' : undefined}`}
													{...register(`predef_question${i}`, {
														required: true,
														pattern: {
															value: /.*\S.*/,
															message: 'enter something'
														},
														onChange: (e) => setValue(`predef_question${i}`, e.target.value)
													})}
													aria-invalid={errors?.[`predef_question${i}`] ? 'true' : 'false'}
													type='text'
													placeholder='Enter your answer'
													name={`predef_question${i}`}
												/>
											</div>
										)
									})}

								{/* questions */}
								{jobDetail?.application_questions?.length > 0 &&
									jobDetail?.application_questions?.map((quest, i) => {
										const { question } = quest

										return (
											<div key={question} className={styles.wrapper}>
												<div className={styles.inner_wrapper}>
													<label className='black-color' htmlFor={`question${i}`}>
														{question} <span className='red-color'>*</span>
													</label>

													{errors?.[`question${i}`] && (
														<div className={styles.error_msg} role='alert'>
															required
														</div>
													)}
												</div>

												<input
													className={`${styles.input} ${errors?.[`question${i}`] ? 'input-error' : undefined}`}
													{...register(`question${i}`, {
														required: true,
														pattern: {
															value: /.*\S.*/,
															message: 'enter something'
														},
														onChange: (e) => setValue(`question${i}`, e.target.value)
													})}
													aria-invalid={errors?.[`question${i}`] ? 'true' : 'false'}
													type='text'
													placeholder='Enter your answer'
													name={`question${i}`}
												/>
											</div>
										)
									})}

								{/* cover letter */}
								<div className={`${styles.wrapper} ${styles.address}`}>
									<div className={styles.inner_wrapper}>
										<label className='black-color' htmlFor='cover_letter'>
											Cover Letter
										</label>

										{errors.cover_letter?.message && (
											<div className={styles.error_msg} role='alert'>
												{errors.cover_letter?.message}
											</div>
										)}
									</div>

									<textarea
										{...register('cover_letter', {
											required: false,
											minLength: { value: 2, message: 'Min 2 characters' },
											pattern: {
												value: /.*\S.*/,
												message: 'Enter something'
											}
										})}
										aria-invalid={errors.cover_letter ? 'true' : 'false'}
										className={`${styles.textarea} ${errors.cover_letter ? 'input-error' : undefined} transition`}
										placeholder='Message'
										minLength={2}
									/>
								</div>

								{formsubmit && <Message resMsg={submitmsg} formSuccess={formSuccess} />}
								{!jobAppliedStatus && (
									<div className={`${styles.inner_wrapper} ${styles.address}`}>
										<button type='button' className={`${styles.btn} ${styles.cancel_btn} white-color transition`} onClick={() => (setmodal(false), unlockScroll())}>
											Cancel
										</button>

										<button disabled={btndisabled} type='submit' className={`${styles.btn} primary-btn`}>
											Submit
											{loading && <LiteLoader className={styles.submit_loader} />}
										</button>
									</div>
								)}
							</form>
						</>
					) : (
						<div className={styles.complete_profile}>
							<h4>Your profile is Incomplete.</h4>
							<p className='gray-color'>Click the below button to complete your profile and apply for the job.</p>
							<Link href={`/dashboard/build-resume`}>
								<a>
									<button className='primary-btn white-color dim'>Complete Profile</button>
								</a>
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default JobModal

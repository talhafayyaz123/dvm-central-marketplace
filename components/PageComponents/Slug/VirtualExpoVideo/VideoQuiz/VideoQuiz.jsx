import React, { useContext, useEffect, useState } from 'react'
import styles from './VideoQuiz.module.css'
import { useForm } from 'react-hook-form'
import Message from '../../../../UI/Message/Message'
import { LiteLoader } from '../../../../Loader/Loader'
import axios from 'axios'
import { baseApiUrl, imgApiUrl } from '../../../../../utils/config'
import Modal from '../../../../UI/Modal/Modal'
import { lockScroll, unlockScroll } from '../../../../../utils/scrollLock'
import ImgWithLoader from '../../../../UI/ImgWithLoader/ImgWithLoader'
import placeholderImg from '/public/imgs/no-img.webp'
import { GlobalProvider } from '../../../../../context/AppProvider'

const VideoQuiz = ({ quizData, webinarId, userVirtualExpoCertificate, setuserVirtualExpoCertificate }) => {
	const [nullQuiz, setnullQuiz] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [quizSubmitting, setquizSubmitting] = useState(false)
	const [quizResult, setquizResult] = useState({})
	const [quizSubmitted, setquizSubmitted] = useState(false)
	const [activeSlideIndex, setactiveSlideIndex] = useState(0)
	const [selectedOption, setselectedOption] = useState(0)
	const [trueOptionSelected, settrueOptionSelected] = useState(false)
	const [activeOptionIndex, setactiveOptionIndex] = useState(null)
	const [modal, setmodal] = useState(false)
	const [rightOptionIndex, setrightOptionIndex] = useState(null)
	const [optionChecked, setoptionChecked] = useState(false)
	const [nextBtnDisabled, setnextBtnDisabled] = useState(false)
	const [userVirtualExpoStatus, setuserVirtualExpoStatus] = useState('Fail')

	const { loginUser } = useContext(GlobalProvider)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm()

	const submitHandler = (e, quiz) => {
		e.preventDefault()
		if (!optionChecked) {
			setnullQuiz(true)
		} else {
			selectedOption === 1 && setnextBtnDisabled(true)
			let rightOptionIndex = quiz?.options?.findIndex((option) => option?.is_true === 1)
			setrightOptionIndex(rightOptionIndex + 1)
			settrueOptionSelected(() => (selectedOption === 1 ? true : false))
			setmodal(selectedOption !== 1 ? true : false)
			selectedOption !== 1 ? lockScroll() : unlockScroll()
			selectedOption === 1 &&
				setTimeout(() => {
					handleSubmit(onSubmit)()
				}, 2000)
		}
	}

	const onSubmit = async (data) => {
		setbtndisabled(true)
		setquizSubmitting(true)
		let formData = new FormData()
		formData.append('user_id', loginUser?.id)
		formData.append('webinar_id', webinarId)
		formData.append('quiz_id', quizData?.id)
		Object.keys(data).forEach((questionId, index) => {
			formData.append(`question_ids[${index}]`, questionId)
		})
		Object.values(data).forEach((quizOption, index) => {
			formData.append(`selected_option[${index}]`, quizOption)
		})
		const res = await axios.post(`${baseApiUrl}/virtual-expo/quiz/store`, formData)
		console.log('res from quiz', res)

		if (res?.data?.result?.status === 'Pass') {
			setuserVirtualExpoCertificate(res?.data?.certificate)
			setuserVirtualExpoStatus(res?.data?.result?.status)
		}

		setTimeout(() => {
			reset()
			setquizResult(res?.data?.result)
			setquizSubmitted(true)
			setquizSubmitting(false)
			setbtndisabled(false)
		}, 1000)
	}

	const optionChangeHandler = async (optionIsTrue, index) => {
		setselectedOption(optionIsTrue)
		setactiveOptionIndex(index)
	}

	const nextSlideHanlder = async (quiz) => {
		if (!optionChecked) {
			setnullQuiz(true)
		} else {
			selectedOption === 1 && setnextBtnDisabled(true)
			let rightOptionIndex = quiz?.options?.findIndex((option) => option?.is_true === 1)
			setrightOptionIndex(rightOptionIndex + 1)
			settrueOptionSelected(() => (selectedOption === 1 ? true : false))
			setmodal(selectedOption !== 1 ? true : false)
			selectedOption !== 1 ? lockScroll() : unlockScroll()
			setTimeout(() => {
				settrueOptionSelected(false)
				setnullQuiz(false)
				// setoptionChecked(false)

				if (activeSlideIndex === quizData?.questions?.length - 1) {
					setnextBtnDisabled(true)
				} else {
					selectedOption === 1 && setactiveSlideIndex((prev) => prev !== quizData?.questions?.length - 1 && prev + 1)

					selectedOption === 1 && setnextBtnDisabled(false)
				}
			}, 2000)
		}
	}

	useEffect(() => {
		setoptionChecked(false)
	}, [activeSlideIndex])

	useEffect(() => {}, [optionChecked])

	return (
		<>
			<Modal modal={modal} setmodal={setmodal} modalType='expo-quiz'>
				<div className={`${styles.msg_wrapper} radius`}>
					<div className={styles.msg}>Oops, you selected the wrong answer!</div>
					<div className={styles.right_option}>
						<button className='sml-btn radius'>Option - {rightOptionIndex}</button> is the right answer.
					</div>
					<button
						className={`primary-btn white-color`}
						onClick={() => {
							setmodal(false)
							unlockScroll()
							if (activeSlideIndex === quizData?.questions?.length - 1) {
								handleSubmit(onSubmit)()
							} else {
								setactiveSlideIndex((prev) => prev !== quizData?.questions?.length - 1 && prev + 1)
							}
						}}
					>
						Ok
					</button>
				</div>
			</Modal>

			<section className='sec-container'>
				<div className={`inner-sec-mb ${styles.quiz_container}`}>
					<h4 className='inner-sec-mt'>You can get the certificate after passing the quiz below</h4>

					{quizSubmitted ? (
						<>
							<div className={`${styles.quiz_score} ${styles.quiz_form} radius shadow inner-sec-mt`}>
								<h4 className='primary-color'>Below Is Your Quiz Result</h4>
								{quizResult?.status === 'Pass' ? (
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='var(--green)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
									</svg>
								) : (
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='var(--red)'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
										/>
									</svg>
								)}
								<h4 className='primary-color'>{quizResult?.status === 'Fail' ? 'Sorry' : 'Congratulations'}</h4>
								<div className={`${styles.status}`}>{quizResult?.status === 'Fail' ? 'You are not eligible for the certificate, try again.' : 'An email has sent to your email account with the link of certificate to download. Please check your email.'} </div>
								{/* <div>Attempted Questions : {quizResult?.attempted_questions}</div> */}
								<div>Total Marks : {quizResult?.total_marks}</div>
								<div className={`semibold-text primary-color ${styles.obtained_marks}`}>Obtained Marks : {quizResult?.obtained_marks}</div>
								{quizResult?.status !== 'Pass' && (
									<button className='primary-btn white-color' onClick={() => (setactiveSlideIndex(0), settrueOptionSelected(false), setnullQuiz(false), setnextBtnDisabled(false), setquizSubmitted(false))}>
										Reattempt Quiz
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='var(--white)'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
										</svg>
									</button>
								)}
								{userVirtualExpoStatus === 'Pass' && (
									<div section className={`${styles.download_container}`}>
										<h4 className='inner-sec-mt'>You can download the certificate from below button.</h4>

										<a className={styles.download_btn} href={userVirtualExpoCertificate} target='_blank' download rel='noopener noreferrer'>
											<button className='primary-btn'>
												Download Certificate{' '}
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-6 h-6'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
												</svg>
											</button>
										</a>
									</div>
								)}
							</div>
						</>
					) : quizData?.questions?.length > 0 ? (
						<form className={`${styles.quiz_form} radius shadow inner-sec-mt`}>
							<div className={styles.quiz_slider_wrapper}>
								{quizData?.questions?.map((quiz, index) => {
									return (
										<div key={quiz?.question} className={`${styles.quiz_slide} ${activeSlideIndex === index && styles.active_slide} white-bg`}>
											{quiz?.options?.length > 0 && (
												<>
													<h4 className={`${styles.question} primary-color`}>
														{index + 1} - {quiz?.question}
													</h4>
													{quiz?.image !== null && <ImgWithLoader className={styles.quiz_img} width={quiz?.width} height={quiz?.height} src={quiz?.image !== null ? `${imgApiUrl.virtualExpo.quiz}/${quiz?.image}` : placeholderImg} alt={quiz?.question} />}
													<div>
														{quiz?.options?.map((option, i) => {
															return (
																<label key={option?.id} className={`${styles.label_wrapper} ${trueOptionSelected && activeOptionIndex === i && styles.true_option}`} htmlFor={quiz?.id}>
																	{option?.answer}
																	<input disabled={nextBtnDisabled} className='checkbox' type='radio' value={option?.id} {...register(`${quiz?.id}`)} onClick={() => setoptionChecked(true)} onChange={() => (settrueOptionSelected(false), setnullQuiz(false), optionChangeHandler(option?.is_true, i))} />
																	<span className={`${styles.checkmark} ${styles.radio_check}`}> </span>
																</label>
															)
														})}
													</div>
												</>
											)}

											{nullQuiz && <Message className={styles.quiz_error} resMsg='Select an option to proceed' formSuccess={false} />}

											{activeSlideIndex !== quizData?.questions?.length - 1 ? (
												<button type='button' disabled={nextBtnDisabled} className={`${styles.next_btn} primary-btn transition white-color`} onClick={() => nextSlideHanlder(quiz)}>
													Next
												</button>
											) : (
												<button onClick={(e) => submitHandler(e, quiz)} type='submit' disabled={btndisabled} className={`${styles.submit_btn} primary-btn`}>
													Submit
													{quizSubmitting && <LiteLoader className={styles.submit_loader} />}
												</button>
											)}
										</div>
									)
								})}
								<div className={`${styles.progress} ${nextBtnDisabled && styles.show_progress}`} />
							</div>
						</form>
					) : (
						<div className={`${styles.no_quiz} red-color inner-sec-mt`}>Quiz coming soon!</div>
					)}
				</div>
			</section>
		</>
	)
}

export default VideoQuiz

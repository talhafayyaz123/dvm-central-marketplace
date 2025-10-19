import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styles from './QAS.module.css'
import { useSession } from 'next-auth/react'
import { baseApiUrl, siteUrl } from '../../../../../../../utils/config'
import { DarkLoader } from '../../../../../../Loader/Loader'

const QAS = ({ qaData, showQA, setqaData, qaLoading, getQAData, vendorId, productId }) => {
	const { data: session } = useSession()
	const [loading, setloading] = useState(false)
	const [ansSumbitLoading, setansSumbitLoading] = useState(false)
	const [showSubmitAnswer, setshowSubmitAnswer] = useState(false)
	const [clickedReplyInput, setclickedReplyInput] = useState(null)
	const [answerVal, setanswerVal] = useState('')
	const [btnDisabled, setbtnDisabled] = useState(false)
	const [questionSubmitError, setquestionSubmitError] = useState(false)

	const showSubmitAnswerHandler = async (id) => {
		const newclickedReplyInput = await id
		setclickedReplyInput(newclickedReplyInput)
		setshowSubmitAnswer(true)
	}

	useEffect(() => {
		getQAData()
	}, [])

	const submitAnswerhandler = async (id) => {
		const inputValidation = /.*\S.*/.test(answerVal)
		if (!inputValidation) {
			setquestionSubmitError(true)
			return
		} else {
			setquestionSubmitError(false)
			setansSumbitLoading(true)
			setbtnDisabled(true)
			const data = {
				product_questions_id: id,
				vendor_id: vendorId,
				customer_id: session?.user?.id,
				answer: answerVal
			}

			const res = await axios.post(`${baseApiUrl}/product-answer`, data)

			setanswerVal('')
			setbtnDisabled(false)
			setansSumbitLoading(false)
			getQAData()
		}
	}

	const questionSearchHandler = async (val) => {
		setloading(true)
		const data = {
			search: val,
			product_id: productId
		}
		const res = await axios.post(`${baseApiUrl}/search-product-question`, data)
		setqaData(res?.data?.data)
		setloading(false)
	}

	return (
		showQA && (
			<div className={styles.user_qa_container}>
				<h5>
					{`Customer question & answers`} {qaLoading && <DarkLoader className={styles.user_qa_loader} />}
				</h5>

				<div className={`${styles.input_wrapper} gray-border `}>
					{loading ? (
						<DarkLoader loaderType='sml' />
					) : (
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
						</svg>
					)}
					<input type='search' placeholder='Have a question? Search for answers' onChange={(e) => questionSearchHandler(e.target.value)} />
				</div>

				<div className={styles.qa_listing_wrapper}>
					{qaData?.length > 0
						? qaData?.map((qa) => {
								return (
									qa?.question !== null && (
										<div key={qa?.id} className={`${styles.qa_wrapper}`}>
											<div className={styles.q_wrapper}>
												<div className={styles.qa}>Question : </div>
												<p className='black-color'>{qa?.question}</p>
											</div>

											{qa?.answers?.length > 0 && (
												<div className={styles.a_wrapper}>
													<div className={styles.qa}>Answer : </div>
													<div className={styles.answers_wrapper}>
														{qa?.answers?.map((a, index) => {
															return (
																<p key={a?.id} className={`${styles.answer} gray-color`}>
																	{index + 1} - {a?.answer}
																</p>
															)
														})}
													</div>
												</div>
											)}
											<div className={styles.submit_ans_wrapper}>
												<div className={styles.qa}>
													{session ? (
														showSubmitAnswer && qa?.id === clickedReplyInput ? (
															<button disabled={btnDisabled} className={`${styles.reply_btn} sml-btn primary-border gray-color`} onClick={() => submitAnswerhandler(qa?.id)}>
																Submit
															</button>
														) : (
															<button className={`${styles.reply_btn} sml-btn gray-border gray-color`} onClick={() => showSubmitAnswerHandler(qa?.id)}>
																Reply
															</button>
														)
													) : (
														<a href={`${siteUrl}auth/signin`}>
															<button className={`${styles.reply_btn} sml-btn gray-border gray-color`} onClick={() => showSubmitAnswerHandler(qa?.id)}>
																Sign in to reply
															</button>
														</a>
													)}
												</div>
												{showSubmitAnswer && qa?.id === clickedReplyInput && (
													<div className={styles.input_container}>
														<div className={styles.answer_input_wrapper}>
															<input type='search' placeholder='Submit your reply here' value={answerVal} onChange={(e) => setanswerVal(e.target.value)} /> {ansSumbitLoading && <DarkLoader className={styles.answ_subm_loader} />}
														</div>
														{questionSubmitError && <div className={styles.input_error}>{`Answer can't be empty`}</div>}
													</div>
												)}
											</div>
										</div>
									)
								)
						  })
						: !qaLoading && <div className={`${styles.no_result} red-color`}>No question found, revise your search.</div>}
				</div>
			</div>
		)
	)
}

export default QAS

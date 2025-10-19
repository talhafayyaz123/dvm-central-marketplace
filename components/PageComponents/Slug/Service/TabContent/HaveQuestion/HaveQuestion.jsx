import axios from 'axios'
import React, { useState } from 'react'
import styles from './HaveQuestion.module.css'
import { baseApiUrl, siteUrl } from '../../../../../../utils/config'
import Message from '../../../../../UI/Message/Message'
import { LiteLoader } from '../../../../../Loader/Loader'

const HaveQuestion = ({ vendorId, getQAData, serviceId, loginUser, sethasMoreData, setcurrentPage, setlastPage }) => {
	const [userQuestion, setuserQuestion] = useState('')
	const [resMsg, setresMsg] = useState('')
	const [formSuccess, setformSuccess] = useState(false)
	const [showMsg, setshowMsg] = useState(false)
	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)

	const questionSubmitHandler = async (e) => {
		e.preventDefault()
		setshowMsg(false)

		const questionValidation = /.*\S.*/.test(userQuestion)

		const data = {
			vendor_id: vendorId,
			customer_id: loginUser?.id,
			service_id: serviceId,
			question: userQuestion
		}

		if (!questionValidation) {
			setformSuccess(false)
			setresMsg(`question can't be empty`)
			setshowMsg(true)
			return
		} else {
			setloading(true)
			setbtndisabled(true)

			const res = await axios.post(`${baseApiUrl}/product-question`, data)

			setuserQuestion('')
			setformSuccess(true)
			setresMsg(res?.data?.message)
			setshowMsg(true)
			setloading(false)
			setbtndisabled(false)
			setloading(false)
			getQAData()

			setTimeout(() => {
				setshowMsg((prev) => prev === true && false)
			}, 5000)
		}
	}
	return (
		<div className={`${styles.have_question}`}>
			<div className={styles.have_question_wrapper}>
				<div className={styles.question}>
					<div className={styles.title_wrapper}>
						<h5>Have a Question?</h5>
						{showMsg && <Message className={styles.msg} resMsg={resMsg} formSuccess={formSuccess} />}
					</div>
					<p className='gray-color'>{`Find answers in product info, Q&As and reviews`}</p>
					{loginUser?.id !== undefined ? (
						<form onSubmit={(e) => questionSubmitHandler(e)} className={`${styles.question_form} full-radius`}>
							<input type='text' min={5} placeholder='Type your question...' value={userQuestion} onChange={(e) => setuserQuestion(e.target.value)} />

							<button disabled={btndisabled} type='submit' className='primary-btn white-color'>
								Submit {loading && <LiteLoader className={styles.loader} />}
							</button>
						</form>
					) : (
						<div className={`${styles.question_form} full-radius`}>
							<input type='text' min={5} placeholder='Type your question...' value={userQuestion} onChange={(e) => setuserQuestion(e.target.value)} />

							<a href={`${siteUrl}auth/signin`}>
								<button className='primary-btn white-color'>Sign in to Submit</button>
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default HaveQuestion

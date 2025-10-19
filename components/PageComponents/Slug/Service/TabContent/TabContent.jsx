import React, { useRef, useState, useEffect, useContext } from 'react'
import styles from './TabContent.module.css'
import Description from './Description/Description'
import Reviews from './ReviewsAndSubmit/Reviews'
import HaveQuestion from './HaveQuestion/HaveQuestion'
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers'
import { baseApiUrl } from '../../../../../utils/config'
import axios from 'axios'
import Submit from './ReviewsAndSubmit/Submit/Submit'
import { scrollToData } from '../../../../../utils/scrollTo'
import { GlobalProvider } from '../../../../../context/AppProvider'
let gsap, ScrollToPlugin

const TabContent = ({ displayType, setdisplayType, description, vendorId, serviceId, rating, ratingBars, reviewCount }) => {
	const [qaData, setqaData] = useState([])
	const [showQA, setshowQA] = useState(false)
	const [qaLoading, setqaLoading] = useState(false)

	const { loginUser, userData } = useContext(GlobalProvider)

	const containerRef = useRef(null)

	const getQAData = async () => {
		setqaLoading(true)
		const data = {
			service_id: serviceId
		}
		const res = await axios.post(`${baseApiUrl}/all-question-answers`, data)
		setqaData(res?.data?.data?.allQuestionAnswers)
		setshowQA(res?.data?.data?.allow_questions)
		setqaLoading(false)
	}

	const clickHandler = async (type) => {
		if (displayType !== type) {
			setdisplayType(type)
			if (gsap === undefined) {
				gsap = (await import('gsap')).default
				ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

				gsap.registerPlugin(ScrollToPlugin)
			}

			scrollToData(gsap, containerRef?.current, 150)
		}
	}

	useEffect(() => {
		const links = document.querySelectorAll('.dynamic-data a')
		links?.length > 0 && links.forEach((link) => (!link.querySelector('img') && link.classList.add('link'), link.setAttribute('target', '_blank')))
	}, [displayType])

	return (
		<section className='sec-container'>
			<div className={`${styles.tab_container} inner-sec-mt inner-sec-pb`}>
				<div className={styles.tab_headings}>
					<button className={`${displayType === 'description' ? styles.active : undefined}`} onClick={() => clickHandler('description')}>
						Description
					</button>

					<button className={`${displayType === 'question' ? styles.active : undefined}`} onClick={() => clickHandler('question')}>
						Have Question?
					</button>
					<button className={`${displayType === 'reviews' ? styles.active : undefined}`} onClick={() => clickHandler('reviews')}>
						Reviews
					</button>

					{loginUser?.id !== undefined && userData?.position !== undefined && userData?.position !== 'Sales Rep' && (
						<button className={`${displayType === 'submit-review' ? styles.active : undefined}`} onClick={() => clickHandler('submit-review')}>
							Submit a Review
						</button>
					)}
				</div>

				<div ref={containerRef} className={styles.content}>
					{displayType === 'description' && description !== null ? (
						<Description data={description} />
					) : displayType === 'question' ? (
						<div className={styles.qas_containers}>
							<HaveQuestion serviceId={serviceId} vendorId={vendorId} getQAData={getQAData} loginUser={loginUser} />
							<QuestionsAnswers qaLoading={qaLoading} qaData={qaData} showQA={showQA} setqaData={setqaData} serviceId={serviceId} vendorId={vendorId} getQAData={getQAData} loginUser={loginUser} setshowQA={setshowQA} />
						</div>
					) : displayType === 'reviews' ? (
						<Reviews serviceId={serviceId} rating={rating} ratingBars={ratingBars} reviewCount={reviewCount} />
					) : (
						displayType === 'submit-review' && (
							<div className={styles.submit_wrapper}>
								<Submit serviceId={serviceId} loginUser={loginUser} />
							</div>
						)
					)}
				</div>
			</div>
		</section>
	)
}

export default TabContent

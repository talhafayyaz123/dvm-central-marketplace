import React, { useRef, useState, useEffect } from 'react'
import styles from './TabContent.module.css'
import Description from './Description/Description'
import Reviews from './ReviewsAndSubmit/Reviews'
import HaveQuestion from './HaveQuestion/HaveQuestion'
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers'
import pdfIcon from '/public/icons/pdf-icon.svg'
import Image from 'next/image'
import { baseApiUrl, imgApiUrl } from '../../../../../utils/config'
import ProductWarranty from './ProductWarranty/ProductWarranty'
import axios from 'axios'
import Submit from './ReviewsAndSubmit/Submit/Submit'
import { scrollToData } from '../../../../../utils/scrollTo'
import ProductQuestion from './HaveQuestion/ProductQuestion/ProductQuestion'
let gsap, ScrollToPlugin

const TabContent = ({ displayType, setdisplayType, description, warrantyData, vendorId, productId, rating, ratingBars, reviewCount, guide, productFAQ, loginUser, userPosition, quickFacts }) => {
	const [qaData, setqaData] = useState([])
	const [showQA, setshowQA] = useState(false)
	const [qaLoading, setqaLoading] = useState(false)

	const containerRef = useRef(null)

	const getQAData = async () => {
		setqaLoading(true)
		const data = {
			product_id: productId
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
					<button className={`${displayType === 'warranty' ? styles.active : undefined}`} onClick={() => clickHandler('warranty')}>
						Warranty
					</button>
					<button className={`${displayType === 'question' ? styles.active : undefined}`} onClick={() => clickHandler('question')}>
						Have Question?
					</button>
					<button className={`${displayType === 'reviews' ? styles.active : undefined}`} onClick={() => clickHandler('reviews')}>
						Reviews
					</button>

					{loginUser?.id !== undefined && userPosition !== undefined && userPosition !== 'Sales Rep' && (
						<button className={`${displayType === 'submit-review' ? styles.active : undefined}`} onClick={() => clickHandler('submit-review')}>
							Submit a Review
						</button>
					)}
					<button className={`${displayType === 'guides' ? styles.active : undefined}`} onClick={() => clickHandler('guides')}>
						Guides
					</button>
				</div>

				<div ref={containerRef} className={styles.content}>
					{displayType === 'description' ? (
						<Description data={description} quickFacts={quickFacts} />
					) : displayType === 'warranty' ? (
						<ProductWarranty warrantyData={warrantyData} />
					) : displayType === 'question' ? (
						<div className={styles.qas_containers} style={{ gridTemplateColumns: productFAQ?.length > 0 ? 'repeat(2, 1fr' : '1fr' }}>
							{productFAQ?.length > 0 && <ProductQuestion productFAQ={productFAQ} />}
							<div className={productFAQ?.length === 0 || productFAQ === undefined ? styles.qas_containers : undefined}>
								<HaveQuestion productId={productId} vendorId={vendorId} getQAData={getQAData} loginUser={loginUser} />
								<div className={productFAQ?.length === 0 || productFAQ === undefined ? styles.no_faq : undefined}>
									<QuestionsAnswers qaLoading={qaLoading} qaData={qaData} showQA={showQA} setqaData={setqaData} productId={productId} vendorId={vendorId} getQAData={getQAData} loginUser={loginUser} setshowQA={setshowQA} />
								</div>
							</div>
						</div>
					) : displayType === 'reviews' ? (
						<Reviews productId={productId} rating={rating} ratingBars={ratingBars} reviewCount={reviewCount} />
					) : displayType === 'submit-review' ? (
						<div className={styles.submit_wrapper}>
							<Submit productId={productId} loginUser={loginUser} userPosition={userPosition} />
						</div>
					) : guide.length > 0 ? (
						<div className={styles.guides}>
							<h5>Product guides and documents</h5>

							{guide?.map((guide) => {
								return (
									<a key={guide.id} rel='noreferrer' target='_blank' href={`${imgApiUrl.products.files}/${guide.title}`} className={`${styles.guide} primary-color`} download>
										{guide?.title?.slice(-3) !== 'pdf' ? (
											<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
												<path d='M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z' />
												<path d='M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z' />
											</svg>
										) : (
											<div className={styles.file_icon}>
												<Image src={pdfIcon} alt={guide?.title} />
											</div>
										)}

										{guide.title}
									</a>
								)
							})}
						</div>
					) : (
						<div className='gray-color'>No guide available for this product</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default TabContent

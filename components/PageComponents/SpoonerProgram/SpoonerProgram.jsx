import React, { useEffect, useState } from 'react'
import styles from './SpoonerProgram.module.css'
import Image from 'next/image'
import catImage from '../../../public/cati-image/cate1.png' // Replace with actual image path
import productImage from '../../../public/cati-image/health.png' // Replace with actual product image path
import catImage2 from '../../../public/cati-image/cate2.png'
import Modal from '../../UI/Modal/Modal'
import ContactForm from '../Contact/ContactForm/ContactForm'
import { lockScroll } from '../../../utils/scrollLock'
import SurveyForm from '../../UI/SurveyForm/SurveyForm'
import { GlobalProvider } from '../../../context/AppProvider'
import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { baseApiUrl } from '../../../utils/config'
import axios from 'axios'
import { LiteLoader } from '../../Loader/Loader'
import Message from '../../UI/Message/Message'

const SpoonerProgram = () => {
	const router = useRouter()
	const { name } = router.query
	const [modal, setmodal] = useState(false)
	const [modalSurvey, setmodalSurvey] = useState(false)
	const [modalType, setmodalType] = useState(null)
	const [formCheck, setformCheck] = useState(false)
	const { loginUser } = useContext(GlobalProvider)
	const [surveyLoading, setsurveyLoading] = useState(false)
	// console.log('formcheck', formCheck)

	const formUpdate = async () => {
		setsurveyLoading(true)
		const formData = {
			email: loginUser?.email
		}

		const res = await axios.post(`${baseApiUrl}/check-already-submitted-survey-form`, formData)
		// console.log('check form res', res)
		setsurveyLoading(false)
		if (res?.data?.already_submitted) {
			setmodalSurvey(true)
			setformCheck(res?.data?.already_submitted)
		} else {
			setmodal(true)
			setmodalType('survey')
		}
	}

	useEffect(() => {
		if (name === 'survey' && !formCheck) {
			// setmodal(true)
			// setmodalType('survey')
			formUpdate()
		}
	}, [])

	return (
		<>
			<Modal modal={modal} setmodal={setmodal}>
				<div className={styles.form_wrapper}>{modalType === 'contact' ? <ContactForm formType='sponsored_form' /> : <SurveyForm setmodal={setmodal} />}</div>
			</Modal>
			<Modal modal={modalSurvey} setmodal={setmodalSurvey} modalType='curvey_form'>
				<div className={styles.already_submit}>
					<Message className={styles.shipping_error} resMsg={'You have already submitted this form'} formSuccess={true} />
				</div>
			</Modal>
			{/* Hero Section */}
			<section className={styles.heroSection}>
				<div className={`${styles.hero_inner_wrapper} sec-container`}>
					<div className={styles.hero_content}>
						<h1>
							<span className={'primary-color'}>Tiki Cat Veterinary Solutions™</span> Feline - Specific Nutrition That Works
						</h1>
						<div className={styles.btn_wrapper}>
							<button onClick={() => (setmodal(true), setmodalType('contact'), lockScroll())} className={`${styles.ctaButton} primary-btn white-color`}>
								Contact Now!
							</button>
							{loginUser?.id === undefined ? (
								<Link href={'/auth/signin'}>
									<button type='button' className={`${styles.srvyButton} white-color`}>
										Login for Survey
									</button>
								</Link>
							) : (
								<button disabled={surveyLoading} onClick={() => (lockScroll(), formUpdate())} className={`${styles.srvyButton} white-color`}>
									Take the Survey {surveyLoading && <LiteLoader className={styles.survey_loader} />}
								</button>
							)}
						</div>
					</div>
					<div className={styles.heroImage_wrapper}>
						<Image src={catImage} alt='Tiki Cat Veterinary Solutions' className={styles.heroImage} layout='fill' priority />
					</div>
				</div>
			</section>

			{/* Info Section */}
			<section className='sec-m'>
				<div className={`${styles.veterinay_wrapper} sec-container`}>
					<p>
						Veterinary feline diets often lack variety — <span className={'primary-color'}>Tiki Cat Veterinary Solutions™</span> fills that gap. Designed exclusively for cats, these clinically tested, highly palatable, prey-inspired diets provide effective solutions for common feline health
						concerns.
					</p>
				</div>
			</section>

			{/* Benefits Section */}
			<section className='inner-sec-m'>
				<div className={`${styles.benefitsSection} sec-container`}>
					<div className={styles.productImage_wrapper}>
						<Image src={productImage} alt='Tiki Cat Products' className={styles.productImage} layout='fill' />
					</div>
					<div className={styles.product_content}>
						<h2>
							Tailored Nutrition for Common <span className={'primary-color'}>Feline Health</span> Concerns
						</h2>
						<p>Each diet is formulated to address specific medical needs with clinically tested, highly palatable recipes:</p>
						<ul>
							<li>
								<strong>GI-Health™ –</strong> Supports cats with digestive sensitivities, including chronic enteropathies and IBD.
							</li>
							<li>
								<strong>pH-Balance™ –</strong> Helps maintain urinary health and reduce the risk of crystal formation.
							</li>
							<li>
								<strong>Gluco-Balance™ –</strong> Aids in stabilizing blood sugar levels for diabetic or pre-diabetic cats.
							</li>
							<li>
								<strong>Lo-Cal™ –</strong> Designed for weight management without compromising essential nutrients.
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Why Choose Section */}
			<section className='inner-sec-m'>
				<div className={`${styles.choose_wrapper} sec-container`}>
					<div className={styles.choose_content}>
						<h2>
							Why Choose <span className={'primary-color'}>Tiki Cat Veterinary Solutions™?</span>
						</h2>
						<ul>
							<li>
								<strong>Prey-Inspired Formulas –</strong> High moisture, moderate fat, and low-carb recipes mimic a cat&apos;s natural diet.
							</li>
							<li>
								<strong>Variety & Palatability –</strong> Available in multiple textures (shreds, flaked, pâté) and protein sources (chicken or 100% fish) to suit feline preferences.
							</li>
							<li>
								<strong>Clinically Tested & Proven –</strong> Backed by AAFCO feeding trials and veterinary research.
							</li>
							<li>
								<strong>Easy Transition with Trial Packs –</strong> Small 3-count packs allow stress-free testing at home.
							</li>
							<li>
								<strong>Trusted & Recognized Brand –</strong> Over 20 years of expertise in feline nutrition, known for quality and innovation.
							</li>
						</ul>
					</div>
					<div className={styles.chooseImage_wrapper}>
						<Image src={catImage2} alt='Tiki Cat Products' className={styles.chooseImage} layout='fill' />
					</div>
				</div>
			</section>

			{/* Footer */}
			<section className={styles.footer_contact}>
				<div className={`${styles.contact_wrapper} sec-container`}>
					<p>
						Tiki Cat<span className={styles.all_reserved}>®</span> Veterinary Solutions™ delivers precision nutrition, combining <span className={styles.w_highlight}>science-driven </span> formulas with feline-specific care for optimal health outcomes.
					</p>
					<button onClick={() => (setmodal(true), setmodalType('contact'), lockScroll())} className={`${styles.contact_btn} white-btn primary-color shadow`}>
						Contact Now!
					</button>
				</div>
			</section>
		</>
	)
}

export default SpoonerProgram

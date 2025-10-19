import React, { useState, useRef } from 'react'
import { LiteLoader } from '../../../Loader/Loader'
import styles from './Newsletter.module.css'
import axios from 'axios'
import { baseApiUrl } from '../../../../utils/config'
import Message from '../../../UI/Message/Message'
import NewTwitterIcon from '../../../UI/NewTwitterIcon/NewTwitterIcon'
import DownloadApp from './DownloadApp/DownloadApp'

const Newsletter = () => {
	const [signupNewsLetterEmail, setsignupNewsLetterEmail] = useState('')
	const [btnDisabled, setbtnDisabled] = useState(false)
	const [loading, setLoading] = useState(false)
	const [showNewsletterResMsg, setshowNewsletterResMsg] = useState(false)
	const [newsLetterResMsg, setnewsLetterResMsg] = useState('')
	const [wrongEmail, setwrongEmail] = useState(false)
	const [emptyEmail, setemptyEmail] = useState(false)
	const newsletterInputRef = useRef(null)

	const signUpHandler = async (e) => {
		e.preventDefault()
		if (signupNewsLetterEmail.length < 1) {
			setemptyEmail(true)
			setwrongEmail(false)
			return
		}
		const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(signupNewsLetterEmail)
		if (!emailValidation) {
			setwrongEmail(true)
			setemptyEmail(false)
			return
		} else {
			setwrongEmail(false)
			setemptyEmail(false)

			setLoading(true)
			setbtnDisabled(true)

			const res = await axios.post(`${baseApiUrl}/news-letter-signup?email=${signupNewsLetterEmail}&type=dvm_central`)
			setLoading(false)
			setbtnDisabled(false)
			setnewsLetterResMsg(res?.data?.success)
			setshowNewsletterResMsg(true)
			setsignupNewsLetterEmail('')
			setTimeout(() => {
				setshowNewsletterResMsg(false)
			}, 3000)
			newsletterInputRef.current.value = ''
		}
	}
	return (
		<div className={styles.newsletters_wrapper}>
			<div className={styles.text_wrapper}>
				<h5 className='primary-color'>Subscribe Newsletter</h5>

				<p className='gray-color'>Once you subscribe to our newsletter, we will send our promo offers and news to your email.</p>
			</div>
			<form className={styles.newsletter_form}>
				{emptyEmail && <div className={`${styles.error} red-color`}>email is required</div>}
				{wrongEmail && <div className={`${styles.error} red-color`}>enter valid email</div>}
				{showNewsletterResMsg && <Message className={styles.res_msg} formSuccess={true} resMsg={newsLetterResMsg} />}

				<div className={`sml-shadow ${styles.newsletters_input_wrapper}`}>
					<input ref={newsletterInputRef} type='email' placeholder='Enter your email' onChange={(e) => setsignupNewsLetterEmail(e.target.value)} className={emptyEmail || wrongEmail ? 'check-box-error' : undefined} />
					<button type='submit' className={`${styles.subs_btn} primary-btn white-color`} onClick={(e) => signUpHandler(e)} disabled={btnDisabled} aria-label='submit'>
						<svg width="16" height="17" viewBox="0 0 16 17" fill="none">
							<path d="M12.0361 2.38176C11.9006 2.38176 11.7444 2.41822 11.5673 2.49114L0.786058 7.03801L0.817308 7.02239L0.692308 7.06926C0.598558 7.11093 0.515224 7.1578 0.442308 7.20989C0.317308 7.2828 0.218349 7.37655 0.145433 7.49114C0.0308494 7.66822 -0.0160256 7.85051 0.00480769 8.03801C0.0464744 8.31926 0.197516 8.55364 0.457933 8.74114C0.530849 8.79322 0.608974 8.84009 0.692308 8.88176L0.786058 8.91301L3.23918 9.74114L4.12981 12.663C4.21314 12.9338 4.3121 13.137 4.42668 13.2724C4.47877 13.3349 4.54127 13.3922 4.61418 13.4443L4.72356 13.4911H4.70793L4.78606 13.5068C4.90064 13.538 5.01522 13.5432 5.12981 13.5224C5.22356 13.512 5.30689 13.4859 5.37981 13.4443L5.48918 13.3818L6.94231 12.0536L9.36418 13.913L9.41106 13.9286C9.65064 14.0328 9.89543 14.0693 10.1454 14.038C10.3642 14.0068 10.5465 13.9338 10.6923 13.8193C10.8069 13.7255 10.9058 13.6161 10.9892 13.4911C11.0308 13.4182 11.0569 13.3609 11.0673 13.3193L11.0829 13.2724L12.9579 3.70989C13.01 3.44947 13.01 3.22551 12.9579 3.03801C12.9371 2.93384 12.8902 2.83489 12.8173 2.74114C12.7444 2.64739 12.6611 2.56926 12.5673 2.50676C12.4006 2.41301 12.2236 2.37134 12.0361 2.38176ZM11.9892 3.39739C11.9892 3.4078 11.9892 3.41822 11.9892 3.42864L10.1298 12.9755C10.109 12.9963 10.0881 13.0172 10.0673 13.038C10.0465 13.0588 10.0204 13.0693 9.98918 13.0693C9.95793 13.0693 9.90585 13.0536 9.83293 13.0224L6.87981 10.7568L5.09856 12.3818L5.47356 9.99114L10.3017 5.49114C10.385 5.4078 10.4319 5.35051 10.4423 5.31926C10.4527 5.28801 10.4527 5.27239 10.4423 5.27239H10.4267C10.4371 5.19947 10.4189 5.1578 10.372 5.14739C10.3251 5.13697 10.2704 5.14218 10.2079 5.16301L10.1298 5.19426L4.05168 8.97551V8.95989L1.11418 7.97551L11.9423 3.41301L11.9892 3.39739Z" fill="white"/>
						</svg>

						{loading && <LiteLoader className={styles.btn_loader} />}
					</button>
				</div>
			</form>

			{/* social links */}
			<ul>
				<li>
					<a href='https://www.facebook.com/dvmcentralofficial' target='_blank' rel='noreferrer' aria-label='Visit our Facebook page'>
						<svg width="31" height="31" viewBox="0 0 31.278 31.278" fill="var(--primary)">
							<path d="M15.639,0h0A15.639,15.639,0,0,1,31.278,15.639v0A15.639,15.639,0,0,1,15.64,31.278h0A15.639,15.639,0,0,1,0,15.639v0A15.639,15.639,0,0,1,15.639,0Z"/>
							<path d="M162.093,154.939H165.9v-9.534h2.657l.283-3.192H165.9V140.4c0-.753.151-1.05.879-1.05h2.06v-3.313H166.2c-2.833,0-4.11,1.247-4.11,3.636v2.545h-1.981v3.232h1.981Z" transform="translate(-148.836 -129.847)" fill="var(--white)"/>
						</svg>
					</a>
				</li>

				<li>
					<NewTwitterIcon className={styles.twitter_icon} />
				</li>

				<li>
					<a href='https://www.linkedin.com/company/dvm-central/' target='_blank' rel='noreferrer' aria-label='Visit our Linkedin page'>
						<svg width="31" height="31" viewBox="0 0 31.278 31.278" fill="var(--primary)">
							<path d="M106.927,213.708h0a15.639,15.639,0,0,1-15.64-15.639h0a15.639,15.639,0,0,1,15.64-15.639h0a15.639,15.639,0,0,1,15.639,15.639h0A15.639,15.639,0,0,1,106.927,213.708Z" transform="translate(-91.287 -182.43)"/>
							<g transform="translate(8.237 6.925)">
								<rect width="3.237" height="10.456" transform="translate(0.311 5.228)" fill="var(--white"/>
								<path d="M103.224,194.715a1.929,1.929,0,1,0-1.914-1.93A1.922,1.922,0,0,0,103.224,194.715Z" transform="translate(-101.31 -190.857)" fill="var(--white"/>
								<path d="M111.25,202.117c0-1.469.676-2.345,1.972-2.345,1.19,0,1.762.841,1.762,2.345v5.489h3.221v-6.62c0-2.8-1.588-4.155-3.8-4.155a3.645,3.645,0,0,0-3.151,1.727V197.15h-3.1v10.456h3.1Z" transform="translate(-102.528 -191.921)" fill="var(--white"/>
							</g>
						</svg>
					</a>
				</li>

				<li>
					<a href='https://www.instagram.com/dvmcentralofficial/' target='_blank' rel='noreferrer' aria-label='Visit our Instagram page'>
						<svg width="31" height="31" viewBox="0 0 31.278 31.278" fill="var(--primary)">
							<path d="M217.765,159.783h0a15.639,15.639,0,0,1-15.639-15.639h0a15.639,15.639,0,0,1,15.639-15.639h0a15.639,15.639,0,0,1,15.64,15.639h0A15.639,15.639,0,0,1,217.765,159.783Z" transform="translate(-202.126 -128.505)"/>
							<g transform="translate(7.064 7.064)">
								<path d="M219.3,138.646c2.29,0,2.561.009,3.466.05a4.751,4.751,0,0,1,1.592.3,2.834,2.834,0,0,1,1.627,1.627,4.751,4.751,0,0,1,.3,1.592c.041.9.05,1.176.05,3.465s-.009,2.561-.05,3.465a4.752,4.752,0,0,1-.3,1.593,2.834,2.834,0,0,1-1.627,1.627,4.735,4.735,0,0,1-1.592.3c-.9.041-1.175.05-3.466.05s-2.561-.009-3.465-.05a4.741,4.741,0,0,1-1.593-.3,2.84,2.84,0,0,1-1.627-1.627,4.737,4.737,0,0,1-.3-1.593c-.041-.9-.05-1.175-.05-3.465s.009-2.561.05-3.465a4.735,4.735,0,0,1,.3-1.592,2.84,2.84,0,0,1,1.627-1.627,4.758,4.758,0,0,1,1.593-.3c.9-.041,1.175-.05,3.465-.05m0-1.545c-2.329,0-2.621.011-3.535.052a6.3,6.3,0,0,0-2.082.4,4.385,4.385,0,0,0-2.507,2.508,6.279,6.279,0,0,0-.4,2.082c-.042.915-.052,1.206-.052,3.535s.01,2.621.052,3.535a6.279,6.279,0,0,0,.4,2.082,4.385,4.385,0,0,0,2.507,2.508,6.326,6.326,0,0,0,2.082.4c.915.041,1.206.051,3.535.051s2.621-.01,3.535-.051a6.322,6.322,0,0,0,2.082-.4,4.39,4.39,0,0,0,2.508-2.508,6.3,6.3,0,0,0,.4-2.082c.042-.915.052-1.206.052-3.535s-.01-2.621-.052-3.535a6.3,6.3,0,0,0-.4-2.082,4.389,4.389,0,0,0-2.508-2.508,6.3,6.3,0,0,0-2.082-.4c-.915-.041-1.206-.052-3.535-.052" transform="translate(-210.722 -137.101)" fill="var(--white"/>
								<path d="M220.2,142.178a4.4,4.4,0,1,0,4.4,4.4,4.4,4.4,0,0,0-4.4-4.4m0,7.261a2.858,2.858,0,1,1,2.858-2.858,2.858,2.858,0,0,1-2.858,2.858" transform="translate(-211.627 -138.006)" fill="var(--white"/>
								<path d="M227.532,141.743a1.029,1.029,0,1,1-1.029-1.029,1.029,1.029,0,0,1,1.029,1.029" transform="translate(-213.351 -137.745)" fill="var(--white"/>
							</g>
						</svg>
					</a>
				</li>

				<li>
					<a className={`${styles.youtube_icon} primary-bg full-radius`} href='https://www.youtube.com/@dvmcentral' target='_blank' rel='noreferrer' aria-label='Visit our Youtube page'>
						<svg width="25" height="25" viewBox="0 0 25 25" fill="var(--white)">
							<path d="M24.018,7.081a2.948,2.948,0,0,0-2.074-2.087C20.114,4.5,12.779,4.5,12.779,4.5s-7.335,0-9.165.493A2.948,2.948,0,0,0,1.54,7.081a30.921,30.921,0,0,0-.49,5.683,30.921,30.921,0,0,0,.49,5.683A2.9,2.9,0,0,0,3.614,20.5c1.829.493,9.165.493,9.165.493s7.335,0,9.165-.493a2.9,2.9,0,0,0,2.074-2.054,30.921,30.921,0,0,0,.49-5.683,30.921,30.921,0,0,0-.49-5.683ZM10.38,16.251V9.276l6.131,3.488L10.38,16.251Z" transform="translate(-0.283 -0.11)"/>
						</svg>
					</a>
				</li>
			</ul>

			<DownloadApp />
		</div>
	)
}

export default Newsletter

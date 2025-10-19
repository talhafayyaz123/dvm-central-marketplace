import React, { useRef, useState } from 'react'
import styles from './Payment.module.css'
import { useForm } from 'react-hook-form'
import { LiteLoader } from '../../../../Loader/Loader'
import Message from '../../../../UI/Message/Message'
import axios from 'axios'
import Image from 'next/image'
import visacardIcon from '/public/icons/card/visa.png'
import mastercardIcon from '/public/icons/card/master.png'
import americanexpresscardIcon from '/public/icons/card/american.png'
import discovercardIcon from '/public/icons/card/discover.png'
import jcbcardIcon from '/public/icons/card/jcb.png'
import dinersardIcon from '/public/icons/card/diners.png'
import nocardIcon from '/public/icons/card/no-card.png'
import { baseApiUrl } from '../../../../../utils/config'
import currencyFormat from '../../../../../utils/currencyFormat'
import { unlockScroll } from '../../../../../utils/scrollLock'

const Payment = ({ loginUser, price, price_discounted, discount_end_time, vendor_id, id, setmodal, setisByed, paymentType }) => {
	const [paymentProcessing, setpaymentProcessing] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)

	const [formSubmit, setformSubmit] = useState(false)
	const [resMsg, setresMsg] = useState('')
	const [formSuccess, setformSuccess] = useState(false)

	const [expiryError, setexpiryError] = useState(false)
	const [expiryMsg, setexpiryMsg] = useState('')

	// for production
	const [cardImg, setcardImg] = useState(nocardIcon)
	const [cardType, setcardType] = useState('')

	const date = new Date()
	const currentYear = Number(date.getFullYear().toString().slice(-2))
	const currentMonth = date.getMonth() + 1

	const month_input = useRef(null)
	const year_input = useRef(null)

	let monthVal

	let maxYearValidation = Number(currentYear.toString().slice(-2)) + 10

	let yearVal

	let monthValidation
	let yearValidation

	let monthInValid
	let yearInvalid

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm()

	const paymentHandler = () => {
		monthVal = month_input.current.value
		if (monthVal.length === 2) {
			if (monthVal < 10) {
				monthVal = monthVal.slice(1, 2)
			}
		}

		yearVal = year_input.current.value

		monthValidation = /^(?:[0-9] ?){1,2}$/.test(monthVal)
		yearValidation = /^(?:[0-9] ?){2}$/.test(yearVal)

		monthInValid = !monthValidation || monthVal < 1 || monthVal > 12 || (yearVal == currentYear && monthVal < currentMonth)
		yearInvalid = !yearValidation || yearVal < currentYear || yearVal > maxYearValidation

		if (!monthValidation && !yearValidation) {
			setexpiryMsg('Month and Year are required')
			setexpiryError(true)
			handleSubmit(onSubmit)()

			return
		}
		if (monthInValid) {
			setexpiryError(true)
			setexpiryMsg('Enter valid Month')
			handleSubmit(onSubmit)()

			return
		}
		if (yearInvalid) {
			setexpiryError(true)
			setexpiryMsg('Enter valid Year')
			handleSubmit(onSubmit)()

			return
		} else {
			setexpiryError(false)
			setexpiryMsg('')
			handleSubmit(onSubmit)()
		}
	}

	const onSubmit = async (data) => {
		if (!monthInValid && !yearInvalid) {
			setpaymentProcessing(true)
			setbtndisabled(true)

			const { cardnumber, cvc } = data
			const formData = {
				cardnumber: cardnumber,
				cvc: cvc,
				month: monthVal,
				year: yearVal,
				user_id: loginUser,
				amount: price !== 0 && price !== null && price_discounted !== null && price_discounted !== 0 && price_discounted <= price && (discount_end_time === null || new Date(discount_end_time) >= new Date()) ? price_discounted : price,
				vendor_id: vendor_id,
				course_id: paymentType === 'course' ? id : null,
				video_id: paymentType === 'course' ? null : id
			}
			const res = await axios.post(`${baseApiUrl}/vendor-content-payment`, formData)

			setpaymentProcessing(false)
			setbtndisabled(false)
			setformSubmit(true)
			setresMsg(res?.data?.message)
			if (res?.data?.success) {
				setformSuccess(true)
				reset()
				setisByed(true)
				setTimeout(() => {
					setformSubmit(false)
					setmodal(false)
					unlockScroll()
				}, 5000)
			}
		} else return
	}

	// card validation func for production
	const cardValidationHandler = (e) => {
		const val = e.target.value

		let first6Digit
		if (val.length >= 6) {
			first6Digit = val.slice(0, 6)
			if (first6Digit == 371449) {
				setcardType('american')
				setcardImg(americanexpresscardIcon)
			} else if (first6Digit == 305693) {
				setcardType('diners')
				setcardImg(dinersardIcon)
			} else if (first6Digit == 601111) {
				setcardType('discover')
				setcardImg(discovercardIcon)
			} else if (first6Digit == 353011) {
				setcardType('jcb')
				setcardImg(jcbcardIcon)
			} else if (first6Digit == 555555) {
				setcardType('master')
				setcardImg(mastercardIcon)
			} else if (first6Digit == 411111) {
				setcardType('visa')
				setcardImg(visacardIcon)
			} else {
				setcardType('')
				setcardImg(nocardIcon)
			}
		} else {
			setcardImg(nocardIcon)
		}
	}

	const expiryChangeHandler = () => {
		monthVal = month_input.current.value
		if (monthVal.length === 2) {
			if (monthVal < 10) {
				monthVal = monthVal.slice(1, 2)
			}
		}

		yearVal = year_input.current.value

		monthValidation = /^(?:[0-9] ?){1,2}$/.test(monthVal)
		yearValidation = /^(?:[0-9] ?){2}$/.test(yearVal)

		monthInValid = !monthValidation || monthVal < 1 || monthVal > 12 || (yearVal == currentYear && monthVal < currentMonth)
		yearInvalid = !yearValidation || yearVal < currentYear || yearVal > maxYearValidation

		if (!monthValidation && !yearValidation) {
			setexpiryMsg('Month and Year are required')
			setexpiryError(true)
		}
		if (monthInValid) {
			setexpiryError(true)
			setexpiryMsg('Enter valid Month')
		}
		if (yearInvalid) {
			setexpiryError(true)
			setexpiryMsg('Enter valid Year')
		} else {
			setexpiryError(false)
			setexpiryMsg('')
		}
	}

	return (
		<div className={styles.main_wrapper}>
			<div className={`${styles.payment} primary-color`}>
				<h5 className='black-color'>Payment</h5>
				{price !== 0 && price !== null && price_discounted !== null && price_discounted !== 0 && price_discounted < price && (discount_end_time === null || new Date(discount_end_time) >= new Date()) ? (
					<div className={`${styles.card_price} semibold-text black-color`}>
						<span className='primary-color'>{currencyFormat(price_discounted)} </span>
						{(100 - (price_discounted / price) * 100).toFixed(0)}% Off
					</div>
				) : (
					<div className={`${styles.card_price} semibold-text primary-color`}>
						<span>{currencyFormat(price)}</span>
					</div>
				)}
			</div>
			<form className={`${styles.form_wrapper} gray-border`}>
				<div className={styles.wrapper}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label htmlFor='cardholdername'>
								Name on card <span>*</span>
							</label>
							{errors.cardholdername?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{errors.cardholdername?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.cardholdername?.message}
								</div>
							)}
						</div>

						<input
							{...register('cardholdername', {
								required: true,
								minLength: { value: 2, message: 'Min 2 characters' },
								maxLength: { value: 40, message: 'Max 40 characters' },
								pattern: { value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/, message: 'Enter valid name' }
							})}
							aria-invalid={errors.name ? 'true' : 'false'}
							className={`${styles.input} ${errors.cardholdername ? 'input-error' : undefined}`}
							type='text'
							placeholder='Name on card'
							minLength={2}
							maxLength={40}
							autoComplete='new-password'
						/>
					</div>

					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label htmlFor='cardnumber'>
								Card Number <span>*</span>
							</label>
							{errors.cardnumber?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{errors.cardnumber?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.cardnumber?.message}
								</div>
							)}
						</div>

						{/* <input
							{...register('cardnumber', {
								required: true,
								minLength: { value: 16, message: 'Atleast 16 digit' },
								maxLength: { value: 25, message: 'Maximum 25 digit' }
								// pattern: { value: /^[0-9]{16,20}?$/, message: 'Enter number e.g 0000111122223333' }
								// pattern: {value: \d{4}\s?\d{4}\s?\d{4}\s?\d{4}, message: 'Enter number e.g 0000 1111 2222 3333'}
							})}
							aria-invalid={errors.cardnumber ? 'true' : 'false'}
							className={styles.input}
							min='16'
							max='25'
							type='text'
							// maxLength={25}
							placeholder='0000111122223333'
						/> */}

						{/* for production */}
						<div className={`${styles.card_input_wrapper} ${errors.cardnumber ? 'check-box-error' : undefined}`}>
							<input
								{...register('cardnumber', {
									required: true,
									minLength: { value: cardType == 'american' ? 15 : cardType == 'diners' ? 14 : 16, message: `Min ${cardType == 'american' ? 15 : cardType == 'diners' ? 14 : 16} digit` },
									maxLength: { value: cardType == 'american' ? 15 : cardType == 'diners' ? 14 : 16, message: `Max ${cardType == 'american' ? 15 : cardType == 'diners' ? 14 : 16} digit` },
									onChange: (e) => (
										(e.target.value = e.target.value.replace(/[^0-9]/g, '')),
										// (e.target.value = e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')),
										cardValidationHandler(e)
									)
								})}
								aria-invalid={errors.cardnumber ? 'true' : 'false'}
								className={styles.input}
								min={cardType == 'american' ? 15 : cardType == 'diners' ? 14 : 16}
								max={cardType == 'american' ? 15 : cardType == 'diners' ? 14 : 16}
								minLength={cardType == 'american' ? 15 : cardType == 'diners' ? 14 : 16}
								maxLength={cardType == 'american' ? 15 : cardType == 'diners' ? 14 : 16}
								type='text'
								placeholder='0000111122223333'
								autoComplete='new-password'
							/>
							<Image width={46} height={30} src={cardImg} alt='card' />
						</div>
					</div>
				</div>

				<div className={styles.wrapper}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label htmlFor='cvc'>
								CVC/ CVV <span>*</span>
							</label>
							{errors.cvc?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{errors.cvc?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.cvc?.message}
								</div>
							)}
						</div>

						{/* <input
							{...register('cvc', {
								required: true,
								minLength: { value: 3, message: 'Min 3 digit' },
								maxLength: { value: 4, message: 'Max 4 digit' },
								pattern: { value: /^[0-9]{3,4}?$/, message: 'Enter number e.g 123' }
							})}
							aria-invalid={errors.cvc ? 'true' : 'false'}
							className={styles.input}
							min='3'
							max='4'
							minLength='3'
							maxLength='4'
							type='text'
							placeholder='123'
						/> */}

						{/* for production */}
						<input
							{...register('cvc', {
								required: true,
								minLength: { value: 3, message: 'Min 3 digit' },
								maxLength: { value: 4, message: 'Max 4 digit' },
								onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
							})}
							aria-invalid={errors.cvc ? 'true' : 'false'}
							className={`${styles.input} ${errors.cvc ? 'input-error' : undefined}`}
							min={cardType == 'american' ? 4 : 3}
							max={cardType == 'american' ? 4 : 3}
							minLength={cardType == 'american' ? 4 : 3}
							maxLength={cardType == 'american' ? 4 : 3}
							type='text'
							placeholder='123'
							autoComplete='new-password'
						/>
					</div>

					<div className={styles.fields_wrapper}>
						<div className={`${styles.inner_wrapper} ${styles.expiry_container}`}>
							<label htmlFor='expirydate'>
								Expiry date <span>*</span>
							</label>
							{errors.expirydate?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{/* {errors.expirydate?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.expirydate?.message}
								</div>
							)} */}
							{expiryError && (
								<div className={styles.error_msg} role='alert'>
									{expiryMsg}
								</div>
							)}
						</div>

						{/* <input
							{...register('expirydate', {
								required: true,
								minLength: { value: 11, message: 'Min 7 digit' },
								maxLength: { value: 12, message: 'Max 7 digit' },
								pattern: { value: /^(0[1-9]|1[0-2])\/([0-9]{4})$/, message: 'Enter number e.g 04/2025' },
								validate: { checkexpiryData: (val) => val.slice(-4) >= currentExpiry || 'Expiry data is invalid' }
							})}
							aria-invalid={errors.expirydate ? 'true' : 'false'}
							className={styles.input}
							min='7'
							max='7'
							type='text'
							placeholder='MM/YYYY'
							maxLength={7}
						/> */}
						<div className={styles.expiry_input_wrapper}>
							<input className={`${styles.input} ${expiryError ? 'input-error' : undefined}`} ref={month_input} type='text' maxLength='2' placeholder='MM' onChange={(e) => ((e.target.value = e.target.value.replace(/[^0-9]/g, '')), expiryChangeHandler())} autoComplete='new-password' />
							<span className='gray-color'>/</span>
							<input className={`${styles.input} ${expiryError ? 'input-error' : undefined}`} ref={year_input} type='text' maxLength='2' placeholder='YY' onChange={(e) => ((e.target.value = e.target.value.replace(/[^0-9]/g, '')), expiryChangeHandler())} autoComplete='new-password' />
						</div>
					</div>
				</div>
			</form>
			{formSubmit && <Message className={styles.margin} resMsg={resMsg} formSuccess={formSuccess} />}
			<button disabled={btndisabled} className={`${styles.btn} primary-btn`} onClick={() => paymentHandler()}>
				Make Payment
				{paymentProcessing && <LiteLoader className={styles.submit_loader} />}
			</button>
		</div>
	)
}

export default Payment

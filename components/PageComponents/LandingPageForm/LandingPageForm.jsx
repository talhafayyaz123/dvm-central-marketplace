import React, { useEffect, useState } from 'react'
import styles from './LandingPageForm.module.css'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import leftwaveimg from '/public/landing-page/shape/left-wave.webp'
import rightwaveimg from '/public/landing-page/shape/right-wave.webp'
import Image from 'next/image'
import { baseApiUrl } from '../../../utils/config'
import Message from '../../UI/Message/Message'
import Video from './Video/Video'
import Wave from '../../UI/Wave/Wave'
import WhySell from '../../PageComponents/SellOnDvm/WhySell/WhySell'
import { LiteLoader } from '../../Loader/Loader'
import PhoneInput from 'react-phone-input-2'

const LandingPageForm = () => {
	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [formsubmit, setformsubmit] = useState(false)
	const [formSuccess, setformSuccess] = useState(false)
	const [resMsg, setresMsg] = useState('')
	const [userPhone, setuserPhone] = useState('')
	const [userPhoneError, setuserPhoneError] = useState('')
	const [fillAllFields, setfillAllFields] = useState(false)

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		control,
		clearErrors,
		reset
	} = useForm()

	const submitHandler = async (e) => {
		if (userPhone?.length < 11 && userPhone?.length > 1) {
			setuserPhoneError('Min 10 digits')
			setfillAllFields(true)
		} else if (!userPhone || userPhone?.length === 0) {
			setuserPhoneError('')
			setfillAllFields(true)
		} else {
			setfillAllFields(false)
		}

		e.preventDefault()

		await handleSubmit(onSubmit)()
	}

	const onSubmit = async (data) => {
		console.log('data', data)
		const { first_name, last_name, email, tel, company } = data
		if (userPhoneError !== 'Min 10 digits') {
			const formData = {
				first_name,
				last_name,
				email,
				phone: document.querySelector('.custom_number input')?.value,
				company
			}

			setloading(true)
			setbtndisabled(true)
			const res = await axios.post(`${baseApiUrl}/request-for-demo`, formData)

			console.log('res', res)
			if (res?.data?.success) {
				setuserPhone('+1')
				setformSuccess(true)
				reset()
				setTimeout(() => {
					setformsubmit(false)
				}, 5000)
			} else {
				setformSuccess(false)
			}
			setformsubmit(true)
			setresMsg(res?.data?.message)
			setloading(false)
			setbtndisabled(false)
		}
	}

	useEffect(() => {
		if (userPhone?.length > 10) {
			setfillAllFields(false)
		}
	}, [userPhone])

	const phoneFormatHanlder = (ev) => {
		// ev.target.value = ev.target.value.replace(/[^a-zA-Z0-9]/g, '')

		// var regex = /^([a-zA-Z0-9]{3})([a-zA-Z0-9]{3})([a-zA-Z0-9]{4})$/
		// if (regex.test(ev.target.value)) {
		// 	clearErrors('tel')

		// 	return (ev.target.value = ev.target.value.replace(regex, '($1) $2-$3'))
		// } else {
		// 	if (ev.target.value.length < 10) {
		// 		ev.preventDefault()
		// 		setError('tel', {
		// 			type: 'length',
		// 			message: 'Min 10 digit'
		// 		})
		// 	} else if (ev.target.value.length >= 10) {
		// 		return (ev.target.value = ev.target.value.substring(0, 10).replace(regex, '($1) $2-$3'))
		// 	} else return ev.target.value
		// }
		if (ev?.length < 11) {
			setuserPhoneError('Min 10 digits')
		} else {
			setuserPhoneError('')
		}
	}

	return (
		<>
			<section className='gradient-sec'>
				<Wave />

				<div className='sec-p' style={{ position: 'relative', zIndex: 3 }}>
					<div className={`sec-container ${styles.form_container}`}>
						<div className={styles.form_inner}>
							<Video />
							<form className={`radius ${styles.form_wrapper}`}>
								{/* first & last name */}
								<div className={`${styles.img_wrapper} ${styles.img_2} img-2`}>
									<Image src={rightwaveimg} alt='VatandTech' />
								</div>
								<div className={`${styles.img_wrapper} ${styles.img_1} img-1`}>
									<Image src={leftwaveimg} alt='VatandTech' />
								</div>

								<div className={styles.fields_wrapper}>
									<div className={styles.inner_wrapper}>
										<label htmlFor='first_name'>
											First Name <span>*</span>
										</label>
										{errors.first_name?.type === 'required' && (
											<div className={styles.error_msg} role='alert'>
												required
											</div>
										)}
										{errors.first_name?.message && (
											<div className={styles.error_msg} role='alert'>
												{errors.first_name?.message}
											</div>
										)}
									</div>

									<input
										{...register('first_name', {
											required: true,
											minLength: { value: 2, message: 'Min 2 characters' },
											maxLength: { value: 20, message: 'Max 20 characters' },
											pattern: { value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/, message: 'Enter valid name' }
										})}
										aria-invalid={errors.first_name ? 'true' : 'false'}
										className={`${styles.input} ${errors.first_name ? 'input-error' : undefined}`}
										type='text'
										minLength={2}
										maxLength={20}
										placeholder='First Name'
									/>
								</div>
								<div className={styles.fields_wrapper}>
									<div className={styles.inner_wrapper}>
										<label htmlFor='last_name'>
											Last Name <span>*</span>
										</label>
										{errors.last_name?.type === 'required' && (
											<div className={styles.error_msg} role='alert'>
												required
											</div>
										)}
										{errors.last_name?.message && (
											<div className={styles.error_msg} role='alert'>
												{errors.last_name?.message}
											</div>
										)}
									</div>

									<input
										{...register('last_name', {
											required: true,
											minLength: { value: 2, message: 'Min 2 characters' },
											maxLength: { value: 20, message: 'Max 20 characters' },
											pattern: { value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/, message: 'Enter valid name' }
										})}
										aria-invalid={errors.last_name ? 'true' : 'false'}
										className={`${styles.input} ${errors.last_name ? 'input-error' : undefined}`}
										type='text'
										minLength={2}
										maxLength={20}
										placeholder='Last Name'
									/>
								</div>

								{/* email */}
								<div className={styles.fields_wrapper}>
									<div className={styles.inner_wrapper}>
										<label htmlFor='email'>
											Email <span>*</span>
										</label>
										{errors.email?.type === 'required' && (
											<div className={styles.error_msg} role='alert'>
												required
											</div>
										)}
										{errors.email?.message && (
											<div className={styles.error_msg} role='alert'>
												{errors.email?.message}
											</div>
										)}
									</div>

									<input
										{...register('email', { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Enter valid email' }, onChange: (e) => setValue('email', e.target.value) })}
										aria-invalid={errors.email ? 'true' : 'false'}
										className={`${styles.input} ${errors.email ? 'input-error' : undefined}`}
										type='email'
										placeholder='Enter Email'
									/>
								</div>

								<div className={styles.fields_wrapper}>
									<div className={styles.inner_wrapper}>
										<label htmlFor='company'>
											Company <span>*</span>
										</label>
										{errors.company?.type === 'required' && (
											<div className={styles.error_msg} role='alert'>
												required
											</div>
										)}
									</div>

									<input {...register('company', { required: true, onChange: (e) => setValue('company', e.target.value) })} className={`${styles.input} ${errors.company ? 'input-error' : undefined}`} type='text' placeholder='Company Name' />
								</div>

								{/* tel */}
								<div className={styles.fields_wrapper}>
									<div className={styles.inner_wrapper}>
										<label htmlFor='tel'>Phone Number</label>

										{userPhoneError === '' && errors.tel?.type === 'validate' && (
											<div className={styles.error_msg} role='alert'>
												required
											</div>
										)}
										{userPhoneError === 'Min 10 digits' && (
											<div className={styles.error_msg} role='alert'>
												{userPhoneError}
											</div>
										)}
									</div>

									{/* <input
										autoComplete='new-password'
										{...register('tel', {
											// minLength: { value: 10, message: 'Min 10 digit' },
											onChange: (e) => (setValue('tel', e.target.value), phoneFormatHanlder(e))
										})}
										placeholder='(201) 555-5555'
										onPaste={(e) => e.preventDefault()}
										aria-invalid={errors.tel ? 'true' : 'false'}
										className={styles.input}
										// minLength={10}
										// maxLength={10}
										type='text'
									/> */}
									<Controller
										control={control}
										name='tel'
										rules={{
											validate: () => userPhone !== '' && userPhone !== null && userPhone?.length > 10
										}}
										render={({ field: { onBlur } }) => (
											<PhoneInput
												enableSearch={true}
												style={{ marginTop: '1rem' }}
												className={`custom_number ${errors.tel || userPhoneError === 'Min 10 digits' ? 'error_number' : undefined}`}
												searchPlaceholder={'Search country'}
												searchNotFound={'No country found...'}
												placeholder='+1'
												country={'us'}
												onPaste={(e) => e.preventDefault()}
												aria-invalid={errors.tel ? 'true' : 'false'}
												value={userPhone}
												onBlur={onBlur}
												onChange={(phone) => {
													setuserPhone(phone)
													phoneFormatHanlder(phone)
													phone.length === 11 && clearErrors('tel')
												}}
											/>
										)}
									/>
								</div>
								{fillAllFields && <div className='red-color'>All Fields are required</div>}
								{formsubmit && <Message resMsg={resMsg} formSuccess={formSuccess} />}

								<button disabled={btndisabled} type='submit' onClick={(e) => submitHandler(e)} className={`${styles.btn} primary-btn`}>
									Submit
									{loading && <LiteLoader className={styles.submit_loader} />}
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
			<WhySell />
		</>
	)
}

export default LandingPageForm

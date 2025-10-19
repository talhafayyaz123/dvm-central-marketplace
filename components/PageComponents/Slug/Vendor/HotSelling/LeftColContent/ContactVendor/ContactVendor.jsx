import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import styles from './ContactVendor.module.css'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { LiteLoader } from '../../../../../../Loader/Loader'
import { baseApiUrl } from '../../../../../../../utils/config'
import Message from '../../../../../../UI/Message/Message'
import CustomCheckbox from '../../../../../../UI/CustomCheckbox/CustomCheckbox'
import learnIcon from '/public/imgs/vendor/learn_icon.svg'
import ImgWithLoader from '../../../../../../UI/ImgWithLoader/ImgWithLoader'
import currencyFormat from '../../../../../../../utils/currencyFormat'
import PhoneInput from 'react-phone-input-2'
import getDate from '../../../../../../../utils/getDate'
// import moment from 'moment-timezone'
import { DateTime } from 'luxon'
import Link from 'next/link'

const ContactVendor = ({ vendorId, vendorName, type, showMeetingModal, meetingFormSubmit, setmeetingFormSubmit, appointmentData, userAddress, loginUser, userPosition }) => {
	// console.log('user', user)
	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [resMsg, setresMsg] = useState('')
	const [formSuccess, setformSuccess] = useState(false)
	// const [showDateMenu, setshowDateMenu] = useState(false)
	// const [selectedDate, setselectedDate] = useState('Select date')
	const [selectedTime, setselectedTime] = useState('Select time')
	const [showTimeMenu, setshowTimeMenu] = useState(false)
	// const [activeDateIndex, setactiveDateIndex] = useState(null)
	const [userPhone, setuserPhone] = useState('')
	const [userPhoneError, setuserPhoneError] = useState('')

	const [selectedPosition, setselectedPosition] = useState(userPosition !== undefined && userPosition !== null ? userPosition : 'Select your position')
	const [showPositionMenu, setshowPositionMenu] = useState(false)
	const [positionsData, setpositionsData] = useState([])
	const [formSubmit, setformSubmit] = useState(false)

	const [slotsArray, setslotsArray] = useState([])

	const positionRef = useRef(null)
	// const dateRef = useRef(null)
	const timeRef = useRef(null)

	// const [location, setlocation] = useState(
	// 	userAddress !== null && userAddress?.latitude !== null && userAddress?.longitude !== null
	// 		? {
	// 				latitude: userAddress?.latitude,
	// 				longitude: userAddress?.longitude
	// 		  }
	// 		: {}
	// )
	// const [userLocationData, setuserLocationData] = useState({})
	// const [userTz, setuserTz] = useState(userAddress?.timezone !== undefined && userAddress?.timezone !== null ? userAddress?.timezone : null)

	// const [gettingLocation, setgettingLocation] = useState(true)

	let slotsData = []

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
		setValue,
		setError,
		clearErrors,
		reset
	} = useForm({
		defaultValues: {
			name: type === 'meeting' && loginUser?.first_name !== undefined && loginUser?.first_name !== null ? loginUser?.first_name + ' ' + loginUser?.last_name : '',
			email: type === 'meeting' && loginUser?.email !== undefined && loginUser?.email !== null ? loginUser?.email : '',
			clinic: type === 'meeting' && loginUser?.clinic_name !== undefined && loginUser?.clinic_name !== null ? loginUser?.clinic_name : ''
		},
		mode: 'onBlur'
	})

	const submitHandler = async (e) => {
		setformSubmit(false)

		if (userPhone?.length < 11 && userPhone?.length > 1) {
			setuserPhoneError('Min 10 digits')
		} else {
			setuserPhoneError('')
		}
		e.preventDefault()

		await handleSubmit(type !== 'meeting' ? onSubmit : meetingSubmit)()
	}

	const onSubmit = async (data) => {
		const { name, email, subject, message } = data

		setbtndisabled(true)
		setloading(true)
		const formData = {
			name,
			subject,
			email,
			message,
			vendor_id: vendorId
		}
		const res = await axios.post(`${baseApiUrl}/vendors/contact/send`, formData)
		res?.status === 200
			? (setformSuccess(true),
			  reset(),
			  setTimeout(() => {
					setformSubmit(false)
					setresMsg('')
					setformSuccess(null)
			  }, 3000))
			: setformSuccess(false)

		setresMsg(res?.data?.message)
		setformSubmit(true)
		setloading(false)
		setbtndisabled(false)
	}
	// meeting submit handler
	const meetingSubmit = async (data) => {
		const { name, email, subject, message, clinic_name, time } = data
		const selectedTime = time.slice(-11),
			startSlot = selectedTime.slice(0, 5),
			endSlot = selectedTime.slice(-5)

		const startTime12Hours =
			startSlot.slice(0, 2) > 12
				? startSlot.slice(0, 2) - 12 === 0
					? 12 + startSlot.slice(2)
					: startSlot.slice(0, 2) - 12 < 10
					? `0${startSlot.slice(0, 2) - 12}${startSlot.slice(2)}`
					: `${startSlot.slice(0, 2) - 12}${startSlot.slice(2)}`
				: startSlot.slice(0, 2) == 0
				? 12 + startSlot.slice(2)
				: startSlot

		const endTime12Hours =
			endSlot.slice(0, 2) > 12 ? (endSlot.slice(0, 2) - 12 === 0 ? 12 + endSlot.slice(2) : endSlot.slice(0, 2) - 12 < 10 ? `0${endSlot.slice(0, 2) - 12}${endSlot.slice(2)}` : `${endSlot.slice(0, 2) - 12}${endSlot.slice(2)}`) : endSlot.slice(0, 2) == 0 ? 12 + endSlot.slice(2) : endSlot

		const med = selectedTime.slice(0, 2) / 12 >= 1 ? 'PM' : 'AM'

		if (userPhoneError !== 'Min 10 digits') {
			const reqData = {
				vendor_id: vendorId,
				customer_id: loginUser?.id ? loginUser?.id : 0,
				customer_name: name,
				customer_email: email,
				customer_mobile: userPhone,
				subject,
				message,
				booking_date: getDate(time.slice(0, 10)),
				time_serial: `${startTime12Hours} ${med} - ${endTime12Hours} ${med}`,
				time_meridiem: med,
				position: selectedPosition,
				clinic_name
				// user_current_time: userLocationData
			}

			console.log('req data', reqData, 'time', time, 'selected time', selectedTime)

			setbtndisabled(true)
			setloading(true)

			const res = await axios.post(`${baseApiUrl}/appointment-request`, reqData)
			console.log('res from appointment', res, 'req data', reqData)

			setresMsg(res?.data?.message)
			reset()
			setselectedTime('Select time')
			setselectedPosition('Select your position')
			setformSuccess(res?.data?.success)
			setmeetingFormSubmit(true)
			setloading(false)
			setbtndisabled(false)
		}
	}

	if (typeof window !== 'undefined' && showMeetingModal && !meetingFormSubmit) {
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()

			if (showTimeMenu && timeRef?.current) {
				if (!timeRef?.current?.contains(e.target)) setshowTimeMenu(false)
			} else if (showPositionMenu && positionRef?.current) {
				if (!positionRef?.current?.contains(e.target)) setshowPositionMenu(false)
			} else return
		})
	}

	const getPositionsData = async () => {
		const res = await axios.get(`${baseApiUrl}/get-positions`)
		setpositionsData(res?.data?.positions)
	}

	// useEffect(() => {
	// 	type === 'meeting' && (getPositionsData(), setmeetingFormSubmit(false))
	// }, [])

	const phoneFormatHanlder = (ev) => {
		if (ev?.length < 11) {
			setuserPhoneError('Min 10 digits')
		} else {
			setuserPhoneError('')
		}
	}

	// location access popup
	// const getUserLocationAccess = async () => {
	// 	if ('geolocation' in navigator && showMeetingModal) {
	// 		navigator.geolocation.getCurrentPosition(({ coords }) => {
	// 			const { latitude, longitude } = coords

	// 			console.log('latitude', latitude, 'longitude', longitude)

	// 			setlocation({ latitude: latitude, longitude: longitude })
	// 		})
	// 	}
	// }

	// useEffect(() => {
	// 	if (loginUser?.id === undefined && showMeetingModal) {
	// 		getUserLocationAccess()
	// 	}
	// }, [showMeetingModal, loginUser?.id])

	// get user time zone data thorugh lat and lang
	// const getUserTimeZoneData = async () => {
	// 	setgettingLocation(true)

	// 	const addressData = await axios(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.latitude},${location?.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`)
	// 	console.log('addressData', addressData)

	// 	const res = await axios(`https://maps.googleapis.com/maps/api/timezone/json?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&location=${location?.latitude},${location?.longitude}&timestamp=${Math.round(new Date().getTime() / 1000)}`)
	// 	console.log('res', res)

	// 	let timezone = res?.data?.timeZoneId,
	// 		userTimeZone = timezone,
	// 		currentDate = getCurrentTimeInTimezone(timezone),
	// 		dateTimeParts = currentDate.split(', '),
	// 		datePart = dateTimeParts[0],
	// 		timePart = dateTimeParts[1],
	// 		timeZoneInfo = `${datePart}, ${timePart.substring(0, timePart.lastIndexOf(':'))} ${timePart.slice(-2)}, ${userTimeZone}, ${addressData?.data?.results[0]?.address_components[addressData?.data?.results[0]?.address_components?.length - 3]?.short_name}, ${
	// 			addressData?.data?.results[0]?.address_components[addressData?.data?.results[0]?.address_components?.length - 2]?.long_name
	// 		}`

	// 	console.log('userTimeZone', userTimeZone)

	// 	setuserTz(userTimeZone)

	// 	setuserLocationData(timeZoneInfo)
	// 	setgettingLocation(false)
	// }

	// const getCurrentTimeInTimezone = (timezone) => {
	// 	let now = new Date(),
	// 		tzDate = now.toLocaleString('en-US', { timeZone: timezone })
	// 	return tzDate
	// }

	// useEffect(() => {
	// 	if (Object.keys(location).length > 0) {
	// 		getUserTimeZoneData()
	// 	} else setTimeout(() => setgettingLocation(false), 2000)
	// }, [location, loginUser?.id])

	// convert time solts as per user time zone
	const getDateAndTimeConverted = useCallback(async () => {
		await appointmentData?.map((app) => {
			const { allowed_lunch, allowed_lunch_amount } = app

			app?.intervals?.map((int) => {
				const { start_time, end_time } = int

				let userStartDateTime, userEndDateTime

				// Format date strings based on the browser
				if (navigator?.userAgent?.match(/safari/i) && !navigator?.userAgent?.match(/chrome|chromium|crios/i)) {
					userStartDateTime = new Date(start_time.replace(' UTC ', ' ').replace(' (+00:00)', 'Z')).toISOString()
					userEndDateTime = new Date(end_time.replace(' UTC ', ' ').replace(' (+00:00)', 'Z')).toISOString()
				} else {
					userStartDateTime = new Date(start_time).toISOString()
					userEndDateTime = new Date(end_time).toISOString()
				}

				const userStartUTCTime = DateTime.fromISO(userStartDateTime, { zone: 'utc' })
				const userTzStartDateTime = userStartUTCTime.setZone(userAddress?.timezone)

				const userEndUTCTime = DateTime.fromISO(userEndDateTime, { zone: 'utc' })
				const userTzEndDateTime = userEndUTCTime.setZone(userAddress?.timezone)

				const today = DateTime.now().setZone(userAddress?.timezone),
					localDateTime = today.toFormat('yyyy-MM-dd, HH:mm'),
					localDate = localDateTime.slice(0, 10),
					localTime = localDateTime.slice(-5)

				slotsData =
					(userTzStartDateTime.toISO().slice(0, 10) === localDate && userTzStartDateTime.toISO().slice(11, 16) > localTime) || userTzStartDateTime.toISO().slice(0, 10) > localDate
						? [
								...slotsData,
								{
									start: userTzStartDateTime.toISO(),
									end: userTzEndDateTime.toISO(),
									original_start: userStartUTCTime.toISO(),
									original_end: userEndUTCTime.toISO(),
									allowed_lunch,
									allowed_lunch_amount
								}
						  ]
						: [...slotsData]
			})
		})
	}, [appointmentData])

	useEffect(() => {
		type === 'meeting' && (getPositionsData(), setmeetingFormSubmit(false))
		userAddress && userAddress?.timezone !== null && (getDateAndTimeConverted(), console.log('appointmentData', appointmentData, 'userAddress?.timezone', userAddress?.timezone, 'slotsData', slotsData), setslotsArray(slotsData))
	}, [])

	return (
		<div className={`${styles.form_container} radius  ${type === 'meeting' ? styles.meeting : undefined} `}>
			{!meetingFormSubmit ? (
				<>
					<div className={styles.title_wrapper}>
						{type !== 'meeting' ? <h5 className='primary-color'>Contact Vendor</h5> : <h5 className='primary-color'>Reserve Virtual Meeting with {vendorName}</h5>}
						{type === 'meeting' && <ImgWithLoader className={styles.icon} width={50} height={50} src={learnIcon} alt='Learn at Lunch' />}
					</div>
					<form className={styles.form_wrapper}>
						{type !== 'meeting' ? (
							<>
								{/* name */}
								<div className={styles.fields_wrapper}>
									<div className={styles.inner_wrapper}>
										<label htmlFor='name'>
											Name <span>*</span>
										</label>
										{errors.name?.type === 'required' && (
											<div className={styles.error_msg} role='alert'>
												required
											</div>
										)}
										{errors.name?.message && (
											<div className={styles.error_msg} role='alert'>
												{errors.name?.message}
											</div>
										)}
									</div>

									<input
										{...register('name', {
											required: true,
											minLength: { value: 2, message: 'Min 2 characters' },
											maxLength: { value: 40, message: 'Max 40 characters' },
											pattern: {
												value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
												message: 'Enter valid name'
											}
										})}
										aria-invalid={errors.name ? 'true' : 'false'}
										className={`${styles.input} ${errors?.name ? 'input-error' : undefined}`}
										minLength={2}
										maxLength={40}
										type='text'
										placeholder='Name'
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
										{...register('email', {
											required: true,
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: 'Enter valid email'
											}
										})}
										aria-invalid={errors.email ? 'true' : 'false'}
										className={`${styles.input} ${errors?.email ? 'input-error' : undefined}`}
										type='email'
										placeholder='Email'
									/>
								</div>

								{/* subject */}
								{type !== 'meeting' && (
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='subject'>
												Subject <span>*</span>
											</label>
											{errors.subject?.type === 'required' && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
											{errors.subject?.message && (
												<div className={styles.error_msg} role='alert'>
													{errors.subject?.message}
												</div>
											)}
										</div>

										<input
											{...register('subject', {
												required: true,
												minLength: { value: 2, message: 'Subject is short' },
												maxLength: { value: 100, message: 'Max 100 characters' },
												pattern: { value: /.*\S.*/, message: 'Subject is empty' }
											})}
											aria-invalid={errors.subject ? 'true' : 'false'}
											className={`${styles.input} ${errors?.subject ? 'input-error' : undefined}`}
											min='2'
											max='300'
											type='text'
											placeholder='Subject'
										/>
									</div>
								)}

								{/* msg */}
								<div className={styles.fields_wrapper}>
									<div className={styles.inner_wrapper}>
										<label htmlFor='message'>
											Message <span>*</span>
										</label>
										{errors.message?.type === 'required' && (
											<div className={`${styles.error_msg} ${styles.msg_error_msg}`} role='alert'>
												required
											</div>
										)}
										{errors.message?.message && (
											<div className={styles.error_msg} role='alert'>
												{errors.message?.message}
											</div>
										)}
									</div>

									<textarea
										{...register('message', {
											required: true,
											minLength: { value: 2, message: 'Min 2 characters' },
											pattern: { value: /.*\S.*/, message: 'Enter something' }
										})}
										aria-invalid={errors.message ? 'true' : 'false'}
										className={`${styles.textarea} ${errors?.message ? 'input-error' : undefined} transition`}
										min='2'
										placeholder='Message'
									/>
								</div>
							</>
						) : (
							userAddress &&
							userAddress?.timezone !== null &&
							loginUser?.id !== undefined && (
								<>
									{/* name */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='name'>
												Name <span>*</span>
											</label>
											{errors.name?.type === 'required' && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
											{errors.name?.message && (
												<div className={styles.error_msg} role='alert'>
													{errors.name?.message}
												</div>
											)}
										</div>

										<input
											{...register('name', {
												required: true,
												minLength: { value: 2, message: 'Min 2 characters' },
												maxLength: { value: 40, message: 'Max 40 characters' },
												pattern: {
													value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
													message: 'Enter valid name'
												}
											})}
											aria-invalid={errors.name ? 'true' : 'false'}
											className={`${styles.input} ${errors?.name ? 'input-error' : undefined}`}
											minLength={2}
											maxLength={40}
											type='text'
											placeholder='Name'
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
											{...register('email', {
												required: true,
												pattern: {
													value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
													message: 'Enter valid email'
												}
											})}
											aria-invalid={errors.email ? 'true' : 'false'}
											className={`${styles.input} ${errors?.email ? 'input-error' : undefined}`}
											type='email'
											placeholder='Email'
										/>
									</div>

									{/* subject */}
									<div className={`${styles.fields_wrapper} ${styles.tow_col}`}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='subject'>
												Subject <span>*</span>
											</label>
											{errors.subject?.type === 'required' && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
											{errors.subject?.message && (
												<div className={styles.error_msg} role='alert'>
													{errors.subject?.message}
												</div>
											)}
										</div>

										<input
											{...register('subject', {
												required: true,
												minLength: { value: 2, message: 'Subject is short' },
												maxLength: { value: 100, message: 'Max 100 characters' },
												pattern: { value: /.*\S.*/, message: 'Subject is empty' }
											})}
											aria-invalid={errors.subject ? 'true' : 'false'}
											className={`${styles.input} ${errors?.subject ? 'input-error' : undefined}`}
											min='2'
											max='300'
											type='text'
											placeholder='Subject'
										/>
									</div>

									{/* phone number */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='tel'>
												Phone Number <span>*</span>
											</label>
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

										<Controller
											control={control}
											name='tel'
											rules={{
												validate: () => userPhone !== '' && userPhone !== null
											}}
											render={({ field: { onBlur } }) => (
												<PhoneInput
													enableSearch={true}
													className={`custom_number vendor_phone_input ${errors.tel || userPhoneError === 'Min 10 digits' ? 'error_number' : undefined}`}
													searchPlaceholder={'Search country'}
													searchNotFound={'No country found...'}
													placeholder='+1(201) 555-5555'
													onPaste={(e) => e.preventDefault()}
													aria-invalid={errors.tel ? 'true' : 'false'}
													value={userPhone}
													onBlur={onBlur}
													country='us'
													onChange={(phone) => {
														setuserPhone(phone)
														phoneFormatHanlder(phone)
														phone.length === 11 && clearErrors('tel')
													}}
												/>
											)}
										/>
									</div>

									{/* time */}
									<div className={`${styles.fields_wrapper}`} onBlur={() => setshowTimeMenu(false)}>
										<div className={`${styles.inner_wrapper}`}>
											<label htmlFor='time' className='gray-color'>
												Select Time <span>*</span>
											</label>
											{errors.time && <div className={styles.error_msg}>required</div>}
										</div>
										<div ref={timeRef} className={styles.time}>
											<Controller
												control={control}
												name='time'
												rules={{
													validate: () => selectedTime !== 'Select time'
												}}
												render={({ field: { onChange, onBlur, value } }) => (
													<div className={styles.date}>
														<>
															<div className={`gray-border ${styles.selected_date} ${errors?.time ? 'input-error' : undefined}`} onClick={() => setshowTimeMenu(true)} tabIndex={0} onFocus={setshowTimeMenu}>
																<div className='gray-color'>{selectedTime}</div>
																<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className='w-6 h-6'>
																	<path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
																</svg>
															</div>
															<div className={`shadow radius white-bg ${styles.menu} transition ${showTimeMenu ? styles.show_menu : undefined}`}>
																{slotsArray?.map((slot, i) => {
																	const { original_start, original_end, start, end, allowed_lunch, allowed_lunch_amount } = slot

																	const startDate = start.slice(0, 10)

																	const startTime = start.slice(11, 16)

																	const startTime12Hours =
																		startTime.slice(0, 2) > 12
																			? startTime.slice(0, 2) - 12 === 0
																				? 12 + startTime.slice(2)
																				: startTime.slice(0, 2) - 12 < 10
																				? `0${startTime.slice(0, 2) - 12}${startTime.slice(2)}`
																				: `${startTime.slice(0, 2) - 12}${startTime.slice(2)}`
																			: startTime.slice(0, 2) == 0
																			? 12 + startTime.slice(2)
																			: startTime

																	const startMed = startTime.slice(0, 2) / 12 >= 1 ? 'PM' : 'AM'

																	const endTime = end.slice(11, 16)
																	const endTime12Hours =
																		endTime.slice(0, 2) > 12
																			? endTime.slice(0, 2) - 12 === 0
																				? 12 + endTime.slice(2)
																				: endTime.slice(0, 2) - 12 < 10
																				? `0${endTime.slice(0, 2) - 12}${endTime.slice(2)}`
																				: `${endTime.slice(0, 2) - 12}${endTime.slice(2)}`
																			: endTime.slice(0, 2) == 0
																			? 12 + endTime.slice(2)
																			: endTime

																	const endtMed = endTime.slice(0, 2) / 12 >= 1 ? 'PM' : 'AM'

																	return (
																		<div key={i}>
																			{slotsArray?.length === 1 ||
																				(slotsArray[i - 1]?.start.slice(0, 10) !== startDate && (
																					<div className={`white-bg ${styles.date_offer}`}>
																						<div className={`primary-bg white-color ${styles.date_text}`}>{getDate(startDate)}</div>
																						{allowed_lunch === 'Y' && allowed_lunch_amount !== null && allowed_lunch_amount > 0 && <div className='primary-color semibold-text'>Lunch offer {currencyFormat(allowed_lunch_amount)}</div>}
																					</div>
																				))}
																			<CustomCheckbox
																				className={`${styles.checkbox} semibold-text black-color`}
																				name={'date'}
																				type='radio'
																				value={`${original_start.slice(0, 10)} ${original_start.slice(11, 16)} ${original_end.slice(11, 16)}`}
																				labeltitle={`${startTime12Hours} ${startMed} - ${endTime12Hours} ${endtMed}
																				`}
																				onChange={(e) => {
																					setValue('time', e.target.value), setselectedTime(`${getDate(startDate)} - ${startTime12Hours} ${startMed} - ${endTime12Hours} ${endtMed}`), setshowTimeMenu(false), clearErrors('time')
																				}}
																				onBlur={onBlur}
																			/>
																		</div>
																	)
																})}
															</div>
														</>
													</div>
												)}
											/>
										</div>
									</div>

									{/* position */}
									<div ref={positionRef} className={`${styles.fields_wrapper}`} onBlur={() => setshowPositionMenu(false)}>
										<div className={styles.inner_wrapper}>
											<label className='gray-color' htmlFor='position'>
												Position <span className='red-color'>*</span>
											</label>
											{errors.position && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
										</div>

										<div className={styles.inner_wrapper}>
											<div className={`${styles.input} ${styles.position_container} ${errors?.position ? 'input-error' : undefined}`} onClick={() => positionsData.length > 0 && setshowPositionMenu(true)} tabIndex={0} onFocus={setshowPositionMenu}>
												<div className='gray-color'>{selectedPosition}</div>
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
												</svg>
												<Controller
													control={control}
													name='position'
													isRequired
													rules={{
														validate: () => selectedPosition !== 'Select your position'
													}}
													render={({ field: { onBlur } }) => (
														<div className={`${styles.menu} white-bg radius ${showPositionMenu && styles.show_menu} shadow transition`}>
															{positionsData?.map((position, index) => {
																return (
																	<CustomCheckbox
																		className={styles.checkbox}
																		visibleLabelId='position_label'
																		onBlur={onBlur}
																		key={index}
																		type='radio'
																		labeltitle={position}
																		value={position}
																		defaultChecked={position === userPosition ? true : false}
																		title={position}
																		name='position'
																		onChange={(e) => {
																			setselectedPosition(e.target.value), setshowPositionMenu(false), clearErrors('position')
																		}}
																	/>
																)
															})}
														</div>
													)}
												/>
											</div>
										</div>
									</div>

									{/* clinic */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label className='gray-color' htmlFor='clinic_name'>
												Clinic Name
											</label>
										</div>

										<input
											{...register('clinic_name', {
												required: false
											})}
											aria-invalid={errors.clinic_name ? 'true' : 'false'}
											className={styles.input}
											type='text'
											placeholder='Your clinic name'
											autoComplete='new-password'
										/>
									</div>

									{/* msg */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='message'>
												Message <span>*</span>
											</label>
											{errors.message?.type === 'required' && (
												<div className={`${styles.error_msg} ${styles.msg_error_msg}`} role='alert'>
													required
												</div>
											)}
											{errors.message?.message && (
												<div className={styles.error_msg} role='alert'>
													{errors.message?.message}
												</div>
											)}
										</div>

										<textarea
											{...register('message', {
												required: true,
												minLength: { value: 2, message: 'Min 2 characters' },
												pattern: { value: /.*\S.*/, message: 'Enter something' }
											})}
											aria-invalid={errors.message ? 'true' : 'false'}
											className={`${styles.textarea} ${errors?.message ? 'input-error' : undefined} transition`}
											min='2'
											placeholder='Message'
										/>
									</div>
								</>
							)
						)}
						{formSubmit && <Message className={styles.msg} resMsg={resMsg} formSuccess={formSuccess} />}

						{type !== 'meeting' && (
							<button disabled={btndisabled} type='submit' className={`${styles.btn} sml-btn primary-btn white-color`} onClick={(e) => submitHandler(e)}>
								Submit
								{loading && <LiteLoader loaderType={'sml'} className={styles.submit_loader} />}
							</button>
						)}

						{type === 'meeting' &&
							(loginUser?.id !== undefined ? (
								// slotsArray?.length > 0 &&
								userAddress && userAddress?.timezone !== null ? (
									<button disabled={btndisabled} type='submit' className={`${styles.btn}  primary-btn`} onClick={(e) => submitHandler(e)}>
										Submit
										{loading && <LiteLoader className={styles.submit_loader} />}
									</button>
								) : (
									<div className={styles.access}>
										<p className='gray-color'>A valid address is required to book your meeting.</p>
										<p className='gray-color'>Click the below button to {userAddress === null ? 'add an' : 'edit your'} address.</p>
										<Link href={`/dashboard/?edit_address`}>
											<a>
												<button className='primary-btn'>{userAddress === null ? 'Add' : 'Edit'} Address</button>
											</a>
										</Link>
									</div>
								)
							) : (
								<div className={styles.access}>
									<p className='gray-color'>You need to sign in to book your meeting.</p>
									<p className='gray-color'>Click the below button to proceed.</p>

									<Link href='/auth/signin'>
										<a>
											<button className='primary-btn'>Sign in</button>
										</a>
									</Link>
								</div>
							))}
					</form>{' '}
				</>
			) : (
				meetingFormSubmit && <Message className={`meeting-msg ${styles.msg}`} resMsg={resMsg} formSuccess={formSuccess} />
			)}
		</div>
	)
}

export default memo(ContactVendor)

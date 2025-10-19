import React, { useState, useEffect, useRef } from 'react'
import styles from './ContactForm.module.css'
import { Controller, useForm } from 'react-hook-form'
import { baseApiUrl } from '../../../../../utils/config'
import { DarkLoader, LiteLoader } from '../../../../Loader/Loader'
import Message from '../../../../UI/Message/Message'
import axios from 'axios'
import CustomCheckbox from '../../../../UI/CustomCheckbox/CustomCheckbox'
import Modal from '../../../../UI/Modal/Modal'
import TermsModal from './TermsModal/TermsModal'
import { lockScroll, unlockScroll } from '../../../../../utils/scrollLock'
import CustomSelectInput from '../../../../UI/CustomSelectInput/CustomSelectInput'
import { businessTypes, categories, hearAbout, paymentMethods, speakTo } from './data'
import PhoneInput from 'react-phone-input-2'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'
import ReCAPTCHA from 'react-google-recaptcha'
// import { generateCaptchaHandler, captchaValue } from '../../../../../utils/captcha'

const ContactForm = () => {
	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [formsubmit, setformsubmit] = useState(false)
	const [formSuccess, setformSuccess] = useState(false)
	const [resMsg, setresMsg] = useState('')

	const [selectedBusinessType, setselectedBusinessType] = useState(null)
	const [selectedBusinessTypeOption, setselectedBusinessTypeOption] = useState('Select option')
	const [showSelectBusinessType, setshowSelectBusinessType] = useState(false)

	const [selectedPayment, setselectedPayment] = useState(null)
	const [selectedPaymentOption, setselectedPaymentOption] = useState('Select option')
	const [showSelectPayment, setshowSelectPayment] = useState(false)

	const [selectedHeared, setselectedHeared] = useState(null)
	const [selectedHearedOption, setselectedHearedOption] = useState('Select option')
	const [showSelectHeared, setshowSelectHeared] = useState(false)

	const [selectedSpeakTo, setselectedSpeakTo] = useState(null)
	const [selectedSpeakToOption, setselectedSpeakToOption] = useState('Select option')
	const [showSelectSpeakTo, setshowSelectSpeakTo] = useState(false)

	const [selectedCategory, setselectedCategory] = useState(null)
	const [selectedCategoryOption, setselectedCategoryOption] = useState('Select option')
	const [showSelectCategory, setshowSelectCategory] = useState(false)

	const [signupAsVal, setsignupAsVal] = useState(1)
	const [sellerForm, setsellerForm] = useState(true)
	const [serviceProviderForm, setserviceProviderForm] = useState(false)
	const [dvmPreferred, setdvmPreferred] = useState('Y')
	// const [serviceProviderAsseller, setserviceProviderAsseller] = useState('Y')
	const [modal, setmodal] = useState(false)
	const [sellerFormChecked, setsellerFormChecked] = useState(true)
	const [spFormChecked, setspFormChecked] = useState(false)

	const [initial, setinitial] = useState('')
	const [termsAcceptance, settermsAcceptance] = useState(0)
	const [termsRequired, settermsRequired] = useState(false)
	const [formAcceptance, setformAcceptance] = useState(false)
	const modalElRequired = useRef(null)
	const [termsChecked, settermsChecked] = useState(false)
	const [initialsLengthError, setinitialsLengthError] = useState(false)
	const [initialValidationError, setinitialValidationError] = useState(false)

	const [modalAcceptanceError, setmodalAcceptanceError] = useState(false)
	const [showInitialError, setshowInitialError] = useState(false)

	const [logoImgUploadCaption, setlogoImgUploadCaption] = useState('Select an image')
	const [headerImgUploadCaption, setheaderImgUploadCaption] = useState('Select an image')

	const [fileUploadCaption, setfileUploadCaption] = useState('Select file')
	const [showFields, setShowFields] = useState(false)
	const [isCountryAutoDetected, setIsCountryAutoDetected] = useState(false)
	const [isStateDetected, setIsStateAutoDetected] = useState(false)
	const [isCityDetected, setIsCityAutoDetected] = useState(false)
	const [isZipCodeDetected, setIsZipCodeAutoDetected] = useState(false)
	const [userFormData, setUserFormData] = useState({
		city: true,
		zip_code: true,
		state: true,
		country:true
	})

	const [userPhone, setuserPhone] = useState('')
	const [userPhoneError, setuserPhoneError] = useState('')
	const [fillAllFields, setfillAllFields] = useState(false)
	const [googlePlaces, setGooglePlaces] = useState('')
	const [showTooltip, setshowTooltip] = useState(false)

	// const canvasRef = useRef(null)

	const recaptchaRef = useRef(null)

	const scriptOptions = {
		googleMapsApiKey: 'AIzaSyC-r86tO9gWZxzRiELiw3DQYa2D3_o1CVk',
		libraries: ['places']
	}

	const { isLoaded, loadError } = useLoadScript(scriptOptions)

	const [autocomplete, setAutocomplete] = useState(null)

	const initialValidation = /^[\s]*[A-Za-z]+[A-Za-z\s]*$/.test(initial)

	const acceptHandler = () => {
		lockScroll()

		if (termsAcceptance === 0) {
			setmodalAcceptanceError(true)
		}

		if (initial === '') {
			setshowInitialError(true)
		}

		if (termsAcceptance === 0 || initial === '' || initial?.length < 2 || !initialValidation) {
			return
		} else {
			setmodal(false)
			unlockScroll()
		}
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		setError,
		clearErrors,
		setValue,
		getValues,
		control
	} = useForm({
		defaultValues: {
			country: null,
			state: null
		}
	})
	useEffect(() => {
		if (getValues('address') !== '' && googlePlaces?.length>0) {
			setShowFields(true)
		} else {
			setShowFields(false)
		}
	}, [getValues('address')])
	const formSubmitHandler = () => {
		setformsubmit(false)
		setTimeout(() => {
			modalElRequired.current.scrollIntoView({ behavior: 'smooth' })
		}, 300)

		if (userPhone?.length < 10 && userPhone?.length > 1) {
			setuserPhoneError('Min 10 digits')
			setfillAllFields(true)
		} else if (userPhone?.length === 0 || !userPhone) {
			setuserPhoneError('')
			setfillAllFields(true)
		} else {
			setuserPhoneError('')
			setfillAllFields(false)
		}

		if (!formAcceptance) {
			settermsRequired(true)
			handleSubmit(onSubmit)()
		} else if (initial === '' || initial?.length < 2 || termsAcceptance === 0) {
			acceptHandler()
			setmodal(true)
			unlockScroll()
			handleSubmit(onSubmit)()
		} else {
			handleSubmit(onSubmit)()
		}
	}

	useEffect(() => {
		if (userPhone?.length > 10) {
			setfillAllFields(false)
		}
	}, [userPhone])

	const imgValidate = (val, size) => {
		if (!val || val.length === 0) return true

		const imageMaxSize = 1024 * 1024
		const imageSize = val[0]?.size / imageMaxSize
		if (val[0]?.type !== 'image/png' && val[0]?.type !== 'image/jpg' && val[0]?.type !== 'image/jpeg' && val[0]?.type !== 'image/jfif' && val[0]?.type !== 'image/pjpeg' && val[0]?.type !== 'image/pjp' && val[0]?.type !== 'image/webp') {
			return 'Only .png, .jpg, .webp etc files are allowed.'
		} else if (imageSize > size) {
			return `Max ${size}MB is allowed.`
		} else return true
	}

	const validateFile = (file) => {
		if (file?.length > 0) {
			if (
				file[0]?.name?.substring(file[0]?.name.lastIndexOf('.')) !== '.doc' &&
				file[0]?.name?.substring(file[0]?.name.lastIndexOf('.')) !== '.docx' &&
				file[0]?.name?.substring(file[0]?.name.lastIndexOf('.')) !== '.xls' &&
				file[0]?.name?.substring(file[0]?.name.lastIndexOf('.')) !== '.xlsx' &&
				file[0]?.name?.substring(file[0]?.name.lastIndexOf('.')) !== '.csv'
			) {
				return 'upload valid file'
			} else return true
		} else return true
	}

	const onSubmit = async (data) => {
		// const checboxes = document.querySelectorAll('.seller-form-checkbox')
		// console.log('checboxes', checboxes)
		// checboxes.forEach((el) => {
		// 	console.log('el', el.querySelector('input'))
		// })

		setformsubmit(false)
		if (userPhoneError !== 'Min 10 digits') {
			if (!formAcceptance || initial === '' || termsAcceptance === 0) {
				return
			} else {
				const { first_name, last_name, email, address, messages, country, state, city, zip_code, store_name, contact_name, logo, header_image, short_intro, sp_website, deal_details, speak_to_other, file } = data

				setbtndisabled(true)
				setloading(true)
				settermsRequired(false)

				let formData = new FormData()
				formData.append('vendor_type', signupAsVal)
				formData.append('first_name', first_name)
				formData.append('last_name', last_name)
				formData.append('email', email)
				formData.append('phone', document.querySelector('.custom_number input')?.value)
				formData.append('address', address)
				formData.append('country', country)
				formData.append('state', state)
				formData.append('city', city)
				formData.append('zip_code', zip_code)
				formData.append('name', store_name)
				formData.append('contact_name', contact_name)
				!spFormChecked && formData.append('vendor_business_type', selectedBusinessType)
				!spFormChecked && formData.append('preferred_payment_method', selectedPayment)
				formData.append('sp_website', sp_website)
				formData.append('vendor_initials', initial)
				formData.append('accept_terms_and_condition', termsAcceptance)
				formData.append('logo', logo[0], logo[0]?.name)
				// formData.append('header_image', header_image[0], header_image[0]?.name)
				header_image[0] && formData.append('header_image', header_image[0], header_image[0]?.name)
				formData.append('heard_from', selectedHeared)
				formData.append('speak_to_representative', selectedSpeakToOption !== 'Other' ? selectedSpeakTo : speak_to_other)
				file[0] && formData.append('csv_file', file[0], file[0]?.name)
				formData.append('message', messages)

				spFormChecked && formData.append('sp_short_details', short_intro)
				spFormChecked && formData.append('sp_deal', deal_details)
				spFormChecked && formData.append('sp_preferred', dvmPreferred)
				spFormChecked && formData.append('services_seller', 'N')
				spFormChecked && formData.append('sp_category_id', selectedCategory)

				// console.log('dvmPreferred', dvmPreferred, 'serviceProviderAsseller', serviceProviderAsseller, 'data', data)

				const res = await axios.post(`${baseApiUrl}/seller`, formData)

				console.log('res', res)

				setloading(false)
				setresMsg(res?.data?.message)
				setbtndisabled(false)
				setformsubmit(true)
				setformSuccess(() => (res?.data?.success === true ? true : false))

				if (res?.data?.success) {
					reset()
					// generateCaptchaHandler(canvasRef)

					recaptchaRef.current?.reset()

					setuserPhone('+1')
					setinitial('')
					setUserFormData({
						city: true,
						zip_code: true,
						state: true,
						country:true
					})
					settermsAcceptance(0)
					settermsChecked(false)
					reset()
					setlogoImgUploadCaption('Select an image')
					setheaderImgUploadCaption('Select an image')

					setselectedBusinessType(null)
					setselectedBusinessTypeOption('Select option')

					setselectedPayment(null)
					setselectedPaymentOption('Select option')

					setselectedHeared(null)
					setselectedHearedOption('Select option')

					setselectedSpeakTo(null)
					setselectedSpeakToOption('Select option')

					setselectedCategory(null)
					setselectedCategoryOption('Select option')

					setselectedSpeakTo(null)
					setselectedSpeakToOption('Select option')

					setselectedHeared(null)
					setselectedHearedOption('Select option')

					const termscheckbox = document.querySelector('.acceptance-input input')
					termscheckbox.checked = false

					setTimeout(() => {
						setformsubmit(false)
					}, 5000)
				}
			}
		}
	}

	const phoneFormatHanlder = (ev) => {
		if (ev?.length < 11) {
			setuserPhoneError('Min 10 digits')
		} else {
			setuserPhoneError('')
		}
	}

	// address funcs
	const onKeypress = (e) => {
		// On enter pressed
		if (e.key === 'Enter') {
			e.preventDefault()
			return false
		}
	}

	const onLoad = (autocompleteObj) => {
		setAutocomplete(autocompleteObj)
	}

	const onPlaceChanged = async () => {
		if (autocomplete) {
	  const place = await autocomplete.getPlace()
	  console.log("place", place?.address_components);
	  setGooglePlaces(place?.address_components);
	  if (place?.address_components?.length > 0) {
		const timeZone = await fetch(
		  `https://maps.googleapis.com/maps/api/timezone/json?key=AIzaSyC-r86tO9gWZxzRiELiw3DQYa2D3_o1CVk&location=${place?.geometry?.location.lat()},${place?.geometry?.location.lng()}&timestamp=${Math.round(
			new Date().getTime() / 1000
		  )}`
		)
		  .then((response) => response.json())
		  .then((response) => {
			if (response.timeZoneId) {
			  return response.timeZoneId;
			} else {
			  console.log("Select Proper Address");
			}
		  })
		  .catch((error) => {
			console.error("Error:", error);
		  });

				const zip = place?.address_components?.filter((addr) => addr.types.includes('postal_code'))
				const country = place?.address_components?.filter((addr) => addr.types.includes('country'))
				const state = place?.address_components?.filter((addr) => addr.types.includes('administrative_area_level_1'))
				const city = place?.address_components?.filter((addr) => addr.types.includes('locality'))


				if (zip?.length > 0) {
					setValue('zip_code', zip[0].long_name)
					clearErrors('zip_code')
					setIsZipCodeAutoDetected(true)
				} else {
					setValue('zip_code', '')
					setIsZipCodeAutoDetected(false)
				}

				if (country?.length > 0) {
					setValue('country', country[0].long_name)
					clearErrors('country')
					setIsCountryAutoDetected(true)
				} else {
					setValue('country', '')
					setIsCountryAutoDetected(false)
				}

		if (state?.length > 0) {
			setValue('state', state[0].long_name)
			clearErrors('state')
			setIsStateAutoDetected(true)
		} else {
			setValue('state', '')
			setIsStateAutoDetected(false)
		}

		if (city?.length > 0) {
			setValue('city', city[0].long_name)
			clearErrors('city')
			setIsCityAutoDetected(true)
		} else {
			setValue('city', '')
			setIsCityAutoDetected(false)
		}

		setUserFormData({
			zip_code: zip[0]?.long_name ? true : false,
			city: city[0]?.long_name ? true : false,
			state: city[0]?.state ? true : false,
			country: city[0]?.country ? true : false
		})
		
		
		if (
		  zip?.length > 0 &&
		  country?.length > 0 &&
		  state?.length > 0 &&
		  city?.length > 0
		) {
		  clearErrors("address");
		}
	  }
		else{
		setShowFields(false);
		setIsCountryAutoDetected(false);
		setIsStateAutoDetected(false);
		setIsCityAutoDetected(false);
		setIsZipCodeAutoDetected(false);
		}
		
		}
	};
	useEffect(() => {
		// generateCaptchaHandler(canvasRef)
		recaptchaRef.current?.reset()
		setlogoImgUploadCaption('Select an image')
		setheaderImgUploadCaption('Select an image')
		setValue('logo', '')
		setValue('header_image', '')
	}, [sellerForm, serviceProviderForm])

	
	return (
		<>
			<div className={`${styles.form_container}`}>
				<div className='sec-pb'>
					<div className={styles.form_inner_container}>
						<form className={styles.form_wrapper}>
							<div className={`${styles.wrapper} ${styles.checkbox_wrapper}`}>
								<div className={styles.inner_wrapper}>
									<CustomCheckbox
										type='radio'
										labeltitle='Sign Up as Seller'
										name='signup-as'
										defaultChecked={sellerFormChecked}
										value={signupAsVal}
										onClick={() => {
											setsignupAsVal(1), setserviceProviderForm(false), setsellerForm(true), setsellerFormChecked(true), setspFormChecked(false), setformsubmit(false)					  
										}}
									/>
								</div>
								<div className={styles.inner_wrapper}>
									<CustomCheckbox
										type='radio'
										labeltitle='Sign Up as Service Provider'
										name='signup-as'
										defaultChecked={spFormChecked}
										value={signupAsVal}
										onClick={() => {
											setsignupAsVal(2), setserviceProviderForm(true), setsellerForm(false), setspFormChecked(true), setsellerFormChecked(false), setformsubmit(false)
										}}
									/>
								</div>
							</div>
							{sellerForm && !serviceProviderForm && (
								<>
									{/* first & last name */}
									<div className={styles.wrapper}>
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
													maxLength: {
														value: 20,
														message: 'Max 20 characters'
													},
													pattern: {
														value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
														message: 'Enter valid name'
													}
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
													maxLength: {
														value: 20,
														message: 'Max 20 characters'
													},
													pattern: {
														value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
														message: 'Enter valid name'
													}
												})}
												aria-invalid={errors.last_name ? 'true' : 'false'}
												className={`${styles.input} ${errors.last_name ? 'input-error' : undefined}`}
												type='text'
												minLength={2}
												maxLength={20}
												placeholder='Last Name'
											/>
										</div>
									</div>

									{/* email & tel */}
									<div className={styles.wrapper}>
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
												className={`${styles.input} ${errors.email ? 'input-error' : undefined}`}
												type='email'
												placeholder='Email'
											/>
										</div>
										<div className={styles.fields_wrapper}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='phone'>
													Phone Number <span>*</span>
												</label>
												{userPhoneError === '' && errors.phone?.type === 'validate' && (
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
												name='phone'
												rules={{
													validate: () => userPhone !== '' && userPhone !== null
												}}
												render={({ field: { onBlur } }) => (
													<PhoneInput
														enableSearch={true}
														style={{ marginTop: '1rem' }}
														className={`custom_number ${errors.phone || userPhoneError === 'Min 10 digits' ? 'error_number' : undefined}`}
														searchPlaceholder={'Search country'}
														searchNotFound={'No country found...'}
														placeholder='+1'
														country={'us'}
														onPaste={(e) => e.preventDefault()}
														aria-invalid={errors.phone ? 'true' : 'false'}
														value={userPhone}
														onBlur={onBlur}
														onChange={(phone) => {
															setuserPhone(phone)
															phoneFormatHanlder(phone)
															phone.length === 11 && clearErrors('phone')
														}}
													/>
												)}
											/>
										</div>
									</div>

									{/* website */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='sp_website'>
												Website URL <span>*</span>
											</label>
											{errors.sp_website?.type === 'required' && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
											{errors.sp_website?.message && (
												<div className={styles.error_msg} role='alert'>
													{errors.sp_website?.message}
												</div>
											)}
										</div>

										<input
											{...register('sp_website', {
												required: true,
												pattern: {
													value: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
													message: 'Enter valid url'
												}
											})}
											className={`${styles.input} ${errors.sp_website ? 'input-error' : undefined}`}
											type='text'
											placeholder='Enter Website'
										/>
									</div>

									{/* address */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='address'>
												Address <span>*</span>
												{getValues('address') !== '' && (
													<div className={styles.tooltip_wrapper} onMouseEnter={setshowTooltip} onMouseLeave={() => setshowTooltip(!showTooltip)}>
														<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className='w-6 h-6'>
															<path strokeLinecap='round' strokeLinejoin='round' d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z' />
														</svg>
														<div className={`${styles.tooltip} black-color gray-border shadow transition ${showTooltip ? styles.show_tooltip : undefined}`}>{getValues('address')}</div>
													</div>
												)}
											</label>

											{errors.address && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
										</div>

										<Controller
											control={control}
											name='address'
											rules={{
												validate: () =>googlePlaces?.length >0
											}}
											render={({ field: { onBlur } }) =>
												!isLoaded ? (
													<DarkLoader className={styles.input} />
												) : loadError ? (
													<div>{`Google Map script can't be loaded, please reload the page`}</div>
												) : (
													<Autocomplete fields={['']} onLoad={onLoad} onPlaceChanged={onPlaceChanged} onKeypress={onKeypress}>
														<input
															{...register('address', {
																required: true,
																onChange: (e) => (setValue('address', e.target.value), e.target.value.length === 0 && (setGooglePlaces(''), setValue('country', ''), setValue('state', ''), setValue('city', ''), setValue('zip_code', '')))
															})}
															aria-invalid={errors.address ? 'true' : 'false'}
															className={`${styles.input} ${errors.address ? 'input-error' : undefined}`}
															type='text'
															placeholder='Address'
														/>
													</Autocomplete>
												)
											}
										/>
									</div>

									{/* country & state */}
									{showFields && (!isCountryAutoDetected || !isStateDetected) && (
										<div className={styles.wrapper}>
											{!isCountryAutoDetected && (
												<div className={styles.fields_wrapper} tabIndex={-1}>
													<div className={styles.inner_wrapper}>
														<label htmlFor='country'>
															Country:
															<span className='red-color'> *</span>
														</label>
														{errors.country && <div className={styles.error_msg}>required</div>}
													</div>
													<input
														readOnly={getValues('address') === '' || (getValues('address') !== '' && userFormData.country) ? true : false}
														{...register('country', {
															required: true
														})}
														tabIndex={-1}
														aria-invalid={errors.country ? 'true' : 'false'}
														className={`${styles.input} ${errors.country ? 'input-error' : undefined}`}
														type='text'
														placeholder=''
													/>
												</div>
											)}

											{!isStateDetected && (
												<div className={styles.fields_wrapper} tabIndex={-1}>
													<div className={`${styles.inner_wrapper}`}>
														<label htmlFor='state'>
															State:
															<span className='red-color'> *</span>
														</label>
														{errors.state && <div className={styles.error_msg}>required</div>}
													</div>

													<input
														readOnly={getValues('address') === '' || (getValues('address') !== '' && userFormData.state) ? true : false}
														{...register('state', {
															required: true
														})}
														tabIndex={-1}
														aria-invalid={errors.state ? 'true' : 'false'}
														className={`${styles.input} ${errors.state ? 'input-error' : undefined}`}
														type='text'
														placeholder=''
													/>
												</div>
											)}
										</div>
									)}

									{/* city & zip code */}
									{showFields && (!isCityDetected || !isZipCodeDetected) && (
										<div className={styles.wrapper}>
											{!isCityDetected && (
												<div className={styles.fields_wrapper} tabIndex={-1}>
													<div className={styles.inner_wrapper}>
														<label className='black-color' htmlFor='city'>
															City <span className='red-color'>*</span>
														</label>
														{errors.city?.type === 'required' && (
															<div className={styles.error_msg} role='alert'>
																required
															</div>
														)}
													</div>

													<input
														readOnly={getValues('address') === '' || (getValues('address') !== '' && userFormData.city) ? true : false}
														{...register('city', {
															required: true
														})}
														tabIndex={-1}
														aria-invalid={errors.city ? 'true' : 'false'}
														className={`${styles.input} ${errors.city ? 'input-error' : undefined}`}
														type='text'
														placeholder=''
													/>
												</div>
											)}

											{!isZipCodeDetected && (
												<div className={styles.fields_wrapper} tabIndex={-1}>
													<div className={styles.inner_wrapper}>
														<label className='black-color' htmlFor='zip_code'>
															Zip / Postal Code<span className='red-color'>*</span>
														</label>
														{errors.zip_code?.type === 'required' && (
															<div className={styles.error_msg} role='alert'>
																required
															</div>
														)}
														{errors.zip_code?.message && (
															<div className={styles.error_msg} role='alert'>
																{errors.zip_code?.message}
															</div>
														)}
													</div>

													<input
														readOnly={getValues('address') === '' || (getValues('address') !== '' && userFormData.zip_code) ? true : false}
														{...register('zip_code', {
															required: true
														})}
														tabIndex={-1}
														aria-invalid={errors.zip_code ? 'true' : 'false'}
														className={`${styles.input} ${errors.zip_code ? 'input-error' : undefined}`}
														type='text'
														placeholder=''
													/>
												</div>
											)}
										</div>
									)}

									{/* store & contact person name */}
									<div className={styles.wrapper}>
										<div className={styles.fields_wrapper}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='store_name'>
													Store Name <span>*</span>
												</label>
												{errors.store_name?.type === 'required' && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
												{errors.store_name?.message && (
													<div className={styles.error_msg} role='alert'>
														{errors.store_name?.message}
													</div>
												)}
											</div>

											<input
												{...register('store_name', {
													required: true,
													// minLength: { value: 2, message: 'Min 2 characters' },
													// maxLength: { value: 30, message: 'Max 30 characters' },
													validate: {
														checkVal: (val) => val.trim('').length !== 0 || 'Enter valid name'
													}
												})}
												// })}
												aria-invalid={errors.store_name ? 'true' : 'false'}
												className={`${styles.input} ${errors.store_name ? 'input-error' : undefined}`}
												type='text'
												// minLength={2}
												// maxLength={30}
												placeholder='Store Name'
											/>
										</div>
										<div className={styles.fields_wrapper}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='contact_name'>
													Contact Person Name <span>*</span>
												</label>
												{errors.contact_name?.type === 'required' && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
												{errors.contact_name?.message && (
													<div className={styles.error_msg} role='alert'>
														{errors.contact_name?.message}
													</div>
												)}
											</div>

											<input
												{...register('contact_name', {
													required: true,
													minLength: { value: 2, message: 'Min 2 characters' },
													maxLength: {
														value: 30,
														message: 'Max 30 characters'
													},
													pattern: {
														value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
														message: 'Enter valid name'
													}
												})}
												aria-invalid={errors.contact_name ? 'true' : 'false'}
												className={`${styles.input} ${errors.contact_name ? 'input-error' : undefined}`}
												type='text'
												minLength={2}
												maxLength={30}
												placeholder='Contact Person Name'
											/>
										</div>
									</div>

									{/* businees type and payemnt method */}
									<div className={styles.wrapper}>
										<div className={styles.fields_wrapper} onBlur={() => setshowSelectBusinessType(false)}>
											<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
												<label htmlFor='business_type'>
													Business Type <span>*</span>
												</label>
												{errors.business_type && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
											</div>

											<Controller
												control={control}
												name='business_type'
												rules={{
													validate: () => selectedBusinessType !== null && selectedBusinessType !== ''
												}}
												render={({ field: { onBlur } }) => (
													<CustomSelectInput
														dataLoading={false}
														countriesLoading={false}
														input_errors={errors.business_type}
														isRequired
														visibleLabelId='business_type_label'
														data={businessTypes}
														defaultOption={selectedBusinessTypeOption}
														name='business_type'
														placeholder='Search business type'
														showSelectMenu={showSelectBusinessType}
														setshowSelectMenu={setshowSelectBusinessType}
														onBlur={onBlur}
														onChange={() => clearErrors('business_type')}
														onClick={(e) => {
															setselectedBusinessType(e.target.value), setselectedBusinessTypeOption(e.target.title)
														}}
													/>
												)}
											/>
										</div>
										<div className={styles.fields_wrapper} onBlur={() => setshowSelectPayment(false)}>
											<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
												<label htmlFor='payment_method'>
													Preferred Payment Method <span>*</span>
												</label>

												{errors.payment_method && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
											</div>

											<Controller
												control={control}
												name='payment_method'
												rules={{
													validate: () => selectedPayment !== null && selectedPayment !== ''
												}}
												render={({ field: { onBlur } }) => (
													<CustomSelectInput
														dataLoading={false}
														countriesLoading={false}
														input_errors={errors.payment_method}
														isRequired
														visibleLabelId='payment_method_label'
														data={paymentMethods}
														defaultOption={selectedPaymentOption}
														name='payment_method'
														placeholder='Search payment method'
														showSelectMenu={showSelectPayment}
														setshowSelectMenu={setshowSelectPayment}
														onBlur={onBlur}
														onChange={() => clearErrors('payment_method')}
														onClick={(e) => {
															setselectedPayment(e.target.value), setselectedPaymentOption(e.target.title)
														}}
													/>
												)}
											/>
										</div>
									</div>

									{/* logo & header image */}
									<div className={styles.wrapper}>
										<div className={`${styles.imgs_upload_wrapper} ${styles.fields_wrapper}`}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='logo'>
													Logo <span>*</span>
												</label>
												{errors?.logo?.type === 'required' && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
												{errors?.logo?.message && (
													<div className={styles.error_msg} role='alert'>
														{errors.logo?.message}
													</div>
												)}
											</div>

											<div className={`${styles.input} ${errors.logo ? 'input-error' : undefined}`} tabIndex={0}>
												<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
													<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
												</svg>

												<span className='gray-color'>{logoImgUploadCaption}</span>

												<input
													{...register('logo', {
														required: true,
														validate: (val) => imgValidate(val, 1),
														onChange: (e) => setlogoImgUploadCaption(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an image')
													})}
													tabIndex={-1}
													className={styles.input}
													accept='image/png, image/jpeg, image/jpg, image/webp'
													type='file'
													placeholder='png, jpg or webp etc files only with the dimensions of 250 × 250'
												/>
												<div className={`delete_icons ${styles.delete_btn}`} onClick={() => (setlogoImgUploadCaption('Select an image'), setValue('logo', ''), setError('logo', { type: 'required', message: '' }))}>
													{logoImgUploadCaption !== 'Select an image' && (
														<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
															/>
														</svg>
													)}
												</div>
											</div>
										</div>

										<div className={`${styles.imgs_upload_wrapper} ${styles.fields_wrapper}`}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='header_image'>Header Image (optional)</label>
												{/* {errors?.header_image?.type === 'required' && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)} */}

												{errors?.header_image?.message && (
													<div className={styles.error_msg} role='alert'>
														{errors.header_image?.message}
													</div>
												)}
											</div>

											<div className={`${styles.input} `} tabIndex={0}>
												<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
													<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
												</svg>

												<span className='gray-color'>{headerImgUploadCaption}</span>
												<input
													{...register('header_image', {
														required: false,
														validate: (val) => imgValidate(val, 5),
														onChange: (e) => setheaderImgUploadCaption(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an image')
													})}
													tabIndex={-1}
													className={styles.input}
													accept='image/png, image/jpeg, image/jpg, image/webp'
													type='file'
													placeholder='png, jpg or webp etc files only with the dimensions of 1440 × 360'
												/>
												<div className={`delete_icons ${styles.delete_btn}`} onClick={() => (setheaderImgUploadCaption('Select an image'), setValue('header_image', ''), setError('header_image', { type: 'required', message: '' }))}>
													{headerImgUploadCaption !== 'Select an image' && (
														<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
															/>
														</svg>
													)}
												</div>
											</div>
										</div>
									</div>

									{/* products file */}
									<div className={`${styles.imgs_upload_wrapper} ${styles.fields_wrapper}`}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='file'>Products File - only .doc, .docx, .xls, .xlsx, .csv (optional)</label>
											{errors.file && (
												<div className={styles.error_msg} role='alert'>
													{errors.file?.message}
												</div>
											)}
										</div>

										<div className={`${styles.input} ${errors.file ? 'input-error' : undefined}`}>
											<svg className='w-8 h-8 lite-blue-color' fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
												<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
											</svg>

											<span className='gray-color'>{fileUploadCaption}</span>

											<input
												{...register('file', {
													required: false,
													validate: (file) => validateFile(file),
													onChange: (e) => setfileUploadCaption(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '..' + e.target.files[0].name?.substring(e.target.files[0].name.lastIndexOf('.')) : e.target.files[0].name) : 'Select file')
												})}
												className={styles.input}
												accept='.doc, .docx, .xls, .xlsx, .csv'
												type='file'
												placeholder='word, excel and csv etc'
											/>
											<div className={`delete_icons ${styles.delete_btn}`} onClick={() => (setfileUploadCaption('Select file'), setValue('file', ''), clearErrors('file'))}>
												{fileUploadCaption !== 'Select file' && (
													<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
														/>
													</svg>
												)}
											</div>
										</div>
									</div>

									{/* hear about and speak */}
									<div className={styles.wrapper} onBlur={() => setshowSelectHeared(false)}>
										<div className={styles.fields_wrapper}>
											<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
												<label htmlFor='heared_from'>
													How did you hear about us? <span>*</span>
												</label>
												{errors.heared_from && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
											</div>

											<Controller
												control={control}
												name='heared_from'
												rules={{
													validate: () => selectedHeared !== null && selectedHeared !== ''
												}}
												render={({ field: { onBlur } }) => (
													<CustomSelectInput
														className='seller-form-checkbox'
														dataLoading={false}
														countriesLoading={false}
														input_errors={errors.heared_from}
														isRequired
														visibleLabelId='heared_from_label'
														data={hearAbout}
														defaultOption={selectedHearedOption}
														name='heared_from'
														placeholder='Search heared from'
														showSelectMenu={showSelectHeared}
														setshowSelectMenu={setshowSelectHeared}
														onBlur={onBlur}
														onChange={() => clearErrors('heared_from')}
														onClick={(e) => {
															setselectedHeared(e.target.value), setselectedHearedOption(e.target.title)
														}}
													/>
												)}
											/>
										</div>
										<div className={styles.fields_wrapper} onBlur={() => setshowSelectSpeakTo(false)}>
											<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
												<label htmlFor='speak_to'>
													Did you speak to one of our representatives? <span>*</span>
												</label>

												{errors.speak_to && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
											</div>

											<Controller
												control={control}
												name='speak_to'
												rules={{
													validate: () => selectedSpeakTo !== null && selectedSpeakTo !== ''
												}}
												render={({ field: { onBlur } }) => (
													<CustomSelectInput
														className='seller-form-checkbox'
														dataLoading={false}
														countriesLoading={false}
														input_errors={errors.speak_to}
														isRequired
														visibleLabelId='speak_to_label'
														data={speakTo}
														defaultOption={selectedSpeakToOption}
														name='speak_to'
														placeholder='Search speak to'
														showSelectMenu={showSelectSpeakTo}
														setshowSelectMenu={setshowSelectSpeakTo}
														onBlur={onBlur}
														onChange={() => clearErrors('speak_to')}
														onClick={(e) => {
															setselectedSpeakTo(e.target.value), setselectedSpeakToOption(e.target.title)
														}}
													/>
												)}
											/>
										</div>

										{/* heared from other */}
										{selectedSpeakToOption === 'Other' && (
											<>
												<div />
												<div className={`${styles.fields_wrapper} ${styles.speak_other}`}>
													<div className={styles.inner_wrapper}>
														<label htmlFor='speak_to_other' />
														{errors.speak_to_other?.type === 'required' && (
															<div className={styles.error_msg} role='alert'>
																required
															</div>
														)}
														{errors.speak_to_other?.message && (
															<div className={styles.error_msg} role='alert'>
																{errors.speak_to_other?.message}
															</div>
														)}
													</div>

													<input
														{...register('speak_to_other', {
															required: true,
															pattern: {
																value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
																message: 'Enter valid name'
															},
															validate: {
																checkVal: (val) => val.trim('').length !== 0 || 'required'
															}
														})}
														aria-invalid={errors.speak_to_other ? 'true' : 'false'}
														className={`${styles.input} ${errors.speak_to_other ? 'input-error' : undefined}`}
														type='text'
														placeholder='Enter representative name'
													/>
												</div>
											</>
										)}
									</div>

									{/* message */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='messages'>
												Your Message <span>*</span>
											</label>
											{errors.messages?.type === 'required' && (
												<div className={`${styles.error_msg} ${styles.msg_error_msg}`} role='alert'>
													required
												</div>
											)}
											{errors.messages?.message && (
												<div className={styles.error_msg} role='alert'>
													{errors.messages?.message}
												</div>
											)}
										</div>

										<textarea
											{...register('messages', {
												required: true,
												minLength: { value: 2, message: 'Min 2 characters' },
												pattern: {
													value: /.*\S.*/,
													message: 'Enter something'
												}
											})}
											aria-invalid={errors.messages ? 'true' : 'false'}
											className={`${styles.textarea} ${errors.messages ? 'input-error' : undefined} transition`}
											placeholder='Message'
											minLength={2}
										/>
									</div>

									{/* <div className={styles.fields_wrapper}>
										<div className={`${styles.captcha} primary-bg`}>
											<canvas ref={canvasRef} className={styles.canvas} width='400' height='80'></canvas>
										</div>
										<div className={styles.inner_wrapper}>
											<label className='gray-color' htmlFor='recaptcha' />
										</div>
										<div className={styles.inner_wrapper}>
											<div className={styles.captcha_wrapper}>
												<div className={styles.captcha_input}>
													<input
														autoComplete='recaptcha'
														{...register('recaptcha', {
															required: true,
															validate: {
																checkVal: (val) => val == captchaValue || "captcha doesn't match"
															}
														})}
														maxLength={6}
														aria-invalid={errors.recaptcha ? 'true' : 'false'}
														className={`${styles.input} ${errors.recaptcha ? 'input-error' : undefined}`}
														style={{ marginTop: 0 }}
														placeholder='Enter Captcha'
													/>
													{errors.recaptcha?.type === 'required' && (
														<div className={styles.error_msg} role='alert'>
															required
														</div>
													)}
													{errors.recaptcha?.message && (
														<div className={styles.error_msg} role='alert'>
															{errors.recaptcha?.message}
														</div>
													)}
												</div>
												<button
													type='button'
													className={`${styles.captcha_btn} btn lite-pink-bg`}
													onClick={() => {
														generateCaptchaHandler(canvasRef)
														setValue('recaptcha', '')
													}}
												>
													Reload Captcha
												</button>
											</div>
										</div>
									</div> */}

									<div className={`${styles.wrapper}  `}>
										<div className={`${styles.fields_wrapper} recaptcha`}>
											<div className={styles.inner_wrapper} style={{ marginBottom: '.5rem' }}>
												<label className='gray-color' htmlFor='recaptcha'>
													Verify Captcha <span className='red-color'>*</span>
												</label>
												{errors.recaptcha && (
													<div className={styles.error_msg} role='alert'>
														{errors.recaptcha.message}
													</div>
												)}
											</div>
											{/* <div className={styles.captcha_inner_wrapper}>
												<Controller control={control} name='recaptcha' rules={{ required: 'required' }} render={({ field }) => <ReCAPTCHA className={styles.g_recaptcha} sitekey='6LdhsBIrAAAAAA_PVuUZ1-MdVG4c9kvuv1qil_su' onChange={(token) => field.onChange(token)} ref={recaptchaRef} />} />
											</div> */}
										</div>
									</div>
								</>
							)}
							{!sellerForm && serviceProviderForm && (
								<>
									{/* first & last name */}
									<div className={styles.wrapper}>
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
													maxLength: {
														value: 30,
														message: 'Max 30 characters'
													},
													pattern: {
														value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
														message: 'Enter valid name'
													}
												})}
												aria-invalid={errors.first_name ? 'true' : 'false'}
												className={`${styles.input} ${errors.first_name ? 'input-error' : undefined}`}
												type='text'
												minLength={2}
												maxLength={30}
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
													maxLength: {
														value: 30,
														message: 'Max 30 characters'
													},
													pattern: {
														value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
														message: 'Enter valid name'
													}
												})}
												aria-invalid={errors.last_name ? 'true' : 'false'}
												className={`${styles.input} ${errors.last_name ? 'input-error' : undefined}`}
												type='text'
												minLength={2}
												maxLength={30}
												placeholder='Last Name'
											/>
										</div>
									</div>

									{/* email & tel */}
									<div className={styles.wrapper}>
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
												className={`${styles.input} ${errors.email ? 'input-error' : undefined}`}
												type='email'
												placeholder='Email'
											/>
										</div>
										<div className={styles.fields_wrapper}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='phone'>
													Phone Number <span>*</span>
												</label>
												{userPhoneError === '' && errors.phone?.type === 'validate' && (
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
												name='phone'
												rules={{
													validate: () => userPhone !== '' && userPhone !== null && userPhone?.length >= 10
												}}
												render={({ field: { onBlur } }) => (
													<PhoneInput
														enableSearch={true}
														style={{ marginTop: '1rem' }}
														className={`custom_number ${errors.phone || userPhoneError === 'Min 10 digits' ? 'error_number' : undefined}`}
														searchPlaceholder={'Search country'}
														searchNotFound={'No country found...'}
														placeholder='+1'
														country={'us'}
														onPaste={(e) => e.preventDefault()}
														aria-invalid={errors.phone ? 'true' : 'false'}
														value={userPhone}
														onBlur={onBlur}
														onChange={(phone) => {
															setuserPhone(phone)
															phoneFormatHanlder(phone)
															phone.length === 11 && clearErrors('phone')
														}}
													/>
												)}
											/>
										</div>
									</div>

									{/* website */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='sp_website'>
												Website URL<span>*</span>
											</label>
											{errors.sp_website?.type === 'required' && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
											{errors.sp_website?.message && (
												<div className={styles.error_msg} role='alert'>
													{errors.sp_website?.message}
												</div>
											)}
										</div>

										<input
											{...register('sp_website', {
												required: true,
												pattern: {
													value: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
													message: 'Enter valid url'
												}
											})}
											className={`${styles.input} ${errors.sp_website ? 'input-error' : undefined}`}
											type='text'
											placeholder='Enter Website'
										/>
									</div>

									{/* address */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='address'>
												Address<span>*</span>
												{getValues('address') !== '' && (
													<div className={styles.tooltip_wrapper} onMouseEnter={setshowTooltip} onMouseLeave={() => setshowTooltip(!showTooltip)}>
														<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className='w-6 h-6'>
															<path strokeLinecap='round' strokeLinejoin='round' d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z' />
														</svg>
														<div className={`${styles.tooltip} black-color gray-border shadow transition ${showTooltip ? styles.show_tooltip : undefined}`}>{getValues('address')}</div>
													</div>
												)}
											</label>

											{errors.address && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
										</div>

										<Controller
											control={control}
											name='address'
											rules={{
												validate: () =>googlePlaces?.length >0
											}}
											render={({ field: { onBlur } }) =>
												!isLoaded ? (
													<DarkLoader className={styles.input} />
												) : loadError ? (
													<div>{`Google Map script can't be loaded, please reload the page`}</div>
												) : (
													<Autocomplete fields={['']} onLoad={onLoad} onPlaceChanged={onPlaceChanged} onKeypress={onKeypress}>
														<input
															{...register('address', {
																required: true,
																onChange: (e) => (setValue('address', e.target.value), e.target.value.length === 0 && (setGooglePlaces(''), setValue('country', ''), setValue('state', ''), setValue('city', ''), setValue('zip_code', '')))
															})}
															aria-invalid={errors.address ? 'true' : 'false'}
															className={`${styles.input} ${errors.address ? 'input-error' : undefined}`}
															type='text'
															placeholder='Address'
														/>
													</Autocomplete>
												)
											}
										/>
									</div>
									{/* country & state */}
									{showFields && (!isCountryAutoDetected || !isStateDetected) && (
									<div className={styles.wrapper}>
											{!isCountryAutoDetected && (
										<div className={styles.fields_wrapper} tabIndex={-1}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='country'>
													Country:
													<span className='red-color'> *</span>
												</label>
												{errors.country && <div className={styles.error_msg}>required</div>}
											</div>
											<input
												readOnly={getValues('address') === '' || (getValues('address') !== '' && userFormData.country) ? true : false}
												{...register('country', {
													required: true
												})}
												tabIndex={-1}
												aria-invalid={errors.country ? 'true' : 'false'}
												className={`${styles.input} ${errors.country ? 'input-error' : undefined}`}
												type='text'
												placeholder=''
											/>
										</div>
											)}
									   {!isStateDetected && (
										<div className={styles.fields_wrapper} tabIndex={-1}>
											<div className={`${styles.inner_wrapper}`}>
												<label htmlFor='state'>
													State:
													<span className='red-color'> *</span>
												</label>
												{errors.state && <div className={styles.error_msg}>required</div>}
											</div>

											<input
													readOnly={getValues('address') === '' || (getValues('address') !== '' && userFormData.state) ? true : false}
												{...register('state', {
													required: true
												})}
												tabIndex={-1}
												aria-invalid={errors.state ? 'true' : 'false'}
												className={`${styles.input} ${errors.state ? 'input-error' : undefined}`}
												type='text'
												placeholder=''
											/>
										</div>
										)}
									</div>
									)}

									{/* city & zip code */}
									{showFields && (!isCityDetected || !isZipCodeDetected) && (
									<div className={styles.wrapper}>
											{!isCityDetected && (<div className={styles.fields_wrapper} tabIndex={-1}>
											<div className={styles.inner_wrapper}>
												<label className='black-color' htmlFor='city'>
													City <span className='red-color'>*</span>
												</label>
												{errors.city?.type === 'required' && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
											</div>

											<input
												readOnly={getValues('address') === '' || (getValues('address') !== '' && userFormData.city) ? true : false}
												{...register('city', {
													required: true
												})}
												tabIndex={-1}
												aria-invalid={errors.city ? 'true' : 'false'}
												className={`${styles.input} ${errors.city ? 'input-error' : undefined}`}
												type='text'
												placeholder=''
											/>
										</div>
										)}
									{!isZipCodeDetected && (
										<div className={styles.fields_wrapper} tabIndex={-1}>
											<div className={styles.inner_wrapper}>
												<label className='black-color' htmlFor='zip_code'>
													Zip / Postal Code<span className='red-color'>*</span>
												</label>
											</div>

											<input
												readOnly={getValues('address') === '' || (getValues('address') !== '' && userFormData.zip_code) ? true : false}
												{...register('zip_code', {
													required: true
												})}
												tabIndex={-1}
												aria-invalid={errors.zip_code ? 'true' : 'false'}
												className={`${styles.input} ${errors.zip_code ? 'input-error' : undefined}`}
												type='text'
												placeholder=''
											/>
										</div>
										)}
									</div>
									)}

									{/* store & contact person name */}
									<div className={styles.wrapper}>
										<div className={styles.fields_wrapper}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='store_name'>
													Store Name <span>*</span>
												</label>
												{errors.store_name?.type === 'required' && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
												{errors.store_name?.message && (
													<div className={styles.error_msg} role='alert'>
														{errors.store_name?.message}
													</div>
												)}
											</div>

											<input
												{...register('store_name', {
													required: true,
													// minLength: { value: 2, message: 'Min 2 characters' },
													// maxLength: { value: 30, message: 'Max 30 characters' },
													validate: {
														checkVal: (val) => val.trim('').length !== 0 || 'Enter valid name'
													}
												})}
												aria-invalid={errors.store_name ? 'true' : 'false'}
												className={`${styles.input} ${errors.store_name ? 'input-error' : undefined}`}
												type='text'
												// minLength={2}
												// maxLength={30}
												placeholder='Store Name'
											/>
										</div>
										<div className={styles.fields_wrapper}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='contact_name'>
													Contact Person Name <span>*</span>
												</label>
												{errors.contact_name?.type === 'required' && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
												{errors.contact_name?.message && (
													<div className={styles.error_msg} role='alert'>
														{errors.contact_name?.message}
													</div>
												)}
											</div>

											<input
												{...register('contact_name', {
													required: true,
													minLength: { value: 2, message: 'Min 2 characters' },
													maxLength: {
														value: 30,
														message: 'Max 30 characters'
													},
													pattern: {
														value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
														message: 'Enter valid name'
													}
												})}
												aria-invalid={errors.contact_name ? 'true' : 'false'}
												className={`${styles.input} ${errors.contact_name ? 'input-error' : undefined}`}
												type='text'
												minLength={2}
												maxLength={30}
												placeholder='Contact Person Name'
											/>
										</div>
									</div>

									{/* logo & header image */}
									<div className={styles.wrapper}>
										<div className={`${styles.imgs_upload_wrapper} ${styles.fields_wrapper}`}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='logo'>
													Logo <span>*</span>
												</label>
												{errors?.logo?.type === 'required' && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
												{errors?.logo?.message && (
													<div className={styles.error_msg} role='alert'>
														{errors.logo?.message}
													</div>
												)}
											</div>

											<div className={`${styles.input} ${errors.logo ? 'input-error' : undefined}`} tabIndex={0}>
												<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
													<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
												</svg>

												<span className='gray-color'>{logoImgUploadCaption}</span>

												<input
													{...register('logo', {
														required: true,
														validate: (val) => imgValidate(val, 1),
														onChange: (e) => setlogoImgUploadCaption(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an image')
													})}
													tabIndex={-1}
													className={styles.input}
													accept='image/png, image/jpeg, image/jpg, image/webp'
													type='file'
													placeholder='png, jpg or webp etc files only with the dimensions of 250 × 250'
												/>
												<div className={`delete_icons ${styles.delete_btn}`} onClick={() => (setlogoImgUploadCaption('Select an image'), setValue('logo', ''), setError('logo', { type: 'required', message: '' }))}>
													{logoImgUploadCaption !== 'Select an image' && (
														<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
															/>
														</svg>
													)}
												</div>
											</div>
										</div>

										<div className={`${styles.imgs_upload_wrapper} ${styles.fields_wrapper}`}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='header_image'>Header Image (optional)</label>
												{/* {errors?.header_image?.type === 'required' && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)} */}

												{errors?.header_image?.message && (
													<div className={styles.error_msg} role='alert'>
														{errors.header_image?.message}
													</div>
												)}
											</div>

											<div className={`${styles.input} `} tabIndex={0}>
												<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
													<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
												</svg>

												<span className='gray-color'>{headerImgUploadCaption}</span>

												<input
													{...register('header_image', {
														required: false,
														validate: (val) => imgValidate(val, 5),
														onChange: (e) => setheaderImgUploadCaption(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an image')
													})}
													tabIndex={-1}
													className={styles.input}
													accept='image/png, image/jpeg, image/jpg, image/webp'
													type='file'
													placeholder='png, jpg or webp etc files only with the dimensions of 1440 × 360'
												/>
												<div className={`delete_icons ${styles.delete_btn}`} onClick={() => (setheaderImgUploadCaption('Select an image'), setValue('header_image', ''), setError('header_image', { type: 'required', message: '' }))}>
													{headerImgUploadCaption !== 'Select an image' && (
														<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
															/>
														</svg>
													)}
												</div>
											</div>
										</div>
									</div>

									{/* products file */}
									<div className={`${styles.imgs_upload_wrapper} ${styles.fields_wrapper}`}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='file'>Services File - only .doc, .docx, .xls, .xlsx, .csv (optional)</label>
											{errors.file && (
												<div className={styles.error_msg} role='alert'>
													{errors.file?.message}
												</div>
											)}
										</div>

										<div className={`${styles.input} ${errors.file ? 'input-error' : undefined}`}>
											<svg className='w-8 h-8 lite-blue-color' fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
												<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
											</svg>

											<span className='gray-color'>{fileUploadCaption}</span>

											<input
												{...register('file', {
													required: false,
													validate: (file) => validateFile(file),
													onChange: (e) => setfileUploadCaption(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '..' + e.target.files[0].name?.substring(e.target.files[0].name.lastIndexOf('.')) : e.target.files[0].name) : 'Select file')
												})}
												className={styles.input}
												accept='.doc, .docx, .xls, .xlsx, .csv'
												type='file'
												placeholder='word, excel and csv etc'
											/>
											<div className={`delete_icons ${styles.delete_btn}`} onClick={() => (setfileUploadCaption('Select file'), setValue('file', ''), clearErrors('file'))}>
												{fileUploadCaption !== 'Select file' && (
													<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
														/>
													</svg>
												)}
											</div>
										</div>
									</div>

									{/* category */}
									<div className={styles.wrapper}>
										<div className={styles.fields_wrapper} onBlur={() => setshowSelectCategory(false)}>
											<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
												<label htmlFor='category'>
													Category: <span>*</span>
												</label>

												{errors.category && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
											</div>

											<Controller
												control={control}
												name='category'
												rules={{
													validate: () => selectedCategory !== null && selectedCategory !== ''
												}}
												render={({ field: { onBlur } }) => (
													<CustomSelectInput
														showSearch={true}
														dataLoading={false}
														countriesLoading={false}
														input_errors={errors.category}
														isRequired
														visibleLabelId='category_label'
														data={categories}
														defaultOption={selectedCategoryOption}
														name='category'
														placeholder='Search category'
														showSelectMenu={showSelectCategory}
														setshowSelectMenu={setshowSelectCategory}
														onBlur={onBlur}
														onChange={() => clearErrors('category')}
														onClick={(e) => {
															setselectedCategory(e.target.value), setselectedCategoryOption(e.target.title)
														}}
													/>
												)}
											/>
										</div>

										<div className={styles.fields_wrapper}>
											<div className={styles.inner_wrapper}>
												<label htmlFor='preferred'>
													Would you like to get preferred by DVM Central:
													<span className='red-color'> *</span>
												</label>
												{errors.preferred?.type === 'required' && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
											</div>

											<div className={`${styles.inner_wrapper} ${styles.check_wrapper}`}>
												<CustomCheckbox
													className={styles.preferred_box}
													type='radio'
													labeltitle='Yes'
													name='Preferred'
													value={dvmPreferred}
													defaultChecked
													onChange={(e) => {
														e.target.checked ? setdvmPreferred('Y') : setdvmPreferred('N')
													}}
												/>
												<CustomCheckbox
													className={styles.preferred_box}
													type='radio'
													labeltitle='No'
													name='Preferred'
													value={dvmPreferred}
													onChange={(e) => {
														e.target.checked ? setdvmPreferred('N') : setdvmPreferred('Y')
													}}
												/>
											</div>
										</div>
									</div>

									{/* deals detail */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='deal_details'>Would you like to give deal on DVM Central</label>
										</div>

										<input
											{...register('deal_details', {
												minLength: 2,
												maxLength: 330
											})}
											className={styles.input}
											type='text'
											placeholder='Enter deal details'
										/>
									</div>

									{/* short intro */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='short_intro'>
												Short Intro (for listing page) <span>*</span>
											</label>
											{errors.short_intro?.type === 'required' && (
												<div className={`${styles.error_msg} ${styles.msg_error_msg}`} role='alert'>
													required
												</div>
											)}
											{errors.short_intro?.message && (
												<div className={`${styles.error_msg} ${styles.msg_error_msg}`} role='alert'>
													{errors.short_intro?.message}
												</div>
											)}
										</div>

										<textarea
											{...register('short_intro', {
												required: true,
												minLength: { value: 2, message: 'Min 2 characters' },
												pattern: {
													value: /.*\S.*/,
													message: 'Enter something'
												}
											})}
											aria-invalid={errors.short_intro ? 'true' : 'false'}
											className={`${styles.textarea} ${errors.short_intro ? 'input-error' : undefined} transition`}
											placeholder='Short intro'
											minLength={2}
										/>
									</div>

									{/* hear about and speak */}
									<div className={styles.wrapper}>
										<div className={styles.fields_wrapper} onBlur={() => setshowSelectHeared(false)}>
											<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
												<label htmlFor='heared_from'>
													How did you hear about us? <span>*</span>
												</label>
												{errors.heared_from && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
											</div>

											<Controller
												control={control}
												name='heared_from'
												rules={{
													validate: () => selectedHeared !== null && selectedHeared !== ''
												}}
												render={({ field: { onBlur } }) => (
													<CustomSelectInput
														className='seller-form-checkbox'
														dataLoading={false}
														countriesLoading={false}
														input_errors={errors.heared_from}
														isRequired
														visibleLabelId='heared_from_label'
														data={hearAbout}
														defaultOption={selectedHearedOption}
														name='heared_from'
														placeholder='Search heared from'
														showSelectMenu={showSelectHeared}
														setshowSelectMenu={setshowSelectHeared}
														onBlur={onBlur}
														onChange={() => clearErrors('heared_from')}
														onClick={(e) => {
															setselectedHeared(e.target.value), setselectedHearedOption(e.target.title)
														}}
													/>
												)}
											/>
										</div>
										<div className={styles.fields_wrapper} onBlur={() => setshowSelectSpeakTo(false)}>
											<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
												<label htmlFor='speak_to'>
													Did you speak to one of our representatives? <span>*</span>
												</label>

												{errors.speak_to && (
													<div className={styles.error_msg} role='alert'>
														required
													</div>
												)}
											</div>

											<Controller
												control={control}
												name='speak_to'
												rules={{
													validate: () => selectedSpeakTo !== null && selectedSpeakTo !== ''
												}}
												render={({ field: { onBlur } }) => (
													<CustomSelectInput
														className='seller-form-checkbox'
														dataLoading={false}
														countriesLoading={false}
														input_errors={errors.speak_to}
														isRequired
														visibleLabelId='speak_to_label'
														data={speakTo}
														defaultOption={selectedSpeakToOption}
														name='speak_to'
														placeholder='Search speak to'
														showSelectMenu={showSelectSpeakTo}
														setshowSelectMenu={setshowSelectSpeakTo}
														onBlur={onBlur}
														onChange={() => clearErrors('speak_to')}
														onClick={(e) => {
															setselectedSpeakTo(e.target.value), setselectedSpeakToOption(e.target.title)
														}}
													/>
												)}
											/>
										</div>

										{/* heared from other */}
										{selectedSpeakToOption === 'Other' && (
											<>
												<div />
												<div className={`${styles.fields_wrapper} ${styles.speak_other}`}>
													<div className={styles.inner_wrapper}>
														<label />
														{errors.speak_to_other?.type === 'required' && (
															<div className={styles.error_msg} role='alert'>
																required
															</div>
														)}
														{errors.speak_to_other?.message && (
															<div className={styles.error_msg} role='alert'>
																{errors.speak_to_other?.message}
															</div>
														)}
													</div>

													<input
														{...register('speak_to_other', {
															required: true,
															pattern: {
																value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
																message: 'Enter valid name'
															},
															validate: {
																checkVal: (val) => val.trim('').length !== 0 || 'required'
															}
														})}
														aria-invalid={errors.speak_to_other ? 'true' : 'false'}
														className={`${styles.input} ${errors.speak_to_other ? 'input-error' : undefined}`}
														type='text'
														placeholder='Enter representative name'
													/>
												</div>
											</>
										)}
									</div>

									{/* message */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='messages'>
												Your Message <span>*</span>
											</label>
											{errors.messages?.type === 'required' && (
												<div className={`${styles.error_msg} ${styles.msg_error_msg}`} role='alert'>
													required
												</div>
											)}
											{errors.messages?.message && (
												<div className={styles.error_msg} role='alert'>
													{errors.messages?.message}
												</div>
											)}
										</div>

										<textarea
											{...register('messages', {
												required: true,
												minLength: { value: 2, message: 'Min 2 characters' },
												pattern: {
													value: /.*\S.*/,
													message: 'Enter something'
												}
											})}
											aria-invalid={errors.messages ? 'true' : 'false'}
											className={`${styles.textarea} ${errors.messages ? 'input-error' : undefined} transition`}
											placeholder='Message'
											minLength={2}
										/>
									</div>

									{/* <div className={styles.fields_wrapper}>
										<div className={`${styles.captcha} primary-bg`}>
											<canvas ref={canvasRef} className={styles.canvas} width='400' height='80'></canvas>
										</div>
										<div className={styles.inner_wrapper}>
											<label className='gray-color' htmlFor='recaptcha' />
										</div>
										<div className={styles.inner_wrapper}>
											<div className={styles.captcha_wrapper}>
												<div className={styles.captcha_input}>
													<input
														autoComplete='recaptcha'
														{...register('recaptcha', {
															required: true,
															validate: {
																checkVal: (val) => val == captchaValue || "captcha doesn't match"
															}
														})}
														maxLength={6}
														aria-invalid={errors.recaptcha ? 'true' : 'false'}
														className={`${styles.input} ${errors.recaptcha ? 'input-error' : undefined}`}
														style={{ marginTop: 0 }}
														placeholder='Enter Captcha'
													/>
													{errors.recaptcha?.type === 'required' && (
														<div className={styles.error_msg} role='alert'>
															required
														</div>
													)}
													{errors.recaptcha?.message && (
														<div className={styles.error_msg} role='alert'>
															{errors.recaptcha?.message}
														</div>
													)}
												</div>
												<button
													type='button'
													className={`${styles.captcha_btn} btn lite-pink-bg`}
													onClick={() => {
														generateCaptchaHandler(canvasRef)
														setValue('recaptcha', '')
													}}
												>
													Reload Captcha
												</button>
											</div>
										</div>
									</div> */}
									<div className={`${styles.wrapper}  `}>
										<div className={`${styles.fields_wrapper} recaptcha`}>
											<div className={styles.inner_wrapper} style={{ marginBottom: '.5rem' }}>
												<label className='gray-color' htmlFor='recaptcha'>
													Verify Captcha <span className='red-color'>*</span>
												</label>
												{errors.recaptcha && (
													<div className={styles.error_msg} role='alert'>
														{errors.recaptcha.message}
													</div>
												)}
											</div>
										{/* 	<div className={styles.captcha_inner_wrapper}>
												<Controller control={control} name='recaptcha' rules={{ required: 'required' }} render={({ field }) => <ReCAPTCHA className={styles.g_recaptcha} sitekey='6LdhsBIrAAAAAA_PVuUZ1-MdVG4c9kvuv1qil_su' onChange={(token) => field.onChange(token)} ref={recaptchaRef} />} />
											</div> */}
										</div>
									</div>
								</>
							)}

							<div className={styles.fields_wrapper}>
								<div className={`${styles.inner_wrapper} acceptance-input`}>
									<CustomCheckbox
										checkBox_errors={termsRequired}
										className={styles.terms_accept}
										type='checkbox'
										onChange={(e) => (e.target.checked ? (setformAcceptance(true), setmodal(true), lockScroll(), settermsRequired(false)) : setformAcceptance(false))}
										labeltitle='Accept our terms and conditions'
										name='terms-acceptance'
									/>
									{termsRequired && <div className={styles.error_msg}>required</div>}
								</div>
								<Modal modal={modal} setmodal={setmodal}>
									<TermsModal
										initial={initial}
										setinitial={setinitial}
										termsAcceptance={termsAcceptance}
										settermsAcceptance={settermsAcceptance}
										modalAcceptanceError={modalAcceptanceError}
										setmodalAcceptanceError={setmodalAcceptanceError}
										showInitialError={showInitialError}
										setshowInitialError={setshowInitialError}
										setmodal={setmodal}
										data={modalElRequired}
										termsChecked={termsChecked}
										settermsChecked={settermsChecked}
										initialsLengthError={initialsLengthError}
										setinitialsLengthError={setinitialsLengthError}
										initialValidationError={initialValidationError}
										setinitialValidationError={setinitialValidationError}
										initialValidation={initialValidation}
										onClick={() => acceptHandler()}
									/>
								</Modal>
							</div>
							{fillAllFields && <div className='red-color'>All Fields are required</div>}
							{formsubmit && <Message resMsg={resMsg} formSuccess={formSuccess} />}
						</form>

						<button disabled={btndisabled} type='button' className={`${styles.btn} primary-btn`} onClick={() => formSubmitHandler()}>
							Send Information
							{loading && <LiteLoader className={styles.submit_loader} />}
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default ContactForm

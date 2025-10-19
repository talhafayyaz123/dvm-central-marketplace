import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { baseApiUrl } from '../../../../../utils/config'
import { LiteLoader } from '../../../../Loader/Loader'
import CustomCheckbox from '../../../../UI/CustomCheckbox/CustomCheckbox'
import styles from './RegisterForm.module.css'
import Message from '../../../../UI/Message/Message'
// import NotAuthorized from '../../../../UI/NotAuthorized/NotAuthorized'
// import { siteUrl } from '../../../../../utils/config'
import PlayerBtn from '../../../LandingPage/IntroVetandTech/PlayerBtn/PlayerBtn'
import rightwaveimg from '/public/landing-page/shape/right-wave.webp'
import Image from 'next/image'
import { unlockScroll } from '../../../../../utils/scrollLock'
import { useRouter } from 'next/router'
import { hearedOptions, nonvVetRoleOptions, vetRoleOptions } from './hearOptions'
import CustomSelectInput from '../../../../UI/CustomSelectInput/CustomSelectInput'
import PhoneInput from 'react-phone-input-2'

const RegisterForm = ({ modalData, setModal, latestVirtualExpoId, userProfileDataExists, checkingUserData, userId, setshowVideoModal, className, setvideoSrc, checkUserVirtualExpoData, setcheckingUserData, loginUser }) => {
	const { customer, webinar_related_info } = userProfileDataExists
	const router = useRouter()
	// console.log('userProfileDataExists', userProfileDataExists)

	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [formsubmit, setformsubmit] = useState(false)
	// const [countryLoading, setcountryLoading] = useState(true)
	// const [countriesList, setcountriesList] = useState([])
	// const [selectedCountry, setselectedCountry] = useState(customer?.country_id !== null ? customer?.country_id : 233)
	// const [countryValueChange, setcountryValueChange] = useState(false)
	// const [stateLoading, setstateLoading] = useState(false)
	// const [stateList, setstateList] = useState([])
	// const [selectedState, setselectedState] = useState(customer?.state !== null ? customer?.state : 'select')

	const [licenseStateList, setlicenseStateList] = useState([])
	const [licenseStateLoading, setlicenseStateLoading] = useState(false)
	const [resMsg, setresMsg] = useState('')
	const [formSuccess, setformSuccess] = useState(false)
	const [registeredVirtualExpoList, setregisteredVirtualExpoList] = useState([])
	const [showUpcomingVirtualExpoList, setshowUpcomingVirtualExpoList] = useState(false)

	const [outsideUSState, setoutsideUSState] = useState(webinar_related_info?.veterinarian === 1 && webinar_related_info?.outside_us_state === 1 ? true : false)

	const [userIsVetrinarian, setuserIsVetrinarian] = useState(webinar_related_info?.veterinarian !== null ? (webinar_related_info?.veterinarian === 1 ? true : false) : true)
	const [userIsNotVetrinarian, setuserIsNotVetrinarian] = useState(webinar_related_info?.veterinarian === 0 ? true : false)

	const [nonVetraniranIsLicensed, setnonVetraniranIsLicensed] = useState(webinar_related_info?.licence !== 1 && (webinar_related_info?.license === null ? false : webinar_related_info?.license === 1 ? true : false))
	const [nonVetraniranIsNotLicensed, setnonVetraniranIsNotLicensed] = useState(webinar_related_info?.licence !== 1 && (webinar_related_info?.license === null ? false : webinar_related_info?.license !== 1 ? true : false))
	const [nonVetraniranIsLicensedoutsideUSState, setnonVetraniranIsLicensedoutsideUSState] = useState(webinar_related_info?.veterinarian !== 1 && webinar_related_info?.outside_us_state === 1 ? true : false)

	const [licenseIssueState, setlicenseIssueState] = useState('')
	const [licenseIssueStateOption, setlicenseIssueStateOption] = useState('Select state')
	const [licenseIssueStateError, setlicenseIssueStateError] = useState(false)
	const [nonVetLicenseIssueState, setnonVetLicenseIssueState] = useState('')
	const [nonVetLicenseIssueStateOption, setnonVetLicenseIssueStateOption] = useState('Select state')
	const [nonVetLicenseIssueStateError, setnonVetLicenseIssueStateError] = useState(false)

	const [vetorNonVetError, setvetorNonVetError] = useState(false)
	const [nonVetLicensedOrNotError, setnonVetLicensedOrNotError] = useState(false)

	const [hearedFromOther, sethearedFromOther] = useState(false)

	const [userInitialEmail, setuserInitialEmail] = useState('')

	const isVetarinarian = useRef(false)
	const isNotVetarinarian = useRef(false)

	const nonVetisLicensed = useRef(false)
	const nonVetNotisLicensed = useRef(false)

	const [fixAllFiledsErrors, setfixAllFiledsErrors] = useState(false)

	const [webianrsId, setwebianrsId] = useState([modalData])

	const [showVetSelectState, setshowVetSelectState] = useState(false)
	const [showNonVetSelectState, setshowNonVetSelectState] = useState(false)

	const [showSelectVetRole, setshowSelectVetRole] = useState(false)
	const [selectedVetRoleOption, setselectedVetRoleOption] = useState('Select an option')
	const [selectedVetRole, setselectedVetRole] = useState(null)

	const [showSelectNonVetRole, setshowSelectNonVetRole] = useState(false)
	const [selectedNonVetRoleOption, setselectedNonVetRoleOption] = useState('Select an option')
	const [selectedNonVetRole, setselectedNonVetRole] = useState(null)

	const [showSelectOption, setshowSelectOption] = useState(false)
	const [selectedHearedOption, setselectedHearedOption] = useState('Select an option')
	const [selectedHeared, setselectedHeared] = useState(null)

	const [userPhone, setuserPhone] = useState('')
	const [phoneError, setphoneError] = useState('')

	const emailRef = useRef(null)

	const initialEmailRef = useRef(null)

	const getuserSelectedlicenseIssueState = () => {
		const state = licenseStateList?.find((state) => state?.name == webinar_related_info?.license_issuing_state)
		return state?.name
	}

	let initialStateVal =
		webinar_related_info?.outside_us_state !== 1 && webinar_related_info?.license_issuing_state === null
			? 'select'
			: webinar_related_info?.outside_us_state === 1 && webinar_related_info?.license_issuing_state !== null
			? 'outside-us'
			: webinar_related_info?.outside_us_state !== 1 && webinar_related_info?.license_issuing_state !== null && getuserSelectedlicenseIssueState()

	const setInitialStateValues = () => {
		webinar_related_info?.veterinarian === 1 ? setlicenseIssueState(initialStateVal) : webinar_related_info?.veterinarian !== 1 && webinar_related_info?.license !== 0 && webinar_related_info?.license !== null && setnonVetLicenseIssueState(initialStateVal)
	}

	useEffect(() => {
		getuserSelectedlicenseIssueState()
		setInitialStateValues()
	}, [licenseStateList])

	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
		setFocus,
		setError,
		clearErrors,
		reset,
		control
	} = useForm({
		defaultValues: {
			first_name: customer?.first_name !== null ? customer?.first_name : '',
			last_name: customer?.last_name !== null ? customer?.last_name : '',
			email: customer?.email !== null ? customer?.email : '',
			tel: customer?.phone !== null ? customer?.phone : '',
			// address: customer?.address !== null ? customer?.address : '',
			// company: webinar_related_info?.company !== null ? webinar_related_info?.company : '',
			// city: customer?.city !== null ? customer?.city : '',
			// zip: customer?.zip_code !== null ? customer?.zip_code : '',
			licence_no: webinar_related_info?.veterinarian === 1 && webinar_related_info?.veterinary_licence_number !== null ? webinar_related_info?.veterinary_licence_number : '',
			non_vet_licence_no: webinar_related_info?.veterinarian !== 1 && webinar_related_info?.license === 1 && webinar_related_info?.veterinary_licence_number !== null ? webinar_related_info?.veterinary_licence_number : '',
			outside_us_state_name: webinar_related_info?.veterinarian === 1 && userIsVetrinarian && outsideUSState ? webinar_related_info?.license_issuing_state : '',
			non_vet_outside_us_state_name: webinar_related_info?.veterinarian !== 1 && userIsNotVetrinarian && nonVetraniranIsLicensedoutsideUSState ? webinar_related_info?.license_issuing_state : ''
		}
	})

	const fixErrors = () => {
		if (vetorNonVetError || nonVetLicensedOrNotError) {
			setfixAllFiledsErrors(true)
		} else {
			setfixAllFiledsErrors(false)
		}
	}

	useEffect(() => {
		fixErrors()
	}, [vetorNonVetError, nonVetLicensedOrNotError])

	const submitHanlder = async () => {
		setformsubmit(false)

		// if vet or not vet are unchecked
		if (!isVetarinarian?.current?.querySelector('input').checked && !isNotVetarinarian?.current?.querySelector('input').checked) {
			setvetorNonVetError(true)
		} else if (isVetarinarian?.current?.querySelector('input').checked || isNotVetarinarian?.current?.querySelector('input').checked) {
			setvetorNonVetError(false)
		}

		// if user is veterinarian only then
		if (isVetarinarian?.current?.querySelector('input').checked) {
			if (licenseIssueState !== 'select' && licenseIssueState !== undefined) {
				setlicenseIssueStateError(false)
			} else {
				setlicenseIssueStateError(true)
			}
		}

		// if user is not veterinarian only then
		if (isNotVetarinarian?.current?.querySelector('input').checked) {
			if (!nonVetisLicensed?.current?.querySelector('input').checked && !nonVetNotisLicensed?.current?.querySelector('input').checked) {
				setnonVetLicensedOrNotError(true)
			} else if (nonVetisLicensed?.current?.querySelector('input').checked || nonVetNotisLicensed?.current?.querySelector('input').checked) {
				setnonVetLicensedOrNotError(false)
			}
		}

		// if user is not veterinarian and licensed only then
		if (isNotVetarinarian?.current?.querySelector('input').checked && nonVetisLicensed?.current?.querySelector('input').checked) {
			if (nonVetLicenseIssueState !== 'select' && nonVetLicenseIssueState !== undefined) {
				setnonVetLicenseIssueStateError(false)
			} else {
				setnonVetLicenseIssueStateError(true)
			}
		}

		if (userPhone?.length < 11 && userPhone?.length > 1) {
			setphoneError('Min 10 digits')
		} else {
			setphoneError('')
		}

		fixErrors()

		handleSubmit(onSubmit)()
	}

	const onSubmit = async (data) => {
		setformsubmit(false)
		// const { address, city, comments, company, email, first_name, last_name, vet_role, non_vet_role, special_interest, tel, zip, licence_no, non_vet_licence_no, outside_us_state_name, non_vet_outside_us_state_name, heared, heared_from_other } = data
		const { first_name, last_name, vet_role, non_vet_role, tel, licence_no, non_vet_licence_no, outside_us_state_name, non_vet_outside_us_state_name, heared, heared_from_other, license_state, non_vet_license_state, raffle } = data

		console.log('data', data, 'licenseIssueState', licenseIssueState, 'nonVetLicenseIssueState', nonVetLicenseIssueState)
		// if(userPhone !== "Min 10 digits"){
		if ((isVetarinarian?.current?.querySelector('input').checked || isNotVetarinarian?.current?.querySelector('input').checked) && !licenseIssueStateError && !nonVetLicenseIssueStateError && phoneError !== 'Min 10 digits') {
			if (isNotVetarinarian?.current?.querySelector('input').checked) {
				if (!nonVetisLicensed?.current?.querySelector('input').checked && !nonVetNotisLicensed?.current?.querySelector('input').checked) {
					console.log('chekbox error')
					return
				}
			}

			const formData = {
				user_id: loginUser?.id !== undefined ? loginUser?.id : 0,
				session: loginUser?.id !== undefined ? true : false,
				check: false,
				webinar_ids: webianrsId,
				first_name: first_name,
				last_name: last_name,
				email: loginUser?.id !== undefined ? loginUser?.email : userInitialEmail,
				// company: company,
				phone: document.querySelector('.custom_number input')?.value,
				// address: address,
				// city: city,
				// country: selectedCountry,
				// state: selectedState,
				// zip_code: zip,
				veterinarian: isVetarinarian?.current?.querySelector('input').checked ? 1 : 0,
				license: userIsNotVetrinarian ? (nonVetisLicensed?.current?.querySelector('input').checked ? 1 : 0) : null,

				// speciality: special_interest,
				// additional_comments: comments,
				veterinary_licence_number: userIsVetrinarian ? licence_no : nonVetraniranIsLicensed ? non_vet_licence_no : null,
				license_issuing_state: userIsVetrinarian ? (licenseIssueState !== 'outside-us' ? licenseIssueState : outside_us_state_name) : nonVetLicenseIssueState !== 'outside-us' ? nonVetLicenseIssueState : non_vet_outside_us_state_name,
				role: userIsVetrinarian ? selectedVetRole : selectedNonVetRole,
				outside_us_state: userIsVetrinarian ? (outsideUSState ? 1 : 0) : nonVetraniranIsLicensedoutsideUSState ? 1 : 0,
				heard_from: !hearedFromOther ? selectedHeared : heared_from_other,
				raffle,
				registered_from: 'DVM Central'
			}

			setbtndisabled(true)
			setloading(true)

			const res = await axios.post(`${baseApiUrl}/auto-virtual-expo-register-new`, formData)
			console.log('formData', formData, 'res from submit', res)
			setformSuccess(res?.data?.success === true ? true : false)
			setresMsg(res?.data?.message)
			setloading(false)
			setbtndisabled(false)
			setformsubmit(true)

			setTimeout(() => {
				document.querySelector('.msg') !== null && document.querySelector('.msg') !== undefined && document.querySelector('.msg').scrollIntoView({ behavior: 'smooth' })
			}, 300)

			if (res?.data?.success) {
				setuserInitialEmail('')
				setuserPhone('+1')
				setuserIsVetrinarian(false)
				setuserIsNotVetrinarian(false)
				setnonVetraniranIsLicensed(false)
				setnonVetraniranIsNotLicensed(false)
				setnonVetraniranIsLicensedoutsideUSState(false)
				setlicenseIssueStateOption('Select state')
				setnonVetLicenseIssueStateOption('Select state')
				setlicenseIssueState('')
				setnonVetLicenseIssueState('')
				setoutsideUSState(false)
				setselectedVetRoleOption('Select an option')
				setselectedNonVetRoleOption('Select an option')
				setselectedVetRole(null)
				setselectedNonVetRole(null)
				setselectedHearedOption('Select an option')
				setselectedHeared(null)

				document.querySelectorAll('.checkbox-wrapper').forEach((wrapper) => {
					wrapper.querySelector('input').checked = false
				})
				reset()
				setwebianrsId([latestVirtualExpoId])

				if (typeof window !== 'undefined') {
					window.lintrk('track', { conversion_id: 15070089 })
				}

				setTimeout(() => {
					setformsubmit(false)
					setModal(false)
					unlockScroll()
					setTimeout(() => {
						setcheckingUserData(true)
					}, 300)
				}, 3000)
			}
			// }
		}
	}

	// const getallCountries = async () => {
	// 	setcountryLoading(true)
	// 	const res = await fetch(`${baseApiUrl}/countries`).then((resp) => resp.json())
	// 	setcountriesList(res?.allCountries)
	// 	setcountryLoading(false)
	// }

	const getLicenseStates = async () => {
		setlicenseStateLoading(true)
		const licenseStates = await axios.get(`${baseApiUrl}/states/233`)
		setlicenseStateList(licenseStates?.data?.allStates)
		setlicenseStateLoading(false)
	}

	useEffect(() => {
		setformsubmit(false)
		// getallCountries()
		getLicenseStates()
		// setcountryValueChange(true)
		!userProfileDataExists?.user_webinar_data_exists && emailRef.current !== null && getRegisteredVirtualExpoList()
		!userProfileDataExists?.user_webinar_data_exists && emailRef.current !== null && setshowUpcomingVirtualExpoList(true)
	}, [])

	const upcomingVirtualExpoRegistrationHanlder = (e) => {
		const duplicateRegistringWeibniars = webianrsId?.filter((id, i) => {
			console.log('from get duplicate func', 'id', id, 'value', Number(e.target.value))

			return webianrsId[i] === Number(e.target.value)
		})

		console.log('duplicateRegistringWeibniars', duplicateRegistringWeibniars)

		if (duplicateRegistringWeibniars.length === 0) {
			setwebianrsId([...webianrsId, Number(e.target.value)])
			console.log('webianrsId if not duplicate', webianrsId)
		} else {
			let newwebianrsId = webianrsId?.filter((id) => {
				console.log('id', id, 'value', Number(e.target.value))
				console.log('webianrsId if duplicate', webianrsId)

				return id !== Number(e.target.value)
			})

			setwebianrsId(() => newwebianrsId)
			console.log('newwebianrsId', newwebianrsId)
		}

		console.log('weibanrs id', webianrsId)
	}

	const getUserRegisteredVirtualExpo = async (e) => {
		const email = e.target.value

		if (email === customer?.email) {
			await getRegisteredVirtualExpoList()
			setshowUpcomingVirtualExpoList(true)
		} else {
			setshowUpcomingVirtualExpoList(false)
			setregisteredVirtualExpoList([])
			return
		}
	}

	const outsideUSStateHandler = (e) => {
		console.log('event', e.target.value)
		setlicenseIssueState(e.target.value)
		setlicenseIssueStateOption(e.target.title)
		if (e.target.value === 'outside-us') {
			setoutsideUSState(true)
		} else {
			setoutsideUSState(false)
			return
		}
	}

	const nonVetOutsideUSStateHandler = (e) => {
		setnonVetLicenseIssueState(e.target.value)
		setnonVetLicenseIssueStateOption(e.target.title)
		if (e.target.value === 'outside-us') {
			setnonVetraniranIsLicensedoutsideUSState(true)
		} else {
			setnonVetraniranIsLicensedoutsideUSState(false)
			return
		}
	}

	const getRegisteredVirtualExpoList = async () => {
		if (loginUser?.id !== undefined) {
			const res = await axios.get(`${baseApiUrl}/check-virtual-expo-registration/${emailRef.current.querySelector('input').value}`)
			console.log('res for registered by user', res)

			const data = await res?.data?.webinars

			setregisteredVirtualExpoList(data)
		} else return
	}

	// const phoneFormatHandler = (ev) => {
	// 	ev.target.value = ev.target.value.replace(/[^a-zA-Z0-9]/g, '')

	// 	var regex = /^([a-zA-Z0-9]{3})([a-zA-Z0-9]{3})([a-zA-Z0-9]{4})$/
	// 	if (regex.test(ev.target.value)) {
	// 		console.log('value regex check', ev.target.value.replace(regex, '($1) $2-$3'))
	// 		return (ev.target.value = ev.target.value.replace(regex, '($1) $2-$3'))
	// 	} else {
	// 		if (ev.target.value.length < 10 || ev.target.value.length > 11) {
	// 			ev.preventDefault()
	// 		} else return ev.target.value
	// 	}
	// }

	const phoneFormatHandler = (ev) => {
		if (ev?.length < 11) {
			setphoneError('Min 10 digits')
		} else {
			setphoneError('')
		}
	}

	const initEmailSubmitHandler = async (data) => {
		const { initial_email } = data
		setuserInitialEmail(initial_email)

		setloading(true)
		setbtndisabled(true)
		await checkUserVirtualExpoData(initial_email)

		setloading(false)
		setbtndisabled(false)
		setcheckingUserData(false)
		reset()
	}

	useEffect(() => {
		if (loginUser?.id === undefined && checkingUserData) {
			setTimeout(() => {
				setFocus('initial_email')
			}, 300)
		}
	}, [setFocus])

	return loginUser?.id === undefined && checkingUserData ? (
		<div className={styles.check_wrapper}>
			<h4 className='primary-color'>Enter your Email to Proceed</h4>
			<form onSubmit={handleSubmit(initEmailSubmitHandler)} className={styles.form_wrapper}>
				{/* email */}
				<div className={styles.fields_wrapper}>
					<div className={styles.inner_wrapper}>
						<label htmlFor='initial_email'>
							Email <span>*</span>
						</label>
						{errors.initial_email?.type === 'required' && (
							<div className={styles.error_msg} role='alert'>
								required
							</div>
						)}
						{errors.initial_email?.message && (
							<div className={styles.error_msg} role='alert'>
								{errors.initial_email?.message}
							</div>
						)}
					</div>

					<div ref={initialEmailRef}>
						<input
							autoComplete='new-password'
							{...register('initial_email', {
								required: true,

								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
									message: 'Enter valid email'
								},
								onChange: (e) => (setValue('initial_email', e.target.value), getUserRegisteredVirtualExpo(e))
							})}
							aria-invalid={errors.email ? 'true' : 'false'}
							className={`${styles.input} ${errors.initial_email ? 'input-error' : undefined}`}
							type='initial_email'
							placeholder='Email'
							readOnly={loginUser?.id !== undefined ? true : false}
						/>
					</div>
				</div>

				<button disabled={btndisabled} type='submit' className='primary-btn'>
					Submit
					{loading && <LiteLoader className={styles.submit_loader} />}
				</button>
			</form>
		</div>
	) : !userProfileDataExists?.user_webinar_data_exists ? (
		<>
			<div className={`${styles.form_container}`}>
				<div className={`${styles.img_wrapper} ${styles.img_2} img-2`}>
					<Image src={rightwaveimg} alt='VatandTech' />
				</div>

				<h4 className={`${styles.title} primary-color`}>Fill the Form Below to Register</h4>
				{!(router?.asPath === '/virtual-expo/dvm-central-marketplace-virtual-expo' || webianrsId.includes(51)) && (
					<div className={styles.video_wrapper}>
						<div className={`${styles.video_text} gray-color`}>
							If you are having problem while registering for the Virtual Expo, kindly watch this video.{' '}
							<span onClick={() => (setvideoSrc(`https://player.vimeo.com/video/847983365?pip=0`), setshowVideoModal(true))}>
								<PlayerBtn size='sml' />
							</span>
						</div>
						{/* <div onClick={() => (setvideoSrc(`https://player.vimeo.com/video/847983365?pip=0`), setshowVideoModal(true))}>
							<PlayerBtn size='sml' />
						</div> */}
					</div>
				)}
				<form className={styles.form_wrapper}>
					{/* <fieldset className={`${styles.fieldset} gray-border`}>
						<legend>Personal Information</legend> */}
					<div className={styles.wrapper}>
						{/* first name */}
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
								autoComplete='new-password'
								{...register('first_name', {
									required: true,
									minLength: { value: 2, message: 'Min 2 characters' },
									maxLength: { value: 20, message: 'Max 20 characters' },
									pattern: {
										value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
										message: 'Enter valid name'
									},
									onChange: (e) => setValue('first_name', e.target.value)
								})}
								aria-invalid={errors.first_name ? 'true' : 'false'}
								className={`${styles.input} ${errors.first_name ? 'input-error' : undefined}`}
								minLength={2}
								maxLength={20}
								type='text'
								placeholder='First Name'
							/>
						</div>

						{/* last name */}
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
								autoComplete='new-password'
								{...register('last_name', {
									required: true,
									minLength: { value: 2, message: 'Min 2 characters' },
									maxLength: { value: 20, message: 'Max 20 characters' },
									pattern: {
										value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
										message: 'Enter valid name'
									},
									onChange: (e) => setValue('last_name', e.target.value)
								})}
								aria-invalid={errors.last_name ? 'true' : 'false'}
								className={`${styles.input} ${errors.last_name ? 'input-error' : undefined}`}
								minLength={2}
								maxLength={20}
								type='text'
								placeholder='Last Name'
							/>
						</div>

						{/* email */}
						<div className={styles.fields_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='email'>
									Email
									{/* <span>*</span> */}
								</label>
								{/* {errors.email?.type === 'required' && (
									<div className={styles.error_msg} role='alert'>
										required
									</div>
								)}
								{errors.email?.message && (
									<div className={styles.error_msg} role='alert'>
										{errors.email?.message}
									</div>
								)} */}
							</div>

							<div ref={emailRef}>
								<input
									disabled
									autoComplete='new-password'
									{...register('email', {
										required: false
										// pattern: {
										// 	value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										// 	message: 'Enter valid email'
										// },
										// onChange: (e) => (setValue('email', e.target.value), getUserRegisteredVirtualExpo(e))
									})}
									aria-invalid={errors.email ? 'true' : 'false'}
									className={`black-color no-cursor ${styles.input}`}
									type='email'
									placeholder='Email'
									readOnly={true}
									value={loginUser?.id !== undefined ? loginUser?.email : userInitialEmail}
									style={{ backgroundColor: 'var(--gray-section)' }}
								/>
							</div>
						</div>

						{/* phone */}
						<div className={styles.fields_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='tel'>
									Phone <span>*</span>
								</label>
								{phoneError === '' && errors.tel?.type === 'validate' && (
									<div className={styles.error_msg} role='alert'>
										required
									</div>
								)}
								{phoneError === 'Min 10 digits' && (
									<div className={styles.error_msg} role='alert'>
										{phoneError}
									</div>
								)}
							</div>

							{/* <input
								autoComplete='new-password'
								{...register('tel', {
									required: true,
									minLength: { value: 10, message: 'Min 10 digit' },
									onChange: (e) => (setValue('tel', e.target.value), phoneFormatHanlder(e))
								})}
								placeholder='(201) 555-5555'
								aria-invalid={errors.tel ? 'true' : 'false'}
								className={`${styles.input} ${errors.tel ? 'input-error' : undefined}`}
								minLength={10}
								maxLength={10}
								type='tel'
							/> */}
							<Controller
								control={control}
								name='tel'
								rules={{
									validate: () => userPhone !== '' && userPhone !== null && userPhone?.length > 0
								}}
								render={({ field: { onBlur } }) => (
									<PhoneInput
										isValid
										enableSearch={true}
										style={{ marginTop: '1rem' }}
										className={`custom_number ${errors.tel || phoneError === 'Min 10 digits' ? 'error_number' : undefined}`}
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
											phoneFormatHandler(phone)
											phone.length === 11 && clearErrors('tel')
										}}
									/>
								)}
							/>
						</div>

						{/* raffle */}
						{(router?.asPath === '/virtual-expo/dvm-central-marketplace-virtual-expo' || webianrsId.includes(51)) && (
							<div className={`${styles.fieds_wrapper} ${styles.address_input}`}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='raffle'>
										Enter Raffle
										{/* : <span className='red-color'>*</span> */}
									</label>
									{/* {errors.non_vet_role?.message && (
													<div className={styles.error_msg} role='alert'>
														{errors.non_vet_role?.message}
													</div>
												)} */}
								</div>

								<select
									className={`${styles.input} ${styles.select_input} ${errors.raffle ? 'checl-box-error' : 'gray-border'}`}
									{...register('raffle', {
										required: false
										// validate: { checkVal: (val) => val !== 'select' || 'required' }
									})}
									onChange={(e) => setValue('raffle', e.target.value)}
									aria-invalid={errors.raffle ? 'true' : 'false'}
									type='select'
									name='raffle'
									defaultValue=''
								>
									<option value=''>Select the Prize</option>
									<option value='Noxsano Animal Health - Restore Gel 5 mL Package of 5 ($99)'>Noxsano Animal Health - Restore Gel 5 mL Package of 5 ($99)</option>
									<option value='VetORSolutions - ConRad Thermal Blankets General Use Large ($95)'>VetORSolutions - ConRad Thermal Blankets General Use Large ($95)</option>
									<option value='Airplasma/MedviaTech - Amazon Gift Card ($100)'>Airplasma/MedviaTech - Amazon Gift Card ($100)</option>
									<option value='GerVetUSA - Luxating Winged WingLux Color Coated Titanium Set of 6 ($540)'>GerVetUSA - Luxating Winged WingLux Color Coated Titanium Set of 6 ($540)</option>
								</select>
							</div>
						)}

						{/* address */}
						{/* <div className={`${styles.fields_wrapper} ${styles.address_input}`}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='address'>
										Address <span>*</span>
									</label>
									{errors.address?.type === 'required' && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}

									{errors.address?.message && (
										<div className={styles.error_msg} role='alert'>
											{errors.address?.message}
										</div>
									)}
								</div> */}

						{/* <input
									autoComplete='new-password'
									{...register('address', {
										required: true,
										minLength: { value: 3, message: 'Too short address' },
										maxLength: { value: 300, message: 'Too long address' },
										pattern: {
											value: /.*\S.*/
						/* // 				message: 'Enter valid address'
							// 			},
							// 			onChange: (e) => setValue('address', e.target.value)
							// 		})}
							// 		aria-invalid={errors.address ? 'true' : 'false'}
							// 		className={styles.input}
							// 		type='text'
							// 		placeholder='Address'
							// 		minLength={3}
							// 		maxLength={300}
							// 	/>
							// </div> */}

						{/* company */}
						{/* <div className={`${styles.fields_wrapper} ${styles.address_input}`}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='company'>
										Company / Institute <span>*</span>
									</label>
									{errors.company?.type === 'required' && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}
								</div>
								<input
									autoComplete='new-password'
									{...register('company', {
										required: true,
										minLength: { value: 2, message: 'name is too short' },
										onChange: (e) => setValue('company', e.target.value)
									})}
									aria-invalid={errors.tel ? 'true' : 'false'}
									className={styles.input}
									type='text'
									placeholder='Company Name'
								/>
							</div> */}

						{/* country */}
						{/* <div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='country'>
										Country:
										<span className='red-color'> *</span>
									</label>
									{errors.country?.type === 'required' && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}
								</div>
								{countryLoading ? (
									<div className={styles.input}>
										<DarkLoader loaderType='sml' />
									</div>
								) : (
									<select
										className={`${styles.input} ${styles.select_input} gray-border`}
										{...register('country', {
											required: true,
											onChange: (e) => (setcountryValueChange(true), setselectedCountry(e.target.value), setselectedState('select'))
										})}
										aria-invalid={errors.country ? 'true' : 'false'}
										type='select'
										name='country'
										value={selectedCountry}
									>
										{countriesList?.map((list) => {
											const { id, name } = list
											return (
												<option key={id} value={id}>
													{name}
												</option>
											)
										})}
									</select>
								)}
							</div> */}

						{/* state */}
						{/* <div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='state'>
										State:
										<span className='red-color'> *</span>
									</label>

									{errors.state?.message && (
										<div className={styles.error_msg} role='alert'>
											{errors.state?.message}
										</div>
									)}
								</div>
								{stateLoading ? (
									<div className={styles.input}>
										<DarkLoader loaderType='sml' />
									</div>
								) : (
									<select
										value={selectedState}
										className={`${styles.input} ${styles.select_input} gray-border`}
										{...register('state', {
											required: true,
											validate: {
												checkVal: (val) => (val !== 'select' && selectedState !== null) || 'required'
											}
										})}
										onChange={(e) => setselectedState(e.target.value)}
										aria-invalid={errors.state ? 'true' : 'false'}
										type='select'
										name='state'
									>
										<option value='select'>Select state</option>
										{stateList?.length > 0 ? (
											stateList?.map((list) => {
												const { id, name } = list
												return (
													<option key={id} value={id}>
														{name}
													</option>
												)
											})
										) : (
											<option value='0'>Not Applicable</option>
										)}
									</select>
								)}
							</div> */}

						{/* city */}
						{/* <div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='city'>
										City <span>*</span>
									</label>
									{errors.city?.type === 'required' && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}
									{errors.city?.message && (
										<div className={styles.error_msg} role='alert'>
											{errors.city?.message}
										</div>
									)}
								</div>

								<input
									autoComplete='new-password'
									{...register('city', {
										required: true,
										pattern: {
											value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
											message: 'Enter valid city'
										},
										onChange: (e) => setValue('city', e.target.value)
									})}
									aria-invalid={errors.city ? 'true' : 'false'}
									className={styles.input}
									type='text'
									placeholder='City'
								/>
							</div> */}

						{/* zip postal code */}
						{/* <div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='zip'>Zip / Postal Code</label> */}
						{/* {errors.zip?.type === 'required' && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}
									{errors.zip?.message && (
										<div className={styles.error_msg} role='alert'>
											{errors.zip?.message}
										</div>
									)} */}
						{/* </div> */}

						{/* <input
									autoComplete='new-password'
									{...register('zip', {
										required: false,
										// minLength: { value: 4, message: 'Min 4 digit' },
										// maxLength: { value: 10, message: 'Max 10 digit' },
										// pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Enter valid zip/ postal code' },
										onChange: (e) => setValue('zip', e.target.value)
									})}
									aria-invalid={errors.zip ? 'true' : 'false'}
									className={styles.input}
									// minLength={4}
									// maxLength={10}
									type='text'
									placeholder='Zip / Postal Code'
								/> */}
						{/* </div> */}
					</div>
					{/* </fieldset> */}

					{/* <fieldset className={`${styles.fieldset} gray-border`}>
						<legend>Professional Information</legend> */}
					<div className={styles.wrapper}>
						<div className={`${styles.veterinarian_or_not} ${styles.address_input}`}>
							{/* checkboxes for veterinarian or not */}
							<div className={`${styles.checkbox_wrapper} checkbox-wrapper ${styles.address_input} `}>
								<div ref={isVetarinarian}>
									<CustomCheckbox
										checkBox_errors={vetorNonVetError}
										className={styles.checkbox}
										defaultChecked={false}
										value={1}
										type='radio'
										labeltitle='Veterinarian'
										name='veterinarian-or-not'
										onClick={() => vetorNonVetError && setvetorNonVetError(false)}
										onChange={(e) => (setfixAllFiledsErrors(false), e.target.checked ? (setuserIsVetrinarian(true), setuserIsNotVetrinarian(false), setnonVetLicenseIssueStateError(false)) : (setuserIsVetrinarian(false), setuserIsNotVetrinarian(true)))}
									/>
								</div>

								<div ref={isNotVetarinarian}>
									<CustomCheckbox
										checkBox_errors={vetorNonVetError}
										className={styles.checkbox}
										defaultChecked={false}
										value={1}
										type='radio'
										labeltitle='Non-Veterinarian'
										name='veterinarian-or-not'
										onClick={() => vetorNonVetError && setvetorNonVetError(false)}
										onChange={(e) => (setfixAllFiledsErrors(false), e.target.checked ? (setuserIsVetrinarian(false), setuserIsNotVetrinarian(true), setlicenseIssueStateError(false)) : (setuserIsVetrinarian(true), setuserIsNotVetrinarian(false)))}
									/>
								</div>
							</div>

							{vetorNonVetError && <div className={`${styles.vet_or_nonvet} red-color`}>Select an option</div>}

							{/* if user is veterinarian */}
							{userIsVetrinarian && (
								<div className={`${styles.license_wrapper} ${styles.address_input} `}>
									<div className={`${styles.address_input} ${styles.note} primary-color`}>{`Note: Please add license number as shown on your license card`}</div>
									{/* licence number */}
									<div className={`${styles.fields_wrapper}`}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='licence_no'>
												Veterinary License Number
												{/* <span>*</span> */}
											</label>
											{/* {errors.licence_no?.type === 'required' && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)} */}
										</div>

										<input
											{...register('licence_no', {
												required: false,
												onChange: (e) => setValue('licence_no', e.target.value)
											})}
											aria-invalid={errors.licence_no ? 'true' : 'false'}
											className={styles.input}
											type='text'
											placeholder='Enter veterinary license number'
										/>
									</div>

									{/* licence issue state */}
									<div className={styles.fields_wrapper} onBlur={() => setshowVetSelectState(false)}>
										<div className={`${styles.inner_wrapper} ${styles.custom_select}`}>
											<label htmlFor='license_state'>
												License Issuing State
												{/* :<span className='red-color'> *</span> */}
											</label>

											{/* {errors.license_state?.type === 'required' && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
											{errors.license_state?.message && (
												<div className={styles.error_msg} role='alert'>
													{errors.license_state?.message}
												</div>
											)} */}
										</div>
										<Controller
											control={control}
											name='license_state'
											render={({ field: { onBlur } }) => (
												<CustomSelectInput
													showSearch={true}
													dataLoading={licenseStateLoading}
													input_errors={errors.license_state}
													visibleLabelId='license_state'
													data={[
														{
															id: 'outside-us',
															value: 'Outside US',
															name: 'Outside US'
														},
														...licenseStateList
													]}
													defaultOption={licenseIssueStateOption}
													name='state'
													placeholder='Search state'
													showSelectMenu={showVetSelectState}
													setshowSelectMenu={setshowVetSelectState}
													onBlur={onBlur}
													onClick={(e) => {
														outsideUSStateHandler(e)
														// setselectedStateOption(e.target.value), setselectedState(e.target.title), setshowSelectState(false)
													}}
												/>
											)}
										/>
										{/* {licenseStateLoading ? (
											<div className={styles.input}>
												<DarkLoader loaderType='sml' />
											</div>
										) : (
											<select
												className={`${styles.input} ${styles.select_input} gray-border`}
												{...register('license_state', {
													required: false,
													// validate: { checkVal: (val) => val !== '' || 'required' },
													onChange: (e) => (setValue(e.target.value), outsideUSStateHandler(e))
												})}
												aria-invalid={errors.license_state ? 'true' : 'false'}
												type=''
												name='license_state'
												defaultValue={licenseIssueState}
											>
												<option value=''>Select state</option>

												<option value='outside-us'>Outside US</option>

												{licenseStateList?.map((list) => {
													const { id, name } = list

													return (
														<option key={id} value={name}>
															{name}
														</option>
													)
												})}
											</select>
										)} */}
									</div>

									{/* role in practice */}
									<div className={`${styles.fields_wrapper} ${!outsideUSState && styles.address_input}`} onBlur={() => setshowSelectVetRole(false)}>
										<div className={`${styles.inner_wrapper} ${styles.custom_select}`}>
											<label htmlFor='vet_role'>
												Role in Practice
												{/* : <span className='red-color'>*</span> */}
											</label>
										</div>

										<Controller
											control={control}
											name='vet_role'
											render={({ field: { onBlur } }) => (
												<CustomSelectInput
													visibleLabelId='vet_role_label'
													data={vetRoleOptions}
													defaultOption={selectedVetRoleOption}
													name='role'
													showSelectMenu={showSelectVetRole}
													setshowSelectMenu={setshowSelectVetRole}
													onBlur={onBlur}
													onClick={(e) => {
														setselectedVetRole(e.target.value), setselectedVetRoleOption(e.target.title)
													}}
												/>
											)}
										/>
									</div>

									{outsideUSState && (
										<>
											<div className={styles.fields_wrapper}>
												<div className={styles.inner_wrapper}>
													<label htmlFor='outside_us_state_name'>
														Enter State Name
														{/* <span className='red-color'>*</span> */}
													</label>
													{/* {errors.outside_us_state_name?.type === 'required' && (
														<div className={styles.error_msg} role='alert'>
															required
														</div>
													)} */}
													{errors.outside_us_state_name?.message && (
														<div className={styles.error_msg} role='alert'>
															{errors.outside_us_state_name?.message}
														</div>
													)}
												</div>

												<input
													{...register('outside_us_state_name', {
														required: false,
														minLength: {
															value: 2,
															message: 'Min 2 characters'
														},
														maxLength: {
															value: 30,
															message: 'Max 30 characters'
														},
														pattern: {
															value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
															message: 'Enter valid state name'
														},
														onChange: (e) => setValue('outside_us_state_name', e.target.value)
													})}
													aria-invalid={errors.outside_us_state_name ? 'true' : 'false'}
													className={styles.input}
													minLength={2}
													maxLength={30}
													type='text'
													placeholder='Enter State Name'
												/>
											</div>
										</>
									)}
								</div>
							)}

							{/* if user is not veterinarian */}
							{userIsNotVetrinarian && (
								<div className={`${styles.license_wrapper} ${styles.address_input}`}>
									{/* checkbox */}
									<div className={`${styles.checkbox_wrapper} checkbox-wrapper ${styles.address_input} ${styles.sec_checkbox}`}>
										<div ref={nonVetisLicensed}>
											<CustomCheckbox
												checkBox_errors={nonVetLicensedOrNotError}
												className={styles.checkbox}
												defaultChecked={false}
												value={1}
												type='radio'
												labeltitle='Licensed Veterinary Technician/Nurse'
												name='non-veterinarian-licensed-or-not'
												onClick={() => nonVetLicensedOrNotError && setnonVetLicensedOrNotError(false)}
												onChange={(e) => (e.target.checked ? (setnonVetraniranIsLicensed(true), setnonVetraniranIsNotLicensed(false)) : (setnonVetraniranIsLicensed(false), setnonVetraniranIsNotLicensed(true)))}
											/>
										</div>

										<div ref={nonVetNotisLicensed}>
											<CustomCheckbox
												checkBox_errors={nonVetLicensedOrNotError}
												className={styles.checkbox}
												defaultChecked={false}
												value={1}
												type='radio'
												labeltitle='Unlicensed Veterinary Technician/Nurse'
												name='non-veterinarian-licensed-or-not'
												onClick={() => nonVetLicensedOrNotError && setnonVetLicensedOrNotError(false)}
												onChange={(e) => (e.target.checked ? (setnonVetraniranIsLicensed(false), setnonVetraniranIsNotLicensed(true)) : (setnonVetraniranIsLicensed(true), setnonVetraniranIsNotLicensed(false)))}
											/>
										</div>
									</div>

									{nonVetLicensedOrNotError && <div className={`${styles.vet_or_nonvet} ${styles.non_vet_lice_or_not} red-color`}>Select an option</div>}

									{/* if non veterinarian is licensed */}
									<>
										{nonVetraniranIsLicensed && <div className={`${styles.address_input} ${styles.note} primary-color`}>{`Note: Please add license number as shown on your license card`}</div>}

										{/* license number */}
										{nonVetraniranIsLicensed && (
											<>
												<div className={`${styles.fields_wrapper}`}>
													<div className={styles.inner_wrapper}>
														<label htmlFor='non_vet_licence_no'>
															License Number
															{/* <span className='red-color'>*</span> */}
														</label>
														{/* {errors.non_vet_licence_no?.type === 'required' && (
															<div className={styles.error_msg} role='alert'>
																required
															</div>
														)} */}
													</div>

													<input
														{...register('non_vet_licence_no', {
															required: false,
															onChange: (e) => setValue('non_vet_licence_no', e.target.value)
														})}
														aria-invalid={errors.non_vet_licence_no ? 'true' : 'false'}
														className={styles.input}
														type='text'
														placeholder='Enter license number'
													/>
												</div>

												{/* license state */}
												<div className={`${styles.fields_wrapper}`} onBlur={() => setshowNonVetSelectState(false)}>
													<div className={`${styles.inner_wrapper} ${styles.custom_select}`}>
														<label htmlFor='non_vet_license_state'>
															License Issuing State
															{/* :<span className='red-color'> *</span> */}
														</label>

														{/* {errors.non_vet_license_state?.type === 'required' && (
															<div className={styles.error_msg} role='alert'>
																required
															</div>
														)}

														{errors.non_vet_license_state?.message && (
															<div className={styles.error_msg} role='alert'>
																{errors.non_vet_license_state?.message}
															</div>
														)} */}
													</div>

													<Controller
														control={control}
														name='non_vet_license_state'
														render={({ field: { onBlur } }) => (
															<CustomSelectInput
																showSearch={true}
																dataLoading={licenseStateLoading}
																input_errors={errors.non_vet_license_state}
																visibleLabelId='non_vet_license_state'
																data={[
																	{
																		id: 'outside-us',
																		value: 'Outside US',
																		name: 'Outside US'
																	},
																	...licenseStateList
																]}
																defaultOption={nonVetLicenseIssueStateOption}
																name='state'
																placeholder='Search state'
																showSelectMenu={showNonVetSelectState}
																setshowSelectMenu={setshowNonVetSelectState}
																onBlur={onBlur}
																onClick={(e) => {
																	nonVetOutsideUSStateHandler(e)
																}}
															/>
														)}
													/>
												</div>
											</>
										)}

										{/* role in practice */}
										{userIsNotVetrinarian && (
											<div className={`${styles.fields_wrapper} ${(!nonVetraniranIsLicensedoutsideUSState || nonVetraniranIsNotLicensed) && styles.address_input}`} onBlur={() => setshowSelectNonVetRole(false)}>
												<div className={`${styles.inner_wrapper} ${styles.custom_select}`}>
													<label htmlFor='non_vet_role'>
														Role in Practice
														{/* : <span className='red-color'>*</span> */}
													</label>
													{/* {errors.non_vet_role?.message && (
													<div className={styles.error_msg} role='alert'>
														{errors.non_vet_role?.message}
													</div>
												)} */}
												</div>

												<Controller
													control={control}
													name='non_vet_role'
													render={({ field: { onBlur } }) => (
														<CustomSelectInput
															showSearch={false}
															visibleLabelId='non_vet_role_label'
															data={nonvVetRoleOptions}
															defaultOption={selectedNonVetRoleOption}
															name='non_vet_role'
															showSelectMenu={showSelectNonVetRole}
															setshowSelectMenu={setshowSelectNonVetRole}
															onBlur={onBlur}
															onClick={(e) => {
																setselectedNonVetRole(e.target.value), setselectedNonVetRoleOption(e.target.title)
															}}
														/>
													)}
												/>
											</div>
										)}

										{nonVetraniranIsLicensedoutsideUSState && nonVetraniranIsLicensed && (
											<>
												{/* outside US state name */}
												<div className={styles.fields_wrapper}>
													<div className={styles.inner_wrapper}>
														<label htmlFor='non_vet_outside_us_state_name'>
															Enter State Name
															{/* <span className='red-color'>*</span> */}
														</label>
														{/* {errors.non_vet_outside_us_state_name?.type === 'required' && (
															<div className={styles.error_msg} role='alert'>
																required
															</div>
														)} */}
														{errors.non_vet_outside_us_state_name?.message && (
															<div className={styles.error_msg} role='alert'>
																{errors.non_vet_outside_us_state_name?.message}
															</div>
														)}
													</div>

													<input
														{...register('non_vet_outside_us_state_name', {
															required: false,
															minLength: {
																value: 2,
																message: 'Min 2 characters'
															},
															maxLength: {
																value: 30,
																message: 'Max 30 characters'
															},
															pattern: {
																value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
																message: 'Enter valid state name'
															},
															onChange: (e) => setValue('non_vet_outside_us_state_name', e.target.value)
														})}
														aria-invalid={errors.non_vet_outside_us_state_name ? 'true' : 'false'}
														className={styles.input}
														minLength={2}
														maxLength={30}
														type='text'
														placeholder='Enter State Name'
													/>
												</div>
											</>
										)}
									</>
								</div>
							)}

							{/* specail interest */}
							{/* <div className={`${styles.fields_wrapper} ${styles.address_input}`}>
									<div className={styles.inner_wrapper}>
										<label htmlFor='special_interest'>
											Special Interests: <span>*</span>
										</label>
										{errors.special_interest?.type === 'required' && (
											<div className={styles.error_msg} role='alert'>
												required
											</div>
										)}

										{errors.special_interest?.message && (
											<div className={styles.error_msg} role='alert'>
												{errors.special_interest?.message}
											</div>
										)}
									</div>

									<select
										className={`${styles.input} ${styles.select_input} gray-border`}
										{...register('special_interest', {
											required: true,
											validate: { check: (val) => val !== '' || 'required' }
										})}
										aria-invalid={errors.special_interest ? 'true' : 'false'}
										type='select'
										name='special_interest'
										defaultValue={webinar_related_info?.speciality !== null ? webinar_related_info?.speciality : ''}
										onChange={(e) => setValue('special_interest', e.target.value)}
									>
										<option value=''>Selct your Interests</option>
										<option value='Avian and exotic animal medicine'>Avian and exotic animal medicine</option>
										<option value='Dentistry'>Dentistry</option>
										<option value='Internal medicine'>Internal medicine</option>
										<option value='Orthopedic surgery'>Orthopedic surgery</option>
										<option value='Practice management'>Practice management</option>
										<option value='Shelter medicine'>Shelter medicine</option>
										<option value='Soft tissue surgery'>Soft tissue surgery </option>
										<option value='Emergency Medicine'>Emergency Medicine</option>
										<option value='Imaging'>Imaging</option>
										<option value='Other'>Other</option>
									</select>
								</div> */}
						</div>
					</div>
					{/* </fieldset> */}

					{/* <fieldset className={`${styles.fieldset} gray-border`}>
						<legend>Other</legend> */}
					<div className={`${styles.comments_register}`}>
						{/* comments */}
						{/* <div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='comments'>Additional Comments</label>
									{errors.comments?.type === 'required' && (
										<div className={`${styles.error_msg} ${styles.msg_error_msg}`} role='alert'>
											required
										</div>
									)}
									{errors.comments?.message && (
										<div className={styles.error_msg} role='alert'>
											{errors.comments?.message}
										</div>
									)}
								</div>

								<textarea
									{...register('comments', {
										onChange: (e) => setValue('comments', e.target.value)
									})}
									className={`${styles.textarea} transition`}
									placeholder='Additional Comments'
								/>
							</div> */}

						{/* heared about us */}
						<div className={styles.fields_wrapper} onBlur={() => setshowSelectOption(false)}>
							<div className={`${styles.inner_wrapper} ${styles.custom_select}`}>
								<label htmlFor='heared'>
									How Did You Hear About Us?
									{/* <span className='red-color'> *</span> */}
								</label>
							</div>

							<Controller
								control={control}
								name='heared'
								render={({ field: { onBlur } }) => (
									<CustomSelectInput
										showFrom='top'
										showSearch={false}
										input_errors={errors.heared}
										visibleLabelId='heared_label'
										data={hearedOptions}
										defaultOption={selectedHearedOption}
										name='heared'
										showSelectMenu={showSelectOption}
										setshowSelectMenu={setshowSelectOption}
										onBlur={onBlur}
										onClick={(e) => {
											setselectedHeared(e.target.value), setselectedHearedOption(e.target.title), sethearedFromOther(e.target.value === 'other' ? true : false)
										}}
									/>
								)}
							/>
						</div>

						{hearedFromOther && (
							<div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='heared_from_other'>
										Please mention the name
										{/* <span>*</span> */}
									</label>
									{/* {errors.heared_from_other?.type === 'required' && (
											<div className={styles.error_msg} role='alert'>
												required
											</div>
										)}
										{errors.heared_from_other?.message && (
											<div className={styles.error_msg} role='alert'>
												{errors.heared_from_other?.message}
											</div>
										)} */}
								</div>

								<input
									autoComplete='new-password'
									{...register('heared_from_other', {
										required: false,
										pattern: { value: /.*\S.*/, message: 'Enter valid name' },
										onChange: (e) => setValue('heared_from_other', e.target.value)
									})}
									aria-invalid={errors.heared_from_other ? 'true' : 'false'}
									className={styles.input}
									type='text'
									placeholder='How did you hear about us?'
								/>
							</div>
						)}

						{/* registeration for upcoming webianrs */}
						{registeredVirtualExpoList?.length > 0 && (
							<div className={styles.fields_wrapper}>
								<div>Register for upcoming Virtual Expo</div>
								{showUpcomingVirtualExpoList ? (
									<div className={`${styles.upcoming_container}`}>
										{registeredVirtualExpoList?.map((webinar, index) => {
											const { name, id, check } = webinar

											return (
												modalData !== id &&
												(!check ? (
													<CustomCheckbox key={id} type='checkbox' name='upcoming weibnars' value={id} labeltitle={name} onChange={(e) => upcomingVirtualExpoRegistrationHanlder(e, index)} />
												) : (
													<div key={id} className={styles.checkmark_wrapper}>
														<div className={styles.checkmark}></div>

														<div className='gray-color'>{name}</div>
													</div>
												))
											)
										})}
									</div>
								) : (
									<div className={`${styles.upcoming_container} red-color`}>{`You email doesn't match with our record. Enter the email above in "email field", you used for sign in.`}</div>
								)}
							</div>
						)}
					</div>
					{/* </fieldset> */}

					{formsubmit && <Message className='msg' resMsg={resMsg} formSuccess={formSuccess} />}
				</form>

				{fixAllFiledsErrors && <div className={`${styles.fix_all} red-color`}>Fill all required* fields above</div>}

				<button disabled={btndisabled} type='button' className={`${styles.btn} primary-btn`} onClick={() => submitHanlder()}>
					Submit
					{loading && <LiteLoader className={styles.submit_loader} />}
				</button>
			</div>
		</>
	) : (
		<div className={styles.msg_wrapper}>
			<Message className={styles.msg} resMsg={userProfileDataExists?.message} formSuccess={true} />
		</div>
	)
}

export default RegisterForm

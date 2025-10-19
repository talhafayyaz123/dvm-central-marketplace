import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styles from '../Forms.module.css'
import { DarkLoader, LiteLoader } from '../../../../Loader/Loader'
import SocialLogins from '../SocialLogins/SocialLogins'
import { baseApiUrl } from '../../../../../utils/config'
import CustomCheckbox from '../../../../UI/CustomCheckbox/CustomCheckbox'
import Message from '../../../../UI/Message/Message'
import axios from 'axios'
import { lockScroll } from '../../../../../utils/scrollLock'
import { generateCaptchaHandler, captchaValue } from '../../../../../utils/captcha'
import PhoneInput from 'react-phone-input-2'

const SignupForm = ({ loading, btndisabled, setloading, setbtndisabled, setshowSignupForm, setshowSigninForm, setmodal, positionsData, router }) => {
	const [showPassword, setshowPassword] = useState('password')
	const [showEyeIcon, setshowEyeIcon] = useState(true)

	const [showPassword1, setshowPassword1] = useState('password')
	const [showEyeIcon1, setshowEyeIcon1] = useState(true)

	const [resMsg, setresMsg] = useState('')
	const [formSuccess, setformSuccess] = useState(false)
	const [formSubmit, setformSubmit] = useState(false)
	const [resendLoading, setresendLoading] = useState(false)
	const [resendBtnDisabled, setresendBtnDisabled] = useState(false)
	const [resendEmail, setresendEmail] = useState(false)
	const [newUserEmail, setnewUserEmail] = useState('')

	const [selectedPosition, setselectedPosition] = useState(router?.asPath?.includes('#job-apply') ? 'Sales Rep' : 'Select your position')
	const [selectedPositionOption, setselectedPositionOption] = useState(router?.asPath?.includes('#job-apply') ? 'Sales Rep' : null)
	const [showPositionMenu, setshowPositionMenu] = useState(false)

	const [clinicPhone, setclinicPhone] = useState('')
	const [userPhoneError, setuserPhoneError] = useState('')

	const [vtFriendsChecked, setvtFriendsChecked] = useState(false)
	const [vetandtechChecked, setvetandtechChecked] = useState(false)

	const allowonVTFriend = useRef(null)
	const allowonVetandTech = useRef(null)
	const canvasRef = useRef(null)
	const positionContainerRef = useRef(null)
	const affiliateContainerRef = useRef(null)

	const [selectedAffiliateprogram, setselectedAffiliateProgram] = useState('Select your program')
	const [showAffiliateMenu, setshowAffiliateMenu] = useState(false)
	const affiliate = ['IVPA', 'My Balto Foundation', 'VHMA']

	const {
		register,
		formState: { errors },
		getValues,
		watch,
		handleSubmit,
		reset,
		setValue,
		control,
		setError,
		clearErrors
	} = useForm()

	useEffect(() => {
		generateCaptchaHandler(canvasRef)
	}, [])

	const submitHandler = async (e) => {
		if (clinicPhone?.length < 11 && clinicPhone?.length > 1) {
			setuserPhoneError('Min 10 digits')
		} else {
			setuserPhoneError('')
		}
		e.preventDefault()

		await handleSubmit(onSubmit)()
	}

	const onSubmit = async (data) => {
		setformSubmit(false)
		setresendEmail(false)

		const {
			// username,
			first_name,
			last_name,
			email,
			password,
			confirm_password,
			terms_acceptance,
			clinic_name,
			clinic_phone
			// promo_code
		} = data

		if (userPhoneError !== 'Min 10 digits') {
			const newUserEmailData = await email
			setnewUserEmail(newUserEmailData)
			setbtndisabled(true)
			setloading(true)
			// function start
			const formData = {
				// username: username,
				first_name: first_name,
				last_name: last_name,
				name: first_name + ' ' + last_name,
				email: email,
				password: password,
				confirm_password: confirm_password,
				position: selectedPositionOption,
				affiliate_program: selectedAffiliateprogram === 'Select your program' ? null : selectedAffiliateprogram,
				clinic_name: selectedPosition !== 'Pet Parent' ? clinic_name : null,
				clinic_phone_number: selectedPosition !== 'Pet Parent' ? clinicPhone : null,
				// promo_code: promo_code !== undefined ? promo_code : null,
				allow_on_vetandtech: allowonVetandTech.current.querySelector('input').checked ? 1 : 0,
				allow_on_vt_friend: allowonVTFriend.current.querySelector('input').checked ? 1 : 0,
				accept_terms: terms_acceptance,
				allow_on_dvm: 1,
				type: 'dvm_central'
			}

			const res = await axios.post(`${baseApiUrl}/register`, formData)

			// function ends
			setloading(false)
			setbtndisabled(false)
			setresMsg(() => res?.data?.message)

			if (res?.data?.success === true) {
				generateCaptchaHandler(canvasRef)
				setselectedPosition('Select your position')
				setselectedAffiliateProgram('Select your program')
				setselectedPositionOption(null)
				setclinicPhone('')
				setformSuccess(true)
				setresendEmail(true)
				reset()
			} else {
				setformSuccess(false)
			}

			setformSubmit(true)
			setTimeout(() => {
				setformSubmit(false)
			}, 2000)
		}
	}

	const resendEmailHandler = async () => {
		setformSubmit(false)
		setresendBtnDisabled(true)
		setresendLoading(true)
		const data = {
			email: newUserEmail,
			type: 'dvm_central'
		}
		const res = await axios.post(`${baseApiUrl}/email/resend`, data)

		res?.data?.success === true ? setformSuccess(true) : setformSuccess(false)

		setresMsg(() => res?.data?.message)
		setformSubmit(true)
		setresendBtnDisabled(false)
		setresendLoading(false)
	}

	const showPasswordHandler = () => {
		setshowPassword(null)
		setshowEyeIcon(false)
	}

	const hidePasswordHandler = () => {
		setshowPassword('password')
		setshowEyeIcon(true)
	}

	const showPasswordHandler1 = () => {
		setshowPassword1(null)
		setshowEyeIcon1(false)
	}

	const hidePasswordHandler1 = () => {
		setshowPassword1('password')
		setshowEyeIcon1(true)
	}

	const showSigninForm = () => {
		setshowSignupForm(false)
		setshowSigninForm(true)
	}

	if (typeof window !== 'undefined') {
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showPositionMenu) {
				if (!positionContainerRef?.current?.contains(e.target)) {
					setshowPositionMenu(false)
				}
			}
			if (showAffiliateMenu) {
				if (!affiliateContainerRef?.current?.contains(e.target)) {
					setshowAffiliateMenu(false)
				}
			}
		})
	}

	// const userNameChangeHandler = (e) => {
	//   e.target.value = e.target.value.replace(/[^\w]+/g, "");
	//   e.target.value = e.target.value.toLowerCase();
	// };

	const nameChangeHandler = (e) => {
		e.target.value = e.target.value.replace(/[^a-zA-Z]+/g, '')
	}

	const phoneFormatHanlder = (ev) => {
		// ev.target.value = ev.target.value.replace(/[^a-zA-Z0-9]/g, '')

		// var regex = /^([a-zA-Z0-9]{3})([a-zA-Z0-9]{3})([a-zA-Z0-9]{4})$/
		// if (regex.test(ev.target.value)) {
		// 	clearErrors('clinic_phone')

		// 	return (ev.target.value = ev.target.value.replace(regex, '($1) $2-$3'))
		// } else {
		// 	if (ev.target.value.length < 10) {
		// 		ev.preventDefault()
		// 		setError('clinic_phone', {
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
		<div className={styles.signin_form}>
			<div className={styles.sign_in_back}>
				<button className={`${styles.back_to_signin} sml-btn primary-btn white-color`} onClick={() => showSigninForm()}>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
					</svg>
					Back
				</button>
			</div>

			<h4>Sign up</h4>

			<form className={`${styles.form_wrapper} ${styles.signup_form_wrapper}`}>
				{/* <div className={styles.wrapper}>
          
          <div className={styles.fields_wrapper}>
            
            <div className={styles.inner_wrapper}>
              <label className="gray-color" htmlFor="username">
                Username
              </label>
              {errors.username?.type === "required" && (
                <div className={styles.error_msg} role="alert">
                  required
                </div>
              )}
              {errors.username?.message && (
                <div className={styles.error_msg} role="alert">
                  {errors.username?.message}
                </div>
              )}
            </div>


            <input
              {...register("username", {
                required: true,
                pattern: {
                  value: /^[\s]*[a-z0-9_\s]*$/,
                  message: 'only "alphabets", "numbers" and "_" are allowed',
                },
                minLength: { value: 2, message: "Min 2 characters allowed" },
                maxLength: { value: 30, message: "Max 30 characters allowed" },
                onChange: (e) => userNameChangeHandler(e),
              })}
              aria-invalid={errors.username ? "true" : "false"}
              className={styles.input}
              type="text"
              placeholder="Your Username"
              minLength={2}
              maxLength={30}
              autoComplete="new-password"
            />
          </div>
        </div> */}
				<div className={styles.wrapper}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label className='gray-color' htmlFor='first_name'>
								First Name <span className='red-color'>*</span>
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
								minLength: { value: 2, message: 'Min 2 characters allowed' },
								maxLength: { value: 20, message: 'Max 20 characters allowed' },
								pattern: {
									value: /^[\s]*[A-Za-z]+[A-Za-z.\s]*$/,
									message: 'only "alphabets" are allowed'
								},
								onChange: (e) => nameChangeHandler(e)
							})}
							aria-invalid={errors.first_name ? 'true' : 'false'}
							className={`${styles.input} ${errors.first_name ? 'input-error' : undefined}`}
							type='text'
							placeholder='Your First Name'
							minLength={2}
							maxLength={20}
							autoComplete='new-password'
						/>
					</div>
				</div>

				<div className={styles.wrapper}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label className='gray-color' htmlFor='last_name'>
								Last Name <span className='red-color'>*</span>
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
								minLength: { value: 2, message: 'Min 2 characters allowed' },
								maxLength: { value: 20, message: 'Max 20 characters allowed' },
								pattern: {
									value: /^[\s]*[A-Za-z]+[A-Za-z.\s]*$/,
									message: 'only "alphabets" are allowed'
								},
								onChange: (e) => nameChangeHandler(e)
							})}
							aria-invalid={errors.last_name ? 'true' : 'false'}
							className={`${styles.input} ${errors.last_name ? 'input-error' : undefined}`}
							type='text'
							placeholder='Your Last Name'
							minLength={2}
							maxLength={20}
							autoComplete='new-password'
						/>
					</div>
				</div>

				<div className={`${styles.wrapper} ${styles.one_row}`}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label className='gray-color' htmlFor='email'>
								Email <span className='red-color'>*</span>
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
								},
								onChange: (e) => (e.target.value = e.target.value.toLowerCase())
							})}
							aria-invalid={errors.email ? 'true' : 'false'}
							className={`${styles.input} ${errors.email ? 'input-error' : undefined}`}
							type='email'
							placeholder='Enter your email'
							autoComplete='new-password'
						/>
					</div>
				</div>

				<div className={styles.wrapper}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label className='gray-color' htmlFor='password'>
								Password <span className='red-color'>*</span>
							</label>
							{errors.password?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{errors.password?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.password?.message}
								</div>
							)}
						</div>

						<div className={`${styles.inner_wrapper} ${styles.input_wrapper}`}>
							<input
								{...register('password', {
									required: true,
									minLength: { value: 8, message: 'Min 8 characters allowed' }
								})}
								aria-invalid={errors.password ? 'true' : 'false'}
								className={`${styles.input} ${styles.password_input} ${errors.password ? 'input-error' : undefined}`}
								type={showPassword}
								placeholder='Enter your password'
								autoComplete='new-password'
							/>
							{showEyeIcon ? (
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--gray-icon)' className={styles.eye_icon} onClick={() => showPasswordHandler()}>
									<path d='M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z' />
									<path d='M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z' />
									<path d='M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z' />
								</svg>
							) : (
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--gray-icon)' className={styles.eye_icon} onClick={() => hidePasswordHandler()}>
									<path d='M12 15a3 3 0 100-6 3 3 0 000 6z' />
									<path
										fillRule='evenodd'
										d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z'
										clipRule='evenodd'
									/>
								</svg>
							)}
						</div>
					</div>
				</div>

				<div className={styles.wrapper}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label className='gray-color' htmlFor='confirm_password'>
								Password Confirmation <span className='red-color'>*</span>
							</label>
							{errors.confirm_password?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{errors.confirm_password?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.confirm_password?.message}
								</div>
							)}
							{watch('confirm_password') !== watch('password') && getValues('confirm_password') ? (
								<div className={styles.error_msg} role='alert'>
									Password not matched
								</div>
							) : null}
						</div>

						<div className={`${styles.inner_wrapper} ${styles.input_wrapper}`}>
							<input
								autoComplete='new-password'
								{...register('confirm_password', { required: true })}
								aria-invalid={errors.confirm_password ? 'true' : 'false'}
								className={`${styles.input} ${styles.password_input} ${!errors.confirm_password && watch('confirm_password') === watch('password') ? undefined : 'input-error'}`}
								type={showPassword1}
								placeholder='Enter your password'
							/>
							{showEyeIcon1 ? (
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--gray-icon)' className={styles.eye_icon} onClick={() => showPasswordHandler1()}>
									<path d='M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z' />
									<path d='M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z' />
									<path d='M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z' />
								</svg>
							) : (
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--gray-icon)' className={styles.eye_icon} onClick={() => hidePasswordHandler1()}>
									<path d='M12 15a3 3 0 100-6 3 3 0 000 6z' />
									<path
										fillRule='evenodd'
										d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z'
										clipRule='evenodd'
									/>
								</svg>
							)}
						</div>
					</div>
				</div>

				<div className={`${styles.wrapper} `} ref={positionContainerRef} onBlur={() => setshowPositionMenu(false)}>
					<div className={styles.fields_wrapper}>
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
							<div className={`${styles.input} ${errors.position ? 'input-error' : undefined} ${styles.state_container}`} onClick={() => positionsData.length > 0 && setshowPositionMenu(true)} tabIndex={0} onFocus={setshowPositionMenu}>
								<div className='gray-color'>{selectedPosition}</div>
								{positionsData.length > 0 && (
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
									</svg>
								)}
								<Controller
									control={control}
									name='position'
									rules={{
										validate: () => selectedPositionOption !== null && selectedPositionOption !== ''
									}}
									render={({ field: { onBlur } }) => (
										<div className={`${styles.state_wrapper} gray-border ${showPositionMenu && styles.show_select_menu} shadow transition`}>
											{positionsData?.map((position, index) => {
												console.log(position == selectedPosition && position)
												return (
													<CustomCheckbox
														tabIndex={-1}
														isRequired
														visibleLabelId='position_label'
														onBlur={onBlur}
														key={index}
														type='radio'
														labeltitle={position}
														value={position}
														defaultChecked={position == selectedPositionOption}
														title={position}
														name='position'
														onChange={(e) => {
															setselectedPositionOption(e.target.value), setselectedPosition(e.target.title), setshowPositionMenu(false)
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
					<div className='red-color' style={{ marginTop: '0.5rem' }}>
						{`Select "Sales Rep" if you want to apply for job.`}
					</div>
				</div>

				{selectedPosition !== 'Pet Parent' && selectedPosition !== 'Select your position' && selectedPosition !== 'Sales Rep' && (
					<>
						<div className={styles.wrapper}>
							<div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label className='gray-color' htmlFor='clinic_name'>
										Clinic Name <span className='red-color'>*</span>
									</label>
									{errors.clinic_name?.type === 'required' && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}
									{/* {errors.clinic_name?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.clinic_name?.message}
								</div>
							)} */}
								</div>

								<input
									{...register('clinic_name', {
										required: true
										// minLength: { value: 2, message: 'Min 2 characters allowed' },
										// maxLength: { value: 20, message: 'Max 20 characters allowed' },
										// pattern: { value: /^[\s]*[A-Za-z]+[A-Za-z.\s]*$/, message: 'only "alphabets" are allowed' }
									})}
									aria-invalid={errors.clinic_name ? 'true' : 'false'}
									className={`${styles.input} ${errors.clinic_name ? 'input-error' : undefined}`}
									type='text'
									placeholder='Your clinic name'
									// minLength={2}
									// maxLength={20}
									autoComplete='new-password'
								/>
							</div>
						</div>
						<div className={`${styles.fields_wrapper}`}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='clinic_phone'>
									Clinic Phone Number <span className='red-color'>*</span>
								</label>
								{userPhoneError === '' && errors.clinic_phone?.type === 'validate' && (
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
									autoComplete='4632-70979887'
									{...register('clinic_phone', {
										required: true,
										// minLength: { value: 10, message: 'Min 10 digit' },
										validate: (val) => val?.length === 10 || errors.clinic_phone?.message,
										onChange: (e) => (setValue('clinic_phone', e.target.value), phoneFormatHanlder(e))
									})}
									placeholder='(201) 555-5555'
									onPaste={(e) => e.preventDefault()}
									aria-invalid={errors.clinic_phone ? 'true' : 'false'}
									className={`${styles.input} ${errors.clinic_phone ? 'input-error' : undefined}`}
									// minLength={10}
									// maxLength={10}
									type='text'
								/> */}
							<Controller
								control={control}
								name='clinic_phone'
								rules={{
									validate: () => clinicPhone !== '' && clinicPhone !== null
								}}
								render={({ field: { onBlur } }) => (
									<PhoneInput
										enableSearch={true}
										style={{ marginTop: '1rem' }}
										className={`custom_number ${errors.clinic_phone || userPhoneError === 'Min 10 digits' ? 'error_number' : undefined}`}
										searchPlaceholder={'Search country'}
										searchNotFound={'No country found...'}
										placeholder='+1(201) 555-5555'
										onPaste={(e) => e.preventDefault()}
										aria-invalid={errors.clinic_phone ? 'true' : 'false'}
										value={clinicPhone}
										onBlur={onBlur}
										onChange={(phone) => {
											setclinicPhone(phone)
											phoneFormatHanlder(phone)
											phone.length === 11 && clearErrors('clinic_phone')
										}}
									/>
								)}
							/>
						</div>
						{/* <div className={styles.wrapper}>
						</div> */}

						{/* <div className={`${styles.wrapper}`}>
							<div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label className='gray-color' htmlFor='promo_code'>
										Promo Code (optional)
									</label>
								</div>

								<input
									{...register('promo_code', {
										required: false
										// pattern: { value: /^[\s]*[a-z0-9_\s]*$/, message: 'only "alphabets", "numbers" and "_" are allowed' },
										// minLength: { value: 2, message: 'Min 2 characters allowed' },
										// maxLength: { value: 30, message: 'Max 30 characters allowed' },
										// onChange: (e) => promo_codeChangeHandler(e)
									})}
									aria-invalid={errors.promo_code ? 'true' : 'false'}
									className={styles.input}
									type='text'
									placeholder='Enter promo code'
									// minLength={2}
									// maxLength={30}
									autoComplete='new-password'
								/>
							</div>
						</div> */}
					</>
				)}

				{/* Affiliate Program */}
				<div className={`${styles.wrapper} `} ref={affiliateContainerRef} onBlur={() => setshowAffiliateMenu(false)}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label className='gray-color' htmlFor='affiliate'>
								Affiliate Program
							</label>
						</div>

						<div className={styles.inner_wrapper}>
							<div className={`${styles.input} ${errors.affiliatedata ? 'input-error' : undefined} ${styles.state_container}`} onClick={() => affiliate.length > 0 && setshowAffiliateMenu(true)} tabIndex={0} onFocus={setshowAffiliateMenu}>
								<div className='gray-color'>{selectedAffiliateprogram}</div>
								{affiliate.length > 0 && (
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
									</svg>
								)}
								<Controller
									control={control}
									name='affiliate'
									render={({ field: { onBlur } }) => (
										<div className={`${styles.affliation_wrapper} gray-border ${showAffiliateMenu && styles.show_select_menu} shadow transition`}>
											{affiliate?.map((affiliatedata, index) => {
												return (
													<CustomCheckbox
														tabIndex={-1}
														visibleLabelId='affiliate_label'
														onBlur={onBlur}
														key={index}
														type='radio'
														labeltitle={affiliatedata}
														value={affiliatedata}
														title={affiliatedata}
														name='affiliate'
														onChange={(e) => {
															setselectedAffiliateProgram(e.target.title), setshowAffiliateMenu(false)
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
				</div>

				<div className={`${styles.wrappe} ${styles.captcha_container}`}>
					<div className={styles.fields_wrapper}>
						<div className={`${styles.captcha} primary-bg`}>
							<canvas ref={canvasRef} className={styles.canvas} width='400' height='80'></canvas>
						</div>
						<div className={styles.inner_wrapper}>
							<label className='gray-color' htmlFor='recaptcha' />
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
						<div className={styles.inner_wrapper}>
							<div className={styles.captcha_wrapper}>
								<input
									autoComplete='recaptcha'
									{...register('recaptcha', {
										required: true,
										validate: {
											checkVal: (val) => val == captchaValue || "Captcha Does'nt Match"
										}
									})}
									maxLength={6}
									aria-invalid={errors.recaptcha ? 'true' : 'false'}
									className={`${styles.input} ${errors.recaptcha ? 'input-error' : undefined}`}
									style={{ marginTop: errors.recaptcha ? 0 : '1rem' }}
									placeholder='Enter Captcha'
								/>
								<button
									type='button'
									className={`${styles.captcha_btn} btn sml-btn lite-pink-bg`}
									onClick={() => {
										generateCaptchaHandler(canvasRef)
										setValue('recaptcha', '')
									}}
									style={{ marginTop: errors.recaptcha ? '.25rem' : '1.25rem' }}
								>
									Reload Captcha
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.checks_wrapper}>
					{/* <div ref={allowonVTFriend}>
						<CustomCheckbox value={1} type='checkbox' labeltitle='Would like to Sign Up on VT Friends' name='allowon' />
					</div>
					<div ref={allowonVetandTech}>
						<CustomCheckbox value={1} type='checkbox' labeltitle='Would like to Sign Up on Vet and Tech' name='allowon' />
					</div> */}
					<div ref={allowonVTFriend} className={`${styles.check_box_wrapper} ${styles.radio_label_container}`}>
						<CustomCheckbox value={1} type='checkbox' className={`${styles.check_box}`} onChange={() => setvtFriendsChecked(!vtFriendsChecked)} labeltitle='Would like to Sign Up on' name='allowon' />
						<a href='https://www.vtfriends.com/' target='_blank' rel='noopener noreferrer' className={`primary-color link ${styles.web_link}`} tabIndex={-1}>
							{' '}
							VT Friends
						</a>
					</div>
					<div ref={allowonVetandTech} className={`${styles.check_box_wrapper} ${styles.radio_label_container}`}>
						<CustomCheckbox value={1} type='checkbox' className={`${styles.check_box}`} onChange={() => setvetandtechChecked(!vetandtechChecked)} labeltitle='Would like to Sign Up on' name='allowon' />
						<a href='https://www.vetandtech.com/' target='_blank' rel='noopener noreferrer' className={`primary-color link ${styles.web_link}`} tabIndex={-1}>
							{' '}
							<span>Vet And Tech </span>{' '}
						</a>
					</div>

					<div className={styles.terms_wrapper}>
						<div className={`${styles.radio_label_container} ${styles.term_wrapper}`}>
							<div className={styles.radio_label_wrapper}>
								<input {...register('terms_acceptance', { required: true })} className={styles.input} type='checkbox' value={1} />
								<span className={`${styles.checkmark} ${errors.terms_acceptance ? 'check-box-error' : undefined}`}> </span>

								<label htmlFor='terms_acceptance' className='gray-color'>
									I accept
								</label>
							</div>
							<span className={`${styles.terms_btn} link primary-color`} onClick={() => (setmodal(true), lockScroll())} tabIndex={-1}>
								Terms and Conditions
							</span>{' '}
							<span className='red-color'>*</span>
						</div>
						{errors.terms_acceptance?.type === 'required' && (
							<div className={styles.error_msg} role='alert'>
								required
							</div>
						)}
					</div>
				</div>

				{formSubmit && <Message className={styles.msg} formSuccess={formSuccess} resMsg={resMsg} />}

				{/* {!resendEmail && ( */}
				<div className={`${styles.inner_wrapper} ${styles.btn_wrapper}`}>
					<button disabled={btndisabled} type='submit' onClick={(e) => submitHandler(e)} className={`${styles.btn} primary-btn`}>
						Sign up
						{loading && <LiteLoader className={styles.submit_loader} />}
					</button>
					{resendEmail && (
						<button disabled={resendBtnDisabled} type='button' className={`${styles.resend_btn} primary-border`} onClick={() => resendEmailHandler()}>
							Resend Email
							{resendLoading && <DarkLoader className={styles.submit_loader} />}
						</button>
					)}
				</div>
				{/* )} */}
			</form>

			<SocialLogins />
		</div>
	)
}

export default SignupForm

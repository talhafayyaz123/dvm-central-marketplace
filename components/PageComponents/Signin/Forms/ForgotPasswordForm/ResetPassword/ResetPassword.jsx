import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { baseApiUrl } from '../../../../../../utils/config'
import { LiteLoader, DarkLoader } from '../../../../../Loader/Loader'
import Message from '../../../../../UI/Message/Message'
import styles from '../../Forms.module.css'

const ResetPassword = ({
	loading,
	setloading,
	btndisabled,
	setbtndisabled,
	setshowSigninForm,
	setshowResetPasswordForm,
	forgotPasswordResMsg,
	setforgotPasswordResMsg,
	resOTP,
	setresOTP,
	forgotPasswordFormSuccess,
	setforgotPasswordFormSuccess,
	forgotEmail,
	showResetBtn,
	setshowResetBtn,
	OTPCounter,
	setOTPCounter,
	OTPCounterExpired,
	setOTPCounterExpired,
	showOTPCounter,
	setshowOTPCounter,
	setcounterStart
}) => {
	const [showPassword, setshowPassword] = useState('password')
	const [showPassword1, setshowPassword1] = useState('password')
	const [showEyeIcon, setshowEyeIcon] = useState(true)
	const [showEyeIcon1, setshowEyeIcon1] = useState(true)
	const [resetBtnLoading, setresetBtnLoading] = useState(false)
	const [resetFormSubmitted, setresetFormSubmitted] = useState(false)

	const {
		register,
		formState: { errors },
		getValues,
		watch,
		handleSubmit,
		reset
	} = useForm()

	const onSubmit = async (data) => {
		const { password, confirm_password } = data
		setbtndisabled(true)
		setresetBtnLoading(true)

		const formData = new FormData()

		formData.append('email', forgotEmail)
		formData.append('password', password)
		formData.append('confirm_password', confirm_password)

		const res = await axios.post(`${baseApiUrl}/save-reset-password`, formData)

		setresetBtnLoading(false)

		if (res?.data?.success) {
			reset()
			setshowOTPCounter(false)
			setshowResetBtn(false)
			setforgotPasswordResMsg(res?.data?.message)
			setforgotPasswordFormSuccess(true)
			await setOTPCounter(600)
			setcounterStart(true)
			setTimeout(() => {
				showSigninForm()
				setbtndisabled(false)
			}, 3000)
		} else {
			setforgotPasswordResMsg(res?.data?.error)
			setforgotPasswordFormSuccess(false)
			setbtndisabled(false)
		}

		setresetFormSubmitted(true)
	}

	const showPasswordHandler = () => {
		setshowPassword(null)
		setshowEyeIcon(false)
	}

	const showPasswordHandler1 = () => {
		setshowPassword1(null)
		setshowEyeIcon1(false)
	}

	const hidePasswordHandler = () => {
		setshowPassword('password')
		setshowEyeIcon(true)
	}

	const hidePasswordHandler1 = () => {
		setshowPassword1('password')
		setshowEyeIcon1(true)
	}

	const showSigninForm = async () => {
		await setcounterStart(false)
		await setresOTP('t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G')
		await setOTPCounterExpired(true)
		await setOTPCounter(600)

		setshowResetPasswordForm(false)
		setshowSigninForm(true)
	}

	const resendOTPHandler = async () => {
		setshowOTPCounter(false)
		setOTPCounterExpired(false)
		setforgotPasswordFormSuccess(false)
		setbtndisabled(true)
		setloading(true)
		const reqData = {
			email: forgotEmail,
			type: 'dvm_central'
		}

		const res = await axios.post(`${baseApiUrl}/reset-password`, reqData)
		res?.data?.success ? (setforgotPasswordResMsg(`We've resent an OTP code to your email address.`), setforgotPasswordFormSuccess(true)) : (setforgotPasswordResMsg(res?.data?.error), setforgotPasswordFormSuccess(false))

		setresOTP(res?.data?.otp)

		setbtndisabled(false)
		setloading(false)
		await setOTPCounter(600)

		setcounterStart(true)
		setshowOTPCounter(true)
	}

	return (
		<>
			<button className={`${styles.back_to_signin} sml-btn primary-btn white-color`} onClick={() => showSigninForm()}>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
				</svg>
				Sign in
			</button>
			<div className={styles.error_div}>
				{(forgotPasswordFormSuccess || resetFormSubmitted) && <Message className={styles.reset_msg} resMsg={forgotPasswordResMsg} formSuccess={forgotPasswordFormSuccess} />}
				{showOTPCounter &&
					(OTPCounterExpired ? (
						<div className={styles.otp_expire}>Your OTP expired, click resend button to get new OTP</div>
					) : (
						<div className={styles.otp_expire}>
							Your OTP will expire in <span>{parseInt((OTPCounter / 60).toString().split('.'))}</span> minutes and <span>{(OTPCounter % 60).toFixed(0)}</span> seconds
						</div>
					))}
			</div>
			<h4>Reset your password</h4>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
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
								{...register('password', { required: true, minLength: { value: 8, message: 'Min 8 characters allowed' } })}
								aria-invalid={errors.password ? 'true' : 'false'}
								className={`${styles.input} ${errors.password ? 'input-error' : undefined} ${styles.password_input}`}
								type={showPassword}
								placeholder='Enter your password'
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
							<input {...register('confirm_password', { required: true })} aria-invalid={errors.confirm_password ? 'true' : 'false'} className={`${styles.input} ${errors.confirm_password ? 'input-error' : undefined} ${styles.password_input}`} type={showPassword1} placeholder='Enter your password' />
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

				<div className={styles.fields_wrapper}>
					<div className={styles.inner_wrapper}>
						<label htmlFor='text'>
							OTP <span className='red-color'>*</span>
						</label>
						{errors.text?.type === 'required' && (
							<div className={styles.error_msg} role='alert'>
								required
							</div>
						)}
						{errors.text?.message && (
							<div className={styles.error_msg} role='alert'>
								{errors.text?.message}
							</div>
						)}
					</div>

					<input
						{...register('text', {
							required: true,
							minLength: { value: 6, message: 'Min 6 digit' },
							maxLength: { value: 6, message: 'Max 6 digit' },
							pattern: { value: /^(?:[0-9] ?){6}$/, message: 'Only numbers allowed ' },
							validate: { checkVal: (val) => Number(val) === resOTP || 'Enter valid OTP' }
						})}
						aria-invalid={errors.text ? 'true' : 'false'}
						className={`${styles.input} ${errors.text ? 'input-error' : undefined}`}
						minLength={6}
						maxLength={6}
						type='text'
						placeholder='Enter OTP'
					/>
				</div>

				<div className={styles.inner_wrapper}>
					<button disabled={btndisabled} type='submit' className={`${styles.btn} primary-btn`}>
						Reset Password
						{resetBtnLoading && <LiteLoader className={styles.submit_loader} />}
					</button>
				</div>
			</form>

			{showResetBtn && (
				<button className={`${styles.resend_otp} sml-btn gray-border`} disabled={btndisabled} onClick={() => resendOTPHandler()}>
					Resend OTP
					{loading && <DarkLoader loaderType='sml' className={styles.submit_loader} />}
				</button>
			)}
		</>
	)
}

export default ResetPassword

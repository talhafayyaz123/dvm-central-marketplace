import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from './ForgotPasswordForm.module.css'
import axios from 'axios'
import { LiteLoader } from '../../../../Loader/Loader'
import { baseApiUrl } from '../../../../../utils/config.js'
import Message from '../../../../UI/Message/Message'

const ForgotPasswordForm = ({
	forgotPasswordForm,
	loading,
	setloading,
	btndisabled,
	setbtndisabled,
	setshowSigninForm,
	setforgotPasswordForm,
	setshowResetPasswordForm,
	forgotPasswordFormSuccess,
	forgotPasswordResMsg,
	setforgotPasswordResMsg,
	setforgotPasswordFormSuccess,
	showforgotResMsg,
	setshowforgotResMsg,
	setshowResetBtn,
	setresOTP,
	setforgotEmail,
	setshowOTPCounter,
	setOTPCounterExpired,
	setcounterStart
}) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm()

	const onForgotSubmit = async (data) => {
		let userEmail = await data?.email
		setforgotEmail(userEmail)
		setbtndisabled(true)
		setloading(true)

		const reqData = {
			email: userEmail,
			type: 'dvm_central'
		}

		const res = await axios.post(`${baseApiUrl}/reset-password`, reqData)

		setloading(false)
		setbtndisabled(false)

		setforgotPasswordFormSuccess(res?.data?.success === true ? true : false)

		if (res?.data?.success === true) {
			setshowResetPasswordForm(true)
			await setresOTP(res?.data?.otp)
			setshowResetBtn(true)
			setforgotPasswordForm(false)
			await setOTPCounterExpired(false)
			await setshowOTPCounter(true)
			setcounterStart(true)
			reset()
		}
		setforgotPasswordResMsg(res?.data?.message)
		setshowforgotResMsg(true)
	}

	const showSigninForm = () => {
		setforgotPasswordForm(false)
		setshowSigninForm(true)
		setshowforgotResMsg(false)
	}

	useEffect(() => {
		setforgotPasswordFormSuccess(false)
		setshowforgotResMsg(false)
	}, [])

	useEffect(() => {
		!forgotPasswordForm && reset()
	}, [forgotPasswordForm])

	return (
		<div className={!forgotPasswordForm ? styles.hide_forgot_form : styles.forgot_form}>
			<button className={`${styles.back_to_signin} sml-btn primary-btn white-color`} onClick={() => showSigninForm()}>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
				</svg>
				Sign in
			</button>

			<h4>Reset your password</h4>
			<form onSubmit={handleSubmit(onForgotSubmit)}>
				<div className={styles.wrapper}>
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
							{...register('email', { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Enter valid email' } })}
							aria-invalid={errors.email ? 'true' : 'false'}
							className={`${styles.input} ${errors.email ? 'input-error' : undefined}`}
							type='email'
							placeholder='Enter your email'
						/>
					</div>
				</div>

				{showforgotResMsg && <Message className={styles.reset_msg} resMsg={forgotPasswordResMsg} formSuccess={forgotPasswordFormSuccess} />}

				<div className={styles.inner_wrapper}>
					<button disabled={btndisabled} type='submit' className={`${styles.btn} primary-btn`}>
						Proceed
						{loading && <LiteLoader className={styles.submit_loader} />}
					</button>
				</div>
			</form>
		</div>
	)
}

export default ForgotPasswordForm

import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../Forms.module.css'
import { LiteLoader } from '../../../../Loader/Loader'
import SocialLogins from '../SocialLogins/SocialLogins'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Message from '../../../../UI/Message/Message'
import RegisteredOnOtherPlatform from './RegisteredOnOtherPlatform/RegisteredOnOtherPlatform'
import { browserName, osName, isMobile, isTablet, isDesktop } from 'react-device-detect'
import { GlobalProvider } from '../../../../../context/AppProvider'

const SigninForm = ({
	loading,
	btndisabled,
	setloading,
	setshow2FAForm,
	setShow2FAMessage,
	setbtndisabled,
	setshowSignupForm,
	setshowSigninForm,
	setforgotPasswordForm,
	setshowforgotResMsg,
	userActive,
	setuserActive,
	setsigninSuccess,
	userId,
	socialLoginErrorMsg,
	setsocialLoginErrorMsg,
	setactiveProvider
}) => {
	const [showPassword, setshowPassword] = useState('password')
	const [showEyeIcon, setshowEyeIcon] = useState(true)
	const [formSuccess, setformSuccess] = useState(false)
	const [formSubmit, setformSubmit] = useState(false)
	const [resMsg, setresMsg] = useState('')
	const [registeredOnOtherPlatformEmail, setregisteredOnOtherPlatformEmail] = useState('')
	const [modal, setmodal] = useState(false)
	const [userIP, setuserIP] = useState(null)

	const router = useRouter()

	const { prevUrl } = useContext(GlobalProvider)

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm()

	const onSubmit = async (data) => {
		setsocialLoginErrorMsg(null)
		setactiveProvider(null)

		setuserActive(true)
		const email = await data.email
		setregisteredOnOtherPlatformEmail(email)

		setformSubmit(false)
		setmodal(false)
		setbtndisabled(true)
		setloading(true)
		// function start
		if (userIP === null) {
			await getClientIp()
		} else {
			await signIn('credentials', {
				email: data.email,
				password: data.password,
				browser: browserName,
				operating_system: osName,
				user_agent: isDesktop ? 'PC' : isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Other',
				ip_address: userIP,
				redirect: false
			}).then((resp) => {
				setsigninSuccess(resp?.ok ? true : false)

				if (resp?.ok) {
					if (router.asPath.includes('r=pet-badges')) {
						router.push(`/dashboard/pet-badges`)
					} else if (prevUrl == '/sponsored-program') {
						router.push({
							pathname: '/sponsored-program',
							query: { name: 'survey' }
						})
					} else if (prevUrl !== '/email-verified' && prevUrl !== '/email-confirmation' && prevUrl !== '/auth/signin' && prevUrl !== null && prevUrl !== '/order_placed' && prevUrl !== '/404' && prevUrl !== '/500') {
						router.back()
					} else router.push('/')
					reset()
				} else {
					if (resp?.error?.includes('would you like to use the same account')) {
						setmodal(true)
					} else {
						setformSuccess(resp?.error.includes('further!') ? true : false)
						{
							if (resp?.error.includes('further!')) {
								setshow2FAForm(true)
								setshowSigninForm(false)
								setShow2FAMessage(resp?.error)
							}
						}

						setformSubmit(true)
					}

					setresMsg(resp?.error)
				}
				setloading(false)
			})
		}

		// function ends

		setloading(false)
		setbtndisabled(false)
	}

	const showPasswordHandler = () => {
		setshowPassword(null)
		setshowEyeIcon(false)
	}

	const hidePasswordHandler = () => {
		setshowPassword('password')
		setshowEyeIcon(true)
	}

	const hideSigninFormHandler = () => {
		setsocialLoginErrorMsg(null)
		setactiveProvider(null)
		setshowSigninForm(false)
		setshowSignupForm(true)
		setforgotPasswordForm(false)
	}

	const showForgotPasswordForm = () => {
		setsocialLoginErrorMsg(null)
		setactiveProvider(null)
		setshowSigninForm(false)
		setforgotPasswordForm(true)
		setshowforgotResMsg(false)
	}

	const getClientIp = async () => {
		try {
			const response = await fetch('https://api.ipify.org?format=json')
			const data = await response.json()

			setuserIP(data.ip)
		} catch (error) {
			console.error('Error fetching IP address:', error)
		}
	}

	useEffect(() => {
		getClientIp()
	}, [])

	return (
		<div className={`${styles.signin_form} `}>
			{socialLoginErrorMsg !== null && <Message formSuccess={false} resMsg={socialLoginErrorMsg} />}
			{!userActive && <Message formSuccess={false} resMsg={`Due to some unusual activity from your account, please sign in again. If you are unable to sign in, please contact the administrator on this email info@dvmcentral.com.`} />}
			{formSubmit && <Message formSuccess={formSuccess} resMsg={resMsg} />}
			{modal && <RegisteredOnOtherPlatform modalData={resMsg} setresMsg={setresMsg} setformSubmit={setformSubmit} setformSuccess={setformSuccess} registeredOnOtherPlatformEmail={registeredOnOtherPlatformEmail} setmodal={setmodal} />}
			{router?.query?.callbackUrl?.includes('dashboard') && <Message formSuccess={false} resMsg='You need to signin to veiw dashboard.' />}
			<h4>Sign in</h4>
			<div className={`${styles.new_user} transition primary-color`} onClick={() => hideSigninFormHandler()}>
				New User? Create an account
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
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
							{...register('email', {
								required: true,
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Enter valid email'
								},
								onChange: (e) => (e.target.value = e.target.value.toLowerCase())
							})}
							aria-invalid={errors.email ? 'true' : 'false'}
							className={`${styles.input} ${!errors.email && !resMsg?.includes('email') ? undefined : 'input-error'}`}
							type='email'
							placeholder='Enter your email'
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
								{...register('password', { required: true })}
								aria-invalid={errors.password ? 'true' : 'false'}
								className={`${styles.input} ${!errors.password && !resMsg?.includes('password') ? undefined : 'input-error'} ${styles.password_input}`}
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

				<div className={styles.inner_wrapper}>
					<button disabled={btndisabled} type='submit' className={`${styles.btn} primary-btn`}>
						Sign in
						{loading && <LiteLoader className={styles.submit_loader} />}
					</button>
					{/* <button className={`${styles.cant_signin} red-color link`} onClick={() => showTwoFaFrom()}>{` fa?`}</button> */}
					<button className={`${styles.cant_signin} red-color link`} onClick={() => showForgotPasswordForm()}>{`Forgot Password?`}</button>
				</div>
			</form>

			<SocialLogins />
		</div>
	)
}

export default SigninForm

import React, { useEffect, useRef, useState } from 'react'
import styles from './Forms.module.css'
import SignupForm from './SignupForm/SignupForm'
import SigninForm from './SigninForm/SigninForm'
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm'
import ResetPassword from './ForgotPasswordForm/ResetPassword/ResetPassword'
import axios from 'axios'
import { baseApiUrl } from '../../../../utils/config'
import TwoFaForm from './TwoFa/TwoFaForm'

const Forms = ({ setshow2FAForm, showSigninForm, setshowSigninForm, setmodal, userActive, setuserActive, setsigninSuccess, userId, socialLoginErrorMsg, setsocialLoginErrorMsg, setactiveProvider, show2FAform, session }) => {
	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)

	const [showSignupForm, setshowSignupForm] = useState(false)
	const [forgotPasswordForm, setforgotPasswordForm] = useState(false)
	const [showResetPasswordForm, setshowResetPasswordForm] = useState(false)
	const [forgotPasswordResMsg, setforgotPasswordResMsg] = useState('')
	const [forgotPasswordFormSuccess, setforgotPasswordFormSuccess] = useState(false)
	const [showforgotResMsg, setshowforgotResMsg] = useState(false)
	const [forgotEmail, setforgotEmail] = useState('')
	const [resOTP, setresOTP] = useState()
	const [showResetBtn, setshowResetBtn] = useState(false)

	const [OTPCounter, setOTPCounter] = useState(600)
	const [OTPCounterExpired, setOTPCounterExpired] = useState(false)
	const [showOTPCounter, setshowOTPCounter] = useState(false)
	const [counterStart, setcounterStart] = useState(false)

	const [positionsData, setpositionsData] = useState([])
	const [show2FAMessage, setShow2FAMessage] = useState(null)

	const counterRef = useRef(null)

	useEffect(() => {
		if (counterStart) {
			counterRef.current = setInterval(() => {
				setOTPCounter((prev) => {
					if (prev >= 1) {
						setOTPCounterExpired(false)
						return prev - 1
					} else {
						setOTPCounterExpired(true)
						setresOTP('t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G')
						return 0
					}
				})
			}, 1000)
			return () => {
				if (counterRef.current !== null) clearInterval(counterRef.current)
			}
		}
	}, [counterStart, OTPCounter])

	const getPositionsData = async () => {
		const res = await axios.get(`${baseApiUrl}/get-positions`)

		setpositionsData(res?.data?.positions)
	}

	useEffect(() => {
		getPositionsData()
	}, [setpositionsData])

	return (
		<div className={`${styles.form_container} white-bg radius`}>
			<div className={styles.form_outer_wrapper}>
				{showSigninForm && (
					<SigninForm
						setShow2FAMessage={setShow2FAMessage}
						setshow2FAForm={setshow2FAForm}
						loading={loading}
						btndisabled={btndisabled}
						setloading={setloading}
						setbtndisabled={setbtndisabled}
						setshowSignupForm={setshowSignupForm}
						setshowSigninForm={setshowSigninForm}
						setforgotPasswordForm={setforgotPasswordForm}
						setshowforgotResMsg={setshowforgotResMsg}
						userActive={userActive}
						setuserActive={setuserActive}
						setsigninSuccess={setsigninSuccess}
						userId={userId}
						socialLoginErrorMsg={socialLoginErrorMsg}
						setsocialLoginErrorMsg={setsocialLoginErrorMsg}
						setactiveProvider={setactiveProvider}
						session={session}
					/>
				)}

				{showSignupForm && <SignupForm setmodal={setmodal} loading={loading} btndisabled={btndisabled} setloading={setloading} setbtndisabled={setbtndisabled} setshowSignupForm={setshowSignupForm} setshowSigninForm={setshowSigninForm} positionsData={positionsData} />}

				<ForgotPasswordForm
					loading={loading}
					btndisabled={btndisabled}
					setloading={setloading}
					setbtndisabled={setbtndisabled}
					setshowSigninForm={setshowSigninForm}
					setforgotPasswordForm={setforgotPasswordForm}
					setshowResetPasswordForm={setshowResetPasswordForm}
					forgotPasswordResMsg={forgotPasswordResMsg}
					setforgotPasswordResMsg={setforgotPasswordResMsg}
					forgotPasswordFormSuccess={forgotPasswordFormSuccess}
					setforgotPasswordFormSuccess={setforgotPasswordFormSuccess}
					showforgotResMsg={showforgotResMsg}
					setshowforgotResMsg={setshowforgotResMsg}
					setresOTP={setresOTP}
					forgotEmail={forgotEmail}
					setforgotEmail={setforgotEmail}
					setshowResetBtn={setshowResetBtn}
					forgotPasswordForm={forgotPasswordForm}
					setshowOTPCounter={setshowOTPCounter}
					setOTPCounterExpired={setOTPCounterExpired}
					setcounterStart={setcounterStart}
				/>

				{show2FAform && <TwoFaForm show2FAMessage={show2FAMessage} loading={loading} setloading={setloading} />}

				{showResetPasswordForm && (
					<ResetPassword
						loading={loading}
						btndisabled={btndisabled}
						setloading={setloading}
						setbtndisabled={setbtndisabled}
						setshowSigninForm={setshowSigninForm}
						setshowResetPasswordForm={setshowResetPasswordForm}
						setforgotPasswordResMsg={setforgotPasswordResMsg}
						setforgotPasswordFormSuccess={setforgotPasswordFormSuccess}
						forgotPasswordResMsg={forgotPasswordResMsg}
						resOTP={resOTP}
						setresOTP={setresOTP}
						forgotPasswordFormSuccess={forgotPasswordFormSuccess}
						forgotEmail={forgotEmail}
						showResetBtn={showResetBtn}
						setshowResetBtn={setshowResetBtn}
						setshowforgotResMsg={setshowforgotResMsg}
						OTPCounter={OTPCounter}
						setOTPCounter={setOTPCounter}
						OTPCounterExpired={OTPCounterExpired}
						setOTPCounterExpired={setOTPCounterExpired}
						showOTPCounter={showOTPCounter}
						setshowOTPCounter={setshowOTPCounter}
						setcounterStart={setcounterStart}
					/>
				)}
			</div>
		</div>
	)
}

export default Forms

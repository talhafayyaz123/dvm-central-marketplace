import React, { useContext, useEffect, useState } from 'react'
import styles from './signin.module.css'
// import bgShpage from '/public/imgs/login/bg-shapge.png'
// import Image from 'next/image'
import Forms from './Forms/Forms'
import InfoSection from './InfoSection/InfoSection'
import { DarkLoader } from '../../Loader/Loader'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Modal from '../../UI/Modal/Modal'
import TermsAndConditions from '../LandingPage/TermsAndConditions/TermsAndConditions'
import { GlobalProvider } from '../../../context/AppProvider'
import MetaTags from '../../UI/MetaTags/MetaTags'
import axios from 'axios'
import { baseApiUrl } from '../../../utils/config'
import coinsAnim from '../../../utils/coinsAnim'

const Signin = () => {
	const { data: status } = useSession()
	const { data: session } = useSession()
	const [showSigninForm, setshowSigninForm] = useState(true)

	const [modal, setmodal] = useState(false)
	const [signinSuccess, setsigninSuccess] = useState(false)
	const [show2FAform, setshow2FAForm] = useState(false)

	const { userActive, setuserActive, loginUser, socialLoginErrorMsg, setsocialLoginErrorMsg, setactiveProvider, userData, prevUrl } = useContext(GlobalProvider)

	const router = useRouter()

	const [loading, setloading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			status !== 'loading' && setloading(false)
		}, 1000)

		if (!socialLoginErrorMsg) {
			if (loginUser?.id !== undefined && userActive && !signinSuccess) {
				const redirect = status !== 'loading' && session?.user?.type !== 'admin'
				if (redirect) {
					router.push('/')
				}
				// status !== 'loading' && session?.user?.type !== 'admin' && router.push('/')
			}
		}

		return () => {
			setTimeout(async () => {
				if (status !== 'loading' && loginUser?.id !== undefined && userData?.position !== undefined && userData?.position !== 'Sales Rep') {
					const userData = {
						customer_id: loginUser?.id,
						url: 'signin'
					}
					const res = await axios.post(`${baseApiUrl}/save-user-coins`, userData)

					res?.data?.success && signinSuccess && (await coinsAnim(res?.data?.coins, res?.data?.coins + Number(res?.data?.new_coins)), setsigninSuccess(false))
				}
			}, 1000)
		}
	}, [loginUser?.id, userActive, signinSuccess, status, socialLoginErrorMsg, userData?.position, session?.user?.id])

	return !loading && status !== 'loading' && (loginUser?.id === undefined || session?.user?.type === 'admin') ? (
		<>
			<MetaTags
				title={`Login/Signup - DVM Central `}
				description={`Discover seamless access to veterinary resources at DVM Central! Streamlined Login/Signup processes ensure quick entry to customer service.`}
				keywords={`User Registration, Account Creation, Sign Up/Login, Member Login, Register Account`}
			/>
			<Modal modal={modal} setmodal={setmodal}>
				<div className={styles.terms_wrapper}>
					<TermsAndConditions />
				</div>
			</Modal>

			<section className={`${styles.signin_container} gradient-sec sec-mb`}>
				{/* <div className={styles.bg_shape_wrapper}>
					<Image src={bgShpage} alt='DVM Central' />
				</div> */}
				<div className='sec-p'>
					<div className={`${styles.signin_wrapper} sec-container`}>
						<Forms
							setshowSigninForm={setshowSigninForm}
							showSigninForm={showSigninForm}
							setmodal={setmodal}
							userActive={userActive}
							setuserActive={setuserActive}
							setsigninSuccess={setsigninSuccess}
							userId={loginUser?.id}
							socialLoginErrorMsg={socialLoginErrorMsg}
							setsocialLoginErrorMsg={setsocialLoginErrorMsg}
							setactiveProvider={setactiveProvider}
							setshow2FAForm={setshow2FAForm}
							show2FAform={show2FAform}
							session={session}
						/>
						<InfoSection />
					</div>
				</div>
			</section>
		</>
	) : (
		<div style={{ minHeight: '70vh', display: 'flex', justifyContent: 'center' }}>
			<DarkLoader />
		</div>
	)
}

export default Signin

import React, { useContext } from 'react'
import styles from './SocialLogins.module.css'
import { signIn } from 'next-auth/react'
import { GlobalProvider } from '../../../../../context/AppProvider'
import { useRouter } from 'next/router'

const SocialLogins = () => {
	const { setactiveProvider, prevUrl, loginUser, setsocialLoginErrorMsg, socialLoginErrorMsg } = useContext(GlobalProvider)

	const router = useRouter()

	const signInHandler = async (provider) => {
		socialLoginErrorMsg !== undefined && setsocialLoginErrorMsg(null)
		setactiveProvider(provider)

		await signIn(provider, {
			callbackUrl: router.asPath.includes('r=pet-badges') ? `/dashboard/pet-badges` : prevUrl !== '/email-verified' && prevUrl !== '/email-confirmation' && prevUrl !== '/auth/signin' && prevUrl !== null ? prevUrl : '/',
			redirect: false
		})
	}

	return (
		<>
			<div className={`${styles.or} white-bg gray-color`} />
			<div className={styles.social_logins_wrapper}>
				<button onClick={() => signInHandler('google')}>
					Google
					<svg className={`${styles.google} white-bg`} width='800px' height='800px' viewBox='-0.5 0 48 48' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
						<title>Google-color</title>
						<desc>Created with Sketch.</desc>
						<defs></defs>
						<g id='Icons' stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
							<g id='Color-' transform='translate(-401.000000, -860.000000)'>
								<g id='Google' transform='translate(401.000000, 860.000000)'>
									<path
										d='M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24'
										id='Fill-1'
										fill='#FBBC05'
									></path>
									<path
										d='M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333'
										id='Fill-2'
										fill='#EB4335'
									></path>
									<path
										d='M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667'
										id='Fill-3'
										fill='#34A853'
									></path>
									<path
										d='M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24'
										id='Fill-4'
										fill='#4285F4'
									></path>
								</g>
							</g>
						</g>
					</svg>
				</button>

				{/* <button className={`${styles.facebook_btn} white-color`} onClick={() => signInHandler('facebook')}>
					Facebook
					<svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 112.196 112.196' style={{ enableBackground: 'new 0 0 112.196 112.196' }} xmlSpace='preserve'>
						<g>
							<circle style={{ fill: 'var(--white)' }} cx='56.098' cy='56.098' r='56.098' />
							<path
								style={{ fill: '#3B5998' }}
								d='M70.201,58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34
		c0-5.964,2.833-15.303,15.301-15.303L71.56,21.81v12.51h-8.151c-1.337,0-3.217,0.668-3.217,3.513v7.585h11.334L70.201,58.294z'
							/>
						</g>
						<g />
						<g />
						<g />
						<g />
						<g />
						<g />
						<g />
						<g />
						<g />
						<g />
						<g />
						<g />
						<g />
						<g />
						<g />
					</svg>
				</button> */}

				<button className={`${styles.linked_btn} white-color`} onClick={() => signInHandler('linkedin')}>
					LinkedIn
					<svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' width={256} height={256} viewBox='0 0 256 256' xmlSpace='preserve'>
						<defs />
						<g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'>
							<path
								d='M 45 0 C 20.147 0 0 20.147 0 45 s 20.147 45 45 45 s 45 -20.147 45 -45 S 69.853 0 45 0 z'
								style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'var(--white)', fillRule: 'nonzero', opacity: 1 }}
								transform=' matrix(1 0 0 1 0 0) '
								strokeLinecap='round'
							/>
							<rect
								x='20.82'
								y='36.62'
								rx={0}
								ry={0}
								width='10.37'
								height='33.34'
								style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(0, 102, 153)', fillRule: 'nonzero', opacity: 1 }}
								transform=' matrix(1 0 0 1 0 0) '
							/>
							<path
								d='M 26.005 32.062 c -3.32 0 -6.005 -2.692 -6.005 -6.007 c 0 -3.318 2.685 -6.011 6.005 -6.011 c 3.313 0 6.005 2.692 6.005 6.011 C 32.01 29.37 29.317 32.062 26.005 32.062 z'
								style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(0, 102, 153)', fillRule: 'nonzero', opacity: 1 }}
								transform=' matrix(1 0 0 1 0 0) '
								strokeLinecap='round'
							/>
							<path
								d='M 70 69.956 H 59.643 V 53.743 c 0 -3.867 -0.067 -8.84 -5.385 -8.84 c -5.392 0 -6.215 4.215 -6.215 8.562 v 16.491 H 37.686 V 36.617 h 9.939 v 4.559 h 0.141 c 1.383 -2.622 4.764 -5.385 9.804 -5.385 c 10.493 0 12.43 6.903 12.43 15.88 V 69.956 z'
								style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(0, 102, 153)', fillRule: 'nonzero', opacity: 1 }}
								transform=' matrix(1 0 0 1 0 0) '
								strokeLinecap='round'
							/>
						</g>
					</svg>
				</button>
			</div>
		</>
	)
}

export default SocialLogins

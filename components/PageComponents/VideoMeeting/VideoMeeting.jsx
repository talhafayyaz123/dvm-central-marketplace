import React from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
// import IframeWithLoader from '../../UI/IframeWithLoader/IframeWithLoader'
import NotAuthorized from '../../UI/NotAuthorized/NotAuthorized'
// import Link from 'next/link'
import styles from './VideoMeeting.module.css'

const VideoMeeting = () => {
	const { data: session, status } = useSession()
	const router = useRouter()

	return (
		<>
			<Head>
				<meta httpEquiv='Permissions-Policy' content='camera=(), microphone=(), fullscreen=(), display-capture=()' />
			</Head>
			<section style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
				{status !== 'loading' && session?.user?.id ? (
					<>
						{/* <Link href={`/dashboard/appointments`}>
							<a className={styles.btn}>
								<button className='white-btn primary-border primary-color'>
									<span className={`${styles.hidden_on_mobile}`}>
										Appointments
									</span>
									<svg className={`${styles.btn_svg} size-6`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='var(--primary)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
									</svg>
								</button>
							</a>
						</Link> */}
						<iframe
							className={styles.iframe}
							src={`https://vtstreams.com/join/${router?.query?.channel}?user=${session?.user?.id}&site=dvm_central&environment=${process.env.NEXT_PUBLIC_APP_ENV}`}
							title='Video Meeting'
							allow='camera; microphone; fullscreen; display-capture'
							sandbox='allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-top-navigation allow-pointer-lock allow-presentation'
						/>
					</>
				) : (
					status !== 'loading' && <NotAuthorized heading='You need to sign in to access this page...' btnText='Sign in' href='/auth/signin' />
				)}
			</section>
		</>
	)
}

export default VideoMeeting

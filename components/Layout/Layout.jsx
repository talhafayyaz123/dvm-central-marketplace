import React, { useContext, useEffect, useState, useCallback, useTransition } from 'react'
// import dynamic from 'next/dynamic'
// import Navbar from '../Navbar/Navbar'
import NewNavbar from '../NewNavbar/Navbar.jsx'

// import Footer from '../Footer/Footer'
import NewFooter from '../NewFooter/Footer'

import { GlobalProvider } from '../../context/AppProvider.js'
import BackToTop from '../PageComponents/BackToTop/BackToTop.jsx'
import Notify from '../UI/Notify/Notify'
import Modal from '../UI/Modal/Modal'
import styles from './Layout.module.css'
import { useRouter } from 'next/router'
import Script from 'next/script'
import useLocalStorageState from 'use-local-storage-state'
import Cookie from '../UI/Cookie/Cookie'
import ImgWithLoader from '../UI/ImgWithLoader/ImgWithLoader'
import Link from 'next/link'
import axios from 'axios'
import { baseApiUrl, imgApiUrl } from '../../utils/config.js'
import CountDown from '../UI/CountDown/CountDown.jsx'
import HelpChat from '../PageComponents/HelpChat/HelpChat.jsx'




const initializeGTM = () => {
	if (typeof window === 'undefined') return null

	window.dataLayer = window.dataLayer || []
	window.gtag = function() {
		window.dataLayer.push(arguments)
	}

	return window.gtag
}

const Layout = ({ children }) => {
	const { popupSuccess, showresMsg, setshowresMsg, resMsgforPopup } = useContext(GlobalProvider)
	const [cookieAcceptance, setcookieAcceptance] = useLocalStorageState('dvm-cookies', {
		defaultValue: 0
	})
	const [isPending, startTransition] = useTransition()
	const [showCounter, setshowCounter] = useState(false)
	const [modal, setmodal] = useState(false)
	const [modalData, setmodalData] = useState({})
	const [showHelpChat, setShowHelpChat] = useState(false)
	const [gtmLoaded, setGtmLoaded] = useState(false)
	const router = useRouter()

	useEffect(() => {
        const timer = setTimeout(() => {
            initializeGTM()
            setGtmLoaded(true)
        }, 8000)
        return () => clearTimeout(timer)
    }, [])





	const modalFunc = useCallback(() => {
		if (typeof window === 'undefined') return
		if (window.scrollY >= 1000) {
			startTransition(() => {
				setmodal(true)
			})
			window.removeEventListener('scroll', modalFunc)
		}
	}, [])


	const getLatestWebinarDetails = useCallback(async () => {
		try {
			const res = await axios(`${baseApiUrl}/next-webinar-popup`)

			startTransition(() => {
				setmodalData(res?.data)
			})

			if (typeof window !== 'undefined' && router?.asPath === '/' && res?.data?.showCounter) {
				window.addEventListener('scroll', modalFunc)
			}

			if (router?.asPath !== '/' && res?.data?.showCounter) {
				setTimeout(() => {
					startTransition(() => {
						setshowCounter(true)
					})
				}, 4000)
			}
		} catch (error) {
			console.error('Error fetching webinar details:', error)
		}
	}, [router?.asPath, modalFunc])


	useEffect(() => {
		if (typeof window === 'undefined') return

		let mounted = true

		const init = async () => {
			if (mounted) {
				await getLatestWebinarDetails()
				setTimeout(() => {
					if (mounted) {
						startTransition(() => {
							setShowHelpChat(true)
						})
					}
				}, 5000)
			}
		}

		init()

		return () => {
			mounted = false
		}
	}, [getLatestWebinarDetails])

	// if (!isClient) {
	// 	return null
	// }

	return (
		<>
			{gtmLoaded ? (
				<>
					<Script
						id="gtm-script"
						strategy="lazyOnload"
						dangerouslySetInnerHTML={{
							__html: `
								(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
								new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
								j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
								'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
								})(window,document,'script','dataLayer','GTM-TKTGZQ9G');
							`
						}}
					/>
					<Script id='google-ads-conv' strategy='lazyOnload' src='https://www.googletagmanager.com/gtag/js?id=AW-11114760134' />

					{/* {typeof window !== 'undefined' && (
						<noscript>
							<iframe
								src="https://www.googletagmanager.com/ns.html?id=GTM-TKTGZQ9G"
								height="0"
								width="0"
								style={{ display: 'none', visibility: 'hidden' }}
							/>
						</noscript>
					)} */}
				</>
			) : null}

			{!router?.asPath?.includes('/video-meeting') && <NewNavbar />}
			<main>
				<Notify message={resMsgforPopup} success={popupSuccess} showPopup={showresMsg} setshowresMsg={setshowresMsg} />
				{
					modal && (
						<Modal modal={modal} setmodal={setmodal} modalType='video' pageType='home' setshowCounter={setshowCounter}>
							{modal && (
								<Link href={`/${modalData?.link}`}>
									<a className={`${styles.webinar_modal_wrapper} radius`} onClick={() => {
										startTransition(() => {
											setmodal(false)
										})
									}}>
										<ImgWithLoader priority width={901} height={507} src={`${imgApiUrl.virtualExpo.img}/${modalData?.modalImg}`} alt='DVM Central Expo - August Edition!' />
									</a>
								</Link>
							)}
						</Modal>
					)
				}
					{showCounter && (
						<CountDown
							heading={modalData?.title}
							slogan={modalData?.slogan}
							btnLink={modalData?.link}
							btnText='Register Now'
							standardTime={modalData?.standard_time}
							requiredYear={modalData?.numeric_date_2?.slice(-4)}
							requiredMonth={modalData?.numeric_date_2?.slice(0, 2)}
							requiredDay={modalData?.numeric_date_2?.slice(3, 5)}
							requiredHour={modalData?.hour}
							requiredMinute={modalData?.minute}
							requiredSeconds={modalData?.second}
							timeZone={modalData?.timezone}
							showCounter={showCounter}
							setshowCounter={(value) => {
								startTransition(() => {
									setshowCounter(value)
								})
							}}
							date={modalData?.date}
						/>
					)}
				<BackToTop />
					{showHelpChat && <HelpChat />}
				{children}
			</main>
			{/* <Footer /> */}
			<Cookie cookieAcceptance={cookieAcceptance} 
				setcookieAcceptance={(value) => {
					startTransition(() => {
						setcookieAcceptance(value)
					})
				}} 
			/>

			{!router?.asPath?.includes('/video-meeting') && <NewFooter />}
		</>
	)
}

export default React.memo(Layout)

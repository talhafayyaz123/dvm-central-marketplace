import '../public/styles/reset.css'
import '../public/styles/globals.css'
import Layout from '../components/Layout/Layout'
import NProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { AppProvider } from '../context/AppProvider'
import { unlockScroll } from '../utils/scrollLock'
import '@smastrom/react-rating/style.css'
import NoInternetPage from '../components/PageComponents/NoInternetPage/NoInternetPage'
import 'react-phone-input-2/lib/bootstrap.css'
import { pageview } from '../lib/gtm'
import axios from 'axios'
import { helpchaturl } from '../utils/config'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const [network, setnetwork] = useState(true)

	const [online, setonline] = useState(true)

	const route = useRouter()

	// Function to delete chat on app close
	const deletechatfunc = async () => {
		const userEmail = session ? session?.user?.email || session?.email : localStorage.getItem('dvm_chat_user_email')

		axios.delete(`${helpchaturl}/chatbot/delete_user_chat/${userEmail}`)
		localStorage.removeItem('dvm_chat_user_email')
		localStorage.removeItem('dvm_chat_messages')
	}

	useEffect(() => {
		window.addEventListener('offline', () => {
			setonline(window.navigator.onLine)
			setnetwork(false)
		})
		window.addEventListener('online', () => {
			setonline('online', () => {
				setonline(window.navigator.onLine)
				setnetwork(true)
			})
		})
		route.events.on('routeChangeStart', () => {
			NProgress.start()
			history.scrollRestoration = 'manual'
		})
		route.events.on('routeChangeComplete', () => {
			// trigger gtag
			pageview()
			NProgress.done()
			unlockScroll()

			if (typeof window !== 'undefined' && route?.isReady) {
				// clear webinar filters
				if (window.location.href.replace(/(?:.*?\/){3}/, '') !== 'virtual-expo' && !window.location.href.includes('/virtual-expo/')) {
					localStorage.removeItem('dvm-virtualExpoUpcoming')
					localStorage.removeItem('dvm-expoCategories')
					localStorage.removeItem('dvm-expoSpeakers')
				}
				if (!window.location.href.includes('/vendors')) {
					localStorage.removeItem('dvm-sortedValue')
					localStorage.removeItem('dvm-sortedOption')
					// localStorage.removeItem('dvm-searchValue')
					localStorage.removeItem('dvm-productCategories')
					localStorage.removeItem('dvm-showSearchData')
					localStorage.removeItem('dvm-showFilterData')
				}
				if (!window.location.href.includes('/today-deals')) {
					localStorage.removeItem('dvm-td_priceFilter')
					localStorage.removeItem('dvm-td_sortedval')
					localStorage.removeItem('dvm-td_vendorFilter')
					localStorage.removeItem('dvm-td_sortedOption')
					localStorage.removeItem('dvm-td_showFilterData')
				}
				if (!window.location.href.includes('/featured-products')) {
					localStorage.removeItem('dvm-fp_priceFilter')
					localStorage.removeItem('dvm-fp_sortedval')
					localStorage.removeItem('dvm-fp_vendorFilter')
					localStorage.removeItem('dvm-fp_sortedOption')
					localStorage.removeItem('dvm-fp_showFilterData')
				}
				if (!window.location.href.includes('/hot-products')) {
					localStorage.removeItem('dvm-hp_priceFilter')
					localStorage.removeItem('dvm-hp_sortedval')
					localStorage.removeItem('dvm-hp_vendorFilter')
					localStorage.removeItem('dvm-hp_sortedOption')
					localStorage.removeItem('dvm-hp_showFilterData')
				}
				if (!window.location.href.includes('/all-search-results')) {
					localStorage.removeItem('dvm-categoriesFilter')
					localStorage.removeItem('dvm-vendorFilter')
					localStorage.removeItem('dvm-brandFilter')
					localStorage.removeItem('dvm-priceFilter')
					localStorage.removeItem('dvm-availabilityFilter')
					localStorage.removeItem('dvm-specialityFilter')
					localStorage.removeItem('dvm-showSearchFilterData')
				}
				// if (!window.location.href.includes('/jobs')) {
				// 	localStorage.removeItem('dvm-companyFilter')
				// 	localStorage.removeItem('dvm-countryFilter')
				// 	localStorage.removeItem('dvm-stateFilter')
				// 	localStorage.removeItem('dvm-jobcategoryFilter')
				// 	localStorage.removeItem('dvm-jobtypeFilter')
				// 	localStorage.removeItem('dvm-workingtimeFilter')
				// 	localStorage.removeItem('dvm-educationFilter')
				// 	localStorage.removeItem('dvm-salarytypeFilter')
				// 	localStorage.removeItem('dvm-jobSearchValue')
				// 	localStorage.removeItem('dvm-dateTime')
				// 	localStorage.removeItem('dvm-minValue')
				// 	localStorage.removeItem('dvm-maxValue')
				// 	localStorage.removeItem('dvm-hiringFilter')
				// }
				if (!window.location.href.includes('/service-providers')) {
					localStorage.removeItem('dvm-selectedCategory')
				}
			}

			// clean up on route change
		return () => {
				route.events.off('routeChangeComplete', () => {
					pageview()
				})
		}
		})
	}, [route.events])

	useEffect(() => {
		const handleBeforeUnload = () => {
			deletechatfunc()
		}

		window.addEventListener('beforeunload', (localStorage.getItem('dvm_chat_user_email') || session?.user?.email || session?.email) && handleBeforeUnload)

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [session])

	return (
		<SessionProvider session={session}>
			<AppProvider>
				<Layout network={network}>{online ? <Component {...pageProps} /> : <NoInternetPage />}</Layout>
			</AppProvider>
		</SessionProvider>
	)
}

export default MyApp

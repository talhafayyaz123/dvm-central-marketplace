import axios from 'axios'
import React, { useState, useEffect, createContext, useRef } from 'react'
import { baseApiUrl } from '../utils/config'
import { signOut, useSession } from 'next-auth/react'
import useLocalStorageState from 'use-local-storage-state'
import { useRouter } from 'next/router'
import signoutFunc from '../utils/signout'
import { lockScroll, unlockScroll } from '../utils/scrollLock'
import usePreviousRoute from '../utils/getPreviousRoute'
import today from '../utils/today'
import coinsAnim from '../utils/coinsAnim'
import Cookies from 'js-cookie'

const GlobalProvider = createContext()

const AppProvider = ({ children }) => {
	const [cartItemsData, setcartItemsData] = useState([])
	const [cartitemsLength, setcartitemsLength] = useState(null)
	const [wishlistData, setwishlistData] = useState([])
	const [wishListItemsLength, setwishListItemsLength] = useState(null)
	const [cartBtnLoading, setcartBtnLoading] = useState(true)
	const [cartBtndisabled, setcartBtndisabled] = useState(false)
	const [popupSuccess, setpopupSuccess] = useState(false)
	const [showresMsg, setshowresMsg] = useState(false)
	const [resMsgforPopup, setresMsgforPopup] = useState('')
	const [cartLoading, setcartLoading] = useState(false)
	const [clickedProduct, setclickedProduct] = useState()
	const [defaultAddress, setdefaultAddress] = useState()
	const [deleteLoading, setdeleteLoading] = useState(false)
	const [cartSubTotal, setcartSubTotal] = useState()
	const [grandTotal, setgrandTotal] = useState()
	const [gettingSubTotal, setgettingSubTotal] = useState(false)
	const [showCartSidebar, setshowCartSidebar] = useState(false)
	const [chatModal, setChatModal] = useState(false)
	const [messages, setMessages] = useState([])

	const [cartRelatedProducts, setcartRelatedProducts] = useState([])
	// const [vendorShippingArrayChanged, setvendorShippingArrayChanged] = useState(false)
	// const totalShippingRef = useRef(null)
	const [couponsArrayChanged, setcouponsArrayChanged] = useState(false)
	const [couponsTotal, setcouponsTotal] = useState(0)
	const [userData, setuserData] = useState({})
	const [userActive, setuserActive] = useState(true)
	const [userAccountConfirmedStatus, setuserAccountConfirmedStatus] = useState(1)

	// const vendorShippingServiceName = useRef([])
	// const vendorShippingServiceRate = useRef([])
	// const [shippingRatesLoading, setshippingRatesLoading] = useState(true)
	const [showcheckoutBtn, setshowcheckoutBtn] = useState(false)
	const [readyForCheckout, setreadyForCheckout] = useState(false)

	const [productQtyinCart, setproductQtyinCart] = useState(0)
	const [modalProductQtyinCart, setmodalProductQtyinCart] = useState(0)
	const [subProudctQtyinCart, setsubProudctQtyinCart] = useState(0)
	const [modalSubProductQtyinCart, setmodalSubProductQtyinCart] = useState(0)

	const [gettingSocialLoginData, setgettingSocialLoginData] = useState(false)

	const [qty, setqty] = useState(1)
	const [modalQty, setmodalQty] = useState(1)

	const [ls_variationData, setls_variationData] = useLocalStorageState('product-variations', {
		defaultValue: []
	})

	const [productModalLs_variationData, setproductModalLs_variationData] = useLocalStorageState('product-modal-variations', {
		defaultValue: []
	})

	// const [impersonateUsers, setimpersonateUsers] = useState()
	const [impersonateUsers, setimpersonateUsers] = useLocalStorageState('iu', {
		defaultValue: {}
	})

	const [userCoins, setuserCoins] = useState(null)

	const router = useRouter()

	const prevUrl = usePreviousRoute()

	// state for nav search results
	const [showSearchResults, setshowSearchResults] = useState(false)
	const [searchBD, setsearchBD] = useState(false)

	// mob search
	const [showMobSearchNav, setshowMobSearchNav] = useState(false)

	const { data: session } = useSession()

	// a-prov stands for active social login provider
	const [activeProvider, setactiveProvider] = useLocalStorageState('a-prov', {
		defaultValue: null
	})

	// slu stands for login user
	const [loginUser, setloginUser] = useLocalStorageState('lu', {
		defaultValue: {}
	})

	const [socialLoginErrorMsg, setsocialLoginErrorMsg] = useState(null)

	const [couponsArray, setcouponsArray] = useLocalStorageState(loginUser?.email, {
		defaultValue: []
	})

	const [vendorsDataChanged, setvendorsDataChanged] = useLocalStorageState(loginUser?.last_name + 'vdc', { defaultValue: [] })

	const [socialLoginCoins, setsocialLoginCoins] = useState(false)

	useEffect(() => {
		if (Object.keys(impersonateUsers).length > 0) {
			setloginUser(impersonateUsers)
		} else {
			setloginUser(loginUser)
		}
	}, [impersonateUsers, loginUser])

	// get social login user details
	const getsocialLoginUserData = async () => {
		setgettingSocialLoginData(true)
		const data = {
			first_name: session?.name?.lastIndexOf(' ') !== -1 ? session?.name?.slice(0, session?.name?.lastIndexOf(' ')) : session?.name,
			last_name: session?.name?.lastIndexOf(' ') !== -1 ? session?.name?.slice(session?.name?.lastIndexOf(' ')) : null,
			type: 'Web',
			id: session?.id,
			account_type: activeProvider,
			email: session?.email
		}

		const res = await axios.post(`${baseApiUrl}/social-login`, data)
		if (res?.data?.success) {
			setloginUser(res?.data?.user)
			setTimeout(async () => {
				if (res?.data?.user?.position !== 'Sales Rep') {
					const userData = {
						customer_id: session?.id,
						url: 'signin'
					}
					const res = await axios.post(`${baseApiUrl}/save-user-coins`, userData)

					res?.data?.success && (await coinsAnim(res?.data?.coins, res?.data?.coins + Number(res?.data?.new_coins)))
					!socialLoginCoins && setsocialLoginCoins(true)
				}
			}, 1000)

			socialLoginErrorMsg !== null && setsocialLoginErrorMsg(null)
		} else {
			signOut({ redirect: false })
			setsocialLoginErrorMsg(res?.data?.error)
			setactiveProvider(null)
			router.push('/auth/signin')
		}
		setgettingSocialLoginData(false)
	}

	useEffect(() => {
		session && (activeProvider && JSON.parse(localStorage.getItem('lu'))?.id === undefined ? getsocialLoginUserData() : !activeProvider ? setloginUser(session?.user) : setloginUser(JSON.parse(localStorage.getItem('lu'))))

		// ialLoginErrorMsg(null), 1000)
	}, [session, setactiveProvider, setloginUser, socialLoginCoins])

	// setting dynamic data styling
	useEffect(() => {
		const links = document.querySelectorAll('.dynamic-data a')

		if (links?.length > 0) {
			links.forEach((link) => {
				if (!link.querySelector('img')) {
					link.classList.add('link')
				}

				if (!router.asPath.includes('/shop-now')) {
					link.setAttribute('target', '_blank')
				}
			})
		}
	}, [router?.asPath])

	// set qty to default on route change
	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			setqty(1)
		})
	}, [router?.events])

	useEffect(() => {
		if (router?.asPath !== '/checkout' && router?.asPath !== '/order-placed' && localStorage.getItem('vendor_ids')?.length) {
			localStorage.removeItem('vendor_ids')
		} else return
	}, [router?.asPath])

	// get user data
	const getUserData = async () => {
		const res = await axios(`${baseApiUrl}/user/get-profile/${loginUser?.id}`)
		console.log('res from usr', res)
		res?.data?.success && (setuserData(res?.data?.customer), setuserCoins(res?.data?.customer?.coins))
		res?.data?.success && Cookies.set('dvm_cen_tral_user_id', res?.data?.customer?.id)
	}

	// check user status func
	const getUserStatus = async () => {
		const res = await axios.get(`${baseApiUrl}/get-user-details/${loginUser?.email}`)

		setuserAccountConfirmedStatus(res?.data?.confirmed)
		if (res?.data?.active !== 1 || res?.data?.allow_on_dvm !== 1 || res?.data?.soft_delete !== 0) {
			setuserActive(false)
			signoutFunc(router, '/auth/signin')
			setloginUser({})
			setactiveProvider(null)
		}
	}

	useEffect(() => {
		if (loginUser?.id !== undefined) {
			getUserData()
			// check user status
			let userStatusInterval = setInterval(() => {
				getUserStatus()
			}, 60000)
			return () => clearInterval(userStatusInterval)
		}
		// else setuserCoins(null)
	}, [loginUser?.id, setuserData])

	// get wishlist items length
	const getwishlistItemsLength = async () => {
		const res = await axios(`${baseApiUrl}/user/wishlist/${loginUser?.id}`)
		console.log('res from wishlist data', res)

		setwishlistData(res?.data)
		setwishListItemsLength(res?.data?.success ? res?.data?.count : 0)
	}

	useEffect(() => {
		loginUser?.id !== undefined && getwishlistItemsLength()
	}, [wishListItemsLength, loginUser?.id])

	// cart items list
	const getCartItemsLength = async () => {
		setcartLoading(true)
		const res = await axios(`${baseApiUrl}/${process.env.NEXT_PUBLIC_APP_ENV === 'dev' ? 'cart-listing' : 'cart-listing-app'}/${loginUser?.id}`)
		console.log('res form, cart items', res)
		if (res?.data?.success) {
			setcartItemsData(res?.data)
			setcartRelatedProducts(res?.data?.relatedProducts)
			setcartitemsLength(res?.data?.count)
			setdefaultAddress(res?.data?.addresses)
			setcartLoading(false)
		}
	}

	useEffect(() => {
		loginUser?.id !== undefined && getCartItemsLength()
	}, [cartitemsLength, loginUser?.id])

	// add to cart handler
	const addTocartItem = async (id, vendorId, quantity, index, type, pageType, serviceId) => {
		setshowcheckoutBtn(false)
		!showCartSidebar && setclickedProduct(index)
		setshowresMsg(false)
		setcartBtndisabled(true)
		setcartBtnLoading(true)
		let data
		if (pageType === 'service-provider-seller') {
			data = {
				customer_id: loginUser?.id,
				plan_id: id,
				service_id: serviceId,
				vendor_id: vendorId,
				quantity: 1,
				type: type,
				number_of_license: quantity
			}
		} else {
			data = {
				customer_id: loginUser?.id,
				product_id: id,
				vendor_id: vendorId,
				quantity: quantity,
				type: type
			}
		}

		const res = await axios.post(`${baseApiUrl}/${process.env.NEXT_PUBLIC_APP_ENV === 'dev' ? 'add-cart' : 'add-cart-app'}`, data)
		console.log('add-data', data, 'res', res)

		setresMsgforPopup(res?.data?.message)
		if (res?.data?.success) {
			if (pageType === 'Product_detail' || pageType === undefined) {
				setproductQtyinCart(res?.data?.currentProductCountInCart)
				setsubProudctQtyinCart(res?.data?.currentProductCountInCart)
				if (ls_variationData?.length > 0) {
					const upatedData = ls_variationData.map((item) => {
						if (item?.id === id) {
							return { ...item, quantity_in_cart: res?.data?.currentProductCountInCart }
						} else return item
					})
					setls_variationData(upatedData)
				}
			} else if (pageType === 'modal') {
				setmodalProductQtyinCart(res?.data?.currentProductCountInCart)
				setmodalSubProductQtyinCart(res?.data?.currentProductCountInCart)
				if (productModalLs_variationData?.length > 0) {
					const upatedData = productModalLs_variationData.map((item) => {
						if (item?.id === id) {
							return { ...item, quantity_in_cart: res?.data?.currentProductCountInCart }
						} else return item
					})
					setproductModalLs_variationData(upatedData)
				}
			}

			if (pageType === 'Product_detail') {
				setqty(res?.data?.minimum_order !== null && res?.data?.minimum_order > 0 && res?.data?.currentProductCountInCart < res?.data?.minimum_order ? Number(res?.data?.minimum_order) - Number(res?.data?.currentProductCountInCart) : 1)
			}

			if (pageType === 'modal') {
				setmodalQty(res?.data?.minimum_order !== null && res?.data?.minimum_order > 0 && res?.data?.currentProductCountInCart < res?.data?.minimum_order ? Number(res?.data?.minimum_order) - Number(res?.data?.currentProductCountInCart) : 1)
			}

			if (pageType === 'service-provider-seller') {
				setqty(1)
			}

			const selectedVendor = vendorsDataChanged?.filter((vendor) => vendor === vendorId)

			if (selectedVendor?.length === 0 && vendorId !== undefined) {
				setvendorsDataChanged((prev) => [...prev, vendorId])
			}
		}

		setpopupSuccess(res?.data?.success ? true : false)

		await getCartItemsLength()
		setcartBtnLoading(false)
		setcartBtndisabled(false)
		setshowresMsg(true)
		setshowcheckoutBtn(true)

		// await getShippingRates()
		// await totalShippingAmount()
		!showCartSidebar && setclickedProduct()

		setTimeout(() => {
			setshowresMsg(false)
		}, 3000)
		return res
	}

	// delete cart item
	const deleteItemHandler = async (cartid, vendorId, type, pageType) => {
		setshowcheckoutBtn(false)
		lockScroll()
		setshowresMsg(false)
		setdeleteLoading(true)
		let data
		if (type !== 'vendor') {
			data = {
				customer_id: loginUser?.id,
				cart_id: cartid,
				type
			}
		} else {
			data = {
				type: type,
				customer_id: loginUser?.id,
				cart_id: cartid,
				vendor_id: vendorId
			}
		}
		const res = await axios.post(`${baseApiUrl}/${process.env.NEXT_PUBLIC_APP_ENV === 'dev' ? 'delete-cart' : 'delete-cart-app'}`, data)
		console.log('res from delete', res)
		setcartitemsLength(res?.data?.count)
		setresMsgforPopup(res?.data?.message)
		setpopupSuccess(res?.data?.success === true ? true : false)
		setcartItemsData(res?.data)
		setshowresMsg(true)
		if (pageType !== 'service-provider-seller') {
			setproductQtyinCart(res?.data?.currentProductCountInCart)
			setsubProudctQtyinCart(res?.data?.currentProductCountInCart)
			setqty(res?.data?.minimum_order !== null && res?.data?.minimum_order > 0 ? res?.data?.minimum_order : 1)
		} else setqty(1)

		if (res?.data?.success && pageType !== 'service-provider-seller') {
			const selectedVendor = vendorsDataChanged?.filter((vendor) => vendor === vendorId)

			if (type !== 'vendor' && selectedVendor?.length === 0 && vendorId !== undefined) {
				setvendorsDataChanged((prev) => [...prev, vendorId])
			}
		}
		setclickedProduct()
		setdeleteLoading(false)
		setshowcheckoutBtn(true)

		unlockScroll()
		// type !== 'vendor' && (await getShippingRates())
		// await totalShippingAmount()
		setTimeout(() => {
			setshowresMsg(false)
		}, 5000)

		return res
	}

	// get coupon discount amount
	const getCouponsTotal = () => {
		let couponsArrayTotal = 0

		for (let i = 0; i < couponsArray?.length; i++) {
			couponsArrayTotal += couponsArray[i]?.amount
		}

		setcouponsTotal(() => `${couponsArrayTotal}`)
	}

	useEffect(() => {
		if ((router?.asPath === '/cart' || router?.asPath === '/checkout') && loginUser?.id !== undefined) {
			couponsArrayChanged && getCouponsTotal()
		}
	}, [couponsArrayChanged, couponsArray, loginUser])

	useEffect(() => {
		if (router?.asPath !== '/checkout' && loginUser?.id !== undefined) {
			setcouponsArray([])
			setcouponsArrayChanged(false)
			setcouponsTotal(0)
		}
	}, [router?.asPath, loginUser?.id])

	// get shipping rates
	// const getShippingRates = async () => {
	// 	if (router?.asPath === '/cart' || router?.asPath === '/checkout') {
	// 		const data = {
	// 			customer_id: session?.user?.id
	// 		}
	// 		const res = await axios.post(`${baseApiUrl}/calculate-shipping-v2`, data)
	// 		console.log('res from shipping', res)

	// 		if (res?.data?.success && res?.data?.data?.vendors !== undefined) {
	// 			setallShippingMethods(res?.data?.data?.vendors)
	// 			const defaultShippingRates = await cartItemsData?.vendorProducts?.map((vendor, index) => {
	// 				return (
	// 					res?.data?.data?.vendors[index]?.shipping && {
	// 						vendor_id: vendor?.id,
	// 						name: vendor?.name,
	// 						shipping_service: vendorShippingServiceName[index]?.innerText,
	// 						shipping_rate: vendorShippingServiceRate[index]?.innerText
	// 					}
	// 				)
	// 			})
	// 			await setvendorShippingArray(() => defaultShippingRates)
	// 		} else {
	// 			setallShippingMethods([])
	// 			setvendorShippingArray([])
	// 		}

	// 		setshippingRatesLoading(false)

	// 		await setreadyForCheckout(true)

	// 		setTimeout(
	// 			() => {
	// 				setshowcheckoutBtn(true)
	// 			},
	// 			cartLoading ? 2000 : 1000
	// 		)
	// 	}
	// }

	// get total shipping ammount
	// let shippingRateTotal = 0

	// const totalShippingAmount = () => {
	// 	for (let i = 0; i < vendorShippingArray?.length; i++) {
	// 		shippingRateTotal += vendorShippingArray[i]?.shipping_rate !== undefined && Number(vendorShippingArray[i]?.shipping_rate)
	// 	}

	// 	setshippingTotal(() => `${shippingRateTotal.toFixed(2)}`)
	// }

	// useEffect(() => {
	// 	if ((router?.asPath === '/cart' || router?.asPath === '/checkout') && session) {
	// 		totalShippingAmount()
	// 	}
	// }, [vendorShippingArray, cartItemsData, allShippingMethods, vendorShippingArrayChanged, session?.user?.id, router?.asPath])

	// get sub total cart amount
	// products total
	let pricesArray = cartItemsData?.vendorProducts?.map((vendor) =>
		vendor?.products?.map(
			(item) => item?.cart_items?.checked == 'Y' && (item?.price_discounted !== null && item?.price_discounted !== 0 && (item?.price_discounted_end === null || new Date(item?.price_discounted_end) >= new Date()) ? item?.price_discounted : item?.price) * item?.cart_items?.quantity
		)
	)

	// services total
	let servicesPricesArray = cartItemsData?.vendorServices?.map((service) =>
		service?.plans?.map(
			(plan) =>
				plan?.cart_items?.checked == 'Y' &&
				(plan?.additional_fee !== null ? 1 : plan?.cart_items?.number_of_license) * plan?.fee + (plan?.additional_fee !== null ? (plan?.cart_items?.number_of_license - 1) * plan?.additional_fee : 0) + (plan?.equipment_fee !== null ? plan?.cart_items?.number_of_license * plan?.equipment_fee : 0)
		)
	)

	let newPricesArray = pricesArray?.length > 0 ? [].concat(...pricesArray) : []
	let newServicesPricesArray = servicesPricesArray?.length > 0 ? [].concat(...servicesPricesArray) : []

	let allPricesArray = newPricesArray?.concat(newServicesPricesArray)

	let subTotal = 0
	const totalCartAmount = () => {
		setgettingSubTotal(true)
		if (allPricesArray?.length > 0) {
			for (let i = 0; i < allPricesArray?.length; i++) {
				subTotal += allPricesArray[i]
			}

			setcartSubTotal(subTotal?.toFixed(2))
			// setgrandTotal(() => (Number(cartSubTotal) - couponsTotal + Number(shippingTotal)).toFixed(2))
			setgrandTotal(() => Number(cartSubTotal) - couponsTotal)

			setgettingSubTotal(false)
		} else {
			setcartSubTotal(0)
			setgettingSubTotal(false)
		}
	}

	// cart grand total
	useEffect(() => {
		if ((router?.asPath === '/cart' || router?.asPath === '/checkout') && loginUser?.id !== undefined) {
			totalCartAmount()
		}
	}, [cartItemsData, cartSubTotal, couponsTotal, loginUser?.id, router?.asPath])

	return (
		<GlobalProvider.Provider
			value={{
				wishListItemsLength,
				setimpersonateUsers,
				impersonateUsers,
				setuserData,
				getCartItemsLength,
				setwishListItemsLength,
				cartitemsLength,
				addTocartItem,
				cartBtnLoading,
				cartBtndisabled,
				setcartBtndisabled,
				popupSuccess,
				showresMsg,
				setshowresMsg,
				resMsgforPopup,
				cartLoading,
				cartItemsData,
				setcartItemsData,
				deleteItemHandler,
				clickedProduct,
				defaultAddress,
				deleteLoading,
				cartSubTotal,
				setcartSubTotal,
				// shippingTotal,
				// setshippingTotal,
				grandTotal,
				setgrandTotal,
				// vendorShippingArray,
				// setvendorShippingArray,
				cartRelatedProducts,
				totalCartAmount,
				// totalShippingAmount,
				// allShippingMethods,
				// setallShippingMethods,
				// vendorShippingArrayChanged,
				// setvendorShippingArrayChanged,
				pricesArray,
				newPricesArray,
				setcartitemsLength,
				// totalShippingRef,
				setdefaultAddress,
				couponsArray,
				setcouponsArray,
				couponsArrayChanged,
				setcouponsArrayChanged,
				couponsTotal,
				getCouponsTotal,
				setpopupSuccess,
				setresMsgforPopup,
				setshowresMsg,
				setcouponsTotal,
				getUserData,
				userData,
				showSearchResults,
				setshowSearchResults,
				searchBD,
				setsearchBD,
				showMobSearchNav,
				setshowMobSearchNav,
				userActive,
				setuserActive,
				userAccountConfirmedStatus,
				wishlistData,
				showCartSidebar,
				setshowCartSidebar,
				// getShippingRates,
				// vendorShippingServiceName,
				// vendorShippingServiceRate,
				// shippingRatesLoading,
				// setshippingRatesLoading,
				showcheckoutBtn,
				setshowcheckoutBtn,
				readyForCheckout,
				setreadyForCheckout,
				setwishlistData,
				productQtyinCart,
				setproductQtyinCart,
				subProudctQtyinCart,
				setsubProudctQtyinCart,
				ls_variationData,
				setls_variationData,
				productModalLs_variationData,
				setproductModalLs_variationData,
				modalProductQtyinCart,
				setmodalProductQtyinCart,
				modalSubProductQtyinCart,
				setmodalSubProductQtyinCart,
				qty,
				setqty,
				modalQty,
				setmodalQty,
				prevUrl,
				gettingSubTotal,
				vendorsDataChanged,
				setvendorsDataChanged,
				userCoins,
				setactiveProvider,
				loginUser,
				setloginUser,
				setuserCoins,
				gettingSocialLoginData,
				socialLoginErrorMsg,
				setsocialLoginErrorMsg,
				chatModal,
				setChatModal,
				messages,
				setMessages
			}}
		>
			{children}
		</GlobalProvider.Provider>
	)
}

export { AppProvider, GlobalProvider }

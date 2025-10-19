import React, { useState, useEffect, useRef, useContext } from 'react'
import { baseApiUrl, siteUrl } from '../../../../utils/config'
import Link from 'next/link'
import styles from './ShopByDeptsLists.module.css'
import ShopByDeptsAccordion from './ShopByDeptsAccordion/ShopByDeptsAccordion'
import { DarkLoader } from '../../../Loader/Loader'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { GlobalProvider } from '../../../../context/AppProvider'
import { deletechatfunc } from '../../../../utils/deletechatfunc'

const ShopByDeptsLists = ({ userData, showShopByDepts, setShowByDepts, shopByContainer, setHideScroller, loginUser, setloginUser }) => {
	
	const [shopyByResults, setShopByResults] = useState([])
	const [shopByVendors, setshopByVendors] = useState([])
	const [shopByServiceProviders, setshopByServiceProviders] = useState([])
	const [inputLoader, setinputLoader] = useState(false)
	const [searchFocus, setsearchFocus] = useState(false)
	const [loading, setLoading] = useState(true)
	const { push } = useRouter()
	const { setChatModal, setMessages } = useContext(GlobalProvider)

	const mainListLinks = useRef(null)
	const searchRef = useRef(null)
	const searchReq = useRef(0)

	const [categoryShowNum, setcategoryShowNum] = useState(7)
	const [vendorShowNum, setvendorShowNum] = useState(5)
	const [serviceProviderShowNum, setserviceProviderShowNum] = useState(5)

	const categoriesListRef = useRef(null)
	const vendorsListsRef = useRef(null)
	const serviceProvidersListRef = useRef(null)

	const handleShopByDepts = async () => {
		setLoading(true)
		try {			
		let res = await fetch(`${baseApiUrl}/mainSideBar`).then((response) => response.json())
		console.log('res from sidebar', res)

		setShopByResults(res?.shop_by_department)
		setshopByVendors(res?.vendors)
		setshopByServiceProviders(res?.serviceProviders)
		} catch (error) {
			console.log(error);
			
		}finally{
		setLoading(false)
	}
	}

	if (typeof window !== 'undefined') {
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (searchFocus) {
				if (!searchRef?.current?.contains(e.target)) {
					setsearchFocus(false)
				}
			} else return
		})
	}

	const searchHandler = async () => {
		const currentReq = ++searchReq.current
		setinputLoader(true)
		const res = await axios.get(`${baseApiUrl}/sidebar-categories-search?search_input=${searchRef?.current?.value}`)
		if (currentReq === searchReq.current) {
			setShopByResults(res?.data?.shop_by_department)
		}
		setinputLoader(false)
	}

	useEffect(() => {
		showShopByDepts && !shopyByResults?.length && handleShopByDepts()
	}, [showShopByDepts])

	return (
		<div className={styles.shop_by_depts_lists}>
			{loading ? (
				<div className={styles.loader}>
					<DarkLoader />
				</div>
			) : (
				showShopByDepts && (
				<div className={styles.main_list_container} ref={mainListLinks}>
					{shopyByResults !== false && (
						<>
							{/* shop by categories */}
							<div ref={categoriesListRef} className='section-wrapper'>
								<div className={`${styles.shop_by_heading} .main-list-links`}>
									<h5>Shop by Categories</h5>
								</div>
								<div className={`${styles.search_wrapper} transition ${searchFocus ? styles.input_focus : undefined}`} tabIndex={0} onFocus={setsearchFocus}>
									<input
										type='search'
										ref={searchRef}
										placeholder={'Search category'}
										// onKeyDown={(e) => enterkeyhandler(e)}
										onChange={(e) => {
											searchHandler()
										}}
										className={styles.search_inputs}
									/>
									<div className={`${styles.search_icon} transition`}>
										{inputLoader ? (
											<DarkLoader />
										) : (
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
											</svg>
										)}
									</div>
								</div>
								{shopyByResults?.length === 0 ? (
									<div className={`red-color ${styles.no_result}`}>No result found...</div>
								) : (
									<>
										{shopyByResults?.slice(0, categoryShowNum)?.map((ParentCategory, index) => {
											return ParentCategory.subcategories.length === 0 ? (
												<Link href={`/${ParentCategory.slug}`} key={index}>
													<a className={`${styles.shop_by_link_wrapper} main-list-links black-color`} onClick={() => setShowByDepts(false)}>
														<div className={styles.shop_by_link}>
															{ParentCategory?.name?.substring(0, 60)}
															{ParentCategory?.name?.length > 60 ? '...' : ''}
														</div>
													</a>
												</Link>
											) : (
												<ShopByDeptsAccordion className='main-list-links' showShopByDepts={showShopByDepts} setShowByDepts={setShowByDepts} key={index} index={index} ParentCategory={ParentCategory} shopByContainer={shopByContainer} setHideScroller={setHideScroller} />
											)
										})}
										{shopyByResults?.length > 7 && (
											<button className={`${styles.show_more_btn} sml-btn primary-color main-list-links`} onClick={() => setcategoryShowNum((prev) => (prev === 7 ? shopyByResults?.length : 7))}>
												<span>See {categoryShowNum == 7 ? 'More' : 'Less'}</span>
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--primary)' className={`${categoryShowNum > 7 ? 'icon-rotated' : undefined} transition`}>
													<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
												</svg>
											</button>
										)}
									</>
								)}
							</div>
							{/* shop by vendors */}
							<div ref={vendorsListsRef} className='section-wrapper'>
								<div className={`${styles.shop_by_heading} main-list-links`}>
									<h5>Shop by Vendors</h5>
								</div>
								{shopByVendors?.slice(0, vendorShowNum)?.map((result, index) => {
									const { name, slug } = result
									return (
										<Link href={`/vendors/${slug}`} key={index}>
											<a className={`${styles.shop_by_link_wrapper} main-list-links`} onClick={() => setShowByDepts(false)}>
												<div className={styles.shop_by_link}>
													{name?.substring(0, 60)}
													{name?.length > 60 ? '...' : ''}
												</div>
											</a>
										</Link>
									)
								})}

								{shopByVendors?.length > 5 && (
									<button className={`${styles.show_more_btn} sml-btn primary-color main-list-links`} onClick={() => setvendorShowNum((prev) => (prev === 5 ? shopByVendors?.length : 5))}>
										<span>See {vendorShowNum === 5 ? 'More' : 'Less'}</span>
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--primary)' className={`${vendorShowNum > 5 ? 'icon-rotated' : undefined} transition`}>
											<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
										</svg>
									</button>
								)}
							</div>
							{/* shop by service providers */}
							<div ref={serviceProvidersListRef} className='section-wrapper'>
								<div className={`${styles.shop_by_heading} main-list-links`}>
									<h5>Shop by Service Providers</h5>
								</div>
								{shopByServiceProviders?.slice(0, serviceProviderShowNum)?.map((result, index) => {
									const { name, slug } = result
									return (
										<Link href={`/service-providers/${slug}`} key={index}>
											<a className={`${styles.shop_by_link_wrapper} main-list-links`} onClick={() => setShowByDepts(false)}>
												<div className={styles.shop_by_link}>
													{name?.substring(0, 60)}
													{name?.length > 60 ? '...' : ''}
												</div>
											</a>
										</Link>
									)
								})}
								{shopByServiceProviders?.length > 5 && (
									<button className={`${styles.show_more_btn} sml-btn primary-color main-list-links`} onClick={() => setserviceProviderShowNum((prev) => (prev === 5 ? shopByServiceProviders?.length : 5))}>
										<span>See {serviceProviderShowNum === 5 ? 'More' : 'Less'}</span>
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--primary)' className={`${serviceProviderShowNum > 5 ? 'icon-rotated' : undefined} transition`}>
											<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
										</svg>
									</button>
								)}
							</div>
						</>
					)}
					{/* help && settings */}
					<div className={styles.help_section}>
						<div className={`${styles.shop_by_heading} main-list-links`}>
							<h5>{`Help & Settings`}</h5>
						</div>
						{loginUser?.id !== undefined && (
							<>
								<Link href={`/dashboard`}>
									<a className={`${styles.shop_by_other_links} main-list-links`} onClick={() => setShowByDepts(false)}>
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--new-gray)' className='w-6 h-6'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' />
										</svg>
										<div>Your Account</div>
									</a>
								</Link>
								{userData?.state !== null && userData?.country !== null && userData?.state !== undefined && userData?.country !== undefined && (
									<a className={`${styles.shop_by_other_links} ${styles.address} main-list-links`}>
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--new-gray)' className='w-6 h-6'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
											<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
										</svg>
										<div>
											{userData?.state}, {userData?.country}
										</div>
									</a>
								)}
							</>
						)}
						<Link href='/contact'>
							<a className={`${styles.shop_by_other_links} main-list-links`} onClick={() => setShowByDepts(false)}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--new-gray)' className='w-6 h-6'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z' />
								</svg>

								<div>Customer Service</div>
							</a>
						</Link>
						{loginUser?.id !== undefined ? (
							<a
								className={`${styles.shop_by_other_links} ${styles.signOut} main-list-links`}
								onClick={() => {
									deletechatfunc(session, setChatModal, setMessages), signOut({ redirect: false }), push('/'), Cookies.remove('impersonateUserId'), Cookies.remove('dvm_cen_tral_user_id'), setShowByDepts(false), setloginUser({}), setimpersonateUsers({})
								}}
							>
								<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path d='M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4' stroke='var(--new-gray)' strokeWidth='1.5' strokeLinecap='round' />
									<path d='M10 12H20M20 12L17 9M20 12L17 15' stroke='var(--new-gray)' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
								</svg>

								<div>Sign out</div>
							</a>
						) : (
							// <Link href={`/auth/signin`}>
							<a href={`${siteUrl}auth/signin`} className={`${styles.shop_by_other_links} main-list-links`} onClick={() => setShowByDepts(false)}>
								<svg width='800px' height='800px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path d='M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4' stroke='var(--new-gray)' strokeWidth='1.5' strokeLinecap='round' />
									<path d='M4 12H14M14 12L11 9M14 12L11 15' stroke='var(--new-gray)' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
								</svg>

								<div>Sign in</div>
							</a>
							// </Link>
						)}
					</div>
				</div>
				)
			)}
		</div>
	)
}

export default ShopByDeptsLists
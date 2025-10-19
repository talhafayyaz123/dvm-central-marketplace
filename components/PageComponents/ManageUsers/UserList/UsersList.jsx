import React, { useEffect, useRef, useState } from 'react'
import styles from './userlist.module.css'
import profileimg from '../../../../public/imgs/no-profile-img.png'
import { baseApiUrl, imgApiUrl } from '../../../../utils/config'
import { DarkLoader, LiteLoader } from '../../../Loader/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { useContext } from 'react'
import { GlobalProvider } from '../../../../context/AppProvider'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const UsersList = ({ data, hasMoreData, lastPage, sethasMoreData, setlastPage, currentPage, setcurrentPage, setinitialData, positions }) => {
	const [showDropdown, setShowDropdown] = useState(false)
	const [searchLoading, setsearchLoading] = useState(false)
	const [showPositionDropdown, setShowPositionDropdown] = useState(false)
	const [showStatusDropdown, setShowStatusDropdown] = useState(false)
	const [selectedOption, setselectedOption] = useState('Sort By')
	const [isSearchActive, setIsSearchActive] = useState(false)

	const [filterLoading, setfilterLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [impersonateLoadingId, setImpersonateLoadingId] = useState(null)
	const router = useRouter()

	const { setimpersonateUsers, impersonateUsers } = useContext(GlobalProvider)
	const positionRef = useRef('')
	const statusRef = useRef('')
	const searchRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.target.closest(`.${styles.dropdown_wrapper}`) && !event.target.closest(`.${styles.dropdown_container}`)) {
				setShowDropdown(false)
				setShowPositionDropdown(false)
				setShowStatusDropdown(false)
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown)
		setShowPositionDropdown(false)
		setShowStatusDropdown(false)
	}

	const togglePositionDropdown = () => {
		setShowPositionDropdown(!showPositionDropdown)
		setShowStatusDropdown(false)
	}

	const toggleStatusDropdown = () => {
		setShowStatusDropdown(!showStatusDropdown)
		setShowPositionDropdown(false)
	}

	const fetchData = async (page = currentPage + 1, type) => {
		if (type === 'filter') {
			setfilterLoading(true)
		} else if (type === 'search') {
			setsearchLoading(true)
		}

		// setLoading(true)
		const payload = {
			filter: {
				position: positionRef.current,
				verified: statusRef.current
			},
			search: searchRef?.current?.value
		}

		try {
			let res

			// Fetch data based on whether search is active or not
			if (isSearchActive || positionRef.current || statusRef.current) {
				res = await axios.post(`${baseApiUrl}/get-impersonate-users?page=${page}`, payload)
			} else {
				res = await axios.post(`${baseApiUrl}/get-impersonate-users?page=${page}`)
			}

			const { data } = res
			const users = data?.impersonate_users?.data
			const newPage = data?.impersonate_users?.current_page
			const lastPage = data?.impersonate_users?.last_page || 1

			if (page === 1) {
				setinitialData(users)
			} else {
				setinitialData((prev) => [...prev, ...users])
			}

			// Update pagination state
			setcurrentPage(newPage)
			setlastPage(lastPage)
			sethasMoreData(newPage < lastPage)
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			setsearchLoading(false)
			setfilterLoading(false)
		}
	}

	const handleInputChange = async (val) => {
		if (val === '') {
			setIsSearchActive(false)
			setsearchLoading(false)
			setcurrentPage(1)
			setfilterLoading(true)
			await fetchData(1)
		} else {
			setIsSearchActive(true)
		}
	}

	const handleCLick = async () => {
		// setLoading(true)
		setcurrentPage(1)
		setIsSearchActive(true)
		await fetchData(1, 'search')
	}

	const handleKeyDown = async (e) => {
		if (e.key === 'Enter') {
			setcurrentPage(1)
			setIsSearchActive(true)

			await fetchData(1, 'search')
		}
	}
	const handleImpersonate = async (id) => {
		try {
			setImpersonateLoadingId(id)
			const res = await axios.get(`${baseApiUrl}/get-user-details/${id}`)
			console.log('Impersonate Response:', res?.data)

			const userData = res?.data
			setimpersonateUsers(userData)
			router?.push('/')
			// setloginUser(userData)
			Cookies.set('impersonateUserId', userData?.id, { expires: 1 })
			setImpersonateLoadingId(null)
			// setuserData(res.data)
			// getUserData(res.data)
		} catch (error) {
			console.error('Error impersonating user:', error)
			setImpersonateLoadingId(null)
		}
	}

	return (
		<>
			<LiteLoader className={`${filterLoading || searchLoading ? 'show-bd' : 'hide-bd'} ${styles.loader} modal-bg transition`} />
			<InfiniteScroll className={styles.scroller} dataLength={data?.length} next={() => fetchData()} scrollThreshold={0.6} hasMore={hasMoreData} loader={lastPage > 1 && !searchLoading && !filterLoading && <DarkLoader className={styles.pagination_loader} />}>
				<section className={`sec-container`}>
					<div className='inner-sec-pb'>
						<div className={styles.container}>
							{/* <h2 className={styles.title}>Manage Users</h2> */}
							<div className={styles.search_wrapper}>
								<div className={styles.search_container}>
									<input
										ref={searchRef}
										className='gray-border'
										type='search'
										placeholder={`Search User`}
										// value={searchTerm}
										onChange={(e) => handleInputChange(e.target.value)}
										onKeyDown={handleKeyDown}
									/>
									<div className={`${styles.search_wrapper_icon} primary-btn transition`} onClick={handleCLick}>
										{/* {searchLoading ? (
											<LiteLoader />
										) : ( */}
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--white)'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
										</svg>
										{/* )} */}
									</div>
								</div>

								<div className={styles.sort_wrapper}>
									<div className={styles.dropdown_container}>
										<div className={`${styles.dropdown_wrapper} ${showDropdown ? styles.active_view : undefined}`} onClick={toggleDropdown}>
											<div className='match-selected-option mr-2'>{selectedOption}</div>
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000' className='w-3 h-3'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
											</svg>
										</div>
										<ul className={`${styles.dropdown_menu} ${showDropdown ? 'show_menu' : 'hide-menu'}`}>
											{(positionRef?.current || statusRef?.current) && (
												<li
													className={styles.filter_icon}
													onClick={() => {
														positionRef.current = ''
														statusRef.current = ''
														setselectedOption('Sort By')
														setShowDropdown(false)
														setShowPositionDropdown(false)
														setShowStatusDropdown(false)
														fetchData(1, 'filter')
														setStatus('')
													}}
												>
													Clear all
													<svg style={{ width: '15px' }} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='size-6'>
														<path stroke-linecap='round' stroke-linejoin='round' d='M6 18 18 6M6 6l12 12' />
													</svg>
												</li>
											)}
											<li className={styles.filter_icon} onClick={togglePositionDropdown}>
												Position{' '}
												<svg style={{ width: '15px' }} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000' className='w-3 h-3'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
												</svg>
											</li>

											<li className={styles.filter_icon} onClick={toggleStatusDropdown}>
												Status{' '}
												<svg style={{ width: '15px' }} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000' className='w-3 h-3'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
												</svg>
											</li>
										</ul>
									</div>

									{/* Position Dropdown */}
									<div className={`${styles.dropdown_container} ${showPositionDropdown ? styles.active_view : undefined}`}>
										<ul className={`${styles.dropdown_menu} ${styles.dropdown_scroller}  ${showPositionDropdown ? 'show_menu' : 'hide-menu'}`}>
											{positions?.map((position, index) => (
												<li key={index} className={positionRef.current === position ? styles.active_sort : undefined} onClick={() => ((positionRef.current = position), setShowPositionDropdown(false), setIsSearchActive(true), fetchData(1, 'filter'), setselectedOption(position))}>
													{position}
												</li>
											))}
										</ul>
									</div>

									{/* Status Dropdown */}
									<div className={`${styles.dropdown_container} ${showStatusDropdown ? styles.active_view : undefined}`}>
										<ul className={`${styles.dropdown_menu} ${styles.dropdown_scroller_status} ${showStatusDropdown ? 'show_menu' : 'hide-menu'}`}>
											<li onClick={() => ((statusRef.current = 'active' ? true : false), setIsSearchActive(true), fetchData(1, 'filter'), setShowStatusDropdown(false), setStatus(statusRef.current))} className={status == true ? styles.active_sort : undefined}>
												Active
											</li>
											<li onClick={() => ((statusRef.current = 'In active' ? false : true), setIsSearchActive(true), fetchData(1, 'filter'), setShowStatusDropdown(false), setStatus(statusRef.current))} className={status === false ? styles.active_sort : undefined}>
												In active{' '}
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className={styles.tablecontainer}>
								<div className={styles.usertable}>
									<div className={styles.usertableHeader}>
										<div className={styles.id}>ID</div>
										<div className={styles.image}>Image</div>
										<div className={styles.name}>Name</div>
										<div className={styles.email}>Email</div>
										<div className={styles.center}>Position</div>
										<div className={styles.center}>Verified</div>
										<div className={styles.center}>Status</div>
										<div className={styles.center}>Actions</div>
									</div>
									<div className={styles.usertableBody}>
										{data.length == 0 && !filterLoading && !searchLoading ? (
											<div className={styles.no_records_found}>No Records Found</div>
										) : (
											data?.map((user, index) => {
												return (
													user?.email != 'admin@admin.com' && (
														<div className={styles.tablerow} key={`${user.id}-${index}`}>
															<div className={styles.id}>{user.id}</div>

															<ImgWithLoader className={styles.image} width={40} height={40} src={user.vet_dvm_profile_image !== null && user.vet_dvm_profile_image ? `${imgApiUrl?.profileImg}/${user?.vet_dvm_profile_image}` : profileimg} alt={user.first_name} />

															<div className={styles.name}>{`${user?.first_name !== null ? user.first_name : ''} ${user?.last_name !== null ? user.last_name : '---'}`}</div>

															<div className={styles.email}>{user?.email}</div>
															<div className={styles.center}>{user?.position !== null ? user.position : 'N/A'}</div>
															<div className={styles.center}>{user?.email_verified_at !== null ? 'Verified' : 'Unverified'}</div>
															<div className={`${styles.center} 	${user.active == 1 ? styles.activeStatus : styles.inactiveStatus}`}>{user?.active == 1 ? 'Active' : 'Inactive'}</div>
															<div className={styles.center}>
																<button className='primary-btn sml-btn white-color' onClick={() => handleImpersonate(user.id)}>
																	Impersonate
																	{impersonateLoadingId === user.id && <LiteLoader loaderType={'sml'} className={styles.impersonate_loader} />}
																</button>
															</div>
														</div>
													)
												)
											})
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</InfiniteScroll>
		</>
	)
}

export default UsersList

import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { baseApiUrl } from '../../../../../utils/config'
import { DarkLoader } from '../../../../Loader/Loader'
import styles from './RightColContent.module.css'
import Modal from '../../../../UI/Modal/Modal'
import ModalProductDetail from '../../../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import FilterBtnForMob from '../../../../UI/FilterBtnForMob/FilterBtnForMob'
import LeftColContent from '../LeftColContent/LeftColContent'
import NewCard from '../../../../UI/NewCard/NewCard'
import useLocalStorageState from 'use-local-storage-state'

const RightColContent = ({
	initialData,
	setinitialData,
	vendorId,
	sortedValue,
	setsortedValue,
	defaultDataLength,
	resultsWrapper,
	currentPage,
	setcurrentPage,
	lastPage,
	setlastPage,
	hasMoreData,
	sethasMoreData,
	showFilterData,
	categoriesFilter,
	setfilterChanged,
	// showSearchData,
	// setshowSearchData,
	searchVal,
	setshowFilterData,
	searchChanged,
	setsearchChanged,
	// dataNotChanged,
	// setdataNotChanged,
	setproductsLoading,
	filterChanged,
	setcategoriesFilter,
	allCategories,
	totalResults,
	settotalResults,
	loginUser,
	setsearchValue
	// sortedValue
}) => {
	const [showDropdown, setShowDropdown] = useState(false)
	const [selectedOption, setselectedOption] = useState('Sort By')
	const [sortOption, setsortOption] = useLocalStorageState('dvm-sortedOption', { defaultValue: '' })
	const [loading, setloading] = useState(false)

	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	const sortWrapper = useRef(null)
	// const searchReq = useRef(0)

	const router = useRouter()

	const selectOptionHandler = (e) => {
		setsortOption(e.target.innerText)
		let newselectedOption

		if (e.target.innerText === 'Clear Sorting') {
			newselectedOption = ''
		} else if (e.target.innerText === 'Featured') {
			newselectedOption = 'featured'
		} else if (e.target.innerText === 'Best Selling') {
			newselectedOption = 'best_selling'
		} else if (e.target.innerText === 'Alphabetically, A-Z') {
			newselectedOption = 'a_to_z'
		} else if (e.target.innerText === 'Alphabetically, Z-A') {
			newselectedOption = 'z_to_a'
		} else if (e.target.innerText === 'Price, low to high') {
			newselectedOption = 'low_to_high'
		} else if (e.target.innerText === 'Price, high to low') {
			newselectedOption = 'high_to_low'
		} else if (e.target.innerText === 'Date, old to new') {
			newselectedOption = 'old_to_new'
		} else if (e.target.innerText === 'Date, new to old') {
			newselectedOption = 'new_to_old'
		}

		setsortedValue(newselectedOption)
		setselectedOption(e.target.innerText === 'Clear Sorting' ? 'Sort By' : e.target.innerText)

		setsearchValue(true)

		if (showFilterData) {
			// setdataNotChanged(false)
			setsearchChanged(false)
			setfilterChanged(true)
		}
		//  else if (showSearchData) {
		// 	setdataNotChanged(false)
		// 	setsearchChanged(true)
		// 	setfilterChanged(false)
		// }
		else {
			// setdataNotChanged(true)
			// setsearchChanged(false)
			setfilterChanged(true)
		}

		setShowDropdown(false)
	}

	// const sortingHandler = async () => {
	// 	setproductsLoading(true)
	// 	const data = {
	// 		vendor_id: vendorId,
	// 		sort_type: sortedValue
	// 	}
	// 	const res = await axios.post(`${baseApiUrl}/vendors/sort-product`, data)
	// 	console.log('res from only sorting', res)
	// 	setinitialData(res?.data?.data?.all_products?.data)
	// 	setcurrentPage(res?.data?.data?.all_products?.current_page)
	// 	setlastPage(res?.data?.data?.all_products?.last_page)
	// 	settotalResults(res?.data?.data?.all_products?.total)

	// 	setproductsLoading(false)
	// 	setsearchChanged(false)
	// 	setfilterChanged(false)
	// }

	// useEffect(() => {
	// 	dataNotChanged && sortingHandler()
	// }, [selectedOption, dataNotChanged])

	// const searchHandler = async () => {
	// 	const currentReq = ++searchReq.current
	// 	setproductsLoading(true)
	// 	const res = await axios.get(`${baseApiUrl}/vendor-store-search?vendor_id=${vendorId}&search=${searchVal?.current?.value}&sort_type=${sortedValue}`, {
	// 		headers: {
	// 			type: loginUser?.id
	// 		}
	// 	})

	// 	if (currentReq === searchReq.current) {
	// 		let productsData
	// 		if (searchVal?.current?.value === '') {
	// 			productsData = res?.data?.data?.all_products?.data
	// 			setcurrentPage(res?.data?.data?.all_products?.current_page)
	// 			setlastPage(res?.data?.data?.all_products?.last_page)
	// 			settotalResults(res?.data?.data?.all_products?.total)

	// 			if (res?.data?.data?.all_products?.data?.length > 0) {
	// 				sethasMoreData(true)
	// 			} else sethasMoreData(false)
	// 			if (productsData === undefined) {
	// 				productsData = res?.data?.data?.all_products?.data
	// 				setcurrentPage(res?.data?.data?.all_products?.current_page)
	// 				setlastPage(res?.data?.data?.all_products?.last_page)
	// 				settotalResults(res?.data?.data?.all_products?.total)
	// 			}
	// 		} else {
	// 			productsData = res?.data?.data?.all_products?.data
	// 			setcurrentPage(res?.data?.data?.all_products?.current_page)
	// 			setlastPage(res?.data?.data?.all_products?.last_page)
	// 			settotalResults(res?.data?.data?.all_products?.total)

	// 			if (res?.data?.data?.all_products?.data?.length > 0) {
	// 				sethasMoreData(true)
	// 			} else sethasMoreData(false)
	// 		}

	// 		await setinitialData(productsData)
	// 		setshowSearchData(true)
	// 		setshowFilterData(false)
	// 		// setdataNotChanged(false)
	// 	}

	// 	setproductsLoading(false)
	// }

	useEffect(() => {
		searchChanged && setsearchValue(true)
	}, [searchChanged, selectedOption])

	const fetchData = async () => {
		// if search is active
		// if (showSearchData) {
		// 	const res = await axios.get(`${baseApiUrl}/vendor-store-search?vendor_id=${vendorId}&search=${searchVal?.current?.value}&sort_type=${sortedValue}&page=${currentPage + 1}`, {
		// 		headers: {
		// 			type: loginUser?.id
		// 		}
		// 	})

		// 	let productsData
		// 	if (searchVal?.current?.value === '') {
		// 		productsData = [...initialData, ...res?.data?.data?.all_products.data]
		// 		setcurrentPage(res?.data?.data?.all_products?.current_page)
		// 		setlastPage(res?.data?.data?.all_products?.last_page)
		// 		settotalResults(res?.data?.data?.all_products?.total)

		// 		if (res?.data?.data?.all_products?.data?.length > 0) {
		// 			sethasMoreData(true)
		// 		} else sethasMoreData(false)
		// 	} else {
		// 		productsData = [...initialData, ...res?.data?.data?.all_products?.data]
		// 		setcurrentPage(res?.data?.data?.all_products?.current_page)
		// 		setlastPage(res?.data?.data?.all_products?.last_page)
		// 		settotalResults(res?.data?.data?.all_products?.total)

		// 		if (res?.data?.data?.all_products?.data?.length > 0) {
		// 			sethasMoreData(true)
		// 		} else sethasMoreData(false)
		// 	}

		// 	await setinitialData(productsData)
		// }
		if (showFilterData || sortedValue || searchVal?.current?.value) {
			// if filter is active
			const data = {
				vendor_id: vendorId,
				category_ids: categoriesFilter,
				sort_type: sortedValue,
				search: searchVal?.current?.value
			}
			const res = await axios.post(`${baseApiUrl}/vendors/filter-product?page=${currentPage + 1}`, data, {
				headers: {
					type: loginUser?.id
				}
			})

			setinitialData((prev) => [...prev, ...res?.data?.data?.vendors_all_products?.data])
			setcurrentPage(res?.data?.data?.vendors_all_products?.current_page)
			setlastPage(res?.data?.data?.vendors_all_products?.last_page)
			settotalResults(res?.data?.data?.vendors_all_products?.total)

			if (res?.data?.data?.vendors_all_products?.data?.length > 0) {
				sethasMoreData(true)
			} else sethasMoreData(false)
		}
		// else if (dataNotChanged) {
		// if neither filter is active nor search is active and only sorting is active with default page data

		// 	const data = {
		// 		vendor_id: vendorId,
		// 		sort_type: sortedValue
		// 	}
		// 	const res = await axios.post(`${baseApiUrl}/vendors/sort-product?page=${currentPage + 1}`, data)

		// 	setinitialData((prev) => [...prev, ...res?.data?.data?.all_products?.data])
		// 	setcurrentPage(res?.data?.data?.all_products?.current_page)
		// 	setlastPage(res?.data?.data?.all_products?.last_page)
		// 	if (res?.data?.data?.all_products?.data?.length > 0) {
		// 		sethasMoreData(true)
		// 	} else sethasMoreData(false)
		// }
		else {
			// default page data without sorting option
			const res = await axios.get(`${baseApiUrl}${router?.asPath}?page=${currentPage + 1}`, {
				headers: {
					type: loginUser?.id
				}
			})

			setinitialData((prev) => [...prev, ...res?.data?.data?.vendors_all_products?.data])
			setcurrentPage(res?.data?.data?.vendors_all_products?.current_page)
			setlastPage(res?.data?.data?.vendors_all_products?.last_page)
			if (res?.data?.data?.vendors_all_products?.data?.length > 0) {
				sethasMoreData(true)
			} else sethasMoreData(false)
		}
	}

	if (typeof window !== 'undefined') {
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showDropdown) {
				if (!sortWrapper?.current?.contains(e.target)) {
					setShowDropdown(false)
				}
			} else return
		})
	}

	useEffect(() => {
		if (sortedValue !== '' && sortedValue !== null) {
			setselectedOption(sortOption)
			setsortedValue(sortedValue)
			setsearchValue(true)
		}
	}, [sortedValue])

	return (
		<>
			<InfiniteScroll
				className={styles.scroller}
				dataLength={initialData?.length}
				next={fetchData}
				scrollThreshold={0.6}
				hasMore={hasMoreData}
				loader={lastPage > 1 && <DarkLoader className={styles.pagination_loader} />}
				// endMessage={
				// 	initialData?.length > 0 &&
				// 	lastPage > 1 && (
				// 		<p style={{ textAlign: 'center' }} className={`${styles.pagination_loader} red-color`}>
				// 			Sorry, no more product is available this time...
				// 		</p>
				// 	)
				// }
			>
				<div ref={resultsWrapper} className={styles.title_wrapper}>
					<div className={styles.result_num_inner_wrapper}>
						<div>
							<h1 className={`${styles.title} semibold-text`}>All Products</h1>
							{totalResults !== undefined && (
								<span>
									{totalResults} Result{totalResults > 1 ? 's' : ''}
								</span>
							)}
						</div>

						<FilterBtnForMob className={styles.mob_filter_btn}>
							<LeftColContent
								categoriesFilter={categoriesFilter}
								filterChanged={filterChanged}
								setfilterChanged={setfilterChanged}
								setcategoriesFilter={setcategoriesFilter}
								setcurrentPage={setcurrentPage}
								setlastPage={setlastPage}
								setshowFilterData={setshowFilterData}
								sethasMoreData={sethasMoreData}
								allCategories={allCategories}
								setinitialData={setinitialData}
								vendorId={vendorId}
								setproductsLoading={setproductsLoading}
								resultsWrapper={resultsWrapper}
								sortedValue={sortedValue}
								// setshowSearchData={setshowSearchData}
								loginUser={loginUser}
							/>
						</FilterBtnForMob>
					</div>

					{defaultDataLength > 0 && (
						<>
							<div className={styles.search_sort_wrapper}>
								<div className={`${styles.input_wrapper} gray-border`}>
									<input
										ref={searchVal}
										className='gray-color'
										type='search'
										placeholder='Search in store'
										onKeyDown={(e) => {
											if (searchVal?.current?.value !== '' && e.key === 'Enter') {
												// searchHandler()
												setsearchValue(true)
											}
										}}
										onChange={() => {
											if (searchVal?.current?.value === '') {
												// searchHandler()
												setsearchValue(true)
											}
										}}
									/>
									{loading ? (
										<DarkLoader loaderType='sml' className={styles.loader} />
									) : (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='var(--gray-icon)'
											style={{ cursor: 'pointer' }}
											onClick={() =>
												searchVal?.current?.value !== '' &&
												//  searchHandler()
												setsearchValue(true)
											}
										>
											<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
										</svg>
									)}
								</div>

								<div ref={sortWrapper} className={styles.sort_wrapper}>
									<div className={styles.dropdown_container}>
										<div className={`${styles.dropdown_wrapper} ${showDropdown ? styles.active_view : undefined}`} onClick={() => setShowDropdown(!showDropdown)}>
											<div className='match-selected-option'>{selectedOption}</div>
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000' className='w-3 h-3'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
											</svg>
										</div>
										<ul className={`${styles.dropdown_menu} ${showDropdown ? 'show_menu' : 'hide-menu'}`}>
											{sortedValue !== '' && <li onClick={(e) => selectOptionHandler(e)}>Clear Sorting</li>}
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Featured' ? styles.active_sort : undefined}>
												Featured
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Best Selling' ? styles.active_sort : undefined}>
												Best Selling
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Alphabetically, A-Z' ? styles.active_sort : undefined}>
												Alphabetically, A-Z
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Alphabetically, Z-A' ? styles.active_sort : undefined}>
												Alphabetically, Z-A
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Price, low to high' ? styles.active_sort : undefined}>
												Price, low to high
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Price, high to low' ? styles.active_sort : undefined}>
												Price, high to low
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Date, old to new' ? styles.active_sort : undefined}>
												Date, old to new
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Date, new to old' ? styles.active_sort : undefined}>
												Date, new to old
											</li>
										</ul>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
				{initialData?.length > 0 ? (
					<div className={`${styles.wrapper} inner-sec-mt ${defaultDataLength == 0 ? styles.single_col : undefined}`}>
						{initialData?.map((data, index) => {
							return <NewCard key={index} data={data} setmodal={setmodal} setModalData={setModalData} initialData={initialData} setmodalLoading={setproductsLoading} currentData={initialData} />
							// return <DealsCard key={index} data={data} setmodal={setmodal} setModalData={setModalData} initialData={initialData} />
						})}
					</div>
				) : (
					<div className='red-color' style={{ marginTop: '1rem' }}>
						No product found, revise your search...
					</div>
				)}
			</InfiniteScroll>

			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>
		</>
	)
}

export default RightColContent

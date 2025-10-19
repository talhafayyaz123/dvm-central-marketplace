import React, { useContext, useEffect, useRef, useState } from 'react'
import { GlobalProvider } from '../../../../context/AppProvider'
import styles from './AllSearchResults.module.css'
import Modal from '../../../UI/Modal/Modal'
import ModalProductDetail from '../../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import InfiniteScroll from 'react-infinite-scroll-component'
import { DarkLoader, LiteLoader } from '../../../Loader/Loader'
import { baseApiUrl } from '../../../../utils/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import ListingLayout from '../../../UI/ListingLayout/ListingLayout'
import RigthCol from '../../../UI/ListingLayout/RigthCol/RightCol'
import LeftCol from '../../../UI/ListingLayout/LeftCol/LeftCol'
import FilterAccordion from '../../../UI/FilterAccordion/FilterAccordion'
import CustomCheckbox from '../../../UI/CustomCheckbox/CustomCheckbox'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'
import { scrollToData } from '../../../../utils/scrollTo'
import FilterBtnForMob from '../../../UI/FilterBtnForMob/FilterBtnForMob'
import NewCard from '../../../UI/NewCard/NewCard'
import useLocalStorageState from 'use-local-storage-state'
let gsap, ScrollToPlugin

const AllSearchResults = ({ result }) => {
	const { vendor_list, brands_list, categories_ids, availability, speciality } = result
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	// categories
	const [inputFocus, setinputFocus] = useState(false)
	const [searchVal, setsearchVal] = useState('')
	const [noData, setnoData] = useState(false)

	// vendors
	const [vendorsInputFocus, setvendorsInputFocus] = useState(false)
	const [vendorsSearch, setvendorsSearch] = useState('')
	const [vendorsNoData, setvendorsNoData] = useState(false)

	// brand
	const [brandInputFocus, setbrandInputFocus] = useState(false)
	const [brandSearch, setbrandSearch] = useState('')
	const [brandNoData, setbrandNoData] = useState(false)

	// availability
	const [availInputFocus, setavailInputFocus] = useState(false)
	const [availSearch, setavailSearch] = useState('')
	const [availNoData, setavailNoData] = useState(false)

	// special
	const [specialInputFocus, setspecialInputFocus] = useState(false)
	const [specialSearch, setspecialSearch] = useState('')
	const [specialNoData, setspecialNoData] = useState(false)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	const { setshowSearchResults } = useContext(GlobalProvider)

	const [currentData, setcurrentData] = useState(result?.products?.data)
	const [currentPage, setcurrentPage] = useState(result?.products?.current_page)
	const [lastPage, setlastPage] = useState(result?.products?.last_page)
	const [hasMoreData, sethasMoreData] = useState(true)

	const [categoriesFilter, setcategoriesFilter] = useLocalStorageState('dvm-categoriesFilter', { defaultValue: [] })
	const [vendorFilter, setvendorFilter] = useLocalStorageState('dvm-vendorFilter', { defaultValue: [] })
	const [brandFilter, setbrandFilter] = useLocalStorageState('dvm-brandFilter', { defaultValue: [] })
	const [priceFilter, setpriceFilter] = useLocalStorageState('dvm-priceFilter', { defaultValue: [] })
	const [availabilityFilter, setavailabilityFilter] = useLocalStorageState('dvm-availabilityFilter', { defaultValue: [] })
	const [specialityFilter, setspecialityFilter] = useLocalStorageState('dvm-specialityFilter', { defaultValue: [] })
	const [filterChange, setfilterChange] = useState(false)

	const [filterLoading, setfilterLoading] = useState(false)

	const [totalResults, settotalResults] = useState(result?.products?.total)
	const [showFilterData, setshowFilterData] = useLocalStorageState('dvm-showSearchFilterData', { defaultValue: false })

	const router = useRouter()

	const { loginUser } = useContext(GlobalProvider)

	const resultWrapper = useRef(null)

	const fetchData = async () => {
		if (!showFilterData) {
			const res = await axios.get(`${baseApiUrl}${router?.asPath}?page=${currentPage + 1}`, {
				headers: {
					type: loginUser?.id
				}
			})
			console.log('res from pagi', res)

			setcurrentData((prev) => [...prev, ...res?.data?.products?.data])
			setcurrentPage(res?.data?.products?.current_page)
			setlastPage(res?.data?.products?.last_page)
			if (res?.data?.products?.data?.length > 0) {
				sethasMoreData(true)
			} else sethasMoreData(false)
		} else {
			const data = {
				vendor: vendorFilter,
				brand: brandFilter,
				prices: priceFilter,
				categories_ids: categoriesFilter,
				availability: availabilityFilter,
				speciality: specialityFilter,
				keyword: result?.searchFor,
				customer_id: loginUser?.id
			}
			const res = await axios.post(`${baseApiUrl}/all-search-results/filter?page=${currentPage + 1}`, data, {
				headers: {
					type: loginUser?.id
				}
			})
			console.log('res from filter pagin', res)
			setcurrentData((prev) => [...prev, ...res?.data?.products?.data])
			setcurrentPage(res?.data?.products?.current_page)
			setlastPage(res?.data?.products?.last_page)
			if (res?.data?.products?.data?.length > 0) {
				sethasMoreData(true)
			} else sethasMoreData(false)
		}
	}

	useEffect(() => {
		setshowSearchResults(false)
	}, [])

	// filter funcs
	const allUnchekHandler = async () => {
		setfilterLoading(true)
		let allCheckboxes = document.querySelectorAll('.checkbox')
		allCheckboxes.forEach((box) => {
			if (box.checked) {
				box.checked = false
			} else return
		})
		clearAllData()
		// if (searchVal.length > 0 || vendorsSearch.length > 0 || brandSearch.length > 0 || availSearch.length > 0 || specialSearch.length > 0) {
		// 	clearAllData()
		// }
		setfilterLoading(false)
	}

	const clearAllData = () => {
		setshowFilterData(false)
		setcategoriesFilter([])
		setvendorFilter([])
		setbrandFilter([])
		setpriceFilter([])
		setavailabilityFilter([])
		setspecialityFilter([])
		setcurrentPage()
		setlastPage()
		setfilterChange(true)
		setsearchVal('')
		setvendorsSearch('')
		setbrandSearch('')
		setavailSearch('')
		setspecialSearch('')
		setnoData(false)
		setvendorsNoData(false)
		setbrandNoData(false)
		setavailNoData(false)
		setspecialNoData(false)
	}

	const categoriesClickHandler = (val) => {
		let filterCat = categoriesFilter.filter((catArr) => catArr === val)
		if (filterCat.length == 0) {
			const newData = [...categoriesFilter, val]
			setcategoriesFilter(newData)
		} else {
			setcategoriesFilter(() => categoriesFilter.filter((category) => category !== val))
		}
		setfilterChange(true)
	}

	const vendorClickHandler = (val) => {
		let filterBrand = vendorFilter.filter((brArr) => brArr === val)

		if (filterBrand.length == 0) {
			setvendorFilter([...vendorFilter, val])
		} else {
			setvendorFilter(() => vendorFilter.filter((vendor) => vendor !== val))
		}
		setfilterChange(true)
	}

	const brandClickHandler = (val) => {
		let filterBrand = brandFilter.filter((brArr) => brArr === val)

		if (filterBrand.length == 0) {
			setbrandFilter([...brandFilter, val])
		} else {
			setbrandFilter(() => brandFilter.filter((brand) => brand !== val))
		}
		setfilterChange(true)
	}

	const availabilityHandler = (val) => {
		let filterAvailability = availabilityFilter.filter((avail) => avail === val)

		if (filterAvailability.length == 0) {
			setavailabilityFilter([...availabilityFilter, val])
		} else {
			setavailabilityFilter(() => availabilityFilter.filter((vendor) => vendor !== val))
		}
		setfilterChange(true)
	}

	const specialityHandler = (val) => {
		let filterSpeciality = specialityFilter.filter((speciality) => speciality === val)

		if (filterSpeciality.length == 0) {
			setspecialityFilter([...specialityFilter, val])
		} else {
			setspecialityFilter(() => specialityFilter.filter((vendor) => vendor !== val))
		}
		setfilterChange(true)
	}

	const priceClickHandler = (val, type) => {
		setpriceFilter(type === 'less than 100' ? ['0', '100'] : [val.slice(0, 3), val.slice(4, 7)])
		setfilterChange(true)
	}

	const filterHandler = async () => {
		setfilterLoading(true)
		lockScroll()

		const data = {
			vendor: vendorFilter,
			brand: brandFilter,
			prices: priceFilter,
			categories_ids: categoriesFilter,
			availability: availabilityFilter,
			speciality: specialityFilter,
			keyword: result?.searchFor,
			customer_id: loginUser?.id
		}

		console.log('filter data', data)

		const res = await axios.post(`${baseApiUrl}/all-search-results/filter`, data)
		console.log('res from filter', res)

		setcurrentData([...res?.data?.products?.data])
		setcurrentPage(res?.data?.products?.current_page)
		setlastPage(res?.data?.products?.last_page)
		settotalResults(res?.data?.products?.total)
		setshowFilterData(true)

		if (res?.data?.products?.data?.length > 0) {
			sethasMoreData(true)
		} else sethasMoreData(false)
		setfilterLoading(false)
		unlockScroll()
		if (gsap === undefined) {
			gsap = (await import('gsap')).default
			ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

			gsap.registerPlugin(ScrollToPlugin)
		}

		scrollToData(gsap, resultWrapper?.current, 100)
	}

	useEffect(() => {
		if (filterChange || categoriesFilter?.length > 0 || vendorFilter?.length > 0 || brandFilter?.length > 0 || priceFilter?.length > 0 || availabilityFilter?.length > 0 || specialityFilter?.length > 0) {
			filterHandler()
		}
	}, [categoriesFilter, vendorFilter, brandFilter, priceFilter, filterChange, availabilityFilter, specialityFilter, showFilterData])

	const searchHandler = async (val, type) => {
		let noDataFound = await (type === 'cat' || type === 'vendor' || type === 'brand'
			? (type === 'cat' ? categories_ids : type === 'vendor' ? vendor_list : type === 'brand' && brands_list)?.filter((search) => search?.name?.toLowerCase().includes(val.toLowerCase()))
			: (type === 'avail' ? availability : type === 'special' && speciality).filter((search) => Object.values(search)[0]?.toLowerCase()?.includes(val?.toLowerCase())))

		if (noDataFound?.length === 0) {
			type === 'cat' ? setnoData(true) : type === 'vendor' ? setvendorsNoData(true) : type === 'brand' ? setbrandNoData(true) : type === 'avail' ? setavailNoData(true) : type === 'special' && setspecialNoData(true)
		} else {
			type === 'cat' ? setnoData(false) : type === 'vendor' ? setvendorsNoData(false) : type === 'brand' ? setbrandNoData(false) : type === 'avail' ? setavailNoData(false) : type === 'special' && setspecialNoData(false)
		}
	}

	return (
		<>
			<LiteLoader className={`modal-bg transition ${filterLoading ? 'show-bd' : 'hide-bd'} ${styles.filter_loading}`} />
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>

			{/* <section className={`${styles.main_wrapper} inner-sec-mt inner-sec-pb`}>
				<div className='sec-container'> */}
			<ListingLayout>
				<LeftCol className={styles.left_col}>
					<>
						<div className={styles.wrapper}>
							<h5>Filter Results</h5>
							<button onClick={() => allUnchekHandler()}>Clear All</button>
						</div>

						{/* categories filter */}
						{categories_ids?.length > 0 && (
							<FilterAccordion title='Categories' className={styles.category_filters}>
								{categories_ids?.length > 10 && (
									<div className={`${inputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setinputFocus} onBlur={() => setinputFocus(false)} tabIndex={0}>
										<input type='search' className={styles.input} placeholder='Search Category' value={searchVal} onChange={(e) => (setsearchVal(e.target.value), searchHandler(e.target.value, 'cat'))} />
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
										</svg>
									</div>
								)}
								{categories_ids
									?.filter((search) => {
										if (searchVal === '') {
											return search
										} else if (search?.name?.toLowerCase()?.includes(searchVal?.toLowerCase())) {
											return search
										}
									})
									?.map((category) => {
										const { name, id } = category
										const isChecked = categoriesFilter?.includes(id?.toString())
										return <CustomCheckbox type='checkbox' checked={isChecked} key={id} name='categories' labeltitle={name} value={id} onChange={(e) => categoriesClickHandler(e?.target?.value)} />
									})}
								{noData && <div className={`${styles.no_data} red-color`}>No category found...</div>}
							</FilterAccordion>
						)}

						{/* vendors filter */}
						{vendor_list?.length > 0 && (
							<FilterAccordion title='Vendors' className={styles.brands_filters}>
								{vendor_list?.length > 10 && (
									<div className={`${vendorsInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setvendorsInputFocus} onBlur={() => setvendorsInputFocus(false)} tabIndex={0}>
										<input type='search' className={styles.input} placeholder='Search Vendor' value={vendorsSearch} onChange={(e) => (setvendorsSearch(e.target.value), searchHandler(e.target.value, 'vendor'))} />
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
										</svg>
									</div>
								)}
								{vendor_list
									?.filter((search) => {
										if (vendorsSearch === '') {
											return search
										} else if (search?.name?.toLowerCase()?.includes(vendorsSearch?.toLowerCase())) {
											return search
										}
									})
									?.map((vendor) => {
										const { name, id } = vendor
										const isChecked = vendorFilter?.includes(id?.toString())
										return <CustomCheckbox type='checkbox' checked={isChecked} key={id} name='vendor' labeltitle={name} value={id} onChange={(e) => vendorClickHandler(e?.target?.value)} />
									})}
								{vendorsNoData && <div className={`${styles.no_data} red-color`}>No vendor found...</div>}
							</FilterAccordion>
						)}

						{/* brands filter */}
						{brands_list?.length > 0 && (
							<FilterAccordion title='Brands' className={styles.brands_filters}>
								{brands_list?.length > 10 && (
									<div className={`${brandInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setbrandInputFocus} onBlur={() => setbrandInputFocus(false)} tabIndex={0}>
										<input type='search' className={styles.input} placeholder='Search Brand' value={brandSearch} onChange={(e) => (setbrandSearch(e.target.value), searchHandler(e.target.value, 'brand'))} />
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
										</svg>
									</div>
								)}
								{brands_list
									?.filter((search) => {
										if (brandSearch === '') {
											return search
										} else if (search?.name?.toLowerCase()?.includes(brandSearch?.toLowerCase())) {
											return search
										}
									})
									?.map((brand) => {
										const { name, id } = brand
										const isChecked = brandFilter?.includes(name?.toString())
										return <CustomCheckbox type='checkbox' checked={isChecked} key={id} name='brand' labeltitle={name} value={name} onChange={(e) => brandClickHandler(e?.target?.value)} />
									})}
								{brandNoData && <div className={`${styles.no_data} red-color`}>No brand found...</div>}
							</FilterAccordion>
						)}

						{/* availability filter */}
						{availability?.length > 0 && (
							<FilterAccordion title='Availability' className={styles.brands_filters}>
								{availability?.length > 10 && (
									<div className={`${availInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setavailInputFocus} onBlur={() => setavailInputFocus(false)} tabIndex={0}>
										<input type='search' className={styles.input} placeholder='Search Availability' value={availSearch} onChange={(e) => (setavailSearch(e.target.value), searchHandler(e.target.value, 'avail'))} />
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
										</svg>
									</div>
								)}
								{availability
									?.filter((search) => {
										if (availSearch === '') {
											return search
										} else if (Object.values(search)[0]?.toLowerCase()?.includes(availSearch?.toLowerCase())) {
											return search
										}
									})
									?.map((avail, i) => {
										const isChecked = availabilityFilter.includes(Object.keys(avail)[0])
										return <CustomCheckbox type='checkbox' checked={isChecked} key={i} name='availability' labeltitle={Object.values(avail)[0]} value={Object.keys(avail)[0]} onChange={(e) => availabilityHandler(e?.target?.value)} />
									})}
								{availNoData && <div className={`${styles.no_data} red-color`}>No availability found...</div>}
							</FilterAccordion>
						)}

						{/* speciality filter */}
						{speciality?.length > 0 && (
							<FilterAccordion title='Speciality' className={styles.brands_filters}>
								{speciality?.length > 10 && (
									<div className={`${specialInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setspecialInputFocus} onBlur={() => setspecialInputFocus(false)} tabIndex={0}>
										<input type='search' className={styles.input} placeholder='Search Speciality' value={specialSearch} onChange={(e) => (setspecialSearch(e.target.value), searchHandler(e.target.value, 'special'))} />
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
										</svg>
									</div>
								)}
								{speciality
									?.filter((search) => {
										if (specialSearch === '') {
											return search
										} else if (Object.values(search)[0]?.toLowerCase()?.includes(specialSearch?.toLowerCase())) {
											return search
										}
									})
									?.map((special, i) => {
										const isChecked = specialityFilter.includes(Object.keys(special)[0])
										return Object.keys(special)[0] !== 'fav_item' ? (
											<CustomCheckbox type='checkbox' checked={isChecked} key={i} name='Speciality' labeltitle={Object.values(special)[0]} value={Object.keys(special)[0]} onChange={(e) => specialityHandler(e?.target?.value)} />
										) : (
											loginUser?.id !== undefined && <CustomCheckbox type='checkbox' checked={isChecked} key={i} name='Speciality' labeltitle={Object.values(special)[0]} value={Object.keys(special)[0]} onChange={(e) => specialityHandler(e?.target?.value)} />
										)
									})}
								{specialNoData && <div className={`${styles.no_data} red-color`}>No speciality found...</div>}
							</FilterAccordion>
						)}

						{/* price filter */}
						<FilterAccordion title='Price' className={styles.prices_filters}>
							<>
								<CustomCheckbox labeltitle='Less than $100' name='price-filters' value='0-100' type='radio' radioChecked={priceFilter[0] === '0'} onChange={(e) => priceClickHandler(e.target.value, 'less than 100')} />
								<CustomCheckbox labeltitle='$100 - $200' name='price-filters' value='100-200' radioChecked={priceFilter[0] === '100'} type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
								<CustomCheckbox labeltitle='$200 - $400' name='price-filters' value='200-400' radioChecked={priceFilter[0] === '200'} type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
								<CustomCheckbox labeltitle='$400 - $600' name='price-filters' radioChecked={priceFilter[0] === '400'} value='400-600' type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
								<CustomCheckbox labeltitle='$600 +' name='price-filters' radioChecked={priceFilter[0] === '600'} value='600' type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
							</>
						</FilterAccordion>
					</>
				</LeftCol>
				<RigthCol>
					<div className={styles.name_filter_btn}>
						<div className={styles.title}>
							<h1 ref={resultWrapper} className={`${styles.heading} semibold-text black-color`}>
								{`Search Results for`} <span>{result?.searchFor}</span>
							</h1>
							<div className={styles.results}>
								{totalResults} Result{totalResults > 1 ? 's' : ''}
							</div>
						</div>
						<FilterBtnForMob className={`white-bg ${styles.filter_btn}`}>
							<>
								<div className={styles.wrapper}>
									<h5>Filter Results</h5>
									<button onClick={() => allUnchekHandler()}>Clear All</button>
								</div>

								{/* categories filter */}
								{categories_ids?.length > 0 && (
									<FilterAccordion title='Categories' className={styles.category_filters}>
										{categories_ids?.length > 10 && (
											<div className={`${inputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setinputFocus} onBlur={() => setinputFocus(false)} tabIndex={0}>
												<input type='search' className={styles.input} placeholder='Search Category' value={searchVal} onChange={(e) => (setsearchVal(e.target.value), searchHandler(e.target.value, 'cat'))} />
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
												</svg>
											</div>
										)}
										{categories_ids
											?.filter((search) => {
												if (searchVal === '') {
													return search
												} else if (search?.name?.toLowerCase()?.includes(searchVal?.toLowerCase())) {
													return search
												}
											})
											?.map((category) => {
												const { name, id } = category
												const isChecked = categoriesFilter?.includes(id?.toString())
												return <CustomCheckbox type='checkbox' checked={isChecked} key={id} name='categories' labeltitle={name} value={id} onChange={(e) => categoriesClickHandler(e?.target?.value)} />
											})}
										{noData && <div className={`${styles.no_data} red-color`}>No category found...</div>}
									</FilterAccordion>
								)}

								{/* vendors filter */}
								{vendor_list?.length > 0 && (
									<FilterAccordion title='Vendors' className={styles.brands_filters}>
										{vendor_list?.length > 10 && (
											<div className={`${vendorsInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setvendorsInputFocus} onBlur={() => setvendorsInputFocus(false)} tabIndex={0}>
												<input type='search' className={styles.input} placeholder='Search Vendor' value={vendorsSearch} onChange={(e) => (setvendorsSearch(e.target.value), searchHandler(e.target.value, 'vendor'))} />
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
												</svg>
											</div>
										)}
										{vendor_list
											?.filter((search) => {
												if (vendorsSearch === '') {
													return search
												} else if (search?.name?.toLowerCase()?.includes(vendorsSearch?.toLowerCase())) {
													return search
												}
											})
											?.map((vendor) => {
												const { name, id } = vendor
												const isChecked = vendorFilter?.includes(id?.toString())
												return <CustomCheckbox type='checkbox' checked={isChecked} key={id} name='vendor' labeltitle={name} value={id} onChange={(e) => vendorClickHandler(e?.target?.value)} />
											})}
										{vendorsNoData && <div className={`${styles.no_data} red-color`}>No vendor found...</div>}
									</FilterAccordion>
								)}

								{/* brands filter */}
								{brands_list?.length > 0 && (
									<FilterAccordion title='Brands' className={styles.brands_filters}>
										{brands_list?.length > 10 && (
											<div className={`${brandInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setbrandInputFocus} onBlur={() => setbrandInputFocus(false)} tabIndex={0}>
												<input type='search' className={styles.input} placeholder='Search Brand' value={brandSearch} onChange={(e) => (setbrandSearch(e.target.value), searchHandler(e.target.value, 'brand'))} />
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
												</svg>
											</div>
										)}
										{brands_list
											?.filter((search) => {
												if (brandSearch === '') {
													return search
												} else if (search?.name?.toLowerCase()?.includes(brandSearch?.toLowerCase())) {
													return search
												}
											})
											?.map((brand) => {
												const { name, id } = brand
												const isChecked = brandFilter?.includes(name?.toString())
												return <CustomCheckbox type='checkbox' checked={isChecked} key={id} name='brand' labeltitle={name} value={name} onChange={(e) => brandClickHandler(e?.target?.value)} />
											})}
										{brandNoData && <div className={`${styles.no_data} red-color`}>No brand found...</div>}
									</FilterAccordion>
								)}

								{/* availability filter */}
								{availability?.length > 0 && (
									<FilterAccordion title='Availability' className={styles.brands_filters}>
										{availability?.length > 10 && (
											<div className={`${availInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setavailInputFocus} onBlur={() => setavailInputFocus(false)} tabIndex={0}>
												<input type='search' className={styles.input} placeholder='Search Availability' value={availSearch} onChange={(e) => (setavailSearch(e.target.value), searchHandler(e.target.value, 'avail'))} />
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
												</svg>
											</div>
										)}
										{availability
											?.filter((search) => {
												if (availSearch === '') {
													return search
												} else if (Object.values(search)[0]?.toLowerCase()?.includes(availSearch?.toLowerCase())) {
													return search
												}
											})
											?.map((avail, i) => {
												const isChecked = availabilityFilter.includes(Object.keys(avail)[0])
												return <CustomCheckbox type='checkbox' checked={isChecked} key={i} name='availability' labeltitle={Object.values(avail)[0]} value={Object.keys(avail)[0]} onChange={(e) => availabilityHandler(e?.target?.value)} />
											})}
										{availNoData && <div className={`${styles.no_data} red-color`}>No availability found...</div>}
									</FilterAccordion>
								)}

								{/* speciality filter */}
								{speciality?.length > 0 && (
									<FilterAccordion title='Speciality' className={styles.brands_filters}>
										{speciality?.length > 10 && (
											<div className={`${specialInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setspecialInputFocus} onBlur={() => setspecialInputFocus(false)} tabIndex={0}>
												<input type='search' className={styles.input} placeholder='Search Speciality' value={specialSearch} onChange={(e) => (setspecialSearch(e.target.value), searchHandler(e.target.value, 'special'))} />
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
													<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
												</svg>
											</div>
										)}
										{speciality
											?.filter((search) => {
												if (specialSearch === '') {
													return search
												} else if (Object.values(search)[0]?.toLowerCase()?.includes(specialSearch?.toLowerCase())) {
													return search
												}
											})
											?.map((special, i) => {
												const isChecked = specialityFilter.includes(Object.keys(special)[0])
												return Object.keys(special)[0] !== 'fav_item' ? (
													<CustomCheckbox type='checkbox' checked={isChecked} key={i} name='Speciality' labeltitle={Object.values(special)[0]} value={Object.keys(special)[0]} onChange={(e) => specialityHandler(e?.target?.value)} />
												) : (
													loginUser?.id !== undefined && <CustomCheckbox type='checkbox' checked={isChecked} key={i} name='Speciality' labeltitle={Object.values(special)[0]} value={Object.keys(special)[0]} onChange={(e) => specialityHandler(e?.target?.value)} />
												)
											})}
										{specialNoData && <div className={`${styles.no_data} red-color`}>No speciality found...</div>}
									</FilterAccordion>
								)}

								{/* price filter */}
								<FilterAccordion title='Price' className={styles.prices_filters}>
									<>
										{' '}
										<CustomCheckbox labeltitle='Less than $100' name='price-filters' value='0-100' type='radio' radioChecked={priceFilter[0] === '0'} onChange={(e) => priceClickHandler(e.target.value, 'less than 100')} />
										<CustomCheckbox labeltitle='$100 - $200' name='price-filters' value='100-200' radioChecked={priceFilter[0] === '100'} type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
										<CustomCheckbox labeltitle='$200 - $400' name='price-filters' value='200-400' type='radio' radioChecked={priceFilter[0] === '200'} onChange={(e) => priceClickHandler(e.target.value)} />
										<CustomCheckbox labeltitle='$400 - $600' name='price-filters' value='400-600' type='radio' radioChecked={priceFilter[0] === '400'} onChange={(e) => priceClickHandler(e.target.value)} />
										<CustomCheckbox labeltitle='$600 +' name='price-filters' value='600' type='radio' radioChecked={priceFilter[0] === '600'} onChange={(e) => priceClickHandler(e.target.value)} />
									</>
								</FilterAccordion>
							</>
						</FilterBtnForMob>
					</div>
					<InfiniteScroll
						className={`${styles.scroller} inner-sec-pb`}
						dataLength={currentData?.length}
						next={fetchData}
						scrollThreshold={0.6}
						hasMore={hasMoreData}
						loader={lastPage > 1 && <DarkLoader className={styles.pagination_loader} />}
						// endMessage={
						// 	currentData?.length > 0 &&
						// 	lastPage > 1 && (
						// 		<p style={{ textAlign: 'center' }} className={`${styles.pagination_loader} red-color`}>
						// 			Sorry, no more product is available this time...
						// 		</p>
						// 	)
						// }
					>
						<div className={`${styles.deals_wrapper} inner-sec-mt`}>
							{currentData?.length > 0 ? (
								currentData?.map((data, index) => {
									return <NewCard key={index} data={data} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setfilterLoading} currentData={currentData} />
									// return <DealsCard key={index} data={data} setmodal={setmodal} setModalData={setModalData} />
								})
							) : (
								<div className='red-color'>No result found ...</div>
							)}
						</div>
					</InfiniteScroll>
				</RigthCol>
			</ListingLayout>
			{/* </div>
			</section> */}
		</>
	)
}

export default AllSearchResults

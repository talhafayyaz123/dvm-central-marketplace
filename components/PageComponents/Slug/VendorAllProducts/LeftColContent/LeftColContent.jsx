import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseApiUrl } from '../../../../../utils/config'
import CustomCheckbox from '../../../../UI/CustomCheckbox/CustomCheckbox'
import FilterAccordion from '../../../../UI/FilterAccordion/FilterAccordion'
import { lockScroll, unlockScroll } from '../../../../../utils/scrollLock'
import scrollToData from '../../../../../utils/scrollToData'
import styles from './LeftColContent.module.css'
let gsap, ScrollToPlugin

const LeftColContent = ({
	sortedValue,
	allCategories,
	vendorId,
	setinitialData,
	setproductsLoading,
	resultsWrapper,
	setcurrentPage,
	setlastPage,
	setshowFilterData,
	sethasMoreData,
	categoriesFilter,
	setcategoriesFilter,
	filterChanged,
	showFilterData,
	setfilterChanged,
	// setshowSearchData,
	totalResults,
	settotalResults,
	loginUser,
	searchVal,
	setsearchValue,
	searchValue
}) => {
	// search
	const [inputFocus, setinputFocus] = useState(false)
	const [categorySearch, setcategorySearch] = useState('')
	const [noData, setnoData] = useState(false)

	// console.log('user', loginUser)
	const categoriesClickHandler = (val) => {
		let filterCat = categoriesFilter.filter((catArr) => catArr === val)
		if (filterCat.length === 0) {
			setcategoriesFilter([...categoriesFilter, val])
		} else {
			setcategoriesFilter(() => categoriesFilter.filter((category) => category !== val))
		}
		setfilterChanged(true)
		   if (searchVal?.current) {
					searchVal.current.value = ''
				}
	}

	const filterApiHandler = async () => {
		console.log('handlefilter data')
		lockScroll()
		setproductsLoading(true)

		const data = {
			vendor_id: vendorId,
			category_ids: categoriesFilter,
			sort_type: sortedValue,
			search: searchVal?.current?.value
		}
		const res = await axios.post(`${baseApiUrl}/vendors/filter-product`, data, {
			headers: {
				type: loginUser?.id !== undefined && loginUser?.id
			}
		})

		setinitialData([...res?.data?.data?.vendors_all_products?.data])
		setcurrentPage(res?.data?.data?.vendors_all_products?.current_page)
		setlastPage(res?.data?.data?.vendors_all_products?.last_page)
		totalResults !== undefined && settotalResults(res?.data?.data?.vendors_all_products?.total)
		setshowFilterData(true)
		// setshowSearchData(false)
		if (res?.data?.data?.vendors_all_products?.data?.length > 0) {
			sethasMoreData(true)
		} else sethasMoreData(false)
		unlockScroll()
		setproductsLoading(false)
		searchValue && setsearchValue(false)
		if (gsap === undefined) {
			gsap = (await import('gsap')).default
			ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

			gsap.registerPlugin(ScrollToPlugin)
		}
		scrollToData(gsap, resultsWrapper?.current, 120)
	}

	useEffect(() => {
		if (searchValue) {
			filterApiHandler()
		}
	}, [searchValue])

	useEffect(() => {
		if (filterChanged || (categoriesFilter?.length > 0 && showFilterData)) {
			filterApiHandler()
		}
	}, [categoriesFilter, filterChanged])

	const allUnchekHandler = async () => {
		setproductsLoading(true)
		let allCheckboxes = document.querySelectorAll('.checkbox')
		allCheckboxes.forEach((box) => {
			if (box.checked) {
				box.checked = false
			} else return
		})
		clearAllData()
		setproductsLoading(false)
	}

	const clearAllData = () => {
		setcategoriesFilter([])
		setcurrentPage()
		setlastPage()
		setfilterChanged(true)
		setcategorySearch('')
		setnoData(false)
	}

	const searchHandler = async (val, type) => {
		let noDataFound = allCategories?.filter((search) => search?.name?.toLowerCase().includes(val.toLowerCase()))

		if (noDataFound?.length === 0) {
			setnoData(true)
		} else {
			setnoData(false)
		}
	}
	return (
		<>
			<div className={styles.wrapper}>
				<h5>Filter Results</h5>
				<button onClick={() => allUnchekHandler()}>Clear All</button>
			</div>
			<FilterAccordion className={`${styles.accordion} white-bg`} title='All Categories' pageType={'all-products'}>
				{allCategories?.length > 10 && (
					<div className={`${inputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setinputFocus} onBlur={() => setinputFocus(false)} tabIndex={0}>
						<input type='search' className={styles.input} placeholder='Search category' value={categorySearch} onChange={(e) => (setcategorySearch(e.target.value), searchHandler(e.target.value, 'vendor'))} />
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
						</svg>
					</div>
				)}
				{allCategories
					?.filter((search) => {
						if (categorySearch === '') {
							return search
						} else if (search?.name?.toLowerCase()?.includes(categorySearch?.toLowerCase())) {
							return search
						}
					})
					?.map((category) => {
						const isChecked = categoriesFilter?.includes(category?.id?.toString())
						return <CustomCheckbox className='checkbox' checked={isChecked} key={category?.id} type='checkbox' labeltitle={category?.name} value={category?.id} name='all-categories' onChange={(e) => categoriesClickHandler(e.target.value)} />
					})}
				{noData && <div className={`${styles.no_data} red-color`}>No category found...</div>}
			</FilterAccordion>
		</>
	)
}

export default LeftColContent

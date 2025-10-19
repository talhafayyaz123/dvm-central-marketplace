import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseApiUrl } from '../../../../utils/config'
import FilterAccordion from '../../../UI/FilterAccordion/FilterAccordion'
import styles from './Filters.module.css'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'
import scrollToData from '../../../../utils/scrollToData'
import CustomCheckbox from '../../../UI/CustomCheckbox/CustomCheckbox'
let gsap, ScrollToPlugin

const Filters = ({
	filterChange,
	setfilterChange,
	brands,
	relatedCategories,
	setcurrentData,
	setcurrentPage,
	setlastPage,
	setshowFilterData,
	setLoading,
	categoryId,
	selectedVal,
	resultWrapper,
	categoriesFilter,
	setcategoriesFilter,
	vendorFilter,
	setvendorFilter,
	priceFilter,
	setpriceFilter,
	sethasMoreData,
	settotalResults,
	loginUser
}) => {
	// categories
	const [inputFocus, setinputFocus] = useState(false)
	const [categorySearch, setcategorySearch] = useState('')
	const [noData, setnoData] = useState(false)

	// brand
	const [brandInputFocus, setbrandInputFocus] = useState(false)
	const [brandSearch, setbrandSearch] = useState('')
	const [brandNoData, setbrandNoData] = useState(false)

	let brandsObj = brands,
		brandsValues = Object.values(brandsObj),
		brandsKey = Object.keys(brandsObj)

	const brandArray = Object.entries(brands).map(([id, name]) => ({
		id: Number(id),
		name
	}))

	const allUnchekHandler = async () => {
		setLoading(true)
		let allCheckboxes = document.querySelectorAll('.checkbox')
		allCheckboxes.forEach((box) => {
			if (box.checked) {
				box.checked = false
			} else return
		})
		clearAllData()
		setLoading(false)
	}

	const clearAllData = () => {
		setcategoriesFilter([categoryId])
		setvendorFilter([])
		setpriceFilter([])
		setcurrentPage()
		setlastPage()
		setshowFilterData(false)
		setfilterChange(true)
		setcategorySearch('')
		setbrandSearch('')
		setbrandNoData(false)
		setnoData(false)
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

	const priceClickHandler = (val, type) => {
		setpriceFilter(type === 'less than 100' ? ['0', '100'] : [val.slice(0, 3), val.slice(4, 7)])
		setfilterChange(true)
	}

	const filterHandler = async () => {
		setLoading(true)
		lockScroll()

		const data = {
			filter: {
				vendor_ids: vendorFilter,
				prices: priceFilter,
				category_ids: categoriesFilter
			},
			sort_type: selectedVal
		}

		const res = await axios.post(`${baseApiUrl}/filter-category-products`, data, {
			headers: {
				type: loginUser?.id !== undefined && loginUser?.id
			}
		})
		console.log('res from filter', res)

		setcurrentData([...res?.data?.data?.all_products?.data])
		setcurrentPage(res?.data?.data?.all_products?.current_page)
		setlastPage(res?.data?.data?.all_products?.last_page)
		settotalResults(res?.data?.data?.all_products?.total)
		setshowFilterData(true)

		if (res?.data?.data?.all_products?.data?.length > 0) {
			sethasMoreData(true)
		} else sethasMoreData(false)
		setLoading(false)
		unlockScroll()
		if (gsap === undefined) {
			gsap = (await import('gsap')).default
			ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

			gsap.registerPlugin(ScrollToPlugin)
		}

		scrollToData(gsap, resultWrapper?.current, 100)
	}

	useEffect(() => {
		if (filterChange || categoriesFilter?.length > 1 || vendorFilter?.length > 0 || priceFilter?.length > 0 || selectedVal !== '') {
			filterHandler()
		}
	}, [categoriesFilter, vendorFilter, priceFilter, filterChange, selectedVal])

	const searchHandler = async (val, type) => {
		let noDataFound = await (type === 'brand' ? brandsValues?.filter((search) => search?.toLowerCase().includes(val.toLowerCase())) : relatedCategories?.filter((search) => search?.name?.toLowerCase().includes(val.toLowerCase())))
		console.log('nodatafoud', noDataFound)
		if (noDataFound?.length === 0) {
			type === 'brand' ? setbrandNoData(true) : setnoData(true)
		} else type === 'brand' ? setbrandNoData(false) : setnoData(false)
	}

	return (
		<>
			<div className={styles.wrapper}>
				<h5>Filter Results</h5>
				<button onClick={() => allUnchekHandler()}>Clear All</button>
			</div>

			{/* related categories filter */}
			{relatedCategories?.length > 0 && (
				<FilterAccordion title='Related Categories' className={styles.category_filters}>
					{relatedCategories?.length > 10 && (
						<div className={`${inputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setinputFocus} onBlur={() => setinputFocus(false)} tabIndex={0}>
							<input type='search' className={styles.input} placeholder='Search Categories' value={categorySearch} onChange={(e) => (setcategorySearch(e.target.value), searchHandler(e.target.value, 'categories'))} />
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
							</svg>
						</div>
					)}
					{relatedCategories
						?.filter((search) => {
							if (categorySearch === '') {
								return search
							} else if (search?.name?.toLowerCase()?.includes(categorySearch?.toLowerCase())) {
								return search
							}
						})
						?.map((category, index) => {
							const { name, id } = category
							const isChecked = categoriesFilter?.includes(category?.id?.toString())
							return <CustomCheckbox type='checkbox' checked={isChecked} key={index} name='categories' labeltitle={name} value={id} onChange={(e) => categoriesClickHandler(e?.target?.value)} />
						})}
					{noData && <div className={`${styles.no_data} red-color`}>No category found...</div>}
				</FilterAccordion>
			)}

			{/* brands filter */}
			<FilterAccordion title='Brands' className={styles.brands_filters}>
				{brandsValues?.length > 10 && (
					<div className={`${brandInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setbrandInputFocus} onBlur={() => setbrandInputFocus(false)} tabIndex={0}>
						<input type='search' className={styles.input} placeholder='Search Brands' value={brandSearch} onChange={(e) => (setbrandSearch(e.target.value), searchHandler(e.target.value, 'brand'))} />
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
						</svg>
					</div>
				)}
				{brandArray
					?.filter((search) => {
						if (brandSearch === '') {
							return search
						} else if (search?.name?.toLowerCase()?.includes(brandSearch?.toLowerCase())) {
							return search
						}
					})
					?.map((value, index) => {
						const isChecked = vendorFilter?.includes(value?.id.toString())
						return <CustomCheckbox type='checkbox' checked={isChecked} key={index} name='brand' labeltitle={value?.name} value={value?.id} onChange={(e) => vendorClickHandler(e?.target?.value)} />
					})}
				{brandNoData && <div className={`${styles.no_data} red-color`}>No brand found...</div>}
			</FilterAccordion>

			{/* price filter */}

			<FilterAccordion title='Price' className={styles.prices_filters}>
				<>
					<CustomCheckbox labeltitle='Less than $100' name='price-filters' value='0-100' radioChecked={priceFilter[0] === '0'} type='radio' onChange={(e) => priceClickHandler(e.target.value, 'less than 100')} />
					<CustomCheckbox labeltitle='$100 - $200' name='price-filters' value='100-200' type='radio' radioChecked={priceFilter[0] === '100'} onChange={(e) => priceClickHandler(e.target.value)} />
					<CustomCheckbox labeltitle='$200 - $400' name='price-filters' value='200-400' radioChecked={priceFilter[0] === '200'} type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
					<CustomCheckbox labeltitle='$400 - $600' name='price-filters' value='400-600' radioChecked={priceFilter[0] === '400'} type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
					<CustomCheckbox labeltitle='$600 +' name='price-filters' value='600' radioChecked={priceFilter[0] === '600'} type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
				</>
			</FilterAccordion>
		</>
	)
}

export default Filters

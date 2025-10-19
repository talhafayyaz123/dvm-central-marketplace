import React, { useEffect, useState } from 'react'
import styles from './Filters.module.css'
import FilterAccordion from '../../../UI/FilterAccordion/FilterAccordion'
import CustomCheckbox from '../../../UI/CustomCheckbox/CustomCheckbox'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'
import axios from 'axios'
import { baseApiUrl } from '../../../../utils/config'
import scrollToData from '../../../../utils/scrollToData'
let gsap, ScrollToPlugin

const Filters = ({ filterChange, setfilterChange, brands, setcurrentData, setcurrentPage, setlastPage, setshowFilterData, setLoading, filterType, selectedVal, resultWrapper, vendorFilter, setvendorFilter, priceFilter, setpriceFilter, sethasMoreData, settotalResults, loginUser }) => {
	const [inputFocus, setinputFocus] = useState(false)
	const [searchVal, setsearchVal] = useState('')
	const [noData, setnoData] = useState(false)

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
		setvendorFilter([])
		setpriceFilter([])
		setcurrentPage()
		setlastPage()
		setshowFilterData(false)
		setfilterChange(true)
		setsearchVal('')
		setnoData(false)
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
		setpriceFilter(type === 'Less than 100' ? ['0', '100'] : [val.slice(0, 3), val.slice(4, 7)])
		setfilterChange(true)
	}

	const filterHandler = async () => {
		setLoading(true)
		lockScroll()

		const data = {
			filter: {
				vendor_ids: vendorFilter,
				prices: priceFilter,
				type: filterType
			},
			sort_type: selectedVal
		}

		const res = await axios.post(`${baseApiUrl}/filter-special-products`, data, {
			headers: {
				type: loginUser?.id
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

	// useEffect(() => {
	// 	filterChange && filterHandler()
	// }, [vendorFilter, priceFilter, filterChange, selectedVal])

	const searchHandler = async (val) => {
		let noDataFound = await brands?.filter((search) => search?.name?.toLowerCase().includes(val.toLowerCase()))
		if (noDataFound?.length === 0) {
			setnoData(true)
		} else setnoData(false)
	}

	useEffect(() => {
		if (filterChange || vendorFilter?.length > 0 || priceFilter?.length > 0 || selectedVal !== '') {
			filterHandler()
		}
	}, [vendorFilter, priceFilter, filterChange, selectedVal])

	return (
		<>
			<div className={styles.wrapper}>
				<h5>Filter Results</h5>
				<button onClick={() => allUnchekHandler()}>Clear All</button>
			</div>

			{/* brands filter */}
			<FilterAccordion title='Brands' className={styles.brands_filters}>
				{/* search */}
				{brands?.length > 10 && (
					<div className={`${inputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setinputFocus} onBlur={() => setinputFocus(false)} tabIndex={0}>
						<input type='search' className={styles.input} placeholder='Search Brands' value={searchVal} onChange={(e) => (setsearchVal(e.target.value), searchHandler(e.target.value))} />
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
						</svg>
					</div>
				)}
				{/* filter */}
				{brands
					?.filter((search) => {
						if (searchVal == '') {
							return search
						} else if (search?.name?.toLowerCase().includes(searchVal?.toLowerCase())) {
							return search
						}
					})
					?.map((brand, index) => {
						const isChecked = vendorFilter?.includes(brand?.id?.toString())
						return <CustomCheckbox key={index} checked={isChecked} labeltitle={brand?.name} name='brands-filters' value={brand?.id} type='checkbox' onChange={(e) => vendorClickHandler(e?.target?.value)} />
					})}
				{noData && <div className={`${styles.no_data} red-color`}>No brand found...</div>}
			</FilterAccordion>

			{/* price filter */}

			<FilterAccordion title='Price' className={styles.prices_filters}>
				<>
					<CustomCheckbox labeltitle='Less than $100' name='price-filters' radioChecked={priceFilter[0] === '0'} value='0-100' type='radio' onChange={(e) => priceClickHandler(e.target.value, 'Less than 100')} />
					<CustomCheckbox labeltitle='$100 - $200' name='price-filters' radioChecked={priceFilter[0] === '100'} value='100-200' type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
					<CustomCheckbox labeltitle='$200 - $400' name='price-filters' radioChecked={priceFilter[0] === '200'} value='200-400' type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
					<CustomCheckbox labeltitle='$400 - $600' name='price-filters' radioChecked={priceFilter[0] === '400'} value='400-600' type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
					<CustomCheckbox labeltitle='$600 +' name='price-filters' radioChecked={priceFilter[0] === '600'} value='600' type='radio' onChange={(e) => priceClickHandler(e.target.value)} />
				</>
			</FilterAccordion>
		</>
	)
}

export default Filters

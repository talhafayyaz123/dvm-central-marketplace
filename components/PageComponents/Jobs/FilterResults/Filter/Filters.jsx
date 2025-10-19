import React, { useState, useEffect, useRef } from 'react'
import styles from './Filter.module.css'
import FilterAccordion from '../../../../UI/FilterAccordion/FilterAccordion'
import CustomCheckbox from '../../../../UI/CustomCheckbox/CustomCheckbox'
import { baseApiUrl } from '../../../../../utils/config'
import axios from 'axios'
import { scrollToData } from '../../../../../utils/scrollTo'
import { lockScroll, unlockScroll } from '../../../../../utils/scrollLock'
import CustomSelectInput from '../../../../UI/CustomSelectInput/CustomSelectInput'
import timeData from './timeMenu'
// import { DateTime, minus } from 'luxon'
let gsap, ScrollToPlugin

const Filters = ({
	filterData,
	setsearchJobs,
	result_wrapper,
	setloading,
	sethasMoreData,
	setfilterActive,
	setcurrentPage,
	setlastPage,
	companyFilter,
	setcompanyFilter,
	countryFilter,
	setcountryFilter,
	stateFilter,
	setstateFilter,
	searchValue,
	jobcategoryFilter,
	setjobcategoryFilter,
	jobtypeFilter,
	setjobtypeFilter,
	workingtimeFilter,
	setworkingtimeFilter,
	educationFilter,
	seteducationFilter,
	salarytypeFilter,
	setsalarytypeFilter,
	hiringFilter,
	sethiringFilter,
	minValue,
	setminValue,
	setsearchActive,
	maxValue,
	setmaxValue,
	defaultDateOption,
	setdefaultDateOption,
	minSalaryEl,
	maxSalaryEl,
	DateTime,
	minus,
	searchDataChanged,
	dataChange,
	setdataChange,
	searchRef,
	setsearchLoading,
	searchActive,
	loginUser,
	userData
}) => {
	const [showDateMenu, setshowDateMenu] = useState(false)
	// company
	const [companyInputFocus, setcompanyInputFocus] = useState(false)
	const [companySearchVal, setcompanySearchVal] = useState('')
	const [companyNoData, setcompanyNoData] = useState(false)

	// country
	const [countryInputFocus, setcountryInputFocus] = useState(false)
	const [countrySearch, setcountrySearch] = useState('')
	const [countryNoData, setcountryNoData] = useState(false)

	// state
	const [stateInputFocus, setstateInputFocus] = useState(false)
	const [stateSearch, setstateSearch] = useState('')
	const [stateNoData, setstateNoData] = useState(false)

	// jobCatetogories
	const [jobCatInputFocus, setjobCatInputFocus] = useState(false)
	const [jobCatSearch, setjobCatSearch] = useState('')
	const [jobCatNoData, setjobCatNoData] = useState(false)

	// jobType
	const [jobTypeInputFocus, setjobTypeInputFocus] = useState(false)
	const [jobTypeSearch, setjobTypeSearch] = useState('')
	const [jobTypeNoData, setjobTypeNoData] = useState(false)

	// workTime
	const [workTimeInputFocus, setworkTimeInputFocus] = useState(false)
	const [workTimeSearch, setworkTimeSearch] = useState('')
	const [workTimeNoData, setworkTimeNoData] = useState(false)

	// edu
	const [eduInputFocus, seteduInputFocus] = useState(false)
	const [eduSearch, seteduSearch] = useState('')
	const [eduNoData, seteduNoData] = useState(false)

	// salaryType
	const [salaryTypeInputFocus, setsalaryTypeInputFocus] = useState(false)
	const [salaryTypeSearch, setsalaryTypeSearch] = useState('')
	const [salaryTypeNoData, setsalaryTypeNoData] = useState(false)

	const storedMinValue = filterData?.min_price
	const storedMaxValue = filterData?.max_price

	const searchReq = useRef(null)
	// country filter
	const countryChangeHandler = (e, id) => {
		setsearchActive(false)
		const duplicatecountry = Object.keys(countryFilter).filter((key) => {
			return countryFilter[key] === e.target.value
		})

		if (duplicatecountry.length === 0) {
			setcountryFilter({ ...countryFilter, [id]: e.target.value })
		} else {
			let newscountries = { ...countryFilter }
			delete newscountries[id]
			setcountryFilter(newscountries)
		}

		setdataChange(true)
	}

	// compnay filter
	const companyChangeHandler = (e, id) => {
		setsearchActive(false)
		const duplicatecompany = Object.keys(companyFilter).filter((key) => {
			return companyFilter[key] === e.target.value
		})

		if (duplicatecompany.length === 0) {
			setcompanyFilter({ ...companyFilter, [id]: e.target.value })
		} else {
			let newscompanies = { ...companyFilter }
			delete newscompanies[id]
			setcompanyFilter(newscompanies)
		}

		setdataChange(true)
	}

	// state filter
	const stateChangeHandler = (e, id) => {
		setsearchActive(false)
		const duplicatestate = Object.keys(stateFilter).filter((key) => {
			return stateFilter[key] === e.target.value
		})

		if (duplicatestate.length === 0) {
			setstateFilter({ ...stateFilter, [id]: e.target.value })
		} else {
			let newsstates = { ...stateFilter }
			delete newsstates[id]
			setstateFilter(newsstates)
		}

		setdataChange(true)
	}

	// job category filter
	const jobcategoryChangeHandler = (e, id) => {
		setsearchActive(false)
		const duplicatejobCategory = Object.keys(jobcategoryFilter).filter((key) => {
			return jobcategoryFilter[key] === e.target.value
		})

		if (duplicatejobCategory.length === 0) {
			setjobcategoryFilter({ ...jobcategoryFilter, [id]: e.target.value })
		} else {
			let newsjobCategories = { ...jobcategoryFilter }
			delete newsjobCategories[id]
			setjobcategoryFilter(newsjobCategories)
		}

		setdataChange(true)
	}

	// job type filter
	const jobtypeChangeHandler = (e, id) => {
		setsearchActive(false)
		const duplicatejobTypes = Object.keys(jobtypeFilter).filter((key) => {
			return jobtypeFilter[key] === e.target.value
		})

		if (duplicatejobTypes.length === 0) {
			setjobtypeFilter({ ...jobtypeFilter, [id]: e.target.value })
		} else {
			let newjobTypes = { ...jobtypeFilter }
			delete newjobTypes[id]
			setjobtypeFilter(newjobTypes)
		}

		setdataChange(true)
	}

	// working time filter
	const worktimeChangeHandler = (e, id) => {
		setsearchActive(false)
		const duplicateWorkTime = Object.keys(workingtimeFilter).filter((key) => {
			return workingtimeFilter[key] === e.target.value
		})

		if (duplicateWorkTime.length === 0) {
			setworkingtimeFilter({ ...workingtimeFilter, [id]: e.target.value })
		} else {
			let newworkingTimes = { ...workingtimeFilter }
			delete newworkingTimes[id]
			setworkingtimeFilter(newworkingTimes)
		}

		setdataChange(true)
	}

	// education filter
	const educationChangeHandler = (e, id) => {
		setsearchActive(false)
		const duplicateEducation = Object.keys(educationFilter).filter((key) => {
			return educationFilter[key] === e.target.value
		})

		if (duplicateEducation.length === 0) {
			seteducationFilter({ ...educationFilter, [id]: e.target.value })
		} else {
			let newEducations = { ...educationFilter }
			delete newEducations[id]
			seteducationFilter(newEducations)
		}
		setdataChange(true)
	}

	// salary type filter
	const salarytypeChangeHandler = (e, id) => {
		setsearchActive(false)
		const duplicateSalaryType = Object.keys(salarytypeFilter).filter((key) => {
			return salarytypeFilter[key] === e.target.value
		})

		if (duplicateSalaryType.length === 0) {
			setsalarytypeFilter({ ...salarytypeFilter, [id]: e.target.value })
		} else {
			let newsalaryTypes = { ...salarytypeFilter }
			delete newsalaryTypes[id]
			setsalarytypeFilter(newsalaryTypes)
		}

		setdataChange(true)
	}

	const salaryRangeHandler = () => {
		setdataChange(true)
		filterDataApi()
	}

	// hiring handler
	const hiringChangeHanler = (e) => {
		setsearchActive(false)
		sethiringFilter(e.target.value)
		setdataChange(true)
	}

	// clear all filtes handler
	const allUnchekHandler = async () => {
		let allCheckboxes = document.querySelectorAll('.checkbox')
		// 	checkedBoxes = Array.from(allCheckboxes)?.filter((box) => box.checked)
		// ;(checkedBoxes?.length > 0 || (minValue !== '' && maxValue !== '')) &&
		allCheckboxes.forEach((box) => {
			if (box.checked || minSalaryEl.current.value !== '' || maxSalaryEl.current.value !== '') {
				box.checked = false
				clearAllData()
			} else return
		})
	}

	// clear all data function
	const clearAllData = () => {
		setsearchActive(false)
		setdefaultDateOption('All time')
		setcompanyFilter({})
		setcountryFilter({})
		setstateFilter({})
		setjobcategoryFilter({})
		setjobtypeFilter({})
		setworkingtimeFilter({})
		seteducationFilter({})
		setsalarytypeFilter({})
		sethiringFilter(3)
		setminValue(filterData?.min_price)
		setmaxValue(filterData?.max_price)
		minSalaryEl.current.value = ''
		maxSalaryEl.current.value = ''
		searchRef.current.value = ''
		setcompanySearchVal('')
		setcountrySearch('')
		setstateSearch('')
		setjobCatSearch('')
		setjobTypeSearch('')
		setworkTimeSearch('')
		seteduSearch('')
		setsalaryTypeSearch('')
		setcountryNoData(false)
		setcompanyNoData(false)
		setstateNoData(false)
		setjobCatNoData(false)
		setjobTypeNoData(false)
		setworkTimeNoData(false)
		seteduNoData(false)
		setsalaryTypeNoData(false)

		setdataChange(true)
	}

	const filterDataApi = async () => {
		const today = DateTime.now()
		let postDate
		if (defaultDateOption === 'Last 24 hours') {
			postDate = today.minus({ day: 1 }).toFormat('yyyy-LL-dd')
		} else if (defaultDateOption === 'Last 7 days') {
			postDate = today.minus({ day: 7 }).toFormat('yyyy-LL-dd')
		} else if (defaultDateOption === 'Last 30 days') {
			postDate = today.minus({ day: 30 }).toFormat('yyyy-LL-dd')
		} else postDate = null
		const currentReq = ++searchReq.current
		if (searchActive) {
			setsearchLoading(true)
		} else {
			lockScroll()
			setloading(true)
		}

		const res = await axios.post(`${baseApiUrl}/jobs/filter`, {
			vendors: companyFilter,
			countries: countryFilter,
			states: stateFilter,
			categories: jobcategoryFilter,
			types: jobtypeFilter,
			working_time: workingtimeFilter,
			educations: educationFilter,
			salary_types: salarytypeFilter,
			salary_range: {
				0: minValue === '' ? filterData?.min_price : minValue,
				1: maxValue === '' ? filterData?.max_price : maxValue
			},
			hiring: {
				0: hiringFilter
			},
			date: postDate,
			search: searchRef?.current?.value
		})
		if (currentReq === searchReq.current && searchActive) {
			setsearchJobs(res?.data?.job_detail?.data)
			setcurrentPage(res?.data?.job_detail?.current_page)
			setlastPage(res?.data?.job_detail?.last_page)
			res?.data?.job_detail?.data?.length > 0 && sethasMoreData(true)
		} else if (!searchActive) {
			setsearchJobs(res?.data?.job_detail?.data)
			setcurrentPage(res?.data?.job_detail?.current_page)
			setlastPage(res?.data?.job_detail?.last_page)
			res?.data?.job_detail?.data?.length > 0 && sethasMoreData(true)
		}
		setfilterActive(true)
		setloading(false)
		setsearchLoading(false)
		unlockScroll()
		setdataChange(true)
		if (gsap === undefined) {
			gsap = (await import('gsap')).default
			ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

			gsap.registerPlugin(ScrollToPlugin)
		}

		scrollToData(gsap, result_wrapper?.current, 100)
	}

	useEffect(() => {
		dataChange && filterDataApi()
	}, [dataChange, companyFilter, countryFilter, stateFilter, jobcategoryFilter, jobtypeFilter, workingtimeFilter, educationFilter, salarytypeFilter, hiringFilter, defaultDateOption, searchDataChanged])

	const minValueHandler = (e) => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '')
		setminValue(e.target.value)
	}

	const maxValueHandler = (e) => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '')
		setmaxValue(e.target.value)
	}
	const searchHandler = async (val, type) => {
		let noDataFound = await (type === 'company'
			? filterData?.company
			: type === 'country'
			? filterData?.country
			: type === 'state'
			? filterData?.states
			: type === 'job-cat'
			? filterData?.categories
			: type === 'job-type'
			? filterData?.types
			: type === 'work-time'
			? filterData?.working_times
			: type === 'education'
			? filterData?.education_levels
			: type === 'salary-type' && filterData?.salary_types
		)?.filter((search) => search?.name?.toLowerCase().includes(val.toLowerCase()))
		if (noDataFound?.length === 0) {
			type === 'company'
				? setcompanyNoData(true)
				: type === 'country'
				? setcountryNoData(true)
				: type === 'state'
				? setstateNoData(true)
				: type === 'job-cat'
				? setjobCatNoData(true)
				: type === 'job-type'
				? setjobTypeNoData(true)
				: type === 'work-time'
				? setworkTimeNoData(true)
				: type === 'education'
				? seteduNoData(true)
				: type === 'salary-type' && setsalaryTypeNoData(true)
		} else {
			type === 'company'
				? setcompanyNoData(false)
				: type === 'country'
				? setcountryNoData(false)
				: type === 'state'
				? setstateNoData(false)
				: type === 'job-cat'
				? setjobCatNoData(false)
				: type === 'job-type'
				? setjobTypeNoData(false)
				: type === 'work-time'
				? setworkTimeNoData(false)
				: type === 'education'
				? seteduNoData(false)
				: type === 'salary-type' && setsalaryTypeNoData(false)
		}
	}

	useEffect(() => {
		const numericMinValue = parseInt(minValue)
		const numericMaxValue = parseInt(maxValue)
		const hasFiltersApplied =
			companyFilter?.length > 0 ||
			Object.keys(countryFilter).length > 0 ||
			stateFilter?.length > 0 ||
			Object.keys(jobcategoryFilter)?.length > 0 ||
			Object.keys(jobtypeFilter)?.length > 0 ||
			workingtimeFilter?.length > 0 ||
			Object.keys(educationFilter)?.length > 0 ||
			Object.keys(salarytypeFilter)?.length > 0 ||
			hiringFilter?.length > 0 ||
			defaultDateOption !== 'All time' ||
			searchValue !== '' ||
			numericMinValue !== storedMinValue ||
			numericMaxValue !== storedMaxValue

		if (dataChange || hasFiltersApplied) {
			filterDataApi()
		}
	}, [dataChange, companyFilter, countryFilter, stateFilter, jobcategoryFilter, jobtypeFilter, workingtimeFilter, educationFilter, salarytypeFilter, hiringFilter, defaultDateOption, searchValue, minValue, maxValue])

	return (
		<>
			<div className={`${styles.container} white-bg radius`}>
				<div className={styles.container_title_wrapper}>
					<h5>Filter By </h5>
					<button onClick={() => allUnchekHandler()}>Clear All</button>
				</div>

				<div className={`${styles.filter_wrapper} ${styles.date}`}>
					<h5>Date Post</h5>
					<CustomSelectInput
						showSearch={timeData?.length > 10 ? true : false}
						placeholder={'Search time'}
						className={styles.select}
						name='post-date'
						data={timeData}
						defaultOption={defaultDateOption}
						showSelectMenu={showDateMenu}
						setshowSelectMenu={setshowDateMenu}
						onChange={(e) => (setdefaultDateOption(e.target.value), setdataChange(true))}
					/>
				</div>

				{filterData?.company?.length > 0 && loginUser?.id !== undefined && userData?.position === 'Sales Rep' && (
					<div className={styles.filter_wrapper}>
						<FilterAccordion className={styles.accord} title='Company'>
							{filterData?.company?.length > 10 && (
								<div className={`${companyInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setcompanyInputFocus} onBlur={() => setcompanyInputFocus(false)} tabIndex={0}>
									<input type='search' className={styles.input} placeholder='Search Company' value={companySearchVal} onChange={(e) => (setcompanySearchVal(e.target.value), searchHandler(e.target.value, 'company'))} />
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
									</svg>
								</div>
							)}
							{filterData?.company
								?.filter((search) => {
									if (companySearchVal === '') {
										return search
									} else if (search?.name?.toLowerCase()?.includes(companySearchVal?.toLowerCase())) {
										return search
									}
								})
								?.map((company, index) => {
									return <CustomCheckbox checked={Object.values(companyFilter)?.includes(company?.id.toString())} key={index} type='checkbox' name={company?.name} labeltitle={company?.name} value={company?.id} onChange={(e) => companyChangeHandler(e, company?.id)} />
								})}
							{companyNoData && <div className={`${styles.no_data} red-color`}>No company found...</div>}
						</FilterAccordion>
					</div>
				)}

				{filterData?.country?.length > 0 && (
					<div className={styles.filter_wrapper}>
						<FilterAccordion className={styles.accord} title='Country'>
							{filterData?.country?.length > 10 && (
								<div className={`${countryInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setcountryInputFocus} onBlur={() => setcountryInputFocus(false)} tabIndex={0}>
									<input type='search' className={styles.input} placeholder='Search Country' value={countrySearch} onChange={(e) => (setcountrySearch(e.target.value), searchHandler(e.target.value, 'country'))} />
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
									</svg>
								</div>
							)}
							{filterData?.country
								?.filter((search) => {
									if (countrySearch === '') {
										return search
									} else if (search?.name?.toLowerCase()?.includes(countrySearch?.toLowerCase())) {
										return search
									}
								})
								?.map((country, index) => {
									return <CustomCheckbox checked={Object.values(countryFilter)?.includes(country?.id.toString())} key={index} type='checkbox' name={country?.name} labeltitle={country?.name} value={country?.id} onChange={(e) => countryChangeHandler(e, country?.id)} />
								})}
							{countryNoData && <div className={`${styles.no_data} red-color`}>No country found...</div>}
						</FilterAccordion>
					</div>
				)}

				{filterData?.states?.length > 0 && (
					<div className={styles.filter_wrapper}>
						<FilterAccordion className={styles.accord} title='State'>
							{filterData?.states?.length > 10 && (
								<div className={`${stateInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setstateInputFocus} onBlur={() => setstateInputFocus(false)} tabIndex={0}>
									<input type='search' className={styles.input} placeholder='Search State' value={stateSearch} onChange={(e) => (setstateSearch(e.target.value), searchHandler(e.target.value, 'state'))} />
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
									</svg>
								</div>
							)}
							{filterData?.states
								?.filter((search) => {
									if (stateSearch === '') {
										return search
									} else if (search?.name?.toLowerCase()?.includes(stateSearch?.toLowerCase())) {
										return search
									}
								})
								?.map((state, index) => {
									return <CustomCheckbox checked={Object.values(stateFilter)?.includes(state?.id.toString())} key={index} type='checkbox' name={state?.name} labeltitle={state?.name} value={state?.id} onChange={(e) => stateChangeHandler(e, state?.id)} />
								})}
							{stateNoData && <div className={`${styles.no_data} red-color`}>No state found...</div>}
						</FilterAccordion>
					</div>
				)}

				{filterData?.categories?.length > 0 && (
					<div className={styles.filter_wrapper}>
						<FilterAccordion className={styles.accord} title='Job Category'>
							{filterData?.categories?.length > 10 && (
								<div className={`${jobCatInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setjobCatInputFocus} onBlur={() => setjobCatInputFocus(false)} tabIndex={0}>
									<input type='search' className={styles.input} placeholder='Search Job Categories' value={jobCatSearch} onChange={(e) => (setjobCatSearch(e.target.value), searchHandler(e.target.value, 'job-cat'))} />
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
									</svg>
								</div>
							)}
							{filterData?.categories
								?.filter((search) => {
									if (jobCatSearch === '') {
										return search
									} else if (search?.name?.toLowerCase()?.includes(jobCatSearch?.toLowerCase())) {
										return search
									}
								})
								?.map((category, index) => {
									return <CustomCheckbox checked={Object.values(jobcategoryFilter)?.includes(category?.id.toString())} key={index} type='checkbox' name={category?.name} labeltitle={category?.name} value={category?.id} onChange={(e) => jobcategoryChangeHandler(e, category?.id)} />
								})}
							{jobCatNoData && <div className={`${styles.no_data} red-color`}>No job categories found...</div>}
						</FilterAccordion>
					</div>
				)}

				{filterData?.types?.length > 0 && (
					<div className={styles.filter_wrapper}>
						<FilterAccordion className={styles.accord} title='Job Type'>
							{filterData?.types?.length > 10 && (
								<div className={`${jobTypeInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setjobTypeInputFocus} onBlur={() => setjobTypeInputFocus(false)} tabIndex={0}>
									<input type='search' className={styles.input} placeholder='Search Job Type' value={jobTypeSearch} onChange={(e) => (setjobTypeSearch(e.target.value), searchHandler(e.target.value, 'job-type'))} />
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
									</svg>
								</div>
							)}
							{filterData?.types
								?.filter((search) => {
									if (jobTypeSearch === '') {
										return search
									} else if (search?.name?.toLowerCase()?.includes(jobTypeSearch?.toLowerCase())) {
										return search
									}
								})
								?.map((type, index) => {
									return <CustomCheckbox checked={Object.values(jobtypeFilter)?.includes(type?.id.toString())} key={index} type='checkbox' name={type?.name} labeltitle={type?.name} value={type?.id} onChange={(e) => jobtypeChangeHandler(e, type?.id)} />
								})}
							{jobTypeNoData && <div className={`${styles.no_data} red-color`}>No job type found...</div>}
						</FilterAccordion>
					</div>
				)}

				{filterData?.working_times?.length > 0 && (
					<div className={styles.filter_wrapper}>
						<FilterAccordion className={styles.accord} title='Working Time'>
							{filterData?.working_times?.length > 10 && (
								<div className={`${workTimeInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setworkTimeInputFocus} onBlur={() => setworkTimeInputFocus(false)} tabIndex={0}>
									<input type='search' className={styles.input} placeholder='Search Working Time' value={workTimeSearch} onChange={(e) => (setworkTimeSearch(e.target.value), searchHandler(e.target.value, 'work-time'))} />
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
									</svg>
								</div>
							)}
							{filterData?.working_times
								?.filter((search) => {
									if (workTimeSearch === '') {
										return search
									} else if (search?.name?.toLowerCase()?.includes(workTimeSearch?.toLowerCase())) {
										return search
									}
								})
								?.map((time, index) => {
									return <CustomCheckbox checked={Object.values(workingtimeFilter)?.includes(time?.id.toString())} key={index} type='checkbox' name={time?.name} labeltitle={time?.name} value={time?.id} onChange={(e) => worktimeChangeHandler(e, time?.id)} />
								})}
							{workTimeNoData && <div className={`${styles.no_data} red-color`}>No work time found...</div>}
						</FilterAccordion>
					</div>
				)}

				{filterData?.education_levels?.length > 0 && (
					<div className={styles.filter_wrapper}>
						<FilterAccordion className={styles.accord} title='Education'>
							{filterData?.education_levels?.length > 10 && (
								<div className={`${eduInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={seteduInputFocus} onBlur={() => seteduInputFocus(false)} tabIndex={0}>
									<input type='search' className={styles.input} placeholder='Search Education' value={eduSearch} onChange={(e) => (seteduSearch(e.target.value), searchHandler(e.target.value, 'education'))} />
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
									</svg>
								</div>
							)}
							{filterData?.education_levels
								?.filter((search) => {
									if (eduSearch === '') {
										return search
									} else if (search?.name?.toLowerCase()?.includes(eduSearch?.toLowerCase())) {
										return search
									}
								})
								?.map((level, index) => {
									return <CustomCheckbox checked={Object.values(educationFilter)?.includes(level?.id.toString())} key={index} type='checkbox' name={level?.name} labeltitle={level?.name} value={level?.id} onChange={(e) => educationChangeHandler(e, level?.id)} />
								})}
							{eduNoData && <div className={`${styles.no_data} red-color`}>No education found...</div>}
						</FilterAccordion>
					</div>
				)}

				{filterData?.salary_types?.length > 0 && (
					<div className={styles.filter_wrapper}>
						<FilterAccordion className={styles.accord} title='Salary Type'>
							{filterData?.salary_types?.length > 10 && (
								<div className={`${salaryTypeInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setsalaryTypeInputFocus} onBlur={() => setsalaryTypeInputFocus(false)} tabIndex={0}>
									<input type='search' className={styles.input} placeholder='Search Salary Type' value={salaryTypeSearch} onChange={(e) => (setsalaryTypeSearch(e.target.value), searchHandler(e.target.value, 'salary-type'))} />
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
									</svg>
								</div>
							)}
							{filterData?.salary_types
								?.filter((search) => {
									if (salaryTypeSearch === '') {
										return search
									} else if (search?.name?.toLowerCase()?.includes(salaryTypeSearch?.toLowerCase())) {
										return search
									}
								})
								?.map((type, index) => {
									return <CustomCheckbox checked={Object.values(salarytypeFilter)?.includes(type?.id.toString())} key={index} type='checkbox' name={type?.name} labeltitle={type?.name} value={type?.id} onChange={(e) => salarytypeChangeHandler(e, type?.id)} />
								})}
							{salaryTypeNoData && <div className={`${styles.no_data} red-color`}>No salary type found...</div>}
						</FilterAccordion>
					</div>
				)}

				<h5 className={`${styles.filter_title} primary-color`}>Salary Range</h5>
				<div className={styles.range_wrapper}>
					<div>
						<input ref={minSalaryEl} value={minValue} className='gray-border' type='text' placeholder={minValue} onChange={(e) => minValueHandler(e)} minLength='1' maxLength='5' />
					</div>
					<div>
						<input ref={maxSalaryEl} value={maxValue} className='gray-border' type='text' maxLength='5' placeholder={maxValue} minLength='1' onChange={(e) => maxValueHandler(e)} />
					</div>
				</div>

				<div className={styles.salary_btn_wrapper}>
					<button className='sml-btn primary-btn white-color' onClick={() => salaryRangeHandler()}>
						Select Salary
					</button>
				</div>
				<h5 className={`${styles.filter_title} primary-color`}>Hiring</h5>

				<div className={styles.hirng_filter_wrapper}>
					<CustomCheckbox showCheckboxasRadio={'showCheckboxasRadio'} checked={hiringFilter == String(0)} name='Normal Hiring' type='checkbox' labeltitle='Normal Hiring' value='0' onChange={(e) => hiringChangeHanler(e)} />
					<CustomCheckbox showCheckboxasRadio={'showCheckboxasRadio'} checked={hiringFilter == String(1)} name='Urgent Hiring' type='checkbox' labeltitle='Urgent Hiring' value='1' onChange={(e) => hiringChangeHanler(e)} />
					<CustomCheckbox showCheckboxasRadio={'showCheckboxasRadio'} checked={hiringFilter == String(2)} name='All Hiring' type='checkbox' labeltitle='All Hiring' value='2' onChange={(e) => hiringChangeHanler(e)} />
				</div>
			</div>
		</>
	)
}

export default Filters

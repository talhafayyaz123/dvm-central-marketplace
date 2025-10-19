import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseApiUrl } from '../../../../utils/config'
import CustomCheckbox from '../../../UI/CustomCheckbox/CustomCheckbox'
import FilterAccordion from '../../../UI/FilterAccordion/FilterAccordion'
import styles from './Filters.module.css'
import { scrollToData } from '../../../../utils/scrollTo'
import useLocalStorageState from 'use-local-storage-state'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'
let gsap, ScrollToPlugin

const Filtes = ({ categories, speakers, setcurrentData, result_wrapper, virtualExpoUpcoming, setvirtualExpoUpcoming, setfilterLoading, initialFilterLoading, setinitialFilterLoading }) => {
	const [expoCategories, setexpoCategories] = useLocalStorageState('dvm-expoCategories', {
		defaultValue: []
	})

	const [expoSpeakers, setexpoSpeakers] = useLocalStorageState('dvm-expoSpeakers', {
		defaultValue: {}
	})
	const [dataChange, setdataChange] = useState(false)

	// categories
	const [inputFocus, setinputFocus] = useState(false)
	const [searchVal, setsearchVal] = useState('')
	const [noData, setnoData] = useState(false)

	// speaker
	const [speakerInputFocus, setspeakerInputFocus] = useState(false)
	const [speakerSearch, setspeakerSearch] = useState('')
	const [speakerNoData, setspeakerNoData] = useState(false)

	const categoriesVal = Object.values(categories)
	const categoriesKey = Object.keys(categories)

	// category obj to array
	const categoriesArray = Object.entries(categories).map(([id, name]) => ({
		id: Number(id),
		name
	}))
	const filterDataApi = async () => {
		lockScroll()
		// !dataChange ? setinitialFilterLoading(true) : setfilterLoading(true)
		setfilterLoading(true)

		const data = {
			categories: expoCategories,
			speakers: expoSpeakers,
			date: virtualExpoUpcoming
		}

		const res = await axios.post(`${baseApiUrl}/filter-virtual-expo`, data, {
			headers: {
				type: 'dvm_central'
			}
		})
		console.log('res from filter', res)
		setcurrentData(res?.data)

		// !dataChange
		// 	? setTimeout(() => {
		// 			setinitialFilterLoading(false)
		// 			unlockScroll()
		// 	  }, 1200)
		// 	: (setfilterLoading(false), unlockScroll())
		unlockScroll()
		setfilterLoading(false)
		setdataChange(true)

		if (!initialFilterLoading || expoCategories?.length > 0 || Object.keys(expoSpeakers)?.length > 0 || virtualExpoUpcoming?.length > 0) {
			if (gsap === undefined) {
				gsap = (await import('gsap')).default
				ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

				gsap.registerPlugin(ScrollToPlugin)
			}

			scrollToData(gsap, result_wrapper?.current, 100)
		}
	}

	const categoryFilterHandler = (e) => {
		const value = e.target.value
		const duplicateCategory = expoCategories?.includes(value)

		if (!duplicateCategory) {
			setexpoCategories([...expoCategories, value])
		} else {
			let newExpoCategories = expoCategories?.filter((category) => category !== value)
			setexpoCategories(newExpoCategories)
		}

		setdataChange(true)
	}
	const speakerFilterHandler = (e, id) => {
		const duplicateSpeaker = Object.keys(expoSpeakers).filter((key) => {
			return expoSpeakers[key] === e.target.value
		})

		if (duplicateSpeaker.length === 0) {
			setexpoSpeakers({ ...expoSpeakers, [id]: e.target.value })
		} else {
			let newspeakers = { ...expoSpeakers }
			delete newspeakers[id]
			setexpoSpeakers(newspeakers)
		}

		setdataChange(true)
	}

	const upcomingFilterHandler = async (e) => {
		const duplicateUpcomingExpo = virtualExpoUpcoming?.filter((upcoming, i) => {
			return virtualExpoUpcoming[i] === e.target.value
		})

		if (duplicateUpcomingExpo.length === 0) {
			setvirtualExpoUpcoming([...virtualExpoUpcoming, e.target.value])
		} else {
			let newUpcomingExpo = virtualExpoUpcoming?.filter((upcoming) => upcoming !== e.target.value)

			setvirtualExpoUpcoming(() => newUpcomingExpo)
		}

		setdataChange(true)
	}

	// clear all filtes handler
	const allUnchekHandler = async () => {
		let allCheckboxes = document.querySelectorAll('.checkbox')
		allCheckboxes.forEach((box) => {
			if (box.checked) {
				box.checked = false
			} else return
		})
		clearAllData()
	}

	// clear all data function
	const clearAllData = () => {
		setexpoCategories([])
		setexpoSpeakers({})
		setvirtualExpoUpcoming([])
		setdataChange(true)
		setsearchVal('')
		setspeakerSearch('')
		setnoData(false)
		setspeakerNoData(false)
	}

	useEffect(() => {
		if (dataChange || expoCategories?.length > 0 || Object.keys(expoSpeakers)?.length > 0 || virtualExpoUpcoming?.length > 0) {
			filterDataApi()
		}
	}, [expoCategories, expoSpeakers, virtualExpoUpcoming, dataChange])

	const searchHandler = async (val, type) => {
		let noDataFound = await (type === 'speakers'
			? speakers?.filter((search) => {
					const searched = search?.first_name + ' ' + search?.last_name
					return searched?.toLowerCase().includes(val.toLowerCase())
			  })
			: categoriesVal?.filter((search) => search?.toLowerCase().includes(val.toLowerCase())))
		if (noDataFound?.length === 0) {
			type === 'speakers' ? setspeakerNoData(true) : setnoData(true)
		} else type === 'speakers' ? setspeakerNoData(false) : setnoData(false)
	}

	return (
		<>
			<div className={`white-bg radius`}>
				<div className={styles.container_title_wrapper}>
					<h5>Filter By </h5>
					<button onClick={() => allUnchekHandler()}>Clear All</button>
				</div>
				<FilterAccordion title='Upcoming' className={styles.upcoming_filters}>
					<CustomCheckbox checked={virtualExpoUpcoming?.includes('upcoming')} className='checkbox' type='checkbox' name='Upcoming-Webinar' value='upcoming' labeltitle='Interactive / Live' onChange={(e) => upcomingFilterHandler(e, 0)} />
					<CustomCheckbox checked={virtualExpoUpcoming?.includes('ondemand')} className='checkbox' type='checkbox' name='Upcoming-Webinar' value='ondemand' labeltitle='Past / Recorded' onChange={(e) => upcomingFilterHandler(e, 2)} />
				</FilterAccordion>

				<FilterAccordion title='Categories' className={styles.categories_filters}>
					{categoriesVal?.length > 10 && (
						<div className={`${inputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setinputFocus} onBlur={() => setinputFocus(false)} tabIndex={0}>
							<input type='search' className={styles.input} placeholder='Search Categories' value={searchVal} onChange={(e) => (setsearchVal(e.target.value), searchHandler(e.target.value, 'categories'))} />
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
							</svg>
						</div>
					)}
					{categoriesArray
						?.filter((search) => {
							if (search === '') {
								return search
							} else if (search?.name?.toLowerCase()?.includes(searchVal?.toLowerCase())) {
								return search
							}
						})
						?.map((category, index) => {
							return <CustomCheckbox checked={expoCategories.includes(category?.id?.toString())} className='checkbox' key={category?.id} type='checkbox' name='Categories' value={category?.id} labeltitle={category?.name} onChange={(e) => categoryFilterHandler(e)} />
						})}
					{noData && <div className={`${styles.no_data} red-color`}>No categories found...</div>}
				</FilterAccordion>

				<FilterAccordion title='Speakers' className={styles.speakers_filters}>
					{speakers?.length > 10 && (
						<div className={`${speakerInputFocus ? styles.focus_border : 'gray-border'} transition gray-color ${styles.search_wrapper}`} onFocus={setspeakerInputFocus} onBlur={() => setspeakerInputFocus(false)} tabIndex={0}>
							<input type='search' className={styles.input} placeholder='Search Speakers' value={speakerSearch} onChange={(e) => (setspeakerSearch(e.target.value), searchHandler(e.target.value, 'speakers'))} />
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
							</svg>
						</div>
					)}
					{speakers
						?.filter((search) => {
							const searched = search?.first_name + ' ' + search?.last_name
							if (speakerSearch === '') {
								return search
							} else if (searched?.toLowerCase()?.includes(speakerSearch?.toLowerCase())) {
								return search
							}
						})
						?.map((speaker, index) => {
							const { id, first_name, last_name } = speaker
							return <CustomCheckbox checked={Object.values(expoSpeakers).includes(id.toString()) ? true : false} className='checkbox' key={id} type='checkbox' name='speakers' value={id} labeltitle={`${first_name} ${last_name}`} onChange={(e) => speakerFilterHandler(e, id)} />
						})}
					{speakerNoData && <div className={`${styles.no_data} red-color`}>No speakers found...</div>}
				</FilterAccordion>
			</div>
		</>
	)
}

export default Filtes

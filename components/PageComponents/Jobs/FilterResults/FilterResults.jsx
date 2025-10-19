import React, { useRef, useState } from 'react'
import ListingLayout from '../../../UI/ListingLayout/ListingLayout'
import LeftCol from '../../../UI/ListingLayout/LeftCol/LeftCol'
import RightCol from '../../../UI/ListingLayout/RigthCol/RightCol'
import Filters from './Filter/Filters'
import JobsList from './JobsList/JobsList'
import { DarkLoader, LiteLoader } from '../../../Loader/Loader'
import styles from './FilterResults.module.css'
import FilterBtnForMob from '../../../UI/FilterBtnForMob/FilterBtnForMob'
// import PageContent from '../../../UI/PageContent/PageContent'
import JobsSearch from './JobsSearch/JobsSearch'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { baseApiUrl } from '../../../../utils/config'
import { DateTime, minus } from 'luxon'
import useLocalStorageState from 'use-local-storage-state'

const FilterResults = ({ filterData, loginUser, userData }) => {
	const [searchDataChanged, setsearchDataChanged] = useState(false)

	const result_wrapper = useRef(null)
	const [loading, setloading] = useState(false)

	const [searchJobs, setsearchJobs] = useState(filterData?.job_detail?.data)
	const [currentPage, setcurrentPage] = useState(filterData?.job_detail?.current_page)
	const [lastPage, setlastPage] = useState(filterData?.job_detail?.last_page)
	const [hasMoreData, sethasMoreData] = useState(filterData?.job_detail?.last_page > 1 ? true : false)

	const [filterActive, setfilterActive] = useState(false)

	const [companyFilter, setcompanyFilter] = useLocalStorageState('dvm-companyFilter', { defaultValue: [] })
	const [countryFilter, setcountryFilter] = useLocalStorageState('dvm-countryFilter', { defaultValue: [] })
	const [stateFilter, setstateFilter] = useLocalStorageState('dvm-stateFilter', { defaultValue: [] })
	const [jobcategoryFilter, setjobcategoryFilter] = useLocalStorageState('dvm-jobcategoryFilter', { defaultValue: [] })
	const [jobtypeFilter, setjobtypeFilter] = useLocalStorageState('dvm-jobtypeFilter', { defaultValue: [] })
	const [workingtimeFilter, setworkingtimeFilter] = useLocalStorageState('dvm-workingtimeFilter', { defaultValue: [] })
	const [educationFilter, seteducationFilter] = useLocalStorageState('dvm-educationFilter', { defaultValue: [] })
	const [salarytypeFilter, setsalarytypeFilter] = useLocalStorageState('dvm-salarytypeFilter', { defaultValue: [] })
	const [hiringFilter, sethiringFilter] = useLocalStorageState('dvm-hiringFilter', { defaultValue: [] })
	const [defaultDateOption, setdefaultDateOption] = useLocalStorageState('dvm-dateTime', { defaultValue: 'All time' })
	const [searchValue, setsearchValue] = useLocalStorageState('dvm-jobSearchValue', { defaultValue: '' })
	const [minValue, setminValue] = useLocalStorageState('dvm-minValue', { defaultValue: filterData?.filters?.min_price })
	const [maxValue, setmaxValue] = useLocalStorageState('dvm-maxValue', { defaultValue: filterData?.filters?.max_price })
	const [dataChange, setdataChange] = useState(false)
	const [searchLoading, setsearchLoading] = useState(false)
	const [searchActive, setsearchActive] = useState(false)

	const searchRef = useRef(null)

	const minSalaryEl = useRef(null)
	const maxSalaryEl = useRef(null)

	// const [initialFilterLoading, setinitialFilterLoading] = useState(true)

	const fetchData = async () => {
		if (filterActive) {
			const today = DateTime.now()
			let postDate
			if (defaultDateOption === 'Last 24 hours') {
				postDate = today.minus({ day: 1 }).toFormat('yyyy-LL-dd')
			} else if (defaultDateOption === 'Last 7 days') {
				postDate = today.minus({ day: 7 }).toFormat('yyyy-LL-dd')
			} else if (defaultDateOption === 'Last 30 days') {
				postDate = today.minus({ day: 30 }).toFormat('yyyy-LL-dd')
			} else postDate = null

			const res = await axios.post(`${baseApiUrl}/jobs/filter?page=${currentPage + 1}`, {
				vendors: companyFilter,
				countries: countryFilter,
				states: stateFilter,
				categories: jobcategoryFilter,
				types: jobtypeFilter,
				working_time: workingtimeFilter,
				educations: educationFilter,
				salary_types: salarytypeFilter,
				salary_range: {
					0: minValue,
					1: maxValue
				},
				hiring: {
					0: hiringFilter
				},
				date: postDate,
				search: searchRef?.current?.value
			})

			setsearchJobs((prev) => [...prev, ...res?.data?.job_detail?.data])
			setcurrentPage(res?.data?.job_detail?.current_page)
			setlastPage(res?.data?.job_detail?.last_page)
			sethasMoreData(res?.data?.job_detail?.data?.length > 0 ? true : false)
		} else {
			const res = await axios(`${baseApiUrl}/jobs?page=${currentPage + 1}`)
			setsearchJobs((prev) => [...prev, ...res?.data?.job_detail?.data])
			setcurrentPage(res?.data?.job_detail?.current_page)
			setlastPage(res?.data?.job_detail?.last_page)
			sethasMoreData(res?.data?.job_detail?.data?.length > 0 ? true : false)
		}
	}

	return filterData?.job_detail?.data?.length > 0 ? (
		<>
			<LiteLoader className={`${loading ? 'show-bd' : 'hide-bd'} modal-bg transition`} />
			<ListingLayout className={`${styles.layout} ${filterData?.job_detail?.data?.length === 0 ? styles.single_col : undefined}`}>
				{filterData?.job_detail?.data?.length > 0 && (
					<LeftCol className={styles.left_col}>
						<Filters
							searchValue={searchValue}
							setsearchValue={setsearchValue}
							filterData={filterData?.filters}
							setsearchJobs={setsearchJobs}
							result_wrapper={result_wrapper}
							setloading={setloading}
							sethasMoreData={sethasMoreData}
							setfilterActive={setfilterActive}
							setcurrentPage={setcurrentPage}
							setlastPage={setlastPage}
							companyFilter={companyFilter}
							setcompanyFilter={setcompanyFilter}
							countryFilter={countryFilter}
							setcountryFilter={setcountryFilter}
							stateFilter={stateFilter}
							setstateFilter={setstateFilter}
							jobcategoryFilter={jobcategoryFilter}
							setjobcategoryFilter={setjobcategoryFilter}
							jobtypeFilter={jobtypeFilter}
							setjobtypeFilter={setjobtypeFilter}
							workingtimeFilter={workingtimeFilter}
							setworkingtimeFilter={setworkingtimeFilter}
							educationFilter={educationFilter}
							seteducationFilter={seteducationFilter}
							salarytypeFilter={salarytypeFilter}
							setsalarytypeFilter={setsalarytypeFilter}
							hiringFilter={hiringFilter}
							sethiringFilter={sethiringFilter}
							minValue={minValue}
							setminValue={setminValue}
							maxValue={maxValue}
							setmaxValue={setmaxValue}
							defaultDateOption={defaultDateOption}
							setdefaultDateOption={setdefaultDateOption}
							minSalaryEl={minSalaryEl}
							maxSalaryEl={maxSalaryEl}
							DateTime={DateTime}
							minus={minus}
							dataChange={dataChange}
							setdataChange={setdataChange}
							searchRef={searchRef}
							setsearchActive={setsearchActive}
							setsearchLoading={setsearchLoading}
							searchActive={searchActive}
							searchDataChanged={searchDataChanged}
							loginUser={loginUser}
							userData={userData}
						/>
					</LeftCol>
				)}
				<RightCol className={filterData?.job_detail?.data?.length === 0 ? styles.single_right_col : undefined}>
					<InfiniteScroll className={styles.scroller} dataLength={searchJobs?.length} next={fetchData} scrollThreshold={0.4} hasMore={hasMoreData} loader={lastPage > 1 && <DarkLoader className={styles.pagination_loader} />}>
						<div ref={result_wrapper} className='inner-sec-pb'>
							<div className={styles.search_filte_wrapper}>
								<JobsSearch searchValue={searchValue} setsearchValue={setsearchValue} setsearchDataChanged={setsearchDataChanged} searchLoading={searchLoading} setsearchLoading={setsearchLoading} setsearchActive={setsearchActive} searchRef={searchRef} setdataChange={setdataChange} />

								{filterData?.job_detail?.data?.length > 0 && (
									<FilterBtnForMob className={styles.mob_filter}>
										<Filters
											searchValue={searchValue}
											setsearchActive={setsearchActive}
											searchActive={searchActive}
											filterData={filterData?.filters}
											setsearchJobs={setsearchJobs}
											result_wrapper={result_wrapper}
											setsearchLoading={setsearchLoading}
											setloading={setloading}
											sethasMoreData={sethasMoreData}
											setfilterActive={setfilterActive}
											setcurrentPage={setcurrentPage}
											setlastPage={setlastPage}
											companyFilter={companyFilter}
											setcompanyFilter={setcompanyFilter}
											countryFilter={countryFilter}
											setcountryFilter={setcountryFilter}
											stateFilter={stateFilter}
											setstateFilter={setstateFilter}
											jobcategoryFilter={jobcategoryFilter}
											setjobcategoryFilter={setjobcategoryFilter}
											jobtypeFilter={jobtypeFilter}
											setjobtypeFilter={setjobtypeFilter}
											workingtimeFilter={workingtimeFilter}
											setworkingtimeFilter={setworkingtimeFilter}
											educationFilter={educationFilter}
											seteducationFilter={seteducationFilter}
											salarytypeFilter={salarytypeFilter}
											setsalarytypeFilter={setsalarytypeFilter}
											hiringFilter={hiringFilter}
											sethiringFilter={sethiringFilter}
											minValue={minValue}
											setminValue={setminValue}
											maxValue={maxValue}
											setmaxValue={setmaxValue}
											defaultDateOption={defaultDateOption}
											setdefaultDateOption={setdefaultDateOption}
											minSalaryEl={minSalaryEl}
											maxSalaryEl={maxSalaryEl}
											DateTime={DateTime}
											minus={minus}
											dataChange={dataChange}
											setdataChange={setdataChange}
											searchRef={searchRef}
											loginUser={loginUser}
											userData={userData}
										/>
									</FilterBtnForMob>
								)}
							</div>
							<div className={styles.result_wrapper}>
								{searchJobs?.length > 0 ? (
									searchJobs?.map((job, i) => {
										return <JobsList key={i} job={job} loginUser={loginUser} userData={userData} />
									})
								) : (
									<div className='gray-color inner-sec-p'>No job found...</div>
								)}
							</div>
						</div>
					</InfiniteScroll>
				</RightCol>
			</ListingLayout>
		</>
	) : (
		<div className='inner-sec-p'>
			<div className='gray-color sec-container'>No job found...</div>
		</div>
	)
}

export default FilterResults

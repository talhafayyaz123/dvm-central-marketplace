import React, { useRef, useState } from 'react'
import { baseApiUrl } from '../../../../utils/config'
import styles from './Search.module.css'
import { DarkLoader } from '../../../Loader/Loader'
import axios from 'axios'

const Search = ({ searchVal, setsearchHasMoreData, setsearchCurrentPage, setsearchLastPage, setshowSearchData, setsearchData }) => {
	const [loading, setloading] = useState(false)
	const searchReq = useRef(0)

	const vendorSearchHandler = async (e) => {
		const currentReq = ++searchReq.current
		setloading(true)
		const res = await axios.get(`${baseApiUrl}/search-vendors?search_input=${searchVal.current.value}&page=1`)
		if (currentReq === searchReq.current) {
			setsearchData(res?.data?.data)
			setsearchCurrentPage(res?.data?.current_page)
			setsearchLastPage(res?.data?.last_page)
			setshowSearchData(true)

			if (res?.data?.data?.length > 0) {
				setsearchHasMoreData(true)
			} else {
				setsearchHasMoreData(false)
			}
		}

		setloading(false)
	}

	return (
		<div className={`${styles.search_input_container} white-bg shadow`}>
			<div className={`${styles.search_wrapper} gray-border`}>
				<input ref={searchVal} type='search' className={`${styles.search_input} `} placeholder='Search vendors ...' value={searchVal.cuurent} onChange={(e) => vendorSearchHandler(e)} />

				{loading ? (
					<DarkLoader />
				) : (
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--primary)'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
					</svg>
				)}
			</div>
		</div>
	)
}

export default Search

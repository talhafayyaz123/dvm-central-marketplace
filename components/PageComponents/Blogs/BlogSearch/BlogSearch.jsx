import React, { useRef } from 'react'
import styles from './BlogSearch.module.css'
import { LiteLoader } from '../../../Loader/Loader'
import axios from 'axios'
import { baseApiUrl } from '../../../../utils/config'

const NewsBlogSearch = ({ searchVal, loading, setloading, setsearchHasMoreData, setsearchCurrentPage, setsearchlastPage, setshowSearchData, setsearchData, initialData }) => {
	const searchReq = useRef(0)
	const searchApiHandler = async () => {
		const currentReq = ++searchReq.current
		if (searchVal?.current?.value?.trim().length > 0 || searchVal?.current?.value?.length > 0) {
			setloading(true)
			const res = await fetch(`${baseApiUrl}/blogs-search?search=${searchVal?.current?.value}&page=1`, {
				method: 'GET',
				headers: {
					type: 'dvm_central'
				}
			}).then((res) => res.json())
			console.log('this is res', res)
			if (currentReq === searchReq.current) {
				setsearchData(res?.blogs?.data)
				setsearchCurrentPage(res?.blogs?.current_page)
				setsearchlastPage(res?.blogs?.last_page)

				if (res?.blogs?.data?.length > 0) {
					setsearchHasMoreData(true)
				} else {
					setsearchHasMoreData(false)
				}
			}

			setloading(false)
			setshowSearchData(true)
		} else {
			setsearchData(initialData)
			setTimeout(() => {
				setshowSearchData(false)
			}, 1000)
		}
	}

	return (
		<div>
			<div>
				<div className={styles.search_container}>
					<div className={`${styles.search_wrapper} `}>
						<input ref={searchVal} className='gray-border' type='search' placeholder={`Search for blogs...`} onChange={(e) => searchApiHandler(e)} />
						<div className={`${styles.search_wrapper_icon} primary-btn transition`}>
							{loading ? (
								<LiteLoader />
							) : (
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--white)'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
								</svg>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewsBlogSearch

import React from 'react'
import styles from './JobsSearch.module.css'
import { DarkLoader } from '../../../../Loader/Loader'

const JobsSearch = ({ searchRef, searchLoading, setdataChange, setsearchActive, setsearchDataChanged, searchValue, setsearchValue }) => {
	return (
		<div className={`${styles.search_container} gray-border radius`}>
			<div className={`${styles.search_wrapper} `}>
				<input
					ref={searchRef}
					className='gray-border'
					type='search'
					placeholder='Search...'
					defaultValue={searchValue}
					onChange={() => {
						setdataChange(true)
						setsearchActive(true)
						setsearchDataChanged(searchRef.current.value)
						setsearchValue(searchRef?.current?.value)
					}}
				/>
			</div>
			{searchLoading ? (
				<DarkLoader className={styles.loader} />
			) : (
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
				</svg>
			)}
		</div>
	)
}

export default JobsSearch

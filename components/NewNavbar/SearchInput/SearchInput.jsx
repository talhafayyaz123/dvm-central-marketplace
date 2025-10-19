import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './SearchInput.module.css'
import { baseApiUrl } from '../../../utils/config'
import SearchResults from './SearchResults/SearchResults'
import { DarkLoader, LiteLoader } from '../../Loader/Loader'
import { useRouter } from 'next/router'
import { GlobalProvider } from '../../../context/AppProvider'
import axios from 'axios'

const SearchInput = ({ mobSearchSidebar, setmodal, setModalData, closeSearchHanlder, searchType, type }) => {
	const [searchResults, setSearchResults] = useState('')
	const [loading, setLoading] = useState(false)
	const [searchedValue, setSearchedValue] = useState('')
	const [inputError, setinputError] = useState(false)
	const router = useRouter()

	const inputRef = useRef(null)
	const searchRef = useRef(0)

	const { addTocartItem, showSearchResults, setshowSearchResults, searchBD, setsearchBD, showMobSearchNav, setshowMobSearchNav, loginUser, userData, cartBtnLoading, clickedProduct } = useContext(GlobalProvider)

	const searchVal = ''

	const searchHandler = async () => {
		const currentReq = ++searchRef.current
		searchVal = await inputRef.current.value

		setSearchedValue(() => searchVal)
		const inputValidation = /.*\S.*/.test(inputRef.current.value)
		if (inputValidation && inputRef.current.value.length > 0 && currentReq === searchRef.current) {
			setinputError(false)
			setsearchBD(true)
			setLoading(true)
			let res = await axios.get(`${baseApiUrl}/search?search_input=${inputRef.current.value}`, {
				header: {
					type: loginUser?.id
				}
			})

			console.log('this is res', res)

			if (currentReq === searchRef.current) {
				setSearchResults(res?.data)
			}

			setLoading(false)
			setshowSearchResults(true)
		} else if ((searchVal === '' || searchVal === undefined) && !loading) {
			setinputError(false)
			setTimeout(() => {
				type === 'desktop' && closeSearchHanlder()
				return
			}, 1500)
		}
	}

	const enterPressHandler = async (e) => {
		const inputValidation = /.*\S.*/.test(inputRef.current.value)

		if (e.key === 'Enter' && inputValidation) {
			await closeSearchHanlder()
			router.push(`/all-search-results/search/${searchedValue}`)
		} else if (e.key === 'Enter' && !inputValidation) {
			setinputError(true)
			return
		}
	}
	const searchIconHandler = () => {
		const inputValidation = /.*\S.*/.test(inputRef.current.value)

		if (inputValidation) {
			setinputError(false)
			router.push(`/all-search-results/search/${searchedValue}`)
			setshowSearchResults(false)
			setsearchBD(false)
		} else {
			setinputError(true)
			return
		}
	}

	useEffect(() => {
		router.events.on('routeChangeComplete', () => {
			if (showMobSearchNav) {
				setshowMobSearchNav(false)
				setTimeout(() => {
					closeSearchHanlder()
				}, 500)
			}
		})
	}, [router])

	return (
		<div className={styles.input_container}>
			<div className={`${styles.input_wrapper} ${inputError ? 'check-box-error' : undefined} white-bg`}>
				<div className={`${styles.input_inner_wrapper}`}>
					{inputError && <div className={styles.input_error}>Enter something</div>}
					<input
						ref={inputRef}
						type='search'
						placeholder='Search something ...'
						className='desktop-search-bar white-bg'
						onKeyDown={(e) => enterPressHandler(e)}
						onClick={() => {
							setsearchBD(true), setinputError(false)
						}}
						onChange={(e) => searchHandler(e)}
					/>
				</div>

				<div className={styles.search_icon_wrapper} onClick={() => searchIconHandler()}>
					{loading ? (
						<DarkLoader />
					) : (
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
						</svg>
					)}
				</div>
			</div>
			{/* add animation */}
			{
				searchBD && (
					<>					
					<div className={`header-input-bg modal-bg transition ${styles.modal_bg} ${searchBD ? 'show-bd' : 'hide-bd'} transition`} onClick={() => closeSearchHanlder()} />
					<SearchResults
						mobSearchSidebar={mobSearchSidebar}
						addTocartItem={addTocartItem}
						searchResults={searchResults}
						showSearchResults={showSearchResults}
						closeSearchHanlder={closeSearchHanlder}
						searchedValue={searchedValue}
						setmodal={setmodal}
						setModalData={setModalData}
						searchType={searchType}
						setshowSearchResults={setshowSearchResults}
						setsearchBD={setsearchBD}
						loginUser={loginUser}
						userPosition={userData?.position}
						searchBD={searchBD}
						cartBtnLoading={cartBtnLoading}
						clickedProduct={clickedProduct}
						loading={loading}
					/>
					</>
				)
			}
		</div>
	)
}

export default SearchInput

import Link from 'next/link'
import React from 'react'
import SearchCard from './SearchCard/SearchCard'
import styles from './SearchResults.module.css'

const SearchResults = ({ showSearchResults, setshowSearchResults, searchResults, addTocartItem, searchedValue, closeSearchHanlder, mobSearchSidebar, setmodal, setModalData, setsearchBD, loginUser, userPosition, searchBD, cartBtnLoading, clickedProduct, searchType, loading }) => {
	return (
		<>
			<div className={`${styles.search_results_container} search_result-container ${showSearchResults ? 'show-bd' : 'hide-bd'} ${!showSearchResults && styles.hide_results}`}>
				<div className={`${styles.search_results_wrapper} bg-white`}>
					{searchResults?.data?.length > 0 && searchBD && showSearchResults
						? searchResults?.data?.map((result, index) => {
								return (
									<SearchCard
										key={result.id}
										cartBtnLoading={cartBtnLoading}
										clickedProduct={clickedProduct}
										addTocartItem={addTocartItem}
										closeSearchHanlder={closeSearchHanlder}
										mobSearchSidebar={mobSearchSidebar}
										result={result}
										searchType={searchType}
										setModalData={setModalData}
										setmodal={setmodal}
										index={index}
										setshowSearchResults={setshowSearchResults}
										setsearchBD={setsearchBD}
										loginUser={loginUser}
										userPosition={userPosition}
									/>
								)
						  })
						: searchBD && showSearchResults && !loading && <p className={styles.no_results_btn}>No results found.</p>}

					{searchResults?.data?.length > 0 && searchBD && showSearchResults && !loading && (
						<Link href={`/all-search-results/search/${searchedValue}`}>
							<a className={`${styles.all_results_btn} primary-bg white-color }`} onClick={() => closeSearchHanlder()}>
								View All Results
							</a>
						</Link>
					)}
				</div>
			</div>
		</>
	)
}

export default SearchResults

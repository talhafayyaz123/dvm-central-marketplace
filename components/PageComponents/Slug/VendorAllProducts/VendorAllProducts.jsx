import React, { useContext, useRef, useState } from 'react'
import LeftCol from '../../../UI/ListingLayout/LeftCol/LeftCol'
import ListingLayout from '../../../UI/ListingLayout/ListingLayout'
import styles from './VendorAllProducts.module.css'
import RigthCol from '../../../UI/ListingLayout/RigthCol/RightCol'
import LeftColContent from './LeftColContent/LeftColContent'
import RightColContent from './RightColContent/RightColContent'
import { LiteLoader } from '../../../Loader/Loader'
import { GlobalProvider } from '../../../../context/AppProvider'
import useLocalStorageState from 'use-local-storage-state'

const VendorAllProducts = ({ result }) => {
	const [initialData, setinitialData] = useState(result?.data?.vendors_all_products?.data)
	const [productsLoading, setproductsLoading] = useState(false)
	const [sortedValue, setsortedValue] = useLocalStorageState('dvm-sortedValue', { defaultValue: '' })

	const [filterChanged, setfilterChanged] = useState(false)
	const [searchChanged, setsearchChanged] = useState(false)

	const [currentPage, setcurrentPage] = useState(result?.data?.vendors_all_products?.current_page)
	const [lastPage, setlastPage] = useState(result?.data?.vendors_all_products?.last_page)
	const [hasMoreData, sethasMoreData] = useState(true)

	const [showFilterData, setshowFilterData] = useLocalStorageState('dvm-showFilterData', { defaultValue: false })
	// const [showSearchData, setshowSearchData] = useLocalStorageState('dvm-showSearchData', { defaultValue: false })

	const [categoriesFilter, setcategoriesFilter] = useLocalStorageState('dvm-productCategories', { defaultValue: [] })

	const [totalResults, settotalResults] = useState(result?.data?.vendors_all_products?.total)

	const resultsWrapper = useRef(null)
	const searchVal = useRef(null)

	const { loginUser } = useContext(GlobalProvider)

	const [searchValue, setsearchValue] = useState(false)

	return (
		<>
			<LiteLoader className={`${styles.products_loader} transition ${productsLoading ? 'show-bd' : 'hide-bd'}`} />

			<ListingLayout className={result?.data?.vendors_all_categories?.length == 0 && styles.single_listing_col}>
				{result?.data?.vendors_all_categories?.length > 0 && (
					<LeftCol className={styles.left_col}>
						<LeftColContent
							categoriesFilter={categoriesFilter}
							filterChanged={filterChanged}
							setfilterChanged={setfilterChanged}
							setcategoriesFilter={setcategoriesFilter}
							setcurrentPage={setcurrentPage}
							setlastPage={setlastPage}
							setshowFilterData={setshowFilterData}
							sethasMoreData={sethasMoreData}
							allCategories={result?.data?.vendors_all_categories}
							setinitialData={setinitialData}
							vendorId={result?.data?.vendor?.id}
							showFilterData={showFilterData}
							setproductsLoading={setproductsLoading}
							resultsWrapper={resultsWrapper}
							sortedValue={sortedValue}
							// setshowSearchData={setshowSearchData}
							totalResults={totalResults}
							settotalResults={settotalResults}
							loginUser={loginUser}
							searchVal={searchVal}
							setsearchValue={setsearchValue}
							searchValue={searchValue}
							// categoriesFilter={categoriesFilter}
						/>
					</LeftCol>
				)}
				<RigthCol className={`${styles.right_col} ${result?.data?.vendors_all_categories?.length == 0 && styles.single_col} radius`}>
					<RightColContent
						sortedValue={sortedValue}
						setsortedValue={setsortedValue}
						setfilterChanged={setfilterChanged}
						sethasMoreData={sethasMoreData}
						setcurrentPage={setcurrentPage}
						setlastPage={setlastPage}
						currentPage={currentPage}
						lastPage={lastPage}
						hasMoreData={hasMoreData}
						defaultDataLength={result?.data?.vendors_all_categories?.length}
						initialData={initialData}
						setinitialData={setinitialData}
						vendorId={result?.data?.vendor?.id}
						resultsWrapper={resultsWrapper}
						showFilterData={showFilterData}
						categoriesFilter={categoriesFilter}
						// showSearchData={showSearchData}
						// setshowSearchData={setshowSearchData}
						searchVal={searchVal}
						setshowFilterData={setshowFilterData}
						searchChanged={searchChanged}
						setsearchChanged={setsearchChanged}
						// dataNotChanged={dataNotChanged}
						// setdataNotChanged={setdataNotChanged}
						setproductsLoading={setproductsLoading}
						filterChanged={filterChanged}
						setcategoriesFilter={setcategoriesFilter}
						allCategories={result?.data?.vendors_all_categories}
						totalResults={totalResults}
						settotalResults={settotalResults}
						loginUser={loginUser}
						setsearchValue={setsearchValue}
						// sortedValue={sortedValue}
					/>
				</RigthCol>
			</ListingLayout>
		</>
	)
}

export default VendorAllProducts

import React, { useRef, useState } from 'react'
import styles from './ListingResults.module.css'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import FilterBtnForMob from '../../../UI/FilterBtnForMob/FilterBtnForMob'
import Filters from '../Filters/Filters'
import { DarkLoader, LiteLoader } from '../../../Loader/Loader'
import Modal from '../../../UI/Modal/Modal'
import VideoModal from '../../../UI/ModalProductDetail/ImgsGallery/VideoModal/VideoModal'
import ModalProductDetail from '../../../UI/ModalProductDetail/ProductDetail'
import { baseApiUrl } from '../../../../utils/config'
import HorizontalCard from '../../../UI/HorizontalCard/HorizontalCard'
import NewCard from '../../../UI/NewCard/NewCard'

const ListingResults = ({
	totalResults,
	currentData,
	setcurrentData,
	currentPage,
	setcurrentPage,
	lastPage,
	setlastPage,
	hasMoreData,
	sethasMoreData,
	loading,
	selectedVal,
	setselectedVal,
	setfilterChange,
	resultWrapper,
	showFilterData,
	vendorFilter,
	priceFilter,
	filterChange,
	setLoading,
	brands,
	setvendorFilter,
	setpriceFilter,
	setshowFilterData,
	settotalResults,
	pageName,
	filterType,
	heading,
	selectedOption,
	setselectedOption,
	defaultDataLength,
	loginUser
}) => {
	const [showDropdown, setShowDropdown] = useState(false)
	const [iscolumn, setisColumn] = useState(false)

	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	const sortWrapper = useRef(null)

	console.log('featured_login_id', loginUser?.id)

	const selectOptionHandler = (e) => {
		let newselectedOption
		if (e.target.innerText === 'Clear Sorting') {
			newselectedOption = ''
		} else if (e.target.innerText === 'Featured') {
			newselectedOption = 'featured'
		} else if (e.target.innerText === 'Best Selling') {
			newselectedOption = 'best_selling'
		} else if (e.target.innerText === 'Alphabetically, A-Z') {
			newselectedOption = 'a_to_z'
		} else if (e.target.innerText === 'Alphabetically, Z-A') {
			newselectedOption = 'z_to_a'
		} else if (e.target.innerText === 'Price, low to high') {
			newselectedOption = 'low_to_high'
		} else if (e.target.innerText === 'Price, high to low') {
			newselectedOption = 'high_to_low'
		} else if (e.target.innerText === 'Date, old to new') {
			newselectedOption = 'old_to_new'
		} else if (e.target.innerText === 'Date, new to old') {
			newselectedOption = 'new_to_old'
		}

		setselectedVal(newselectedOption)
		setselectedOption(e.target.innerText === 'Clear Sorting' ? 'Sort By' : e.target.innerText)

		setShowDropdown(false)
		setfilterChange(true)
	}

	const gridLayoutHandler = () => {
		setisColumn(false)
	}

	const columnLayoutHandler = () => {
		setisColumn(true)
	}

	const fetchData = async () => {
		if (!showFilterData) {
			const res = await axios.get(`${baseApiUrl}/products/${pageName}?page=${currentPage + 1}`, {
				headers: {
					type: loginUser?.id !== undefined && loginUser?.id
				}
			})

			console.log('res from pagination', res)

			setcurrentData((prev) => [...prev, ...res?.data?.products?.data])
			setcurrentPage(res?.data?.products?.current_page)
			setlastPage(res?.data?.products?.last_page)
			if (res?.data?.products?.data?.length > 0) {
				sethasMoreData(true)
			} else sethasMoreData(false)
		} else {
			const data = {
				filter: {
					vendor_ids: vendorFilter,
					prices: priceFilter,
					type: filterType
				},
				sort_type: selectedVal
			}

			const res = await axios.post(`${baseApiUrl}/filter-special-products?page=${currentPage + 1}`, data, {
				headers: {
					type: loginUser?.id !== undefined && loginUser?.id
				}
			})

			console.log('res from filter pagination', res)

			setcurrentData((prev) => [...prev, ...res?.data?.data?.all_products?.data])
			setcurrentPage(res?.data?.data?.all_products?.current_page)
			setlastPage(res?.data?.data?.all_products?.last_page)
			if (res?.data?.data?.all_products?.data?.length > 0) {
				sethasMoreData(true)
			} else sethasMoreData(false)
		}
	}

	if (typeof window !== 'undefined') {
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showDropdown) {
				if (!sortWrapper?.current?.contains(e.target)) {
					setShowDropdown(false)
				}
			} else return
		})
	}

	return (
		<>
			<InfiniteScroll
				className={styles.scroller}
				dataLength={currentData?.length}
				next={fetchData}
				scrollThreshold={0.6}
				hasMore={hasMoreData}
				loader={lastPage > 1 && <DarkLoader className={styles.pagination_loader} />}
				// endMessage={
				// 	currentData?.length > 0 &&
				// 	lastPage > 1 && (
				// 		<p style={{ textAlign: 'center' }} className={`${styles.pagination_loader} red-color`}>
				// 			Sorry, no more product is available this time...
				// 		</p>
				// 	)
				// }
			>
				<div ref={resultWrapper} className={styles.listing_results_container}>
					<LiteLoader className={`modal-bg transition ${loading ? 'show-bd' : 'hide-bd'} `} />
					<h3 className={`${styles.title} black-color`}>{heading}</h3>

					<div className={styles.result_num_wrapper}>
						<div className={styles.result_num_inner_wrapper}>
							<div className={`result-num ${styles.results}`}>
								{totalResults} Result{totalResults > 1 && <span>s</span>}
							</div>

							{defaultDataLength > 0 && (
								<div ref={sortWrapper} className={styles.sort_wrapper}>
									<div className={styles.dropdown_container}>
										<div className={`${styles.dropdown_wrapper} ${showDropdown ? styles.active_view : undefined}`} onClick={() => setShowDropdown(!showDropdown)}>
											<div className='match-selected-option mr-2'>{selectedOption}</div>
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000' className='w-3 h-3'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
											</svg>
										</div>
										<ul className={`${styles.dropdown_menu} ${showDropdown ? 'show_menu' : 'hide-menu'}`}>
											{selectedVal !== '' && <li onClick={(e) => selectOptionHandler(e)}>Clear Sorting</li>}
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Featured' ? styles.active_sort : undefined}>
												Featured
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Best Selling' ? styles.active_sort : undefined}>
												Best Selling
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Alphabetically, A-Z' ? styles.active_sort : undefined}>
												Alphabetically, A-Z
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Alphabetically, Z-A' ? styles.active_sort : undefined}>
												Alphabetically, Z-A
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Price, low to high' ? styles.active_sort : undefined}>
												Price, low to high
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Price, high to low' ? styles.active_sort : undefined}>
												Price, high to low
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Date, old to new' ? styles.active_sort : undefined}>
												Date, old to new
											</li>
											<li onClick={(e) => selectOptionHandler(e)} className={selectedOption == 'Date, new to old' ? styles.active_sort : undefined}>
												Date, new to old
											</li>
										</ul>
									</div>
								</div>
							)}
						</div>

						{defaultDataLength > 0 && (
							<div className={styles.mob_filter_btn_btns}>
								<FilterBtnForMob className={`${styles.mob_filter_btn}`}>
									<Filters
										filterChange={filterChange}
										setfilterChange={setfilterChange}
										setLoading={setLoading}
										setcurrentData={setcurrentData}
										brands={brands}
										selectedVal={selectedVal}
										resultWrapper={resultWrapper}
										vendorFilter={vendorFilter}
										setvendorFilter={setvendorFilter}
										priceFilter={priceFilter}
										setpriceFilter={setpriceFilter}
										setcurrentPage={setcurrentPage}
										setlastPage={setlastPage}
										setshowFilterData={setshowFilterData}
										sethasMoreData={sethasMoreData}
										settotalResults={settotalResults}
										loginUser={loginUser}
									/>
								</FilterBtnForMob>

								<div className={styles.layout_icons_wrapper}>
									<div className={`${styles.grid_icon_wrapper} ${!iscolumn ? styles.active_view : undefined}`} onClick={() => gridLayoutHandler()}>
										<svg xmlns='http://www.w3.org/2000/svg' width={15} height='14.249' viewBox='0 0 15 14.249'>
											<path
												id='Vector'
												d='M14.3,14.249H11.328a.736.736,0,0,1-.7-.763V10.942a.736.736,0,0,1,.7-.764H14.3a.737.737,0,0,1,.7.764v2.544A.736.736,0,0,1,14.3,14.249Zm-5.313,0H6.017a.736.736,0,0,1-.7-.763V10.942a.736.736,0,0,1,.7-.764H8.983a.737.737,0,0,1,.7.764v2.544A.736.736,0,0,1,8.983,14.249Zm-5.31,0H.7a.736.736,0,0,1-.7-.763V10.942a.736.736,0,0,1,.7-.764h2.97a.736.736,0,0,1,.7.764v2.544A.735.735,0,0,1,3.673,14.249ZM14.3,9.16H11.328a.736.736,0,0,1-.7-.763V5.853a.736.736,0,0,1,.7-.764H14.3a.737.737,0,0,1,.7.764V8.4A.736.736,0,0,1,14.3,9.16Zm-5.313,0H6.017a.736.736,0,0,1-.7-.763V5.853a.736.736,0,0,1,.7-.764H8.983a.737.737,0,0,1,.7.764V8.4A.736.736,0,0,1,8.983,9.16Zm-5.31,0H.7A.736.736,0,0,1,0,8.4V5.853a.736.736,0,0,1,.7-.764h2.97a.736.736,0,0,1,.7.764V8.4A.735.735,0,0,1,3.673,9.16ZM14.3,4.071H11.328a.736.736,0,0,1-.7-.763V.764a.736.736,0,0,1,.7-.764H14.3a.737.737,0,0,1,.7.764V3.309A.736.736,0,0,1,14.3,4.071Zm-5.313,0H6.017a.736.736,0,0,1-.7-.763V.764A.736.736,0,0,1,6.017,0H8.983a.737.737,0,0,1,.7.764V3.309A.736.736,0,0,1,8.983,4.071Zm-5.31,0H.7A.736.736,0,0,1,0,3.309V.764A.736.736,0,0,1,.7,0h2.97a.736.736,0,0,1,.7.764V3.309A.735.735,0,0,1,3.673,4.071Z'
												fill={!iscolumn ? 'var(--primary)' : 'var(--new-gray)'}
											/>
										</svg>
									</div>
									<div className={`${styles.col_icon_wrapper} ${iscolumn ? styles.active_view : undefined}`} onClick={() => columnLayoutHandler()}>
										<svg xmlns='http://www.w3.org/2000/svg' width={15} height='14.212' viewBox='0 0 15 14.212'>
											<path
												id='col'
												d='M14.3,14.212H6.016a.735.735,0,0,1-.7-.76V10.913a.735.735,0,0,1,.7-.762H14.3a.735.735,0,0,1,.7.762v2.538A.734.734,0,0,1,14.3,14.212Zm-10.626,0H.7a.734.734,0,0,1-.7-.76V10.913a.735.735,0,0,1,.7-.762H3.671a.735.735,0,0,1,.7.762v2.538A.735.735,0,0,1,3.671,14.212ZM14.3,9.137H6.016a.735.735,0,0,1-.7-.762V5.838a.735.735,0,0,1,.7-.762H14.3a.735.735,0,0,1,.7.762V8.375A.735.735,0,0,1,14.3,9.137Zm-10.626,0H.7A.735.735,0,0,1,0,8.375V5.838a.735.735,0,0,1,.7-.762H3.671a.735.735,0,0,1,.7.762V8.375A.735.735,0,0,1,3.671,9.137ZM14.3,4.06H6.016a.735.735,0,0,1-.7-.76V.762A.735.735,0,0,1,6.016,0H14.3a.735.735,0,0,1,.7.762V3.3A.734.734,0,0,1,14.3,4.06Zm-10.626,0H.7A.734.734,0,0,1,0,3.3V.762A.735.735,0,0,1,.7,0H3.671a.735.735,0,0,1,.7.762V3.3A.735.735,0,0,1,3.671,4.06Z'
												fill={iscolumn ? 'var(--primary)' : 'var(--new-gray)'}
											/>
										</svg>
									</div>
								</div>
							</div>
						)}
					</div>

					{currentData?.length > 0 ? (
						<div className={`${styles.listing_results_wrapper} ${iscolumn && styles.single_col} ${defaultDataLength == 0 ? styles.single_grid : undefined} ${pageName !== 'hot-products' ? styles.horizontal_cards : undefined}`}>
							{currentData?.map((data, index) => {
								return pageName === 'hot-products' ? (
									<NewCard iscolumn={iscolumn} key={index} data={data} setmodal={setmodal} setModalData={setModalData} currentData={currentData} setmodalLoading={setLoading} />
								) : (
									<HorizontalCard iscolumn={iscolumn} key={index} data={data} setmodal={setmodal} setModalData={setModalData} currentData={currentData} setmodalLoading={setLoading} cardType='featured' />
								)
							})}
						</div>
					) : (
						<div className='red-color' style={{ marginTop: '1rem' }}>
							No product found...
						</div>
					)}
				</div>
			</InfiniteScroll>

			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>
		</>
	)
}

export default ListingResults

import axios from 'axios'
import React, { useRef, useState } from 'react'
import { baseApiUrl } from '../../../../../../../utils/config'
import { DarkLoader } from '../../../../../../Loader/Loader'
import styles from './Topbar.module.css'

const Topbar = ({ vendorId, displayType, setdisplayType, setshowSearchFilterResult, setsearchResultAllProducts, pageList, showSubPage, setshowSubPage, activeSubPageIndex, setactiveSubPageIndex, loginUser }) => {
	const [loading, setloading] = useState(false)
	const searchReq = useRef(0)

	const searchHandler = async (e) => {
		const currentReq = ++searchReq.current
		setloading(true)

		const res = await axios.get(`${baseApiUrl}/vendor-store-search?vendor_id=${vendorId}&search=${e.target.value}`, {
			headers: {
				type: loginUser?.id
			}
		})
		if (currentReq === searchReq.current) {
			if (e.target.value.length > 0) {
				setshowSearchFilterResult(true)
				let newAllProductsData = await res?.data?.data?.all_products?.data
				setsearchResultAllProducts(newAllProductsData)
			} else {
				setsearchResultAllProducts([])
				setshowSearchFilterResult(false)
			}
		}
		setloading(false)
	}

	return (
		<div className={styles.topbar_wrapper}>
			<ul className={styles.topbar_links} style={{ width: displayType !== 'products' ? '100%' : undefined }}>
				<li>
					<button
						className={`sml-btn gray-color ${displayType === 'products' && !showSubPage && styles.active_link}`}
						onClick={() => {
							setdisplayType('products')
							setshowSubPage(false)
							setactiveSubPageIndex(null)
						}}
					>
						Products
					</button>
				</li>

				{pageList?.length > 0 &&
					pageList?.map((page, index) => {
						const { id, name } = page
						return (
							<li key={id}>
								<button
									className={`sml-btn gray-color ${displayType !== 'warranty' && showSubPage && activeSubPageIndex === index && styles.active_link}`}
									onClick={() => {
										setdisplayType(null)
										setshowSubPage(true)
										setactiveSubPageIndex(index)
									}}
								>
									{name}
								</button>
							</li>
						)
					})}
			</ul>

			{displayType === 'products' && (
				<div className={`${styles.input_wrapper} gray-border`}>
					{loading ? (
						<DarkLoader loaderType='sml' className={styles.loader} />
					) : (
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
						</svg>
					)}
					<input className='gray-color' type='search' placeholder='Search in store' onChange={(e) => searchHandler(e)} />
				</div>
			)}
		</div>
	)
}

export default Topbar

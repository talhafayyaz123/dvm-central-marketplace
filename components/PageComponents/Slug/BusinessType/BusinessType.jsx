import React, { useState } from 'react'
import CategoryCard from '../../../UI/CategoryCard/CategoryCard'
import styles from './BusinessType.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import { baseApiUrl } from '../../../../utils/config'
import axios from 'axios'
import { DarkLoader } from '../../../Loader/Loader'

const BusinessType = ({ result, name }) => {
	const [currentData, setcurrentData] = useState(result?.main_categories?.data)
	const [currentPage, setcurrentPage] = useState(result?.main_categories?.current_page)
	const [lastPage, setlastPage] = useState(result?.main_categories?.last_page)
	const [hasMoreData, sethasMoreData] = useState(true)
	const router = useRouter()
	const [showMoreInfo, setshowMoreInfo] = useState(router?.asPath?.includes('/dentistry'))

	const fetchData = async () => {
		const res = await axios.get(`${baseApiUrl}${router?.asPath}?page=${currentPage + 1}`)

		setcurrentData((prev) => [...prev, ...res?.data?.main_categories?.data])
		setcurrentPage(res?.data?.main_categories?.current_page)
		setlastPage(res?.data?.main_categories?.last_page)
		if (res?.data?.main_categories?.data?.length > 0) {
			sethasMoreData(true)
		} else sethasMoreData(false)
	}
	return (
		<>
			<InfiniteScroll
				className={`${styles.scroller} sec-pb`}
				dataLength={currentData?.length}
				next={fetchData}
				scrollThreshold={0.6}
				hasMore={hasMoreData}
				loader={lastPage > 1 && <DarkLoader className={styles.pagination_loader} />}
				// endMessage={
				// 	currentData?.length > 0 &&
				// 	lastPage > 1 && (
				// 		<p style={{ textAlign: 'center' }} className={`${styles.pagination_loader} red-color`}>
				// 			Sorry, no more category is available this time...
				// 		</p>
				// 	)
				// }
			>
				<section className='sec-mt'>
					<div className='sec-container'>
						<h4>{name}</h4>
						<div className={`${styles.wrapper} inner-sec-mt`}>
							{currentData?.length > 0 ? (
								currentData?.map((data, index) => {
									return <CategoryCard key={index} data={data} />
								})
							) : (
								<div className='red-color'>No category found ...</div>
							)}
						</div>
					</div>
				</section>
			</InfiniteScroll>

			{result?.business_type?.long_description !== null && (
				<section className='sec-pb'>
					<div className='sec-container'>
						<hr className='gray' />

						<div
							className='dynamic-data gray-color inner-sec-pt'
							dangerouslySetInnerHTML={{
								__html: result?.business_type?.long_description.substring(0, showMoreInfo ? result?.business_type?.long_description?.length : 1000) + `${!showMoreInfo && result?.business_type?.long_description?.length > 1000 ? '...' : ''}`
							}}
						/>

						{!showMoreInfo && result?.business_type?.long_description?.length > 1000 && (
							<div>
								<button className={`${styles.read_more} primary-btn white-color`} onClick={() => setshowMoreInfo(true)}>
									Read More
								</button>
							</div>
						)}
					</div>
				</section>
			)}
		</>
	)
}

export default BusinessType

import React from 'react'
import styles from './AllBlogs.module.css'
import BlogCard from '../../../UI/BlogCard/BlogCard'
import { DarkLoader } from '../../../Loader/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { baseApiUrl } from '../../../../utils/config'

const AllBlogs = ({
	initialData,
	currentPage,
	lastPage,
	searchVal,
	setcurrentPage,
	setlastPage,
	setinitialData,
	hasMoreData,
	sethasMoreData,
	showSearchData,
	searchData,
	setsearchData,
	searchHasMoreData,
	setsearchHasMoreData,
	searchCurrentPage,
	setsearchCurrentPage,
	searchlastPage,
	setsearchlastPage
}) => {
	console.log('data leng', initialData?.length)
	const fetchData = async () => {
		if (!showSearchData) {
			console.log('from pagi')
			const res = await axios.get(`${baseApiUrl}/blogs?type=dvm_central&page=${currentPage + 1}`, {})

			setinitialData((prev) => [...prev, ...res?.data?.posts?.data])
			setcurrentPage(res?.data?.posts?.current_page)
			setlastPage(res?.data?.posts?.last_page)
			if (res?.data?.posts?.data?.length > 0) {
				sethasMoreData(true)
			} else sethasMoreData(false)
		} else {
			const res = await axios.get(!searchVal?.current?.value?.length < 1 && `${baseApiUrl}/blogs-search?dvm-central&search=${searchVal?.current?.value}&page=${searchCurrentPage + 1}`)

			setsearchData((prev) => [...prev, ...res?.data?.blogs?.data])
			setsearchCurrentPage(res?.data?.blogs?.current_page)
			setsearchlastPage(res?.data?.blogs?.last_page)
			if (res?.data?.blogs?.data?.length > 0) {
				sethasMoreData(true)
			} else setsearchHasMoreData(false)
		}
	}

	return (
		<>
			{!showSearchData ? (
				// default data
				<InfiniteScroll
					dataLength={initialData?.length}
					next={fetchData}
					scrollThreshold={0.3}
					hasMore={hasMoreData}
					loader={lastPage > 1 && <DarkLoader className={styles.pagination_loader} />}
					// scrollableTarget={'blog-container'}
					// endMessage={
					// 	data?.length > 0 &&
					// 	lastPage > 1 && (
					// 		<p style={{ textAlign: 'center' }} className={`${styles.pagination_loader} red-color`}>
					// 			Sorry, no additional blogs is available this time...
					// 		</p>
					// 	)
					// }
					className={styles.scroller}
				>
					<div className={`${styles.blogs_wrapper}`}>
						{initialData?.length > 0 ? (
							initialData?.map((blog, index) => {
								return <BlogCard key={index} data={blog} />
							})
						) : (
							<div className='red-color' style={{ paddingBottom: '1rem' }}>
								No blog available this time...
							</div>
						)}
					</div>
				</InfiniteScroll>
			) : (
				// if user opt for search
				<InfiniteScroll
					dataLength={searchData?.length}
					next={fetchData}
					scrollThreshold={0.3}
					hasMore={searchHasMoreData}
					loader={searchlastPage > 1 && <DarkLoader className={styles.pagination_loader} />}
					// endMessage={
					// 	searchData?.length > 0 &&
					// 	searchlastPage > 1 && (
					// 		<p style={{ textAlign: 'center' }} className={`${styles.pagination_loader} red-color`}>
					// 			Sorry, no additional blog is available this time...
					// 		</p>
					// 	)
					// }
					className={styles.scroller}
				>
					<div className={`${styles.blogs_wrapper}`}>
						{searchData?.length > 0 ? (
							searchData?.map((blog, index) => {
								return <BlogCard pageType='blogs' key={index} data={blog} />
							})
						) : (
							<div className='red-color' style={{ paddingBottom: '1rem' }}>
								No blog found...
							</div>
						)}
					</div>
				</InfiniteScroll>
			)}
		</>
	)
}

export default AllBlogs

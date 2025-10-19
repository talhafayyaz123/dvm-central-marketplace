import React, { useRef, useState } from 'react'
import HeroBanner from '../../UI/HeroBanner/HeroBanner'
import BlogSearch from './BlogSearch/BlogSearch'
import AllBlogs from './AllBlogs/AllBlogs'
import ListingLayout2 from '../../UI/ListingLayout2/ListingLayout2'
import LeftCol2 from '../../UI/ListingLayout2/LeftCol2/LeftCol2'
import RightCol2 from '../../UI/ListingLayout2/RightCol2/RightCol2'
import { imgApiUrl } from '../../../utils/config'
import MetaTags from '../../UI/MetaTags/MetaTags'
import styles from './Blogs.module.css'
import Modal from '../../UI/Modal/Modal'
import ModalProductDetail from '../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../UI/ModalProductDetail/ImgsGallery/VideoModal/VideoModal'
import BlogsSlider from '../../UI/BlosgSlider/BlogsSlider'
import NewCard from '../../UI/NewCard/NewCard'
import { LiteLoader } from '../../Loader/Loader'

const Blogs = ({ blogs, type }) => {
	const [loading, setloading] = useState(false)
	const [initialData, setinitialData] = useState(blogs?.posts?.data)
	const [currentPage, setcurrentPage] = useState(blogs?.posts?.current_page)
	const [lastPage, setlastPage] = useState(blogs?.posts?.last_page)
	const [hasMoreData, sethasMoreData] = useState(true)

	const [searchData, setsearchData] = useState([])
	const [searchCurrentPage, setsearchCurrentPage] = useState(null)
	const [searchlastPage, setsearchlastPage] = useState(null)
	const [showSearchData, setshowSearchData] = useState(false)
	const [searchHasMoreData, setsearchHasMoreData] = useState(false)

	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	const [modalLoading, setmodalLoading] = useState(false)

	const searchVal = useRef(null)

	return (
		<>
			<LiteLoader className={`modal-bg transition ${modalLoading ? 'show-bd' : 'hide-bd'}`} />
			<MetaTags title={blogs?.meta_title} description={blogs?.meta_description} keywords={blogs?.meta_keywords} ogImg={`${imgApiUrl.blogs.blog}/${blogs?.posts?.data[0]?.image_thumbnail}`} ogWidth={500} ogHeight={300}>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@graph': [
								{
									'@context': 'https://schema.org',
									'@type': 'BreadcrumbList',
									itemListElement: [
										{
											'@type': 'ListItem',
											position: 1,
											name: 'DVM Central - A Veterinary Marketplace',
											item: 'https://www.dvmcentral.com'
										},
										{
											'@type': 'ListItem',
											position: 2,
											name: 'Blogs',
											item: 'https://www.dvmcentral.com/blogs'
										}
									]
								}
							]
						})
					}}
				/>
			</MetaTags>
			<HeroBanner pageType='single_col' title={`Blogs${type === 'listing' ? `/${(blogs?.breadcrumbs[1]?.name).charAt(0).toUpperCase() + blogs?.breadcrumbs[1]?.name?.slice(1)}` : ''}`} />
			<section className='sec-pt'>
				<div className='sec-container'>
					<BlogSearch
						searchVal={searchVal}
						initialData={initialData}
						setsearchCurrentPage={setsearchCurrentPage}
						setsearchlastPage={setsearchlastPage}
						setsearchHasMoreData={setsearchHasMoreData}
						loading={loading}
						setloading={setloading}
						setinitialData={setinitialData}
						setshowSearchData={setshowSearchData}
						setsearchData={setsearchData}
					/>
					<ListingLayout2 className={styles.margin_layout}>
						<LeftCol2>
							<AllBlogs
								initialData={initialData}
								currentPage={currentPage}
								setcurrentPage={setcurrentPage}
								setsearchlastPage={setsearchlastPage}
								setinitialData={setinitialData}
								hasMoreData={hasMoreData}
								sethasMoreData={sethasMoreData}
								searchVal={searchVal}
								showSearchData={showSearchData}
								searchData={searchData}
								setsearchData={setsearchData}
								searchHasMoreData={searchHasMoreData}
								setsearchHasMoreData={setsearchHasMoreData}
								searchCurrentPage={searchCurrentPage}
								setsearchCurrentPage={setsearchCurrentPage}
								lastPage={lastPage}
								setlastPage={setlastPage}
								searchlastPage={searchlastPage}
							/>
						</LeftCol2>
						<RightCol2 className={styles.right_col}>
							{blogs?.new_products?.data?.length > 0 && (
								<>
									<h4>Hot New Arivals</h4>
									<div className={styles.products_wrapper}>
										{blogs?.new_products?.data?.map((product, index) => {
											return (
												<div key={product?.id} className={styles.product}>
													{/* <DealsCard data={product} setmodal={setmodal} setModalData={setModalData} currentData={initialData} pageType='home-v2' /> */}
													<NewCard data={product} index={index} setmodal={setmodal} setModalData={setModalData} currentData={initialData} setmodalLoading={setmodalLoading} />
												</div>
											)
										})}
									</div>
								</>
							)}
							<BlogsSlider data={blogs?.slider_area_data} />
						</RightCol2>
					</ListingLayout2>
				</div>
			</section>
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>
		</>
	)
}

export default Blogs

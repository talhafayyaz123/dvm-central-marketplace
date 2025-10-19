import React, { useState, useRef, useContext } from 'react'
import Blog from './Blog/Blog'
import styles from './BlogDetail.module.css'
import RecentBlogs from './RecentBlogs/RecentBlogs'
import MetaTags from '../../../UI/MetaTags/MetaTags'
import { baseApiUrl, imgApiUrl } from '../../../../utils/config'
import HeroBanner from '../../../UI/HeroBanner/HeroBanner'
import ListingLayout2 from '../../../UI/ListingLayout2/ListingLayout2'
import LeftCol2 from '../../../UI/ListingLayout2/LeftCol2/LeftCol2'
import RightCol2 from '../../../UI/ListingLayout2/RightCol2/RightCol2'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import Link from 'next/link'
import Wave from '../../../UI/Wave/Wave'
import NewArrivals from './NewArrivals/NewArrivals'
import Accordion from '../../../UI/Accordion/Accordion'
import { LiteLoader } from '../../../Loader/Loader'
import axios from 'axios'
import { GlobalProvider } from '../../../../context/AppProvider'
import BlogsComent from '../../../UI/BlogsComment/BlogsComent'
import BlogsSlider from '../../../UI/BlosgSlider/BlogsSlider'
import Message from '../../../UI/Message/Message'
import { useRouter } from 'next/router'

const BlogDetail = ({ data }) => {
	console.log(data)
	const validateRef = useRef()
	const ref = useRef()

	const router = useRouter()

	const [isRequired, setisRequired] = useState('')
	const [btnDisable, setbtnDisable] = useState(false)
	const [loading, setloading] = useState(false)
	const [allComments, setallComments] = useState(data?.comments?.data)
	const [modalLoading, setmodalLoading] = useState(false)

	const { setpopupSuccess, setresMsgforPopup, setshowresMsg, loginUser } = useContext(GlobalProvider)

	const sendCommentHandler = () => {
		if (validateRef?.current?.value?.length === 0 && validateRef?.current?.value === '') {
			setisRequired('required')
		} else if (validateRef?.current?.value?.length > 0 && validateRef?.current?.value?.length < 2) {
			setisRequired('Min 2 characters allowed')
		} else if (validateRef?.current?.value?.trim()?.length === 0) {
			setisRequired('Enter something')
		} else setisRequired('')
	}

	const onSubmit = async () => {
		if (validateRef?.current?.value?.length === 0 && validateRef?.current?.value === '') {
			setisRequired('required')
		} else if (isRequired === '') {
			setbtnDisable(true)
			setloading(true)
			const commentData = {
				customer_id: loginUser?.id,
				blog_id: data?.blog?.id,
				comment: validateRef?.current?.value
			}
			const res = await axios.post(`${baseApiUrl}/blog-comment`, commentData)
			console.log('res', res)
			setpopupSuccess(res?.data?.success ? true : false)
			setresMsgforPopup(res?.data?.message)
			setshowresMsg(true)
			setTimeout(() => {
				validateRef.current.value = ''
				setloading(false)
				setbtnDisable(false)
				setshowresMsg(false)
				setallComments((comments) => [res?.data?.comment, ...comments])
			}, 2000)
		}
	}
	const handleClick = (content) => {
		const data = [...document.querySelectorAll('.dynamic-data h2')].find((data) => (data.querySelector('strong') === undefined ? data.innerText?.trim() : data.querySelector('strong').innerText?.trim() === content))
		const headingPosition = data.getBoundingClientRect().top
		const headingoffsetPosition = headingPosition + window.scrollY - 92
		window.scrollTo({
			top: headingoffsetPosition,
			behavior: 'smooth'
		})
	}

	return (
		<>
			<MetaTags title={data?.blog?.meta_title} description={data?.blog?.meta_description} keywords={data?.blog?.meta_keywords} ogImg={`${imgApiUrl?.blogs?.blog}/${data?.blog?.image}`} ogWidth={900} ogHeight={450}>
				{data?.blog?.schema !== null && (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: data?.blog?.schema
						}}
					/>
				)}
				{/* {router?.asPath === '/blogs/top-8-tips-for-veterinary-dental-specialists-while-performing-first-surgery' && (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								'@context': 'https://schema.org',
								'@type': 'BlogPosting',
								headline: 'Top 8 Tips for a Veterinary Dental Specialist While Performing First Surgery',
								image: 'https://www.dvmcentral.com/_next/image?url=https%3A%2F%2Fweb.dvmcentral.com%2F%2Fup_data%2Fblog%2Ftop-8-tips-for-a-veterinary-dental-specialist-while-performing-first-surgery-1725627635.jpg&w=1080&q=75',
								author: {
									'@type': 'Organization',
									name: 'DVM Central'
								},
								publisher: {
									'@type': 'Organization',
									name: 'DVM Central',
									logo: {
										'@type': 'ImageObject',
										url: ''
									}
								},
								datePublished: '2024-09-06'
							})
						}}
					/>
				)} */}
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

										data?.breadcrumbs?.map((breadCrumbdata, index) => ({
											'@type': 'ListItem',
											position: index + 2,
											name: `${breadCrumbdata?.name}`,
											item: breadCrumbdata?.link ? `https://www.dvmcentral.com${breadCrumbdata?.link} ` : `https://www.dvmcentral.com${router?.asPath}`
										}))
									]
								}
							]
						})
					}}
				/>
			</MetaTags>
			<LiteLoader className={`modal-bg transition ${modalLoading ? 'show-bd' : 'hide-bd'}`} />
			<HeroBanner bg='var(--gray-section' title={data?.blog?.name} pageType='single_col' />

			<section className='inner-sec-m'>
				<div className='sec-container'>
					<ListingLayout2>
						<LeftCol2 className={styles.left_col}>
							<div className={styles.content_blog}>
								{data?.content?.length > 0 && (
									<div className={styles.contents_container}>
										<h4>Contents</h4>
										<ul className='gray-color'>
											{data?.content?.map((content, index) => {
												return (
													<li key={index}>
														<a ref={ref} className={styles.content} onClick={() => handleClick(content)}>
															<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6'>
																<path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
															</svg>
															{content}
														</a>
													</li>
												)
											})}
										</ul>
									</div>
								)}
								{data?.blog && <Blog blogData={data?.blog} data={data?.data} content={data?.content} handleClick={handleClick} />}
							</div>

							{/* writer */}
							{data?.blog && data?.blog?.writer !== null && (
								<div className={`${styles.writer_wrapper} radius inner-sec-mt`}>
									<Wave className={styles.background_imge} />
									{data?.blog?.writer?.image !== null ? (
										<div>
											<ImgWithLoader src={`${imgApiUrl?.blogs?.writer}/${data?.blog?.writer?.image}`} width={600} height={600} className={`${styles.write_img} ${styles.profile_img}`} />
										</div>
									) : (
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={0.25} stroke='var(--primary)' className={styles.write_img}>
											<path strokeLinecap='round' strokeLinejoin='round' d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
										</svg>
									)}

									<div className={styles.bio_wrapper}>
										<div className={`${styles.writer_name} primary-color`}>{data?.blog?.writer?.name}</div>
										<div className={`${styles.designation} black-color`}>{data?.blog?.writer?.designation}</div>
										<p className={`${styles.bio} gray-color`}>{data?.blog?.writer?.description}</p>
										{data?.blog?.writer?.bio_link !== null && (
											<Link href={data?.blog?.writer?.bio_link}>
												<a>
													<button className='primary-btn white-color'>Read Full Bio</button>
												</a>
											</Link>
										)}
									</div>
								</div>
							)}

							{data?.blog && (
								<div className={styles.submit_wrapper}>
									<div className='inner-sec-pt'>
										<Accordion question='Submit Comment' className={styles.acc_width} type='blog-accordion' index={0}>
											<div className={`${styles.fields_wrapper}`}>
												{loginUser?.id !== undefined ? (
													<>
														<div className={styles.inner_wrapper}>
															<label className='gray-color' htmlFor='password'>
																Your Comment
															</label>
															<div className='red-color'>{isRequired}</div>
														</div>

														<div className={`${styles.inner_wrapper}`}>
															<textarea ref={validateRef} placeholder='Add comment' minLength={2} className={`${styles.textarea} ${isRequired !== '' ? 'input-error' : 'gray-border'}`} onChange={() => sendCommentHandler()} />
															<button className={`btn primary-btn ${styles.submit_btn}`} onClick={() => onSubmit()} disabled={btnDisable}>
																Submit{' '}
																{loading && (
																	<div className={styles.loader}>
																		{' '}
																		<LiteLoader />
																	</div>
																)}
															</button>
														</div>
													</>
												) : (
													<Link href='auth/signin'>
														<a className={styles.login}>
															<Message className={styles.error} resMsg={'Signin to Comment'} />
														</a>
													</Link>
												)}
											</div>
										</Accordion>
									</div>
								</div>
							)}
							{allComments?.length > 0 && (
								<div className={styles.comments_wrapper}>
									<h5 className={`${styles.comment_heading}`}>Comments</h5>
									{allComments?.map((comment, index) => {
										return <BlogsComent key={index} comment={comment} />
									})}
								</div>
							)}
						</LeftCol2>
						<RightCol2 className={styles.right_col}>
							{data?.recent_posts?.data?.length > 0 && <RecentBlogs data={data?.recent_posts?.data} />}
							{data?.data?.new_products?.data?.length > 0 && <NewArrivals data={data?.data?.new_products?.data} setmodalLoading={setmodalLoading} />}
							{data?.slider_area_data !== undefined && data?.slider_area_data !== null && <BlogsSlider data={data?.slider_area_data} setmodalLoading={setmodalLoading} />}
						</RightCol2>
					</ListingLayout2>
				</div>
			</section>
		</>
	)
}

export default BlogDetail

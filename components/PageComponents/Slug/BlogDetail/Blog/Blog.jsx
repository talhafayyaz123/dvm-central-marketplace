import React, { useEffect, useRef, useState } from 'react'
import { imgApiUrl } from '../../../../../utils/config'
// import ImgWithLoader from '../../../../UI/ImgWithLoader/ImgWithLoader'
import styles from './Blog.module.css'
import noImg from '/public/imgs/news-detail-no-img.jpg'
import getDate from '../../../../../utils/getDate'
import SocialLinks from '../../../../UI/SocialLinks/SocialLinks'
import FilterBtnForMob from '../../../../UI/FilterBtnForMob/FilterBtnForMob'
import Link from 'next/link'
import Image from 'next/image'

const Blog = ({ blogData, data, content, handleClick }) => {
	const { name, publish_date, full_content, image, updated_at, slug, tags } = blogData
	const [closeSideBar, setcloseSideBar] = useState(false)
	const [showBtn, setshowBtn] = useState(false)
	const ref = useRef()

	useEffect(() => {
		const blog = document.querySelector('.dynamic-wrapper .dynamic-data')
		window.addEventListener('scroll', () => {
			if (blog.getBoundingClientRect().top < -100 && blog.getBoundingClientRect().bottom > 300) {
				setshowBtn(true)
			} else setshowBtn(false)
		})
	}, [])

	return (
		<div className={`${styles.blog_detail_wrapper} ${content?.length === 0 ? styles.no_content : undefined}`}>
			<Image priority width={900} height={450} className={`${styles.img_wrapper} radius`} src={image !== null ? `${imgApiUrl.blogs.blog}/${image}` : noImg} alt={name} />
			<div className={styles.date_social_wrapper}>
				<div className={styles.date_wrapper}>
					<div className={`${styles.date} gray-color`}>Published on {getDate(publish_date)}</div>
					<span> - </span>
					<div className={`${styles.date} gray-color`}>Updated on {getDate(updated_at)}</div>
				</div>
				<SocialLinks blog_name={name} className={styles.social_links} type='social-share' fbShare={`https://www.dvmcentral.com/blogs/${slug}`} twitterShare={`https://www.dvmcentral.com/blogs/${slug}`} linkedInShare={`https://www.dvmcentral.com/blogs/${slug}`} linkedin_title={name} />
				{content?.length > 0 && (
					<FilterBtnForMob
						className={styles.contents_btn}
						closeSideBar={closeSideBar}
						setcloseSideBar={setcloseSideBar}
						type={'blog_content'}
						btnText='Blog Contents'
						icon={
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-6 h-6'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
								/>
							</svg>
						}
					>
						<h4>Contents</h4>
						<ul className='gray-color'>
							{content?.map((content, index) => {
								return (
									<li className='white-bg' key={index} onClick={() => (handleClick(content), setcloseSideBar(false))}>
										<a className={styles.content}>
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
											</svg>
											{content}
										</a>
									</li>
								)
							})}
						</ul>
					</FilterBtnForMob>
				)}
				{content?.length > 0 && (
					<FilterBtnForMob
						className={`${styles.contents_btn} ${styles.hiddenBtn} ${showBtn ? styles.show_btn : undefined}`}
						closeSideBar={closeSideBar}
						setcloseSideBar={setcloseSideBar}
						type={'blog_content'}
						btnText='Blog Contents'
						icon={
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='currentColor' className='w-6 h-6'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
								/>
							</svg>
						}
					>
						<h4>Contents</h4>
						<ul className='gray-color'>
							{content?.map((content, index) => {
								return (
									<li className='white-bg' key={index} onClick={() => (handleClick(content), setcloseSideBar(false))}>
										<a className={styles.content}>
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-6 h-6'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3' />
											</svg>
											{content}
										</a>
									</li>
								)
							})}
						</ul>
					</FilterBtnForMob>
				)}
			</div>
			<span className='dynamic-wrapper'>
				<div
					className={`inner-sec-mt dynamic-data ${styles.dynamic_data}`}
					ref={ref}
					dangerouslySetInnerHTML={{
						__html: full_content
					}}
				/>
			</span>

			{/* tags button */}
			{tags !== null && (
				<div className={styles.tags_wrapper}>
					{tags?.length > 0 &&
						tags?.map((tag, index) => {
							return (
								// <Link href={`/blogs/${tag?.toLowerCase()}`} key={index}>
								// 	<a>
								<button key={index} className={`${styles.tags_btn} sml-btn primary-color lite-pink-bg`}>
									{tag}
								</button>
								// 	</a>
								// </Link>
							)
						})}
				</div>
			)}

			{/* previous next button */}

			<div className={styles.btns_wrapper}>
				{data?.prev_blog_url !== null && (
					<Link href={`${data?.prev_blog_url}`}>
						<a>
							<button className='primary-border primary-color white-btn'>Previous Blog</button>
						</a>
					</Link>
				)}
				{data?.next_blog_url !== null && (
					<Link href={`${data?.next_blog_url}`}>
						<a>
							<button className='primary-btn'>Next Blog</button>
						</a>
					</Link>
				)}
			</div>
		</div>
	)
}

export default Blog

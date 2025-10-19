import Link from 'next/link'
import React from 'react'
import { imgApiUrl } from '../../../utils/config'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import styles from './BlogCard.module.css'
import noImg from '/public/imgs/news-blog-no-img.jpg'
import noWriterImg from '/public/imgs/no-profile-img.png'
import SocialLinks from '../../UI/SocialLinks/SocialLinks'
import { useRouter } from 'next/router'

const BlogCard = ({ data, type, className, key }) => {
	const { name, slug, short_content, image_thumbnail, publish_date, reading_time, writer, categories } = data

	const router = useRouter()

	return (
		<div className={`${styles.blog_card} ${type === 'recent-blogs' ? styles.recent_card : undefined} ${className}`}>
			<Link href={router?.query?.slug && router?.query?.slug[1] !== undefined && type !== 'recent-blogs' ? `/blogs/${router?.query?.slug[1]}/${slug}` : `/blogs/${slug}`}>
				<a>
					<ImgWithLoader bg='bg' priority={key && key == 0} className={`${styles.img_wrapper} radius ${type === 'recent-blogs' ? 'primary-bb shadow' : undefined}`} layout='fill' src={image_thumbnail !== null ? `${imgApiUrl.blogs.blog}/${image_thumbnail}` : noImg} alt={name} />
				</a>
			</Link>
			<div className={styles.blog_info}>
				<Link href={router?.query?.slug && router?.query?.slug[1] !== undefined && type !== 'recent-blogs' ? `/blogs/${router?.query?.slug[1]}/${slug}` : `/blogs/${slug}`}>
					<a>
						{reading_time !== null && <div className={styles.reading_time}>{reading_time}</div>}
						<h5 className='primary-color'>{name}</h5>

						{type !== 'recent-blogs' && (
							<p className='gray-color'>
								{short_content.substring(0, 100)}
								{short_content?.length > 100 ? '...' : ''}
							</p>
						)}
					</a>
				</Link>
				{type !== 'recent-blogs' && categories !== null && categories !== undefined && typeof categories == 'object' && (
					<div className={`${styles.category_wrapper} ${writer === null ? styles.margin : undefined}`}>
						<div className={`${styles.category_text} black-color`}>Categor{categories?.length > 1 ? 'ies' : 'y'} :</div>
						{categories?.map((category, index) => {
							return (
								<div key={index} className={styles.category}>
									{/* <Link href={`/blogs/${category?.toLowerCase()?.trim()}`}> */}
									{/* <a className='primary-color'> */}
									<button className='primary-color'>{category?.trim()}</button>
									{/* </a> */}
									{/* </Link> */}
								</div>
							)
						})}
					</div>
				)}
				{type !== 'recent-blogs' && (
					<div className={styles.writer_container}>
						<Link href={router?.query?.slug && router?.query?.slug[1] !== undefined ? `/blogs/${router?.query?.slug[1]}/${slug}` : `/blogs/${slug}`}>
							<a className={`${styles.read_date} gray-color ${writer !== null ? styles.margin_bottom : undefined}`}>
								{writer !== null && (
									<>
										<div className={styles.writer_wrapper}>
											<ImgWithLoader loaderType='sml' className={`${styles.writer_img} full-radius gray-border`} src={writer?.image !== null ? `${imgApiUrl.blogs.writer}/${writer?.image}` : noWriterImg} width={40} height={40} alt={writer?.name} />
											<div>{writer?.name}</div>
										</div>
										<span>-</span>
									</>
								)}
								<div>{publish_date}</div>
							</a>
						</Link>
						<SocialLinks
							blog_name={name}
							className={`${writer !== null ? styles.margin_bottom : undefined} ${styles.social_links}`}
							type='social-share'
							fbShare={`https://www.dvmcentral.com/blogs/${slug}`}
							twitterShare={`https://twitter.com/intent/tweet?url=${`https://www.dvmcentral.com/blogs/${slug}`}&text=${name}&via=DvmCentral`}
							twitter_text={name}
							linkedInShare={`https://www.dvmcentral.com/blogs/${slug}`}
							linkedin_title={name}
						/>
						{/* <FacebookShareButton url={`https://www.dvmcentral.com/blogs/${slug}`} quote={name}>
						<FacebookIcon size={34} />

					</FacebookShareButton> */}
					</div>
				)}
			</div>
		</div>
	)
}

export default BlogCard

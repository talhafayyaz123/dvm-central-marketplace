import React, { useContext } from 'react'
import { imgApiUrl } from '../../../utils/config'
import styles from './PlayList.module.css'
import Link from 'next/link'
import { GlobalProvider } from '../../../context/AppProvider'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import PlayerBtn from '../PlayerBtn/PlayerBtn'
import noImg from '/public/imgs/no-img.webp'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const PlayList = ({ video, playListType, isByed, className, chapterSlug }) => {
	const { thumbnail, title, description, created_at, slug, course_chapter_id, chapter } = video
	const { loginUser } = useContext(GlobalProvider)

	const { data: status } = useSession()

	const router = useRouter()
	return (
		<div className={styles.main_wrapper}>
			{loginUser?.id !== undefined && isByed && status !== 'loading' ? (
				playListType === 'chapter' ? (
					<Link href={`${router?.asPath}/${slug}`}>
						<a className={`transition primary-bb radius shadow ${playListType === 'video_detail' ? styles.max : undefined} ${styles.video_card_wrapper}`}>
							<ImgWithLoader bg={thumbnail !== null ? 'bg' : undefined} src={thumbnail !== null ? `${imgApiUrl.courses.video.thumbnail}/${thumbnail}` : noImg} width={300} height={250} className={styles.image} />
							<div style={{ marginBottom: '1.5rem' }} className={styles.section_info}>
								<h5 className='primary-color'>
									{title?.slice(0, 40)}
									{title?.length > 40 ? '...' : ''}
								</h5>
								<p>
									{description?.slice(0, 30)}
									{description?.length > 30 ? '...' : ''}
								</p>
							</div>

							<a>
								<PlayerBtn size={'sml'} />
							</a>
						</a>
					</Link>
				) : playListType == 'video_detail' && chapterSlug ? (
					<Link href={`${router?.asPath}/${chapterSlug}/${slug}`}>
						<a className={`primary-bb transition radius shadow ${styles.max} ${styles.video_card_wrapper}`}>
							<ImgWithLoader bg={thumbnail !== null ? 'bg' : undefined} src={thumbnail !== null ? `${imgApiUrl.courses.video.thumbnail}/${thumbnail}` : noImg} width={400} height={300} className={styles.image} />

							<div style={{ marginBottom: '1.5rem' }} className={styles.section_info}>
								<h5 className='primary-color'>
									{title?.slice(0, 30)}
									{title?.length > 30 ? '...' : ''}
								</h5>

								<p>
									{description?.slice(0, 30)}
									{description?.length > 30 ? '...' : ''}
								</p>
							</div>

							<a>
								<PlayerBtn size={'sml'} />
							</a>
						</a>
					</Link>
				) : (
					<Link href={`${router?.asPath?.slice(0, router?.asPath.lastIndexOf('/'))}/${slug}`}>
						<a className={`transition primary-bb radius shadow ${playListType === 'video_detail' ? styles.max : undefined} ${styles.video_card_wrapper}`}>
							<ImgWithLoader bg={thumbnail !== null ? 'bg' : undefined} src={thumbnail !== null ? `${imgApiUrl.courses.video.thumbnail}/${thumbnail}` : noImg} width={300} height={250} className={styles.image} />
							<div style={{ marginBottom: '1.5rem' }} className={styles.section_info}>
								<h5 className='primary-color'>
									{title?.slice(0, 40)}
									{title?.length > 40 ? '...' : ''}
								</h5>
								<p>
									{description?.slice(0, 30)}
									{description?.length > 30 ? '...' : ''}
								</p>
							</div>

							<a>
								<PlayerBtn size={'sml'} />
							</a>
						</a>
					</Link>
				)
			) : (
				<div className={`primary-bb radius shadow ${playListType === 'video_detail' ? styles.max : undefined} ${styles.video_card_wrapper}`}>
					<ImgWithLoader bg={thumbnail !== null ? 'bg' : undefined} src={thumbnail !== null ? `${imgApiUrl.courses.video.thumbnail}/${thumbnail}` : noImg} width={300} height={250} className={styles.image} />
					<div className={styles.section_info}>
						<h5 className='primary-color'>
							{title?.slice(0, 40)}
							{title?.length > 40 ? '...' : ''}
						</h5>
						<p>
							{description?.slice(0, 30)}
							{description?.length > 30 ? '...' : ''}
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default PlayList

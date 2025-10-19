import React from 'react'
import styles from './ChapterCard.module.css'
import PlayList from '../PlayList/PlayList'
import Accordion from '../Accordion/Accordion'
import Message from '../Message/Message'
import Link from 'next/link'
import { lockScroll } from '../../../utils/scrollLock'

const ChapterCard = ({ key, isByed, setmodal, chapters, loginUser }) => {
	return chapters?.length > 0 ? (
		chapters?.map((chapter, index) => {
			const { title, videos, slug } = chapter
			return (
				<Accordion key={index} index={index} question={title} className={styles.accordion} answerClass={styles.answer}>
					<div key={key} className={`${styles.chapter_card}`}>
						<div className={styles.videos}>
							{videos?.length > 0 ? (
								<>
									{loginUser === undefined ? (
										<Link href={'auth/signin'}>
											<a>
												<button className={`${styles.margin} primary-btn white-color`}>Sign in to Buy</button>
											</a>
										</Link>
									) : (
										!isByed && (
											<div onClick={() => (setmodal(true), lockScroll())} className={styles.error}>
												<Message className={`${styles.margin} full-radius`} formSuccess={false} resMsg={'Buy to watch'} />
											</div>
										)
									)}
									<div className={styles.videos_wrapper}>
										<h5 className='primary-color'>PlayList</h5>
										<h5>
											{videos?.length} Video{videos?.length > 1 ? 's' : ''}
										</h5>
									</div>
									<div className={styles.playlist_wrapper}>
										{videos?.map((videos, index) => {
											return <PlayList isByed={isByed} playListType='video_detail' video={videos} key={index} index={index} chapterSlug={slug} />
										})}
									</div>
								</>
							) : (
								<div className={`gray-color ${styles.no_data}`}>Video(s) coming soon...</div>
							)}
						</div>
					</div>
				</Accordion>
			)
		})
	) : (
		<div className={`gray-color ${styles.no_data}`}>Coming soon...</div>
	)
}

export default ChapterCard

import React, { useContext, useState } from 'react'
import { imgApiUrl } from '../../../utils/config'
import { GlobalProvider } from '../../../context/AppProvider'
// import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import styles from './VendorVideoDetail.module.css'
import ImgWithLoader from '../../UI/ImgWithLoader/ImgWithLoader'
import PlayList from '../../UI/PlayList/PlayList'
import PlayerBtn from '../../UI/PlayerBtn/PlayerBtn'
import HeroBanner from '../../UI/HeroBanner/HeroBanner'
import NotAuthorized from '../../UI/NotAuthorized/NotAuthorized'
import currencyFormat from '../../../utils/currencyFormat'
import Payment from '../Slug/CoursesDetail/Payment/Payment'
import Modal from '../../UI/Modal/Modal'
import Link from 'next/link'
import ListingLayout2 from '../../UI/ListingLayout2/ListingLayout2'
import LeftCol2 from '../../UI/ListingLayout2/LeftCol2/LeftCol2'
import RightCol2 from '../../UI/ListingLayout2/RightCol2/RightCol2'

const VendorVideoDetail = ({ result }) => {
	const { video, thumbnail, description, created_at, id, price_discounted, price_original, vendor_id, discount_end_time, is_buyed, title, related_videos, chapter, course_chapter_id } = result?.data
	const [showVideo, setshowVideo] = useState(false)
	const [isByed, setisByed] = useState(is_buyed)
	const { loginUser } = useContext(GlobalProvider)
	const { data: status } = useSession()
	const [modal, setmodal] = useState(false)

	return course_chapter_id !== null && chapter !== null ? (
		status !== 'loading' && loginUser?.id !== undefined && is_buyed ? (
			<>
				<div className={styles.main_info}>
					<HeroBanner title={title} pageType={'single_col'} heroType='course_video' />
				</div>
				<div className={`inner-sec-mb ${styles.image_wrapper}`}>
					{!showVideo ? (
						<>
							<ImgWithLoader className={`shadow radius ${styles.img_wrapper}`} src={`${imgApiUrl.courses.video.thumbnail}/${thumbnail}`} alt={title} bg='bg' width={1000} height={550} onClick={() => setshowVideo(true)} />
							<div className={styles.play_btn}>
								<PlayerBtn btnType='white' onClick={() => setshowVideo(true)} />
							</div>
						</>
					) : (
						<video controlsList='nodownload' loop controls autoPlay className={`shadow radius ${styles.video}`} width={1000} height={500}>
							<source src={showVideo && `${imgApiUrl.courses.video.source}/${video}`} />
						</video>
					)}
				</div>
				<div className={`sec-container ${styles.playlist_info}`}>
					<ListingLayout2 className={`${styles.resp_width} ${related_videos?.length === 0 ? styles.width : undefined}`}>
						<LeftCol2 className={related_videos?.length === 0 ? styles.left_col : undefined}>
							<div className={`${styles.video_info}`}>
								<div className={styles.overview}>
									<span className='inner-sec-mt lite-dark-primary-color inner-sec-mb'>Video overview</span>
								</div>
								<p className={`gray-color ${styles.video_desc}`}>{description !== null ? description : 'No description is available.'}</p>
							</div>
						</LeftCol2>
						{related_videos?.length > 0 && (
							<RightCol2 className={styles.card_col_container}>
								<h5 className='inner-sec-mt'>More Video{related_videos?.length > 0 ? 's' : ''}</h5>
								<div className={styles.related_videos_wrapper}>
									{related_videos?.map((videos, index) => {
										return <PlayList video={videos} key={index} index={index} breadcrumbs={result?.breadcrumbs} isByed={is_buyed} />
									})}
								</div>
							</RightCol2>
						)}
					</ListingLayout2>
				</div>
			</>
		) : (
			status !== 'loading' && (
				<NotAuthorized
					heading={`${loginUser?.id === undefined ? 'Login' : !isByed && 'Buying this course'} is required to access this video.`}
					btnText={loginUser?.id === undefined ? 'Sign in' : !isByed && 'Buy to watch'}
					href={loginUser?.id === undefined ? '/auth/signin' : !isByed && `/${result?.breadcrumbs[1]?.link}/${chapter?.slug}`}
				/>
			)
		)
	) : (
		<>
			<Modal modal={modal} setmodal={setmodal} modalType='course'>
				{modal && <Payment setisByed={setisByed} setmodal={setmodal} id={id} vendor_id={vendor_id} loginUser={loginUser?.id} price={price_original} price_discounted={price_discounted} discount_end_time={discount_end_time} />}
			</Modal>
			<>
				<div className={styles.main_info}>
					<HeroBanner className={styles.hero} title={title} pageType={'single_col'} heroType={'course_single_video'}>
						<div className={styles.btn_wrapper}>
							<div className={styles.price_container}>
								<div className={`${loginUser?.id !== undefined && !isByed ? styles.sign_price : undefined} ${styles.inner_wrapper}`}>
									{price_original !== 0 && price_original !== null && price_discounted !== null && price_discounted !== 0 && price_discounted <= price_original && (discount_end_time === null || new Date(discount_end_time) >= new Date()) ? (
										<div className={styles.price}>
											<div className={styles.card_price}>
												<span className='white-color'>{currencyFormat(price_discounted)}</span>
											</div>
											<div>
												<span className={`${styles.original_price}`}>{currencyFormat(price_original)}</span>
												<span>{(100 - (price_discounted / price_original) * 100).toFixed(0)}% Off</span>
											</div>
										</div>
									) : (
										<div className={`${styles.card_price}`}>
											<span className='white-color'>{currencyFormat(price_original)}</span>
										</div>
									)}
								</div>

								{price_original !== 0 && price_original !== null && price_discounted !== null && price_discounted !== 0 && price_discounted <= price_original && (discount_end_time === null || new Date(discount_end_time) >= new Date()) && (
									<div className={`${styles.special_price} blink`}>
										<span style={{ marginRight: `${discount_end_time !== null ? '3px' : undefined}` }}>Discounted Price</span>
										{discount_end_time !== null && <span>ends on:</span>}
										{discount_end_time !== null && <span className={styles.disc_end_date}>{discount_end_time}</span>}
									</div>
								)}

								{status !== 'loading' &&
									(loginUser?.id !== undefined ? (
										!isByed &&
										price_original !== null &&
										price_original !== 0 && (
											<button type='button' className='white-btn primary-color' onClick={() => setmodal(true)}>
												Buy now
											</button>
										)
									) : (
										<Link href={'/auth/signin'}>
											<a>
												<button type='button' className='white-btn primary-color'>
													Sign in to Buy
												</button>
											</a>
										</Link>
									))}
							</div>
						</div>
					</HeroBanner>
				</div>
				<div className={`inner-sec-mb ${!isByed ? styles.not_all : undefined} ${styles.image_wrapper}`}>
					{!showVideo ? (
						<div>
							<ImgWithLoader bg={'bg'} className={`shadow radius ${styles.img_wrapper}`} src={`${imgApiUrl.courses.video.thumbnail}/${thumbnail}`} alt={title} width={1000} height={550} onClick={() => isByed && setshowVideo(true)} />
							{isByed && (
								<div className={styles.play_btn}>
									<PlayerBtn onClick={() => setshowVideo(true)} />
								</div>
							)}
						</div>
					) : (
						<video controlsList='nodownload' loop controls autoPlay className={`radius ${styles.video}`} width={1000} height={500}>
							<source src={showVideo && `${imgApiUrl.courses.video.source}/${video}`} />
						</video>
					)}
				</div>

				<div className={`sec-container inner-sec-mb ${styles.playlist_info}`}>
					<ListingLayout2 className={`${styles.resp_width} ${related_videos?.length === 0 ? styles.width : undefined}`}>
						<LeftCol2 className={related_videos?.length === 0 ? styles.left_col : undefined}>
							<div className={styles.overview}>
								<p className={`inner-sec-mt lite-dark-primary-color inner-sec-mb`}>Video overview</p>
							</div>

							<p className={`gray-color ${styles.video_desc}`}>{description !== null ? description : 'No description were added'}</p>
						</LeftCol2>

						{related_videos?.length > 0 && (
							<RightCol2 className={styles.card_col_container}>
								<h5 className='inner-sec-mt'>More Video{related_videos?.length > 0 ? 's' : ''}</h5>
								<div className={styles.related_videos_wrapper}>
									{related_videos?.map((videos, index) => {
										return <PlayList isByed={related_videos?.length > 0 ? true : isByed} playListType='video_detail' type={'single_video'} video={videos} key={index} index={index} breadcrumbs={result?.breadcrumbs} />
									})}
								</div>
							</RightCol2>
						)}
					</ListingLayout2>
				</div>
			</>
		</>
	)
}

export default VendorVideoDetail

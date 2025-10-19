import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './CoursesDetail.module.css'
import { imgApiUrl } from '../../../../utils/config'
import { GlobalProvider } from '../../../../context/AppProvider'
import Modal from '../../../UI/Modal/Modal'
import Payment from './Payment/Payment'
import ChapterCard from '../../../UI/ChapterCard/ChapterCard'
import Link from 'next/link'
import currencyFormat from '../../../../utils/currencyFormat'
// import Wave from '../../../UI/Wave/Wave'
// import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import HeroBanner from '../../../UI/HeroBanner/HeroBanner'
import { lockScroll } from '../../../../utils/scrollLock'
import NotAuthorized from '../../../UI/NotAuthorized/NotAuthorized'
import { DarkLoader } from '../../../Loader/Loader'
import Message from '../../../UI/Message/Message'

const CoursesDetail = ({ data, breadcrumbs }) => {
	const { price_original, price_discounted, short_description, thumbnail, title, discount_end_time, chapters, is_buyed, vendor_id, id, slug } = data
	const { loginUser, userData } = useContext(GlobalProvider)
	const [isByed, setisByed] = useState(is_buyed)
	const [modal, setmodal] = useState(false)
	const [loading, setloading] = useState(true)
	const [show, setshow] = useState(false)

	const heightRef = useRef(null)

	const buyBtn = () => {
		if (window.scrollY < heightRef?.current?.clientHeight) {
			setshow(false)
		} else {
			setshow(true)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', buyBtn)
		setTimeout(() => {
			setloading(false)
		}, 500)
	}, [])

	return loading ? (
		<div className={styles.loader}>
			<DarkLoader />
		</div>
	) : (loginUser?.id !== undefined && userData?.position !== undefined && userData?.position !== 'Sales Rep') || loginUser?.id === undefined ? (
		<>
			<Modal modal={modal} setmodal={setmodal} modalType='course'>
				{modal && <Payment paymentType={'course'} setisByed={setisByed} setmodal={setmodal} id={id} vendor_id={vendor_id} loginUser={loginUser?.id} price={price_original} price_discounted={price_discounted} discount_end_time={discount_end_time} />}
			</Modal>

			<div ref={heightRef}>
				<HeroBanner className={styles.hero_wrapper} imgClassName={styles.img} title={title} info={short_description} src={`${imgApiUrl?.courses?.image}/${thumbnail}`} alt={title} width={550} height={550}>
					<div className={price_discounted === null ? styles.single_price : undefined}>
						<div className={styles.btn_wrapper}>
							<div className={`${loginUser?.id !== undefined && !isByed ? styles.sign_price : undefined} ${styles.inner_wrapper}`}>
								{price_original !== 0 && price_original !== null && price_discounted !== null && price_discounted !== 0 && price_discounted <= price_original && (discount_end_time === null || discount_end_time >= today) && price_discounted < price_original ? (
									<>
										<div className={styles.card_price}>
											<span>{currencyFormat(price_discounted)}</span>
										</div>
										{price_discounted < price_original && (
											<div className={styles.disc_price}>
												<div className={`${styles.original_price} white-color`}>{currencyFormat(price_original)}</div>
												<div className='white-color'>{(100 - (price_discounted / price_original) * 100).toFixed(0)}% Off</div>
											</div>
										)}
									</>
								) : (
									<div className={`${styles.card_price}`}>{price_original !== 0 && price_original !== null ? <span>{currencyFormat(price_original)}</span> : <Message resMsg={'Price N/A'} formSuccess={false} />}</div>
								)}
							</div>
							{price_original !== 0 && price_original !== null && price_discounted !== null && price_discounted !== 0 && price_discounted <= price_original && (discount_end_time === null || discount_end_time >= today) && price_discounted < price_original && (
								<div className={`${styles.special_price} blink`}>
									<span style={{ marginRight: `${discount_end_time !== null ? '3px' : undefined}` }}>Discounted Price</span>
									{discount_end_time !== null && <span>ends on:</span>}
									{discount_end_time !== null && <span className={styles.disc_end_date}>{discount_end_time}</span>}
								</div>
							)}
						</div>
						<div className={price_discounted !== null && price_discounted !== 0 ? styles.price_container : !isByed ? styles.only_price : undefined}>
							{loginUser?.id !== undefined ? (
								!isByed &&
								price_original !== null &&
								price_original !== 0 && (
									<button type='button' className={`${styles.terq_btn} primary-color`} onClick={() => (setmodal(true), lockScroll())}>
										Buy Now
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
							)}
						</div>
					</div>
					{loginUser?.id === undefined ? (
						<Link href={'/auth/signin'}>
							<a>
								<button className={`${styles.terq_btn} primaryp-btn shadow ${styles.hide_btn} ${show ? styles.show_btn : undefined}`}>Sign in to Buy</button>{' '}
							</a>
						</Link>
					) : (
						!isByed &&
						price_original !== null &&
						price_original !== 0 && (
							<button onClick={() => setmodal(true)} className={`${styles.terq_btn} primary-btn shadow ${styles.hide_btn} ${show ? styles.show_btn : undefined}`}>
								Buy now
							</button>
						)
					)}
				</HeroBanner>
			</div>
			<section className='sec-container'>
				<div className='sec-p'>
					<div className={` ${styles.chapters}`}>
						<h5 className='primary-color'>Chapters</h5>
					</div>

					<div className={styles.chapter_card}>
						<ChapterCard isByed={isByed} setmodal={setmodal} chapters={chapters} loginUser={loginUser?.id} />
					</div>
				</div>
			</section>
		</>
	) : loginUser?.id !== undefined && userData?.position !== undefined ? (
		<NotAuthorized className={styles.not_show} heading='You are not authorized to access this page.' />
	) : (
		<DarkLoader />
	)
}

export default CoursesDetail

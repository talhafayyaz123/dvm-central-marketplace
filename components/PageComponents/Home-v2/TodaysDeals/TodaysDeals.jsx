import React, { useState } from 'react'
import styles from './TodaysDeals.module.css'
import Modal from '../../../UI/Modal/Modal'
import ModalProductDetail from '../../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import Image from 'next/image'
import bgImg from '/public/imgs/home/today-deals-bg.png'
import Link from 'next/link'
import TodaysDealsCard from '../../../UI/TodaysDealsCard/TodaysDealsCard'
import box1Img from '/public/imgs/today-deals/box-1.png'
import box2Img from '/public/imgs/today-deals/box-2.png'
import box3Img from '/public/imgs/today-deals/box-3.png'

const TodaysDeals = ({ todaysDeals }) => {
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	return (
		<>
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='sidebar'>
				{modal && <ModalProductDetail data={modalData} displayType='sidebar' setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>

			{todaysDeals?.length > 0 && (
				<section className={`${styles.todays_deals} sec-p`}>
					<div className={styles.main_bg_img}>
						<Image unoptimized src={bgImg} width={1920} height={611} layout='responsive' alt='Todays Deals' />
					</div>
					<div className={`${styles.deals_inner_container} sec-container`}>
						<div className={`${styles.todays_deals_heading} heading_wrapper`}>
							<h2>{`Today's Deals`}</h2>
							<p>{`Don't miss out on exploring the deals of the day, handpicked exclusively for you.`}</p>
						</div>

						<div className={`${styles.deals_wrapper} inner-sec-mt`}>
							<div className={`${styles.deals_wrapper_1_2} radius`}>
								<div className={styles.bg_img}>
									<Image layout='fill' src={box1Img} alt={`Today's Deals`} />
								</div>
								{todaysDeals?.slice(0, 2)?.map((deals, index) => {
									return <TodaysDealsCard key={deals?.id} data={deals} index={index} setModalData={setModalData} setmodal={setmodal} />
								})}
							</div>

							<div className={`${styles.deals_wrapper_3_4} radius`}>
								<div className={styles.bg_img}>
									<Image layout='fill' src={box2Img} alt={`Today's Deals`} />
								</div>
								{todaysDeals?.slice(2, 4)?.map((deals, index) => {
									return <TodaysDealsCard key={deals?.id} data={deals} index={index} setModalData={setModalData} setmodal={setmodal} />
								})}
							</div>

							<div className={`${styles.deals_wrapper_5_6} radius`}>
								<div className={styles.bg_img}>
									<Image layout='fill' src={box3Img} alt={`Today's Deals`} />
								</div>
								{todaysDeals?.slice(4, 6)?.map((deals, index) => {
									return <TodaysDealsCard key={deals?.id} data={deals} index={index} setModalData={setModalData} setmodal={setmodal} />
								})}
							</div>
						</div>
						<div className={styles.deals_btn}>
							<Link href={'/today-deals'}>
								<a>
									<button className='white-color primary-btn'>View More</button>
								</a>
							</Link>
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default TodaysDeals

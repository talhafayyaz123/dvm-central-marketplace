import React, { useState } from 'react'
import styles from './NewArrivals.module.css'
import Modal from '../../../UI/Modal/Modal'
import ModalProductDetail from '../../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import DealsCard from '../../../UI/DealsCard/DealsCard'
import bgImg from '/public/imgs/home/arrivals-bg-2.png'
import Image from 'next/image'

const NewArrivals = ({ newArrivalsData }) => {
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

			{newArrivalsData?.length > 0 && (
				<section className={`${styles.new_arrivals} sec-p`}>
					<Image unoptimized layout='fill' src={bgImg} alt='New Arrivals' />

					<div className='sec-container'>
						<div className={styles.heading_wrapper}>
							<h2>Hot New Arrivals</h2>
						</div>

						<div className={`${styles.new_arrivals_wrapper} inner-sec-pt`}>
							{newArrivalsData?.slice(0, 8)?.map((data, index) => {
								return data?.image !== null && data?.image !== 'na.webp' && data?.image !== '' && <DealsCard pageType='home-v2' key={data.id} data={data} setmodal={setmodal} setModalData={setModalData} index={index} />
							})}
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default NewArrivals

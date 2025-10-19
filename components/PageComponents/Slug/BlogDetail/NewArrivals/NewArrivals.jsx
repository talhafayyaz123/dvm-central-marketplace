import React, { useState } from 'react'
import styles from './NewArrivals.module.css'
import Modal from '../../../../UI/Modal/Modal'
import ModalProductDetail from '../../../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../../../UI/ModalProductDetail/ImgsGallery/VideoModal/VideoModal'
import NewCard from '../../../../UI/NewCard/NewCard'

const NewArrivals = ({ data, setmodalLoading }) => {
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	return (
		<>
			<h4 className={styles.new_arrivals_heading}>Hot New Arivals</h4>
			<div className={styles.new_arrivals_wrapper}>
				{data?.map((product, index) => {
					return (
						<div key={index} className={styles.product}>
							<NewCard data={product} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} />
						</div>
					)
				})}
			</div>
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>
		</>
	)
}

export default NewArrivals

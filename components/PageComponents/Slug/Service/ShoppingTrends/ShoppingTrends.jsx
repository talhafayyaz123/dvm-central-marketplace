import React, { useState } from 'react'
import RelatedProducrsSlider from '../../../../UI/RelatedProductsSlider/RelatedProducrsSlider'
import styles from './ShoppingTrends.module.css'
import Modal from '../../../../UI/Modal/Modal'
import ModalProductDetail from '../../../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import ProductUnavailable from '../../../../UI/NewCard/ProductUnavailable/ProductUnavailable'

const ShoppingTrends = ({ data }) => {
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	return (
		<>
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>

			<section className={`${styles.trends_container} inner-sec-pb sec-pt`}>
				<div className='sec-container'>
					<h4>Recommended Based On Your Shopping Trends</h4>
					<RelatedProducrsSlider className='inner-sec-mt' data={data} setmodal={setmodal} setModalData={setModalData} />
				</div>
			</section>
		</>
	)
}

export default ShoppingTrends

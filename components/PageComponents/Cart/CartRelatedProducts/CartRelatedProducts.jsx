import React, { useState } from 'react'
import styles from './CartRelatedProducts.module.css'
import { LiteLoader } from '../../../Loader/Loader'
import NewCard from '../../../UI/NewCard/NewCard'
import dynamic from 'next/dynamic'
const Modal = dynamic(import('../../../UI/Modal/Modal'), { ssr: false })
const VideoModal = dynamic(import('../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'), { ssr: false })
const ModalProductDetail = dynamic(import('../../../UI/ModalProductDetail/ProductDetail'), { ssr: false })

const CartRelatedProducts = ({ cartRelatedProducts }) => {
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	const [modalLoading, setmodalLoading] = useState(false)

	return (
		<>
			<LiteLoader className={`${modalLoading ? 'show-bd' : 'hide-bd'} modal-bg transition`} />
			<Modal modal={modal} setmodal={setmodal} modalType='product'>
				{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>

			<section className='sec-p'>
				<h4>May We Also Suggest</h4>
				<div className={styles.related_products}>
					{cartRelatedProducts?.map((item, index) => (
						// <DealsCard key={item?.id} data={item} index={index} setmodal={setmodal} setModalData={setModalData} />
						<NewCard key={item?.id} data={item} index={index} setmodalLoading={setmodalLoading} setmodal={setmodal} setModalData={setModalData} />
					))}
				</div>
			</section>
		</>
	)
}

export default CartRelatedProducts

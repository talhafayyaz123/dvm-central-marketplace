import React, { useContext, useState } from 'react'
import styles from './SameVendorServices.module.css'
import { GlobalProvider } from '../../../../../context/AppProvider'
import Modal from '../../../../UI/Modal/Modal'
import VideoModal from '../../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import ModalProductDetail from '../../../../UI/ModalProductDetail/ProductDetail'
import SameProductCard from '../../../../UI/SameProductCard/SameProductCard'

const SameVendorServices = ({ products }) => {
	const { cartBtnLoading, cartBtndisabled } = useContext(GlobalProvider)
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')
	return (
		<>
			{/* <Modal modal={modal} setmodal={setmodal} modalType='product' displayType='sidebar'>
				{modal && <ModalProductDetail data={modalData} displayType='sidebar' setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal> */}
			<section className='sec-container'>
				<div className={`${styles.same_products_container} inner-sec-p`}>
					<h4>From the same store</h4>
					<div className={`${styles.same_products_wrapper}`}>
						{/* {products?.slice(0, 3)?.map((product, index) => {
							return <SameProductCard className={styles.card} key={product.id} data={product} cartBtnLoading={cartBtnLoading} cartBtndisabled={cartBtndisabled} index={index} setmodal={setmodal} setModalData={setModalData} />
						})} */}
					</div>
				</div>
			</section>
		</>
	)
}

export default SameVendorServices

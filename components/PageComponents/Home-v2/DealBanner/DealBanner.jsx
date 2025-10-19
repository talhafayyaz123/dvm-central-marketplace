import React, { useContext, useState } from 'react'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import styles from './DealBanner.module.css'
import { baseApiUrl, imgApiUrl } from '../../../../utils/config'
import Modal from '../../../UI/Modal/Modal'
import ModalProductDetail from '../../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import { LiteLoader } from '../../../Loader/Loader'
import { lockScroll } from '../../../../utils/scrollLock'
import { GlobalProvider } from '../../../../context/AppProvider'

const DealBanner = ({ banners }) => {
	console.log('banners data', banners)
	const { image, image_amp, product, link } = banners
	console.log('product', product)

	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	const [modalLoading, setmodalLoading] = useState(false)

	const { loginUser } = useContext(GlobalProvider)

	const modalHandler = async () => {
		setmodalLoading(true)
		const res = await fetch(`${baseApiUrl}/product-view/${product?.slug}/${loginUser?.id}`).then((resp) => resp.json())
		await setModalData(res)
		setTimeout(() => {
			setmodal(true)
			lockScroll()
			setmodalLoading(false)
		}, 500)
	}

	return (
		image !== null &&
		image_amp !== null && (
			<section className={styles.banners_wrapper}>
				<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='sidebar'>
					{modal && <ModalProductDetail data={modalData} displayType='sidebar' setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
				</Modal>

				<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
					{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
				</Modal>
				<div className={`${styles.loader_wrapper} ${modalLoading ? 'show-bd' : 'hide-bd'} transition`}>{modalLoading && <LiteLoader />}</div>
				{product !== null ? (
					<>
						<ImgWithLoader onClick={() => modalHandler()} className={styles.big_banner} layout='fill' src={`${imgApiUrl.banners}/${image}`} alt={product?.name} />
						<ImgWithLoader onClick={() => modalHandler()} className={styles.sml_banner} width={576} height={400} src={`${imgApiUrl.banners}/${image_amp}`} alt={product?.name} />
					</>
				) : (
					<a className={styles.banner_link} href={link} target='_blank' rel='noreferrer'>
						<ImgWithLoader className={styles.big_banner} layout='fill' src={`${imgApiUrl.banners}/${image}`} alt={product?.name} />
						<ImgWithLoader className={styles.sml_banner} width={576} height={400} src={`${imgApiUrl.banners}/${image_amp}`} alt={product?.name} />
					</a>
				)}
			</section>
		)
	)
}

export default DealBanner

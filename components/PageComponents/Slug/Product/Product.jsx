import React, { useContext, useState } from 'react'
import Hero from './Hero/Hero'
import ProductInfo from './ProductInfo/ProductInfo'
import RelatedProducts from './RelatedProducts/RelatedProducts'
// import Features from './Features/Features'
import { LiteLoader } from '../../../Loader/Loader'
import ShoppingTrends from './ShoppingTrends/ShoppingTrends'
// import styles from './Product.module.css'
import TabContent from './TabContent/TabContent'
import SameVendorProducts from './SameVendorProducts/SameVendorProducts'
import { GlobalProvider } from '../../../../context/AppProvider'
import Modal from '../../../UI/Modal/Modal'
import VideoModal from '../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import ModalProductDetail from  '../../../UI/ModalProductDetail/ProductDetail'

const Product = ({ result }) => {
	const [changingData, setchangingData] = useState({})
	const [trendingProducts, settrendingProducts] = useState([])
	const [displayType, setdisplayType] = useState('description')
	const [modalLoading, setmodalLoading] = useState(false)

	const { loginUser, userData } = useContext(GlobalProvider)

	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	return (
		<>
			<LiteLoader className={`${modalLoading ? 'show-bd' : 'hide-bd'} modal-bg transition`} />
			{
			modal && (
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>
				)
			}
			{
			sidebarVideoModal && (
			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>
				)
			}
			<Hero data={result} changingData={changingData} setchangingData={setchangingData} settrendingProducts={settrendingProducts} />
			<ProductInfo variationType={result?.product.type} additionalInfoData={result?.product.type === 'variation' ? JSON?.parse(changingData?.additional_information || null) : JSON?.parse(result?.product?.additional_information || null)} />
			<TabContent
				displayType={displayType}
				setdisplayType={setdisplayType}
				description={result?.product?.full_description}
				warrantyData={changingData?.warranty}
				vendorId={result?.vendor?.id}
				productId={result?.product?.id}
				productFAQ={result?.product?.faqs}
				rating={result?.product_rating}
				ratingBars={result?.rating_segrigation}
				reviewCount={result?.reviews_count}
				guide={result?.files}
				quickFacts={result?.quick_facts}
				loginUser={loginUser}
				userPosition={userData?.position}
			/>
			{result?.same_products?.length > 0 && <SameVendorProducts products={result?.same_products} setmodalLoading={setmodalLoading} setModalData={setModalData} setmodal={setmodal} />}
			{result.related_products?.length > 0 && <RelatedProducts data={result.related_products} setmodalLoading={setmodalLoading} setModalData={setModalData} setmodal={setmodal} />}
			{loginUser?.id !== undefined && trendingProducts?.length > 0 && <ShoppingTrends data={trendingProducts} setmodalLoading={setmodalLoading} setModalData={setModalData} setmodal={setmodal} />}
			{/* <Features /> */}
		</>
	)
}

export default Product

import React, { useContext, useState } from 'react'
// import dynamic from 'next/dynamic'
import MainNavigation from './MainNavigation/MainNavigation'
import MobileNavbar from './MobileNavbar/MobileNavbar'
import Smallbar from './Smallbar/Smallbar'
import Topbar from './Topbar/Topbar'
import CartItems from './CartItems/CartItems'
import ShopByDepartments from './ShopByDepartments/ShopByDepartments'
import { GlobalProvider } from '../../context/AppProvider'
import Modal from '../UI/Modal/Modal'
import ModalProductDetail from '../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'

// const Modal = dynamic(import('../UI/Modal/Modal'), { ssr: false })
// const VideoModal = dynamic(import('../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'), { ssr: false })
// const ModalProductDetail = dynamic(import('../UI/ModalProductDetail/ProductDetail'), { ssr: false })
// import { useSession } from 'next-auth/react'

const Navbar = () => {
	const { showCartSidebar, setshowCartSidebar, setshowSearchResults, setsearchBD, loginUser, setshowMobSearchNav, userData } = useContext(GlobalProvider)
	const [showShopByDepts, setShowByDepts] = useState(false)
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)

	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	// const { data: status } = useSession()

	const closeSearchHanlder = async () => {
		setsearchBD(false)
		setshowMobSearchNav(false)
		await setshowSearchResults(false)
	}

	return (
		<>
		{
			modal && (
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				{modal && <ModalProductDetail data={modalData} modal={modal} setmodal={setmodal} closeSearchHanlder={closeSearchHanlder} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
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

			<Topbar />
			<MainNavigation setmodal={setmodal} setModalData={setModalData} closeSearchHanlder={closeSearchHanlder} />
			{/* {status !== 'loading' && (!loginUser?.id || (loginUser?.type && loginUser?.type !== 'admin')) && ( */}
			{/* <> */}
			<Smallbar setShowByDepts={setShowByDepts} loginUser={loginUser} userPosition={userData?.position} setshowCartSidebar={setshowCartSidebar} />
			<MobileNavbar setshowCartSidebar={setshowCartSidebar} setShowByDepts={setShowByDepts} setmodal={setmodal} setModalData={setModalData} closeSearchHanlder={closeSearchHanlder} />
			<ShopByDepartments showShopByDepts={showShopByDepts} setShowByDepts={setShowByDepts} />

			{/* add animation */}
			{
				showCartSidebar && (
					<CartItems showCartSidebar={showCartSidebar} setshowCartSidebar={setshowCartSidebar} />
				)
			}
			{/* </> */}
			{/* )} */}
		</>
	)
}

export default Navbar

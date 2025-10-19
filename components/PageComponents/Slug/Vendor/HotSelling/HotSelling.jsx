import React, { useContext, useEffect, useState } from 'react'
import styles from './HotSelling.module.css'
import ListingLayout from '../../../../UI/ListingLayout/ListingLayout'
import LeftCol from '../../../../UI/ListingLayout/LeftCol/LeftCol'
import RightCol from '../../../../UI/ListingLayout/RigthCol/RightCol'
import RightColContent from './RightColContent/RightColContent'
import LeftColContent from './LeftColContent/LeftColContent'
import AllProducts from './RightColContent/AllProducts/AllProducts'
import Modal from '../../../../UI/Modal/Modal'
import ModalProductDetail from '../../../../UI/ModalProductDetail/ProductDetail'
import VideoModal from '../../../../UI/ProductDetail/ImgsGallery/VideoModal/VideoModal'
import ImgWithLoader from '../../../../UI/ImgWithLoader/ImgWithLoader'
import { imgApiUrl } from '../../../../../utils/config'
import ContactVendor from './LeftColContent/ContactVendor/ContactVendor'
import { GlobalProvider } from '../../../../../context/AppProvider'
import { useRouter } from 'next/router'
import { LiteLoader } from '../../../../Loader/Loader'
import NewCourseCard from '../../../../UI/NewCourseCard/NewCourseCard'
import HeadingWithBtn from '../../../../UI/HeadingWithBtn/HeadingWithBtn'

// import banner1 from '../../../../../public/imgs/blue-banner.png'

const HotSelling = ({ banner, vendorSlug, vendorName, hotProduts, allProducts, pageList, vboothUrl, allProductsPage, vendorId, appointmentData, courses, alone_videos, userAddress }) => {
	const router = useRouter()
	const [displayType, setdisplayType] = useState('products')
	const [activeSubPageIndex, setactiveSubPageIndex] = useState([0])
	const [showSubPage, setshowSubPage] = useState(false)
	const [searchResultAllProducts, setsearchResultAllProducts] = useState([])
	const [showSearchFilterResult, setshowSearchFilterResult] = useState(false)
	const [modal, setmodal] = useState(false)
	const [modalData, setModalData] = useState(null)
	const [modalLoading, setmodalLoading] = useState(false)
	const [sidebarVideoModal, setsidebarVideoModal] = useState(false)
	const [sidebarVideoModalData, setsidebarVideoModalData] = useState('')

	const [showMeetingModal, setshowMeetingModal] = useState(false)

	const [meetingFormSubmit, setmeetingFormSubmit] = useState(false)

	const { loginUser, userData } = useContext(GlobalProvider)

	useEffect(() => {
		if (router?.asPath === '/vendors/gervetusa#courses') {
			setTimeout(() => {
				document.querySelector('#course').scrollIntoView({ block: 'start', behavior: 'smooth' })
			}, 500)
		}
	}, [])
	return (
		<>
			<LiteLoader className={`${modalLoading ? 'show-bd' : 'hide-bd'} transition modal-bg`} />
			<Modal modal={modal} setmodal={setmodal} modalType='product' displayType='card-modal'>
				{modal && <ModalProductDetail data={modalData} setmodal={setmodal} setsidebarVideoModalData={setsidebarVideoModalData} setsidebarVideoModal={setsidebarVideoModal} />}
			</Modal>

			<Modal modal={sidebarVideoModal} setmodal={setsidebarVideoModal} modalType='video'>
				{sidebarVideoModal && <VideoModal videoData={sidebarVideoModalData} modal={sidebarVideoModal} />}
			</Modal>

			<Modal modal={showMeetingModal} setmodal={setshowMeetingModal} modalType={meetingFormSubmit ? 'meeting' : undefined}>
				{showMeetingModal && (
					<ContactVendor type='meeting' vendorId={vendorId} vendorName={vendorName} appointmentData={appointmentData} showMeetingModal={showMeetingModal} meetingFormSubmit={meetingFormSubmit} setmeetingFormSubmit={setmeetingFormSubmit} loginUser={loginUser} userAddress={userAddress} />
				)}
			</Modal>

			<ListingLayout className={styles.wrapper}>
				<div>
					<LeftCol className={styles.left_col}>
						<LeftColContent vendorId={vendorId} setshowMeetingModal={setshowMeetingModal} appointment={appointmentData?.length > 0 ? true : false} userAddress={userAddress} loginUser={loginUser} userPosition={userData?.position} />
					</LeftCol>

					{banner?.map((banner, index) => {
						return (
							banner?.area_id === 16 &&
							banner?.image !== null && (
								<div key={index} className={`inner-sec-pt ${styles.left_banner_wrapper}`}>
									<div className={`${styles.left_banner_image}`}>
										{banner?.link !== null ? (
											<a href={banner[0]?.link} rel='noreferrer noopener' target='_blank'>
												<ImgWithLoader src={`${imgApiUrl?.banners}/${banner?.image}`} alt={banner?.image} width={290} height={537} />
											</a>
										) : (
											<ImgWithLoader key={index} src={`${imgApiUrl?.banners}/${banner?.image}`} alt={banner?.image} width={290} height={537} />
										)}
									</div>
								</div>
							)
						)
					})}
				</div>
				<RightCol>
					<RightColContent
						vendorId={vendorId}
						pageList={pageList}
						hotProduts={hotProduts}
						searchResultAllProducts={searchResultAllProducts}
						setsearchResultAllProducts={setsearchResultAllProducts}
						vboothUrl={vboothUrl}
						displayType={displayType}
						setdisplayType={setdisplayType}
						showSearchFilterResult={showSearchFilterResult}
						setshowSearchFilterResult={setshowSearchFilterResult}
						showSubPage={showSubPage}
						setshowSubPage={setshowSubPage}
						activeSubPageIndex={activeSubPageIndex}
						setactiveSubPageIndex={setactiveSubPageIndex}
						vendorSlug={vendorSlug}
						setmodal={setmodal}
						setModalData={setModalData}
						allProducts={allProducts}
						allProductsPage={allProductsPage}
						setmodalLoading={setmodalLoading}
						loginUser={loginUser}
					/>
				</RightCol>
			</ListingLayout>

			{/* courses or videos on demand */}
			{((loginUser?.id !== undefined && userData?.position !== undefined && userData?.position !== 'Sales Rep') || loginUser?.id === undefined) && (
				<section id='course'>
					{(courses?.length > 0 || alone_videos?.length > 0) && (
						<div className={`${styles.videos_container} sec-mb sec-p`}>
							<svg className={styles.doodles} width={25} height={25} viewBox='0 0 61 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<g clipPath='url(#clip0_613_907)'>
									<path
										d='M18.3553 26.3201C17.2381 26.9651 16.0711 27.1246 14.8544 26.7986C13.6376 26.4726 12.7067 25.751 12.0617 24.6338C11.4167 23.5166 11.2572 22.3496 11.5832 21.1328C11.9092 19.916 12.6309 18.9851 13.7481 18.3401C14.8653 17.6951 16.0322 17.5356 17.249 17.8617C18.4658 18.1877 19.3967 18.9093 20.0417 20.0265C20.6867 21.1437 20.8462 22.3107 20.5202 23.5275C20.1941 24.7442 19.4725 25.6751 18.3553 26.3201ZM21.8515 15.7896C20.7343 16.4346 19.5673 16.5941 18.3506 16.2681C17.1338 15.9421 16.2029 15.2204 15.5579 14.1032C14.9129 12.986 14.7534 11.8191 15.0794 10.6023C15.4054 9.38552 16.1271 8.45463 17.2443 7.80961C18.3615 7.1646 19.5284 7.00511 20.7452 7.33114C21.962 7.65717 22.8929 8.37879 23.5379 9.49598C24.1829 10.6132 24.3424 11.7802 24.0164 12.9969C23.6903 14.2137 22.9687 15.1446 21.8515 15.7896ZM31.4275 10.2609C30.3103 10.9059 29.1433 11.0654 27.9266 10.7394C26.7098 10.4133 25.7789 9.69173 25.1339 8.57453C24.4889 7.45733 24.3294 6.29035 24.6554 5.07358C24.9814 3.85682 25.703 2.92593 26.8202 2.28091C27.9374 1.6359 29.1044 1.47641 30.3212 1.80244C31.538 2.12847 32.4689 2.85008 33.1139 3.96728C33.7589 5.08448 33.9184 6.25147 33.5923 7.46823C33.2663 8.685 32.5447 9.61589 31.4275 10.2609ZM42.2953 12.4984C41.1781 13.1434 40.0111 13.3029 38.7943 12.9768C37.5776 12.6508 36.6467 11.9292 36.0017 10.812C35.3567 9.6948 35.1972 8.52782 35.5232 7.31105C35.8492 6.09429 36.5708 5.16339 37.688 4.51838C38.8052 3.87336 39.9722 3.71387 41.189 4.0399C42.4058 4.36594 43.3366 5.08755 43.9817 6.20475C44.6267 7.32195 44.7862 8.48893 44.4601 9.7057C44.1341 10.9225 43.4125 11.8534 42.2953 12.4984ZM31.0012 40.299C29.8042 40.9901 28.5347 41.1109 27.1928 40.6613C25.8508 40.2118 24.82 39.3627 24.1005 38.114C23.3019 36.7308 23.0756 35.2478 23.4215 33.6649C23.7674 32.082 24.1135 30.5167 24.4598 28.969C24.7552 27.699 24.902 26.4176 24.9003 25.1247C24.8987 23.8319 25.0376 22.5366 25.3169 21.239C25.5028 20.2095 25.8509 19.246 26.3612 18.3484C26.8716 17.4509 27.5786 16.7405 28.4824 16.2173C29.3868 15.6951 30.3476 15.4241 31.3647 15.4044C32.3818 15.3846 33.3826 15.5516 34.3671 15.9053C35.6033 16.3265 36.7918 16.864 37.9325 17.5177C39.0731 18.1714 40.2743 18.7014 41.5361 19.1079C43.0507 19.5812 44.5793 20.0641 46.122 20.5566C47.6648 21.0491 48.8359 21.9867 49.6356 23.3692C50.3574 24.6194 50.5774 25.938 50.2958 27.325C50.0141 28.7119 49.2749 29.7501 48.0784 30.4395C46.642 31.2688 45.1498 31.9707 43.6018 32.5453C42.0538 33.1198 40.5616 33.8217 39.1252 34.651C37.6888 35.4803 36.3348 36.4217 35.0632 37.475C33.7916 38.5284 32.4376 39.4697 31.0012 40.299Z'
										fill='#883CAC'
										fillOpacity='0.5'
									/>
								</g>
								<defs>
									<clipPath id='clip0_613_907'>
										<rect width='44.2296' height='44.2296' fill='white' transform='translate(0 11.1152) rotate(-30)' />
									</clipPath>
								</defs>
							</svg>

							<svg className={styles.doodles} width='52' height='83' viewBox='0 0 52 83' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M68.6552 14.1191C68.6552 10.9049 67.3783 7.82238 65.1055 5.54961C62.8328 3.27683 59.7502 2 56.536 2C53.3218 2 50.2393 3.27683 47.9665 5.54961C45.6938 7.82238 44.4169 10.9049 44.4169 14.1191C44.4304 17.3281 45.7162 20.4008 47.9921 22.6631L22.6631 47.9921C20.4008 45.7162 17.3281 44.4304 14.1191 44.4169C10.9049 44.4169 7.82238 45.6938 5.54961 47.9665C3.27683 50.2393 2 53.3218 2 56.536C2 59.7502 3.27683 62.8328 5.54961 65.1055C7.82238 67.3783 10.9049 68.6552 14.1191 68.6552C14.1191 71.8693 15.396 74.9519 17.6687 77.2247C19.9415 79.4974 23.024 80.7743 26.2382 80.7743C29.4524 80.7743 32.535 79.4974 34.8078 77.2247C37.0805 74.9519 38.3574 71.8693 38.3574 68.6552C38.3438 65.4462 37.0581 62.3735 34.7822 60.1112L60.1112 34.7822C62.3735 37.0581 65.4462 38.3438 68.6552 38.3574C71.8693 38.3574 74.9519 37.0805 77.2247 34.8078C79.4974 32.535 80.7743 29.4524 80.7743 26.2382C80.7743 23.024 79.4974 19.9415 77.2247 17.6687C74.9519 15.396 71.8693 14.1191 68.6552 14.1191Z'
									stroke='#883CAC'
									strokeOpacity='0.5'
									strokeWidth='2.9003'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>

							<svg className={styles.doodles} width='43' height='85' viewBox='0 0 43 85' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M27.6854 15.1484C27.6854 11.9342 26.4086 8.85168 24.1358 6.5789C21.863 4.30613 18.7805 3.0293 15.5663 3.0293C12.3521 3.0293 9.26958 4.30613 6.9968 6.5789C4.72403 8.85168 3.44719 11.9342 3.44719 15.1484C3.46072 18.3574 4.74644 21.4301 7.02233 23.6924L-18.3066 49.0214C-20.569 46.7455 -23.6416 45.4597 -26.8506 45.4462C-30.0648 45.4462 -33.1473 46.7231 -35.4201 48.9958C-37.6929 51.2686 -38.9697 54.3511 -38.9697 57.5653C-38.9697 60.7795 -37.6929 63.8621 -35.4201 66.1348C-33.1473 68.4076 -30.0648 69.6845 -26.8506 69.6845C-26.8506 72.8986 -25.5738 75.9812 -23.301 78.254C-21.0282 80.5267 -17.9457 81.8036 -14.7315 81.8036C-11.5173 81.8036 -8.43475 80.5267 -6.16198 78.254C-3.8892 75.9812 -2.61237 72.8986 -2.61237 69.6845C-2.6259 66.4755 -3.91161 63.4028 -6.18751 61.1405L19.1415 35.8115C21.4038 38.0874 24.4764 39.3731 27.6854 39.3867C30.8996 39.3867 33.9822 38.1098 36.2549 35.837C38.5277 33.5643 39.8046 30.4817 39.8046 27.2675C39.8046 24.0533 38.5277 20.9708 36.2549 18.698C33.9822 16.4252 30.8996 15.1484 27.6854 15.1484Z'
									stroke='#883CAC'
									strokeOpacity='0.5'
									strokeWidth='2.9003'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>

							<svg className={styles.doodles} width='61' height='61' viewBox='0 0 61 61' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<g clipPath='url(#clip0_613_904)'>
									<path
										d='M18.3553 37.3201C17.2381 37.9651 16.0711 38.1246 14.8544 37.7986C13.6376 37.4726 12.7067 36.751 12.0617 35.6338C11.4167 34.5166 11.2572 33.3496 11.5832 32.1328C11.9092 30.916 12.6309 29.9851 13.7481 29.3401C14.8653 28.6951 16.0322 28.5356 17.249 28.8617C18.4658 29.1877 19.3967 29.9093 20.0417 31.0265C20.6867 32.1437 20.8462 33.3107 20.5202 34.5275C20.1941 35.7442 19.4725 36.6751 18.3553 37.3201ZM21.8515 26.7896C20.7343 27.4346 19.5673 27.5941 18.3506 27.2681C17.1338 26.9421 16.2029 26.2204 15.5579 25.1032C14.9129 23.986 14.7534 22.8191 15.0794 21.6023C15.4054 20.3855 16.1271 19.4546 17.2443 18.8096C18.3615 18.1646 19.5284 18.0051 20.7452 18.3311C21.962 18.6572 22.8929 19.3788 23.5379 20.496C24.1829 21.6132 24.3424 22.7802 24.0164 23.9969C23.6903 25.2137 22.9687 26.1446 21.8515 26.7896ZM31.4275 21.2609C30.3103 21.9059 29.1433 22.0654 27.9266 21.7394C26.7098 21.4133 25.7789 20.6917 25.1339 19.5745C24.4889 18.4573 24.3294 17.2904 24.6554 16.0736C24.9814 14.8568 25.703 13.9259 26.8202 13.2809C27.9374 12.6359 29.1044 12.4764 30.3212 12.8024C31.538 13.1285 32.4689 13.8501 33.1139 14.9673C33.7589 16.0845 33.9184 17.2515 33.5923 18.4682C33.2663 19.685 32.5447 20.6159 31.4275 21.2609ZM42.2953 23.4984C41.1781 24.1434 40.0111 24.3029 38.7943 23.9768C37.5776 23.6508 36.6467 22.9292 36.0017 21.812C35.3567 20.6948 35.1972 19.5278 35.5232 18.3111C35.8492 17.0943 36.5708 16.1634 37.688 15.5184C38.8052 14.8734 39.9722 14.7139 41.189 15.0399C42.4058 15.3659 43.3366 16.0876 43.9817 17.2048C44.6267 18.322 44.7862 19.4889 44.4601 20.7057C44.1341 21.9225 43.4125 22.8534 42.2953 23.4984ZM31.0012 51.299C29.8042 51.9901 28.5347 52.1109 27.1928 51.6613C25.8508 51.2118 24.82 50.3627 24.1005 49.114C23.3019 47.7308 23.0756 46.2478 23.4215 44.6649C23.7674 43.082 24.1135 41.5167 24.4598 39.969C24.7552 38.699 24.902 37.4176 24.9003 36.1247C24.8987 34.8319 25.0376 33.5366 25.3169 32.239C25.5028 31.2095 25.8509 30.246 26.3612 29.3484C26.8716 28.4509 27.5786 27.7405 28.4824 27.2173C29.3868 26.6951 30.3476 26.4241 31.3647 26.4044C32.3818 26.3846 33.3826 26.5516 34.3671 26.9053C35.6033 27.3265 36.7918 27.864 37.9325 28.5177C39.0731 29.1714 40.2743 29.7014 41.5361 30.1079C43.0507 30.5812 44.5793 31.0641 46.122 31.5566C47.6648 32.0491 48.8359 32.9867 49.6356 34.3692C50.3574 35.6194 50.5774 36.938 50.2958 38.325C50.0141 39.7119 49.2749 40.7501 48.0784 41.4395C46.642 42.2688 45.1498 42.9707 43.6018 43.5453C42.0538 44.1198 40.5616 44.8217 39.1252 45.651C37.6888 46.4803 36.3348 47.4217 35.0632 48.475C33.7916 49.5284 32.4376 50.4697 31.0012 51.299Z'
										fill='#883CAC'
										fillOpacity='0.5'
									/>
								</g>
								<defs>
									<clipPath id='clip0_613_904'>
										<rect width='44.2296' height='44.2296' fill='white' transform='translate(0 22.1152) rotate(-30)' />
									</clipPath>
								</defs>
							</svg>

							<svg className={styles.doodles} width={61} height={77} viewBox='0 0 77 77' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<g clippath='url(#clip0_613_363)'>
									<path
										d='M23.1877 47.1475C21.7763 47.9624 20.302 48.1639 18.7648 47.752C17.2276 47.3401 16.0515 46.4285 15.2366 45.0171C14.4218 43.6057 14.2203 42.1314 14.6322 40.5942C15.0441 39.057 15.9557 37.8809 17.3671 37.0661C18.7785 36.2512 20.2528 36.0497 21.79 36.4616C23.3272 36.8735 24.5033 37.7851 25.3181 39.1965C26.133 40.6079 26.3345 42.0822 25.9226 43.6194C25.5107 45.1566 24.5991 46.3327 23.1877 47.1475ZM27.6046 33.8439C26.1932 34.6587 24.7189 34.8602 23.1817 34.4483C21.6445 34.0364 20.4684 33.1248 19.6535 31.7134C18.8387 30.302 18.6372 28.8277 19.0491 27.2905C19.461 25.7533 20.3726 24.5772 21.784 23.7624C23.1954 22.9475 24.6697 22.746 26.2069 23.1579C27.7441 23.5698 28.9202 24.4814 29.735 25.8928C30.5499 27.3042 30.7514 28.7785 30.3395 30.3157C29.9276 31.8529 29.016 33.029 27.6046 33.8439ZM39.7024 26.8592C38.291 27.6741 36.8167 27.8756 35.2795 27.4637C33.7423 27.0518 32.5662 26.1401 31.7513 24.7287C30.9365 23.3173 30.735 21.843 31.1469 20.3058C31.5588 18.7686 32.4704 17.5926 33.8818 16.7777C35.2932 15.9628 36.7675 15.7613 38.3047 16.1732C39.8419 16.5851 41.018 17.4968 41.8328 18.9082C42.6477 20.3196 42.8492 21.7939 42.4373 23.3311C42.0254 24.8683 41.1138 26.0443 39.7024 26.8592ZM53.4322 29.6859C52.0207 30.5008 50.5464 30.7023 49.0092 30.2904C47.472 29.8785 46.296 28.9668 45.4811 27.5554C44.6663 26.144 44.4648 24.6697 44.8767 23.1325C45.2885 21.5953 46.2002 20.4193 47.6116 19.6044C49.023 18.7895 50.4973 18.588 52.0345 18.9999C53.5717 19.4118 54.7477 20.3235 55.5626 21.7349C56.3775 23.1463 56.579 24.6206 56.1671 26.1578C55.7552 27.695 54.8436 28.871 53.4322 29.6859ZM39.1638 64.8077C37.6516 65.6808 36.0478 65.8334 34.3524 65.2655C32.657 64.6976 31.3549 63.6249 30.4459 62.0473C29.437 60.2999 29.151 58.4263 29.588 56.4265C30.025 54.4268 30.4622 52.4493 30.8998 50.494C31.2729 48.8896 31.4584 47.2707 31.4563 45.6374C31.4542 44.004 31.6297 42.3677 31.9826 40.7283C32.2174 39.4277 32.6572 38.2105 33.3019 37.0765C33.9466 35.9426 34.8399 35.0451 35.9817 34.3841C37.1243 33.7245 38.338 33.3821 39.623 33.3572C40.908 33.3322 42.1723 33.5431 43.4161 33.99C44.9779 34.5221 46.4793 35.2011 47.9204 36.027C49.3614 36.8528 50.879 37.5225 52.473 38.036C54.3865 38.6339 56.3177 39.244 58.2667 39.8662C60.2156 40.4884 61.6953 41.6729 62.7055 43.4196C63.6174 44.999 63.8954 46.6648 63.5395 48.417C63.1836 50.1692 62.2499 51.4808 60.7382 52.3517C58.9236 53.3994 57.0384 54.2862 55.0827 55.012C53.127 55.7379 51.2418 56.6247 49.4272 57.6724C47.6125 58.7201 45.9019 59.9093 44.2955 61.24C42.689 62.5708 40.9785 63.76 39.1638 64.8077Z'
										fill='#C196D5'
									/>
								</g>
								<defs>
									<clipPath id='clip0_613_363'>
										<rect width='55.8773' height='55.8773' fill='white' transform='translate(0 27.9385) rotate(-30)' />
									</clipPath>
								</defs>
							</svg>

							<svg className={styles.doodles} width={50} height={50} viewBox='0 0 77 77' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<g clippath='url(#clip0_613_363)'>
									<path
										d='M23.1877 47.1475C21.7763 47.9624 20.302 48.1639 18.7648 47.752C17.2276 47.3401 16.0515 46.4285 15.2366 45.0171C14.4218 43.6057 14.2203 42.1314 14.6322 40.5942C15.0441 39.057 15.9557 37.8809 17.3671 37.0661C18.7785 36.2512 20.2528 36.0497 21.79 36.4616C23.3272 36.8735 24.5033 37.7851 25.3181 39.1965C26.133 40.6079 26.3345 42.0822 25.9226 43.6194C25.5107 45.1566 24.5991 46.3327 23.1877 47.1475ZM27.6046 33.8439C26.1932 34.6587 24.7189 34.8602 23.1817 34.4483C21.6445 34.0364 20.4684 33.1248 19.6535 31.7134C18.8387 30.302 18.6372 28.8277 19.0491 27.2905C19.461 25.7533 20.3726 24.5772 21.784 23.7624C23.1954 22.9475 24.6697 22.746 26.2069 23.1579C27.7441 23.5698 28.9202 24.4814 29.735 25.8928C30.5499 27.3042 30.7514 28.7785 30.3395 30.3157C29.9276 31.8529 29.016 33.029 27.6046 33.8439ZM39.7024 26.8592C38.291 27.6741 36.8167 27.8756 35.2795 27.4637C33.7423 27.0518 32.5662 26.1401 31.7513 24.7287C30.9365 23.3173 30.735 21.843 31.1469 20.3058C31.5588 18.7686 32.4704 17.5926 33.8818 16.7777C35.2932 15.9628 36.7675 15.7613 38.3047 16.1732C39.8419 16.5851 41.018 17.4968 41.8328 18.9082C42.6477 20.3196 42.8492 21.7939 42.4373 23.3311C42.0254 24.8683 41.1138 26.0443 39.7024 26.8592ZM53.4322 29.6859C52.0207 30.5008 50.5464 30.7023 49.0092 30.2904C47.472 29.8785 46.296 28.9668 45.4811 27.5554C44.6663 26.144 44.4648 24.6697 44.8767 23.1325C45.2885 21.5953 46.2002 20.4193 47.6116 19.6044C49.023 18.7895 50.4973 18.588 52.0345 18.9999C53.5717 19.4118 54.7477 20.3235 55.5626 21.7349C56.3775 23.1463 56.579 24.6206 56.1671 26.1578C55.7552 27.695 54.8436 28.871 53.4322 29.6859ZM39.1638 64.8077C37.6516 65.6808 36.0478 65.8334 34.3524 65.2655C32.657 64.6976 31.3549 63.6249 30.4459 62.0473C29.437 60.2999 29.151 58.4263 29.588 56.4265C30.025 54.4268 30.4622 52.4493 30.8998 50.494C31.2729 48.8896 31.4584 47.2707 31.4563 45.6374C31.4542 44.004 31.6297 42.3677 31.9826 40.7283C32.2174 39.4277 32.6572 38.2105 33.3019 37.0765C33.9466 35.9426 34.8399 35.0451 35.9817 34.3841C37.1243 33.7245 38.338 33.3821 39.623 33.3572C40.908 33.3322 42.1723 33.5431 43.4161 33.99C44.9779 34.5221 46.4793 35.2011 47.9204 36.027C49.3614 36.8528 50.879 37.5225 52.473 38.036C54.3865 38.6339 56.3177 39.244 58.2667 39.8662C60.2156 40.4884 61.6953 41.6729 62.7055 43.4196C63.6174 44.999 63.8954 46.6648 63.5395 48.417C63.1836 50.1692 62.2499 51.4808 60.7382 52.3517C58.9236 53.3994 57.0384 54.2862 55.0827 55.012C53.127 55.7379 51.2418 56.6247 49.4272 57.6724C47.6125 58.7201 45.9019 59.9093 44.2955 61.24C42.689 62.5708 40.9785 63.76 39.1638 64.8077Z'
										fill='#C196D5'
									/>
								</g>
								<defs>
									<clipPath id='clip0_613_363'>
										<rect width='55.8773' height='55.8773' fill='white' transform='translate(0 27.9385) rotate(-30)' />
									</clipPath>
								</defs>
							</svg>

							{courses?.length > 0 && (
								<div className='sec-container'>
									<HeadingWithBtn firstSeperator={false} lastSeperator={false} className={styles.course_heading} blackHeading={`Courses`} btnText='View All' href={`vendors/${vendorSlug}/all-courses`} svgAfterBH={false} />
									<div className={styles.courses_wrapper}>
										{courses?.slice(0, 4)?.map((course, i) => {
											return <NewCourseCard key={course?.id} data={course} vendor={vendorSlug} />
										})}
									</div>
								</div>
							)}

							{alone_videos?.length > 0 && (
								<div className={`${styles.videos_container} inner-sec-pt`}>
									<div className='sec-container'>
										<HeadingWithBtn firstSeperator={false} lastSeperator={false} className={styles.course_heading} blackHeading={`Videos For You`} btnText='View All' href={`vendors/${vendorSlug}/all-videos`} svgAfterBH={false} />
										<div className={styles.courses_wrapper}>
											{alone_videos?.slice(0, 4)?.map((course, i) => {
												return <NewCourseCard key={course?.id} data={course} vendor={vendorSlug} />
											})}
										</div>
									</div>
								</div>
							)}
						</div>
					)}
				</section>
			)}

			{banner?.map((banner, index) => {
				return (
					banner?.area_id === 17 &&
					banner?.image !== null &&
					(banner?.link !== null ? (
						<a key={index} href={banner?.link} rel='noreferrer noopener' target='_blank' className={styles.banner_link}>
							<ImgWithLoader className={`${styles.mid_banner_image}`} src={`${imgApiUrl?.banners}/${banner?.image}`} alt={banner?.name} layout='fill' />
						</a>
					) : (
						<ImgWithLoader key={index} className={`${styles.mid_banner_image}`} src={`${imgApiUrl?.banners}/${banner?.image}`} alt={banner?.name} layout='fill' />
					))
				)
			})}

			{displayType === 'products' && !showSearchFilterResult && hotProduts?.length > 0 && (
				<>
					{/* <div className={`${styles.banner_wrapper} sec-container sec-mb`}>
						<Image layout='fill' src={banner1} alt={vendorName} />
					</div> */}

					<AllProducts allProducts={allProducts} vendorSlug={vendorSlug} allProductsPage={allProductsPage} setmodal={setmodal} setModalData={setModalData} setmodalLoading={setmodalLoading} />
				</>
			)}

			<div className={`sec-container`}>
				<div className={`inner-sec-p ${styles.banner_images_container}`}>
					{banner?.map(
						(banner, index) =>
							banner !== undefined &&
							(banner?.area_id === 18 || banner?.area_id === 19 || banner?.area_id === 20) && (
								<div key={index} className={banner !== undefined && banner?.image !== null && banner?.area_id !== null ? styles.more_banner : styles.none}>
									{banner?.image !== null && (
										<div className={`${styles.last_banner_image}`}>
											{banner?.link !== null ? (
												<a href={banner?.link} target='_blank' rel='noreferrer'>
													<ImgWithLoader src={`${imgApiUrl?.banners}/${banner?.image}`} alt={banner?.name} width={530} height={285} />
												</a>
											) : (
												<ImgWithLoader src={`${imgApiUrl?.banners}/${banner?.image}`} alt={banner?.name} width={530} height={285} />
											)}
										</div>
									)}
								</div>
							)
					)}
				</div>
			</div>
		</>
	)
}

export default HotSelling

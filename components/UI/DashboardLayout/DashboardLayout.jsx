import React, { useContext, useEffect, useRef, useState } from 'react'
import DashboardLinks from '../DashboardLinks/DashboardLinks'
import LeftCol from '../ListingLayout/LeftCol/LeftCol'
import RightCol from '../ListingLayout/RigthCol/RightCol'
import ListingLayout from '../ListingLayout/ListingLayout'
import styles from './DashboardLayout.module.css'
import Modal from '../../UI/Modal/Modal'
import ProfileImgUpload1 from './ProfileImgUpload/ProfileImgUpload1'
import { GlobalProvider } from '../../../context/AppProvider'
import { useRouter } from 'next/router'
import { DarkLoader } from '../../Loader/Loader'
import NotAuthorized from '../../UI/NotAuthorized/NotAuthorized'
import DeleteAcc from '../DeleteAcc/DeleteAcc'
import { useSession } from 'next-auth/react'
import Cookies from 'js-cookie'

const DashboardLayout = ({ pageType, children, className }) => {
	const dashboardPagesContent = useRef(null)
	const [modal, setmodal] = useState(false)
	const [modalAlertType, setmodalAlertType] = useState(null)
	const { userData, getUserData, setuserData, setpopupSuccess, setresMsgforPopup, setshowresMsg, loginUser, setloginUser, setactiveProvider } = useContext(GlobalProvider)
	const router = useRouter()
	const [loading, setloading] = useState(true)
	const [show, setshow] = useState(true)

	const userId = Cookies.get('dvm_cen_tral_user_id')

	const { data: status } = useSession()

	useEffect(() => {
		if (userData?.position === 'Sales Rep') {
			setshow(() =>
				!router?.asPath?.includes('/appointments') &&
				!router?.asPath?.includes('/coins') &&
				!router?.asPath?.includes('/courses') &&
				!router?.asPath?.includes('/delivery-address') &&
				!router?.asPath?.includes('/documents') &&
				!router?.asPath?.includes('/my-address') &&
				!router?.asPath?.includes('/wishlist') &&
				!router?.asPath?.includes('/all-orders') &&
				!router?.asPath?.includes('/subscriptions')
					? true
					: false
			)
		} else {
			setshow(() => (!router?.asPath?.includes('/profile') && !router?.asPath?.includes('/build-resume') && !router?.asPath?.includes('/interviews') ? true : false))
		}

		if (router?.isReady && loginUser?.id !== undefined && Number(userId) !== (loginUser?.id !== undefined ? loginUser?.id : loginUser?.id) && router?.asPath !== '/dashboard/faq') {
			const newRoute = router.asPath.replace(userId, loginUser?.id !== undefined ? loginUser?.id : loginUser?.id)

			router.push(newRoute)
		} else {
			setTimeout(
				() => {
					setloading(false)
				},
				loginUser?.id !== undefined && userData?.position !== undefined ? 0 : 2000
			)
		}
	}, [router.isReady, loginUser?.id, router?.asPath, show, userData])

	return (
		<div className={styles.container}>
			<Modal modal={modal} setmodal={setmodal} data={getUserData} modalAlertType={modalAlertType} setmodalAlertType={setmodalAlertType} className={styles.big_modal} modalType={modalAlertType !== 'delete-account' ? 'crop' : 'profile_img_upload'}>
				{modal &&
					(modalAlertType === 'delete-account' ? (
						<DeleteAcc setmodal={setmodal} setmodalAlertType={setmodalAlertType} setresMsgforPopup={setresMsgforPopup} setshowresMsg={setshowresMsg} setpopupSuccess={setpopupSuccess} loginUser={loginUser} setloginUser={setloginUser} />
					) : (
						<ProfileImgUpload1 data={getUserData} setmodal={setmodal} loginUser={loginUser} />
					))}
			</Modal>

			{loginUser?.id !== undefined ? (
				<ListingLayout>
					<LeftCol className={`${styles.left_col} white-bg active-scrollbar transition ${loading ? styles.loading : undefined}`}>
						<DashboardLinks
							dashboardPagesContent={dashboardPagesContent}
							pageType={pageType}
							setuserData={setuserData}
							userData={userData}
							modal={modal}
							setmodal={setmodal}
							setmodalAlertType={setmodalAlertType}
							loginUser={loginUser}
							setloginUser={setloginUser}
							setactiveProvider={setactiveProvider}
							userPosition={userData?.position}
						/>
					</LeftCol>
					<RightCol className={`${styles.right_col} white-bg radius ${className}`}>
						<div ref={dashboardPagesContent} className={styles.page_content_wrapper}>
							{loading || status === 'loading' ? <DarkLoader className={styles.loader} /> : show ? children : status !== 'loading' && !loading && <NotAuthorized className={styles.not_show} heading='You are not authorized to access this page.' />}
						</div>
					</RightCol>
				</ListingLayout>
			) : (
				status !== 'loading' && !loading && <NotAuthorized className={`${styles.no_access} sec-mb`} heading='Login is required to access this page.' btnText='Sign in' href='/auth/signin' />
			)}
		</div>
	)
}

export default DashboardLayout

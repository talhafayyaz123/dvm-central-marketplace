import React, { useContext, useState } from 'react'
import styles from '../TrackOrder.module.css'
import OrderDetail from '../OrderDetail'
import TrackOrder from '../TrackOrder'
import MetaTags from '../../../UI/MetaTags/MetaTags'
import { GlobalProvider } from '../../../../context/AppProvider'
import NotAuthorized from '../../../UI/NotAuthorized/NotAuthorized'

const Forms = () => {
	const { userData } = useContext(GlobalProvider)

	const [showTrackOrderForm, setshowTrackOrderForm] = useState(true)
	const [showTrackOrderInfo, setshowTrackOrderInfo] = useState(false)
	const [orderTrackDetail, setorderTrackDetail] = useState('')
	const [trackOrderResMsg, settrackOrderResMsg] = useState('')

	const showTrackOrderDetail = () => {
		setshowTrackOrderInfo(false)
		setshowTrackOrderForm(true)
	}

	return userData?.position !== undefined && userData?.position !== 'Sales Rep' ? (
		<>
			<MetaTags
				title={`Track order - Dashboard - DVM Central`}
				description={`Track your order status effortlessly with our intuitive tracking system. Enter your order details and stay informed about your shipment's progress in real-time, ensuring you're always updated on your delivery from start to finish.`}
			/>
			<div className={`${styles.form_container} white-bg radius`}>
				<div className={styles.form_outer_wrapper}>
					{showTrackOrderForm && <TrackOrder setshowTrackOrderInfo={setshowTrackOrderInfo} setshowTrackOrderForm={setshowTrackOrderForm} settrackOrderResMsg={settrackOrderResMsg} trackOrderResMsg={trackOrderResMsg} setorderTrackDetail={setorderTrackDetail} />}
					{showTrackOrderInfo && (
						<>
							<div className='sec-container'>
								<button className={`${styles.back_to_signin} sml-btn primary-btn white-color`} onClick={() => showTrackOrderDetail()}>
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
									</svg>
									Back
								</button>
							</div>
							<OrderDetail orderTrackDetail={orderTrackDetail} />
						</>
					)}
				</div>
			</div>
		</>
	) : (
		<NotAuthorized heading='You are not authorized to access this page.' />
	)
}

export default Forms

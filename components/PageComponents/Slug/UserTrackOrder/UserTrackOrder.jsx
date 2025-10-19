import React, { useContext, useEffect, useState } from 'react'
import OrderDetail from '../../TrackOrder/OrderDetail'
import { DarkLoader } from '../../../Loader/Loader'
import { useRouter } from 'next/router'
import styles from './UserTrackOrder.module.css'
import NotAuthorized from '../../../UI/NotAuthorized/NotAuthorized'
import { GlobalProvider } from '../../../../context/AppProvider'

const UserTrackOrder = ({ result }) => {
	const [loading, setloading] = useState(true)
	const { userData } = useContext(GlobalProvider)

	const router = useRouter()
	useEffect(() => {
		if (result?.orderData?.parent_id !== 0) {
			setTimeout(() => {
				setloading(false)
			}, 500)
		} else {
			router.push(`/user/order-details/${router.asPath.substring(18)}`)
			setTimeout(() => {
				setloading(false)
			}, 500)
		}
	}, [])
	return userData?.position !== undefined && userData?.position !== 'Sales Rep' ? (
		<div className={styles.container}>{loading ? <DarkLoader /> : result?.orderData?.parent_id !== 0 && <OrderDetail orderTrackDetail={result?.orderData} />}</div>
	) : (
		<NotAuthorized heading='You are not authorized to access this page.' />
	)
}

export default UserTrackOrder

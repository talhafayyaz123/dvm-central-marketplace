import React from 'react'
import AllOrders from '../../components/PageComponents/Dashboard/AllOrders/AllOrders'
import { baseApiUrl } from '../../utils/config'

const all_orders = ({ ordersData }) => {
	return <AllOrders ordersData={ordersData} />
}

export default all_orders

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id

	const res = await fetch(`${baseApiUrl}/user/all-orders/${userid}`)
	const data = await res.json()
	return {
		props: {
			ordersData: data
		}
	}
}

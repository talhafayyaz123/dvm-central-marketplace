import React from 'react'
import MyAddresses from '../../components/PageComponents/Dashboard/MyAddresses/MyAddresses'
import { baseApiUrl } from '../../utils/config'

const deliveryAddress = ({ data }) => {
	return <MyAddresses data={data?.delivery_addresses} />
}

export default deliveryAddress

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id
	const res = await fetch(`${baseApiUrl}/user/my-addresses/${userid}`)
	const data = await res.json()
	return {
		props: {
			data: data
		}
	}
}

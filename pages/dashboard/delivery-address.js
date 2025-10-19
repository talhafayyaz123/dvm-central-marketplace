import React from 'react'
import DeliveryAddress from '../../components/PageComponents/Dashboard/DeliveryAddress/DeliveryAddress'
import { baseApiUrl } from '../../utils/config'

const deliveryAddress = ({ userData, prevUrl }) => {
	return <DeliveryAddress userData={userData} prevUrl={prevUrl} />
}

export default deliveryAddress

export async function getServerSideProps(context) {
	const prevUrl = context?.req?.headers?.referer ? context?.req?.headers?.referer : null

	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id

	const res = await fetch(`${baseApiUrl}/user/addresses/${userid}`)
	const data = await res.json()
	return {
		props: {
			userData: data,
			prevUrl: prevUrl
		}
	}
}

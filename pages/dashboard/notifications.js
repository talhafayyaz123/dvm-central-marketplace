import React from 'react'
import Notification from '../../components/PageComponents/Dashboard/Notifications/notifications'
import { baseApiUrl } from '../../utils/config'

const Notifications = ({ data }) => {
	return <Notification data={data} />
}

export default Notifications

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id
	const res = await fetch(`${baseApiUrl}/user/notifications/${userid}`)
	const data = await res.json()
	return {
		props: {
			data: data
		}
	}
}

import React from 'react'
import Messages from '../../components/PageComponents/Dashboard/Messages/Messages'
import { baseApiUrl } from '../../utils/config'

const messages = ({ vendorsList }) => {
	return <Messages vendorsList={vendorsList} />
}

export default messages

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id

	const res = await fetch(`${baseApiUrl}/active-chat-users/${userid}`)
	const data = await res.json()
	return {
		props: {
			vendorsList: data
		}
	}
}

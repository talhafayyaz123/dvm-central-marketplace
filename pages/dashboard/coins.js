import React from 'react'
import { baseApiUrl } from '../../utils/config'
import Coins from '../../components/PageComponents/Dashboard/Coins/Coins'

const coins = ({ data }) => {
	return <Coins data={data} />
}

export default coins

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id

	const res = await fetch(`${baseApiUrl}/get-user-coins/${userid}`).then((resp) => resp.json())
	return {
		props: {
			data: res
		}
	}
}

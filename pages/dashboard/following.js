import React from 'react'
import { baseApiUrl } from '../../utils/config'
import Following from '../../components/PageComponents/Dashboard/Following/Following'

const following = ({ data }) => {
	return <Following data={data} />
}

export default following

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id

	const res = await fetch(`${baseApiUrl}/user/following-vendors/${userid}`).then((resp) => resp.json())

	return {
		props: {
			data: res
		}
	}
}

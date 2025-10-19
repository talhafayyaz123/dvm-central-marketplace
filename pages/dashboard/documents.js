import React from 'react'
import Documents from '../../components/PageComponents/Dashboard/Documents/Documents'
import { baseApiUrl } from '../../utils/config'

const documents = ({ data }) => {
	return <Documents data={data} />
}

export default documents

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id

	const res = await fetch(`${baseApiUrl}/user/user-documents/${userid}`)
	const data = await res.json()
	return {
		props: {
			data: data
		}
	}
}

import React from 'react'
import Appointments from '../../components/PageComponents/Dashboard/Appointments/Appointments'
import { baseApiUrl } from '../../utils/config'

const appointments = ({ data }) => {
	console.log('dart', data)
	return <Appointments data={data?.data} />
}

export default appointments

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id

	const res = await fetch(`${baseApiUrl}/appointments-list/${userid}`).then((resp) => resp.json())

	return {
		props: {
			data: res
		}
	}
}

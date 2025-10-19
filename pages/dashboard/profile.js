import React from 'react'
import ResumeProfile from '../../components/PageComponents/Dashboard/ResumeProfile/ResumeProfile'
import { baseApiUrl } from '../../utils/config'

const profile = ({ data }) => {
	return <ResumeProfile data={data} />
}

export default profile

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id
	const res = await fetch(`${baseApiUrl}/view-medical-rep-profile/${userid}`).then((resp) => resp.json())

	return {
		props: {
			data: res
		}
	}
}

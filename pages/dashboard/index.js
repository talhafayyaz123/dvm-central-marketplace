import React from 'react'
import Profile from '../../components/PageComponents/Dashboard/Profile/Profile'
import { baseApiUrl } from '../../utils/config'

const index = ({ userDataProfile }) => {
	return <Profile userDataProfile={userDataProfile} />
}

export default index

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id

	const res = await fetch(`${baseApiUrl}/user/${userid}`)
	const data = await res.json()
	return {
		props: {
			userDataProfile: data
		}
	}
}

import React from 'react'
import BuildResume from '../../components/PageComponents/Dashboard/BuildResume/BuildResume'
import { baseApiUrl } from '../../utils/config'

const build_resume = ({ data, prevUrl }) => {
	return <BuildResume data={data} prevUrl={prevUrl} />
}

export default build_resume

export async function getServerSideProps(context) {
	const prevUrl = context?.req?.headers?.referer ? context?.req?.headers?.referer : null

	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id

	const res = await fetch(`${baseApiUrl}/view-medical-rep-profile/${userid}`).then((resp) => resp.json())

	return {
		props: {
			data: res,
			prevUrl: prevUrl
		}
	}
}

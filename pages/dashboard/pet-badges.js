import React from 'react'
import { baseApiUrl } from '../../utils/config'
import PetBadges from '../../components/PageComponents/Dashboard/PetBadges/PetBadges'

const petBadges = ({ data }) => {
	console.log('pets data', data)
	return <PetBadges data={data} />
}

export default petBadges

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id
	const res = await fetch(`${baseApiUrl}/user-pets/${userid}`).then((resp) => resp.json())
	return {
		props: {
			data: res
		}
	}
}

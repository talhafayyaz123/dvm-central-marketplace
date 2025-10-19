import React from 'react'
import { baseApiUrl } from '../utils/config'
import ImpersonateUsers from '../components/PageComponents/ManageUsers/ImpersonateUsers'
import { getSession } from 'next-auth/react'

const managevenders = ({ impersonate }) => {
	return <ImpersonateUsers impersonate={impersonate} />
}

export default managevenders

export async function getServerSideProps(ctx) {
	const user = await getSession(ctx)

	if (user?.user?.type !== 'admin') {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const res = await fetch(`${baseApiUrl}/get-impersonate-users`, {
		method: 'POST'
	})
	const data = await res.json()
	return {
		props: {
			impersonate: data
		}
	}
}

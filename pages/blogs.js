import React from 'react'
import { baseApiUrl } from '../utils/config'
import Blogs from '../components/PageComponents/Blogs/Blogs'
import { getSession } from 'next-auth/react'

const blogs = ({ blogs }) => {
	return <Blogs blogs={blogs} />
}

export default blogs

export async function getServerSideProps(ctx) {
	const user = await getSession(ctx)
	const cookies = ctx.req.headers.cookie ? require('cookie').parse(ctx.req.headers.cookie) : {}
	const impersonateUserId = cookies.impersonateUserId

	const res = await fetch(`${baseApiUrl}/blogs?type=dvm_central`, {
		method: 'GET',
		headers: {
			type: 'dvm_central',
			id: impersonateUserId ? impersonateUserId : user?.id ? user?.id : user?.user?.id
		}
	})
	const data = await res.json()
	return {
		props: {
			blogs: data
		}
	}
}

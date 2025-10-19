import React from 'react'
import { baseApiUrl } from '../utils/config'
import HotProducts from '../components/PageComponents/HotProducts/HotProducts'
import { getSession } from 'next-auth/react'

const hot_products = ({ data }) => {
	return <HotProducts data={data} />
}

export default hot_products

export async function getServerSideProps(ctx) {
	const user = await getSession(ctx)

	const cookies = ctx.req.headers.cookie ? require('cookie').parse(ctx.req.headers.cookie) : {}
	const impersonateUserId = cookies.impersonateUserId

	const res = await fetch(`${baseApiUrl}/products/hot-products`, {
		method: 'GET',
		headers: {
			type: impersonateUserId ? impersonateUserId : user?.id ? user?.id : user?.user?.id
		}
	})
	const data = await res.json()
	return {
		props: {
			data: data
		}
	}
}

import React from 'react'
import FeaturedProducts from '../components/PageComponents/FeaturedProducts/FeaturedProducts'
import { baseApiUrl } from '../utils/config'
import { getSession } from 'next-auth/react'

const featured_products = ({ data }) => {
	return <FeaturedProducts data={data} />
}

export default featured_products

export async function getServerSideProps(ctx) {
	const user = await getSession(ctx)
	const cookies = ctx.req.headers.cookie ? require('cookie').parse(ctx.req.headers.cookie) : {}
	const impersonateUserId = cookies.impersonateUserId

	const res = await fetch(`${baseApiUrl}/products/featured-products`, {
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

import { baseApiUrl } from '../utils/config'

import Home from '../components/PageComponents/Home-v2/Home'
import { getSession } from 'next-auth/react'

const index = ({ diffProducts, todaysDeals, newArrivalsData, vendors, banners, data }) => {
	console.log('data', data)
	return <Home diffProducts={diffProducts} todaysDeals={todaysDeals} newArrivalsData={newArrivalsData} vendors={vendors} banners={banners} />
}

export default index

export async function getServerSideProps(ctx) {
	const user = await getSession(ctx)
	let resData = await fetch(`${baseApiUrl}/home`, {
		method: 'GET',
		headers: {
			type: user?.user?.id
		}
	})

	const data = await resData.json()
	return {
		props: {
			diffProducts: data?.different_categories_products,
			todaysDeals: data?.deals_of_the_day_limited,
			newArrivalsData: data?.new_products?.data,
			vendors: data?.vendors,
			// testinmonials: data?.testinmonials,
			banners: data?.deal_banners,
			data: data
		}
	}
}

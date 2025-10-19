import React from 'react'
import { baseApiUrl } from '../../utils/config'
import Wishlist from '../../components/PageComponents/Wishlist/Wishlist'

const whishlist = ({ wishlist }) => {
	return <Wishlist wishlistData={wishlist} />
}

export default whishlist

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie ? require('cookie').parse(context.req.headers.cookie) : {}
	const userid = cookies.dvm_cen_tral_user_id
	const res = await fetch(`${baseApiUrl}/user/wishlist/${userid}`)
	const data = await res.json()
	return {
		props: {
			wishlist: data
		}
	}
}

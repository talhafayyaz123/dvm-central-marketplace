import React from 'react'
import HomeV3 from '../components/PageComponents/HomveV3/HomeV3'
import { baseApiUrl } from '../utils/config'
import { getSession } from 'next-auth/react'

const homev3 = ({ data }) => {
	return <HomeV3 data={data} />
}

export default homev3

export async function getServerSideProps(ctx) {
	// const user = await getSession(ctx)

	// const cookies = ctx.req.headers.cookie ? require('cookie').parse(ctx.req.headers.cookie) : {}
	// const impersonateUserId = cookies.impersonateUserId

	// const startTime = performance.now()
	// // let data = {}

	// const res = await fetch(`${baseApiUrl}/home-v2`, {
	// 	method: 'GET',
	// 	headers: {
	// 		type: user?.id ? user?.id : user?.user?.id
	// 	}
	// }).then((resp) => resp.json())


	// const endTime = performance.now()

	// console.log(endTime - startTime , 'Performace time of api');
	

	// console.log(res,'========================res=====================');


	// // await new Promise((resolve) => {
	// // 	setTimeout(() => {
	// // 	  data = homePageRes;
	// // 	  resolve();
	// // 	}, 600);
	// //   });
	
	// return {
	// 	props: {
	// 		data: homePageRes
	// 	}
	// }
	const user = await getSession(ctx)

	const cookies = ctx.req.headers.cookie ? require('cookie').parse(ctx.req.headers.cookie) : {}
	const impersonateUserId = cookies.impersonateUserId

	console.log('impsdfsd', impersonateUserId)
	console.log(user?.id)
	console.log(user?.user?.id)
	const startTime = performance.now()
	const res = await fetch(`${baseApiUrl}/home-v2`, {
		method: 'GET',
		headers: {
			type: impersonateUserId ? impersonateUserId : user?.id ? user?.id : user?.user?.id
		}
	}).then((resp) => resp.json())

	const endTime = performance.now()

	console.log(endTime - startTime , 'Performace time of api');
	
	return {
		props: {
			data: res
		}
	}
}

import { signOut } from 'next-auth/react'

const signoutFunc = (router, url) => {
	signOut({ redirect: false })
	router.push(url)
}

export default signoutFunc

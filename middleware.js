import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
	if (req.url.includes('?page')) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	// redicting to www url
	// const host = req.headers.get('host')
	// if (host?.slice(0, 4) !== 'www.' && !host?.includes('localhost') && !host?.includes('.app')) {
	// 	return NextResponse.redirect(`https://www.${host}${req.nextUrl.pathname}`, 301)
	// }

	// protecting routes
	if (req.nextUrl.pathname.includes('dashboard') || req.nextUrl.pathname.includes('cart') || req.nextUrl.pathname.includes('checkout') || req.nextUrl.pathname === '/admin') {
		const token = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET
		})

		const url = req.nextUrl.clone()
		url.pathname = '/auth/signin'
		if (!token) return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

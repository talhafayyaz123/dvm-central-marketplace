import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import LinkedInProvider from 'next-auth/providers/linkedin'
import { baseApiUrl } from '../../../utils/config'

export const authOptions = {
	session: {
		strategy: 'jwt'
	},
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Domain Account',
			credentials: {},
			async authorize(credentials, req) {
				const { email, password, browser, operating_system, user_agent, ip_address } = credentials
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)

				const data = {
					email: email,
					password: password,
					browser: browser,
					operating_system: operating_system,
					user_agent: user_agent,
					ip_address: ip_address,
					type: 'dvm_central'
				}

				// const res = await axios.post(`${baseApiUrl}/login`, data)

				const res = await fetch(`${baseApiUrl}/login`, {
					method: 'POST',
					body: JSON.stringify(data),
					headers: { 'Content-Type': 'application/json' }
				}).then((resp) => resp.json())

				// console.log('res from signin', res)

				const user = await res?.user
				const error = res?.error?.message ? res?.error?.message : res?.error

				// If no error and we have user data, return it
				if (res?.login_type === 'admin') {
					throw new Error(res?.msg)
				}
				if (user) {
					return { user: user }
				} else {
					// Return an object that will pass error information through to the client-side.
					throw new Error(error)
				}
				// Return null if user data could not be retrieved
				// return null
			}
		}),
		CredentialsProvider({
			id: 'twoFA',
			name: 'Two Factor Auth',
			credentials: {},
			async authorize(credentials, req) {
				const { code } = credentials

				const data = {
					code
				}

				const res = await fetch(`${baseApiUrl}/admin-code-check`, {
					method: 'POST',
					body: JSON.stringify(data),
					headers: { 'Content-Type': 'application/json' }
				}).then((resp) => resp.json())

				console.log('res from admin', res)

				const user = await res?.user
				const error = res?.error
				console.log('res:', res)

				// If no error and we have user data, return it

				if (user) {
					return { user: user }
				} else {
					// Return an object that will pass error information through to the client-side.
					throw new Error(error)
				}
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),

		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET
		}),

		LinkedInProvider({
			clientId: process.env.LINKEDIN_CLIENT_ID,
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
			client: { token_endpoint_auth_method: 'client_secret_post' },
			issuer: 'https://www.linkedin.com',
			profile: (profile) => ({
				id: profile.sub,
				name: profile.name,
				email: profile.email,
				image: profile.picture
			}),
			wellKnown: 'https://www.linkedin.com/oauth/.well-known/openid-configuration',
			authorization: {
				params: {
					scope: 'openid profile email'
				}
			}
		})

		// ...add more providers here
	],

	pages: {
		signIn: '/auth/signin'
	},
	secret: process.env.NEXTAUTH_SECRET,

	// callbacks: {
	// 	async jwt({ token, account }) {
	// 		// Persist the OAuth access_token to the token right after signin
	// 		if (account) {
	// 			token.accessToken = account.access_token
	// 		}
	// 		return token
	// 	},
	// 	async session({ session, token, user }) {
	// 		// Send properties to the client, like an access_token from a provider.
	// 		session = {
	// 			...session,
	// 			user: {
	// 				...session.user,
	// 				id: token?.sub
	// 			}
	// 		}
	// 		return session
	// 	}
	// }

	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user }
		},
		async session({ token }) {
			return token
		}
	}
}

export default NextAuth(authOptions)

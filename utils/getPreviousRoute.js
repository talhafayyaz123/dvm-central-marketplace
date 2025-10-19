import { useRouter } from 'next/router'
import { useRef } from 'react'

export const usePreviousRoute = () => {
	const router = useRouter()

	const prevRoute = useRef(null)

	router.events?.on('routeChangeStart', () => {
		prevRoute.current = router.asPath
	})

	return prevRoute.current
}

export default usePreviousRoute

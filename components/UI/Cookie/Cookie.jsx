import React, { useEffect, useState, lazy, Suspense } from 'react'
import styles from './Cookie.module.css'

const CookieContent = lazy(() => import('./CookieContent'))

const Cookie = ({ cookieAcceptance, setcookieAcceptance }) => {
    const [showCookie, setShowCookie] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true) // Mount immediately
        if (cookieAcceptance !== 1) {
            setShowCookie(true) // Show popup if cookies not accepted
        } else {
            setShowCookie(false) // Hide if already accepted
        }
    }, [cookieAcceptance])

    if (!mounted) return null

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className={`${styles.cookie_container} ${showCookie && styles.show_cookie} white-bg shadow radius transition`}>
                <div className={`${styles.cls_btn} white-bg full-radius secondary-border`} onClick={() => setShowCookie(false)}>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--secondary)'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                </div>
                <CookieContent 
                    setcookieAcceptance={setcookieAcceptance} 
                />
            </div>
        </Suspense>
    )
}

export default Cookie
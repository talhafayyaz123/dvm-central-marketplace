import React from 'react'
import styles from './Cookie.module.css'

const CookieContent = ({ setcookieAcceptance }) => {
    const cookiesHandler = () => {
        try {
            if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || []
                window.gtag = function() {
                    window.dataLayer.push(arguments)
                }
                
                window.gtag('consent', 'update', {
                    ad_storage: 'granted',
                    ad_user_data: 'granted',
                    ad_personalization: 'granted',
                    analytics_storage: 'granted'
                })
            }
            setcookieAcceptance(1) // Set acceptance and hide via parent state
        } catch (error) {
            console.error('Error updating consent:', error)
        }
    }

    return (
        <div className={`${styles.cookie_inner_container} radius`}>
            <div className={styles.cookie_wrapper}>
                <p className='gray-color'>
                    This site uses cookies to help personalize content, tailor your experience and to keep you logged in if you register. 
                    By continuing to use this site, you are consenting to our use of cookies.
                </p>
                <button className='secondary-btn white-color' onClick={cookiesHandler}>
                    Accept
                </button>
            </div>
        </div>
    )
}

export default CookieContent
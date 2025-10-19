import React, { useState, useEffect, useRef, useLayoutEffect, useContext } from 'react'
import { baseApiUrl } from '../../../../utils/config'
import Link from 'next/link'
import styles from './ShopByDeptsLists.module.css'
import ShopByDeptsAccordion from './ShopByDeptsAccordion/ShopByDeptsAccordion'
import { DarkLoader } from '../../../Loader/Loader'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'
import Cookies from 'js-cookie'
import { GlobalProvider } from '../../../../context/AppProvider'
import { deletechatfunc } from '../../../../utils/deletechatfunc'

const ShopByDeptsLists = ({ showShopByDepts, setShowByDepts, shopByContainer, setHideScroller, loginUser, setloginUser }) => {
	const [shopyByResults, setShopByResults] = useState(false)
	const { setChatModal, setMessages } = useContext(GlobalProvider)
	const { data: session } = useSession()
	const [loading, setLoading] = useState(true)
	const { push } = useRouter()
	const mainListLinks = useRef(null)

	const handleShopByDepts = async () => {
		setLoading(true)
		let res = await fetch(`${baseApiUrl}/web-shop-by-department`).then((response) => response.json())

		setShopByResults(res)
		setLoading(false)
	}

	useEffect(() => {
		setTimeout(() => {
			handleShopByDepts()
		}, 500)
	}, [])

	useLayoutEffect(() => {
		!loading &&
			showShopByDepts &&
			gsap.fromTo(
				mainListLinks?.current.querySelectorAll('.main-list-links'),
				{
					autoAlpha: 0
				},
				{
					delay: 0.3,
					autoAlpha: 1,
					stagger: 0.05
				}
			)
	}, [loading, showShopByDepts])

	return (
		<div className={styles.shop_by_depts_lists}>
			{loading ? (
				<DarkLoader />
			) : (
				<div ref={mainListLinks}>
					{shopyByResults !== false &&
						shopyByResults?.map((result, index) => {
							return result.subcategories.length == 0 ? (
								<Link href={`/${result.slug}`} key={result.id}>
									<a className={`${styles.shop_by_link_wrapper} main-list-links`} onClick={() => setShowByDepts(false)}>
										<h5 className={styles.shop_by_link}>{result.name}</h5>
									</a>
								</Link>
							) : (
								<ShopByDeptsAccordion gsap={gsap} className='main-list-links' showShopByDepts={showShopByDepts} setShowByDepts={setShowByDepts} key={result.id} index={index} result={result} shopByContainer={shopByContainer} setHideScroller={setHideScroller} />
							)
						})}

					{loginUser?.id !== undefined && (
						<a
							className={`${styles.shop_by_link_wrapper} gray-color main-list-links`}
							onClick={() => {
								deletechatfunc(session, setChatModal, setMessages), signOut({ redirect: false }), push('/'), Cookies.remove('impersonateUserId'), Cookies.remove('dvm_cen_tral_user_id'), setShowByDepts(false), setloginUser({})
							}}
						>
							<h5>Sign out</h5>
						</a>
					)}

					{/* <div className={styles.shop_by_heading}>
            <div>{`Help & Settings`}</div>
          </div>

          <Link href="#">
            <a className={styles.shop_by_other_links}>
              <h5>Your Account</h5>
            </a>
          </Link>

          <Link href="#">
            <a className={styles.shop_by_other_links}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>

              <h5>Dlivery Address</h5>
            </a>
          </Link>

          <Link href="#">
            <a className={styles.shop_by_other_links}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>

              <h5>Country</h5>
            </a>
          </Link>

          <Link href="#">
            <a className={styles.shop_by_other_links}>
              <h5>Customer Service</h5>
            </a>
          </Link>

          <Link href="#">
            <a className={styles.shop_by_other_links}>
              <h5>Sign In</h5>
            </a>
          </Link> */}
				</div>
			)}
		</div>
	)
}

export default ShopByDeptsLists

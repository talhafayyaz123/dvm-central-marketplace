import React, { useContext } from 'react'
import { signOut, useSession } from 'next-auth/react'
import styles from './ProfileMenu.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GlobalProvider } from '../../../context/AppProvider'
import Cookies from 'js-cookie'
import { deletechatfunc } from '../../../utils/deletechatfunc'

const ProfileMenu = ({ showProfileMenu, setuserData, setshowProfileMenu, loginUser, setloginUser, setactiveProvider, className = '' }) => {
	const router = useRouter()
	const { setimpersonateUsers, impersonateUsers, setChatModal, setMessages } = useContext(GlobalProvider)
	const { data: session } = useSession()

	return (
		<div className={`${styles.profile_wrapper} transition white-bg shadow ${showProfileMenu && styles.show_profile_menu} ${className}`}>
			{loginUser?.id !== undefined ? (
				<div className={styles.profile_link_wrapper}>
					{router?.asPath !== `/dashboard` ? (
						<Link href={`/dashboard`}>
							<a className={styles.profile_link} onClick={() => setshowProfileMenu(false)}>
								Dashboard
							</a>
						</Link>
					) : (
						<a className={styles.profile_link}>Dashboard</a>
					)}

					<div
						onClick={() => {
							deletechatfunc(session, setChatModal, setMessages)
							setshowProfileMenu(false)
							signOut({ redirect: false })
							setloginUser({})
							setactiveProvider(null)
							setimpersonateUsers({})
							Cookies.remove('impersonateUserId')
							Cookies.remove('dvm_cen_tral_user_id')
							setuserData({})
							router?.push('/')
						}}
					>
						<a className={styles.profile_link}>Sign out</a>
					</div>

					{Object.keys(impersonateUsers).length > 0 && (
						<div
							onClick={() => {
								setimpersonateUsers({})
								setloginUser(session?.user)
								setshowProfileMenu(false)
								Cookies.remove('impersonateUserId')
								router.push('/admin')
							}}
						>
							<a className={styles.profile_link}>Leave Impersonate</a>
						</div>
					)}
				</div>
			) : (
				<>
					{' '}
					<div className={styles.profile_link_wrapper}>
						{router?.asPath !== '/auth/signin' ? (
							<Link href='/auth/signin'>
								<a className={styles.profile_link} onClick={() => setshowProfileMenu(false)}>
									As customer
								</a>
							</Link>
						) : (
							<a className={styles.profile_link}>As customer</a>
						)}

						<a href='https://seller.dvmcentral.com/sign-up' target='_blank' rel='noreferrer' className={styles.profile_link}>
							As vendor
						</a>
					</div>
				</>
			)}
		</div>
	)
}

export default ProfileMenu

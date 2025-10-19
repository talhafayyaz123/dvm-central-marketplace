import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './HeaderIcons.module.css'
import { useSession } from 'next-auth/react'
import ProfileMenu from '../../../UI/ProfileMenu/ProfileMenu'
import { GlobalProvider } from '../../../../context/AppProvider'

const HeaderIcons = () => {
	const { data: status } = useSession()
	const { userData, userCoins, loginUser, setuserData, setloginUser, setactiveProvider, gettingSocialLoginData, impersonateUsers } = useContext(GlobalProvider)

	const [showProfileMenu, setshowProfileMenu] = useState(false)

	const coinsforAnim = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
	const email = impersonateUsers?.email
	const emailName = email?.split('@')[0]?.length > 10 ? email?.split('@')[0]?.slice(0, 10) + '...' : email?.split('@')[0]

	const profileMenuHandler = () => {
		setshowProfileMenu(!showProfileMenu)
	}

	// close dropdown if clicked elsewhere
	if (typeof window !== 'undefined') {
		let profileMenuWrapper = document.querySelector('.profile-menu-wrapper')
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showProfileMenu === true) {
				if (!profileMenuWrapper.contains(e.target)) {
					setshowProfileMenu(false)
				}
			} else {
				return
			}
		})
	}

	return (
		<div className={styles.header_icons_container}>
			<div className={styles.header_icons_wrapper}>
				{/* coins */}
				{loginUser?.id !== undefined && status !== 'loading' && userData?.position !== undefined && userData?.position !== 'Sales Rep' && loginUser?.type && loginUser?.type !== 'admin' && (
					<Link href={`/dashboard/coins`}>
						<a className={`${styles.coin_icon_wrapper} ${styles.icon_wrapper}`}>
							<svg className={`transition ${styles.main_coin}`} width={37} height={38} viewBox='0 0 37 38' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path d='M18.1836 38C28.2261 38 36.3672 29.4934 36.3672 19C36.3672 8.50659 28.2261 0 18.1836 0C8.14107 0 0 8.50659 0 19C0 29.4934 8.14107 38 18.1836 38Z' fill='#E88102' />
								<path d='M18.1836 35.9961C28.1236 35.9961 36.1816 27.9381 36.1816 17.998C36.1816 8.058 28.1236 0 18.1836 0C8.24355 0 0.185547 8.058 0.185547 17.998C0.185547 27.9381 8.24355 35.9961 18.1836 35.9961Z' fill='#FDD835' />
								<path opacity='0.5' d='M25.3678 1.4917L1.67715 25.1749C0.883008 23.3565 0.385742 21.3823 0.237305 19.3116L19.4971 0.0444336C21.5678 0.200293 23.542 0.697559 25.3678 1.4917Z' fill='white' />
								<path opacity='0.5' d='M33.866 9.16602L9.35156 33.6805C7.82266 32.8195 6.44219 31.7434 5.23242 30.4891L30.682 5.04688C31.9289 6.24922 33.0051 7.63711 33.866 9.16602Z' fill='white' />
								<path opacity='0.5' d='M29.9469 4.37144L4.56406 29.7542C4.1707 29.2941 3.79219 28.8117 3.44336 28.3144L28.507 3.25073C29.0043 3.59956 29.4867 3.97808 29.9469 4.37144Z' fill='white' />
								<path opacity='0.5' d='M35.6172 13.5079L13.693 35.4321C13.0324 35.2614 12.3867 35.0536 11.7559 34.8161L35.0012 11.5708C35.2387 12.2017 35.4465 12.8474 35.6172 13.5079Z' fill='white' />
								<path
									opacity='0.5'
									d='M36.1816 17.998C36.1816 18.1242 36.1816 18.243 36.1742 18.3691C35.9813 8.60195 28.0027 0.742188 18.1836 0.742188C8.36445 0.742188 0.385938 8.60195 0.192969 18.3691C0.192969 18.243 0.185547 18.1242 0.185547 17.998C0.185547 8.06016 8.2457 0 18.1836 0C28.1215 0 36.1816 8.06016 36.1816 17.998Z'
									fill='white'
								/>
								<path
									opacity='0.5'
									d='M32.8047 18.7773C32.8047 26.5629 26.4887 32.8789 18.7031 32.8789C14.3316 32.8789 10.4203 30.8824 7.83008 27.7578C10.4055 30.541 14.0867 32.2852 18.1836 32.2852C25.9691 32.2852 32.2852 25.9691 32.2852 18.1836C32.2852 14.7695 31.0754 11.6449 29.0566 9.20312C31.3797 11.7191 32.8047 15.0813 32.8047 18.7773Z'
									fill='white'
								/>
								<path d='M18.1836 32.2852C25.9717 32.2852 32.2852 25.9717 32.2852 18.1836C32.2852 10.3955 25.9717 4.08203 18.1836 4.08203C10.3955 4.08203 4.08203 10.3955 4.08203 18.1836C4.08203 25.9717 10.3955 32.2852 18.1836 32.2852Z' fill='#F39E09' />
								<path
									d='M28.8711 8.98047C26.3996 6.85039 23.1859 5.56641 19.668 5.56641C11.8824 5.56641 5.56641 11.8824 5.56641 19.668C5.56641 23.1859 6.85039 26.3996 8.98047 28.8711C5.98203 26.2809 4.08203 22.4586 4.08203 18.1836C4.08203 10.398 10.398 4.08203 18.1836 4.08203C22.4512 4.08203 26.2809 5.98203 28.8711 8.98047Z'
									fill='#E88102'
								/>
								<path
									d='M20.0242 14.5766C20.4176 14.9328 20.618 15.4301 20.618 16.0758H24.4254V14.9625C24.4254 14.9625 23.9652 13.9309 23.6758 13.5078C23.1785 12.7582 22.4734 12.1793 21.5754 11.7711C21.0781 11.5484 20.5512 11.3852 19.9797 11.2887V9.27734H18.6438V11.1699C18.5992 11.1699 18.2355 11.1699 18.102 11.1773V9.27734H16.766V11.3184C16.2687 11.4074 15.8012 11.5484 15.3633 11.7191C14.4281 12.0902 13.7082 12.6172 13.1961 13.2852C12.877 13.7008 12.4316 14.4949 12.4316 14.4949V15.6082C12.4316 17.3672 13.4559 18.7551 15.5117 19.7645C15.8754 19.9426 16.2984 20.1281 16.7734 20.3137V24.1953C16.6473 24.1285 16.5359 24.0469 16.4395 23.9578C16.0016 23.557 15.7789 22.9336 15.7789 22.0801L11.9492 20.9668V22.0801C11.9492 23.1266 12.209 24.0469 12.7359 24.8484C13.2629 25.65 14.0422 26.2809 15.0812 26.741C15.6082 26.9785 16.1723 27.1492 16.766 27.2605V29.3164H18.102V27.4164C18.2578 27.4238 18.4137 27.4238 18.5695 27.4238H18.6438V29.3164H19.9797V27.3422C21.1449 27.1863 22.1023 26.8227 22.8594 26.2512C23.9059 25.4645 24.4254 24.3734 24.4254 22.9855V21.8723C24.4254 21.8723 23.2453 19.7125 21.8574 18.9109C21.3379 18.6141 20.707 18.3246 19.9723 18.0574V14.5469C19.9945 14.5543 20.0094 14.5617 20.0242 14.5766ZM16.7586 16.6621C16.3949 16.3578 16.2094 16.0164 16.2094 15.6453C16.2094 15.2 16.3875 14.8289 16.7586 14.5395V16.6621ZM18.6438 24.559C18.6141 24.559 18.5918 24.559 18.5695 24.559C18.4063 24.559 18.2504 24.5516 18.102 24.5441V20.7887C18.2949 20.8555 18.473 20.9223 18.6438 20.9891V24.559ZM18.6438 17.5973C18.4508 17.5305 18.2727 17.4637 18.102 17.3895V14.057C18.2059 14.0496 18.3172 14.0422 18.4285 14.0422C18.5027 14.0422 18.577 14.0422 18.6438 14.0496V17.5973ZM20.0168 21.7016C20.4102 22.0133 20.6105 22.4512 20.6105 23.0078C20.6105 23.4977 20.425 23.8836 20.0613 24.1582C20.0316 24.1805 20.0094 24.1953 19.9797 24.2102V21.6719C19.9871 21.6793 20.002 21.6867 20.0168 21.7016Z'
									fill='#DB6704'
								/>
								<path
									d='M21.8574 17.7902C21.3379 17.4934 20.707 17.2039 19.9723 16.9367V13.4262C19.9871 13.441 20.0094 13.4559 20.0242 13.4633C20.4176 13.8195 20.618 14.3168 20.618 14.9625H24.4254C24.4254 13.9977 24.173 13.1441 23.6758 12.3945C23.1785 11.6449 22.4734 11.066 21.5754 10.6578C21.0781 10.4352 20.5512 10.2719 19.9797 10.1754V8.16406H18.6438V10.0566C18.5992 10.0566 18.5547 10.0566 18.5102 10.0566C18.3691 10.0566 18.2355 10.0566 18.102 10.0641V8.16406H16.766V10.2051C16.2687 10.2941 15.8012 10.4352 15.3633 10.6059C14.4281 10.977 13.7082 11.5039 13.1961 12.1719C12.684 12.8398 12.4316 13.6191 12.4316 14.4949C12.4316 16.2539 13.4559 17.6418 15.5117 18.6512C15.8754 18.8293 16.2984 19.0148 16.7734 19.2004V23.082C16.6473 23.0152 16.5359 22.9336 16.4395 22.8445C16.0016 22.4437 15.7789 21.8203 15.7789 20.9668H11.9492C11.9492 22.0133 12.209 22.9336 12.7359 23.7352C13.2629 24.5367 14.0422 25.1676 15.0812 25.6277C15.6082 25.8652 16.1723 26.0359 16.766 26.1473V28.2031H18.102V26.3031C18.2578 26.3105 18.4137 26.3105 18.5695 26.3105H18.6438V28.2031H19.9797V26.2289C21.1449 26.073 22.1023 25.7094 22.8594 25.1379C23.9059 24.3512 24.4254 23.2602 24.4254 21.8723C24.4254 20.1355 23.5719 18.7773 21.8574 17.7902ZM18.4211 12.9289C18.4953 12.9289 18.5695 12.9289 18.6363 12.9363V16.4766C18.4434 16.4098 18.2578 16.343 18.0945 16.2688V12.9363C18.1984 12.9363 18.3098 12.9363 18.4211 12.9289ZM16.2168 14.532C16.2168 14.0867 16.3949 13.7156 16.766 13.4262V15.5563C16.3949 15.2445 16.2168 14.9031 16.2168 14.532ZM18.5621 23.4457C18.3988 23.4457 18.243 23.4383 18.0945 23.4309V19.6754C18.2875 19.7422 18.4656 19.809 18.6363 19.8758V23.4457C18.6141 23.4457 18.5918 23.4457 18.5621 23.4457ZM20.0613 23.0375C20.0316 23.0598 20.0094 23.0746 19.9797 23.0895V20.5586C19.9945 20.566 20.0094 20.5809 20.0168 20.5883C20.4102 20.9 20.6105 21.3379 20.6105 21.8945C20.6105 22.3844 20.425 22.7629 20.0613 23.0375Z'
									fill='#FDD835'
								/>
								<path opacity='0.5' d='M15.3555 10.6134C15.7562 10.4575 16.1719 10.3313 16.6172 10.2349L12.4238 14.4282C12.4387 13.5821 12.691 12.8251 13.1883 12.172C13.7004 11.504 14.4203 10.9845 15.3555 10.6134Z' fill='white' />
								<path opacity='0.5' d='M16.7588 8.16406H18.0947V8.75781L16.7588 10.0938V8.16406Z' fill='white' />
								<path opacity='0.5' d='M18.6881 8.16406L18.6436 8.21602V8.16406H18.6881Z' fill='white' />
								<path
									opacity='0.5'
									d='M23.6611 19.3711C23.2381 18.77 22.6369 18.243 21.8576 17.7903C21.3381 17.486 20.7072 17.204 19.9725 16.9368V15.7493L16.5881 19.1336C16.64 19.1559 16.6994 19.1782 16.7588 19.2004V23.0821C16.6326 23.0153 16.5213 22.9336 16.4248 22.8446C15.9869 22.4438 15.7643 21.8204 15.7643 20.9668H14.7549L12.4541 23.2676C12.5357 23.4309 12.6248 23.5868 12.7213 23.7352C13.2482 24.5368 14.0275 25.1676 15.0666 25.6278C15.5936 25.8579 16.1576 26.036 16.7514 26.1473V26.2661L19.965 23.0524V20.5586C19.9799 20.5661 19.9947 20.5809 20.0021 20.5883C20.3955 20.9 20.5959 21.3379 20.5959 21.8946C20.5959 22.1543 20.5439 22.3844 20.44 22.5774L23.6611 19.3711ZM18.6439 23.4458C18.6143 23.4458 18.592 23.4458 18.5697 23.4458C18.4064 23.4458 18.2506 23.4383 18.1021 23.4309V19.6754C18.2951 19.7422 18.4732 19.809 18.6439 19.8758V23.4458Z'
									fill='white'
								/>
								<path opacity='0.5' d='M24.4252 14.9625H20.7588L23.5271 12.1941C23.5791 12.2609 23.6236 12.3277 23.6682 12.3945C24.1729 13.1441 24.4252 13.9976 24.4252 14.9625Z' fill='white' />
								<path opacity='0.5' d='M11.9414 20.9668H13.3516L12.0824 22.2285C11.9934 21.8352 11.9414 21.4121 11.9414 20.9668Z' fill='white' />
								<path opacity='0.5' d='M18.0945 13.6636V16.2241L15.6082 18.7104C15.5711 18.6956 15.534 18.6733 15.4969 18.6511C14.9328 18.369 14.443 18.0647 14.0273 17.7308L16.484 15.2741C16.5582 15.3706 16.6473 15.4597 16.7586 15.5487V14.9995L18.0945 13.6636Z' fill='white' />
								<path
									opacity='0.5'
									d='M22.8523 11.4669L20.3883 13.931C20.2992 13.7528 20.173 13.6044 20.0246 13.4708C20.0098 13.456 19.9875 13.4411 19.9727 13.4337V14.354L18.6367 15.6899V13.1294L21.2344 10.5317C21.3457 10.5763 21.457 10.6208 21.5684 10.6728C22.0582 10.8806 22.4812 11.1478 22.8523 11.4669Z'
									fill='white'
								/>
								<path opacity='0.5' d='M18.6436 27.9211L19.9795 26.5852V28.2032H18.6436V27.9211Z' fill='white' />
								<path opacity='0.5' d='M24.418 22.147C24.3512 23.4013 23.8316 24.3958 22.8594 25.1306C22.1988 25.6278 21.3824 25.9692 20.4102 26.1548L24.418 22.147Z' fill='white' />
								<path
									opacity='0.25'
									d='M29.9473 10.398C20.8184 13.6043 13.4855 20.6477 9.89336 29.591C9.58164 29.3609 9.27734 29.1234 8.98047 28.8637C6.85039 26.3922 5.56641 23.1785 5.56641 19.668C5.56641 11.8824 11.8824 5.56641 19.668 5.56641C23.1859 5.56641 26.3996 6.85039 28.8637 8.98047C29.257 9.4332 29.6133 9.9082 29.9473 10.398Z'
									fill='white'
								/>
							</svg>

							{userCoins !== null && userCoins !== undefined && (
								<>
									<div className='coins-text semibold-text primary-color'>{userCoins !== null ? (userCoins.toString().length > 5 ? Number(userCoins?.toString()?.slice(0, 5)) + '...' : userCoins) : 0}</div>
									<div className={`coins-badge ${styles.badge} semibold-text lite-dark-primary-bg white-color`}>{userCoins !== null ? (userCoins.toString().length > 5 ? Number(userCoins?.toString()?.slice(0, 5)) + '...' : userCoins) : 0}</div>
								</>
							)}
							<div className={`coins-anim ${styles.coins_anim}`}>
								{coinsforAnim?.map((coin, i) => (
									<svg key={i} xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' width={20} height={20} viewBox='0 0 256 256' xmlSpace='preserve'>
										<defs />
										<g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)'>
											<circle cx='45.001' cy='47.211' r='42.791' style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }} transform='  matrix(1 0 0 1 0 0) ' />
											<circle cx={45} cy='42.79' r={35} style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(243,158,9)', fillRule: 'nonzero', opacity: 1 }} transform='  matrix(1 0 0 1 0 0) ' />
											<path
												d='M 45 13.791 c 17.977 0 32.78 13.555 34.766 31 c 0.15 -1.313 0.234 -2.647 0.234 -4 c 0 -19.33 -15.67 -35 -35 -35 s -35 15.67 -35 35 c 0 1.353 0.085 2.687 0.234 4 C 12.22 27.346 27.023 13.791 45 13.791 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 83.422 23.947 l -7.339 7.339 c 1.241 3.352 1.947 6.961 2.035 10.723 l 8.623 -8.623 C 85.999 30.079 84.88 26.916 83.422 23.947 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 44.218 75.909 c -3.762 -0.087 -7.371 -0.794 -10.723 -2.035 l -7.339 7.339 c 2.969 1.459 6.132 2.578 9.439 3.32 L 44.218 75.909 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 15.236 57.365 l -7.118 7.118 c 3.188 5.408 7.526 10.054 12.685 13.598 l 6.975 -6.975 C 22.396 67.826 18.027 63.053 15.236 57.365 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 66.692 5.909 l -7.118 7.118 c 5.688 2.791 10.461 7.16 13.741 12.541 l 6.975 -6.975 C 76.745 13.435 72.1 9.097 66.692 5.909 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 49.861 10.012 c 1.441 0.212 2.849 0.522 4.223 0.913 l 7.565 -7.565 c -1.224 -0.517 -2.478 -0.976 -3.756 -1.379 L 49.861 10.012 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 5.569 59.44 l 7.565 -7.565 c -0.391 -1.374 -0.701 -2.782 -0.913 -4.223 L 4.19 55.683 C 4.593 56.962 5.052 58.216 5.569 59.44 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(254,236,154)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 44.737 67.688 c -4.711 0 -9.153 -2.883 -10.902 -7.546 c -0.582 -1.552 0.204 -3.281 1.756 -3.862 c 1.549 -0.586 3.28 0.203 3.862 1.755 c 1.089 2.906 4.34 4.389 7.248 3.294 c 2.905 -1.09 4.384 -4.341 3.294 -7.248 c -0.624 -1.664 -1.967 -2.908 -3.685 -3.412 l -0.188 -0.062 l -4.224 -1.547 c -3.497 -1.06 -6.231 -3.618 -7.512 -7.033 c -1.091 -2.909 -0.983 -6.068 0.302 -8.896 c 1.285 -2.828 3.595 -4.986 6.504 -6.077 c 6.002 -2.25 12.72 0.801 14.972 6.806 c 0.582 1.551 -0.204 3.281 -1.755 3.863 c -1.547 0.579 -3.281 -0.203 -3.862 -1.755 c -1.09 -2.907 -4.341 -4.385 -7.249 -3.295 c -1.408 0.528 -2.526 1.573 -3.148 2.941 c -0.622 1.369 -0.674 2.898 -0.146 4.307 c 0.624 1.665 1.967 2.908 3.685 3.413 l 0.187 0.062 l 4.225 1.547 c 3.496 1.06 6.23 3.618 7.512 7.033 c 2.251 6.005 -0.803 12.722 -6.806 14.973 C 47.467 67.449 46.091 67.688 44.737 67.688 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 45 32.323 c -1.657 0 -3 -1.343 -3 -3 V 24.5 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 4.823 C 48 30.979 46.657 32.323 45 32.323 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 45 72.5 c -1.657 0 -3 -1.343 -3 -3 v -4.823 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 V 69.5 C 48 71.157 46.657 72.5 45 72.5 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(232,129,2)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 44.737 63.688 c -4.711 0 -9.153 -2.883 -10.902 -7.546 c -0.582 -1.552 0.204 -3.281 1.756 -3.862 c 1.549 -0.586 3.28 0.203 3.862 1.755 c 1.089 2.906 4.34 4.389 7.248 3.294 c 2.905 -1.09 4.384 -4.341 3.294 -7.248 c -0.624 -1.664 -1.967 -2.908 -3.685 -3.412 l -0.188 -0.062 l -4.224 -1.547 c -3.497 -1.06 -6.231 -3.618 -7.512 -7.033 c -1.091 -2.909 -0.983 -6.068 0.302 -8.896 c 1.285 -2.828 3.595 -4.986 6.504 -6.077 c 6.002 -2.25 12.72 0.801 14.972 6.806 c 0.582 1.551 -0.204 3.281 -1.755 3.863 c -1.547 0.579 -3.281 -0.203 -3.862 -1.755 c -1.09 -2.907 -4.341 -4.385 -7.249 -3.295 c -1.408 0.528 -2.526 1.573 -3.148 2.941 c -0.622 1.369 -0.674 2.898 -0.146 4.307 c 0.624 1.665 1.967 2.908 3.685 3.413 l 0.187 0.062 l 4.225 1.547 c 3.496 1.06 6.23 3.618 7.512 7.033 c 2.251 6.005 -0.803 12.722 -6.806 14.973 C 47.467 63.449 46.091 63.688 44.737 63.688 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 45 28.323 c -1.657 0 -3 -1.343 -3 -3 V 20.5 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 4.823 C 48 26.979 46.657 28.323 45 28.323 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
											<path
												d='M 45 68.5 c -1.657 0 -3 -1.343 -3 -3 v -4.823 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 V 65.5 C 48 67.157 46.657 68.5 45 68.5 z'
												style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(253,216,53)', fillRule: 'nonzero', opacity: 1 }}
												transform=' matrix(1 0 0 1 0 0) '
												strokeLinecap='round'
											/>
										</g>
									</svg>
								))}
							</div>
						</a>
					</Link>
				)}

				{/* login-icon */}
				{status === 'loading' || gettingSocialLoginData ? (
					<button className='sml-btn black-color'>Authenticating</button>
				) : (
					<div className={`${styles.profile_container} profile-menu-wrapper`}>
						<a className={`${styles.login_icon_wrapper} ${loginUser?.type !== 'admin' ? styles.desktop_user_btn : styles.admin_btn} profile_open_btn black-color`} onClick={() => profileMenuHandler()}>
							<button className='sml-btn lite-dark-primary-bg white-color rotate-svg shadow'>
								{loginUser?.id || impersonateUsers?.id !== undefined ? (loginUser?.type === 'admin' ? 'Admin' : impersonateUsers?.first_name ? impersonateUsers?.first_name : impersonateUsers?.email ? emailName : userData?.first_name) : 'Sign in'}
								{/* {(loginUser?.id || impersonateUsers?.id !== undefined) ? {impersonateUsers?.first_name ? {impersonateUsers.first_name} : {userData?.first_name}} : Sign in} */}
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='currentColor'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
								</svg>
								{/* {userData?.first_name?.slice(0, 1)} */}
							</button>
						</a>

						{loginUser?.type !== 'admin' && (
							<a className={`${styles.login_icon_wrapper} ${styles.mob_user_btn} profile_open_btn black-color rotate-svg`} onClick={() => profileMenuHandler()}>
								<button className={`sml-btn lite-dark-primary-bg white-color shadow ${loginUser?.id !== undefined ? styles.mob_session : undefined}`}>
									{/* {(loginUser?.id || impersonateUsers?.id !== undefined) ? {impersonateUsers?.first_name ? {impersonateUsers.first_name} : {userData?.first_name}} : Sign in} */}
									{loginUser?.id || impersonateUsers?.id !== undefined ? (loginUser?.type === 'admin' ? 'Admin' : impersonateUsers?.first_name ? impersonateUsers?.first_name?.slice(0, 1) : impersonateUsers?.email ? emailName?.slice(0, 1) : userData?.first_name?.slice(0, 1)) : 'Sign in'}
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
									</svg>
								</button>
							</a>
						)}
						<ProfileMenu className={`${styles.profile_menu}`} setuserData={setuserData} setshowProfileMenu={setshowProfileMenu} showProfileMenu={showProfileMenu} loginUser={loginUser} setloginUser={setloginUser} setactiveProvider={setactiveProvider} />
					</div>
				)}
			</div>
		</div>
	)
}

export default HeaderIcons

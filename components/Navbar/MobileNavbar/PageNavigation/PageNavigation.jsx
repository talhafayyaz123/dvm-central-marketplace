import React from 'react'
import Link from 'next/link'
import styles from './PageNavigation.module.css'
import { useRouter } from 'next/router'

const PageNavigation = ({ showMobPagesNav, setShowMobPagesNav, loginUser }) => {
	const router = useRouter()

	if (typeof window !== 'undefined') {
		const backdrop = document.querySelector('.page-navigation-wrapper')
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showMobPagesNav === true) {
				if (!backdrop.contains(e.target)) {
					setShowMobPagesNav(false)
				}
			} else return
		})
	}

	return (
		<div className={`${styles.page_navigation_container} page-navigation-container modal-bg transition ${showMobPagesNav ? 'show-bd' : 'hide-bd'}`}>
			<div className={`${styles.page_navigation_wrapper} page-navigation-wrapper white-bg sidebar transition ${showMobPagesNav && 'show-sidebar'}`}>
				<h4 className='white-color black-bg'>
					<span>Menu</span>

					<svg onClick={() => setShowMobPagesNav(false)} xmlns='http://www.w3.org/2000/svg' className='page-navigation-close-btn' fill='none' width={25} viewBox='0 0 24 24' stroke='var(--white)'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
					</svg>
				</h4>
				<ul>
					<li className={router?.pathname === '/' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/' ? (
							<Link href='/'>
								<a onClick={() => setShowMobPagesNav(false)}>Home</a>
							</Link>
						) : (
							<a> Home </a>
						)}
					</li>

					{/* <li className={` ${router?.pathname === '/dvm-central-expo-march-edition-2-ce-credits' ? styles.active_mob_nav : undefined}`}>
						{router?.pathname !== '/dvm-central-expo-march-edition-2-ce-credits' ? (
							<Link href='/dvm-central-expo-march-edition-2-ce-credits'>
								<a onClick={() => setShowMobPagesNav(false)}>Virtual Expo</a>
							</Link>
						) : (
							<a onClick={() => setShowMobPagesNav(false)}>Virtual Expo</a>
						)}
					</li> */}

					<li className={router?.pathname === '/sell-on-dvm' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/sell-on-dvm' ? (
							<Link href='/sell-on-dvm'>
								<a onClick={() => setShowMobPagesNav(false)}>Sell on DVM</a>
							</Link>
						) : (
							<a> Sell on DVM </a>
						)}
					</li>

					<li className={router?.pathname === '/vendors' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/vendors' ? (
							<Link href='/vendors'>
								<a onClick={() => setShowMobPagesNav(false)}>Vendors</a>
							</Link>
						) : (
							<a> Vendors </a>
						)}
					</li>

					<li className={router?.pathname === '/service-providers' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/service-providers' ? (
							<Link href='/service-providers'>
								<a onClick={() => setShowMobPagesNav(false)}> Service Providers </a>
							</Link>
						) : (
							<a> Service Providers </a>
						)}
					</li>

					<li className={router?.pathname === '/today-deals' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/today-deals' ? (
							<Link href='/today-deals'>
								<a onClick={() => setShowMobPagesNav(false)}> {`Today's Deals`} </a>
							</Link>
						) : (
							<a> {`Today's Deals`} </a>
						)}
					</li>

					<li className={router?.pathname === '/featured-products' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/featured-products' ? (
							<Link href='/featured-products'>
								<a onClick={() => setShowMobPagesNav(false)}> Featured Products </a>
							</Link>
						) : (
							<a> Featured Products </a>
						)}
					</li>
					<li className={router?.pathname === '/hot-products' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/hot-products' ? (
							<Link href='/hot-products'>
								<a onClick={() => setShowMobPagesNav(false)}> Hot Products </a>
							</Link>
						) : (
							<a> Hot Products </a>
						)}
					</li>

					<li className={router?.pathname === '/virtual-expo' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/virtual-expo' ? (
							<Link href='/virtual-expo'>
								<a onClick={() => setShowMobPagesNav(false)}> Virtual Expo </a>
							</Link>
						) : (
							<a> Virtual Expo </a>
						)}
					</li>

					<li className={router?.pathname === '/blogs' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/blogs' ? (
							<Link href='/blogs'>
								<a onClick={() => setShowMobPagesNav(false)}>Blogs</a>
							</Link>
						) : (
							<a> Blogs </a>
						)}
					</li>

					{loginUser?.id !== undefined ? (
						<li className={`${router?.pathname.includes('/pet-badges') ? styles.active_mob_nav : undefined}`}>
							{!router?.pathname.includes('/pet-badges') ? (
								<Link href={`/dashboard/pet-badges`}>
									<a onClick={() => setShowMobPagesNav(false)}>Get Pet Badges</a>
								</Link>
							) : (
								<a>Get Pet Badges</a>
							)}
						</li>
					) : (
						<li>
							<Link href='/auth/signin?r=pet-badges'>
								<a onClick={() => setShowMobPagesNav(false)}>Get Pet Badges</a>
							</Link>
						</li>
					)}

					<li className={router?.pathname === '/vet-reps-finder' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/vet-reps-finder' ? (
							<Link href='/vet-reps-finder'>
								<a onClick={() => setShowMobPagesNav(false)}>Vet Reps Finder</a>
							</Link>
						) : (
							<a> Vet Reps Finder </a>
						)}
					</li>

					{loginUser?.id !== undefined && (
						<li className={router?.asPath === `/dashboard` ? styles.active_mob_nav : undefined}>
							{router?.asPath !== `/dashboard` ? (
								<Link href={`/dashboard`}>
									<a onClick={() => setShowMobPagesNav(false)}>My Account</a>
								</Link>
							) : (
								<a> My Accounts </a>
							)}
						</li>
					)}

					<li className={router?.pathname === '/about-us' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/about-us' ? (
							<Link href='/about-us'>
								<a onClick={() => setShowMobPagesNav(false)}>About Us</a>
							</Link>
						) : (
							<a> About Us </a>
						)}
					</li>
					<li className={router?.pathname === '/faqs' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/faqs' ? (
							<Link href='/faqs'>
								<a onClick={() => setShowMobPagesNav(false)}>{`FAQ's`}</a>
							</Link>
						) : (
							<a>{`FAQ's`}</a>
						)}
					</li>
					<li className={router?.pathname === '/our-mission' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/our-mission' ? (
							<Link href='/our-mission'>
								<a onClick={() => setShowMobPagesNav(false)}>Our Mission</a>
							</Link>
						) : (
							<a>Our Mission</a>
						)}
					</li>
					<li className={router?.pathname === '/contact' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/contact' ? (
							<Link href='/contact'>
								<a onClick={() => setShowMobPagesNav(false)}>Contact</a>
							</Link>
						) : (
							<a>Contact</a>
						)}
					</li>
					<li className={router?.pathname === '/privacy-policy' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/privacy-policy' ? (
							<Link href='/privacy-policy'>
								<a onClick={() => setShowMobPagesNav(false)}>Privacy Policy</a>
							</Link>
						) : (
							<a>Privacy Policy</a>
						)}
					</li>
					<li className={router?.pathname === '/terms-and-conditions' ? styles.active_mob_nav : undefined}>
						{router?.pathname !== '/terms-and-conditions' ? (
							<Link href='/terms-and-conditions'>
								<a onClick={() => setShowMobPagesNav(false)}>Terms and Conditions</a>
							</Link>
						) : (
							<a> Terms and Conditions </a>
						)}
					</li>
				</ul>
				{/* <ul className='grid grid-cols-1 bg-white'>
					
					<li>
						<Link href='/about-us'>
							<a onClick={() => setShowMobPagesNav(false)}>About Us</a>
						</Link>
					</li>
					<li>
						<Link href='our-mission'>
							<a onClick={() => setShowMobPagesNav(false)}>Our Mission</a>
						</Link>
					</li>
					<li>
						<Link href='/contact'>
							<a onClick={() => setShowMobPagesNav(false)}>Contact</a>
						</Link>
					</li>
				</ul>
				<ul className='grid grid-cols-1 bg-white'>
					<li>
						<h4 className='font-semibold text-xl'>Media</h4>
					</li>
				</ul> */}
			</div>
		</div>
	)
}

export default PageNavigation

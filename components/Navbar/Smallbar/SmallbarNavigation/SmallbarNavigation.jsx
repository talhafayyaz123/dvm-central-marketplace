import React from 'react'
import Link from 'next/link'
import styles from './SmallbarNavigation.module.css'
import { useRouter } from 'next/router'

const SmallbarNavigation = ({ loginUser }) => {
	const router = useRouter()

	return (
		<ul className={`${styles.small_header_right_wrapper}`}>
			<li className={`${styles.underline_links} ${styles.shop_now_btn}`}>
				{router?.pathname !== '/shop-now' ? (
					<Link href='/shop-now'>
						<a>
							<button className='sml-btn primary-btn'>Shop Now</button>
						</a>
					</Link>
				) : (
					<a>
						<button className='sml-btn primary-btn'>Shop Now</button>
					</a>
				)}
			</li>
			<li className={`${styles.underline_links} ${router?.pathname === '/sell-on-dvm' ? styles.active_nav : undefined}`}>
				{router?.pathname !== '/sell-on-dvm' ? (
					<Link href='/sell-on-dvm'>
						<a> Sell on DVM </a>
					</Link>
				) : (
					<a> Sell on DVM </a>
				)}
			</li>
			<li className={`${styles.underline_links} ${styles.mega_menu_link}`}>
				<a>
					Buy Now{' '}
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='3' stroke='var(--gray)' width={12} height={12}>
						<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
					</svg>
				</a>

				<ul className={`${styles.mega_menu} ${styles.mega_buyNow_menu} transition`}>
					<li className={`${styles.underline_links} ${router?.pathname === '/vendors' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/vendors' ? (
							<Link href='/vendors'>
								<a> {`Vendors`} </a>
							</Link>
						) : (
							<a> {`Vendors`} </a>
						)}
					</li>
					<li className={`${styles.underline_links} ${router?.pathname === '/service-providers' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/service-providers' ? (
							<Link href='/service-providers'>
								<a> Service Providers </a>
							</Link>
						) : (
							<a> Service Providers </a>
						)}
					</li>
				</ul>
			</li>
			<li className={`${styles.underline_links} ${styles.mega_menu_link}`}>
				<a className={`link-blink`}>
					Special Offers{' '}
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='3' stroke='var(--gray)' width={12} height={12}>
						<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
					</svg>
				</a>

				<ul className={`${styles.mega_menu} transition`}>
					<li className={`${styles.underline_links} ${router?.pathname === '/today-deals' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/today-deals' ? (
							<Link href='/today-deals'>
								<a> {`Today's Deals`} </a>
							</Link>
						) : (
							<a> {`Today's Deals`} </a>
						)}
					</li>
					<li className={`${styles.underline_links} ${router?.pathname === '/featured-products' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/featured-products' ? (
							<Link href='/featured-products'>
								<a> Featured Products </a>
							</Link>
						) : (
							<a> Featured Products </a>
						)}
					</li>
					<li className={`${styles.underline_links} ${router?.pathname === '/hot-products' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/hot-products' ? (
							<Link href='/hot-products'>
								<a> Hot Products </a>
							</Link>
						) : (
							<a> Hot Products </a>
						)}
					</li>
				</ul>
			</li>
			<li className={`${styles.underline_links} ${router?.pathname === '/virtual-expo' ? styles.active_nav : undefined}`}>
				{router?.pathname !== '/virtual-expo' ? (
					<Link href='/virtual-expo'>
						<a>Virtual Expo </a>
					</Link>
				) : (
					<a>Virtual Expo </a>
				)}
			</li>

			<li className={`${styles.underline_links} ${router?.pathname === '/blogs' ? styles.active_nav : undefined}`}>
				{router?.pathname !== '/blogs' ? (
					<Link href='/blogs'>
						<a> Blogs </a>
					</Link>
				) : (
					<a> Blogs </a>
				)}
			</li>

			{loginUser?.id !== undefined ? (
				<li className={`${styles.underline_links} ${router?.pathname.includes('/pet-badges') ? styles.active_nav : undefined}`}>
					{!router?.pathname.includes('/pet-badges') ? (
						<Link href={`/dashboard/pet-badges`}>
							<a>Get Pet Badges </a>
						</Link>
					) : (
						<a>Get Pet Badges </a>
					)}
				</li>
			) : (
				<li className={styles.underline_links}>
					<Link href='/auth/signin?r=pet-badges'>
						<a>Get Pet Badges </a>
					</Link>
				</li>
			)}

			<li className={`${styles.underline_links} ${router?.pathname === '/vet-reps-finder' ? styles.active_nav : undefined}`}>
				{router?.pathname !== '/vet-reps-finder' ? (
					<Link href='/vet-reps-finder'>
						<a> Vet Reps Finder </a>
					</Link>
				) : (
					<a> Vet Reps Finder </a>
				)}
			</li>
		</ul>
	)
}

export default SmallbarNavigation

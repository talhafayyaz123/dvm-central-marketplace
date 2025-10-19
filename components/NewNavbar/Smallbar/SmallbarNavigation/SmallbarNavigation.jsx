import React from 'react'
import Link from 'next/link'
import styles from './SmallbarNavigation.module.css'
import { useRouter } from 'next/router'

const SmallbarNavigation = ({ loginUser, userPosition }) => {
	const router = useRouter()

	return (
		<ul className={`${styles.small_header_right_wrapper}`}>
			<li className={`${styles.underline_links} ${styles.shop_now_btn} ${router?.pathname === '/shop-now' ? styles.active_nav : undefined}`}>
				{router?.pathname !== '/shop-now' ? (
					<Link href='/shop-now'>
						<a className='semibold-text'>Shop Now</a>
					</Link>
				) : (
					<a className='semibold-text'>Shop Now</a>
				)}
			</li>
			<li className={`${styles.underline_links} ${router?.pathname === '/sell-on-dvm' ? styles.active_nav : undefined}`}>
				{router?.pathname !== '/sell-on-dvm' ? (
					<Link href='/sell-on-dvm'>
						<a className='semibold-text'> Sell on DVM </a>
					</Link>
				) : (
					<a className='semibold-text'> Sell on DVM </a>
				)}
			</li>
			<li className={`${styles.underline_links} ${styles.mega_menu_link}`}>
				<a className='semibold-text'>
					Buy Now{' '}
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='3' stroke='var(--new-gray)' width={14} height={14} className='transition'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
					</svg>
				</a>

				<ul className={`${styles.mega_menu} ${styles.mega_buyNow_menu} transition`}>
					<li className={`${styles.underline_links} ${router?.pathname === '/vendors' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/vendors' ? (
							<Link href='/vendors'>
								<a className='semibold-text'> {`Vendors`} </a>
							</Link>
						) : (
							<a className='semibold-text'> {`Vendors`} </a>
						)}
					</li>
					<li className={`${styles.underline_links} ${router?.pathname === '/service-providers' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/service-providers' ? (
							<Link href='/service-providers'>
								<a className='semibold-text'> Service Providers </a>
							</Link>
						) : (
							<a className='semibold-text'> Service Providers </a>
						)}
					</li>
				</ul>
			</li>
			<li className={`${styles.underline_links} ${styles.mega_menu_link}`}>
				<a className={`link-blink gray-color`}>
					Special Offers{' '}
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='3' stroke='var(--gray-icon)' width={14} height={14} className='transition'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
					</svg>
				</a>

				<ul className={`${styles.mega_menu} transition`}>
					<li className={`${styles.underline_links} ${router?.pathname === '/today-deals' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/today-deals' ? (
							<Link href='/today-deals'>
								<a className='semibold-text'> {`Today's Deals`} </a>
							</Link>
						) : (
							<a className='semibold-text'> {`Today's Deals`} </a>
						)}
					</li>
					<li className={`${styles.underline_links} ${router?.pathname === '/featured-products' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/featured-products' ? (
							<Link href='/featured-products'>
								<a className='semibold-text'> Featured Products </a>
							</Link>
						) : (
							<a className='semibold-text'> Featured Products </a>
						)}
					</li>
					<li className={`${styles.underline_links} ${router?.pathname === '/hot-products' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/hot-products' ? (
							<Link href='/hot-products'>
								<a className='semibold-text'> Hot Products </a>
							</Link>
						) : (
							<a className='semibold-text'> Hot Products </a>
						)}
					</li>
				</ul>
			</li>
			<li className={`${styles.underline_links} ${styles.mega_menu_link} ${styles.virtual_link} ${router?.pathname === '/virtual-expo' ? styles.active_nav : undefined}`}>
				{router?.pathname !== '/virtual-expo' ? (
					<Link href='/virtual-expo'>
						<a className={`semibold-text`}>Virtual Expo </a>
					</Link>
				) : (
					<a className={`${styles.virtual_link_a} semibold-text`}>Virtual Expo </a>
				)}
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='3' stroke={router?.pathname === '/virtual-expo' ? 'var(--lite-dark-primary)' : 'var(--gray-icon)'} width={14} height={14} className='transition'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
				</svg>
				<ul className={`${styles.mega_menu} ${styles.mega_buyNow_menu} transition`}>
					<li className={`${styles.underline_links} ${router?.pathname === '/sponsored-program' ? styles.active_nav : undefined}`}>
						{router?.pathname !== '/sponsored-program' ? (
							<Link href='/sponsored-program'>
								<a className={` ${router?.pathname === '/virtual-expo' ? styles.not_active : undefined} semibold-text`}> {`Sponsored Program`} </a>
							</Link>
						) : (
							<a className='semibold-text'> {`Sponsored Program`} </a>
						)}
					</li>
				</ul>
			</li>

			<li className={`${styles.underline_links} ${router?.pathname === '/blogs' ? styles.active_nav : undefined}`}>
				{router?.pathname !== '/blogs' ? (
					<Link href='/blogs'>
						<a className='semibold-text'> Blogs </a>
					</Link>
				) : (
					<a className='semibold-text'> Blogs </a>
				)}
			</li>

			<li className={`${styles.underline_links} ${router?.pathname === '/get-pet-badges' ? styles.active_nav : undefined}`}>
				{router?.pathname !== '/get-pet-badges' ? (
					<Link href='/get-pet-badges'>
						<a className='semibold-text'>Get Pet Badges </a>
					</Link>
				) : (
					<a className='semibold-text'>Get Pet Badges </a>
				)}
			</li>

			{/* {userPosition === 'Sales Rep' && loginUser?.id !== undefined && ( */}
			<li className={`${styles.underline_links} ${router?.pathname === '/vet-rep-finder' ? styles.active_nav : undefined}`}>
				{router?.pathname !== '/vet-rep-finder' ? (
					<Link href='/vet-rep-finder'>
						<a className='semibold-text'> VetRep Finder </a>
					</Link>
				) : (
					<a className='semibold-text'> VetRep Finder </a>
				)}
			</li>
			{/* )} */}
		</ul>
	)
}

export default SmallbarNavigation

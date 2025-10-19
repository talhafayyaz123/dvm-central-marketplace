import React, { useContext } from 'react'
import Link from 'next/link'
import { siteUrl } from '../../../utils/config'
import { GlobalProvider } from '../../../context/AppProvider'

const BusinessDetail = () => {
	const { loginUser } = useContext(GlobalProvider)

	return (
		<div className='footer-business-details white-color'>
			<h4>Business</h4>

			<ul>
				{loginUser?.id !== undefined && (
					<>
						<li>
							<Link href='/shop-now'>
								<a>Shop Now</a>
							</Link>
						</li>

						<li>
							<Link href={`/dashboard`}>
								<a>My Account</a>
							</Link>
						</li>
						<li>
							<Link href='/cart'>
								<a>Cart</a>
							</Link>
						</li>
					</>
				)}
				<li>
					<Link href='/vendors'>
						<a>Shop by Vendors</a>
					</Link>
				</li>

				<li>
					<Link href='/sell-on-dvm'>
						<a>Sell on DVM</a>
					</Link>
				</li>

				<li>
					<Link href='/track-order'>
						<a>Track Order</a>
					</Link>
				</li>

				{loginUser?.id === undefined && (
					<li>
						<a href={`${siteUrl}auth/signin`}>Sign In & Register</a>
					</li>
				)}
			</ul>
		</div>
	)
}

export default BusinessDetail

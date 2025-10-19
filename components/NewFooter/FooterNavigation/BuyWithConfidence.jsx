import React from 'react'
import Link from 'next/link'
// import { GlobalProvider } from '../../../context/AppProvider'

const BuyWithConfidence = () => {
	// const { userData } = useContext(GlobalProvider)
	return (
		<div className='footer-buy-with white-color'>
			<h5 className='primary-color'>Buy With Confidence</h5>
			<ul>
				<li>
					<Link href='/about-us'>
						<a>
							<svg width={13} height={7} viewBox='0 0 13 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M8.55859 2.65625V1.39844C8.55859 0.824219 9.26953 0.523438 9.67969 0.933594L12.0312 3.3125C12.3047 3.55859 12.3047 3.96875 12.0312 4.21484L9.67969 6.59375C9.26953 7.00391 8.55859 6.70312 8.55859 6.12891V4.84375H0.328125C0.136719 4.84375 0 4.70703 0 4.51562V2.98438C0 2.82031 0.136719 2.65625 0.328125 2.65625H8.55859Z'
									fill='var(--primary)'
								/>
							</svg>
							About Us
						</a>
					</Link>
				</li>

				<li>
					<Link href='/contact'>
						<a>
							<svg width={13} height={7} viewBox='0 0 13 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M8.55859 2.65625V1.39844C8.55859 0.824219 9.26953 0.523438 9.67969 0.933594L12.0312 3.3125C12.3047 3.55859 12.3047 3.96875 12.0312 4.21484L9.67969 6.59375C9.26953 7.00391 8.55859 6.70312 8.55859 6.12891V4.84375H0.328125C0.136719 4.84375 0 4.70703 0 4.51562V2.98438C0 2.82031 0.136719 2.65625 0.328125 2.65625H8.55859Z'
									fill='var(--primary)'
								/>
							</svg>
							Contact
						</a>
					</Link>
				</li>

				<li>
					<Link href='/faqs'>
						<a>
							<svg width={13} height={7} viewBox='0 0 13 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M8.55859 2.65625V1.39844C8.55859 0.824219 9.26953 0.523438 9.67969 0.933594L12.0312 3.3125C12.3047 3.55859 12.3047 3.96875 12.0312 4.21484L9.67969 6.59375C9.26953 7.00391 8.55859 6.70312 8.55859 6.12891V4.84375H0.328125C0.136719 4.84375 0 4.70703 0 4.51562V2.98438C0 2.82031 0.136719 2.65625 0.328125 2.65625H8.55859Z'
									fill='var(--primary)'
								/>
							</svg>
							{`FAQ's`}
						</a>
					</Link>
				</li>
				<li>
					<Link href='/our-mission'>
						<a>
							<svg width={13} height={7} viewBox='0 0 13 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M8.55859 2.65625V1.39844C8.55859 0.824219 9.26953 0.523438 9.67969 0.933594L12.0312 3.3125C12.3047 3.55859 12.3047 3.96875 12.0312 4.21484L9.67969 6.59375C9.26953 7.00391 8.55859 6.70312 8.55859 6.12891V4.84375H0.328125C0.136719 4.84375 0 4.70703 0 4.51562V2.98438C0 2.82031 0.136719 2.65625 0.328125 2.65625H8.55859Z'
									fill='var(--primary)'
								/>
							</svg>
							Our Mission
						</a>
					</Link>
				</li>
				{/* {userData?.position !== 'Sales Rep' && ( */}
				<li>
					<Link href='/track-order'>
						<a>
							<svg width={13} height={7} viewBox='0 0 13 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M8.55859 2.65625V1.39844C8.55859 0.824219 9.26953 0.523438 9.67969 0.933594L12.0312 3.3125C12.3047 3.55859 12.3047 3.96875 12.0312 4.21484L9.67969 6.59375C9.26953 7.00391 8.55859 6.70312 8.55859 6.12891V4.84375H0.328125C0.136719 4.84375 0 4.70703 0 4.51562V2.98438C0 2.82031 0.136719 2.65625 0.328125 2.65625H8.55859Z'
									fill='var(--primary)'
								/>
							</svg>
							Track Order
						</a>
					</Link>
				</li>
				{/* )} */}

				<li>
					<Link href='/privacy-policy'>
						<a>
							<svg width={13} height={7} viewBox='0 0 13 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M8.55859 2.65625V1.39844C8.55859 0.824219 9.26953 0.523438 9.67969 0.933594L12.0312 3.3125C12.3047 3.55859 12.3047 3.96875 12.0312 4.21484L9.67969 6.59375C9.26953 7.00391 8.55859 6.70312 8.55859 6.12891V4.84375H0.328125C0.136719 4.84375 0 4.70703 0 4.51562V2.98438C0 2.82031 0.136719 2.65625 0.328125 2.65625H8.55859Z'
									fill='var(--primary)'
								/>
							</svg>
							Privacy Policy
						</a>
					</Link>
				</li>
				<li>
					<Link href='/terms-and-conditions'>
						<a>
							<svg width={13} height={7} viewBox='0 0 13 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M8.55859 2.65625V1.39844C8.55859 0.824219 9.26953 0.523438 9.67969 0.933594L12.0312 3.3125C12.3047 3.55859 12.3047 3.96875 12.0312 4.21484L9.67969 6.59375C9.26953 7.00391 8.55859 6.70312 8.55859 6.12891V4.84375H0.328125C0.136719 4.84375 0 4.70703 0 4.51562V2.98438C0 2.82031 0.136719 2.65625 0.328125 2.65625H8.55859Z'
									fill='var(--primary)'
								/>
							</svg>
							Terms and Conditions
						</a>
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default BuyWithConfidence

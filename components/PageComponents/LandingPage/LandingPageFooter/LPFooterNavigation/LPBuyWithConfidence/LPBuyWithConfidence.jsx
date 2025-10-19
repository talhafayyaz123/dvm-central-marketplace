import React from 'react'
import Link from 'next/link'

const LPBuyWithConfidence = () => {
	return (
		<div className='footer-buy-with black-color'>
			<h4>Buy With Confidence</h4>
			<ul>
				<li>
					<Link href='#'>
						<a>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>
							About Us
						</a>
					</Link>
				</li>
				<li>
					<Link href='#'>
						<a>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>

							{`FAQ's`}
						</a>
					</Link>
				</li>
				<li>
					<Link href='#'>
						<a>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>
							Our Mission
						</a>
					</Link>
				</li>
				<li>
					<Link href='#'>
						<a>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>
							Contact
						</a>
					</Link>
				</li>

				<li>
					<Link href='#'>
						<a>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>
							Privacy Policy
						</a>
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default LPBuyWithConfidence

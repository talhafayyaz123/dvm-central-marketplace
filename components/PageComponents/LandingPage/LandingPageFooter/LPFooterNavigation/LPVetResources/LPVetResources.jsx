import React from 'react'
import Link from 'next/link'

const LPVetResources = () => {
	return (
		<div className='footer-vet-res black-color'>
			<h4>Vet Resources</h4>
			<ul>
				<li>
					<Link href='#'>
						<a>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>
							Courses
						</a>
					</Link>
				</li>
				<li>
					<Link href='#'>
						<a>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>
							Educational Programs
						</a>
					</Link>
				</li>
				<li>
					<Link href='#'>
						<a>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>
							Associations
						</a>
					</Link>
				</li>

				<li>
					<Link href='#'>
						<a>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>
							Surgical Procedures
						</a>
					</Link>
				</li>
				<li>
					<Link href='#'>
						<a>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>
							Trade Shows
						</a>
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default LPVetResources

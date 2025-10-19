import React from 'react'
import styles from './UserActivation.module.css'
import { useRouter } from 'next/router'

const UserActivation = () => {
	const router = useRouter()

	return (
		<section className='inner-sec-p'>
			<div className={`${styles.container} sec-container`}>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={0.75} stroke='var(--green)'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
				</svg>

				<h3 className='primary-color'>{`Congratulations!`}</h3>
				{router?.query?.vendor ? (
					<h5 className='gray-color'>{`We have received your information, and our team will contact you soon. You can safely close this page.`}</h5>
				) : (
					<h5 className='gray-color'>{`Your account has been ${router?.query?.confirmed ? `already confirmed` : 'confirmed successfully'}. You can safely close this page.`}</h5>
				)}
			</div>
		</section>
	)
}

export default UserActivation

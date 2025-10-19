import React from 'react'
import styles from '../LefColContent/LefColContent.module.css'
import { imgApiUrl } from '../../../../../utils/config'
import ImgWithLoader from '../../../../UI/ImgWithLoader/ImgWithLoader'
import placeholderImg from '/public/imgs/no-img.webp'

const LefColContent = ({ result }) => {
	return (
		<>
			<div className={`${styles.logo_container} gray-border radius`}>
				<ImgWithLoader className={styles.logo_wrapper} layout='fill' src={result?.serviceProviderDetail?.logo !== null ? `${imgApiUrl.vendor.logo}/${result?.serviceProviderDetail?.logo}` : placeholderImg} alt={result?.serviceProviderDetail?.name} sizes='(max-width:576px) 125px, 150px' />

				<h5>{result?.serviceProviderDetail?.name}</h5>
			</div>

			<div className={`${styles.detail_wrapper} gray-border radius`}>
				<h5>Details</h5>
				<div className={styles.detail}>
					<div className={styles.wrapper}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' />
						</svg>
						<div className={styles.inner_wrapper}>
							<div className={styles.bold_text}>Name</div>
							<div className='gray-color'>{result?.serviceProviderDetail?.name}</div>
						</div>
					</div>
					<div className={styles.wrapper}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125'
							/>
						</svg>

						<div className={styles.inner_wrapper}>
							<div className={styles.bold_text}>Category</div>
							<div className='gray-color'>{result?.serviceProviderDetail?.sp_category_id}</div>
						</div>
					</div>
					<div className={styles.wrapper}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244' />
						</svg>

						<div className={styles.inner_wrapper}>
							<div className={styles.bold_text}>Website</div>
							<a href={result?.serviceProviderDetail?.sp_website} target='_blank' rel='noreferrer' className='primary-color'>
								Access Website
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LefColContent

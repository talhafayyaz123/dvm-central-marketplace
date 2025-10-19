import React from 'react'
import styles from './JobsList.module.css'
import Link from 'next/link'
import ImgWithLoader from '../../../../UI/ImgWithLoader/ImgWithLoader'
import { imgApiUrl } from '../../../../../utils/config'
import placeholderImg from '/public/imgs/no-img.webp'

const JobsList = ({ job, loginUser, userData }) => {
	const { title, created_time, slug, vendor } = job

	return (
		<Link href={`/jobs/${slug}`}>
			<a key={job.id} className={`${styles.job_card}`}>
				<div className={styles.title_wrapper}>
					{loginUser?.id !== undefined && userData?.position === 'Sales Rep' && <ImgWithLoader layout='fill' loaderType='sml' className={`${styles.logo} full-radius`} src={vendor !== null ? `${imgApiUrl.vendor.logo}/${vendor?.logo}` : placeholderImg} alt={vendor?.name} />}
					{/* <div className={`${styles.logo} full-radius gray-border`} /> */}
					<div className={styles.title}>
						<div>{title?.length > 25 ? title.substring(0, 25) + '...' : title}</div>
						{loginUser?.id !== undefined && userData?.position === 'Sales Rep' && <div className='gray-color'>{job?.vendor?.name}</div>}
					</div>
				</div>

				{job?.job_working_time?.name && <div className={`${styles.info} ${styles.info_btn} btn`}>{job?.job_working_time?.name}</div>}
				{job?.minimum_education_level?.name && <div className={`${styles.info} ${styles.info_btn} btn`}>{job?.minimum_education_level?.name}</div>}

				<div className={`${styles.info} ${styles.state}`}>
					{job?.city}, {job.country?.name}
				</div>

				<div className={`${styles.info} ${styles.info_btn} btn ${styles.date}`}>{created_time}</div>
			</a>
		</Link>
	)
}

export default JobsList

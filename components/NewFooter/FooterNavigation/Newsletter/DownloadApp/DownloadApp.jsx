import React from 'react'
import styles from './DownloadApp.module.css'
import Image from 'next/image'
import playstoreIcon from '/public/icons/play-store-icon.svg'
import applestoreIcon from '/public/icons/apple-store-icon.svg'

const DownloadApp = ({ className }) => {
	return (
		<div className={`${styles.downlaod_app_container} ${className}`}>
			{/* <div className={styles.downlaod}>Download App</div> */}
			<div className={styles.app_btn_wrapper}>
				<a className={styles.icon_wrapper} href='https://play.google.com/store/apps/details?id=com.gtechsources.vetandtech.app' target='_blank' rel='noreferrer'>
					<Image layout='fill' src={playstoreIcon} alt='Play Store' />
				</a>

				<a className={styles.icon_wrapper} href='https://apps.apple.com/pk/app/dvm-central/id1634400448' target='_blank' rel='noreferrer'>
					<Image layout='fill' src={applestoreIcon} alt='Apple Store' />
				</a>
			</div>
		</div>
	)
}

export default DownloadApp

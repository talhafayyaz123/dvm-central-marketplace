import React from 'react'
import styles from './Video.module.css'
import IframeWithLoader from '../../../UI/IframeWithLoader/IframeWithLoader'

const Video = () => {
	return (
		<div className={styles.video_container}>
			<h1 className='white-color'>Request for Demo - DVM Central Vendor Portal</h1>
			<div className={`radius ${styles.video_wrapper}`}>
				<IframeWithLoader className={styles.video} src={`https://player.vimeo.com/video/784554520`} />
			</div>
		</div>
	)
}

export default Video

import React, { useState } from 'react'
import styles from './VideoModal.module.css'
import { LiteLoader } from '../../../../Loader/Loader'
import { imgApiUrl } from '../../../../../utils/config'

const VideoModal = ({ videoData, modal }) => {
	const [loading, setloading] = useState(true)
	const { video_type, name, width, height } = videoData

	console.log('videoData', videoData)

	return video_type === 'youtube' ? (
		<>
			{loading && <LiteLoader className={styles.iframe_loader} />}
			<div className={styles.iframe_wrapper} style={{ paddingTop: `${(height / width) * 100}%` }}>
				<iframe onLoad={() => setloading(false)} className={styles.iframe} src={modal ? (name?.includes('http') ? name : `https://www.youtube.com/embed/${name}?autoplay=1`) : ''} title={name} />
			</div>
		</>
	) : video_type === 'vimeo' ? (
		<>
			{loading && <LiteLoader className={styles.iframe_loader} />}
			<div className={styles.iframe_wrapper} style={{ paddingTop: `${(height / width) * 100}%` }}>
				<iframe onLoad={() => setloading(false)} className={styles.iframe} src={modal ? (name?.includes('http') ? name : `https://player.vimeo.com/video/${name}?autoplay=1`) : ''} title={name} />
			</div>
		</>
	) : (
		<video className={styles.video} controls autoPlay muted>
			<source src={modal ? `${imgApiUrl.products.video}/${name}` : ''} />
		</video>
	)
}

export default VideoModal

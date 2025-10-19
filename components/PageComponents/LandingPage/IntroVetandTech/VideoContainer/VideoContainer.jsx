import React from 'react'
import styles from './VideoContainer.module.css'
import { LiteLoader } from '../../../../Loader/Loader'

const VideoContainer = ({ showVideo, setShowVideo, videoSrc, iframeLoader, setIframeLoader }) => {
	return (
		<div className={`${styles.video_player_container} modal-bg video-player-container ${showVideo && 'show-bd'}`}>
			<div className={styles.video_player_wrapper}>
				<svg onClick={() => setShowVideo(false)} xmlns='http://www.w3.org/2000/svg' className='video-close-btn' fill='none' viewBox='0 0 24 24' stroke='#fff' strokeWidth={2}>
					<path strokeLinecap='round' strokeLinejoin='round' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
				</svg>
				<div className={`${styles.video_iframe_wrapper} video-player-wrapper`}>
					{iframeLoader && <LiteLoader className={styles.iframe_loader} />}
					<iframe className={`${styles.video_iframe} video-iframe`} onLoad={() => setIframeLoader(false)} src={videoSrc} width={640} height={564} frameBorder={0} allow='autoplay; fullscreen' />
				</div>
			</div>
		</div>
	)
}

export default VideoContainer

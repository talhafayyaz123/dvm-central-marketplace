import React, { useEffect, useRef, useState } from 'react'
import styles from './Video.module.css'
import IframeWithLoader from '../../../../UI/IframeWithLoader/IframeWithLoader'
import Player from '@vimeo/player'

const Video = ({ loading, webinar, setuserWatchTime, pageChanging, setpageChanging, userWatchTime, watchedTime, setprogressBar }) => {
	const { video_id } = webinar
	const videoIframe = useRef(null)

	let timeWatched = userWatchTime

	useEffect(() => {
		const player = new Player(videoIframe?.current, {
			id: video_id
		})

		!pageChanging && setpageChanging(true)

		player.on('timeupdate', function (data) {
			setprogressBar(((data?.seconds / data?.duration) * 100)?.toFixed(0))
			setuserWatchTime(() => Number(data?.seconds?.toFixed(0)))

			if (data?.seconds === data?.duration) {
				player.setCurrentTime(0)
			}

			if (data?.seconds - 1 < timeWatched && data?.seconds > timeWatched) {
				timeWatched = data?.seconds
			}
		})

		player.on('seeked', function (data) {
			if (timeWatched < data?.seconds) {
				player.setCurrentTime(timeWatched)
			}
			player.pause()
			setTimeout(() => {
				player.play()
			}, 300)
		})
	}, [])

	return (
		<section className={`${styles.video_container}`}>
			<div className='sec-container'>
				<div ref={videoIframe} className={`${styles.video_wrapper} webinar-video-wrapper`}>
					<IframeWithLoader className={styles.video} src={`https://player.vimeo.com/video/${video_id}?autoplay=1#t=${userWatchTime}`} />
				</div>
			</div>
		</section>
	)
}

export default Video

import Image from 'next/image'
import React, { useState } from 'react'
import HeadingBoxes from '../HeadingBoxes/HeadingBoxes'
import styles from './IntroVetandTech.module.css'
import PlayerBtn from './PlayerBtn/PlayerBtn'
import leftwaveimg from '../../../../public/landing-page/shape/left-wave.webp'
import rightwaveimg from '../../../../public/landing-page/shape/right-wave.webp'
import VideoContainer from './VideoContainer/VideoContainer'

const IntroVetandTech = () => {
	const [showVideo, setShowVideo] = useState(false)
	const [videoSrc, setVideoSrc] = useState('')
	const [iframeLoader, setIframeLoader] = useState(false)

	const videoBtnClickHandler = () => {
		setVideoSrc(`https://player.vimeo.com/video/727050480?h=8b0760cbcf`)
		setShowVideo(true)
		setIframeLoader(true)
	}

	return (
		<section id='intro-vetandtech' className={`${styles.intro_vetandtech} sec-p`}>
			<div className={`${styles.img_wrapper} ${styles.img_1}`}>
				<Image src={leftwaveimg} alt='VatandTech' />
			</div>
			<div className={`${styles.img_wrapper} ${styles.img_2}`}>
				<Image src={rightwaveimg} alt='VatandTech' />
			</div>
			<div className='sec-container'>
				<div className={`${styles.heading_container} lp-heading-container`}>
					<h4 className='lp-sml-heading'>
						<HeadingBoxes />
						<span>Introducing Vet And Tech</span>
					</h4>
					<h2 className='lp-heading-wrapper'>
						Vet And Tech - Your Ultimate Source Featuring <span>{`Animal Health Products & Free Educational Resources`}</span>
					</h2>
				</div>

				<PlayerBtn onClick={() => videoBtnClickHandler()} />
				<VideoContainer videoSrc={videoSrc} showVideo={showVideo} setShowVideo={setShowVideo} iframeLoader={iframeLoader} setIframeLoader={setIframeLoader} />
			</div>
		</section>
	)
}

export default IntroVetandTech

import React, { useState } from 'react'
import styles from './IntroVideo.module.css'
import ListingLayout2 from '../../../UI/ListingLayout2/ListingLayout2'
import Leftcol from '../../../UI/ListingLayout2/LeftCol2/LeftCol2'
import Rightcol from '../../../UI/ListingLayout2/RightCol2/RightCol2'
import IframeWithLoader from '../../../UI/IframeWithLoader/IframeWithLoader'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import expandImg from '/public/imgs/home/expand-your-business.jpg'
import becomeSellerImg from '/public/imgs/home/become-a-seller.jpg'
import videoImng from '/public/imgs/home/video-image.jpg'
import PlayerBtn from '../../../UI/PlayerBtn/PlayerBtn'

const IntroVideo = ({ className, view }) => {
	const [showVideo, setshowVideo] = useState(false)
	const [videoSrc, setvideoSrc] = useState(null)

	const showVideoHandler = () => {
		setvideoSrc(`https://player.vimeo.com/video/784554520?autoplay=1`)
		setshowVideo(true)
	}

	return (
		<section className={`${className} sec-mt`}>
			<div className='sec-container'>
				<ListingLayout2>
					<Leftcol>
						<div className={styles.video_wrapper} onClick={() => showVideoHandler()}>
							{!showVideo ? (
								<>
									<PlayerBtn className={styles.play_icon} btnType='white' />
									<ImgWithLoader className={styles.video_img} src={videoImng} alt='Introduction to DVM Central' />
								</>
							) : (
								<div className={styles.video}>
									<IframeWithLoader src={videoSrc} alt='Introduction to DVM Central' />
								</div>
							)}
						</div>
					</Leftcol>
					{view !== 'hero' && (
						<Rightcol className={styles.img_wrapper}>
							<ImgWithLoader className={styles.img} src={expandImg} alt='Expand your business' />
							<ImgWithLoader src={becomeSellerImg} alt='Become a Seller in 4 steps' />
						</Rightcol>
					)}
				</ListingLayout2>
			</div>
		</section>
	)
}

export default IntroVideo

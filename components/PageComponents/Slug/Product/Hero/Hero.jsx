import React, { useEffect, useState } from 'react'
import ProductDetail from '../../../../UI/ProductDetail/ProductDetail'
import styles from './Hero.module.css'
import InfoCol from './InfoCol/InfoCol'
import Modal from '../../../../UI/Modal/Modal'
import IframeWithLoader from '../../../../UI/IframeWithLoader/IframeWithLoader'

const Hero = ({ data, changingData, setchangingData, settrendingProducts }) => {
	const [showHelpVideo, setshowHelpVideo] = useState(false)
	const [videoSrc, setvideoSrc] = useState('')
	useEffect(() => {
		!showHelpVideo &&
			setTimeout(() => {
				setvideoSrc('')
			}, 300)
	}, [showHelpVideo])

	return (
		<>
			<Modal modal={showHelpVideo} setmodal={setshowHelpVideo} modalType='video' className={`${styles.help_video} radius`}>
				<IframeWithLoader loaderColor='white' className='radius' src={videoSrc} />
			</Modal>

			<section className={`${styles.product_hero}`}>
				<div className='sec-container'>
					<div className={`${styles.product_hero_wrapper} inner-sec-p`}>
						<ProductDetail data={data} changingData={changingData} setchangingData={setchangingData} settrendingProducts={settrendingProducts} />
						<InfoCol setshowHelpVideo={setshowHelpVideo} setvideoSrc={setvideoSrc} data={data.vendor} />
					</div>
				</div>
			</section>
		</>
	)
}

export default Hero

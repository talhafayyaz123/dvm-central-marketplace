import Image from 'next/image'
import React, { useState } from 'react'
import Wave from '../../../UI/Wave/Wave'
import styles from './Hero.module.css'
import heroImg from '/public/imgs/sell-on-vetandtech/hero-img.png'
import Link from 'next/link'
import leftCircle from '/public/imgs/home/left-half-circle.png'
import rightCircle from '/public/imgs/home/right-half-circle.png'
import PlayerBtn from '../../../UI/PlayerBtn/PlayerBtn'
import IframeWithLoader from '../../../UI/IframeWithLoader/IframeWithLoader'
import Modal from '../../../UI/Modal/Modal'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'

const Hero = ({ scrollToSellerFormHandler, pageType }) => {
	const [showVideo, setshowVideo] = useState(false)
	const [videoSrc, setvideoSrc] = useState('')

	const showVideoHandler = () => {
		setvideoSrc('https://player.vimeo.com/video/903285352?autoplay=1')
		setshowVideo(true)
	}
	return (
		<section className={`sell-on-vt-hero inner-sec-p ${pageType !== 'home-v2' ? 'gradient-sec' : undefined}`}>
			{pageType === 'home-v2' && (
				<>
					<div className={styles.left_img}>
						<Image src={leftCircle} alt='Become a Seller' />
					</div>
					<div className={styles.right_img}>
						<Image src={rightCircle} alt='Become a Seller' />
					</div>
					<div className={`${styles.left_sml_cirlce} full-radius`} />
					<div className={`${styles.center_sml_cirlce} full-radius`} />
				</>
			)}
			{pageType !== 'home-v2' && <Wave type='gray' />}
			<div className={`sec-container ${pageType !== 'home-v2' ? 'inner-sec-pb' : undefined}`}>
				<div className={styles.sell_on_vt_hero_container}>
					<div className={`${styles.heading_wrapper} heading_wrapper ${pageType !== 'home-v2' ? 'white-color' : 'black-color'}`}>
						{/* <H2WithBorder text={`Become A Seller At DVM Central and sell your products however you want!`} /> */}
						{pageType !== 'home-v2' ? <h1>Become A Seller At DVM Central And Sell Your Veterinary Supplies However You Want!</h1> : <h2>Become A Seller At DVM Central And Sell Your Veterinary Supplies However You Want!</h2>}
						<p className={`${styles.bottom_heading} ${pageType === 'home-v2' ? 'lite-black-color' : undefined}`}>{`You're only a few clicks away from a great start.`}</p>
						<p className={`${styles.chance_heading} white-color`}>This is your chance to experience:</p>

						<ul className={styles.list_wrapper}>
							<li>
								<svg xmlns='http://www.w3.org/2000/svg' width='25.297' height='19.678' viewBox='0 0 25.297 19.678'>
									<path
										id='Path_8508'
										data-name='Path 8508'
										d='M572.883,199.118c.147-.173.219-.271.3-.357q5.955-5.971,11.913-11.939a1.915,1.915,0,0,1,2.314-.465,2.6,2.6,0,0,1,.559.406c.268.244.518.509.773.768a1.946,1.946,0,0,1,0,2.946q-1.835,1.847-3.678,3.687-5.571,5.583-11.14,11.169a1.309,1.309,0,0,1-1.446.414,1.531,1.531,0,0,1-.548-.359q-3.591-3.582-7.167-7.178a1.935,1.935,0,0,1,0-2.88c.269-.274.538-.547.813-.814a1.919,1.919,0,0,1,2.81.01q2.135,2.125,4.256,4.265A3.024,3.024,0,0,1,572.883,199.118Z'
										transform='translate(-564.126 -186.148)'
										fill='#65d94f'
									/>
								</svg>
								<span>The Culture Of Direct Buying</span>
							</li>

							<li>
								<svg xmlns='http://www.w3.org/2000/svg' width='25.297' height='19.678' viewBox='0 0 25.297 19.678'>
									<path
										id='Path_8508'
										data-name='Path 8508'
										d='M572.883,199.118c.147-.173.219-.271.3-.357q5.955-5.971,11.913-11.939a1.915,1.915,0,0,1,2.314-.465,2.6,2.6,0,0,1,.559.406c.268.244.518.509.773.768a1.946,1.946,0,0,1,0,2.946q-1.835,1.847-3.678,3.687-5.571,5.583-11.14,11.169a1.309,1.309,0,0,1-1.446.414,1.531,1.531,0,0,1-.548-.359q-3.591-3.582-7.167-7.178a1.935,1.935,0,0,1,0-2.88c.269-.274.538-.547.813-.814a1.919,1.919,0,0,1,2.81.01q2.135,2.125,4.256,4.265A3.024,3.024,0,0,1,572.883,199.118Z'
										transform='translate(-564.126 -186.148)'
										fill='#65d94f'
									/>
								</svg>
								<span>{`Standing Among Leading Manufacturers & Suppliers`}</span>
							</li>

							<li>
								<svg xmlns='http://www.w3.org/2000/svg' width='25.297' height='19.678' viewBox='0 0 25.297 19.678'>
									<path
										id='Path_8508'
										data-name='Path 8508'
										d='M572.883,199.118c.147-.173.219-.271.3-.357q5.955-5.971,11.913-11.939a1.915,1.915,0,0,1,2.314-.465,2.6,2.6,0,0,1,.559.406c.268.244.518.509.773.768a1.946,1.946,0,0,1,0,2.946q-1.835,1.847-3.678,3.687-5.571,5.583-11.14,11.169a1.309,1.309,0,0,1-1.446.414,1.531,1.531,0,0,1-.548-.359q-3.591-3.582-7.167-7.178a1.935,1.935,0,0,1,0-2.88c.269-.274.538-.547.813-.814a1.919,1.919,0,0,1,2.81.01q2.135,2.125,4.256,4.265A3.024,3.024,0,0,1,572.883,199.118Z'
										transform='translate(-564.126 -186.148)'
										fill='#65d94f'
									/>
								</svg>
								<span>Meeting The Needs Of A Versatile Customer Base</span>
							</li>
						</ul>
						{pageType !== 'home-v2' ? (
							<button className={`${styles.get_start_button} inner-sec-mt white-btn primary-color`} onClick={() => scrollToSellerFormHandler()}>
								Get Started
							</button>
						) : (
							<Link href='/sell-on-dvm'>
								<a>
									<button className='inner-sec-mt white-btn primary-btn'>Get Started</button>
								</a>
							</Link>
						)}
					</div>
					<div className={styles.img_wrapper}>
						{/* <Image src={heroImg} alt='Become A Seller At DVM Central' /> */}
						<div className={styles.video_img_wrapper} onClick={() => showVideoHandler()}>
							<PlayerBtn className={`${styles.play_button}`} />
							<Image src={heroImg} priority alt='Create Seller Account' />{' '}
						</div>
					</div>
				</div>
			</div>
			<Modal modal={showVideo} setmodal={setshowVideo} modalType='video'>
				<div className={styles.video_player}>{showVideo && <IframeWithLoader loaderColor='white' className={`${styles.video}`} src={videoSrc} title='Seller Central Portal' />}</div>
			</Modal>
		</section>
	)
}

export default Hero

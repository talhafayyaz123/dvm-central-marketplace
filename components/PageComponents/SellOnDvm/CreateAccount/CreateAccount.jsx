import Image from 'next/image'
import React, { useState } from 'react'
import styles from './CreateAccount.module.css'
import accountBgImg from '/public/imgs/sell-on-vetandtech/account-bg.png'
import videoImg from '/public/imgs/sell-on-vetandtech/sell-on-dvm.png'
import IframeWithLoader from '../../../UI/IframeWithLoader/IframeWithLoader'
import PlayerBtn from '../../../UI/PlayerBtn/PlayerBtn'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'

const CreateAccount = () => {
	const [showVideo, setshowVideo] = useState(false)
	const [videoSrc, setvideoSrc] = useState('')

	const showVideoHandler = () => {
		setvideoSrc('https://player.vimeo.com/video/903285352?autoplay=1')
		setshowVideo(true)
	}

	return (
		<section className='create-account sec-p sec-mb'>
			<Image layout='fill' src={accountBgImg} alt='Create Seller Account' />
			<div className='sec-container'>
				<div className={`${styles.content_container} white-bg`}>
					<div className={`${styles.circles_wrapper} sec-container`}>
						<div className={styles.circles}>
							<div className={`${styles.red_circle} ${styles.circle}`} />
							<div className={`${styles.yellow_circle} ${styles.circle}`} />
							<div className={`${styles.green_circle} ${styles.circle}`} />
						</div>

						<div className={styles.circles}>
							<div className={styles.circle} />
							<div className={styles.circle} />
							<div className={styles.circle} />
						</div>
					</div>
					<div className='inner-sec-p'>
						<div className={`${styles.content_wrapper} sec-container`}>
							<div className={`${styles.heading_wrapper} heading_wrapper`}>
								<h2 className='primary-color'>Seller Central Portal</h2>
								<p className='gray-color'>A Specialized Platform Designed Just For Sellers. Join Us To Effectively Reach The Veterinary Market. Set Up Your Store And Become A Seller Today!</p>
								<p className='gray-color'>This is your chance to experience:</p>

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
							</div>

							{!showVideo ? (
								<div className={`${styles.video_img_wrapper}`}>
									<PlayerBtn className={`${styles.play_button}`} btnType='white' onClick={() => showVideoHandler()} />
									<ImgWithLoader src={videoImg} alt='Create Seller Account' />{' '}
								</div>
							) : (
								<div className={`${styles.video_wrapper} radius shadow`}>
									<IframeWithLoader className={`${styles.video}`} src={videoSrc} title='Seller Central Portal' />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CreateAccount

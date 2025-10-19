import Image from 'next/image'
import React from 'react'
import dotLeftImg from '/public/landing-page/background/left-dots-img.webp'
import rightImg from '/public/landing-page/background/right-dark-img.webp'
import blobImg from '/public/landing-page/sell-on-vetntech/left-blob.webp'
import styles from './SellerPortal.module.css'
import Slider from './Slider/Slider'

import portalIcon from '/public/landing-page/sell-on-vetntech/icons_Seller_portal.svg'
import boothIcon from '/public/landing-page/sell-on-vetntech/icons_booth.svg'
import storeIcon from '/public/landing-page/sell-on-vetntech/icons_Store.svg'

const SellerPortal = () => {
	return (
		<section id='seller-portal' className={`${styles.seller_portal} sec-p white-bg`}>
			<div className={styles.left_img_wrapper}>
				<Image src={dotLeftImg} alt='VetandTech' />
			</div>
			<div className={styles.right_img_wrapper}>
				<Image src={rightImg} alt='VetandTech' />
			</div>
			{/* <div className={styles.blob_img_wrapper}>
				<Image src={blobImg} alt='VetandTech' />
			</div> */}
			<div className='sec-container'>
				<div className={styles.seller_portal_wrapper}>
					<div className={styles.left_col}>
						<div className={styles.wrapper}>
							<div className={`${styles.text_wrapper} seller-portal`}>
								<h4>Seller Central Portal</h4>
								<p className='gray-color'>
									<span className='strong'>One Platform For All Your Possible Needs:</span> Showcase your entire product range with custom store pages and detailed sales analytics.
								</p>
							</div>
							<div className={styles.icon_wrapper}>
								<Image src={portalIcon} alt='Seller Portal Center' />
							</div>
						</div>

						<div className={styles.wrapper}>
							<div className={`${styles.text_wrapper} virtual-booth`}>
								<h4>3D Virtual Booth</h4>
								<p className='gray-color'>{`Vet And Tech also enable manufacturers & suppliers to showcase their products interactively by using 3D Virtual Booths to attract more customers.`}</p>
							</div>
							<div className={styles.icon_wrapper}>
								<Image src={boothIcon} alt='Seller Portal Center' />
							</div>
						</div>

						<div className={styles.wrapper}>
							<div className={`${styles.text_wrapper} store-pages`}>
								<h4>Personalized Store Pages</h4>
								<p className='gray-color'>
									<span className='strong'>Full Authority:</span> Setup Personalized Store pages by customizing headers, adding more pages for information, placing product banners, and listing all of their products.
								</p>
							</div>
							<div className={styles.icon_wrapper}>
								<Image src={storeIcon} alt='Seller Portal Center' />
							</div>
						</div>
					</div>
					<div className={styles.right_col}>
						<Slider />
					</div>
				</div>
			</div>
		</section>
	)
}

export default SellerPortal

import React from 'react'
import adviceIcon from '/public/imgs/product/advise-icon.svg'
import paymentIcon from '/public/imgs/product/payment-icon.svg'
// import visacardIcon from '/public/imgs/product/visacard-icon.svg'
// import mastercardIcon from '/public/imgs/product/mastercard-icon.svg'
// import americanexpresscardIcon from '/public/imgs/product/ammericanexpresscard-icon.svg'
// import discovercardIcon from '/public/imgs/product/discovercard-icon.svg'
// import jcbcardIcon from '/public/imgs/product/jcbcard-icon.svg'
import stripeIcon from '/public/imgs/product/stripe-logo.svg'

import secureIcon from '/public/imgs/product/secure-icon.svg'
// import shippingIcon from '/public/imgs/product/shipping-icon.svg'
import Image from 'next/image'
// import Link from 'next/link'
import styles from './InfoDetail.module.css'

const InfoDetail = ({ setshowHelpVideo, setvideoSrc }) => {
	return (
		<>
			{/* advice */}
			<div className={styles.wrapper}>
				<div className={styles.img_wrapper}>
					<Image layout='fill' src={adviceIcon} alt='Need Advice' />
				</div>
				<div className={styles.info_detail_wrapper}>
					<h5 className={styles.title}>Need Advice?</h5>
					<div className={`${styles.inner_wrapper} `}>
						<span className={styles.experts}>Ask Our Experts!</span>
						<h5 className={`${styles.experts} primary-color`}>
							<a href='tel:+14075576073'>+1(407)-557 6073</a>
						</h5>
					</div>

					<h5 className={styles.title}>Need help?</h5>
					<div className={`${styles.inner_wrapper} `}>
						<span className={styles.experts}>click below button to watch video, how you can add products to your cart!</span>
						<button className='primary-border primary-color sml-btn' onClick={() => (setshowHelpVideo(true), setvideoSrc('https://player.vimeo.com/video/894423299?pip=0&&autoplay=1'))}>
							Watch Video
							{/* <PlayerBtn size='sml' /> */}
						</button>
					</div>
				</div>
			</div>

			{/* payment */}
			<div className={styles.wrapper}>
				<div className={styles.payment_img_wrapper}>
					<Image layout='fill' src={paymentIcon} alt='Payment Methods' />
				</div>
				<div className={styles.info_detail_wrapper}>
					<h5 className={styles.title}>Payment Method</h5>
					<div className={styles.imgs_inner_wrapper}>
						{/* <div className={styles.img_inner_wrapper}>
							<Image src={visacardIcon} alt='Visa Card' />
						</div>
						<div className={styles.img_inner_wrapper}>
							<Image src={mastercardIcon} alt='Master Card' />
						</div>
						<div className={styles.img_inner_wrapper}>
							<Image src={americanexpresscardIcon} alt='American Express Card' />
						</div>
						<div className={styles.img_inner_wrapper}>
							<Image src={discovercardIcon} alt='Discover Card' />
						</div>
						<div className={styles.img_inner_wrapper}>
							<Image src={jcbcardIcon} alt='JCB Card' />
						</div> */}
						<div className={styles.img_inner_wrapper}>
							<Image src={stripeIcon} alt='stripe' />
						</div>
					</div>
				</div>
			</div>

			{/* security */}
			<div className={styles.wrapper}>
				<div className={styles.secure_img_wrapper}>
					<Image layout='fill' src={secureIcon} alt='Secure Express Checkout' />
				</div>
				<div className={styles.info_detail_wrapper}>
					<h5 className={styles.title}>Secure Express Checkout</h5>
					<p className={styles.inner_wrapper}>
						Save your payment information securely
						<span className={styles.purple_text}>stripe</span>
						for express checkout.
					</p>
				</div>
			</div>

			{/* shipping */}

			{/* <div className={styles.wrapper}>
				<div className={styles.shipping_img_wrapper}>
					<Image layout='fill' src={shippingIcon} alt={`Shipping & Return Policy`} />
				</div>
				<div className={styles.info_detail_wrapper}>
					<h5 className={styles.title}>{`Shipping & Return Policy`}</h5>
					<p className={styles.inner_wrapper}>
						International shipping see details for
						<Link href='#'>
							<a className={styles.purple_text}>shipping</a>
						</Link>
						and
						<Link href='#'>
							<a className={styles.purple_text}>returns.</a>
						</Link>
					</p>
				</div>
			</div> */}
		</>
	)
}

export default InfoDetail

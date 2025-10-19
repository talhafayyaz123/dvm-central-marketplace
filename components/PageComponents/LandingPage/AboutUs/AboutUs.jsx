import React from 'react'
import styles from './AboutUs.module.css'

const AboutUs = () => {
	return (
		<section className='sec-m'>
			<div className={`${styles.about} sml-sec-container`}>
				<h2 className='secondary-color'>About Us</h2>
				<div className={`${styles.inner_wrapper} inner-sec-mt`}>
					<p>DVM Central is a veterinary marketplace for animal health products. We aim to bring suppliers and buyers under the same roof to promote the culture of direct buying. Our goal is to make the buying and selling of veterinary supplies easier.</p>
					<h5>Buy Direct, Save More!</h5>
					<p>
						We are a multi-vendor platform where different sellers can sign up to showcase their products. On the other hand, veterinary hospitals, clinics, medical facilities, and individual professionals can BUY DIRECTLY from renowned and authentic manufacturers and suppliers. To say the least, we
						promote direct buying to save you money and time. If you are a manufacturer or supplier of veterinary health products, register with us to grow your business.
					</p>
					<h5>What Do We Have For Buyers?</h5>
					<p>In a highly digitalized era, it’s our objective to provide ease for buyers to buy from a reliable supplier comfortably. At DVM, we offer a safe environment for buyers of animal health products to purchase directly from the most reliable manufacturers.</p>
					<ul>
						<li>Buy Directly</li>
						<li>Save Money</li>
						<li>Shop Unlimited</li>
					</ul>
					<h5>What Do We Have For Sellers?</h5>
					<p>
						DVM Central features a specialized portal for sellers. Our Seller Central Portal is designed to be transparent, secure, and reliable for veterinary suppliers. We make every possible effort to help suppliers and manufacturers promote and sustain their businesses. Sellers get their own
						dashboard, where they can:
					</p>
					<ul>
						<li>Make Personalised Profiles</li>
						<li>Gain Sales Analytics</li>
						<li>Get Profits insight</li>
					</ul>
					<p>We make every possible effort to prevent unfair trade practices and protect privacy rights. We strive to make selling and purchasing hassle-free for the veterinary community. Our support team is always available to assist you with any issues.</p>
					<h5>VetReps Finder: Designed for On-Demand Talent and Jobs</h5>
					<p>We focus on bringing together the best talent and connecting them with the right roles to help your business grow.</p>
					<p>Whether you are an Industry Professional, seeking an independent role or a Manufacturer in need of skilled representatives, VetReps Finder has you covered.</p>
					<p>Our platform connects industry professionals with job opportunities on demand, making the process smooth and efficient.</p>
					<p>VetReps Finder brings everything you need to one place.</p>
				</div>
			</div>
		</section>
	)
}

export default AboutUs

import React from 'react'
import styles from './FAQ.module.css'
import faqs from './why-sell-faq-data'
import Accordion from '../../../UI/Accordion/Accordion'
import Link from 'next/link'
import Image from 'next/image'
import interactIcon from '/public/imgs/sell-on-vetandtech/interact-icon.svg'
import successIcon from '/public/imgs/sell-on-vetandtech/succes-icon.svg'
import H2WithBorder from '../../../UI/H2WithBorder/H2WithBorder'

const FAQ = () => {
	return (
		<section className={`${styles.faq} sec-p`}>
			<div className='sec-container'>
				<div className={`${styles.heading_wrapper} heading_wrapper`}>
					<H2WithBorder text='Frequently Asked Questions' />
					<h4>Have Questions About Selling With Us?</h4>
					<p className='gray-color'>Our streamlined process will help you get started at DVM Central quickly. You can get answers to all your questions from us.</p>
				</div>

				<div className={`${styles.faqs_wrapper} inner-sec-mt`}>
					{faqs.map((faq, index) => {
						return (
							<Accordion key={index} index={index} question={faq.question}>
								<p className={styles.answer}>{faq.answer} </p>
							</Accordion>
						)
					})}

					<Link href='faqs'>
						<a className={styles.btn}>
							<button className='primary-btn'>View More</button>
						</a>
					</Link>
				</div>

				<div className={`${styles.heading2_wrapper} heading_wrapper inner-sec-pb`}>
					<H2WithBorder text='Still Have A Question' />
					<p className='gray-color'>
						If you cannot find the answer to your question in FAQ, you can always
						<Link href='/contact'>
							<a className={`${styles.contact_btn} link primary-color`}> contact us</a>
						</Link>
						, We will answer to you shortly!
					</p>
				</div>

				<div className={`${styles.inquiries_wrapper} inner-sec-pt`}>
					<div className={styles.inquiry_card}>
						<Image src={interactIcon} alt='Interact Directly With Your Customers' />
						<h5>Interact Directly With Your Customers</h5>
						<p className='gray-color'>{`We are promoting the culture of direct buying. Selling direct to clinics & customers online is simple now. Deal with the customers on your own terms.`}</p>
					</div>

					<div className={styles.inquiry_card}>
						<Image src={successIcon} alt='Professional Customer Service For Your Store' />
						<h5>Professional Customer Service For Your Store</h5>
						<p className='gray-color'>We have designed a dashboard to assist sellers in setting up and growing their business online. Sellers can get help by contacting us through online support.</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default FAQ

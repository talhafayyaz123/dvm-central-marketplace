import React from 'react'
import styles from './WhySell.module.css'
import whySellData from './why-sell-data'
import Image from 'next/image'
import H2WithBorder from '../../../UI/H2WithBorder/H2WithBorder'

const WhySell = () => {
	return (
		<section className={`${styles.container} why-sell sec-p`}>
			<div className='sec-container'>
				<div className={`${styles.heading_wrapper} heading_wrapper`}>
					<H2WithBorder text='Why Sell On DVM Central?' />
					<p className='gray-color'>
						DVM Central connects millions of buyers and sellers to leverage the power of business. We have a perfect combination of best-of-breed technology and a dedicated team to help you grow with us! We are bringing everyone under one roof with our single veterinary platform. This is your chance
						to showcase any animal health-related products for free and only pay when you sell.
					</p>
				</div>

				<div className={`${styles.why_sell_wrapper} inner-sec-mt`}>
					{whySellData.map((data, index) => {
						const { icon, title, info } = data
						return (
							<div key={index} className={styles.why_sell}>
								<div className={styles.icon_wrapper}>
									<Image src={icon} alt={title} />
								</div>
								<div className={styles.detail}>
									<h5 className={styles.title}>{title}</h5>
									<p className='gray-color'>{info}</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default WhySell

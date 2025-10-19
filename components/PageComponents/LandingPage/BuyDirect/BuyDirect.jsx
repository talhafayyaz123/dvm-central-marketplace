import Image from 'next/image'
import React from 'react'
import waveImg from '/public/landing-page/buy-instruments/wave.webp'
import styles from './BuyDirect.module.css'
import HeadingBoxes from '../HeadingBoxes/HeadingBoxes'
import ImgsSlide from './ImgsSlide/ImgsSlide'
import CategoryCard from '../../../UI/CategoryCard/CategoryCard'
import { imgApiUrl } from '../../../../utils/config'
import Link from 'next/link'

const BuyDirect = ({ topCategories }) => {
	return (
		<section id='buy-direct' className='buy-direct sec-p'>
			<div className={styles.wave_wrapper}>
				<Image src={waveImg} alt='VetandTech' />
			</div>
			<div className='sec-container'>
				<div className={styles.buy_direct_container}>
					<div className={styles.buy_direct_wrapper}>
						<div className={styles.text_container}>
							<h4 className='lp-sml-heading'>
								<HeadingBoxes />
								Buy Direct, Save More
							</h4>
							<h2 className='lp-heading-wrapper'>
								Buy Veterinary Supplies At The Right Price <span>From Leading Manufacturers</span>
							</h2>
						</div>
						<div className={`${styles.top_categoreis_inner_wrapper} inner-sec-mt`}>
							{topCategories.slice(2, 6).map((data) => {
								return <CategoryCard className={styles.lp_category_card} key={data.id} data={data} />
							})}
						</div>
						<Link href='#'>
							<a className='btn-mt'>
								<button className='gradient-btn'>
									<span>Shop Now</span>

									<svg xmlns='http://www.w3.org/2000/svg' width='19.625' height='18.092' viewBox='0 0 19.625 18.092'>
										<path id='Arrow' d='M10.444,18.092,8.285,15.975l7.026-6.924L8.285,2.128,10.446,0l9.18,9.046-9.18,9.046Zm-8.285,0h0L0,15.975,7.026,9.051,0,2.128,2.159,0l9.181,9.046L2.159,18.092Z' fill='#fff' />
									</svg>
								</button>
							</a>
						</Link>
					</div>

					<div className={styles.imgs_container}>
						<ImgsSlide />
					</div>
				</div>
			</div>
		</section>
	)
}

export default BuyDirect

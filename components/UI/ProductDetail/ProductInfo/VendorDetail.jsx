import Link from 'next/link'
import React from 'react'
import styles from './ProductInfo.module.css'

const VendorDetail = ({ sku, data, name, slug, quickFacts }) => {
	const brands = quickFacts?.filter((fact) => fact?.type === 'Brand Name')

	return (
		<div className={styles.vendor_wrapper}>
			<div className={styles.inner_wrapper}>
				<div>
					Sold By<span>:</span>
				</div>
				<div>
					<Link href={`vendors/${slug}`}>
						<h2 className='semibold-text'>
							<a className={`link ${styles.vendors_slug}`}> {name}</a>
						</h2>
					</Link>
				</div>
			</div>
			{sku !== null && (
				<div className={styles.inner_wrapper}>
					<div>
						SKU<span>:</span>
					</div>
					<h2 className='semibold-text'> {sku}</h2>
				</div>
			)}

			{brands?.length > 0 && (
				<div className={styles.inner_wrapper}>
					<div>
						Brands<span>:</span>
					</div>
					<div className={styles.brands_wrapper}>
						{brands?.map((brand, i) => (
							<h2 key={i} className='semibold-text'>
								<span className={styles.span_wrapper} key={brand?.id}>
									{brand?.name} {brands?.length > 0 && i < brands?.length - 1 ? <span className={styles.quote}>,</span> : ''}
								</span>
							</h2>
						))}
					</div>
				</div>
			)}

			{data?.length > 0 && (
				<div className={styles.inner_wrapper}>
					<div>
						Categories <span>:</span>
					</div>
					<div className={styles.categories_wrapper}>
						{data?.map((productCategory, index) => {
							const { slug, name } = productCategory

							return (
								<h2 key={index} className='semibold-text'>
									<Link href={`/${slug}`}>
										<a className={`${styles.product_category} primary-color`}>
											<div dangerouslySetInnerHTML={{ __html: name }} />
										</a>
									</Link>
								</h2>
							)
						})}
					</div>
				</div>
			)}

			{/* <div className={` ${styles.inner_wrapper} ${styles.social_links_container}`}>
				<div className='semibold-text'>Share :</div>
				<div className={styles.social_links_wrapper}>
					<a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
						<svg id='Group_141' data-name='Group 141' xmlns='http://www.w3.org/2000/svg' width='18.884' height='18.883' viewBox='0 0 18.884 18.883'>
							<path id='Rectangle_60' data-name='Rectangle 60' d='M9.442,0h0a9.442,9.442,0,0,1,9.442,9.442v0a9.442,9.442,0,0,1-9.442,9.442h0A9.442,9.442,0,0,1,0,9.442v0A9.442,9.442,0,0,1,9.442,0Z' transform='translate(0 0)' fill='#fff' />
							<path
								id='Path_62'
								data-name='Path 62'
								d='M161.308,147.447h2.3v-5.756h1.6l.171-1.927h-1.775v-1.1c0-.454.091-.634.531-.634h1.244v-2h-1.592c-1.71,0-2.481.753-2.481,2.195v1.537h-1.2v1.951h1.2Z'
								transform='translate(-153.305 -132.298)'
								fill='#a150e0'
							/>
						</svg>
					</a>
					<a href='https://twitter.com/' target='_blank' rel='noreferrer'>
						<svg id='Group_137' data-name='Group 137' xmlns='http://www.w3.org/2000/svg' width='18.884' height='18.883' viewBox='0 0 18.884 18.884'>
							<path
								id='Path_57'
								data-name='Path 57'
								d='M44.994,147.388h0a9.442,9.442,0,0,1-9.442-9.441h0a9.442,9.442,0,0,1,9.442-9.442h0a9.442,9.442,0,0,1,9.442,9.442h0A9.442,9.442,0,0,1,44.994,147.388Z'
								transform='translate(-35.552 -128.505)'
								fill='#fff'
							/>
							<path
								id='Path_58'
								data-name='Path 58'
								d='M44.444,146.545a5.871,5.871,0,0,0,9.031-5.213,4.184,4.184,0,0,0,1.029-1.069,4.117,4.117,0,0,1-1.185.325,2.067,2.067,0,0,0,.907-1.142,4.141,4.141,0,0,1-1.31.5A2.066,2.066,0,0,0,49.4,141.83a5.858,5.858,0,0,1-4.254-2.157,2.067,2.067,0,0,0,.639,2.756,2.058,2.058,0,0,1-.935-.258,2.067,2.067,0,0,0,1.656,2.051,2.067,2.067,0,0,1-.932.035A2.065,2.065,0,0,0,47.5,145.69,4.151,4.151,0,0,1,44.444,146.545Z'
								transform='translate(-40.032 -133.942)'
								fill='#a150e0'
							/>
						</svg>
					</a>
					<a href='https://www.linkedin.com/' target='_blank' rel='noreferrer'>
						<svg id='Group_140' data-name='Group 140' xmlns='http://www.w3.org/2000/svg' width='18.884' height='18.883' viewBox='0 0 18.884 18.883'>
							<path
								id='Path_59'
								data-name='Path 59'
								d='M100.729,201.313h0a9.442,9.442,0,0,1-9.442-9.441h0a9.442,9.442,0,0,1,9.442-9.442h0a9.442,9.442,0,0,1,9.442,9.442h0A9.442,9.442,0,0,1,100.729,201.313Z'
								transform='translate(-91.287 -182.43)'
								fill='#fff'
							/>
							<g id='Group_139' data-name='Group 139' transform='translate(4.973 4.181)'>
								<g id='Group_138' data-name='Group 138'>
									<rect id='Rectangle_59' data-name='Rectangle 59' width='1.954' height='6.313' transform='translate(0.188 3.156)' fill='#a052e1' />
									<path id='Path_60' data-name='Path 60' d='M102.466,193.186a1.165,1.165,0,1,0-1.156-1.165A1.161,1.161,0,0,0,102.466,193.186Z' transform='translate(-101.31 -190.857)' fill='#a052e1' />
								</g>
								<path
									id='Path_61'
									data-name='Path 61'
									d='M110.019,200.022c0-.887.408-1.416,1.191-1.416.718,0,1.064.508,1.064,1.416v3.314h1.945v-4a2.289,2.289,0,0,0-4.2-1.466v-.85h-1.874v6.312h1.874Z'
									transform='translate(-104.754 -193.867)'
									fill='#a052e1'
								/>
							</g>
						</svg>
					</a>
					<a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
						<svg id='Group_143' data-name='Group 143' xmlns='http://www.w3.org/2000/svg' width='18.884' height='18.884' viewBox='0 0 18.884 18.884'>
							<path
								id='Path_63'
								data-name='Path 63'
								d='M211.568,147.388h0a9.442,9.442,0,0,1-9.442-9.441h0a9.442,9.442,0,0,1,9.442-9.442h0a9.442,9.442,0,0,1,9.442,9.442h0A9.442,9.442,0,0,1,211.568,147.388Z'
								transform='translate(-202.126 -128.505)'
								fill='#fff'
							/>
							<g id='Group_142' data-name='Group 142' transform='translate(4.265 4.265)'>
								<path
									id='Path_64'
									data-name='Path 64'
									d='M215.9,138.034c1.382,0,1.546.005,2.092.03a2.869,2.869,0,0,1,.961.179,1.711,1.711,0,0,1,.982.982,2.869,2.869,0,0,1,.179.961c.025.546.03.71.03,2.092s-.005,1.546-.03,2.092a2.869,2.869,0,0,1-.179.962,1.711,1.711,0,0,1-.982.982,2.859,2.859,0,0,1-.961.178c-.546.025-.71.03-2.092.03s-1.546-.005-2.092-.03a2.863,2.863,0,0,1-.962-.178,1.715,1.715,0,0,1-.982-.982,2.859,2.859,0,0,1-.178-.962c-.025-.546-.03-.709-.03-2.092s.005-1.546.03-2.092a2.859,2.859,0,0,1,.178-.961,1.715,1.715,0,0,1,.982-.982,2.873,2.873,0,0,1,.962-.179c.546-.025.709-.03,2.092-.03m0-.933c-1.406,0-1.582.006-2.134.031a3.806,3.806,0,0,0-1.257.241,2.647,2.647,0,0,0-1.514,1.514,3.79,3.79,0,0,0-.241,1.257c-.025.552-.031.728-.031,2.134s.006,1.582.031,2.134a3.79,3.79,0,0,0,.241,1.257,2.647,2.647,0,0,0,1.514,1.514,3.819,3.819,0,0,0,1.257.241c.552.025.728.031,2.134.031s1.582-.006,2.134-.031a3.817,3.817,0,0,0,1.257-.241,2.65,2.65,0,0,0,1.514-1.514,3.8,3.8,0,0,0,.241-1.257c.025-.552.031-.728.031-2.134s-.006-1.582-.031-2.134a3.8,3.8,0,0,0-.241-1.257,2.65,2.65,0,0,0-1.514-1.514,3.8,3.8,0,0,0-1.257-.241c-.552-.025-.728-.031-2.134-.031'
									transform='translate(-210.722 -137.101)'
									fill='#a152e1'
								/>
								<path
									id='Path_65'
									data-name='Path 65'
									d='M218.456,142.178a2.658,2.658,0,1,0,2.658,2.658,2.658,2.658,0,0,0-2.658-2.658m0,4.384a1.726,1.726,0,1,1,1.726-1.726,1.725,1.725,0,0,1-1.726,1.726'
									transform='translate(-213.28 -139.659)'
									fill='#a152e1'
								/>
								<path id='Path_66' data-name='Path 66' d='M226.716,141.335a.621.621,0,1,1-.621-.621.621.621,0,0,1,.621.621' transform='translate(-218.155 -138.921)' fill='#a152e1' />
							</g>
						</svg>
					</a>
				</div>
			</div> */}
		</div>
	)
}

export default VendorDetail

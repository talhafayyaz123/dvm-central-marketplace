import React from 'react'
import Image from 'next/image'
import styles from './LPFindUs.module.css'
import lpLogo from '../../../../../../public/icons/lp-logo.svg'

const LpFindUs = () => {
	return (
		<div className='footer-find-us gray-color'>
			<div className={styles.logo_wrapper}>
				<Image src={lpLogo} alt='VetandTech' />
			</div>
			<ul>
				<li>
					<address>1201 North Market Street, Suite 111, Wilmington, DE 19801</address>
				</li>
				<li>
					{/* social links */}
					<ul className={styles.lp_social_links}>
						<li>
							<a href='https://www.facebook.com/likegervetusa/' target='_blank' rel='noreferrer'>
								<svg id='Group_141' data-name='Group 141' xmlns='http://www.w3.org/2000/svg' width='31.278' height='31.278' viewBox='0 0 31.278 31.278'>
									<path
										id='Rectangle_60'
										data-name='Rectangle 60'
										d='M15.639,0h0A15.639,15.639,0,0,1,31.278,15.639v0A15.639,15.639,0,0,1,15.64,31.278h0A15.639,15.639,0,0,1,0,15.639v0A15.639,15.639,0,0,1,15.639,0Z'
										transform='translate(0 0)'
										fill='#fff'
									/>
									<path
										id='Path_62'
										data-name='Path 62'
										d='M162.093,154.939H165.9v-9.534h2.657l.283-3.192H165.9V140.4c0-.753.151-1.05.879-1.05h2.06v-3.313H166.2c-2.833,0-4.11,1.247-4.11,3.636v2.545h-1.981v3.232h1.981Z'
										transform='translate(-148.836 -129.847)'
										fill='#a150e0'
									/>
								</svg>
							</a>
						</li>

						<li>
							<a href='https://twitter.com/GerVetUSA' target='_blank' rel='noreferrer'>
								<svg id='Group_137' data-name='Group 137' xmlns='http://www.w3.org/2000/svg' width='31.279' height='31.278' viewBox='0 0 31.279 31.278'>
									<path
										id='Path_57'
										data-name='Path 57'
										d='M51.192,159.783h0a15.639,15.639,0,0,1-15.64-15.639h0a15.64,15.64,0,0,1,15.64-15.639h0a15.64,15.64,0,0,1,15.64,15.639h0A15.639,15.639,0,0,1,51.192,159.783Z'
										transform='translate(-35.552 -128.505)'
										fill='#fff'
									/>
									<path
										id='Path_58'
										data-name='Path 58'
										d='M44.444,151.3A9.724,9.724,0,0,0,59.4,142.669a6.93,6.93,0,0,0,1.705-1.77,6.818,6.818,0,0,1-1.963.538,3.424,3.424,0,0,0,1.5-1.892,6.859,6.859,0,0,1-2.17.83,3.422,3.422,0,0,0-5.827,3.119,9.7,9.7,0,0,1-7.047-3.572,3.423,3.423,0,0,0,1.058,4.565,3.408,3.408,0,0,1-1.549-.428,3.424,3.424,0,0,0,2.742,3.4,3.423,3.423,0,0,1-1.543.058,3.42,3.42,0,0,0,3.194,2.375A6.875,6.875,0,0,1,44.444,151.3Z'
										transform='translate(-37.137 -130.428)'
										fill='#a150e0'
									/>
								</svg>
							</a>
						</li>

						<li>
							<a href='https://www.linkedin.com/company/gervetusa' target='_blank' rel='noreferrer'>
								<svg id='Group_140' data-name='Group 140' xmlns='http://www.w3.org/2000/svg' width='31.278' height='31.278' viewBox='0 0 31.278 31.278'>
									<path
										id='Path_59'
										data-name='Path 59'
										d='M106.927,213.708h0a15.639,15.639,0,0,1-15.64-15.639h0a15.639,15.639,0,0,1,15.64-15.639h0a15.639,15.639,0,0,1,15.639,15.639h0A15.639,15.639,0,0,1,106.927,213.708Z'
										transform='translate(-91.287 -182.43)'
										fill='#fff'
									/>
									<g id='Group_139' data-name='Group 139' transform='translate(8.237 6.925)'>
										<g id='Group_138' data-name='Group 138'>
											<rect id='Rectangle_59' data-name='Rectangle 59' width='3.237' height='10.456' transform='translate(0.311 5.228)' fill='#a052e1' />
											<path id='Path_60' data-name='Path 60' d='M103.224,194.715a1.929,1.929,0,1,0-1.914-1.93A1.922,1.922,0,0,0,103.224,194.715Z' transform='translate(-101.31 -190.857)' fill='#a052e1' />
										</g>
										<path
											id='Path_61'
											data-name='Path 61'
											d='M111.25,202.117c0-1.469.676-2.345,1.972-2.345,1.19,0,1.762.841,1.762,2.345v5.489h3.221v-6.62c0-2.8-1.588-4.155-3.8-4.155a3.645,3.645,0,0,0-3.151,1.727V197.15h-3.1v10.456h3.1Z'
											transform='translate(-102.528 -191.921)'
											fill='#a052e1'
										/>
									</g>
								</svg>
							</a>
						</li>

						<li>
							<a href='https://www.instagram.com/gervetusa/' target='_blank' rel='noreferrer'>
								<svg id='Group_143' data-name='Group 143' xmlns='http://www.w3.org/2000/svg' width='31.278' height='31.278' viewBox='0 0 31.278 31.278'>
									<path
										id='Path_63'
										data-name='Path 63'
										d='M217.765,159.783h0a15.639,15.639,0,0,1-15.639-15.639h0a15.639,15.639,0,0,1,15.639-15.639h0a15.639,15.639,0,0,1,15.64,15.639h0A15.639,15.639,0,0,1,217.765,159.783Z'
										transform='translate(-202.126 -128.505)'
										fill='#fff'
									/>
									<g id='Group_142' data-name='Group 142' transform='translate(7.064 7.064)'>
										<path
											id='Path_64'
											data-name='Path 64'
											d='M219.3,138.646c2.29,0,2.561.009,3.466.05a4.751,4.751,0,0,1,1.592.3,2.834,2.834,0,0,1,1.627,1.627,4.751,4.751,0,0,1,.3,1.592c.041.9.05,1.176.05,3.465s-.009,2.561-.05,3.465a4.752,4.752,0,0,1-.3,1.593,2.834,2.834,0,0,1-1.627,1.627,4.735,4.735,0,0,1-1.592.3c-.9.041-1.175.05-3.466.05s-2.561-.009-3.465-.05a4.741,4.741,0,0,1-1.593-.3,2.84,2.84,0,0,1-1.627-1.627,4.737,4.737,0,0,1-.3-1.593c-.041-.9-.05-1.175-.05-3.465s.009-2.561.05-3.465a4.735,4.735,0,0,1,.3-1.592,2.84,2.84,0,0,1,1.627-1.627,4.758,4.758,0,0,1,1.593-.3c.9-.041,1.175-.05,3.465-.05m0-1.545c-2.329,0-2.621.011-3.535.052a6.3,6.3,0,0,0-2.082.4,4.385,4.385,0,0,0-2.507,2.508,6.279,6.279,0,0,0-.4,2.082c-.042.915-.052,1.206-.052,3.535s.01,2.621.052,3.535a6.279,6.279,0,0,0,.4,2.082,4.385,4.385,0,0,0,2.507,2.508,6.326,6.326,0,0,0,2.082.4c.915.041,1.206.051,3.535.051s2.621-.01,3.535-.051a6.322,6.322,0,0,0,2.082-.4,4.39,4.39,0,0,0,2.508-2.508,6.3,6.3,0,0,0,.4-2.082c.042-.915.052-1.206.052-3.535s-.01-2.621-.052-3.535a6.3,6.3,0,0,0-.4-2.082,4.389,4.389,0,0,0-2.508-2.508,6.3,6.3,0,0,0-2.082-.4c-.915-.041-1.206-.052-3.535-.052'
											transform='translate(-210.722 -137.101)'
											fill='#a152e1'
										/>
										<path
											id='Path_65'
											data-name='Path 65'
											d='M220.2,142.178a4.4,4.4,0,1,0,4.4,4.4,4.4,4.4,0,0,0-4.4-4.4m0,7.261a2.858,2.858,0,1,1,2.858-2.858,2.858,2.858,0,0,1-2.858,2.858'
											transform='translate(-211.627 -138.006)'
											fill='#a152e1'
										/>
										<path id='Path_66' data-name='Path 66' d='M227.532,141.743a1.029,1.029,0,1,1-1.029-1.029,1.029,1.029,0,0,1,1.029,1.029' transform='translate(-213.351 -137.745)' fill='#a152e1' />
									</g>
								</svg>
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	)
}

export default LpFindUs

import React from 'react'
import styles from './SocialLinks.module.css'
import NewTwitterIcon from '../NewTwitterIcon/NewTwitterIcon'

const SocialLinks = ({ fbShare, linkedInShare, twitterShare, linkedin_title, type, blog_name, className = '' }) => {
	return (
		<ul className={`${styles.social_links_wrapper} ${className}`}>
			{type === 'social-share' && (
				<li>
					<a className={`${styles.mail} transition`} href={`mailto:?subject=${blog_name}&body=Enter something`} target='_blank' rel='noreferrer' aria-label='email'>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' strokeWidth={1} stroke='var(--primary)' fill={type === 'social-share' ? 'var(--primary)' : 'var(--white'}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
								fill={type === 'social-share' ? 'var(--white)' : 'var(--primary)'}
							/>
						</svg>
					</a>
				</li>
			)}

			<li>
				<a className='transition' href={fbShare ? `https://www.facebook.com/sharer/sharer.php?u=${fbShare}` : 'https://www.facebook.com/dvmcentralofficial'} target='_blank' rel='noreferrer' aria-label='Visit our Facebook page'>
					<svg id='Group_141' data-name='Group 141' xmlns='http://www.w3.org/2000/svg' width='31.278' height='31.278' viewBox='0 0 31.278 31.278'>
						<path
							id='Rectangle_60'
							data-name='Rectangle 60'
							d='M15.639,0h0A15.639,15.639,0,0,1,31.278,15.639v0A15.639,15.639,0,0,1,15.64,31.278h0A15.639,15.639,0,0,1,0,15.639v0A15.639,15.639,0,0,1,15.639,0Z'
							transform='translate(0 0)'
							fill={type === 'social-share' ? 'var(--primary)' : 'var(--white'}
						/>
						<path
							id='Path_62'
							data-name='Path 62'
							d='M162.093,154.939H165.9v-9.534h2.657l.283-3.192H165.9V140.4c0-.753.151-1.05.879-1.05h2.06v-3.313H166.2c-2.833,0-4.11,1.247-4.11,3.636v2.545h-1.981v3.232h1.981Z'
							transform='translate(-148.836 -129.847)'
							fill={type === 'social-share' ? 'var(--white)' : 'var(--primary)'}
						/>
					</svg>
				</a>
			</li>

			<li>
				<NewTwitterIcon type={type} twitterShare={twitterShare} />
			</li>

			<li>
				<a className='transition' href={linkedInShare ? `https://www.linkedin.com/shareArticle?url=${linkedInShare}&title=${linkedin_title}` : 'https://www.linkedin.com/company/89801794/admin/'} target='_blank' rel='noreferrer' aria-label='Visit our Linkedin page'>
					<svg id='Group_140' data-name='Group 140' xmlns='http://www.w3.org/2000/svg' width='31.278' height='31.278' viewBox='0 0 31.278 31.278'>
						<path
							id='Path_59'
							data-name='Path 59'
							d='M106.927,213.708h0a15.639,15.639,0,0,1-15.64-15.639h0a15.639,15.639,0,0,1,15.64-15.639h0a15.639,15.639,0,0,1,15.639,15.639h0A15.639,15.639,0,0,1,106.927,213.708Z'
							transform='translate(-91.287 -182.43)'
							fill={type === 'social-share' ? 'var(--primary)' : 'var(--white'}
						/>
						<g id='Group_139' data-name='Group 139' transform='translate(8.237 6.925)'>
							<g id='Group_138' data-name='Group 138'>
								<rect id='Rectangle_59' data-name='Rectangle 59' width='3.237' height='10.456' transform='translate(0.311 5.228)' fill={type === 'social-share' ? 'var(--white)' : '#a150e0'} />
								<path id='Path_60' data-name='Path 60' d='M103.224,194.715a1.929,1.929,0,1,0-1.914-1.93A1.922,1.922,0,0,0,103.224,194.715Z' transform='translate(-101.31 -190.857)' fill={type === 'social-share' ? 'var(--white)' : '#a150e0'} />
							</g>
							<path
								id='Path_61'
								data-name='Path 61'
								d='M111.25,202.117c0-1.469.676-2.345,1.972-2.345,1.19,0,1.762.841,1.762,2.345v5.489h3.221v-6.62c0-2.8-1.588-4.155-3.8-4.155a3.645,3.645,0,0,0-3.151,1.727V197.15h-3.1v10.456h3.1Z'
								transform='translate(-102.528 -191.921)'
								fill={type === 'social-share' ? 'var(--white)' : '#a150e0'}
							/>
						</g>
					</svg>
				</a>
			</li>

			{type !== 'social-share' && (
				<>
					<li>
						<a className='transition' href='https://www.instagram.com/dvmcentralofficial/' target='_blank' rel='noreferrer' aria-label='Visit our Instagram page'>
							<svg id='Group_143' data-name='Group 143' xmlns='http://www.w3.org/2000/svg' width='31.278' height='31.278' viewBox='0 0 31.278 31.278'>
								<path
									id='Path_63'
									data-name='Path 63'
									d='M217.765,159.783h0a15.639,15.639,0,0,1-15.639-15.639h0a15.639,15.639,0,0,1,15.639-15.639h0a15.639,15.639,0,0,1,15.64,15.639h0A15.639,15.639,0,0,1,217.765,159.783Z'
									transform='translate(-202.126 -128.505)'
									fill={type === 'social-share' ? 'var(--primary)' : 'var(--white'}
								/>
								<g id='Group_142' data-name='Group 142' transform='translate(7.064 7.064)'>
									<path
										id='Path_64'
										data-name='Path 64'
										d='M219.3,138.646c2.29,0,2.561.009,3.466.05a4.751,4.751,0,0,1,1.592.3,2.834,2.834,0,0,1,1.627,1.627,4.751,4.751,0,0,1,.3,1.592c.041.9.05,1.176.05,3.465s-.009,2.561-.05,3.465a4.752,4.752,0,0,1-.3,1.593,2.834,2.834,0,0,1-1.627,1.627,4.735,4.735,0,0,1-1.592.3c-.9.041-1.175.05-3.466.05s-2.561-.009-3.465-.05a4.741,4.741,0,0,1-1.593-.3,2.84,2.84,0,0,1-1.627-1.627,4.737,4.737,0,0,1-.3-1.593c-.041-.9-.05-1.175-.05-3.465s.009-2.561.05-3.465a4.735,4.735,0,0,1,.3-1.592,2.84,2.84,0,0,1,1.627-1.627,4.758,4.758,0,0,1,1.593-.3c.9-.041,1.175-.05,3.465-.05m0-1.545c-2.329,0-2.621.011-3.535.052a6.3,6.3,0,0,0-2.082.4,4.385,4.385,0,0,0-2.507,2.508,6.279,6.279,0,0,0-.4,2.082c-.042.915-.052,1.206-.052,3.535s.01,2.621.052,3.535a6.279,6.279,0,0,0,.4,2.082,4.385,4.385,0,0,0,2.507,2.508,6.326,6.326,0,0,0,2.082.4c.915.041,1.206.051,3.535.051s2.621-.01,3.535-.051a6.322,6.322,0,0,0,2.082-.4,4.39,4.39,0,0,0,2.508-2.508,6.3,6.3,0,0,0,.4-2.082c.042-.915.052-1.206.052-3.535s-.01-2.621-.052-3.535a6.3,6.3,0,0,0-.4-2.082,4.389,4.389,0,0,0-2.508-2.508,6.3,6.3,0,0,0-2.082-.4c-.915-.041-1.206-.052-3.535-.052'
										transform='translate(-210.722 -137.101)'
										fill='#a152e1'
									/>
									<path id='Path_65' data-name='Path 65' d='M220.2,142.178a4.4,4.4,0,1,0,4.4,4.4,4.4,4.4,0,0,0-4.4-4.4m0,7.261a2.858,2.858,0,1,1,2.858-2.858,2.858,2.858,0,0,1-2.858,2.858' transform='translate(-211.627 -138.006)' fill='#a152e1' />
									<path id='Path_66' data-name='Path 66' d='M227.532,141.743a1.029,1.029,0,1,1-1.029-1.029,1.029,1.029,0,0,1,1.029,1.029' transform='translate(-213.351 -137.745)' fill='#a152e1' />
								</g>
							</svg>
						</a>
					</li>

					<li>
						<a className={`${styles.youtube_icon} white-bg transition full-radius`} href='https://www.youtube.com/@dvmcentral' target='_blank' rel='noreferrer' aria-label='Visit our Youtube page'>
							<svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width={25} height={25} viewBox='0 0 25 25'>
								<defs>
									<clipPath id='b'>
										<rect width={25} height={25} />
									</clipPath>
								</defs>
								<g id='a' clipPath='url(#b)'>
									<path
										d='M24.018,7.081a2.948,2.948,0,0,0-2.074-2.087C20.114,4.5,12.779,4.5,12.779,4.5s-7.335,0-9.165.493A2.948,2.948,0,0,0,1.54,7.081a30.921,30.921,0,0,0-.49,5.683,30.921,30.921,0,0,0,.49,5.683A2.9,2.9,0,0,0,3.614,20.5c1.829.493,9.165.493,9.165.493s7.335,0,9.165-.493a2.9,2.9,0,0,0,2.074-2.054,30.921,30.921,0,0,0,.49-5.683,30.921,30.921,0,0,0-.49-5.683ZM10.38,16.251V9.276l6.131,3.488L10.38,16.251Z'
										transform='translate(-0.283 -0.11)'
										fill='#a152e1'
									/>
								</g>
							</svg>
						</a>
					</li>
				</>
			)}
		</ul>
	)
}

export default SocialLinks

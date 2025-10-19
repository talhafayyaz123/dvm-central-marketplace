import React, { useContext } from 'react'
import Link from 'next/link'
import styles from './Topbar.module.css'
import { GlobalProvider } from '../../../context/AppProvider'
import NewTwitterIcon from '../../UI/NewTwitterIcon/NewTwitterIcon'

const Topbar = () => {
	const { userAccountConfirmedStatus, loginUser } = useContext(GlobalProvider)

	return (
		<div className={styles.top_bar_container}>
			<div className={`${styles.top_bar_wrapper} sec-container`}>
				<div className={styles.social_links_wrapper}>
					<a href='https://www.facebook.com/dvmcentralofficial' target='_blank' rel='noreferrer' aria-label='Visit our Facebook page'>
						<svg id='Group_141' data-name='Group 141' xmlns='http://www.w3.org/2000/svg' width='18.884' height='18.883' viewBox='0 0 18.884 18.883'>
							<path id='Rectangle_60' data-name='Rectangle 60' d='M9.442,0h0a9.442,9.442,0,0,1,9.442,9.442v0a9.442,9.442,0,0,1-9.442,9.442h0A9.442,9.442,0,0,1,0,9.442v0A9.442,9.442,0,0,1,9.442,0Z' transform='translate(0 0)' fill='#fff' />
							<path id='Path_62' data-name='Path 62' d='M161.308,147.447h2.3v-5.756h1.6l.171-1.927h-1.775v-1.1c0-.454.091-.634.531-.634h1.244v-2h-1.592c-1.71,0-2.481.753-2.481,2.195v1.537h-1.2v1.951h1.2Z' transform='translate(-153.305 -132.298)' fill='#a150e0' />
						</svg>
					</a>
					<NewTwitterIcon className={styles.twitter_icon} />
					<a href='https://www.linkedin.com/company/89801794/admin/' target='_blank' rel='noreferrer' aria-label='Visit our Linkedin page'>
						<svg id='Group_140' data-name='Group 140' xmlns='http://www.w3.org/2000/svg' width='18.884' height='18.883' viewBox='0 0 18.884 18.883'>
							<path id='Path_59' data-name='Path 59' d='M100.729,201.313h0a9.442,9.442,0,0,1-9.442-9.441h0a9.442,9.442,0,0,1,9.442-9.442h0a9.442,9.442,0,0,1,9.442,9.442h0A9.442,9.442,0,0,1,100.729,201.313Z' transform='translate(-91.287 -182.43)' fill='#fff' />
							<g id='Group_139' data-name='Group 139' transform='translate(4.973 4.181)'>
								<g id='Group_138' data-name='Group 138'>
									<rect id='Rectangle_59' data-name='Rectangle 59' width='1.954' height='6.313' transform='translate(0.188 3.156)' fill='#a052e1' />
									<path id='Path_60' data-name='Path 60' d='M102.466,193.186a1.165,1.165,0,1,0-1.156-1.165A1.161,1.161,0,0,0,102.466,193.186Z' transform='translate(-101.31 -190.857)' fill='#a052e1' />
								</g>
								<path id='Path_61' data-name='Path 61' d='M110.019,200.022c0-.887.408-1.416,1.191-1.416.718,0,1.064.508,1.064,1.416v3.314h1.945v-4a2.289,2.289,0,0,0-4.2-1.466v-.85h-1.874v6.312h1.874Z' transform='translate(-104.754 -193.867)' fill='#a052e1' />
							</g>
						</svg>
					</a>
					<a href='https://www.instagram.com/dvmcentralofficial/' target='_blank' rel='noreferrer' aria-label='Visit our Instagram page'>
						<svg id='Group_143' data-name='Group 143' xmlns='http://www.w3.org/2000/svg' width='18.884' height='18.884' viewBox='0 0 18.884 18.884'>
							<path id='Path_63' data-name='Path 63' d='M211.568,147.388h0a9.442,9.442,0,0,1-9.442-9.441h0a9.442,9.442,0,0,1,9.442-9.442h0a9.442,9.442,0,0,1,9.442,9.442h0A9.442,9.442,0,0,1,211.568,147.388Z' transform='translate(-202.126 -128.505)' fill='#fff' />
							<g id='Group_142' data-name='Group 142' transform='translate(4.265 4.265)'>
								<path
									id='Path_64'
									data-name='Path 64'
									d='M215.9,138.034c1.382,0,1.546.005,2.092.03a2.869,2.869,0,0,1,.961.179,1.711,1.711,0,0,1,.982.982,2.869,2.869,0,0,1,.179.961c.025.546.03.71.03,2.092s-.005,1.546-.03,2.092a2.869,2.869,0,0,1-.179.962,1.711,1.711,0,0,1-.982.982,2.859,2.859,0,0,1-.961.178c-.546.025-.71.03-2.092.03s-1.546-.005-2.092-.03a2.863,2.863,0,0,1-.962-.178,1.715,1.715,0,0,1-.982-.982,2.859,2.859,0,0,1-.178-.962c-.025-.546-.03-.709-.03-2.092s.005-1.546.03-2.092a2.859,2.859,0,0,1,.178-.961,1.715,1.715,0,0,1,.982-.982,2.873,2.873,0,0,1,.962-.179c.546-.025.709-.03,2.092-.03m0-.933c-1.406,0-1.582.006-2.134.031a3.806,3.806,0,0,0-1.257.241,2.647,2.647,0,0,0-1.514,1.514,3.79,3.79,0,0,0-.241,1.257c-.025.552-.031.728-.031,2.134s.006,1.582.031,2.134a3.79,3.79,0,0,0,.241,1.257,2.647,2.647,0,0,0,1.514,1.514,3.819,3.819,0,0,0,1.257.241c.552.025.728.031,2.134.031s1.582-.006,2.134-.031a3.817,3.817,0,0,0,1.257-.241,2.65,2.65,0,0,0,1.514-1.514,3.8,3.8,0,0,0,.241-1.257c.025-.552.031-.728.031-2.134s-.006-1.582-.031-2.134a3.8,3.8,0,0,0-.241-1.257,2.65,2.65,0,0,0-1.514-1.514,3.8,3.8,0,0,0-1.257-.241c-.552-.025-.728-.031-2.134-.031'
									transform='translate(-210.722 -137.101)'
									fill='#a152e1'
								/>
								<path id='Path_65' data-name='Path 65' d='M218.456,142.178a2.658,2.658,0,1,0,2.658,2.658,2.658,2.658,0,0,0-2.658-2.658m0,4.384a1.726,1.726,0,1,1,1.726-1.726,1.725,1.725,0,0,1-1.726,1.726' transform='translate(-213.28 -139.659)' fill='#a152e1' />
								<path id='Path_66' data-name='Path 66' d='M226.716,141.335a.621.621,0,1,1-.621-.621.621.621,0,0,1,.621.621' transform='translate(-218.155 -138.921)' fill='#a152e1' />
							</g>
						</svg>
					</a>

					<a className={`${styles.youtube_icon} white-bg full-radius`} href='https://www.youtube.com/@dvmcentral' target='_blank' rel='noreferrer' aria-label='Visit our Youtube page'>
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
				</div>
				{loginUser?.id !== undefined && userAccountConfirmedStatus !== 1 && (
					<div className={styles.font_color}>
						<p>
							Your Account is not confirmed.
							<span>
								<Link href='/contact'>
									<a className={styles.support_message}>
										<span>
											<u>Contact Support</u>
										</span>
									</a>
								</Link>
							</span>
						</p>
					</div>
				)}

				{/* <Link href='/track-order'>
					<a className={styles.track_order_wrapper}>
						<svg id='Menu' xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21' className='transition'>
							<g id='iconspace_Logistic_Truck_25px' data-name='iconspace_Logistic Truck_25px'>
								<path id='Path' d='M0,0H21V21H0Z' fill='none' />
								<path
									id='Combined_Shape'
									data-name='Combined Shape'
									d='M11.76,12.18a2.1,2.1,0,1,1,2.1,2.1A2.1,2.1,0,0,1,11.76,12.18Zm-9.24,0a2.1,2.1,0,1,1,2.1,2.1A2.1,2.1,0,0,1,2.52,12.18Zm-.811-.419H1.26A1.261,1.261,0,0,1,0,10.5V9.66A1.261,1.261,0,0,1,1.26,8.4h8.892a1.258,1.258,0,0,1-.072-.42V2.1A1.261,1.261,0,0,1,11.34.84a1.206,1.206,0,0,1,.181.013l4.36.633a1.257,1.257,0,0,1,1.042.947l.022.087H14.7a1.261,1.261,0,0,0-1.26,1.26V5.459a1.261,1.261,0,0,0,1.26,1.26h2.94v1.26a1.26,1.26,0,0,1-.321.841,1.256,1.256,0,0,1,.321.84v.84a1.254,1.254,0,0,1-.878,1.2,2.941,2.941,0,0,0-5.812.058H7.53a2.94,2.94,0,0,0-5.82,0h0ZM0,7.56V1.26A1.26,1.26,0,0,1,1.26,0h8.4a1.253,1.253,0,0,1,.725.23A2.1,2.1,0,0,0,9.24,2.1V7.56ZM17.639,5.88H14.7a.42.42,0,0,1-.419-.42V3.78a.421.421,0,0,1,.419-.42H17.15L17.6,5.2a1.3,1.3,0,0,1,.036.3v.375h0Z'
									transform='translate(1.68 3.36)'
									fill='#fff'
								/>
							</g>
						</svg>

						<div className='white-color transition'>Track Order</div>
					</a>
				</Link> */}
				<a href='tel:+14075576073' className={styles.call_icon_wrapper}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--white)' className='transition'>
						<path
							fillRule='evenodd'
							d='M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z'
							clipRule='evenodd'
						/>
					</svg>

					<span className='white-color transition'>+1 (407)-557 6073</span>
				</a>
			</div>
		</div>
	)
}

export default Topbar

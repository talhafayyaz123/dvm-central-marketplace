import React, { useEffect, useState, lazy, Suspense } from 'react'
import style from '../../Home-v2/Hero/Hero.module.css'
import 'swiper/css/navigation'
import styles from '../Hero/Hero.module.css'
import dynamic from 'next/dynamic'
// import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
// import VetHeading from '../../../UI/VetHeading/VetHeading'
import HeroImg from '/public/imgs/hero-slider/hero-banner-1.png'
import HeroImg1 from '/public/imgs/hero-slider/hero-banner.png'
import mobilebanner2 from '/public/imgs/hero-slider/mobile-banner.png'
import mobilebanenr1 from '/public/imgs/hero-slider/mobile-banner-2.png'


const ImgWithLoaderDynamic = dynamic(() => import('../../../UI/ImgWithLoader/ImgWithLoader'), {
	loading: () => <div className={styles.img_placeholder} />
})

const VetHeadingDynamic = dynamic(() => import('../../../UI/VetHeading/VetHeading'), {
	ssr: false
})


const VetIcon = () => (
	<svg width="40" height="40" viewBox="0 0 40 40" fill="none">
		<path d="M7.35434 25.3192C6.23714 25.9642 5.07016 26.1237 3.85339 25.7976C2.63662 25.4716 1.70573 24.75 1.06072 23.6328C0.4157 22.5156 0.256208 21.3486 0.58224 20.1318C0.908272 18.9151 1.62989 17.9842 2.74709 17.3392C3.86429 16.6941 5.03127 16.5347 6.24804 16.8607C7.4648 17.1867 8.39569 17.9083 9.04071 19.0255C9.68572 20.1427 9.84522 21.3097 9.51918 22.5265C9.19315 23.7432 8.47154 24.6741 7.35434 25.3192ZM10.8505 14.7886C9.73333 15.4336 8.56635 15.5931 7.34958 15.2671C6.13281 14.9411 5.20192 14.2195 4.55691 13.1023C3.91189 11.9851 3.7524 10.8181 4.07843 9.60131C4.40446 8.38454 5.12608 7.45365 6.24328 6.80864C7.36048 6.16362 8.52746 6.00413 9.74423 6.33016C10.961 6.65619 11.8919 7.37781 12.5369 8.49501C13.1819 9.61221 13.3414 10.7792 13.0154 11.996C12.6893 13.2127 11.9677 14.1436 10.8505 14.7886ZM20.4265 9.25993C19.3093 9.90494 18.1423 10.0644 16.9256 9.7384C15.7088 9.41237 14.7779 8.69076 14.1329 7.57356C13.4879 6.45636 13.3284 5.28938 13.6544 4.07261C13.9805 2.85584 14.7021 1.92495 15.8193 1.27994C16.9365 0.63492 18.1035 0.475429 19.3202 0.80146C20.537 1.12749 21.4679 1.84911 22.1129 2.96631C22.7579 4.0835 22.9174 5.25049 22.5914 6.46726C22.2653 7.68402 21.5437 8.61491 20.4265 9.25993ZM31.2943 11.4974C30.1771 12.1424 29.0101 12.3019 27.7934 11.9759C26.5766 11.6498 25.6457 10.9282 25.0007 9.81103C24.3557 8.69383 24.1962 7.52684 24.5222 6.31008C24.8483 5.09331 25.5699 4.16242 26.6871 3.5174C27.8043 2.87239 28.9712 2.7129 30.188 3.03893C31.4048 3.36496 32.3357 4.08658 32.9807 5.20377C33.6257 6.32097 33.7852 7.48796 33.4592 8.70472C33.1331 9.92149 32.4115 10.8524 31.2943 11.4974ZM20.0002 39.298C18.8032 39.9891 17.5338 40.1099 16.1918 39.6604C14.8498 39.2108 13.8191 38.3617 13.0996 37.1131C12.301 35.7299 12.0746 34.2468 12.4205 32.6639C12.7664 31.081 13.1125 29.5157 13.4589 27.968C13.7542 26.6981 13.901 25.4166 13.8994 24.1238C13.8977 22.8309 14.0366 21.5356 14.3159 20.238C14.5018 19.2085 14.8499 18.245 15.3603 17.3475C15.8706 16.4499 16.5776 15.7395 17.4814 15.2163C18.3858 14.6941 19.3466 14.4232 20.3637 14.4034C21.3808 14.3836 22.3816 14.5506 23.3661 14.9043C24.6024 15.3255 25.7908 15.863 26.9315 16.5167C28.0721 17.1704 29.2734 17.7005 30.5351 18.1069C32.0497 18.5802 33.5784 19.0631 35.1211 19.5556C36.6638 20.0481 37.835 20.9857 38.6346 22.3683C39.3564 23.6185 39.5765 24.937 39.2948 26.324C39.0131 27.7109 38.274 28.7491 37.0774 29.4385C35.641 30.2678 34.1488 30.9697 32.6008 31.5443C31.0528 32.1188 29.5606 32.8208 28.1242 33.6501C26.6878 34.4794 25.3338 35.4207 24.0622 36.474C22.7906 37.5274 21.4366 38.4687 20.0002 39.298Z" fill="var(--white"/>
	</svg>
)

const ArrowIcon = () => (
	<svg width="15" height="15" viewBox="0 0 15 15" fill="none">
		<path d="M9.44465 0.700195H3.81171C3.01653 0.700195 2.25392 1.01608 1.69164 1.57836C1.12936 2.14064 0.813477 2.90325 0.813477 3.69843L0.813477 11.194C0.813477 11.9892 1.12936 12.7518 1.69164 13.3141C2.25392 13.8764 3.01653 14.1923 3.81171 14.1923H11.3073C12.1025 14.1923 12.8651 13.8764 13.4274 13.3141C13.9897 12.7518 14.3055 11.9892 14.3055 11.194V8.55933L12.8064 10.0584V11.194C12.8064 11.5916 12.6485 11.9729 12.3673 12.2541C12.0862 12.5352 11.7049 12.6931 11.3073 12.6931H3.81171C3.41412 12.6931 3.03282 12.5352 2.75168 12.2541C2.47054 11.9729 2.3126 11.5916 2.3126 11.194V3.69843C2.3126 3.30084 2.47054 2.91954 2.75168 2.6384C3.03282 2.35726 3.41412 2.19931 3.81171 2.19931H7.94553L9.44465 0.700195Z" fill="var(--primary"/>
		<path d="M14.0843 2.41917C14.2249 2.55973 14.3038 2.75035 14.3038 2.94911C14.3038 3.14786 14.2249 3.33848 14.0843 3.47904L8.08786 9.47552C7.9473 9.61604 7.75668 9.69498 7.55792 9.69498C7.35917 9.69498 7.16855 9.61604 7.02798 9.47552L4.02975 6.47728C3.89321 6.33591 3.81766 6.14657 3.81936 5.95004C3.82107 5.75351 3.8999 5.56551 4.03888 5.42654C4.17785 5.28756 4.36585 5.20873 4.56238 5.20702C4.75891 5.20532 4.94825 5.28087 5.08962 5.41741L7.55792 7.8857L13.0245 2.41917C13.165 2.27865 13.3556 2.19971 13.5544 2.19971C13.7532 2.19971 13.9438 2.27865 14.0843 2.41917Z" fill="var(--primary"/>
	</svg>
)

const LearnIcon = () => (
	<svg width="128" height="128" viewBox="0 0 128 128" fill="#00B884">
		<path d="M64 57.477c-3.5977 0-6.5234 2.9258-6.5234 6.5195 0 3.5977 2.9258 6.5234 6.5234 6.5234s6.5234-2.9258 6.5234-6.5234c0-3.5938-2.9297-6.5195-6.5234-6.5195zm0 9.168c-1.4609 0-2.6484-1.1836-2.6484-2.6445s1.1875-2.6484 2.6484-2.6484 2.6445 1.1875 2.6445 2.6484c0 1.4648-1.1797 2.6445-2.6445 2.6445z"/>
		<path d="M64 11.449c-28.977 0-52.551 23.574-52.551 52.551s23.574 52.551 52.547 52.551c28.977 0 52.551-23.574 52.551-52.551 0.003906-28.977-23.57-52.551-52.547-52.551zm50.719 53.98c-0.22656 8.1172-2.3594 15.77-5.9844 22.512l-35.141-21.48zm-41.125-4.1094 35.059-21.43c3.6445 6.7188 5.8008 14.355 6.0625 22.461zm33.5-24.09-36.07 19.637 19.625-36.043c6.6602 4.1289 12.301 9.7539 16.445 16.406zm-43.098 19.797c3.7852 0 6.8633 3.0781 6.8633 6.8594 0 3.7852-3.0781 6.8633-6.8633 6.8633s-6.8594-3.0781-6.8594-6.8633c0-3.7812 3.0781-6.8594 6.8594-6.8594zm-23.969-37.75c6.7188-3.6172 14.344-5.75 22.438-5.9961l-1.0273 41.02zm25.52-5.9961c8.0898 0.24219 15.711 2.3789 22.43 5.9961l-21.402 35.02zm-4.1133 60.199 1.0312 41.238c-8.1328-0.24219-15.797-2.3984-22.543-6.0469zm5.1406 0 21.504 35.184c-6.7461 3.6523-14.406 5.8047-22.535 6.0508zm-29.219-52.656 19.625 36.047-36.074-19.641c4.1445-6.6523 9.7852-12.281 16.449-16.406zm-24.07 41.527c0.26172-8.1055 2.418-15.742 6.0625-22.461l35.062 21.43zm41.125 4.1094-35.148 21.484c-3.6211-6.7422-5.7539-14.395-5.9805-22.516zm-33.609 24.148 36.18-19.699-19.711 36.207c-6.6836-4.1562-12.332-9.8125-16.469-16.508zm69.934 16.512-19.711-36.211 36.176 19.695c-4.1367 6.6953-9.7852 12.355-16.465 16.516z"/>
	</svg>
)

const preloadImage = (src) => {
	const img = new Image()
	img.src = src
}


const Hero = () => {
	console.log('deployed');
	
	const [swiperLoaded, setSwiperLoaded] = useState(false)
	const [SwiperComponent, setSwiperComponent] = useState(null)

	useEffect(() => {
		preloadImage(HeroImg1.src)
		preloadImage(mobilebanner2.src)
		const loadSwiper = async () => {
			const { Swiper, SwiperSlide } = await import('swiper/react')
			const { Autoplay, Pagination } = await import('swiper')

			setSwiperComponent(() => ({
				Swiper,
				SwiperSlide,
				Autoplay,
				Pagination
			}))
			setSwiperLoaded(true)
		}

		loadSwiper()
	}, [])

	const renderHeroContent = () => (
		<div className={`white-color ${styles.heading_container}`}>
			<h1>Your Veterinary Marketplace</h1>
			<h4 className={styles.banner_heading}>
				Connecting Manufactures With{' '}
				<span>
					Veterinarians <VetIcon />
				</span>
			</h4>
			<p>Buy from Reliable Vendors</p>

			<div className={styles.slogans_wrapper}>
				<button className='white-btn'>
					Buy Direct, Save More <ArrowIcon />
				</button>

				<button className='white-btn'>
					Learn At Lunch Product Demos <LearnIcon />
				</button>
			</div>
		</div>
	)

	return (
		<section className={`${style.hero_slider_container} hero_Slider`}>
			<div className={`sec-conainer`}>
				{!swiperLoaded ? (
					<section className={styles.hero}>
						<ImgWithLoaderDynamic
							className={`${styles.img} ${styles.desktop}`}
							src={HeroImg1}
							width={1920}
							height={600}
							layout="fill"
							priority
							loading="eager"
							fetchPriority="high"
							alt="Your Veterinary Marketplace"
						/>
						<ImgWithLoaderDynamic
							className={`${styles.img} ${styles.mobile}`}
							src={mobilebanner2}
							width={576}
							height={500}
							layout="fill"
							priority
							loading="eager"
							fetchPriority="high"
							alt="Your Veterinary Marketplace"
						/>
						<div className={`sec-container ${styles.heading}`}>
							<div className='sec-p'>
								{renderHeroContent()}
							</div>
						</div>
					</section>
				) : (
					SwiperComponent && (
						<SwiperComponent.Swiper
							slidesPerView={1}
							spaceBetween={50}
							speed={2000}
							lazy={{
								loadPrevNext: false,
								loadOnTransitionStart: true,
							}}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false
							}}
							pagination={{
								clickable: true
							}}
							modules={[SwiperComponent.Autoplay, SwiperComponent.Pagination]}
							className={'mySwiper'}
						>
							<SwiperComponent.SwiperSlide>
								<section className={styles.hero}>
									<ImgWithLoaderDynamic
										className={`${styles.img} ${styles.desktop}`}
										src={HeroImg1}
										width={1920}
										height={600}
										layout="fill"
										priority
										loading="eager"
										alt="Your Veterinary Marketplace"
									/>
									<ImgWithLoaderDynamic
										className={`${styles.img} ${styles.mobile}`}
										src={mobilebanner2}
										width={576}
										height={500}
										layout="fill"
										priority
										loading="eager"
										alt="Your Veterinary Marketplace"
									/>
									<div className={`sec-container ${styles.heading}`}>
										<div className={`${styles.heading_wrapper} sec-p`}>
											{renderHeroContent()}
										</div>
									</div>
								</section>
							</SwiperComponent.SwiperSlide>
							<SwiperComponent.SwiperSlide>
								<section className={styles.hero} style={{ minHeight: '450px' }}>
									<ImgWithLoaderDynamic
										className={`${styles.hero_image_wrapper} ${styles.desktop}`}
										bg="bg"
										src={HeroImg}
										width={1920}
										height={600}
										layout="fill"
										loading="lazy"
										alt="VetReps Finder"
									/>
									<ImgWithLoaderDynamic
										className={`${styles.hero_image_wrapper} ${styles.mobile}`}
										bg="bg"
										src={mobilebanenr1}
										width={576}
										height={500}
										layout="fill"
										loading="lazy"
										alt="VetReps Finder"
									/>
									<div className={`${styles.content}`}>
										<div className='sec-container'>
											<div className={styles.banner_container}>
												<div className={`radius shadow ${styles.image_card}`}>
													<VetHeadingDynamic
														span1='VetRep Finder -'
														heading='Hire & Get Hired Instantly'
														para='Whether you are a veterinary representative seeking an independent role or a manufacturer/vendor in need of extra hands, VetRep Finder has you covered.'
														btnLink='/vet-rep-finder'
														btnText='Explore Now!'
														type='hero'
													/>
												</div>
											</div>
										</div>
									</div>
								</section>
							</SwiperComponent.SwiperSlide>
						</SwiperComponent.Swiper>
					)
				)}
			</div>
		</section>
	)
}

export default Hero

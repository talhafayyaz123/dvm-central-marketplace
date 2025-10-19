import React from 'react'
import styles from './VetRepsFinder.module.css'
import platform from '/public/imgs/vetreps/platform.png'
import oppImg from '/public/imgs/vetreps/opp.png'
import jobsImg from '/public/imgs/vetreps/jobs.png'
import VetHeading from '../../../UI/VetHeading/VetHeading'
import VetVendors from '../VetVendors/VetVendors'
import HeroImg from '/public/imgs/vetreps/hero.png'
// import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
// import { GlobalProvider } from '../../../../context/AppProvider'
// import NotAuthorized from '../../../UI/NotAuthorized/NotAuthorized'
// import { DarkLoader } from '../../../Loader/Loader'
import MetaTags from '../../../UI/MetaTags/MetaTags'
import Image from 'next/image'

const VetRepsFinder = ({ companies }) => {
	return (
		<>
			<MetaTags
				title={`Find Top Veterinary Sales Reps with DVM Central's Vet Rep Finder `}
				description={`Connect with the best veterinary sales reps using DVM Central’s Vet Rep Finder. Explore top reps in your area, build partnerships, and grow your business. Start your search today!`}
				keywords={`veterinary sales reps, vet sales representatives, DVM Central, Vet Rep Finder, veterinary sales network, find veterinary reps, veterinary business growth, veterinary sales professionals, connect with veterinary reps, veterinary products, veterinary sales tools, veterinary partnerships`}
			>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@graph': [
								{
									'@context': 'https://schema.org',
									'@type': 'BreadcrumbList',
									itemListElement: [
										{
											'@type': 'ListItem',
											position: 1,
											name: 'DVM Central - A Veterinary Marketplace',
											item: 'https://www.dvmcentral.com'
										},
										{
											'@type': 'ListItem',
											position: 2,
											name: 'VetRep Finder',
											item: 'https://www.dvmcentral.com/vet-rep-finder'
										}
									]
								}
							]
						})
					}}
				/>
			</MetaTags>
			<section className='sec-mb'>
				<Image className={styles.hero_image_wrapper} src={HeroImg}  priority={true} layout='fill' alt='Instant Access To Independent Veterinary Reps' />

				<div className='sec-p'>
					<div className='sec-container'>
						<div className={styles.image_card}>
							<VetHeading
								span1='Instant Access To Independent'
								heading='Veterinary'
								span2='Reps!'
								para='Connect with stand-in, yet experienced veterinary reps through veterinary Reps Finder. Find the perfect on-demand sales expert role.'
								btnLink='https://hiring.vetrepfinder.com/'
								btnText='Get Started Now'
								type='hero'
								externalLink={true}
							/>
						</div>
					</div>
				</div>
			</section>
			<div className='sec-container'>
				{/* platform */}
				<section className={`sec-m ${styles.main_wrapper} ${styles.platform}`}>
					<VetHeading
						span1='One'
						heading='Platform'
						span2='For All!'
						para={`Whether you're a manufacturer looking to launch a new product, a vendor needing extra hands, or a rep seeking independent roles, veterinary Reps Finder is for you. Our platform brings together all the resources you need in one place. Post job listings, search for talented professionals, or find your next on-demand role with ease. With a focus on efficiency and quality, we connect the best talent with the right opportunities.`}
						type='platform'
					/>
					<div className={styles.image_wrapper}>
						<Image src={platform} width={651} height={346} alt='Our Platform' />
					</div>
				</section>

				{/* features */}
				<section className={`sec-m ${styles.wrapper}`}>
					<div className={styles.step}>
						<div className={`${styles.icon_wrapper} full-radius shadow white-bg`}>
							<svg viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M10.5333 12.1623C10.5333 12.3612 10.4543 12.552 10.3136 12.6926C10.173 12.8333 9.98222 12.9123 9.78331 12.9123H1.26855C1.06964 12.9123 0.878877 12.8333 0.738225 12.6926C0.597572 12.552 0.518555 12.3612 0.518555 12.1623C0.518555 11.9634 0.597572 11.7726 0.738225 11.632C0.878877 11.4913 1.06964 11.4123 1.26855 11.4123H9.78331C9.98222 11.4123 10.173 11.4913 10.3136 11.632C10.4543 11.7726 10.5333 11.9634 10.5333 12.1623ZM9.78331 14.4123H3.51855C3.31964 14.4123 3.12888 14.4913 2.98822 14.632C2.84757 14.7726 2.76855 14.9634 2.76855 15.1623C2.76855 15.3612 2.84757 15.552 2.98822 15.6926C3.12888 15.8333 3.31964 15.9123 3.51855 15.9123H9.78331C9.98222 15.9123 10.173 15.8333 10.3136 15.6926C10.4543 15.552 10.5333 15.3612 10.5333 15.1623C10.5333 14.9634 10.4543 14.7726 10.3136 14.632C10.173 14.4913 9.98222 14.4123 9.78331 14.4123ZM9.78331 17.4123H5.76855C5.56964 17.4123 5.37888 17.4913 5.23822 17.632C5.09757 17.7726 5.01855 17.9634 5.01855 18.1623C5.01855 18.3612 5.09757 18.552 5.23822 18.6926C5.37888 18.8333 5.56964 18.9123 5.76855 18.9123H9.78331C9.98222 18.9123 10.173 18.8333 10.3136 18.6926C10.4543 18.552 10.5333 18.3612 10.5333 18.1623C10.5333 17.9634 10.4543 17.7726 10.3136 17.632C10.173 17.4913 9.98222 17.4123 9.78331 17.4123ZM13.7583 11.9628L16.7748 8.95006C16.9114 8.80861 16.987 8.61915 16.9853 8.42251C16.9836 8.22586 16.9047 8.03775 16.7657 7.89869C16.6266 7.75964 16.4385 7.68076 16.2419 7.67905C16.0452 7.67734 15.8558 7.75294 15.7143 7.88956L12.6993 10.9001C12.6277 10.9692 12.5705 11.052 12.5312 11.1435C12.4919 11.235 12.4712 11.3334 12.4704 11.433C12.4695 11.5326 12.4885 11.6314 12.5262 11.7235C12.5639 11.8157 12.6196 11.8994 12.69 11.9699C12.7604 12.0403 12.8442 12.096 12.9363 12.1337C13.0285 12.1714 13.1273 12.1904 13.2269 12.1895C13.3264 12.1886 13.4249 12.1679 13.5164 12.1286C13.6079 12.0893 13.6906 12.0322 13.7598 11.9606L13.7583 11.9628ZM13.9781 3.21481V1.81531H14.6876C14.8865 1.81531 15.0772 1.73629 15.2179 1.59564C15.3585 1.45499 15.4376 1.26422 15.4376 1.06531C15.4376 0.866395 15.3585 0.67563 15.2179 0.534978C15.0772 0.394325 14.8865 0.315308 14.6876 0.315308H11.7701C11.5711 0.315308 11.3804 0.394325 11.2397 0.534978C11.0991 0.67563 11.0201 0.866395 11.0201 1.06531C11.0201 1.26422 11.0991 1.45499 11.2397 1.59564C11.3804 1.73629 11.5711 1.81531 11.7701 1.81531H12.4796V3.21331C10.7417 3.3669 9.09768 4.06925 7.7853 5.21881L6.7998 4.23331C6.65917 4.09248 6.46836 4.01328 6.26933 4.01314C6.07031 4.013 5.87938 4.09193 5.73855 4.23256C5.59772 4.37319 5.51853 4.564 5.51839 4.76303C5.51825 4.96205 5.59717 5.15298 5.7378 5.29381L6.75481 6.31006C6.13513 7.09354 5.66273 7.98294 5.36055 8.93506C5.3074 9.12283 5.32952 9.32393 5.42224 9.49566C5.51495 9.66738 5.67094 9.7962 5.8571 9.85477C6.04326 9.91334 6.24491 9.89705 6.41925 9.80935C6.59359 9.72164 6.72687 9.56944 6.7908 9.38506C7.22061 8.01661 8.07668 6.82142 9.23399 5.97406C10.3913 5.12669 11.7892 4.67153 13.2236 4.67506H13.2296H13.2356C15.0268 4.67565 16.7444 5.38778 18.0105 6.65478C19.2767 7.92177 19.9877 9.63985 19.9871 11.4311C19.9865 13.2223 19.2743 14.9399 18.0073 16.206C16.7403 17.4722 15.0223 18.1832 13.2311 18.1826C13.1006 18.1826 12.9693 18.1758 12.8178 18.1683C12.6207 18.1614 12.4289 18.2323 12.2837 18.3658C12.1386 18.4993 12.0518 18.6846 12.0423 18.8816C12.035 19.0814 12.1068 19.276 12.2422 19.4232C12.3776 19.5704 12.5656 19.6582 12.7653 19.6676C12.9206 19.6751 13.0766 19.6826 13.2311 19.6826C15.3625 19.6952 17.4161 18.8823 18.9616 17.4144C20.507 15.9464 21.4243 13.9373 21.5213 11.808C21.6182 9.67871 20.8873 7.59453 19.4817 5.99219C18.0761 4.38985 16.1048 3.39373 13.9811 3.21256L13.9781 3.21481Z'
									fill='var(--primary)'
								/>
							</svg>
						</div>

						<h5>Quick & Easy</h5>
						<p className='new-gray-color'>{'"Post jobs or apply with ease. Our streamlined process connects you quickly."'}</p>
					</div>
					<div className={styles.step}>
						<div className={`${styles.icon_wrapper} full-radius shadow white-bg`}>
							<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<g clip-path='url(#clip0_701_1391)'>
									<path
										fill-rule='evenodd'
										clip-rule='evenodd'
										d='M10.9955 2.37894C11.3832 1.53433 12.5628 1.53433 12.9506 2.37894L13.929 4.51046L16.156 4.8241C17.0858 4.95535 17.3713 6.08633 16.7637 6.69398L15.1196 8.33545L15.5287 10.6835C15.6744 11.5179 14.8017 12.319 13.9426 11.8341L11.973 10.7219L10.0034 11.8341C9.14435 12.319 8.27163 11.5179 8.41737 10.6835L8.82646 8.33545L7.18242 6.69398C6.57474 6.0863 6.86025 4.95534 7.79095 4.8241L10.0171 4.51046L10.9955 2.37894ZM11.973 3.51843L11.1932 5.21615C11.0432 5.54427 10.7364 5.78632 10.3639 5.83917L8.51708 6.09911L9.88667 7.467C10.1441 7.72439 10.254 8.09087 10.1926 8.44114L9.86025 10.3494L11.4497 9.45193C11.7753 9.26784 12.1708 9.26784 12.4963 9.45193L14.0858 10.3494L13.7535 8.44114C13.6921 8.09085 13.802 7.72437 14.0603 7.467L15.429 6.09911L13.5821 5.83917C13.2097 5.78633 12.9029 5.54427 12.7529 5.21615L11.973 3.51843Z'
										fill='var(--primary)'
									/>
									<path
										fill-rule='evenodd'
										clip-rule='evenodd'
										d='M8.55787 16.0639C8.55787 14.1795 10.0885 12.6548 11.9728 12.6548C13.8572 12.6548 15.387 14.1795 15.387 16.0639C15.387 17.0329 14.9821 17.9073 14.3327 18.5278C14.5066 18.5917 14.677 18.6625 14.8441 18.7392C15.2728 18.2125 15.8182 17.7829 16.4421 17.4923C16.1404 17.0934 15.9606 16.5966 15.9606 16.0571C15.9606 14.7429 17.0259 13.6776 18.3409 13.6776C19.6551 13.6776 20.7204 14.7429 20.7204 16.0571C20.7204 16.5966 20.5414 17.0934 20.2397 17.4923C20.9906 17.8426 21.6289 18.3932 22.0849 19.0741C22.2946 19.3878 22.2102 19.8113 21.8974 20.0201C21.5846 20.2298 21.161 20.1463 20.9514 19.8326C20.3872 18.9897 19.4284 18.4375 18.3408 18.4375C17.4298 18.4375 16.6099 18.8252 16.0355 19.4457C16.6671 19.9128 17.2151 20.4863 17.6523 21.1383C17.8628 21.4511 17.7793 21.8747 17.4665 22.0843C17.1537 22.2948 16.7301 22.2113 16.5205 21.8985C15.5387 20.4352 13.8683 19.473 11.9727 19.473C10.0771 19.473 8.40675 20.4344 7.42493 21.8985C7.21527 22.2113 6.7917 22.2948 6.47891 22.0843C6.16698 21.8747 6.08346 21.4511 6.29312 21.1383C6.73033 20.4863 7.27834 19.9128 7.90989 19.4457C7.33546 18.8252 6.51558 18.4375 5.60458 18.4375C4.51707 18.4375 3.55827 18.9897 2.99403 19.8326C2.78437 20.1463 2.3608 20.2298 2.04802 20.0201C1.73523 19.8113 1.65171 19.3878 1.86052 19.0741C2.31735 18.3932 2.95483 17.8426 3.70568 17.4923C3.40398 17.0934 3.22501 16.5966 3.22501 16.0571C3.22501 14.7429 4.29034 13.6776 5.6045 13.6776C6.91865 13.6776 7.98486 14.7429 7.98486 16.0571C7.98486 16.5966 7.80503 17.0934 7.50333 17.4923C8.1272 17.7829 8.67266 18.2116 9.10134 18.7392C9.26753 18.6625 9.43799 18.5917 9.61184 18.5278C8.9624 17.9073 8.55759 17.0329 8.55759 16.0639H8.55787ZM11.9728 18.1093C13.1072 18.1093 14.0234 17.1923 14.0234 16.0639C14.0234 14.9355 13.1072 14.0184 11.9728 14.0184C10.8385 14.0184 9.92144 14.9355 9.92144 16.0639C9.92144 17.1923 10.8385 18.1093 11.9728 18.1093ZM5.60456 17.0738C6.1662 17.0738 6.62133 16.6187 6.62133 16.057C6.62133 15.4963 6.16622 15.0411 5.60456 15.0411C5.04289 15.0411 4.58866 15.4963 4.58866 16.057C4.58866 16.6187 5.04291 17.0738 5.60456 17.0738ZM18.3409 17.0738C18.9017 17.0738 19.3568 16.6187 19.3568 16.057C19.3568 15.4963 18.9017 15.0411 18.3409 15.0411C17.7793 15.0411 17.3242 15.4963 17.3242 16.057C17.3242 16.6187 17.7793 17.0738 18.3409 17.0738Z'
										fill='var(--primary)'
									/>
									<path
										d='M16.153 10.478C16.1283 10.4916 16.1044 10.5044 16.0806 10.5164L15.7499 8.62431L16.2638 8.11208L16.1215 8.93027L17.2738 8.27997C17.5814 8.10611 17.9556 8.10611 18.2624 8.27997L19.4146 8.93027L19.1717 7.53425C19.1138 7.20443 19.2169 6.86011 19.4598 6.61721L20.4698 5.60812L19.1146 5.41806C18.7627 5.36863 18.4737 5.13938 18.3323 4.83085L17.7681 3.60188L17.3496 4.51381C17.2414 4.46608 17.1229 4.43199 16.9942 4.41409L15.3809 4.18738L16.0414 4.09448L16.8459 2.34222C17.2107 1.54706 18.3254 1.54706 18.6902 2.34222L19.4948 4.09448L21.322 4.35102C22.2007 4.47545 22.4666 5.54164 21.8956 6.11181L20.5431 7.46267L20.8797 9.39477C21.0161 10.1772 20.197 10.9374 19.3831 10.478L17.7681 9.56607L16.153 10.478Z'
										fill='var(--primary)'
									/>
									<path
										d='M7.90418 4.0946L8.56468 4.1875L6.95133 4.41421C6.82264 4.43211 6.70418 4.4662 6.59594 4.51393L6.17746 3.60199L5.61327 4.83097C5.47179 5.1395 5.18286 5.36874 4.83089 5.41818L3.47578 5.60824L4.48572 6.61733C4.72863 6.86023 4.83174 7.20454 4.77464 7.53437L4.53089 8.93038L5.68315 8.28009C5.99083 8.10623 6.36497 8.10623 6.67178 8.28009L7.82404 8.93038L7.68171 8.1122L8.19564 8.62443L7.86496 10.5165C7.84109 10.5045 7.81723 10.4918 7.79252 10.4781L6.17747 9.56619L4.56242 10.4781C3.74849 10.9375 2.92946 10.1773 3.06583 9.3949L3.40248 7.46279L2.04993 6.11194C1.47975 5.54176 1.74482 4.47557 2.62351 4.35114L4.45078 4.09461L5.25532 2.34234C5.6201 1.54718 6.73486 1.54718 7.09964 2.34234L7.90418 4.0946Z'
										fill='var(--primary)'
									/>
								</g>
								<defs>
									<clipPath id='clip0_701_1391'>
										<rect width='24' height='24' fill='white' />
									</clipPath>
								</defs>
							</svg>
						</div>
						<h5>Qualified Experts</h5>
						<p className='new-gray-color'>{'"Access a pool of experienced veterinary representatives ready for your projects."'}</p>
					</div>
					<div className={styles.step}>
						<div className={`${styles.icon_wrapper} full-radius shadow white-bg`}>
							<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<g clip-path='url(#clip0_701_1403)'>
									<path
										d='M4.65591 11.2561H3.31193L4.55989 10.0081C4.79989 9.76809 4.79989 9.38411 4.55989 9.14411C4.31989 8.90411 3.93591 8.90411 3.69591 9.14411L1.39191 11.4481C1.15191 11.6881 1.15191 12.0721 1.39191 12.3121L3.69591 14.6161C3.81591 14.7361 3.98387 14.8081 4.12795 14.8081C4.27194 14.8081 4.43999 14.7361 4.55999 14.6161C4.79999 14.3761 4.79999 13.9921 4.55999 13.7521L3.31195 12.4801H4.65593C7.27193 12.4801 9.55193 13.9921 10.6559 16.1761C10.8239 15.6961 11.0399 15.2401 11.2799 14.784C9.83991 12.648 7.41591 11.2561 4.65591 11.2561Z'
										fill='var(--primary)'
									/>
									<path
										d='M22.608 11.424L21.1919 10.008L20.328 9.12006C20.088 8.88006 19.704 8.88006 19.464 9.12006C19.224 9.36006 19.224 9.74404 19.464 9.98404L20.7119 11.232H19.368C16.584 11.2561 14.16 12.648 12.72 14.784C12.696 14.832 12.6479 14.904 12.6239 14.952C12.3839 15.336 12.1679 15.7199 12 16.128C11.592 17.064 11.376 18.12 11.376 19.2V21.672C11.376 22.008 11.6639 22.296 12 22.296C12.336 22.296 12.6239 22.008 12.6239 21.672V19.2C12.6239 18.12 12.8879 17.088 13.3439 16.176C14.4479 13.992 16.7279 12.48 19.3439 12.48H20.6879L19.44 13.728C19.2 13.968 19.2 14.3519 19.44 14.5919C19.56 14.7119 19.7279 14.784 19.872 14.784C20.04 14.784 20.184 14.7119 20.304 14.5919L22.608 12.2879C22.872 12.072 22.872 11.664 22.608 11.424L22.608 11.424Z'
										fill='var(--primary)'
									/>
									<path
										d='M10.128 5.06404L11.376 3.81608V12.9361C11.592 13.1761 11.808 13.4161 11.9999 13.6801C12.192 13.4161 12.4079 13.1761 12.6239 12.9361V3.81608L13.8719 5.06404C13.9919 5.18404 14.1598 5.25608 14.3039 5.25608C14.4479 5.25608 14.616 5.18404 14.736 5.06404C14.976 4.82404 14.976 4.44006 14.736 4.20006L12.432 1.89606C12.192 1.65606 11.808 1.65606 11.568 1.89606L9.26398 4.20006C9.02398 4.44006 9.02398 4.82404 9.26398 5.06404C9.50398 5.30404 9.88796 5.30404 10.128 5.06404H10.128Z'
										fill='var(--primary)'
									/>
								</g>
								<defs>
									<clipPath id='clip0_701_1403'>
										<rect width='24' height='24' fill='white' />
									</clipPath>
								</defs>
							</svg>
						</div>

						<h5>Flexible Roles</h5>
						<p className='new-gray-color'>{'"Find or offer on-demand positions to fit your schedule and needs.”'}</p>
					</div>
				</section>

				{/* explore */}
				<section className={`sec-m ${styles.main_wrapper}`}>
					<VetHeading
						span1='Explore Vet Reps Job'
						heading='Opportunities'
						para={`Find a wide range of independent roles within the veterinary marketing sector. Gain hands-on experience and build your professional network or simply explore different career paths. From assisting in product launches to supporting marketing campaigns, you'll find roles that not only match your skills but also provide valuable industry exposure. Take the next step in your career journey with VetRep Finder.`}
						btnText='Browse Jobs'
						btnLink={'https://vetrepfinder.com/'}
						externalLink={true}
					/>
					<div className={styles.image_wrapper}>
						<Image src={oppImg} alt='Opportunities' />
					</div>
				</section>

				{/* spoonsored vendors */}
				<VetVendors companies={companies} />

				{/* post jobs */}
				<section className={`sec-m ${styles.main_wrapper} ${styles.post_jobs}`}>
					<div className={styles.image_wrapper}>
						<Image src={jobsImg} width={601} height={351} alt='Post a job' />
					</div>
					<VetHeading
						span1='Post Jobs & Find Top'
						heading='Talent!'
						para='Our platform allows you to post job listings and connect with experienced professionals ready to take on short-term roles. Whether you need help with product launches, marketing campaigns, or event
                  support, find the perfect match for your needs. Post your job today
                   and attract top talent easily and efficiently.'
						btnText='Post a Job'
						btnLink='https://hiring.vetrepfinder.com/'
						type='jobs'
						heading2='Need on-demand, yet skilled veterinary reps?'
						externalLink={true}
					/>
				</section>
			</div>
		</>
		// ) : loginUser?.id !== undefined ? (
		// 	<NotAuthorized heading='You are not authorized to access this page.' />
		// ) : (
		// 	<NotAuthorized heading='Login is required to access this page.' btnText='Sign in' href='/auth/signin' />
		// )
	)
}

export default VetRepsFinder

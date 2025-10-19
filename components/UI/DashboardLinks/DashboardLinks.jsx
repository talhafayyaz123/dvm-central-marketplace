import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import styles from './DashboardLinks.module.css'
import profileImg from '../../../public/imgs/no-profile-img.png'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { lockScroll } from '../../../utils/scrollLock'
import { imgApiUrl } from '../../../utils/config'
import Accordion from '../../UI/Accordion/Accordion'
import { GlobalProvider } from '../../../context/AppProvider'
import Cookies from 'js-cookie'
import { deletechatfunc } from '../../../utils/deletechatfunc'

const DashboardLinks = ({ pageType, dashboardPagesContent, setmodal, setuserData, userData, setmodalAlertType, loginUser, setloginUser, setactiveProvider, userPosition }) => {
	const router = useRouter()
	const { setimpersonateUsers, impersonateUsers, setChatModal, setMessages } = useContext(GlobalProvider)
	const { data: session } = useSession()
	useEffect(() => {
		router.events.on('routeChangeComplete', () => {
			if (window.matchMedia('(max-width: 576px)').matches) {
				dashboardPagesContent.current !== null && dashboardPagesContent.current.scrollIntoView({ behavior: 'smooth' })
			}
		})
	}, [])

	return (
		<div>
			<div className={styles.name_wrapper}>
				<div className={`${styles.profile_img_wrapper} primary-border full-radius`}>
					<Image
						width={60}
						height={60}
						src={userData?.vet_dvm_profile_image?.includes('base64') ? userData?.vet_dvm_profile_image : userData?.vet_dvm_profile_image !== null && userData?.vet_dvm_profile_image !== undefined ? `${imgApiUrl?.profileImg}/${userData?.vet_dvm_profile_image}` : profileImg}
						alt={userData?.first_name}
					/>
				</div>
				<div className={`${styles.name} semibold-text primary-color`}>
					{userData?.first_name} {userData?.last_name}
				</div>
			</div>

			<div className={styles.upload_img} onClick={() => (setmodal(true), lockScroll())}>
				Edit your profile image
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--new-gray)'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
					/>
				</svg>
			</div>

			<div className={styles.links_wrapper}>
				{router?.asPath !== `/dashboard` ? (
					<Link href={`/dashboard`}>
						<a className={`${styles.link_wrapper} gray-color ${pageType === 'profile-info' ? styles.active_link : undefined}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' />
							</svg>

							<div>Account Information</div>
						</a>
					</Link>
				) : (
					<a className={`${styles.link_wrapper} gray-color ${pageType === 'profile-info' ? styles.active_link : undefined}`}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' />
						</svg>

						<div>Account Information</div>
					</a>
				)}

				{userPosition !== undefined &&
					userPosition !== 'Sales Rep' &&
					(router?.asPath !== `/dashboard/appointments` ? (
						<Link href={`/dashboard/appointments`}>
							<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('appointments') ? styles.active_link : undefined}`}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
									/>
								</svg>

								<div>Appointments</div>
							</a>
						</Link>
					) : (
						<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('appointments') ? styles.active_link : undefined}`}>
							<svg version='1.1' id='Icon_Set' xmlns='http://www.w3.org/2000/svg' x={0} y={0} viewBox='0 0 64 64' style={{ enableBackground: 'new 0 0 64 64' }} xmlSpace='preserve'>
								<style dangerouslySetInnerHTML={{ __html: '.st0,.st2,.st3{fill:none;stroke:var(--gray-icon);strokeLinecap:round;strokeLinejoin:round;stroke-miterlimit:10}.st2,.st3{fill:var(--gray-icon)}.st3{fill:#fff}' }} />
								<g id='Resume'>
									<path className='st0' d='M11 2.5h0c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h0c-1.1 0-2-.9-2-2v-3c0-.6.4-1 1-1h0c.6 0 1 .4 1 1v3M48 50.5V54c0 1.4-1.1 2.5-2.5 2.5H42M26.6 61H12.5c-1.4 0-2.5-1.1-2.5-2.5h0' />
									<path className='st0' d='M52.5 46v12.5c0 1.4-1.1 2.5-2.5 2.5H37.5M50 9h0c1.4 0 2.5 1.1 2.5 2.5v20.6M28.1 56.5H8.5C7.1 56.5 6 55.4 6 54V7c0-1.4 1.1-2.5 2.5-2.5h37C46.9 4.5 48 5.6 48 7v26.5' />
									<path className='st2' d='M42 23.5H32c-.6 0-1-.4-1-1v-12c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v12c0 .5-.4 1-1 1z' />
									<circle className='st3' cx={37} cy='16.5' r='2.7' />
									<path className='st3' d='M41 23.5h-8v-.3c0-2.2 1.8-4 4-4h0c2.2 0 4 1.8 4 4v.3z' />
									<path className='st0' d='M11 23.5h8M11 15.5h8M11 18.5h16M11 28.5h32' />
									<path className='st2' d='M11 33.5h16M11 38.5h16M11 43.5h16M11 48.5h8' />
									<g>
										<path className='st0' d='M35 .5h5M42 .5h1' />
									</g>
									<g>
										<path className='st0' d='M56.5 19.5v5M56.5 26.5v1' />
									</g>
									<g>
										<path d='m56.6 34.2.7.7c1 1 1 2.6 0 3.5L37.8 57.8l-4.2-4.2L53 34.2c1-1 2.6-1 3.6 0z' style={{ fill: 'var(--gray-icon)', stroke: 'var(--gray-icon)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} />
										<path className='st0' d='m33.6 53.6 4.2 4.2-3.5 3.6-6.4 2.1 2.1-6.4z' />
										<path className='st0' d='m29.3 59.3-1.4 4.2 4.3-1.4zM49.8 34.5l-7 7.1' />
										<path style={{ fill: 'var(--gray-icon)', stroke: 'var(--gray-icon)', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} d='M57.3 38.4 53 34.2' />
									</g>
								</g>
							</svg>

							<div>Appointments</div>
						</a>
					))}

				{userPosition === 'Sales Rep' && (
					<Accordion question={`Resume/Profile`} index='0' className={styles.accord} questionClass={styles.heading} answerClass={styles.accord_links} type='resume' router={router} loginUser={loginUser}>
						<>
							{router?.asPath !== `/dashboard/build-resume` ? (
								<Link href={`/dashboard/build-resume`}>
									<a className={`${styles.link_wrapper} gray-color ${styles.subscription} ${router?.pathname?.includes('build-resume') ? styles.active_link : undefined}`}>
										<svg id='Layer_1' enableBackground='new 0 0 64 64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
											<g>
												<path d='m11.98 27.85h22.44c.52 0 .94-.4.97-.92.11-2.09-.12-3.07-.45-4.17-.99-2.96-3.09-3.65-5.12-4.32-.92-.3-1.87-.62-2.76-1.16 1.26-1.55 2.05-3.73 2.05-5.87 0-3.85-2.21-6.14-5.91-6.14s-5.91 2.3-5.91 6.14c0 2.14.79 4.32 2.05 5.87-.9.54-1.84.85-2.76 1.16-2.03.67-4.13 1.36-5.13 4.35-.32 1.07-.55 2.05-.44 4.14.03.52.46.92.97.92zm7.25-16.43c0-2.79 1.34-4.2 3.97-4.2s3.97 1.41 3.97 4.2c0 2.04-.87 4.12-2.21 5.29-1.17 1.01-2.35 1.01-3.52 0-1.34-1.17-2.21-3.24-2.21-5.29zm-5.93 11.96c.68-2.03 2.03-2.48 3.89-3.09 1.13-.37 2.4-.79 3.63-1.64.77.5 1.58.77 2.39.77s1.62-.27 2.39-.77c1.23.85 2.49 1.27 3.63 1.64 1.86.61 3.21 1.06 3.88 3.06.22.74.38 1.39.39 2.56h-20.58c.01-1.16.17-1.81.38-2.53z' />
												<path d='m7.93 35.09h30.55c.54 0 .97-.43.97-.97s-.43-.97-.97-.97h-30.55c-.54 0-.97.43-.97.97s.44.97.97.97z' />
												<path d='m7.93 42.97h30.55c.54 0 .97-.43.97-.97s-.43-.97-.97-.97h-30.55c-.54 0-.97.43-.97.97s.44.97.97.97z' />
												<path d='m28.78 48.91h-20.85c-.54 0-.97.43-.97.97s.43.97.97.97h20.85c.54 0 .97-.43.97-.97s-.43-.97-.97-.97z' />
												<path d='m28.78 56.78h-20.85c-.54 0-.97.43-.97.97s.43.97.97.97h20.85c.54 0 .97-.43.97-.97 0-.53-.43-.97-.97-.97z' />
												<path d='m62.31 27.97c-.88-.88-2.08-1.33-3.4-1.26-1.27.07-2.48.63-3.42 1.57l-1.53 1.53-7.96 7.96v-27.1c0-.13-.03-.25-.07-.37-.05-.12-.12-.23-.21-.32l-9.7-9.7c-.09-.09-.2-.16-.32-.21-.13-.04-.25-.07-.38-.07h-31.98c-1.6 0-2.91 1.3-2.91 2.91v58.18c0 1.6 1.3 2.91 2.91 2.91h39.74c1.6 0 2.91-1.3 2.91-2.91v-10.29l16.01-16.01c.94-.94 1.5-2.15 1.57-3.42.07-1.31-.38-2.52-1.26-3.4zm-26.02-24.66 6.39 6.39h-6.39zm7.76 57.78c0 .53-.43.97-.97.97h-39.74c-.54 0-.97-.44-.97-.97v-58.18c0-.53.43-.97.97-.97h31.01v8.73c0 .54.43.97.97.97h8.73v28.08l-8.71 8.71c-.1.1-.17.21-.22.33v.01l-3.19 8.34c-.14.36-.05.76.22 1.03.19.19.43.28.69.28.12 0 .23-.02.35-.06l8.34-3.19h.01c.12-.05.23-.12.33-.22l2.2-2.2v8.34zm-7.66-10.23 3.03 3.03-4.91 1.88zm7.96-1.16c-.01.01-.02.02-.03.03l-3.16 3.16-3.77-3.77 8.31-8.31 8.93-8.93 3.77 3.77zm16.27-16.28-.85.85-3.77-3.77.85-.85c.6-.6 1.37-.96 2.16-1 .74-.04 1.43.2 1.92.69s.73 1.17.69 1.92c-.04.79-.39 1.56-1 2.16z' />
											</g>
										</svg>

										<div>Build Resume</div>
									</a>
								</Link>
							) : (
								<a className={`${styles.link_wrapper} gray-color ${styles.subscription} ${router?.pathname?.includes('build-resume') ? styles.active_link : undefined}`}>
									<svg id='Layer_1' enableBackground='new 0 0 64 64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
										<g>
											<path d='m11.98 27.85h22.44c.52 0 .94-.4.97-.92.11-2.09-.12-3.07-.45-4.17-.99-2.96-3.09-3.65-5.12-4.32-.92-.3-1.87-.62-2.76-1.16 1.26-1.55 2.05-3.73 2.05-5.87 0-3.85-2.21-6.14-5.91-6.14s-5.91 2.3-5.91 6.14c0 2.14.79 4.32 2.05 5.87-.9.54-1.84.85-2.76 1.16-2.03.67-4.13 1.36-5.13 4.35-.32 1.07-.55 2.05-.44 4.14.03.52.46.92.97.92zm7.25-16.43c0-2.79 1.34-4.2 3.97-4.2s3.97 1.41 3.97 4.2c0 2.04-.87 4.12-2.21 5.29-1.17 1.01-2.35 1.01-3.52 0-1.34-1.17-2.21-3.24-2.21-5.29zm-5.93 11.96c.68-2.03 2.03-2.48 3.89-3.09 1.13-.37 2.4-.79 3.63-1.64.77.5 1.58.77 2.39.77s1.62-.27 2.39-.77c1.23.85 2.49 1.27 3.63 1.64 1.86.61 3.21 1.06 3.88 3.06.22.74.38 1.39.39 2.56h-20.58c.01-1.16.17-1.81.38-2.53z' />
											<path d='m7.93 35.09h30.55c.54 0 .97-.43.97-.97s-.43-.97-.97-.97h-30.55c-.54 0-.97.43-.97.97s.44.97.97.97z' />
											<path d='m7.93 42.97h30.55c.54 0 .97-.43.97-.97s-.43-.97-.97-.97h-30.55c-.54 0-.97.43-.97.97s.44.97.97.97z' />
											<path d='m28.78 48.91h-20.85c-.54 0-.97.43-.97.97s.43.97.97.97h20.85c.54 0 .97-.43.97-.97s-.43-.97-.97-.97z' />
											<path d='m28.78 56.78h-20.85c-.54 0-.97.43-.97.97s.43.97.97.97h20.85c.54 0 .97-.43.97-.97 0-.53-.43-.97-.97-.97z' />
											<path d='m62.31 27.97c-.88-.88-2.08-1.33-3.4-1.26-1.27.07-2.48.63-3.42 1.57l-1.53 1.53-7.96 7.96v-27.1c0-.13-.03-.25-.07-.37-.05-.12-.12-.23-.21-.32l-9.7-9.7c-.09-.09-.2-.16-.32-.21-.13-.04-.25-.07-.38-.07h-31.98c-1.6 0-2.91 1.3-2.91 2.91v58.18c0 1.6 1.3 2.91 2.91 2.91h39.74c1.6 0 2.91-1.3 2.91-2.91v-10.29l16.01-16.01c.94-.94 1.5-2.15 1.57-3.42.07-1.31-.38-2.52-1.26-3.4zm-26.02-24.66 6.39 6.39h-6.39zm7.76 57.78c0 .53-.43.97-.97.97h-39.74c-.54 0-.97-.44-.97-.97v-58.18c0-.53.43-.97.97-.97h31.01v8.73c0 .54.43.97.97.97h8.73v28.08l-8.71 8.71c-.1.1-.17.21-.22.33v.01l-3.19 8.34c-.14.36-.05.76.22 1.03.19.19.43.28.69.28.12 0 .23-.02.35-.06l8.34-3.19h.01c.12-.05.23-.12.33-.22l2.2-2.2v8.34zm-7.66-10.23 3.03 3.03-4.91 1.88zm7.96-1.16c-.01.01-.02.02-.03.03l-3.16 3.16-3.77-3.77 8.31-8.31 8.93-8.93 3.77 3.77zm16.27-16.28-.85.85-3.77-3.77.85-.85c.6-.6 1.37-.96 2.16-1 .74-.04 1.43.2 1.92.69s.73 1.17.69 1.92c-.04.79-.39 1.56-1 2.16z' />
										</g>
									</svg>

									<div>Build Resume</div>
								</a>
							)}
							{router?.asPath !== `/dashboard/profile` ? (
								<Link href={`/dashboard/profile`}>
									<a className={`${styles.link_wrapper} gray-color ${styles.profile} ${styles.subscription} ${router?.pathname?.includes('profile') && styles.active_link}`}>
										<svg xmlns='http://www.w3.org/2000/svg' enableBackground='new 0 0 512 512' viewBox='0 0 512 512'>
											<g id='_x32_2_cv'>
												<g>
													<path d='m433.011 7.726h-354.022c-14.324 0-25.978 11.652-25.978 25.976v444.597c0 14.324 11.654 25.976 25.978 25.976h354.023c14.324 0 25.978-11.652 25.978-25.976v-444.597c0-14.324-11.655-25.976-25.979-25.976zm16.243 470.572c0 8.957-7.286 16.24-16.242 16.24h-354.023c-8.957 0-16.242-7.283-16.242-16.24v-444.596c0-8.957 7.286-16.24 16.242-16.24h354.023c8.957 0 16.242 7.283 16.242 16.24z' />
													<path d='m383.793 103.554c8.145-5.918 13.471-15.491 13.471-26.306 0-17.937-14.595-32.532-32.532-32.532-17.939 0-32.534 14.595-32.534 32.532 0 10.815 5.327 20.388 13.472 26.306-20.641 7.751-35.395 27.633-35.395 50.947 0 2.691 2.18 4.868 4.868 4.868h99.179c2.688 0 4.868-2.177 4.868-4.868-.001-23.314-14.756-43.196-35.397-50.947zm-41.859-26.305c0-12.57 10.228-22.796 22.798-22.796s22.796 10.226 22.796 22.796-10.226 22.796-22.796 22.796-22.798-10.227-22.798-22.796zm-21.66 72.384c2.434-22.377 21.443-39.853 44.457-39.853s42.023 17.476 44.457 39.853z' />
													<path d='m108.825 72.419h145.761c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868h-145.761c-2.688 0-4.868 2.177-4.868 4.868s2.179 4.868 4.868 4.868z' />
													<path d='m108.825 109.78h145.761c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868h-145.761c-2.688 0-4.868 2.177-4.868 4.868s2.179 4.868 4.868 4.868z' />
													<path d='m108.825 147.147h145.761c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868h-145.761c-2.688 0-4.868 2.177-4.868 4.868s2.179 4.868 4.868 4.868z' />
													<path d='m414.321 440.528h-145.761c-2.688 0-4.868 2.177-4.868 4.868s2.18 4.868 4.868 4.868h145.761c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868z' />
													<path d='m414.321 202.779h-305.496c-2.688 0-4.868 2.177-4.868 4.868s2.18 4.868 4.868 4.868h305.496c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868z' />
													<path d='m414.321 262.218h-305.496c-2.688 0-4.868 2.177-4.868 4.868s2.18 4.868 4.868 4.868h305.496c2.688 0 4.868-2.177 4.868-4.868 0-2.69-2.18-4.868-4.868-4.868z' />
													<path d='m414.321 321.653h-305.496c-2.688 0-4.868 2.177-4.868 4.868s2.18 4.868 4.868 4.868h305.496c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868z' />
													<path d='m414.321 381.088h-305.496c-2.688 0-4.868 2.177-4.868 4.868s2.18 4.868 4.868 4.868h305.496c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868z' />
												</g>
											</g>
											<g id='Layer_1' />
										</svg>

										<div>Resume Profile</div>
									</a>
								</Link>
							) : (
								<a className={`${styles.link_wrapper} gray-color ${styles.profile} ${styles.subscription} ${router?.pathname?.includes('profile') && styles.active_link}`}>
									<svg xmlns='http://www.w3.org/2000/svg' enableBackground='new 0 0 512 512' viewBox='0 0 512 512'>
										<g id='_x32_2_cv'>
											<g>
												<path d='m433.011 7.726h-354.022c-14.324 0-25.978 11.652-25.978 25.976v444.597c0 14.324 11.654 25.976 25.978 25.976h354.023c14.324 0 25.978-11.652 25.978-25.976v-444.597c0-14.324-11.655-25.976-25.979-25.976zm16.243 470.572c0 8.957-7.286 16.24-16.242 16.24h-354.023c-8.957 0-16.242-7.283-16.242-16.24v-444.596c0-8.957 7.286-16.24 16.242-16.24h354.023c8.957 0 16.242 7.283 16.242 16.24z' />
												<path d='m383.793 103.554c8.145-5.918 13.471-15.491 13.471-26.306 0-17.937-14.595-32.532-32.532-32.532-17.939 0-32.534 14.595-32.534 32.532 0 10.815 5.327 20.388 13.472 26.306-20.641 7.751-35.395 27.633-35.395 50.947 0 2.691 2.18 4.868 4.868 4.868h99.179c2.688 0 4.868-2.177 4.868-4.868-.001-23.314-14.756-43.196-35.397-50.947zm-41.859-26.305c0-12.57 10.228-22.796 22.798-22.796s22.796 10.226 22.796 22.796-10.226 22.796-22.796 22.796-22.798-10.227-22.798-22.796zm-21.66 72.384c2.434-22.377 21.443-39.853 44.457-39.853s42.023 17.476 44.457 39.853z' />
												<path d='m108.825 72.419h145.761c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868h-145.761c-2.688 0-4.868 2.177-4.868 4.868s2.179 4.868 4.868 4.868z' />
												<path d='m108.825 109.78h145.761c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868h-145.761c-2.688 0-4.868 2.177-4.868 4.868s2.179 4.868 4.868 4.868z' />
												<path d='m108.825 147.147h145.761c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868h-145.761c-2.688 0-4.868 2.177-4.868 4.868s2.179 4.868 4.868 4.868z' />
												<path d='m414.321 440.528h-145.761c-2.688 0-4.868 2.177-4.868 4.868s2.18 4.868 4.868 4.868h145.761c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868z' />
												<path d='m414.321 202.779h-305.496c-2.688 0-4.868 2.177-4.868 4.868s2.18 4.868 4.868 4.868h305.496c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868z' />
												<path d='m414.321 262.218h-305.496c-2.688 0-4.868 2.177-4.868 4.868s2.18 4.868 4.868 4.868h305.496c2.688 0 4.868-2.177 4.868-4.868 0-2.69-2.18-4.868-4.868-4.868z' />
												<path d='m414.321 321.653h-305.496c-2.688 0-4.868 2.177-4.868 4.868s2.18 4.868 4.868 4.868h305.496c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868z' />
												<path d='m414.321 381.088h-305.496c-2.688 0-4.868 2.177-4.868 4.868s2.18 4.868 4.868 4.868h305.496c2.688 0 4.868-2.177 4.868-4.868s-2.18-4.868-4.868-4.868z' />
											</g>
										</g>
										<g id='Layer_1' />
									</svg>

									<div>Resume Profile</div>
								</a>
							)}
						</>
					</Accordion>
				)}

				{router?.asPath !== `/dashboard/changepassword` ? (
					<Link href={`/dashboard/changepassword`}>
						<a className={`${styles.link_wrapper} gray-color  ${router?.pathname?.includes('changepassword') ? styles.active_link : undefined}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z' />
							</svg>

							<div>Change Password</div>
						</a>
					</Link>
				) : (
					<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('changepassword') ? styles.active_link : undefined}`}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z' />
						</svg>

						<div>Change Password</div>
					</a>
				)}

				{userPosition !== undefined &&
					userPosition !== 'Sales Rep' &&
					(router?.asPath !== `/dashboard/coins` ? (
						<Link href={`/dashboard/coins`}>
							<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('coins') ? styles.active_link : undefined}`}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
									/>
								</svg>

								<div>Coins</div>
							</a>
						</Link>
					) : (
						<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('coins') ? styles.active_link : undefined}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
								/>
							</svg>

							<div>Coins</div>
						</a>
					))}

				{userPosition !== undefined &&
					userPosition !== 'Sales Rep' &&
					(router?.asPath !== `/dashboard/courses` ? (
						<Link href={`/dashboard/courses`}>
							<a className={`${styles.link_wrapper}  gray-color ${router?.pathname?.includes('courses') ? styles.active_link : undefined} ${styles.course_icon}`}>
								<svg width='20px' height='20px' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<path d='M27 4H5C3.34315 4 2 5.34315 2 7V25C2 26.6569 3.34315 28 5 28H27C28.6569 28 30 26.6569 30 25V7C30 5.34315 28.6569 4 27 4Z' fill='' />
									<path
										d='M25 24H7C6.73478 24 6.48043 23.8946 6.29289 23.7071C6.10536 23.5196 6 23.2652 6 23C6 22.7348 6.10536 22.4804 6.29289 22.2929C6.48043 22.1054 6.73478 22 7 22H25C25.2652 22 25.5196 22.1054 25.7071 22.2929C25.8946 22.4804 26 22.7348 26 23C26 23.2652 25.8946 23.5196 25.7071 23.7071C25.5196 23.8946 25.2652 24 25 24Z'
										fill='#b9bbbd'
									/>
									<path
										d='M19 25C18.7348 25 18.4804 24.8946 18.2929 24.7071C18.1054 24.5196 18 24.2652 18 24V22C18 21.7348 18.1054 21.4804 18.2929 21.2929C18.4804 21.1054 18.7348 21 19 21C19.2652 21 19.5196 21.1054 19.7071 21.2929C19.8946 21.4804 20 21.7348 20 22V24C20 24.2652 19.8946 24.5196 19.7071 24.7071C19.5196 24.8946 19.2652 25 19 25Z'
										fill='#b9bbbd'
									/>
									<path
										d='M20.45 12.67L13.45 9.16996C13.2978 9.09325 13.1285 9.05673 12.9581 9.06386C12.7878 9.071 12.6222 9.12155 12.4769 9.21072C12.3316 9.2999 12.2115 9.42473 12.1281 9.57336C12.0446 9.722 12.0005 9.8895 12 10.06V17.94C12.0013 18.1182 12.0502 18.2928 12.1416 18.4457C12.233 18.5987 12.3637 18.7244 12.52 18.81C12.6648 18.897 12.831 18.942 13 18.94C13.1872 18.9406 13.3709 18.8886 13.53 18.79L20.53 14.41C20.6816 14.3156 20.8051 14.1823 20.8877 14.024C20.9704 13.8658 21.0091 13.6883 21 13.51C20.9905 13.3339 20.9347 13.1635 20.8381 13.0159C20.7415 12.8684 20.6076 12.7491 20.45 12.67Z'
										fill='#b9bbbd'
									/>
									<path d='M5 4C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V25C2 25.7956 2.31607 26.5587 2.87868 27.1213C3.44129 27.6839 4.20435 28 5 28H16V4H5Z' fill='' />
									<path d='M7 22C6.73478 22 6.48043 22.1054 6.29289 22.2929C6.10536 22.4804 6 22.7348 6 23C6 23.2652 6.10536 23.5196 6.29289 23.7071C6.48043 23.8946 6.73478 24 7 24H16V22H7Z' fill='#b9bbbd' />
									<path
										d='M13.45 9.16996C13.2978 9.09325 13.1285 9.05673 12.9581 9.06386C12.7878 9.071 12.6222 9.12155 12.4769 9.21072C12.3316 9.2999 12.2115 9.42473 12.1281 9.57336C12.0446 9.722 12.0005 9.8895 12 10.06V17.94C12.0013 18.1182 12.0502 18.2928 12.1416 18.4457C12.233 18.5987 12.3637 18.7244 12.52 18.81C12.6648 18.897 12.831 18.942 13 18.94C13.1872 18.9406 13.3709 18.8886 13.53 18.79L16 17.24V10.44L13.45 9.16996Z'
										fill='#b9bbbd'
									/>
									<path
										d='M27 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V25C2 25.7956 2.31607 26.5587 2.87868 27.1213C3.44129 27.6839 4.20435 28 5 28H27C27.7956 28 28.5587 27.6839 29.1213 27.1213C29.6839 26.5587 30 25.7956 30 25V7C30 6.20435 29.6839 5.44129 29.1213 4.87868C28.5587 4.31607 27.7956 4 27 4ZM28 25C28 25.2652 27.8946 25.5196 27.7071 25.7071C27.5196 25.8946 27.2652 26 27 26H5C4.73478 26 4.48043 25.8946 4.29289 25.7071C4.10536 25.5196 4 25.2652 4 25V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H27C27.2652 6 27.5196 6.10536 27.7071 6.29289C27.8946 6.48043 28 6.73478 28 7V25Z'
										fill='#b9bbbd'
									/>
								</svg>

								<div>Courses</div>
							</a>
						</Link>
					) : (
						<a className={`${styles.link_wrapper} ${router?.pathname?.includes('courses') ? styles.active_link : undefined} ${styles.course_icon}`}>
							<svg width='20px' height='20px' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path d='M27 4H5C3.34315 4 2 5.34315 2 7V25C2 26.6569 3.34315 28 5 28H27C28.6569 28 30 26.6569 30 25V7C30 5.34315 28.6569 4 27 4Z' fill='transparent' />
								<path
									d='M25 24H7C6.73478 24 6.48043 23.8946 6.29289 23.7071C6.10536 23.5196 6 23.2652 6 23C6 22.7348 6.10536 22.4804 6.29289 22.2929C6.48043 22.1054 6.73478 22 7 22H25C25.2652 22 25.5196 22.1054 25.7071 22.2929C25.8946 22.4804 26 22.7348 26 23C26 23.2652 25.8946 23.5196 25.7071 23.7071C25.5196 23.8946 25.2652 24 25 24Z'
									fill='var(--primary)'
								/>
								<path
									d='M19 25C18.7348 25 18.4804 24.8946 18.2929 24.7071C18.1054 24.5196 18 24.2652 18 24V22C18 21.7348 18.1054 21.4804 18.2929 21.2929C18.4804 21.1054 18.7348 21 19 21C19.2652 21 19.5196 21.1054 19.7071 21.2929C19.8946 21.4804 20 21.7348 20 22V24C20 24.2652 19.8946 24.5196 19.7071 24.7071C19.5196 24.8946 19.2652 25 19 25Z'
									fill='var(--primary)'
								/>
								<path
									d='M20.45 12.67L13.45 9.16996C13.2978 9.09325 13.1285 9.05673 12.9581 9.06386C12.7878 9.071 12.6222 9.12155 12.4769 9.21072C12.3316 9.2999 12.2115 9.42473 12.1281 9.57336C12.0446 9.722 12.0005 9.8895 12 10.06V17.94C12.0013 18.1182 12.0502 18.2928 12.1416 18.4457C12.233 18.5987 12.3637 18.7244 12.52 18.81C12.6648 18.897 12.831 18.942 13 18.94C13.1872 18.9406 13.3709 18.8886 13.53 18.79L20.53 14.41C20.6816 14.3156 20.8051 14.1823 20.8877 14.024C20.9704 13.8658 21.0091 13.6883 21 13.51C20.9905 13.3339 20.9347 13.1635 20.8381 13.0159C20.7415 12.8684 20.6076 12.7491 20.45 12.67Z'
									fill='var(--primary)'
								/>
								<path d='M5 4C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V25C2 25.7956 2.31607 26.5587 2.87868 27.1213C3.44129 27.6839 4.20435 28 5 28H16V4H5Z' fill='transparent' />
								<path d='M7 22C6.73478 22 6.48043 22.1054 6.29289 22.2929C6.10536 22.4804 6 22.7348 6 23C6 23.2652 6.10536 23.5196 6.29289 23.7071C6.48043 23.8946 6.73478 24 7 24H16V22H7Z' fill='var(--primary)' />
								<path
									d='M13.45 9.16996C13.2978 9.09325 13.1285 9.05673 12.9581 9.06386C12.7878 9.071 12.6222 9.12155 12.4769 9.21072C12.3316 9.2999 12.2115 9.42473 12.1281 9.57336C12.0446 9.722 12.0005 9.8895 12 10.06V17.94C12.0013 18.1182 12.0502 18.2928 12.1416 18.4457C12.233 18.5987 12.3637 18.7244 12.52 18.81C12.6648 18.897 12.831 18.942 13 18.94C13.1872 18.9406 13.3709 18.8886 13.53 18.79L16 17.24V10.44L13.45 9.16996Z'
									fill='var(--primary)'
								/>
								<path
									d='M27 4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V25C2 25.7956 2.31607 26.5587 2.87868 27.1213C3.44129 27.6839 4.20435 28 5 28H27C27.7956 28 28.5587 27.6839 29.1213 27.1213C29.6839 26.5587 30 25.7956 30 25V7C30 6.20435 29.6839 5.44129 29.1213 4.87868C28.5587 4.31607 27.7956 4 27 4ZM28 25C28 25.2652 27.8946 25.5196 27.7071 25.7071C27.5196 25.8946 27.2652 26 27 26H5C4.73478 26 4.48043 25.8946 4.29289 25.7071C4.10536 25.5196 4 25.2652 4 25V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H27C27.2652 6 27.5196 6.10536 27.7071 6.29289C27.8946 6.48043 28 6.73478 28 7V25Z'
									fill='var(--primary)'
								/>
							</svg>

							<div>Courses</div>
						</a>
					))}

				{userPosition !== undefined &&
					userPosition !== 'Sales Rep' &&
					(router?.asPath !== `/dashboard/delivery-address` ? (
						<Link href={`/dashboard/delivery-address`}>
							<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('delivery-address') && styles.active_link}`}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
									<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
								</svg>

								<div>Delivery Address</div>
							</a>
						</Link>
					) : (
						<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('delivery-address') && styles.active_link}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
								<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
							</svg>

							<div>Delivery Address</div>
						</a>
					))}

				{userPosition !== undefined &&
					userPosition !== 'Sales Rep' &&
					(router?.asPath !== `/dashboard/documents` ? (
						<Link href={`/dashboard/documents`}>
							<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('documents') && styles.active_link}`}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
									/>
								</svg>

								<div>Documents</div>
							</a>
						</Link>
					) : (
						<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('documents') && styles.active_link}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
								/>
							</svg>

							<div>Documents</div>
						</a>
					))}

				{router?.asPath !== `/dashboard/following` ? (
					<Link href={`/dashboard/following`}>
						<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('following') && styles.active_link}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z' />
							</svg>

							<div>Following</div>
						</a>
					</Link>
				) : (
					<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('following') && styles.active_link}`}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z' />
						</svg>

						<div>Following</div>
					</a>
				)}
				{userPosition === 'Sales Rep' &&
					(router?.asPath !== `/dashboard/interviews` ? (
						<Link href={`/dashboard/interviews`}>
							<a className={`${styles.link_wrapper} ${styles.subscription} gray-color ${router?.pathname?.includes('interviews') ? styles.active_link : undefined}`}>
								<svg fill='var(--gray-icon)' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='800px' height='800px' viewBox='0 0 452.388 452.388' xmlSpace='preserve'>
									<g>
										<g id='Layer_8_38_'>
											<path
												d='M441.677,43.643H10.687C4.785,43.643,0,48.427,0,54.329v297.425c0,5.898,4.785,10.676,10.687,10.676h162.069v25.631
			c0,0.38,0.074,0.722,0.112,1.089h-23.257c-5.407,0-9.796,4.389-9.796,9.795c0,5.408,4.389,9.801,9.796,9.801h158.506
			c5.406,0,9.795-4.389,9.795-9.801c0-5.406-4.389-9.795-9.795-9.795h-23.256c0.032-0.355,0.115-0.709,0.115-1.089V362.43H441.7
			c5.898,0,10.688-4.782,10.688-10.676V54.329C452.37,48.427,447.589,43.643,441.677,43.643z M422.089,305.133
			c0,5.903-4.784,10.687-10.683,10.687H40.96c-5.898,0-10.684-4.783-10.684-10.687V79.615c0-5.898,4.786-10.684,10.684-10.684
			h370.446c5.898,0,10.683,4.785,10.683,10.684V305.133z M303.942,290.648H154.025c0-29.872,17.472-55.661,42.753-67.706
			c-15.987-10.501-26.546-28.571-26.546-49.13c0-32.449,26.306-58.755,58.755-58.755c32.448,0,58.753,26.307,58.753,58.755
			c0,20.553-10.562,38.629-26.545,49.13C286.475,234.987,303.942,260.781,303.942,290.648z'
											/>
										</g>
									</g>
								</svg>

								<div>Interviews</div>
							</a>
						</Link>
					) : (
						<a className={`${styles.link_wrapper} ${styles.subscription} gray-color ${router?.pathname?.includes('interviews') ? styles.active_link : undefined}`}>
							<svg fill='var(--gray-icon)' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='800px' height='800px' viewBox='0 0 452.388 452.388' xmlSpace='preserve'>
								<g>
									<g id='Layer_8_38_'>
										<path
											d='M441.677,43.643H10.687C4.785,43.643,0,48.427,0,54.329v297.425c0,5.898,4.785,10.676,10.687,10.676h162.069v25.631
			c0,0.38,0.074,0.722,0.112,1.089h-23.257c-5.407,0-9.796,4.389-9.796,9.795c0,5.408,4.389,9.801,9.796,9.801h158.506
			c5.406,0,9.795-4.389,9.795-9.801c0-5.406-4.389-9.795-9.795-9.795h-23.256c0.032-0.355,0.115-0.709,0.115-1.089V362.43H441.7
			c5.898,0,10.688-4.782,10.688-10.676V54.329C452.37,48.427,447.589,43.643,441.677,43.643z M422.089,305.133
			c0,5.903-4.784,10.687-10.683,10.687H40.96c-5.898,0-10.684-4.783-10.684-10.687V79.615c0-5.898,4.786-10.684,10.684-10.684
			h370.446c5.898,0,10.683,4.785,10.683,10.684V305.133z M303.942,290.648H154.025c0-29.872,17.472-55.661,42.753-67.706
			c-15.987-10.501-26.546-28.571-26.546-49.13c0-32.449,26.306-58.755,58.755-58.755c32.448,0,58.753,26.307,58.753,58.755
			c0,20.553-10.562,38.629-26.545,49.13C286.475,234.987,303.942,260.781,303.942,290.648z'
										/>
									</g>
								</g>
							</svg>

							<div>Interviews</div>
						</a>
					))}

				{router?.asPath !== `/dashboard/messages` ? (
					<Link href={`/dashboard/messages`}>
						<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('messages') ? styles.active_link : undefined}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
								/>
							</svg>

							<div>Messages</div>
						</a>
					</Link>
				) : (
					<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('messages') ? styles.active_link : undefined}`}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
							/>
						</svg>

						<div>Messages</div>
					</a>
				)}

				{userPosition !== undefined &&
					userPosition !== 'Sales Rep' &&
					(router?.asPath !== `/dashboard/my-addresses` ? (
						<Link href={`/dashboard/my-addresses`}>
							<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('my-addresses') ? styles.active_link : undefined}`}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z'
									/>
								</svg>

								<div>My Addresses</div>
							</a>
						</Link>
					) : (
						<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('my-addresses') ? styles.active_link : undefined}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z'
								/>
							</svg>

							<div>My Addresses</div>
						</a>
					))}

				{userPosition !== undefined &&
					userPosition !== 'Sales Rep' &&
					(router?.asPath !== `/dashboard/wishlist` ? (
						<Link href={`/dashboard/wishlist`}>
							<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('wishlist') ? styles.active_link : undefined}`}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
								</svg>

								<div>My Wishlist</div>
							</a>
						</Link>
					) : (
						<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('wishlist') ? styles.active_link : undefined}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
							</svg>

							<div>My Wishlist</div>
						</a>
					))}

				{router?.asPath !== `/dashboard/notifications` ? (
					<Link href={`/dashboard/notifications`}>
						<a className={`${styles.link_wrapper} gray-color`}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='var(--gray-icon)'>
								<path d='M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z' />
								<path
									fillRule='evenodd'
									d='M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z'
									clipRule='evenodd'
								/>
							</svg>

							<div>Notifications</div>
						</a>
					</Link>
				) : (
					<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('notifications') ? styles.active_link : undefined}`}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='var(--gray-icon)'>
							<path d='M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z' />
							<path
								fillRule='evenodd'
								d='M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z'
								clipRule='evenodd'
							/>
						</svg>

						<div>Notifications</div>
					</a>
				)}

				{userPosition !== undefined &&
					userPosition !== 'Sales Rep' &&
					(router?.asPath !== `/dashboard/all-orders` ? (
						<Link href={`/dashboard/all-orders`}>
							<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('orders') && styles.active_link}`}>
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
									/>
								</svg>

								<div>Orders</div>
							</a>
						</Link>
					) : (
						<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('orders') && styles.active_link}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
								/>
							</svg>

							<div>Orders</div>
						</a>
					))}

				{router?.asPath !== `/dashboard/pet-badges` ? (
					<Link href={`/dashboard/pet-badges`}>
						<a className={`${styles.link_wrapper} gray-color ${styles.subscription} ${router?.pathname?.includes('pet-badges') && styles.active_link}`}>
							<svg id='Capa_1' enableBackground='new 0 0 511.966 511.966' height={25} viewBox='0 0 511.966 511.966' width={25} xmlns='http://www.w3.org/2000/svg'>
								<g>
									<path d='m97.729 404.608c0 39.378 32.037 71.416 71.416 71.416 13.733 0 26.645 5.348 36.356 15.06 13.922 13.922 32.21 20.883 50.498 20.883s36.576-6.961 50.498-20.883c9.711-9.711 22.623-15.06 36.357-15.06 39.379 0 71.416-32.037 71.416-71.416 0-13.734 5.348-26.646 15.059-36.356 27.845-27.845 27.845-73.152 0-100.997-9.711-9.71-15.059-22.622-15.059-36.356 0-28.625-16.936-53.355-41.307-64.736l30.766-26.892c2.172-1.899 3.419-4.644 3.419-7.529v-121.742c0-5.523-4.477-10-10-10h-282.295c-5.523 0-10 4.477-10 10v121.741c0 2.885 1.246 5.629 3.418 7.528l30.762 26.895c-24.369 11.381-41.304 36.111-41.304 64.735 0 13.734-5.348 26.646-15.059 36.356-13.489 13.489-20.917 31.422-20.917 50.499 0 19.076 7.429 37.01 20.917 50.498 9.711 9.71 15.059 22.622 15.059 36.356zm289.42-384.608v107.2l-37.324 32.625c-9.387-.915-18.057-.651-26.964-4.415v-135.41zm-86.525 119.175c-12.561-10.085-28.517-15.662-44.623-15.662-17.155 0-33.931 6.263-46.859 17.54v-121.053h93.719v121.055c-.718-.661-1.463-1.288-2.237-1.88zm-138.456 20.649-37.315-32.624v-107.2h64.289v135.426c-.107.045-.212.099-.32.144-4.697 1.948-9.593 3.175-14.612 3.667-4.005.389-8.036.196-12.042.587zm-65.355 121.573c13.488-13.489 20.917-31.422 20.917-50.499 0-15.697 7.385-30.713 19.694-40.416 10.601-8.356 22.273-10.447 35.276-11.086 10.03-.488 19.921-3.149 28.863-7.707 9.288-4.734 15.814-12.157 24.057-18.252 17.782-13.038 42.792-13.076 60.617-.1 9.671 7.064 18.024 16.049 29.275 20.709 11.314 4.686 23.634 4.194 35.517 6.094 24.479 3.928 43.241 25.19 43.241 50.759 0 19.076 7.428 37.01 20.917 50.499 9.711 9.711 15.059 22.622 15.059 36.356 0 13.733-5.348 26.645-15.06 36.356-13.488 13.489-20.917 31.422-20.917 50.499 0 28.351-23.065 51.416-51.416 51.416-19.076 0-37.01 7.429-50.499 20.917-20.047 20.047-52.665 20.047-72.712 0-13.489-13.488-31.423-20.917-50.499-20.917-28.351 0-51.416-23.065-51.416-51.416 0-19.076-7.428-37.01-20.917-50.499-20.044-20.048-20.044-52.666.003-72.713z' />
									<path d='m256 447.105c71.325 0 129.352-58.027 129.352-129.352 0-26.637-8.036-52.22-23.238-73.984-14.851-21.26-35.441-37.416-59.545-46.722-5.157-1.989-10.941.576-12.931 5.728-1.989 5.152.575 10.941 5.728 12.931 20.378 7.867 37.79 21.531 50.353 39.517 12.845 18.388 19.634 40.011 19.634 62.531 0 60.297-49.055 109.352-109.352 109.352s-109.353-49.056-109.353-109.353c0-22.5 6.779-44.108 19.603-62.487 12.543-17.975 29.93-31.642 50.282-39.522 5.15-1.994 7.708-7.786 5.714-12.936-1.994-5.149-7.785-7.709-12.936-5.714-24.073 9.321-44.635 25.479-59.461 46.727-15.179 21.752-23.202 47.318-23.202 73.932 0 71.325 58.027 129.352 129.352 129.352z' />
									<path d='m190.486 263.389c-3.532 1.638-5.792 5.178-5.792 9.072v61.946c0 34.94 29.519 64.458 64.458 64.458h15.221c34.943 0 64.465-29.521 64.465-64.465v-61.94c0-3.894-2.26-7.433-5.792-9.071-3.532-1.639-7.694-1.078-10.667 1.436l-32.229 27.261c-15.144-5.289-31.636-5.29-46.78 0l-32.217-27.259c-2.973-2.515-7.135-3.078-10.667-1.438zm14.208 30.632 20.345 17.214c2.954 2.499 7.082 3.071 10.603 1.467 13.422-6.109 28.815-6.109 42.237 0 3.519 1.603 7.648 1.031 10.601-1.466l20.358-17.22v40.384c0 24.103-20.362 44.465-44.465 44.465h-15.221c-24.099 0-44.458-20.359-44.458-44.458z' />
									<path d='m227.19 339.82c2.095 5.029 8.023 7.49 13.06 5.41 5.039-2.081 7.487-8.03 5.41-13.06-2.08-5.037-8.026-7.495-13.06-5.41-5.047 2.09-7.476 8.02-5.41 13.06z' />
									<path d='m267.87 339.82c2.093 5.024 8.022 7.503 13.06 5.41 5.032-2.09 7.489-8.026 5.41-13.06-2.079-5.035-8.031-7.492-13.06-5.41-5.05 2.09-7.478 8.015-5.41 13.06z' />
									<path d='m246.77 202.23c2.095 5.03 8.009 7.492 13.05 5.41 5.034-2.079 7.496-8.032 5.41-13.06-2.089-5.033-8.019-7.497-13.06-5.41-5.048 2.089-7.462 8.025-5.4 13.06z' />
								</g>
							</svg>

							<div>Pet Badges</div>
						</a>
					</Link>
				) : (
					<a className={`${styles.link_wrapper} gray-color ${styles.subscription} ${router?.pathname?.includes('pet-badges') && styles.active_link}`}>
						<svg id='Capa_1' enableBackground='new 0 0 511.966 511.966' height={25} viewBox='0 0 511.966 511.966' width={25} xmlns='http://www.w3.org/2000/svg'>
							<g>
								<path d='m97.729 404.608c0 39.378 32.037 71.416 71.416 71.416 13.733 0 26.645 5.348 36.356 15.06 13.922 13.922 32.21 20.883 50.498 20.883s36.576-6.961 50.498-20.883c9.711-9.711 22.623-15.06 36.357-15.06 39.379 0 71.416-32.037 71.416-71.416 0-13.734 5.348-26.646 15.059-36.356 27.845-27.845 27.845-73.152 0-100.997-9.711-9.71-15.059-22.622-15.059-36.356 0-28.625-16.936-53.355-41.307-64.736l30.766-26.892c2.172-1.899 3.419-4.644 3.419-7.529v-121.742c0-5.523-4.477-10-10-10h-282.295c-5.523 0-10 4.477-10 10v121.741c0 2.885 1.246 5.629 3.418 7.528l30.762 26.895c-24.369 11.381-41.304 36.111-41.304 64.735 0 13.734-5.348 26.646-15.059 36.356-13.489 13.489-20.917 31.422-20.917 50.499 0 19.076 7.429 37.01 20.917 50.498 9.711 9.71 15.059 22.622 15.059 36.356zm289.42-384.608v107.2l-37.324 32.625c-9.387-.915-18.057-.651-26.964-4.415v-135.41zm-86.525 119.175c-12.561-10.085-28.517-15.662-44.623-15.662-17.155 0-33.931 6.263-46.859 17.54v-121.053h93.719v121.055c-.718-.661-1.463-1.288-2.237-1.88zm-138.456 20.649-37.315-32.624v-107.2h64.289v135.426c-.107.045-.212.099-.32.144-4.697 1.948-9.593 3.175-14.612 3.667-4.005.389-8.036.196-12.042.587zm-65.355 121.573c13.488-13.489 20.917-31.422 20.917-50.499 0-15.697 7.385-30.713 19.694-40.416 10.601-8.356 22.273-10.447 35.276-11.086 10.03-.488 19.921-3.149 28.863-7.707 9.288-4.734 15.814-12.157 24.057-18.252 17.782-13.038 42.792-13.076 60.617-.1 9.671 7.064 18.024 16.049 29.275 20.709 11.314 4.686 23.634 4.194 35.517 6.094 24.479 3.928 43.241 25.19 43.241 50.759 0 19.076 7.428 37.01 20.917 50.499 9.711 9.711 15.059 22.622 15.059 36.356 0 13.733-5.348 26.645-15.06 36.356-13.488 13.489-20.917 31.422-20.917 50.499 0 28.351-23.065 51.416-51.416 51.416-19.076 0-37.01 7.429-50.499 20.917-20.047 20.047-52.665 20.047-72.712 0-13.489-13.488-31.423-20.917-50.499-20.917-28.351 0-51.416-23.065-51.416-51.416 0-19.076-7.428-37.01-20.917-50.499-20.044-20.048-20.044-52.666.003-72.713z' />
								<path d='m256 447.105c71.325 0 129.352-58.027 129.352-129.352 0-26.637-8.036-52.22-23.238-73.984-14.851-21.26-35.441-37.416-59.545-46.722-5.157-1.989-10.941.576-12.931 5.728-1.989 5.152.575 10.941 5.728 12.931 20.378 7.867 37.79 21.531 50.353 39.517 12.845 18.388 19.634 40.011 19.634 62.531 0 60.297-49.055 109.352-109.352 109.352s-109.353-49.056-109.353-109.353c0-22.5 6.779-44.108 19.603-62.487 12.543-17.975 29.93-31.642 50.282-39.522 5.15-1.994 7.708-7.786 5.714-12.936-1.994-5.149-7.785-7.709-12.936-5.714-24.073 9.321-44.635 25.479-59.461 46.727-15.179 21.752-23.202 47.318-23.202 73.932 0 71.325 58.027 129.352 129.352 129.352z' />
								<path d='m190.486 263.389c-3.532 1.638-5.792 5.178-5.792 9.072v61.946c0 34.94 29.519 64.458 64.458 64.458h15.221c34.943 0 64.465-29.521 64.465-64.465v-61.94c0-3.894-2.26-7.433-5.792-9.071-3.532-1.639-7.694-1.078-10.667 1.436l-32.229 27.261c-15.144-5.289-31.636-5.29-46.78 0l-32.217-27.259c-2.973-2.515-7.135-3.078-10.667-1.438zm14.208 30.632 20.345 17.214c2.954 2.499 7.082 3.071 10.603 1.467 13.422-6.109 28.815-6.109 42.237 0 3.519 1.603 7.648 1.031 10.601-1.466l20.358-17.22v40.384c0 24.103-20.362 44.465-44.465 44.465h-15.221c-24.099 0-44.458-20.359-44.458-44.458z' />
								<path d='m227.19 339.82c2.095 5.029 8.023 7.49 13.06 5.41 5.039-2.081 7.487-8.03 5.41-13.06-2.08-5.037-8.026-7.495-13.06-5.41-5.047 2.09-7.476 8.02-5.41 13.06z' />
								<path d='m267.87 339.82c2.093 5.024 8.022 7.503 13.06 5.41 5.032-2.09 7.489-8.026 5.41-13.06-2.079-5.035-8.031-7.492-13.06-5.41-5.05 2.09-7.478 8.015-5.41 13.06z' />
								<path d='m246.77 202.23c2.095 5.03 8.009 7.492 13.05 5.41 5.034-2.079 7.496-8.032 5.41-13.06-2.089-5.033-8.019-7.497-13.06-5.41-5.048 2.089-7.462 8.025-5.4 13.06z' />
							</g>
						</svg>

						<div>Pet Badges</div>
					</a>
				)}

				{userPosition !== undefined &&
					userPosition !== 'Sales Rep' &&
					(router?.asPath !== `/dashboard/subscriptions` ? (
						<Link href={`/dashboard/subscriptions`}>
							<a className={`${styles.link_wrapper} gray-color ${styles.subscription} ${router?.pathname?.includes('subscriptions') && styles.active_link}`}>
								<svg xmlns='http://www.w3.org/2000/svg' shapeRendering='geometricPrecision' textRendering='geometricPrecision' imageRendering='optimizeQuality' fillRule='evenodd' clipRule='evenodd' viewBox='0 0 512 496.61'>
									<path d='M42.09 42.35h38.82v51.8c0 14.4 6.7 27.13 17.51 35.98 9.13 7.49 21.28 12.13 34.26 12.13 12.99 0 25.14-4.64 34.28-12.13 10.8-8.85 17.5-21.58 17.5-35.98v-51.8h78.39v51.8c0 14.4 6.69 27.13 17.5 35.98 9.13 7.49 21.29 12.13 34.27 12.13 12.98 0 25.14-4.64 34.27-12.13 10.81-8.85 17.51-21.58 17.51-35.98v-51.8h40.52c11.56 0 22.08 4.75 29.72 12.38 7.64 7.61 12.38 18.14 12.38 29.72v144.24a157.45 157.45 0 0 0-17.98-5.73v-58.75H17.98v244.83c0 18.19 14.89 33.1 33.1 33.1h201.39a154.57 154.57 0 0 0 10.28 17.97H42.09c-11.54 0-22.06-4.73-29.7-12.36C4.74 440.08 0 429.57 0 418.03V84.44c0-11.56 4.74-22.07 12.36-29.7 7.65-7.65 18.18-12.39 29.73-12.39zm324.19 430.69c5.37 1.43 8.56 6.95 7.13 12.32-1.44 5.37-6.96 8.56-12.32 7.13a120.88 120.88 0 0 1-13.74-4.57c-25.72-10.29-46.32-28.83-59.5-51.65-15.46-26.74-20.7-59.38-12.09-91.54 8.61-32.15 29.47-57.78 56.22-73.23 26.73-15.46 59.38-20.71 91.54-12.08 11.24 3.01 21.69 7.51 31.18 13.23a120.08 120.08 0 0 1 21 16.1l-.55-5.33c-.56-5.51 3.44-10.44 8.95-11 5.51-.56 10.43 3.45 11 8.96l2.88 27.82c.1 1.02.05 2.03-.15 2.99-.42 4.99-4.53 8.99-9.66 9.15l-27.95.99c-5.52.17-10.15-4.18-10.32-9.7-.17-5.53 4.17-10.15 9.69-10.32l1.12-.04c-4.98-4.63-10.47-8.78-16.4-12.37-7.92-4.78-16.63-8.53-25.99-11.04-26.82-7.18-54.01-2.82-76.26 10.03-22.29 12.84-39.66 34.21-46.84 61.03-7.19 26.82-2.84 54.01 10.02 76.28 6.39 11.09 14.89 20.97 25.13 28.97 10.19 7.98 23.41 14.54 35.91 17.87zm21.37-160.44h20.09l-.48 12.66c8.45.53 15.83 1.37 22.16 2.54l-4.59 24.51H401.1c-3.69 0-6.15.58-7.36 1.74-1.21 1.16-1.87 3.38-1.98 6.64l9.97 1.11c12.13 1.37 20.49 4.48 25.08 9.34 4.58 4.85 6.88 11.12 6.88 18.82 0 7.7-.8 13.85-2.38 18.43-1.58 4.58-3.85 8.09-6.8 10.52-5.38 4.11-12.44 6.49-21.19 7.12l-.48 15.97h-20.41l.64-15.97c-10.02-.73-18.51-2.01-25.47-3.8l4.58-25.15c8.76 2.32 17.93 3.48 27.53 3.48 4.01 0 7.75-.21 11.23-.63v-6.65l-9.81-1.11c-12.66-1.26-21.09-4.95-25.31-11.07-3.69-5.37-5.53-12.39-5.53-21.04 0-11.38 2.34-19.66 7.04-24.83 4.69-5.17 11.3-8.34 19.85-9.49l.47-13.14zm10.79 163.84c-13.97 1.17-11.44 21.17 1.08 20.13 7.13-.34 14.89-1.52 21.82-3.25 12.86-3.22 8.01-22.79-4.91-19.55-5.95 1.45-11.88 2.3-17.99 2.67zm51.19-17.66c-10.86 7.61.68 24.13 11.55 16.52 5.89-4.05 11.85-9.12 16.82-14.25 9.13-9.13-4.81-23.69-14.47-14.04-4 4.19-9.12 8.49-13.9 11.77zm34.42-42.03c-5.4 11.87 12.83 20.48 18.43 8.16 3.08-6.97 5.14-13.44 7.06-20.79 3.17-12.65-16.32-17.82-19.6-4.69-1.74 6.23-3.25 11.36-5.89 17.32zm7.88-53.71c2.11 12.71 20.07 10.98 20.07-1.51l-.08-1.09c-1-7.42-2.51-14.26-4.77-21.42-4.29-12.87-23.3-6.18-19.19 6.16a105.17 105.17 0 0 1 3.97 17.86zm-294.54-43.78h49.42c-6.41 17.06-9.94 35.54-9.94 54.84 0 3.59.14 7.16.38 10.69h-39.86c-4.21 0-7.69-3.45-7.69-7.67v-50.18c0-4.22 3.46-7.68 7.69-7.68zm0-106.69h60.3c4.23 0 7.68 3.47 7.68 7.68v50.17c0 4.2-3.47 7.68-7.68 7.68h-60.3c-4.21 0-7.69-3.46-7.69-7.68v-50.17c0-4.23 3.46-7.68 7.69-7.68zm-121.63 0h60.3c4.23 0 7.69 3.47 7.69 7.68v50.17c0 4.2-3.48 7.68-7.69 7.68h-60.3c-4.21 0-7.68-3.46-7.68-7.68v-50.17c0-4.23 3.46-7.68 7.68-7.68zm243.25 0h60.31c3.57 0 6.58 2.48 7.44 5.78-27.59 1.04-53.33 9.25-75.43 22.81v-20.91c0-4.23 3.46-7.68 7.68-7.68zM75.76 319.26h60.3c4.23 0 7.69 3.48 7.69 7.68v50.18c0 4.2-3.48 7.67-7.69 7.67h-60.3c-4.21 0-7.68-3.45-7.68-7.67v-50.18c0-4.22 3.46-7.68 7.68-7.68zM294.3 16.66C294.3 7.47 303.39 0 314.62 0c11.24 0 20.33 7.47 20.33 16.66v77.49c0 9.19-9.09 16.66-20.33 16.66-11.23 0-20.32-7.47-20.32-16.66V16.66zm-181.94 0c0-9.19 9.09-16.66 20.32-16.66 11.24 0 20.33 7.47 20.33 16.66v77.49c0 9.19-9.09 16.66-20.33 16.66-11.23 0-20.32-7.47-20.32-16.66V16.66z' />
								</svg>

								<div>Subscriptions</div>
							</a>
						</Link>
					) : (
						<a className={`${styles.link_wrapper} gray-color ${styles.subscription} ${router?.pathname?.includes('subscriptions') && styles.active_link}`}>
							<svg xmlns='http://www.w3.org/2000/svg' shapeRendering='geometricPrecision' textRendering='geometricPrecision' imageRendering='optimizeQuality' fillRule='evenodd' clipRule='evenodd' viewBox='0 0 512 496.61'>
								<path d='M42.09 42.35h38.82v51.8c0 14.4 6.7 27.13 17.51 35.98 9.13 7.49 21.28 12.13 34.26 12.13 12.99 0 25.14-4.64 34.28-12.13 10.8-8.85 17.5-21.58 17.5-35.98v-51.8h78.39v51.8c0 14.4 6.69 27.13 17.5 35.98 9.13 7.49 21.29 12.13 34.27 12.13 12.98 0 25.14-4.64 34.27-12.13 10.81-8.85 17.51-21.58 17.51-35.98v-51.8h40.52c11.56 0 22.08 4.75 29.72 12.38 7.64 7.61 12.38 18.14 12.38 29.72v144.24a157.45 157.45 0 0 0-17.98-5.73v-58.75H17.98v244.83c0 18.19 14.89 33.1 33.1 33.1h201.39a154.57 154.57 0 0 0 10.28 17.97H42.09c-11.54 0-22.06-4.73-29.7-12.36C4.74 440.08 0 429.57 0 418.03V84.44c0-11.56 4.74-22.07 12.36-29.7 7.65-7.65 18.18-12.39 29.73-12.39zm324.19 430.69c5.37 1.43 8.56 6.95 7.13 12.32-1.44 5.37-6.96 8.56-12.32 7.13a120.88 120.88 0 0 1-13.74-4.57c-25.72-10.29-46.32-28.83-59.5-51.65-15.46-26.74-20.7-59.38-12.09-91.54 8.61-32.15 29.47-57.78 56.22-73.23 26.73-15.46 59.38-20.71 91.54-12.08 11.24 3.01 21.69 7.51 31.18 13.23a120.08 120.08 0 0 1 21 16.1l-.55-5.33c-.56-5.51 3.44-10.44 8.95-11 5.51-.56 10.43 3.45 11 8.96l2.88 27.82c.1 1.02.05 2.03-.15 2.99-.42 4.99-4.53 8.99-9.66 9.15l-27.95.99c-5.52.17-10.15-4.18-10.32-9.7-.17-5.53 4.17-10.15 9.69-10.32l1.12-.04c-4.98-4.63-10.47-8.78-16.4-12.37-7.92-4.78-16.63-8.53-25.99-11.04-26.82-7.18-54.01-2.82-76.26 10.03-22.29 12.84-39.66 34.21-46.84 61.03-7.19 26.82-2.84 54.01 10.02 76.28 6.39 11.09 14.89 20.97 25.13 28.97 10.19 7.98 23.41 14.54 35.91 17.87zm21.37-160.44h20.09l-.48 12.66c8.45.53 15.83 1.37 22.16 2.54l-4.59 24.51H401.1c-3.69 0-6.15.58-7.36 1.74-1.21 1.16-1.87 3.38-1.98 6.64l9.97 1.11c12.13 1.37 20.49 4.48 25.08 9.34 4.58 4.85 6.88 11.12 6.88 18.82 0 7.7-.8 13.85-2.38 18.43-1.58 4.58-3.85 8.09-6.8 10.52-5.38 4.11-12.44 6.49-21.19 7.12l-.48 15.97h-20.41l.64-15.97c-10.02-.73-18.51-2.01-25.47-3.8l4.58-25.15c8.76 2.32 17.93 3.48 27.53 3.48 4.01 0 7.75-.21 11.23-.63v-6.65l-9.81-1.11c-12.66-1.26-21.09-4.95-25.31-11.07-3.69-5.37-5.53-12.39-5.53-21.04 0-11.38 2.34-19.66 7.04-24.83 4.69-5.17 11.3-8.34 19.85-9.49l.47-13.14zm10.79 163.84c-13.97 1.17-11.44 21.17 1.08 20.13 7.13-.34 14.89-1.52 21.82-3.25 12.86-3.22 8.01-22.79-4.91-19.55-5.95 1.45-11.88 2.3-17.99 2.67zm51.19-17.66c-10.86 7.61.68 24.13 11.55 16.52 5.89-4.05 11.85-9.12 16.82-14.25 9.13-9.13-4.81-23.69-14.47-14.04-4 4.19-9.12 8.49-13.9 11.77zm34.42-42.03c-5.4 11.87 12.83 20.48 18.43 8.16 3.08-6.97 5.14-13.44 7.06-20.79 3.17-12.65-16.32-17.82-19.6-4.69-1.74 6.23-3.25 11.36-5.89 17.32zm7.88-53.71c2.11 12.71 20.07 10.98 20.07-1.51l-.08-1.09c-1-7.42-2.51-14.26-4.77-21.42-4.29-12.87-23.3-6.18-19.19 6.16a105.17 105.17 0 0 1 3.97 17.86zm-294.54-43.78h49.42c-6.41 17.06-9.94 35.54-9.94 54.84 0 3.59.14 7.16.38 10.69h-39.86c-4.21 0-7.69-3.45-7.69-7.67v-50.18c0-4.22 3.46-7.68 7.69-7.68zm0-106.69h60.3c4.23 0 7.68 3.47 7.68 7.68v50.17c0 4.2-3.47 7.68-7.68 7.68h-60.3c-4.21 0-7.69-3.46-7.69-7.68v-50.17c0-4.23 3.46-7.68 7.69-7.68zm-121.63 0h60.3c4.23 0 7.69 3.47 7.69 7.68v50.17c0 4.2-3.48 7.68-7.69 7.68h-60.3c-4.21 0-7.68-3.46-7.68-7.68v-50.17c0-4.23 3.46-7.68 7.68-7.68zm243.25 0h60.31c3.57 0 6.58 2.48 7.44 5.78-27.59 1.04-53.33 9.25-75.43 22.81v-20.91c0-4.23 3.46-7.68 7.68-7.68zM75.76 319.26h60.3c4.23 0 7.69 3.48 7.69 7.68v50.18c0 4.2-3.48 7.67-7.69 7.67h-60.3c-4.21 0-7.68-3.45-7.68-7.67v-50.18c0-4.22 3.46-7.68 7.68-7.68zM294.3 16.66C294.3 7.47 303.39 0 314.62 0c11.24 0 20.33 7.47 20.33 16.66v77.49c0 9.19-9.09 16.66-20.33 16.66-11.23 0-20.32-7.47-20.32-16.66V16.66zm-181.94 0c0-9.19 9.09-16.66 20.32-16.66 11.24 0 20.33 7.47 20.33 16.66v77.49c0 9.19-9.09 16.66-20.33 16.66-11.23 0-20.32-7.47-20.32-16.66V16.66z' />
							</svg>

							<div>Subscriptions</div>
						</a>
					))}

				{router?.asPath !== `/dashboard/faq` ? (
					<Link href={`/dashboard/faq`}>
						<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('faq') ? styles.active_link : undefined}`}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z' />
							</svg>

							<div>Help</div>
						</a>
					</Link>
				) : (
					<a className={`${styles.link_wrapper} gray-color ${router?.pathname?.includes('faq') ? styles.active_link : undefined}`}>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--gray-icon)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z' />
						</svg>

						<div>Help</div>
					</a>
				)}

				<a
					className={`${styles.link_wrapper} gray-color`}
					onClick={() => {
						deletechatfunc(session, setChatModal, setMessages)
						signOut({ redirect: false })
						setloginUser({})
						setimpersonateUsers({})
						setactiveProvider(null)
						Cookies.remove('impersonateUserId')
						Cookies.remove('dvm_cen_tral_user_id')
						setuserData({})
						router.push('/')
					}}
				>
					<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path d='M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4' stroke='var(--gray-icon)' strokeWidth='1.5' strokeLinecap='round' />
						<path d='M10 12H20M20 12L17 9M20 12L17 15' stroke='var(--gray-icon)' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
					</svg>

					<div>Sign out</div>
				</a>
				{Object.keys(impersonateUsers).length > 0 && (
					<a
						className={`${styles.link_wrapper} gray-color`}
						onClick={() => {
							setimpersonateUsers({})
							setloginUser(session?.user)
							Cookies.remove('impersonateUserId')
							router.push('/admin')
						}}
					>
						<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path d='M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4' stroke='var(--gray-icon)' strokeWidth='1.5' strokeLinecap='round' />
							<path d='M10 12H20M20 12L17 9M20 12L17 15' stroke='var(--gray-icon)' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
						</svg>

						<div>Leave Impersonate</div>
					</a>
				)}

				<a
					className={`${styles.link_wrapper} gray-color ${styles.delete_acc}`}
					onClick={() => {
						setmodalAlertType('delete-account')
						setmodal(true)
						lockScroll()
					}}
				>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--red)'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
						/>
					</svg>

					<div className='red-color'>Delete account</div>
				</a>
			</div>
		</div>
	)
}

export default DashboardLinks

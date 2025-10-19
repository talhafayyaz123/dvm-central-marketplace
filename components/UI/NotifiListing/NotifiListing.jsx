import React, { useState } from 'react'
import styles from './NotifiListing.module.css'
import Link from 'next/link'
import getTimezoneDate from '../../../utils/getTimezoneDate'
import { unlockScroll } from '../../../utils/scrollLock'

const NotifiListing = ({ data, setshowNotifications, setnotificationData, Listingtype, className, userPosition }) => {
	const { time, type, body, channel, message, order_id, response, alert_type, clickable_link, chatmessages } = data
	const [textCopied, settextCopied] = useState(false)
	const [date, localTime12HoursBase, pmAm] = getTimezoneDate(chatmessages?.created_at)

	const copyCode = (code) => {
		navigator.clipboard.writeText(code)
		setTimeout(() => {
			settextCopied(false)
		}, 1000)
	}

	return userPosition === 'Sales Rep' ? (
		type === 'Coupons' ? (
			<div style={{ marginBottom: '.5rem', width: '100%' }} className={`${styles.main_content} ${Listingtype === 'header_modal' ? styles.modal_wraperr : undefined} ${Listingtype === 'dashboard' ? styles.border : undefined} white-bg ${styles.notification} ${styles.header_padding} ${styles.coupons}`}>
				<div className={styles.round_wrapper}>
					<div className={`radius ${styles.round}`} />
				</div>
				<div className={styles.width}>
					<Link href={`/vendors/${clickable_link}`}>
						<a
							onClick={() =>
								Listingtype !== 'dashboard' &&
								(setshowNotifications(false),
								unlockScroll(),
								setTimeout(() => {
									setnotificationData([])
								}, 300))
							}
						>
							<span className='primary-color'>{body.substring(0, body.indexOf('has'))}</span>
							{Listingtype === 'dashboard' ? (
								body.substring(body.indexOf('has'))
							) : (
								<>
									{body.substring(body.indexOf('has'))?.slice(0, 55)}
									{body?.length > 55 ? '...' : ''}
								</>
							)}
						</a>
					</Link>
					<div className={styles.copy_wrapper}>
						<p>{time}</p>
						{response !== null && (
							<div className={styles.copied} onClick={() => (copyCode(response), settextCopied(true))}>
								<div className={`primary-color ${styles.text_copied}`}>{textCopied ? 'Code copied!' : 'Copy code'}</div>

								<div className={styles.copied}>
									<div className={styles.copy_text}>
										{textCopied === false ? (
											<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' strokeWidth={1.5} stroke='currentColor'>
												<path d='M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z' strokeLinecap='round' strokeLinejoin='round' />
											</svg>
										) : (
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)'>
												<path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
											</svg>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		) : type === 'Webinars' ? (
			<Link href={`/virtual-expo/${clickable_link}`}>
				<a
					style={{ marginBottom: '.5rem', width: '100%' }}
					onClick={() =>
						Listingtype !== 'dashboard' &&
						(setshowNotifications(false),
						unlockScroll(),
						setTimeout(() => {
							setnotificationData([])
						}, 300))
					}
				>
					<div className={`white-bg ${Listingtype === 'dashboard' ? styles.border : undefined} ${styles.notification} ${styles.header_padding}`}>
						<div className={`${styles.main_content} ${Listingtype === 'header_modal' ? styles.modal_wraperr : undefined}`}>
							<div className={styles.round_wrapper}>
								<div className={`radius ${styles.round}`} />
							</div>
							<div>
								{body.substring(0, body.indexOf('Expo') + 4)}
								<span className='primary-color'>{body.substring(body.indexOf('Expo') + 4).split(`has`)[0]}</span>
								{body.substring(body.indexOf('has'))?.slice(0, 50)}
								<p className={`${styles.order_time} ${styles.created_at}`}>{time}</p>
							</div>
						</div>
					</div>
				</a>
			</Link>
		) : type === 'Blogs' ? (
			<Link href={`/blogs/${clickable_link}`}>
				<a
					style={{ marginBottom: '.5rem', width: '100%' }}
					onClick={() =>
						Listingtype !== 'dashboard' &&
						(setshowNotifications(false),
						unlockScroll(),
						setTimeout(() => {
							setnotificationData([])
						}, 300))
					}
				>
					<div className={`white-bg ${Listingtype === 'dashboard' ? styles.border : undefined} ${styles.header_padding} ${styles.notification}`}>
						<div className={styles.main_content}>
							<div className={styles.round_wrapper}>
								<div className={`radius ${styles.round}`} />
							</div>
							<div>
								{body.substring(0, body.indexOf('blog') + 5)}
								<span className='primary-color'>{body.substring(body.indexOf('blog') + 5).split(`has`)[0]}</span>
								{body.substring(body.indexOf('has'))}
								<p className={`${styles.order_time} ${styles.created_at}`}>{time}</p>
							</div>
						</div>
					</div>
				</a>
			</Link>
		) : (
			channel !== undefined &&
			chatmessages?.vendor_details !== null && (
				<Link href={`/vendors/${chatmessages?.vendor_details?.slug}#chat`}>
					<a
						style={{ marginBottom: '.5rem', width: '100%' }}
						className={`white-bg ${styles.notification} ${Listingtype !== 'dashboard' ? styles.header_padding : undefined} ${Listingtype === 'dashboard' ? styles.border : undefined} `}
						onClick={() =>
							Listingtype !== 'dashboard' &&
							(setshowNotifications(false),
							unlockScroll(),
							setTimeout(() => {
								setnotificationData([])
							}, 300))
						}
					>
						<div className={styles.main_content}>
							<div className={styles.round_wrapper}>
								<div className={`radius ${styles.round}`} />
							</div>
							<div>
								<h6 className={`primary-color`}>{chatmessages?.vendor_details?.name} </h6>
								<p
									style={{
										lineBreak: chatmessages?.message?.includes(' ') ? 'auto' : 'anywhere'
									}}
								>
									{chatmessages?.message?.slice(0, 50)}
									{chatmessages?.message?.length > 50 ? '...' : ''}
								</p>
								<p className={styles.created_at}>
									{date} {localTime12HoursBase.slice(0, localTime12HoursBase.lastIndexOf(':'))} {pmAm}
								</p>
							</div>
						</div>
					</a>
				</Link>
			)
		)
	) : (
		<div className={`${className} ${styles.notification_wrapper}`}>
			{type === 'Coupons' ? (
				<div className={`${styles.main_content} ${Listingtype === 'header_modal' ? styles.modal_wraperr : undefined} ${Listingtype === 'dashboard' ? styles.border : undefined} white-bg ${styles.notification} ${styles.header_padding} ${styles.coupons}`}>
					<div className={styles.round_wrapper}>
						<div className={`radius ${styles.round}`} />
					</div>
					<div className={styles.width}>
						<Link href={`/vendors/${clickable_link}`}>
							<a
								onClick={() =>
									Listingtype !== 'dashboard' &&
									(setshowNotifications(false),
									unlockScroll(),
									setTimeout(() => {
										setnotificationData([])
									}, 300))
								}
							>
								<span className='primary-color'>{body.substring(0, body.indexOf('has'))}</span>
								{Listingtype === 'dashboard' ? (
									body.substring(body.indexOf('has'))
								) : (
									<>
										{body.substring(body.indexOf('has'))?.slice(0, 55)}
										{body?.length > 55 ? '...' : ''}
									</>
								)}
							</a>
						</Link>
						<div className={styles.copy_wrapper}>
							<p>{time}</p>
							{response !== null && (
								<div className={styles.copied} onClick={() => (copyCode(response), settextCopied(true))}>
									<div className={`primary-color ${styles.text_copied}`}>{textCopied ? 'Code copied!' : 'Copy code'}</div>

									<div className={styles.copied}>
										<div className={styles.copy_text}>
											{textCopied === false ? (
												<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' strokeWidth={1.5} stroke='currentColor'>
													<path d='M3 16V4C3 2.89543 3.89543 2 5 2H15M9 22H18C19.1046 22 20 21.1046 20 20V8C20 6.89543 19.1046 6 18 6H9C7.89543 6 7 6.89543 7 8V20C7 21.1046 7.89543 22 9 22Z' strokeLinecap='round' strokeLinejoin='round' />
												</svg>
											) : (
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)'>
													<path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
												</svg>
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			) : type === 'order' ? (
				<Link href={`/user/order-details/${order_id}`}>
					<a
						onClick={() =>
							Listingtype !== 'dashboard' &&
							(setshowNotifications(false),
							unlockScroll(),
							setTimeout(() => {
								setnotificationData([])
							}, 300))
						}
					>
						<div className={`${styles.order_noti} ${styles.header_padding} ${styles.notification} ${Listingtype === 'dashboard' ? styles.padding : undefined} ${alert_type === 'success' ? styles.succes : styles.error}`}>
							{alert_type === 'success' ? (
								<>
									<div className={`${Listingtype === 'dashboard' ? styles.border : undefined} ${styles.main_content} ${Listingtype === 'header_modal' ? styles.modal_wraperr : undefined}`}>
										<div>
											<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--green)'>
												<path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
											</svg>
										</div>
										<div>
											{Listingtype === 'dashboard' ? (
												message
											) : (
												<>
													{message?.slice(0, 60)}
													{message?.length > 60 ? '...' : ''}
												</>
											)}

											<p className={`${styles.order_time} ${styles.created_at}`}>{time}</p>
										</div>
									</div>
								</>
							) : (
								<>
									<div className={styles.main_content}>
										<div>
											<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--red)' className='w-6 h-6'>
												<path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' />
											</svg>
										</div>
										<div className={styles.order_message}>
											{Listingtype === 'dashboard' ? (
												message
											) : (
												<>
													{message?.slice(0, 60)}
													{message?.length > 60 ? '...' : ''}
												</>
											)}
											<p className={`${styles.order_time} ${styles.created_at}`}>{time}</p>
										</div>
									</div>
								</>
							)}
						</div>
					</a>
				</Link>
			) : type === 'Webinars' ? (
				<Link href={`/virtual-expo/${clickable_link}`}>
					<a
						onClick={() =>
							Listingtype !== 'dashboard' &&
							(setshowNotifications(false),
							unlockScroll(),
							setTimeout(() => {
								setnotificationData([])
							}, 300))
						}
					>
						<div className={`white-bg ${Listingtype === 'dashboard' ? styles.border : undefined} ${styles.notification} ${styles.header_padding}`}>
							<div className={`${styles.main_content} ${Listingtype === 'header_modal' ? styles.modal_wraperr : undefined}`}>
								<div className={styles.round_wrapper}>
									<div className={`radius ${styles.round}`} />
								</div>
								<div>
									{body.substring(0, body.indexOf('Expo') + 4)}
									<span className='primary-color'>{body.substring(body.indexOf('Expo') + 4).split(`has`)[0]}</span>
									{body.substring(body.indexOf('has'))?.slice(0, 50)}
									<p className={`${styles.order_time} ${styles.created_at}`}>{time}</p>
								</div>
							</div>
						</div>
					</a>
				</Link>
			) : type === 'Blogs' ? (
				<Link href={`/blogs/${clickable_link}`}>
					<a
						onClick={() =>
							Listingtype !== 'dashboard' &&
							(setshowNotifications(false),
							unlockScroll(),
							setTimeout(() => {
								setnotificationData([])
							}, 300))
						}
					>
						<div className={`white-bg ${Listingtype === 'dashboard' ? styles.border : undefined} ${styles.header_padding} ${styles.notification}`}>
							<div className={styles.main_content}>
								<div className={styles.round_wrapper}>
									<div className={`radius ${styles.round}`} />
								</div>
								<div>
									{body.substring(0, body.indexOf('blog') + 5)}
									<span className='primary-color'>{body.substring(body.indexOf('blog') + 5).split(`has`)[0]}</span>
									{body.substring(body.indexOf('has'))}
									<p className={`${styles.order_time} ${styles.created_at}`}>{time}</p>
								</div>
							</div>
						</div>
					</a>
				</Link>
			) : (
				channel !== undefined &&
				chatmessages?.vendor_details !== null && (
					<Link href={`/vendors/${chatmessages?.vendor_details?.slug}#chat`}>
						<a
							className={`white-bg ${styles.notification} ${Listingtype !== 'dashboard' ? styles.header_padding : undefined} ${Listingtype === 'dashboard' ? styles.border : undefined} `}
							onClick={() =>
								Listingtype !== 'dashboard' &&
								(setshowNotifications(false),
								unlockScroll(),
								setTimeout(() => {
									setnotificationData([])
								}, 300))
							}
						>
							<div className={styles.main_content}>
								<div className={styles.round_wrapper}>
									<div className={`radius ${styles.round}`} />
								</div>
								<div>
									<h6 className={`primary-color`}>{chatmessages?.vendor_details?.name} </h6>
									<p
										style={{
											lineBreak: chatmessages?.message?.includes(' ') ? 'auto' : 'anywhere'
										}}
									>
										{chatmessages?.message?.slice(0, 50)}
										{chatmessages?.message?.length > 50 ? '...' : ''}
									</p>
									<p className={styles.created_at}>
										{date} {localTime12HoursBase.slice(0, localTime12HoursBase.lastIndexOf(':'))} {pmAm}
									</p>
								</div>
							</div>
						</a>
					</Link>
				)
			)}
		</div>
	)
}

export default NotifiListing

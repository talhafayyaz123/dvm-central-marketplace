import React, { useEffect, useState } from 'react'
import styles from './CountDown.module.css'
import Wave from '../Wave/Wave'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'

const CountDown = ({ heading, slogan, btnText, btnLink, requiredYear, requiredMonth, requiredDay, requiredHour, requiredMinute, requiredSeconds, timeZone, setshowCounter, showCounter, standardTime, date, zoomLink }) => {
	const router = useRouter()
	const [day, setday] = useState('')
	const [hour, sethour] = useState('')
	const [minutes, setminutes] = useState('')
	const [seconds, setseconds] = useState('')

	const calculateTimeLeft = () => {
		const targetDate = DateTime.fromObject({ year: requiredYear, month: requiredMonth, day: requiredDay, hour: requiredHour, minute: requiredMinute, second: requiredSeconds }, { zone: timeZone })
		const now = DateTime.now().setZone(timeZone)

		const difference = targetDate.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject()

		let timeLeft = {}
		if (difference.days >= 0 || difference.hours >= 0 || difference.minutes >= 0 || difference.seconds >= 0) {
			timeLeft = {
				days: difference.days || 0,
				hours: difference.hours || 0,
				minutes: difference.minutes || 0,
				seconds: difference.seconds || 0
			}
		}
		setday(timeLeft?.days)
		sethour(timeLeft?.hours)
		setminutes(timeLeft?.minutes)
		setseconds(timeLeft?.seconds?.toFixed(0))
		return timeLeft
	}

	useEffect(() => {
		if (showCounter) {
			const time = setInterval(() => calculateTimeLeft(), 1000)
			window.onload = () => calculateTimeLeft()

			return () => {
				if (time !== null) {
					clearInterval(time)
				}
			}
		}
	}, [showCounter])

	return (
		<div className={`${styles.container} ${showCounter ? styles.show_counter : undefined} gradient-sec radius white-color`}>
			<Wave />

			<div className={`${styles.modal_cls_wrapper} black-bg full-radius transition`} onClick={() => setshowCounter(false)}>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--white)'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M4.5 19.5l15-15m-15 0l15 15' />
				</svg>
			</div>

			<div className={`modal-countdown ${styles.wrapper}`}>
				{heading && <h4>{heading}</h4>}
				{slogan && <p>{slogan}</p>}

				<div className={styles.count_wrapper}>
					<div className={styles.count_inner_wrapper}>
						<div className={`${styles.count} white-bg primary-color semibold-text shadow`}>{hour >= 0 ? day : 0}</div>
						<div className={styles.counter_info}>Days</div>
					</div>

					<div className={styles.count_inner_wrapper}>
						<div className={`${styles.count} white-bg primary-color semibold-text shadow`}>{hour >= 0 ? hour : 0}</div>
						<div className={styles.counter_info}>Hours</div>
					</div>

					<div className={styles.count_inner_wrapper}>
						<div className={`${styles.count} white-bg primary-color semibold-text shadow`}>{hour >= 0 ? minutes : 0}</div>
						<div className={styles.counter_info}>Minutes</div>
					</div>

					<div className={styles.count_inner_wrapper}>
						<div className={`${styles.count} white-bg primary-color semibold-text shadow`}>{hour >= 0 ? seconds : 0}</div>
						<div className={styles.counter_info}>Seconds</div>
					</div>
				</div>
				<>
					{date && <div className={`${styles.date} full-radius semibold-text`}>{date}</div>}
					{standardTime && <p className={styles.standard_time}>{standardTime}</p>}
				</>

				{btnLink && router?.asPath !== `/${btnLink}` && (
					<div className={styles.btn_wrapper}>
						{!zoomLink ? (
							<Link href={`/${btnLink}`}>
								<a onClick={() => setshowCounter(false)}>
									<button className='blink'>{btnText}</button>
								</a>
							</Link>
						) : (
							<a href={zoomLink} target='_blank' rel='noreferrer' onClick={() => setshowCounter(false)}>
								<button className='blink'>{btnText}</button>
							</a>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default CountDown

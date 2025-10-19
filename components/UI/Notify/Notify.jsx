import React, { useEffect, useRef } from 'react'
import styles from './Notify.module.css'

const Notify = ({ message, success, showPopup, setshowresMsg }) => {
	const notify = useRef(null)
	const bar = useRef(null)
	useEffect(() => {
		if (showPopup) {
			notify?.current?.classList.add(styles.show_notify)
			bar?.current?.classList.add(styles.show_bar)
		} else {
			setTimeout(() => {
				notify?.current?.classList.remove(styles.show_notify)
			}, 300)
			setTimeout(() => {
				bar?.current?.classList.remove(styles.show_bar)
			}, 1000)
		}
	}, [showPopup])
	return (
		<div ref={notify} className={`${styles.form_notify} shadow white-color transition ${success ? styles.success_msg : styles.error_msg}`}>
			<div className={styles.wrapper}>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke={success ? 'var(--green)' : 'var(--red)'} className={`white-bg full-radius transition ${styles.close_icon}`} onClick={() => setshowresMsg(false)}>
					<path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
				</svg>

				<div ref={bar} className={`${styles.bar}`}>
					<div />
				</div>
				{success ? (
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
						<path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
					</svg>
				) : (
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' />
					</svg>
				)}
				{message}
			</div>
		</div>
	)
}

export default Notify

import React from 'react'
import styles from './Message.module.css'

const Message = ({ icon, className = '', resMsg, formSuccess, children, type }) => {
	return (
		<div className={`${styles.wrapper} ${formSuccess ? styles.success : styles.error} ${className} ${type === 'modal' ? styles.center : undefined}`}>
			{formSuccess ? (
				icon ? (
					icon
				) : (
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--green)'>
						<path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clipRule='evenodd' />
					</svg>
				)
			) : icon ? (
				icon
			) : (
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--red)'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' />
				</svg>
			)}
			{resMsg && <div className={styles.msg}>{resMsg}</div>}
			{children && <div className={styles.msg}>{children}</div>}
		</div>
	)
}

export default Message

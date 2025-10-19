import React from 'react'
import styles from './ServiceInfo.module.css'

const Quantity = ({ qty, setqty }) => {
	const increaseQty = () => {
		setqty((prev) => Number(prev) + 1)
	}

	const decreaseQty = () => {
		setqty((prev) => {
			if (prev - 1 < 1) {
				return 1
			} else {
				return Number(prev) - 1
			}
		})
	}

	const inputChangeHandler = (val) => {
		setqty((prev) => {
			if (val < 1) {
				val = prev
				return 1
			} else {
				return Number(val)
			}
		})
	}

	return (
		<div className={styles.qty_wrapper}>
			<div className={styles.inner_wrapper}>
				<div className='semibold-text'>Lincense(s)</div>
				<div className={`${styles.qty_inner_wrapper} transition`}>
					<svg onClick={() => decreaseQty()} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
					</svg>

					<input className={`semibold-text`} type='text' placeholder='1' maxLength={2} value={qty} onChange={(e) => ((e.target.value = e.target.value.replace(/[^0-9]/g, '')), inputChangeHandler(e.target.value))} />
					<svg onClick={() => increaseQty()} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
					</svg>
				</div>
			</div>
		</div>
	)
}

export default Quantity

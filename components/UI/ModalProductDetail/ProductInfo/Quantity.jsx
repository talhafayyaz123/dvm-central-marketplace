import React from 'react'
import styles from './ProductInfo.module.css'

const Quantity = ({ modalQty, setmodalQty, modalThreshHoldError, setmodalThreshHoldError, modalSubProductMaxThreshHold, qtyThreshHold, productType, modalProductQtyinCart, modalSubProductQtyinCart, modalSelectedVariationSku, minOrderQty, qtyRef, inputQtyThreshHold }) => {
	const increaseQty = () => {
		setmodalQty((prev) => {
			if (productType !== 'variation' ? Number(prev) + 1 > qtyThreshHold : Number(prev) + 1 > modalSubProductMaxThreshHold) {
				return productType !== 'variation' ? qtyThreshHold : modalSubProductMaxThreshHold
			} else {
				setmodalThreshHoldError(false)
				return Number(prev) + 1
			}
		})
	}

	const decreaseQty = () => {
		setmodalQty((prev) => {
			if (Number(prev) - 1 < 1) {
				return 1
			} else if (productType !== 'variation' ? Number(prev) - 1 < qtyThreshHold : Number(prev) - 1 < modalSubProductMaxThreshHold) {
				setmodalThreshHoldError(false)
				return Number(prev) - 1
			}
		})
	}

	const inputChangeHandler = (val) => {
		setmodalQty(() => {
			if (Number(val) <= 1) {
				return 1
			}
		})
	}

	const inputBlurHandler = (val) => {
		setmodalQty(() => {
			if (minOrderQty !== null && minOrderQty > 0 && (productType !== 'variation' ? modalProductQtyinCart : modalSubProductQtyinCart) >= 1 && (productType !== 'variation' ? modalProductQtyinCart : modalSubProductQtyinCart) < minOrderQty && val < minOrderQty) {
				return Number(minOrderQty) - Number(productType !== 'variation' ? modalProductQtyinCart : modalSubProductQtyinCart)
			} else if (minOrderQty !== null && minOrderQty > 0 && val < minOrderQty && (productType !== 'variation' ? modalProductQtyinCart : modalSubProductQtyinCart) === 0) {
				return Number(minOrderQty)
			} else if (Number(val) <= 1) {
				return 1
			} else if (Number(val) >= qtyThreshHold || (productType !== 'variation' ? Number(val) + Number(modalProductQtyinCart) >= qtyThreshHold : Number(val) + Number(modalSubProductQtyinCart) >= modalSubProductMaxThreshHold)) {
				return productType !== 'variation' ? (Number(modalProductQtyinCart) !== 0 ? qtyThreshHold - Number(modalProductQtyinCart) : qtyThreshHold) : Number(modalSubProductQtyinCart) !== 0 ? modalSubProductMaxThreshHold - Number(modalSubProductQtyinCart) : modalSubProductMaxThreshHold
			} else {
				setmodalThreshHoldError(false)
				return Number(val)
			}
		})
	}

	return (
		<div className={styles.qty_wrapper}>
			<div className={styles.inner_wrapper}>
				<div className='semibold-text'>Quantity</div>
				<div className={`${styles.qty_inner_wrapper} transition`}>
					<svg
						className={!(minOrderQty === null || (minOrderQty > 0 && modalProductQtyinCart >= minOrderQty) || modalQty > minOrderQty || (minOrderQty > 0 && modalProductQtyinCart > 0 && Number(modalQty) - Number(modalProductQtyinCart) >= Number(minOrderQty))) ? 'no-cursor' : undefined}
						onClick={() => (minOrderQty === null || (minOrderQty > 0 && modalProductQtyinCart >= minOrderQty) || modalQty > minOrderQty || (minOrderQty > 0 && modalProductQtyinCart > 0 && Number(modalQty) - Number(modalProductQtyinCart) >= Number(minOrderQty))) && decreaseQty()}
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='var(--gray-icon)'
					>
						<path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
					</svg>

					<input
						ref={qtyRef}
						readOnly={modalThreshHoldError ? true : false}
						className={`${modalThreshHoldError ? 'no-cursor' : undefined} semibold-text ${productType === 'variation' && modalSelectedVariationSku === null ? 'no-cursor' : undefined}`}
						type='text'
						placeholder='1'
						maxLength={inputQtyThreshHold !== null && inputQtyThreshHold > 0 ? Number(inputQtyThreshHold.toString().length) : 2}
						value={modalQty}
						onChange={(e) => ((e.target.value = e.target.value.replace(/[^0-9]/g, '')), (productType === 'variation' ? modalSelectedVariationSku !== null && !modalThreshHoldError : !modalThreshHoldError) && inputChangeHandler(e.target.value))}
						onBlur={(e) => (productType === 'variation' ? modalSelectedVariationSku !== null && !modalThreshHoldError : !modalThreshHoldError) && inputBlurHandler(e.target.value)}
					/>
					<svg
						className={`${modalThreshHoldError ? 'no-cursor' : undefined} ${productType === 'variation' && modalSelectedVariationSku === null ? 'no-cursor' : undefined}`}
						onClick={() => (productType === 'variation' ? modalSelectedVariationSku !== null && !modalThreshHoldError : !modalThreshHoldError) && increaseQty()}
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='var(--gray-icon)'
					>
						<path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
					</svg>
				</div>
			</div>
		</div>
	)
}

export default Quantity

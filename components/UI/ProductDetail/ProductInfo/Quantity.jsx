import React from 'react'
import styles from './ProductInfo.module.css'

const Quantity = ({ qty, setqty, threshHoldError, setthreshHoldError, subProductMaxThreshHold, qtyThreshHold, productType, productQtyinCart, subProudctQtyinCart, selectedVariationSku, minOrderQty, qtyRef, inputQtyThreshHold }) => {
	const increaseQty = () => {
		setqty((prev) => {
			console.log('from qty', 'prev', prev, 'qtyThreshHold', qtyThreshHold)
			if (productType !== 'variation' ? Number(prev) + 1 > qtyThreshHold : Number(prev) + 1 > subProductMaxThreshHold) {
				return productType !== 'variation' ? qtyThreshHold : subProductMaxThreshHold
			} else {
				console.log('from plus')
				setthreshHoldError(false)
				return Number(prev) + 1
			}
		})
	}

	const decreaseQty = () => {
		setqty((prev) => {
			if (Number(prev) - 1 < 1) {
				return 1
			} else if (productType !== 'variation' ? Number(prev) - 1 < qtyThreshHold : Number(prev) - 1 < subProductMaxThreshHold) {
				setthreshHoldError(false)
				return Number(prev) - 1
			}
		})
	}

	const inputChangeHandler = (val) => {
		setqty(() => {
			if (Number(val) <= 1) {
				return 1
			}
		})
	}

	const inputBlurHandler = (val) => {
		setqty(() => {
			if (minOrderQty !== null && minOrderQty > 0 && (productType !== 'variation' ? productQtyinCart : subProudctQtyinCart) >= 1 && (productType !== 'variation' ? productQtyinCart : subProudctQtyinCart) < minOrderQty && val < minOrderQty) {
				console.log('from first')
				return Number(minOrderQty) - Number(productType !== 'variation' ? productQtyinCart : subProudctQtyinCart)
			} else if (minOrderQty !== null && minOrderQty > 0 && val < minOrderQty && (productType !== 'variation' ? productQtyinCart : subProudctQtyinCart) === 0) {
				console.log('from sec')

				return Number(minOrderQty)
			} else if (Number(val) <= 1) {
				console.log('from third')

				return 1
			} else if (Number(val) >= qtyThreshHold || (productType !== 'variation' ? Number(val) + Number(productQtyinCart) >= qtyThreshHold : Number(val) + Number(subProudctQtyinCart) >= qtyThreshHold)) {
				console.log('from fifth')

				return productType !== 'variation' ? (productQtyinCart !== 0 ? qtyThreshHold - productQtyinCart : qtyThreshHold) : subProudctQtyinCart !== 0 ? subProductMaxThreshHold - subProudctQtyinCart : subProductMaxThreshHold
			} else {
				console.log('from last')

				setthreshHoldError(false)
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
						className={!(minOrderQty === null || (minOrderQty > 0 && productQtyinCart >= minOrderQty) || qty > minOrderQty || (minOrderQty > 0 && productQtyinCart > 0 && Number(qty) - Number(productQtyinCart) >= Number(minOrderQty))) ? 'no-cursor' : undefined}
						onClick={() => (minOrderQty === null || (minOrderQty > 0 && productQtyinCart >= minOrderQty) || qty > minOrderQty || (minOrderQty > 0 && productQtyinCart > 0 && Number(qty) - Number(productQtyinCart) >= Number(minOrderQty))) && decreaseQty()}
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
						readOnly={threshHoldError ? true : false}
						className={`${threshHoldError ? 'no-cursor' : undefined} semibold-text ${productType === 'variation' && selectedVariationSku === null ? 'no-cursor' : undefined}`}
						type='text'
						placeholder='1'
						maxLength={inputQtyThreshHold !== null && inputQtyThreshHold > 0 ? Number(inputQtyThreshHold.toString().length) : 2}
						value={qty}
						onChange={(e) => ((e.target.value = e.target.value.replace(/[^0-9]/g, '')), productType === 'variation' ? selectedVariationSku !== null && !threshHoldError : !threshHoldError) && inputChangeHandler(e.target.value)}
						onBlur={(e) => (productType === 'variation' ? selectedVariationSku !== null && !threshHoldError : !threshHoldError) && inputBlurHandler(e.target.value)}
					/>
					<svg
						className={`${threshHoldError ? 'no-cursor' : undefined} ${productType === 'variation' && selectedVariationSku === null ? 'no-cursor' : undefined}`}
						onClick={() => (productType === 'variation' ? selectedVariationSku !== null && !threshHoldError : !threshHoldError) && increaseQty()}
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

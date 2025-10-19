import React from 'react'
import styles from './ProductInfo.module.css'
import currencyFormat from '../../../../utils/currencyFormat'
import Link from 'next/link'

const ProductPrice = ({ data, changingData, see_price, loginUser }) => {
	return (
		<>
			<div className={styles.wrapper}>
				{(see_price === 'login' && loginUser?.id !== undefined) || see_price === 'without_login' ? (
					<>
						<div className={styles.inner_wrapper}>
							{changingData?.type === 'variation' ? (
								<div className={styles.multiple_sku}>
									<div className={styles.sku}>Multiple SKU</div>
									<div className={`${styles.price} semibold-text`}>{data?.product?.range}</div>
								</div>
							) : (
								<div className={`${styles.price} semibold-text`}>
									{changingData?.price !== 0 && changingData?.price !== null
										? currencyFormat(
												changingData?.price_discounted !== null && changingData?.price_discounted !== 0 && changingData?.price_discounted !== changingData?.price_catalog && (changingData?.price_discounted_end === null || new Date(changingData?.price_discounted_end) >= new Date())
													? changingData?.price_discounted
													: changingData?.price
										  )
										: 'Price N/A'}
								</div>
							)}
						</div>

						{changingData?.price_discounted !== null && changingData?.price_discounted !== 0 && changingData?.price_discounted !== changingData?.price_catalog && changingData?.price_discounted_end !== null && new Date(changingData?.price_discounted_end) >= new Date()
							? changingData?.type !== 'variation' &&
							  changingData?.price_discounted !== changingData?.price_catalog && (
									<div className={styles.inner_wrapper}>
										<div className={styles.original_price}>{currencyFormat(changingData?.price_catalog)}</div>
										<div className={styles.disc}>{(100 - (Number(changingData?.price_discounted) / Number(changingData?.price_catalog)) * 100).toFixed(2)}% Off</div>
									</div>
							  )
							: changingData?.type !== 'variation' &&
							  changingData?.price !== changingData?.price_catalog && (
									<div className={styles.inner_wrapper}>
										<div className={styles.original_price}>{currencyFormat(changingData?.price_catalog)}</div>
										<div className={styles.disc}>{(100 - (Number(changingData?.price) / Number(changingData?.price_catalog)) * 100).toFixed(2)}% Off</div>
									</div>
							  )}
					</>
				) : (
					loginUser?.id === undefined &&
					see_price === 'login' && (
						<Link href='/auth/signin'>
							<a className={`${styles.hide_price} primary-color`} onClick={() => closeSidebar()}>
								<button className='sml-btn red-color'>Signin to see the price</button>
							</a>
						</Link>
					)
				)}
				<div className={styles.inner_wrapper}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#d2d2d2' className='w-6 h-6'>
						<path d='M12 15a3 3 0 100-6 3 3 0 000 6z' />
						<path
							fillRule='evenodd'
							d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z'
							clipRule='evenodd'
						/>
					</svg>
					<div className='views-num'>
						{data?.product_views} View{data?.product_views > 1 ? 's' : ''}
					</div>
				</div>
			</div>
			{((see_price === 'login' && loginUser?.id !== undefined) || see_price === 'without_login') && (
				<>
					{changingData?.price_discounted !== null && changingData?.price_discounted !== 0 && changingData?.price_discounted !== changingData?.price_catalog && (changingData?.price_discounted_end === null || new Date(changingData?.price_discounted_end) >= new Date()) && (
						<div className={`${styles.special_price} blink`}>
							<span style={{ marginRight: `${changingData?.price_discounted_end !== null ? '3px' : undefined}` }}>Discounted Price</span>
							{changingData?.price_discounted_end !== null && <span>ends on:</span>}
							{changingData?.price_discounted_end !== null && <span className={styles.disc_end_date}>{changingData?.price_discounted_end}</span>}
						</div>
					)}
				</>
			)}
		</>
	)
}

export default ProductPrice

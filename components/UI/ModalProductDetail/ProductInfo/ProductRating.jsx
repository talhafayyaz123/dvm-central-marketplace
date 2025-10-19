import React, { useState, useContext, useEffect } from 'react'
import styles from './ProductInfo.module.css'
import { baseApiUrl } from '../../../../utils/config'
import Rating from '../../Rating/Rating'
import { GlobalProvider } from '../../../../context/AppProvider'

const ProductRating = ({ data, loginUser, userPosition }) => {
	const { product_rating, unit_sold, reviews_count } = data
	const [addedToWishlist, setaddedToWishlist] = useState(false)
	const { setwishListItemsLength, wishlistData } = useContext(GlobalProvider)

	const addToWishlist = async (id) => {
		const res = await fetch(`${baseApiUrl}/user/wishlist/update`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				customer_id: loginUser?.id,
				product_id: id
			})
		}).then((resp) => resp.json())

		setaddedToWishlist(() => (res?.success === true ? true : false))

		setwishListItemsLength(res?.count)
	}

	useEffect(() => {
		let findWishlistProduct = wishlistData?.data?.find((product) => {
			return product?.product_id === data?.product?.id
		})

		setaddedToWishlist(findWishlistProduct !== undefined ? true : false)
	}, [wishlistData, setaddedToWishlist, setwishListItemsLength, loginUser])

	return (
		<div className={styles.wrapper}>
			{product_rating !== null && product_rating !== 0 && product_rating !== undefined && (
				<>
					<div className={styles.inner_wrapper}>
						<div className={styles.star_rating}>
							<div className={`${styles.count} orange-color`}>{product_rating}/5</div> <Rating data={product_rating} /> <div className='gray-color'>{`(${reviews_count})`}</div>
						</div>
					</div>

					<div className={`${styles.seperator} seperator`} />
				</>
			)}

			{unit_sold > 0 && (
				<>
					<div className={styles.inner_wrapper}>
						<svg xmlns='http://www.w3.org/2000/svg' width='25.297' height='19.678' viewBox='0 0 25.297 19.678'>
							<path
								id='Path_8508'
								data-name='Path 8508'
								d='M572.883,199.118c.147-.173.219-.271.3-.357q5.955-5.971,11.913-11.939a1.915,1.915,0,0,1,2.314-.465,2.6,2.6,0,0,1,.559.406c.268.244.518.509.773.768a1.946,1.946,0,0,1,0,2.946q-1.835,1.847-3.678,3.687-5.571,5.583-11.14,11.169a1.309,1.309,0,0,1-1.446.414,1.531,1.531,0,0,1-.548-.359q-3.591-3.582-7.167-7.178a1.935,1.935,0,0,1,0-2.88c.269-.274.538-.547.813-.814a1.919,1.919,0,0,1,2.81.01q2.135,2.125,4.256,4.265A3.024,3.024,0,0,1,572.883,199.118Z'
								transform='translate(-564.126 -186.148)'
								fill='#65d94f'
							/>
						</svg>

						<div className='gray-color'>{unit_sold + ' Sold'}</div>
					</div>
					<div className={`${styles.seperator} seperator`} />
				</>
			)}
			{loginUser?.id !== undefined && userPosition !== undefined && userPosition !== 'Sales Rep' && (
				<button className={styles.wish_wrapper} onClick={() => addToWishlist(data?.product?.id)}>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)' className={addedToWishlist ? styles.added_to_wishlist : undefined}>
						<path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
					</svg>

					<div className='primary-color'>Add To Wishlist</div>
				</button>
			)}
		</div>
	)
}

export default ProductRating

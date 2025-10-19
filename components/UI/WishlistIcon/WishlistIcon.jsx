import React, { useState, useContext, useEffect } from 'react'
import styles from './WishlistIcon.module.css'
import axios from 'axios'
import { baseApiUrl } from '../../../utils/config'
import { GlobalProvider } from '../../../context/AppProvider'
import { DarkLoader } from '../../Loader/Loader'

const WishlistIcon = ({ id, currentData, searchResultAllProducts, initialData, className = '', type }) => {
	const [addedtoWishlist, setaddedtoWishlist] = useState(false)
	const { setwishListItemsLength, wishlistData, loginUser } = useContext(GlobalProvider)
	const [loading, setloading] = useState(false)
	// const [activeIndex, setactiveIndex] = useState(null)

	const addToWishlist = async (id) => {
		setloading(true)
		let data
		if (type === 'services') {
			data = {
				customer_id: loginUser?.id,
				service_id: id
			}
		} else {
			data = {
				customer_id: loginUser?.id,
				product_id: id
			}
		}
		const res = await axios.post(`${baseApiUrl}/user/wishlist/update`, data)
		console.log('res from wish', res, res?.data?.success)
		setaddedtoWishlist(res?.data?.success ? true : false)
		setwishListItemsLength(res?.data?.count)
		setloading(false)
	}

	useEffect(() => {
		let findWishlistProduct
		if (type === 'services') {
			findWishlistProduct = wishlistData?.serviceWishlist?.find((service) => {
				return service?.service_id === id
			})
		} else {
			findWishlistProduct = wishlistData?.data?.find((product) => {
				return product?.product_id === id
			})
		}

		setaddedtoWishlist(findWishlistProduct !== undefined ? true : false)
	}, [wishlistData, setaddedtoWishlist, setwishListItemsLength, loginUser, currentData, searchResultAllProducts, initialData, type, currentData])

	return (
		loginUser?.id !== undefined &&
		(loading ? (
			<DarkLoader className={`${styles.loader} ${className}`} loaderType='sml' />
		) : addedtoWishlist ? (
			<svg onClick={() => addToWishlist(id)} className={`${styles.wishlist_icon} ${className}`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
				<path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
			</svg>
		) : (
			<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--primary)' className={`${styles.wishlist_icon} ${className}`} onClick={() => addToWishlist(id)}>
				<path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
			</svg>
		))
	)
}

export default WishlistIcon

import React, { useContext } from 'react'
import styles from './RelatedProductCard.module.css'
import { baseApiUrl, imgApiUrl } from '../../../utils/config'
import Rating from '../../UI/Rating/Rating'
import placeHolderImg from '/public/imgs/no-img.webp'
import { lockScroll } from '../../../utils/scrollLock'
import { LiteLoader } from '../../Loader/Loader'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import currencyFormat from '../../../utils/currencyFormat'
import Link from 'next/link'
import { GlobalProvider } from '../../../context/AppProvider'
import WishlistIcon from '../WishlistIcon/WishlistIcon'

const RelatedProduct = ({ data, setModalData, setmodal, index, modalLoading, setmodalLoading, activeModal, setactiveModal }) => {
	const { name, price, price_catalog, image, type, rating, slug, range, price_discounted, price_discounted_end, see_price, id, vendor_id, in_stock } = data

	const { loginUser, addTocartItem, cartBtnLoading, clickedProduct } = useContext(GlobalProvider)

	const modalHandler = async (slug, index) => {
		setactiveModal(index)
		console.log('asdasdas', slug, index)
		setmodalLoading(true)
		const res = await fetch(loginUser?.id !== undefined ? `${baseApiUrl}/product-view/${slug}/${loginUser.id}` : `${baseApiUrl}/product-view/${slug}`).then((resp) => resp.json())

		await setModalData(res)
		setTimeout(() => {
			setmodal(true)
			lockScroll()
			setmodalLoading(false)
			setactiveModal()
		}, 500)
	}

	return (
		<>
			<div style={{ position: 'relative' }}>
				<div className={styles.wish}>
					<WishlistIcon id={id} />
				</div>
				<Link href={`/${slug}`}>
					<a className={`${styles.related_product_card}  transition`}>
						<ImgWithLoader className={`${styles.img_wrapper} radius`} src={image !== null ? `${imgApiUrl.products.thumbnail}/${image}` : placeHolderImg} width={200} height={200} alt={name} />

						<div className={styles.info}>
							<div className={styles.name}>
								{name?.substring(0, 50)}
								{name?.length > 50 ? '...' : ''}
							</div>
							{(see_price === 'login' && loginUser?.id !== undefined) || see_price !== 'request' ? (
								<div className={styles.price_rating}>
									{type === 'variation' ? (
										<>
											<div className={styles.sku}>Multiple SKU</div>
											<div className={styles.price}>{range}</div>
										</>
									) : price === price_catalog ? (
										<div className={styles.price}>
											{price !== 0 && price !== null ? currencyFormat(price_discounted !== null && price_discounted !== 0 && price_discounted !== price_catalog && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? price_discounted : price) : 'Price N/A'}
										</div>
									) : price_discounted !== null && price_discounted !== 0 && price_discounted !== price_catalog && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) ? (
										<div className={styles.price}>
											<span>{currencyFormat(price_discounted)}</span>
											<span>{currencyFormat(price_catalog)}</span>
											<span>{(100 - (Number(price_discounted) / Number(price_catalog)) * 100).toFixed(2)}% Off</span>
										</div>
									) : (
										<div className={styles.price}>
											<span>{currencyFormat(price)}</span>
											<span>{currencyFormat(price_catalog)}</span>
											<span>{(100 - (Number(price) / Number(price_catalog)) * 100).toFixed(2)}% Off</span>
										</div>
									)}

									{rating > 0 && <Rating data={rating} />}

									{price_discounted !== null && price_discounted !== 0 && price_discounted !== price_catalog && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) && (
										<div className={`${styles.special_price} blink`}>
											<span style={{ marginRight: `${price_discounted_end !== null ? '3px' : undefined}` }}>Discounted Price</span>
											{price_discounted_end !== null && <span style={{ marginRight: `${price_discounted_end !== null ? '3px' : undefined}` }}>ends on:</span>}
											{price_discounted_end !== null && <span className={styles.disc_end_date}>{price_discounted_end}</span>}
										</div>
									)}
								</div>
							) : (
								loginUser?.id === undefined &&
								see_price === 'login' && (
									<Link href='/auth/signin'>
										<a className={`link primary-color`}>Signin to see the price</a>
									</Link>
								)
							)}
						</div>
					</a>
				</Link>
				{/* eye and cart icon */}
				<div className={styles.eye_wrapper}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)' className={styles.eye_icon} onClick={() => modalHandler(slug, index)}>
						<path d='M12 15a3 3 0 100-6 3 3 0 000 6z' />
						<path
							fillRule='evenodd'
							d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z'
							clipRule='evenodd'
						/>
					</svg>
					{loginUser?.id !== undefined && type !== 'variation' && in_stock === 'Y' && (
						<div className={styles.shop} onClick={() => addTocartItem(id, vendor_id, 1, id, 'addition')}>
							{cartBtnLoading && clickedProduct === id ? (
								<LiteLoader loaderType={'sml'} />
							) : (
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='var(--white)' className='size-4'>
									<path d='M1.75 1.002a.75.75 0 1 0 0 1.5h1.835l1.24 5.113A3.752 3.752 0 0 0 2 11.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 0-1.5H3.628A2.25 2.25 0 0 1 5.75 9h6.5a.75.75 0 0 0 .73-.578l.846-3.595a.75.75 0 0 0-.578-.906 44.118 44.118 0 0 0-7.996-.91l-.348-1.436a.75.75 0 0 0-.73-.573H1.75ZM5 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM13 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' />
								</svg>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default RelatedProduct

import React, { useContext, useState } from 'react'
import styles from './TodaysDealsCard.module.css'
import placeHolderImg from '/public/imgs/no-img.webp'
import { baseApiUrl, imgApiUrl } from '../../../utils/config'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import { DarkLoader } from '../../Loader/Loader'
import currencyFormat from '../../../utils/currencyFormat'
import Link from 'next/link'
import { lockScroll } from '../../../utils/scrollLock'
import { GlobalProvider } from '../../../context/AppProvider'

const TodaysDealsCard = ({ data, index, setModalData, setmodal }) => {
	const { name, price, price_catalog, price_discounted, price_discounted_end, image, type, slug, id, range, see_price } = data

	const [modalLoading, setmodalLoading] = useState(false)

	const { loginUser } = useContext(GlobalProvider)

	const modalHandler = async (slug) => {
		setmodalLoading(true)
		const res = await fetch(loginUser?.id !== undefined ? `${baseApiUrl}/product-view/${slug}/${loginUser?.id}` : `${baseApiUrl}/product-view/${slug}`).then((resp) => resp.json())
		await setModalData(res)
		setTimeout(() => {
			setmodal(true)
			lockScroll()
			setmodalLoading(false)
		}, 500)
	}

	const modalOpenHandler = (e, index, slug) => {
		const els = document.querySelectorAll('.td-hide-price')
		if (e.target !== els[index]) {
			modalHandler(slug, index)
		}
	}

	return (
		<div key={id} className={`${styles.deals_card} radius`} onClick={(e) => modalOpenHandler(e, index, slug)}>
			<div className={styles.deals_info_inner_wrapper} style={{ marginBottom: modalLoading ? '0rem' : '1rem' }}>
				<ImgWithLoader className={styles.img_wrapper} width={250} height={250} src={image !== null ? `${imgApiUrl.products.thumbnail}/${image}` : placeHolderImg} alt={name} />

				<div className={styles.name_price_wrapper}>
					<div className={styles.name_price}>
						<div className={styles.name}>
							{name?.substring(0, 50)}
							{name?.length > 50 ? '...' : ''}
						</div>

						{(see_price === 'login' && loginUser?.id !== undefined) || see_price !== 'request' ? (
							<>
								{type === 'variation' ? (
									<div className={styles.price_btn_wrapper}>
										<div className={`${styles.sku} semibold-text`}>Multiple SKU</div>
										<div className={styles.price}>{range}</div>
									</div>
								) : price_discounted !== null && price_discounted !== 0 && (price_discounted_end === null || new Date(price_discounted_end) >= new Date()) && price_discounted !== price_catalog ? (
									<div className={styles.price}>
										<span>{currencyFormat(price_discounted)}</span>
										<span>{currencyFormat(price_catalog)}</span>
										<span>{(100 - (Number(price_discounted) / Number(price_catalog)) * 100)?.toFixed(2)}% Off</span>
									</div>
								) : price === price_catalog ? (
									<div className={styles.price}>
										<div className={`${styles.price} ${price === 0 ? 'red-color' : undefined} `}>{price !== 0 ? currencyFormat(price) : 'Price N/A'}</div>
									</div>
								) : (
									<div className={styles.price}>
										<span>{currencyFormat(price)}</span>
										<span>{currencyFormat(price_catalog)}</span>
										<span>{(100 - (Number(price) / Number(price_catalog)) * 100)?.toFixed(2)}% Off</span>
									</div>
								)}
							</>
						) : (
							loginUser?.id === undefined &&
							see_price === 'login' && (
								<Link href='/auth/signin'>
									<a className={`${styles.hide_price} td-hide-price link secondary-color`}>Signin to see price</a>
								</Link>
							)
						)}
					</div>
				</div>
			</div>
			{modalLoading && <DarkLoader loaderType={'sml'} />}
		</div>
	)
}

export default TodaysDealsCard

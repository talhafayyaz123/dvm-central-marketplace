import React, { useEffect, useState } from 'react'
import { DarkLoader } from '../../Loader/Loader'
import Link from 'next/link'
import styles from './FooterNavigation.module.css'
import { baseApiUrl } from '../../../utils/config'

const CategoriesLinks = () => {
	const [categoriesData, setcategoriesData] = useState([])
	const [loading, setloading] = useState(false)

	const handleShopByDepts = async () => {
		setloading(true)
		let res = await fetch(`${baseApiUrl}/footer-categories-list`).then((response) => response.json())

		setcategoriesData(res?.slice(0, 7))
		setloading(false)
	}

	useEffect(() => {
		handleShopByDepts()
	}, [])

	return (
		<div className={`${styles.category_links_container} white-color`}>
			<h5 className='primary-color'>Shop By Categories</h5>
			<div className={styles.category_links_wrapper}>
				{loading ? (
					<DarkLoader />
				) : (
					<ul>
						{categoriesData?.map((data) => {
							const { name, slug, id } = data
							return (
								<li key={id}>
									<Link href={`/${slug}`}>
										<a>
											<svg width={13} height={7} viewBox='0 0 13 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
												<path
													d='M8.55859 2.65625V1.39844C8.55859 0.824219 9.26953 0.523438 9.67969 0.933594L12.0312 3.3125C12.3047 3.55859 12.3047 3.96875 12.0312 4.21484L9.67969 6.59375C9.26953 7.00391 8.55859 6.70312 8.55859 6.12891V4.84375H0.328125C0.136719 4.84375 0 4.70703 0 4.51562V2.98438C0 2.82031 0.136719 2.65625 0.328125 2.65625H8.55859Z'
													fill='var(--primary)'
												/>
											</svg>
											{name}
										</a>
									</Link>
								</li>
							)
						})}
					</ul>
				)}
			</div>
		</div>
	)
}

export default CategoriesLinks

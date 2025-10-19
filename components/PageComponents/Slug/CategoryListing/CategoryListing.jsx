import Link from 'next/link'
import React from 'react'
import CategoryCard from '../../../UI/CategoryCard/CategoryCard'
import LeftCol from '../../../UI/ListingLayout/LeftCol/LeftCol'
import ListingLayout from '../../../UI/ListingLayout/ListingLayout'
import RigthCol from '../../../UI/ListingLayout/RigthCol/RightCol'
import styles from './CategoriesListing.module.css'
import FilterBtnForMob from '../../../UI/FilterBtnForMob/FilterBtnForMob'

const CategoryListing = ({ result }) => {
	return (
		<ListingLayout>
			<LeftCol className={styles.left_col}>
				<div className={styles.left_col_container}>
					<h4 className='white-bg radius'>Categories</h4>
					<div className={`${styles.left_col_wrapper} active-scrollbar`}>
						{result.categories.map((category) => {
							const { slug, name } = category
							return (
								<Link href={`/${slug}`} key={category.id}>
									<a className={`${styles.category_name}`}>
										<svg className='transition' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--primary)'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
										</svg>
										<div>{name}</div>
									</a>
								</Link>
							)
						})}
					</div>
				</div>
			</LeftCol>

			<RigthCol pageType='category-listing' listingTitle={result?.category?.name} description={result?.category?.short_description} long_description={result?.category?.description}>
				<div className={`${styles.categories_result_container}`}>
					<div className={styles.result_num_wrapper}>
						<div className={styles.result_num}>
							<span>{result.categories.length} Result</span>
							{result.categories.length > 1 && <span>s</span>}
						</div>
						<FilterBtnForMob btnText='Categories' className={styles.mob_filter_btn}>
							<div className={`${styles.left_col_container} white-bg`}>
								<h4 className='white-bg radius'>Categories</h4>
								<div className={styles.left_col_wrapper}>
									{result.categories.map((category) => {
										const { slug, name } = category
										return (
											<Link href={`/${slug}`} key={category.id}>
												<a className={`${styles.category_name}`}>
													<svg className='transition' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--primary)'>
														<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
													</svg>
													<div>{name}</div>
												</a>
											</Link>
										)
									})}
								</div>
							</div>
						</FilterBtnForMob>
					</div>

					<div className={`${styles.categories_result_wrapper}`}>
						{result.categories.map((category) => {
							return <CategoryCard key={category.id} data={category} />
						})}
					</div>
				</div>
			</RigthCol>
		</ListingLayout>
	)
}

export default CategoryListing

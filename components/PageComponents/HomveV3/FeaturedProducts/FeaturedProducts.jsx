import React from 'react'
import styles from './FeaturedProducts.module.css'
import HeadingWithBtn from '../../../UI/HeadingWithBtn/HeadingWithBtn'
import HomeCardsLayout from '../../../UI/HomeCardsLayout/HomeCardsLayout'
import HorizontalCard from '../../../UI/HorizontalCard/HorizontalCard'

const FreaturedProducts = ({ data, setmodalLoading, setmodal, setModalData }) => {
	return (
		<section className='sec-container'>
			<div className='sec-m'>
				<HeadingWithBtn firstSeperator={true} colorHeading='Featured' BHLastWord='Products' svgAfterBH={true} btnText='View All' href={'/featured-products'} />
				<HomeCardsLayout className={styles.wrapper}>
					{data?.map((item) => {
						return <HorizontalCard key={item?.id} data={item} setmodalLoading={setmodalLoading} setmodal={setmodal} setModalData={setModalData} cardType='featured' />
					})}
				</HomeCardsLayout>
			</div>
		</section>
	)
}

export default FreaturedProducts

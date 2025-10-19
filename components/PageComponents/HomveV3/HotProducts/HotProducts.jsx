import React from 'react'
import HeadingWithBtn from '../../../UI/HeadingWithBtn/HeadingWithBtn'
import NewCard from '../../../UI/NewCard/NewCard'
import HomeCardsLayout from '../../../UI/HomeCardsLayout/HomeCardsLayout'

const HotProducts = ({ hotProducts, setmodalLoading, setmodal, setModalData }) => {
	return (
		<section className='sec-container'>
			<div className='sec-m'>
				<HeadingWithBtn firstSeperator={true} colorHeading='Hot Selling Products' lastSeperator={true} blackHeading={`Explore &`} BHLastWord='Choose!' btnText='View All' href={'/hot-products'} svgAfterBH={true} />
				<HomeCardsLayout>
					{hotProducts?.map((item) => {
						return <NewCard key={item?.id} data={item} setmodalLoading={setmodalLoading} setmodal={setmodal} setModalData={setModalData} />
					})}
				</HomeCardsLayout>
			</div>
		</section>
	)
}

export default HotProducts

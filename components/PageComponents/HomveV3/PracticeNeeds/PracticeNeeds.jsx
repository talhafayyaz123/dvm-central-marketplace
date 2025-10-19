import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './PracticeNeeds.module.css'
import axios from 'axios'
import { baseApiUrl } from '../../../../utils/config'
import NewCard from '../../../UI/NewCard/NewCard'
import { LiteLoader } from '../../../Loader/Loader'
import scrollToData from '../../../../utils/scrollToData'
import HeadingWithBtn from '../../../UI/HeadingWithBtn/HeadingWithBtn'
import HomeCardsLayout from '../../../UI/HomeCardsLayout/HomeCardsLayout'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'
import { GlobalProvider } from '../../../../context/AppProvider'
// import PageHeading from '../../UI/PageHeading/PageHeading'

const PracticeNeeds = ({ data, setmodalLoading, setmodal, setModalData }) => {
	const [items, setitems] = useState([])
	const [id, setid] = useState(data[0]?.id)
	const [loading, setloading] = useState(false)
	const [slug, setslug] = useState(data[0]?.slug)
	const [firstLoading, setfirstLoading] = useState(false)
	const [activeTab, setactiveTab] = useState(data[0]?.name)

	const tabRef = useRef(null)

	const { loginUser } = useContext(GlobalProvider)

	const activeTabHandler = async () => {
		if (firstLoading) {
			setloading(true)
			lockScroll()
		}
		const res = await axios(`${baseApiUrl}/vet-practice-products?category_id=${id}`, { headers: { type: loginUser?.id } })
		setitems(res?.data?.vet_practice_products?.data)
		setloading(false)
		unlockScroll()
		if (firstLoading) {
			if (window.matchMedia('(max-width: 576px)').matches) {
				scrollToData(tabRef?.current, 10)
			} else {
				scrollToData(tabRef?.current, 65)
			}
		}
	}

	useEffect(() => {
		activeTabHandler()
		setfirstLoading(true)
	}, [id])

	return (
		<section className='sec-m'>
			<LiteLoader className={`modal-bg transition ${loading ? 'show-bd' : 'hide-bd'} `} />
			<div className='sec-container'>
				<HeadingWithBtn firstSeperator={true} colorHeading='All' blackHeading={`Your Veterinary Practice Needs!`} svgAfterBH={true} btnText={'View All'} href={`/${slug}`} />

				{/* tabs */}
				<div ref={tabRef}>
					<div className={`${styles.tabs_container} white-bg`}>
						<div className={styles.tabs_wrapper}>
							{data?.map((tab) => {
								const { id, name, slug } = tab
								return (
									<div
										key={id}
										className={`${activeTab === name ? 'primary-color semibold-text' : 'gray-color'} ${styles.tab}`}
										onClick={() => {
											setactiveTab(name)
											setid(id)
											setslug(slug)
										}}
									>
										{name}
									</div>
								)
							})}
						</div>
					</div>

					{items?.length > 0 ? (
						<HomeCardsLayout>
							{items?.slice(0, 8)?.map((item, index) => {
								return <NewCard key={item?.id} index={index} data={item} setmodal={setmodal} setmodalLoading={setmodalLoading} setModalData={setModalData} />
							})}
						</HomeCardsLayout>
					) : (
						!loading && <div className='new-gray-color inner-sec-mt'>No Products has bees uploaded among this category</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default PracticeNeeds

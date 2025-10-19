import React, { useState, useRef, useEffect } from 'react'
import styles from './ShopyByDeptsAccordion.module.css'
import Link from 'next/link'

const ShopByDeptsAccordion = ({ ParentCategory, showShopByDepts, setShowByDepts, shopByContainer, setHideScroller, index, className }) => {
	const [showSubCategoryChilds, setShowSubCategoryChilds] = useState(false)
	const [activeSidbarIndex, setactiveSidbarIndex] = useState(index)

	const selectedAccordion = useRef([])
	const accordionContainer = useRef([])

	const showSubCategoryHandler = (index) => {
		shopByContainer.current.scrollTo(0, 0)
		setShowSubCategoryChilds(true)
		setHideScroller(true)
		setactiveSidbarIndex(index)
	}

	const backToMenuHandler = () => {
		setShowSubCategoryChilds(false)
		setHideScroller(false)
		setactiveSidbarIndex(null)
	}

	const openAccordion = async () => {
		if (typeof window !== 'undefined') {
			let currentAccordionElement = accordionContainer[index]
			let thisText = selectedAccordion[index]
			let thisIcon = currentAccordionElement?.querySelector('.accordion-opener svg')

			if (!thisText?.classList.contains('acc-opened')) {
				thisText?.classList.add('acc-opened')
				thisText.style.maxHeight = thisText.scrollHeight + 'px'
				thisIcon?.classList.add('icon-rotated')
			} else {
				thisText?.classList.remove('acc-opened')
				thisText.style.maxHeight = 0
				if (thisIcon?.classList.contains('icon-rotated')) {
					thisIcon?.classList.remove('icon-rotated')
				}
			}
		}
	}

	useEffect(() => {
		if (!showShopByDepts) {
			let linksHider = document.querySelectorAll('.links-hider'),
				allArrowIcons = document.querySelectorAll('.accordion-opener svg')
			// allShowMoreBtns = document.querySelectorAll('.section-wrapper button span')

			linksHider.forEach((hider) => {
				allArrowIcons.forEach((icon) => {
					icon.classList.remove('icon-rotated')
				})

				// allShowMoreBtns.forEach((span) => {
				// 	span.innerText = 'See More'
				// })

				hider.classList.remove('acc-opened')
				hider.style.maxHeight = 0
			})
			shopByContainer.current.scrollTo(0, 0)
			setTimeout(() => {
				setShowSubCategoryChilds(false)
				setHideScroller(false)
			}, 300)
		}
	}, [showShopByDepts])

	return (
		<div className={`${styles.shop_by_accordion_container} ${className}`}>
			<div ref={(el) => (accordionContainer[index] = el)} className={`${styles.shop_by_link_wrapper} shop-by-accordion-wrapper`}>
				<div className={`${styles.shop_by_link} accordion-opener`} onClick={() => openAccordion(accordionContainer)}>
					<div>{ParentCategory.name}</div>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--new-gray)' className='transition'>
						<path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
					</svg>
				</div>

				<ul ref={(el) => (selectedAccordion[index] = el)} className='links-hider transition' style={{ maxHeight: '0' }}>
					{ParentCategory?.subcategories?.map((childSubcategory, index) => {
						return (
							<li key={index}>
								<Link href={`/${childSubcategory?.slug}`}>
									<a className={styles.sub_category_links} onClick={() => setShowByDepts(false)}>
										{childSubcategory?.name}
									</a>
								</Link>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default ShopByDeptsAccordion

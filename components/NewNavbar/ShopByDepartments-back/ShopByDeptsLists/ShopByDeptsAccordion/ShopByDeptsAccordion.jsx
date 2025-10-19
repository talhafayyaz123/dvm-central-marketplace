import React, { useState, useRef, useEffect } from 'react'
import styles from './ShopyByDeptsAccordion.module.css'
import Link from 'next/link'

const ShopByDeptsAccordion = ({ result, showShopByDepts, setShowByDepts, shopByContainer, setHideScroller, index, gsap, className }) => {
	const [showSubCategoryChilds, setShowSubCategoryChilds] = useState(false)

	const selectedAccordion = useRef([])

	const showSubCategoryHandler = () => {
		shopByContainer.current.scrollTo(0, 0)
		setShowSubCategoryChilds(true)
		setHideScroller(true)
		gsap.fromTo(
			document.querySelectorAll('.child-sub-menu'),
			{
				autoAlpha: 0
			},
			{
				delay: 0.2,
				autoAlpha: 1,
				stagger: 0.05
			}
		)
	}

	const backToMenuHandler = () => {
		setShowSubCategoryChilds(false)
		setHideScroller(false)
	}

	const openAccordion = async () => {
		if (typeof window !== 'undefined') {
			let currentAccordionElement = document?.querySelectorAll('.shop-by-accordion-wrapper')[index]
			// let thisText = currentAccordionElement.nextElementSibling
			let thisText = selectedAccordion[index]
			let thisIcon = currentAccordionElement?.querySelector('.accordion-opener svg')

			if (thisText?.classList.contains('acc-opened') == false) {
				thisText?.classList.add('acc-opened')
				thisText.style.maxHeight = thisText.scrollHeight + 'px'
				thisIcon?.classList.add('icon-rotated')
				const accordionTimeline = gsap.timeline()
				accordionTimeline
					.add(() => thisText.scrollIntoView({ behavior: 'smooth', block: 'center' }))
					.fromTo(
						thisText.querySelectorAll('li'),
						{
							autoAlpha: 0
						},
						{
							delay: 0.3,
							autoAlpha: 1,
							stagger: 0.05
						}
					)
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
			let linksHider = document.querySelectorAll('.links-hider')
			let allArrowIcons = document.querySelectorAll('.accordion-opener svg')
			linksHider.forEach((hider) => {
				allArrowIcons.forEach((icon) => {
					icon.classList.remove('icon-rotated')
				})

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
			<div className={`${styles.shop_by_link_wrapper} shop-by-accordion-wrapper`}>
				<div className={`${styles.shop_by_link} accordion-opener`} onClick={() => openAccordion(index)}>
					<h5>{result.name}</h5>
					{/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--gray-icon)' className={`${openAccordion && 'icon-rotated'} transition`}> */}
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--gray-icon)' className={`transition`}>
						<path fillRule='evenodd' d='M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z' clipRule='evenodd' />
					</svg>
				</div>
				{/* <ul className='links-hider transition' ref={selectedAccordion} style={{ maxHeight: openAccordion === index ? selectedAccordion.current.scrollHeight : '0' }}> */}
				<ul className='links-hider transition' ref={(el) => (selectedAccordion[index] = el)} style={{ maxHeight: '0' }}>
					{result?.subcategories?.map((subcategory) => {
						return subcategory?.subcategories?.length === 0 ? (
							<li key={subcategory.id}>
								<Link href={`/${subcategory.slug}`}>
									<a className={styles.sub_category_links} onClick={() => setShowByDepts(false)}>
										{subcategory.name}
									</a>
								</Link>
							</li>
						) : (
							<li key={subcategory.id}>
								<div className={styles.sub_category_links} onClick={() => showSubCategoryHandler()}>
									<div>{subcategory.name}</div>
									<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)' className='w-6 h-6'>
										<path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
									</svg>
								</div>

								<div className={`${styles.sub_category_childs}  sidebar white-bg  transition ${showSubCategoryChilds && 'show-sidebar'}`}>
									<div className={`${styles.back_to_sub_category} black-color`} onClick={() => backToMenuHandler()}>
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={3} stroke='var(--black)' className='w-6 h-6'>
											<path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
										</svg>

										<div>Main Menu</div>
									</div>
									{subcategory?.subcategories?.map((subcategory) => {
										return (
											<Link href={`${subcategory.slug}`} key={subcategory.id}>
												<a className={`${styles.sub_category_links} child-sub-menu`} onClick={() => setShowByDepts(false)}>
													{subcategory.name}
												</a>
											</Link>
										)
									})}
								</div>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default ShopByDeptsAccordion

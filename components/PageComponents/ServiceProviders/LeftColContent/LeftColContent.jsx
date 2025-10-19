import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseApiUrl } from '../../../../utils/config'
import CustomCheckbox from '../../../UI/CustomCheckbox/CustomCheckbox'
import FilterAccordion from '../../../UI/FilterAccordion/FilterAccordion'
import styles from './LeftColContent.module.css'
import { lockScroll, unlockScroll } from '../../../../utils/scrollLock'
import scrollToData from '../../../../utils/scrollToData'
let gsap, ScrollToPlugin

const LeftColContent = ({ serviceProviderCategories, setinitialData, data, setloading, resultWrapper }) => {
	const [activeCategory, setActiveCategory] = useState('')
	const categoriesClickHandler = async (val) => {
		lockScroll()
		setloading(true)
		setActiveCategory(val)
		localStorage.setItem('dvm-selectedCategory', val)
		const res = await axios.get(`${baseApiUrl}/service-providers/filter?cat=${val}`)
		console.log('category click', res)
		setinitialData(res?.data?.serviceProviders)
		setloading(false)
		unlockScroll()
		if (gsap === undefined) {
			gsap = (await import('gsap')).default
			ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

			gsap.registerPlugin(ScrollToPlugin)
		}

		scrollToData(gsap, resultWrapper?.current, 100)
	}

	const dvmPreferredClickHandler = async (val) => {
		lockScroll()
		setloading(true)
		setActiveCategory(val)
		localStorage.setItem('dvm-selectedCategory', val)
		const res = await axios.get(`${baseApiUrl}/service-providers/filter?show=${val}`)
		console.log('category preffered', res)
		setinitialData(res?.data?.serviceProviders)
		setloading(false)
		unlockScroll()
		if (gsap === undefined) {
			gsap = (await import('gsap')).default
			ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

			gsap.registerPlugin(ScrollToPlugin)
		}

		scrollToData(gsap, resultWrapper?.current, 100)
	}

	const dvmDealClickHandler = async (val) => {
		lockScroll()
		setloading(true)
		setActiveCategory(val)
		localStorage.setItem('dvm-selectedCategory', val)
		const res = await axios.get(`${baseApiUrl}/service-providers/filter?show=${val}`)
		console.log('category deal', res)
		setinitialData(res?.data?.serviceProviders)
		setloading(false)
		unlockScroll()
		if (gsap === undefined) {
			gsap = (await import('gsap')).default
			ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

			gsap.registerPlugin(ScrollToPlugin)
		}

		scrollToData(gsap, resultWrapper?.current, 100)
	}

	useEffect(() => {
		// const loadGSAP = async () => {
		// 	if (gsap === undefined) {
		// 		gsap = (await import('gsap')).default
		// 		ScrollToPlugin = (await import('gsap/dist/ScrollToPlugin')).default

		// 		gsap.registerPlugin(ScrollToPlugin)
		// 	}

		// 	scrollToData(gsap, resultWrapper?.current, 100)
		// }

		// loadGSAP()

		const storedCategory = localStorage.getItem('dvm-selectedCategory')

		if (storedCategory) {
			setActiveCategory(storedCategory)
			if (storedCategory === 'all') {
				categoriesClickHandler(storedCategory)
			} else if (storedCategory === 'preferred') {
				dvmPreferredClickHandler(storedCategory)
			} else if (storedCategory === 'deals') {
				dvmDealClickHandler(storedCategory)
			} else {
				categoriesClickHandler(storedCategory)
			}
		}
	}, [])

	return (
		<>
			<FilterAccordion title='Filters' pageType='v-all-products' className={styles.accordion_wrapper}>
				<div className={styles.wrapper}>
					<CustomCheckbox type='radio' labeltitle='All Services' value='all' name='all-categories' checked={activeCategory === 'all'} onChange={(e) => categoriesClickHandler(e.target.value)} />
					<div className={`${styles.count} full-radius`}>{data?.total}</div>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.inner_wrapper}>
						<CustomCheckbox type='radio' labeltitle='DVM Central Preferred' value='preferred' name='all-categories' checked={activeCategory === 'preferred'} onChange={(e) => dvmPreferredClickHandler(e.target.value)} />
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--primary)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5' />
						</svg>
					</div>

					<div className={`${styles.count} full-radius`}>{data?.preferred}</div>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.inner_wrapper}>
						<CustomCheckbox type='radio' labeltitle='DVM Central Deal' value='deals' name='all-categories' checked={activeCategory === 'deals'} onChange={(e) => dvmDealClickHandler(e.target.value)} />
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--red)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z' />
							<path strokeLinecap='round' strokeLinejoin='round' d='M6 6h.008v.008H6V6z' />
						</svg>
					</div>
					<div className={`${styles.count} full-radius`}>{data?.deals}</div>
				</div>
				{serviceProviderCategories?.map((service) => {
					const { count, name, id } = service
					return (
						<div key={id} className={styles.wrapper}>
							<CustomCheckbox type='radio' labeltitle={name} value={id} name='all-categories' checked={activeCategory === id} onChange={(e) => categoriesClickHandler(e.target.value)} />
							<div className={`${styles.count} full-radius`}>{count}</div>
						</div>
					)
				})}
			</FilterAccordion>
		</>
	)
}

export default LeftColContent

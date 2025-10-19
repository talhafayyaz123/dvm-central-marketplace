import React, { useEffect, useRef, useState } from 'react'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import styles from './CustomSelectInput.module.css'
import { DarkLoader } from '../../Loader/Loader'

const CustomSelectInput = ({ data, defaultOption, name, onChange, onClick, showSelectMenu, setshowSelectMenu, placeholder, className = '', dataLoading, input_errors, showSearch, showFrom, countryValueChange, onDefaultValueClick, selectCategories, type, setselectCategories, checkedType }) => {
	const [searchVal, setsearchVal] = useState('')
	const [noData, setnoData] = useState(false)
	const wrapperRef = useRef(null)

	const searchHandler = async (val) => {
		let noDataFound = await data?.filter((country) => country?.name?.toLowerCase().includes(val.toLowerCase()))
		if (noDataFound.length === 0) {
			setnoData(true)
		} else setnoData(false)
	}

	// close dropdown if clicked elsewhere
	if (typeof window !== 'undefined') {
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showSelectMenu === true) {
				if (!wrapperRef.current?.contains(e.target)) {
					setshowSelectMenu(false)
					setnoData(false)
					setTimeout(() => {
						setsearchVal('')
					}, 300)
				} else {
					return
				}
			}
		})
	}
	const handleFocus = () => {
		if (checkedType !== 'multi') {
			setshowSelectMenu(true)
		}
	}
	// useEffect(() => {
	// 	if (selectCategories?.length === 0) {
	// 		setshowSelectMenu(false)
	// 	}
	// }, [selectCategories])

	return (
		<div ref={wrapperRef} className={`${styles.input} ${styles.list_containermulti} ${styles.list_container} ${input_errors ? 'input-error' : undefined} ${className} gray-border list-container custom-select-container`} tabIndex={0} onFocus={handleFocus}>
			<div className={`white-bg ${checkedType === 'multi' ? styles.val_wrappermulti : styles.val_wrapper}`} onClick={(e) => (setshowSelectMenu(true), onDefaultValueClick && onDefaultValueClick(e))}>
				{dataLoading ? <DarkLoader loaderType='sml' /> : checkedType === 'multi' ? <div style={{ display: 'flex', flexWrap: 'wrap' }}>{defaultOption}</div> : <div className={`gray-color`}>{data?.length > 0 ? defaultOption : countryValueChange ? `No ${name} found` : defaultOption} </div>}
				{data !== undefined && data?.length > 0 && (
					<svg className={styles.select_svg} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
					</svg>
				)}
			</div>

			{data?.length > 0 && (
				<div className={`${styles.list_wrapper} list-wrapper gray-border ${showFrom === 'top' ? styles.from_top : undefined} ${showSelectMenu ? (showFrom === 'top' ? styles.show_from_top : styles.show_select_menu) : undefined} shadow transition `}>
					{showSearch && (
						<div className={`${styles.searh_wrapper} gray-border`} tabIndex={-1}>
							<input
								tabIndex={-1}
								type='search'
								placeholder={placeholder}
								value={searchVal}
								onChange={(e) => {
									setsearchVal(e.target.value), searchHandler(e.target.value)
								}}
							/>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
							</svg>
						</div>
					)}

					{data
						?.filter((data) => {
							if (searchVal === '') {
								return data
							} else if (data?.name?.toLowerCase().includes(searchVal.toLowerCase())) {
								return data
							}
						})
						?.map((data, i) => {
							const isChecked = selectCategories?.some((category) => category?.id === data.id)
							return (
								<CustomCheckbox
									checked={isChecked ? isChecked : defaultOption == data?.name ? true : false}
									className={`${name}-input custom-select`}
									key={i}
									tabIndex={-1}
									type={type !== undefined ? type : 'radio'}
									labeltitle={data?.name}
									value={data?.id ? data?.id : data?.name}
									title={data?.name}
									name={name}
									onChange={onChange}
									onClick={(e) => {
										if (checkedType === 'multi') {
											setselectCategories((prev) => {
												const isAlreadySelected = prev.some((category) => category.id === data.id)

												if (isAlreadySelected) {
													return prev.filter((category) => category.id !== data.id)
												} else {
													return [...prev, data]
												}
											})
										}
										onClick && onClick(e), checkedType === 'multi' ? setshowSelectMenu(true) : setshowSelectMenu(false)
										setTimeout(() => {
											showSearch && setsearchVal('')
										}, 200)
									}}
								/>
							)
						})}
					{!dataLoading && noData && <div className={`${styles.no_data} red-color`}>No {name} found</div>}
				</div>
			)}
		</div>
	)
}

export default CustomSelectInput

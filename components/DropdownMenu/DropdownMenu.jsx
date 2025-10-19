import React, { useState, useRef } from 'react'
import styles from './DropdownMenu.module.css'

const DropdownMenu = ({ title, option }) => {
	const [showDropdown, setShowDropdown] = useState(false)
	const optionRef = useRef(title)
	const [selectedOption, setSelectedOption] = useState(title)
	return (
		<div className={styles.dropdown_menu_container}>
			<div className={styles.dropdown_menu_wrapper} onClick={() => setShowDropdown(!showDropdown)}>
				<div className='dropdown_title'>{selectedOption}</div>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--gray-icon)'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
				</svg>
			</div>
			<div className={`${styles.dropdown_options_wrapper} ${showDropdown ? 'show_menu' : 'hide-menu'}`}>
				<div
					className={styles.option}
					ref={optionRef}
					onClick={() => {
						setShowDropdown(false)
						setSelectedOption(optionRef.current.innerHTML)
					}}
				>
					{option}
				</div>
			</div>
		</div>
	)
}

export default DropdownMenu

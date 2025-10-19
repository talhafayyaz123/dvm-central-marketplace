import React from 'react'
import styles from './CustomCheckbox.module.css'

const CustomCheckbox = ({ onChange, type, displayType, value, radioChecked, labeltitle, name, className, pageType, selectedShipping, defaultShipping, feildRequired, heading, checkBox_errors, defaultChecked, tabIndex, ...props }) => {
	return heading ? (
		<h2 className={`${styles.heading_label} ${className}`}>
			<label className={`${styles.label_wrapper} gray-color ${pageType === 'wishlist' ? styles.no_style : undefined} ${pageType === 'surveyForm' ? styles.checkbox_survey : undefined}`} htmlFor={name}>
				{labeltitle} {feildRequired && <span className={`${styles.required} red-color`}>*</span>}
				<input {...props} defaultChecked={defaultChecked} className='checkbox' type={type} name={name} value={value} onChange={onChange} tabIndex={-1} />
				<span className={`${styles.checkmark} ${type === 'radio' && 'full-radius'} ${type === 'radio' && styles.radio_check}`} tabIndex={tabIndex !== undefined ? tabIndex : 0}>
					{' '}
				</span>
			</label>
		</h2>
	) : (
		<label className={`${styles.label_wrapper} gray-color ${className} ${pageType === 'wishlist' ? styles.no_style : undefined} ${pageType === 'surveyForm' ? styles.checkbox_survey : undefined}`} htmlFor={name}>
			{labeltitle} {feildRequired && <span className={`${styles.required} red-color`}>*</span>}
			<input {...props} defaultChecked={defaultChecked} className='checkbox' type={type} name={name} value={value} onChange={onChange} tabIndex={-1} />
			<span className={`${styles.checkmark} ${radioChecked ? 'input-checked' : undefined} ${checkBox_errors ? 'check-box-error' : undefined} ${type === 'radio' ? 'full-radius' : undefined} ${type === 'radio' && styles.radio_check}`} tabIndex={tabIndex !== undefined ? tabIndex : 0}>
				{' '}
			</span>
		</label>
	)
}

export default CustomCheckbox

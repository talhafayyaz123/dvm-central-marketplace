import React, { useRef } from 'react'
import CustomCheckbox from '../../../../../UI/CustomCheckbox/CustomCheckbox'
import styles from './TermsModal.module.css'
import TermsAndConditions from '../../../../LandingPage/TermsAndConditions/TermsAndConditions'

const TermsModal = ({ initial, setinitial, termsAcceptance, settermsAcceptance, modalAcceptanceError, setmodalAcceptanceError, showInitialError, setshowInitialError, onClick, data, termsChecked, settermsChecked, initialsLengthError, setinitialsLengthError }) => {
	const initialRef = useRef(null)

	return (
		<div className={styles.terms_container}>
			<TermsAndConditions />
			<div className={styles.inner_wrapper}>
				<h5 className={styles.terms_title}>I accept terms and conditions</h5>
				{modalAcceptanceError && (
					<div className={styles.error_msg} role='alert'>
						required
					</div>
				)}
			</div>
			<div className={styles.check_wrapper}>
				<CustomCheckbox
					checkBox_errors={modalAcceptanceError}
					feildRequired={true}
					className={styles.preferred_box}
					type='checkbox'
					labeltitle='Yes'
					name='terms'
					checked={termsChecked}
					value={termsAcceptance}
					onChange={(e) => {
						e.target.checked ? (settermsAcceptance(1), settermsChecked(true), setmodalAcceptanceError(false)) : (settermsAcceptance(0), settermsChecked(false))
					}}
				/>
			</div>
			<div className={styles.fields_wrapper}>
				<div className={styles.inner_wrapper}>
					<label htmlFor='initials'>
						Initials (only alphabets) <span className='red-color'>*</span>
					</label>
					{showInitialError && (
						<div className={styles.error_msg} role='alert'>
							required
						</div>
					)}
					{initialsLengthError && (
						<div className={styles.error_msg} role='alert'>
							Min 2 characters
						</div>
					)}
				</div>

				<input
					ref={initialRef}
					minLength={2}
					maxLength={20}
					className={`${styles.input} ${showInitialError || initialsLengthError ? 'input-error' : undefined}`}
					type='text'
					placeholder='First Name'
					value={initial}
					onChange={(e) => {
						e.target.value = e.target.value.replace(/[^a-zA-Z]+/g, '')
						setinitial(e.target.value), setshowInitialError(initialRef?.current?.value?.length === 0 ? true : false), setinitialsLengthError(initialRef?.current?.value?.length === 1 ? true : false)
					}}
				/>
				<button ref={data} type='button' className={`${styles.accept_btn} primary-btn white-color`} onClick={onClick}>
					Accept
				</button>
			</div>
		</div>
	)
}

export default TermsModal

import React, { useState } from 'react'
import styles from './DealsForm.module.css'
import { Controller, useForm } from 'react-hook-form'
import { LiteLoader } from '../../../../../Loader/Loader'
import axios from 'axios'
import { baseApiUrl } from '../../../../../../utils/config'
import Message from '../../../../../UI/Message/Message'
import { unlockScroll } from '../../../../../../utils/scrollLock'
import CustomSelectInput from '../../../../../UI/CustomSelectInput/CustomSelectInput'
import PhoneInput from 'react-phone-input-2'

const DealsForm = ({ data, setmodal, formsubmit, setformsubmit }) => {
	const { sp_Id, sp_email } = data
	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [resMsg, setresMsg] = useState('')
	const [formSuccess, setformSuccess] = useState(false)
	const [selectedContact, setselectedContact] = useState(null)
	const [selectedContactOption, setselectedContactOption] = useState('Select option')
	const [showSelectContact, setshowSelectContact] = useState(false)
	const [userPhone, setuserPhone] = useState('')
	const [userPhoneError, setuserPhoneError] = useState('')

	const contactData = [
		{
			id: 'phone',
			name: 'Phone'
		},
		{
			id: 'email',
			name: 'Email'
		}
	]

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		setValue,
		setError,
		control,
		clearErrors
	} = useForm()

	const submitHandler = async (e) => {
		if (userPhone?.length < 11 && userPhone?.length > 1) {
			setuserPhoneError('Min 10 digits')
		} else {
			setuserPhoneError('')
		}
		e.preventDefault()

		await handleSubmit(onSubmit)()
	}

	const onSubmit = async (data) => {
		setformsubmit(false)
		const { company, email, message, first_name, last_name, tel, how_to_contact } = data
		if (userPhoneError !== 'Min 10 digits') {
			const formData = {
				service_provider_id: sp_Id,
				service_provider_email: sp_email,
				first_name: first_name,
				last_name: last_name,
				email: email,
				message: message,
				phone: document.querySelector('.custom_number input')?.value,
				company_name: company,
				contact_method: selectedContact
			}
			setbtndisabled(true)
			setloading(true)
			const res = await axios.post(`${baseApiUrl}/service-providers-deals/contact-form`, formData)
			console.log('res?.data', res)
			setresMsg(res?.data?.message)
			setloading(false)
			setbtndisabled(false)
			setformsubmit(true)

			if (res?.data?.success === true) {
				setformSuccess(true)
				reset(),
					setuserPhone('+1'),
					setTimeout(() => {
						setmodal(false)
						unlockScroll()
						setformsubmit(false)
					}, 3000)
			} else {
				setformSuccess(false)
			}
		}
	}

	const phoneFormatHanlder = (ev) => {
		// ev.target.value = ev.target.value.replace(/[^a-zA-Z0-9]/g, '')

		// var regex = /^([a-zA-Z0-9]{3})([a-zA-Z0-9]{3})([a-zA-Z0-9]{4})$/
		// if (regex.test(ev.target.value)) {
		// 	clearErrors('tel')

		// 	return (ev.target.value = ev.target.value.replace(regex, '($1) $2-$3'))
		// } else {
		// 	if (ev.target.value.length < 10) {
		// 		ev.preventDefault()
		// 		setError('tel', {
		// 			type: 'length',
		// 			message: 'Min 10 digit'
		// 		})
		// 	} else if (ev.target.value.length >= 10) {
		// 		return (ev.target.value = ev.target.value.substring(0, 10).replace(regex, '($1) $2-$3'))
		// 	} else return ev.target.value
		// }
		if (ev?.length < 11) {
			setuserPhoneError('Min 10 digits')
		} else {
			setuserPhoneError('')
		}
	}

	return (
		<div className={`${styles.form_container}`}>
			<h4 className='primary-color'>Enter Your Details Below</h4>
			<form className={styles.form_wrapper}>
				<div className={styles.wrapper}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label htmlFor='first_name'>
								First Name <span>*</span>
							</label>
							{errors.first_name?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{errors.first_name?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.first_name?.message}
								</div>
							)}
						</div>

						<input
							{...register('first_name', {
								required: true,
								minLength: { value: 2, message: 'Min 2 characters' },
								maxLength: { value: 20, message: 'Max 20 characters' },
								pattern: { value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/, message: 'Enter valid name' }
							})}
							aria-invalid={errors.first_name ? 'true' : 'false'}
							className={`${styles.input} ${errors.first_name ? 'input-error' : undefined}`}
							minLength={2}
							maxLength={20}
							type='text'
							placeholder='First Name'
						/>
					</div>

					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label htmlFor='last_name'>
								Last Name <span>*</span>
							</label>
							{errors.last_name?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{errors.last_name?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.last_name?.message}
								</div>
							)}
						</div>

						<input
							{...register('last_name', {
								required: true,
								minLength: { value: 2, message: 'Min 2 characters' },
								maxLength: { value: 20, message: 'Max 20 characters' },
								pattern: { value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/, message: 'Enter valid name' }
							})}
							aria-invalid={errors.last_name ? 'true' : 'false'}
							className={`${styles.input} ${errors.last_name ? 'input-error' : undefined}`}
							minLength={2}
							maxLength={20}
							type='text'
							placeholder='Last Name'
						/>
					</div>
				</div>

				<div className={styles.wrapper}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label htmlFor='tel'>
								Phone Number <span>*</span>
							</label>
							{userPhoneError === '' && errors.tel?.type === 'validate' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{userPhoneError === 'Min 10 digits' && (
								<div className={styles.error_msg} role='alert'>
									{userPhoneError}
								</div>
							)}
						</div>

						{/* <input
							autoComplete='new-password'
							{...register('tel', {
								required: true,
								// maxLength: { value: 10, message: 'Min 10 digit' },
								validate: (val) => val?.length === 10 || errors?.tel?.message,
								onChange: (e) => (setValue(e.target.value), phoneFormatHanlder(e))
							})}
							placeholder='(201) 555-5555'
							onPaste={(e) => e.preventDefault()}
							aria-invalid={errors.tel ? 'true' : 'false'}
							className={`${styles.input} ${errors.tel ? 'input-error' : undefined}`}
							// minLength={10}
							// maxLength={10}
							type='text'
						/> */}
						<Controller
							control={control}
							name='tel'
							rules={{
								validate: () => userPhone !== '' && userPhone !== null && userPhone?.length >= 10
							}}
							render={({ field: { onBlur } }) => (
								<PhoneInput
									enableSearch={true}
									style={{ marginTop: '1rem' }}
									className={`custom_number ${errors.tel || userPhoneError === 'Min 10 digits' ? 'error_number' : undefined}`}
									searchPlaceholder={'Search country'}
									searchNotFound={'No country found...'}
									placeholder='+1(201) 555-5555'
									country='us'
									onPaste={(e) => e.preventDefault()}
									aria-invalid={errors.tel ? 'true' : 'false'}
									value={userPhone}
									onBlur={onBlur}
									onChange={(phone) => {
										setuserPhone(phone)
										phoneFormatHanlder(phone)
										phone.length === 11 && clearErrors('tel')
									}}
								/>
							)}
						/>
					</div>

					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label htmlFor='email'>
								Contact Email <span>*</span>
							</label>
							{errors.email?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{errors.email?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.email?.message}
								</div>
							)}
						</div>

						<input
							{...register('email', { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Enter valid email' } })}
							aria-invalid={errors.email ? 'true' : 'false'}
							className={`${styles.input} ${errors.email ? 'input-error' : undefined}`}
							type='email'
							placeholder='Email'
						/>
					</div>
				</div>

				<div className={styles.wrapper}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label htmlFor='company'>Company</label>
						</div>

						<input {...register('company')} className={styles.input} type='text' placeholder='Company Name' />
					</div>

					<div className={styles.fields_wrapper} onBlur={() => setshowSelectContact(false)}>
						<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
							<label htmlFor='how_to_contact'>
								Best way to reach you:
								<span className='red-color'> *</span>
							</label>
							{errors.how_to_contact && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
						</div>

						<Controller
							control={control}
							name='how_to_contact'
							rules={{
								validate: () => selectedContact !== null && selectedContact !== ''
							}}
							render={({ field: { onBlur } }) => (
								<CustomSelectInput
									dataLoading={false}
									countriesLoading={false}
									input_errors={errors.how_to_contact}
									isRequired
									visibleLabelId='how_to_contact_label'
									data={contactData}
									defaultOption={selectedContactOption}
									name='how_to_contact'
									placeholder='Search Contact'
									showSelectMenu={showSelectContact}
									setshowSelectMenu={setshowSelectContact}
									onBlur={onBlur}
									onChange={() => clearErrors('how_to_contact')}
									onClick={(e) => {
										setselectedContact(e.target.value), setselectedContactOption(e.target.title)
									}}
								/>
							)}
						/>
					</div>
				</div>

				<div className={styles.fields_wrapper}>
					<div className={styles.inner_wrapper}>
						<label htmlFor='message'>
							Your Message <span>*</span>
						</label>
						{errors.message?.type === 'required' && (
							<div className={`${styles.error_msg} ${styles.msg_error_msg}`} role='alert'>
								required
							</div>
						)}
						{errors.message?.message && (
							<div className={styles.error_msg} role='alert'>
								{errors.message?.message}
							</div>
						)}
					</div>

					<textarea
						{...register('message', { required: true, minLength: { value: 2, message: 'Min 2 characters' }, pattern: { value: /.*\S.*/, message: 'Enter something' } })}
						aria-invalid={errors.message ? 'true' : 'false'}
						className={`${styles.textarea} ${errors.message ? 'input-error' : undefined} transition`}
						minLength={2}
						placeholder='Message'
					/>
				</div>

				{formsubmit && <Message resMsg={resMsg} formSuccess={formSuccess} />}

				<button disabled={btndisabled} type='submit' onClick={(e) => submitHandler(e)} className={`${styles.btn} primary-btn`}>
					Submit
					{loading && <LiteLoader className={styles.submit_loader} />}
				</button>
			</form>
		</div>
	)
}

export default DealsForm

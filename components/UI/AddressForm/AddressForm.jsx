import React, { useState, useEffect, useRef, useContext } from 'react'
import styles from './AddressForm.module.css'
import DashboardHeading from '../DashboardHeading/DashboardHeading'
import { Controller, useForm } from 'react-hook-form'
import { DarkLoader, LiteLoader } from '../../Loader/Loader'
import { baseApiUrl } from '../../../utils/config'
import axios from 'axios'
import Message from '../Message/Message'
import CustomSelectInput from '../../UI/CustomSelectInput/CustomSelectInput'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import { useRouter } from 'next/router'
import { unlockScroll } from '../../../utils/scrollLock'
import { GlobalProvider } from '../../../context/AppProvider'
import PhoneInput from 'react-phone-input-2'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'
let continueAddress = false

const AddressForm = ({ userData, pageType, prevUrl, formType, setmodal, initialData, setinitialData, formSubmit, setformSubmit, setnoAddressFound, setuserAddress }) => {
	const [loading, setloading] = useState(false)
	const [forceLoading, setforceLoading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [resMsg, setresMsg] = useState('')
	const [formSuccess, setformSuccess] = useState(false)
	const [userPhone, setuserPhone] = useState('')
	const [userPhoneError, setuserPhoneError] = useState('')

	const [countriesList, setcountriesList] = useState([])
	const [stateList, setstateList] = useState([])
	const [showSelectMenu, setshowSelectMenu] = useState(false)
	const [showSelectState, setshowSelectState] = useState(false)

	const [selectedcountry, setselectedcountry] = useState('Select your country')
	const [selectedCountryOption, setselectedCountryOption] = useState(null)
	const [countriesLoading, setcountriesLoading] = useState(false)
	const [selectedState, setselectedState] = useState('Select your state')
	const [selectedStateOption, setselectedStateOption] = useState(null)
	const [countryValueChange, setcountryValueChange] = useState(false)
	const [stateLoading, setstateLoading] = useState(false)

	const [addressType, setaddressType] = useState(userData?.address_type)

	const router = useRouter()

	const { loginUser } = useContext(GlobalProvider)

	const defualt_address_check = useRef(null)

	const [placesData, setplacesData] = useState({})

	const [showTooltip, setshowTooltip] = useState(false)

	const [inputFocus, setinputFocus] = useState(false)
	const [eventKey, seteventKey] = useState('')

	const scriptOptions = {
		googleMapsApiKey: 'AIzaSyC-r86tO9gWZxzRiELiw3DQYa2D3_o1CVk',
		libraries: ['places']
	}

	const { isLoaded, loadError } = useLoadScript(scriptOptions)

	const [autocomplete, setAutocomplete] = useState(null)

	const [fillAllFields, setfillAllFields] = useState(false)

	const {
		register,
		setValue,
		getValues,
		formState: { errors },
		setError,
		clearErrors,
		handleSubmit,
		control,
		reset
	} = useForm({
		defaultValues: {
			first_name: userData?.first_name ? userData?.first_name : '',
			last_name: userData?.last_name ? userData?.last_name : '',
			country: userData?.address_type === 'manual' && userData?.country_name ? userData?.country_name : '',
			city: userData?.address_type === 'manual' && userData?.city ? userData?.city : '',
			state: userData?.address_type === 'manual' && userData?.state_name ? userData?.state_name : '',
			zip: userData?.address_type === 'manual' && userData?.zip ? userData?.zip : '',
			tel: userData?.phone ? userData?.phone : '',
			company: userData?.company ? userData?.company : ''
		}
	})

	// get countries list

	const getallCountries = async () => {
		setcountriesLoading(true)
		const res = await fetch(`${baseApiUrl}/countries`).then((resp) => resp.json())
		setcountriesList(res?.allCountries)

		// get user country
		const userCountry = await res?.allCountries?.find((country) => {
			// let countryId = userData?.country_name
			return country?.name === userData?.country_name
		})
		setselectedcountry(userData?.address_type !== 'google' && userCountry?.name !== undefined ? userCountry?.name : 'Select your country')
		setselectedCountryOption(userData?.address_type !== 'google' && userCountry?.id !== undefined ? userCountry?.id : null)

		// get user state
		const selectedCountryStates = await fetch(`${baseApiUrl}/states/${userCountry?.id}`).then((resp) => resp.json())
		setstateList(selectedCountryStates?.allStates)

		const userState = await selectedCountryStates?.allStates?.find((state) => {
			return state?.name === userData?.state_name
		})

		setselectedState(userData?.address_type !== 'google' && userState?.name !== undefined ? userState?.name : 'Select your state')
		setselectedStateOption(userData?.address_type !== 'google' && userState?.id !== undefined ? userState?.id : null)
		setcountriesLoading(false)
	}

	// get states list

	const getallStates = async () => {
		setstateLoading(true)
		const res = await fetch(`${baseApiUrl}/states/${selectedCountryOption}`).then((resp) => resp.json())
		setstateList(res?.allStates)
		setstateLoading(false)
	}

	useEffect(() => {
		getallCountries()
	}, [])

	useEffect(() => {
		countryValueChange && getallStates()
	}, [selectedCountryOption, selectedcountry, selectedStateOption, selectedState])

	const forceSave = (e) => {
		e.preventDefault()
		continueAddress = true
		handleSubmit(onSubmit)()
	}

	const validateAddress = (val) => {
		console.log('placesData', placesData)
		if (addressType === 'google') {
			clearErrors('address', 'country', 'state', 'city', 'zip')

			if (placesData?.country === '' && placesData?.state === '' && placesData?.city === '' && placesData?.zip === '') {
				return 'enter valid address'
			} else if (placesData?.state === '' && placesData?.city === '' && placesData?.zip === '') {
				return 'state, zip code and city is missing'
			} else if (placesData?.city === '' && placesData?.zip === '') {
				return 'zip code and city is missing'
			} else if (placesData?.zip === '') {
				return 'zip code is missing'
			} else if (placesData?.city === '') {
				return 'city is missing'
			} else if (Object.keys(placesData)?.length === 0) {
				return 'enter valid address'
			} else {
				return true
			}
		} else {
			clearErrors('google_address')

			if (val === undefined || val?.length === 0) {
				return 'required'
			} else if (val?.trim()?.length === 0) {
				return 'enter valid address'
			} else return true
		}
	}

	const onSubmit = async (data) => {
		if (!fillAllFields) {
			continueAddress ? setforceLoading(true) : setloading(true)
			const { address, google_address, company, first_name, last_name } = data
			const formData = {
				id: userData?.id,
				first_name: first_name,
				last_name: last_name,
				address_type: addressType === 'manual' ? 'manual' : 'google',
				address1: addressType === 'manual' ? address : google_address,
				country_name: addressType === 'manual' && selectedcountry !== 'Select your country' ? selectedcountry : placesData?.country,
				city: addressType === 'manual' ? data?.city : placesData?.city ? placesData?.city : '',
				state_name: addressType === 'manual' && selectedState !== 'Select your state' ? selectedState : placesData?.state,
				zip: addressType === 'manual' ? data?.zip : placesData?.zip ? placesData?.zip : '',
				timezone: placesData?.timeZone,
				latitude: placesData?.lat,
				longitude: placesData?.lng,
				phone: userPhone || document.querySelector('.address_phone input')?.value,
				company,
				vat: 0,
				default_shipping: pageType === 'address-listing' && userData?.default_shipping === 'Y' ? 'Y' : pageType === 'address-listing' && userData?.default_shipping !== 'Y' ? (defualt_address_check?.current?.querySelector('input')?.checked ? 'Y' : 'N') : 'Y',
				customer_id: loginUser?.id,
				force: continueAddress
			}
			setbtndisabled(true)

			const res = await axios.post(`${baseApiUrl}/user/${formType !== 'new-address' ? 'update' : 'save'}/address`, formData)
			console.log('res from address', res)
			setformSuccess(() => (res?.data?.success ? true : false))
			setresMsg(res?.data?.message)
			setloading(false)
			setforceLoading(false)
			setbtndisabled(false)
			setformSubmit(true)

			if (formType !== 'new-address' && formType !== 'edit-address') {
				if (res?.data?.success) {
					if (addressType === 'google') {
						setValue('address', '')
						setselectedcountry('Select your country')
						setselectedState('Select your state')
						setValue('city', '')
						setValue('zip', '')
					} else {
						setValue('google_address', '')
					}
					setTimeout(() => {
						if (prevUrl !== null && (prevUrl.includes('cart') || prevUrl.includes('checkout'))) {
							router?.push(prevUrl.includes('cart') ? '/cart' : '/checkout')
						} else if (prevUrl !== null && prevUrl.includes('pet-badges')) {
							router?.push(`/dashboard/pet-badges`)
						} else if (prevUrl !== null && prevUrl.includes('/vendors/')) {
							router?.push(prevUrl)
						}
					}, 2000)
				}
			} else {
				if (res?.data?.success) {
					initialData && setinitialData(res?.data?.delivery_addresses)
					if (formType !== 'edit-address') {
						reset()
						setuserPhone('+1')
						defualt_address_check?.current?.querySelector('input')?.checked && defualt_address_check?.current?.querySelector('input')?.checked(false)
					}

					setTimeout(() => {
						pageType !== 'product-detail' && setmodal(false)
						unlockScroll()
						pageType !== 'product-detail' && setformSubmit(false)
						continueAddress = false
					}, 3000)
				}
			}

			if (pageType === 'product-detail') {
				// console.log('places data from submit', placesData, 'userData', userData)

				await setuserAddress((prev) => {
					if (!prev) {
						return {
							address1: getValues(addressType === 'manual' ? 'address' : 'google_address'),
							zip: placesData?.zip,
							country_name: placesData?.country,
							state_name: placesData?.state,
							city: placesData?.city,
							latitude: placesData?.lat,
							longitude: placesData?.lng,
							timezone: placesData?.timeZone
						}
					} else {
						return {
							...userData,
							address1: getValues(addressType === 'manual' ? 'address' : 'google_address'),
							zip: placesData?.zip,
							country_name: placesData?.country,
							state_name: placesData?.state,
							city: placesData?.city,
							latitude: placesData?.lat,
							longitude: placesData?.lng,
							timezone: placesData?.timeZone
						}
					}
				})

				setnoAddressFound(false)
				setmodal(false)
				setformSubmit(false)
			}
		}
	}

	const phoneFormatHanlder = (ev) => {
		if (ev?.length < 11) {
			if (ev?.length > 1) {
				setuserPhoneError('Min 10 digits')
				setfillAllFields(true)
			} else {
				setuserPhoneError('required')
				setfillAllFields(true)
			}
		} else {
			setuserPhoneError('')
			setfillAllFields(false)
		}
	}

	useEffect(() => {
		setuserPhone(userData?.phone ? userData?.phone : '')

		if (userData?.address_type == 'google') {
			setValue('google_address', userData?.address1 ? userData?.address1 : '')
			setplacesData({ country: userData?.country_name ? userData?.country_name : '', state: userData?.state_name ? userData?.state_name : '', city: userData?.city ? userData?.city : '', zip: userData?.zip ? userData?.zip : '' })
		} else setValue('address', userData?.address1 ? userData?.address1 : '')
	}, [])

	// address funcs
	const onKeypress = (e) => {
		// On enter pressed
		if (e.key === 'Enter') {
			e.preventDefault()
			return false
		}
	}

	const onLoad = (autocompleteObj) => {
		setAutocomplete(autocompleteObj)
	}

	const onPlaceChanged = async (type) => {
		setplacesData({})
		if (autocomplete) {
			const place = await autocomplete.getPlace()

			console.log('place', place)

			if (place?.address_components?.length > 0) {
				const timeZone = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?key=AIzaSyC-r86tO9gWZxzRiELiw3DQYa2D3_o1CVk&location=${place?.geometry?.location.lat()},${place?.geometry?.location.lng()}&timestamp=${Math.round(new Date().getTime() / 1000)}`)
					.then((response) => response.json())
					.then((response) => {
						if (response.timeZoneId) {
							return response.timeZoneId
						} else {
							console.log('Select Proper Address')
						}
					})
					.catch((error) => {
						console.error('Error:', error)
					})

				const zip = place?.address_components?.filter((addr) => addr.types.includes('postal_code'))
				const country = place?.address_components?.filter((addr) => addr.types.includes('country'))
				const state = place?.address_components?.filter((addr) => addr.types.includes('administrative_area_level_1'))
				const city = place?.address_components?.filter((addr) => addr.types.includes('locality'))

				setplacesData({
					zip: zip?.length > 0 ? zip[0].long_name : '',
					country: country?.length > 0 ? country[0].long_name : '',
					state: state?.length > 0 ? state[0].long_name : '',
					city: city?.length > 0 ? city[0].long_name : '',
					lat: place?.geometry?.location.lat(),
					lng: place?.geometry?.location.lng(),
					timeZone
				})

				if (zip?.length > 0 && country?.length > 0 && state?.length > 0 && city?.length > 0) {
					clearErrors('google_address')
				}
			}
		}
	}
	let addressInput

	const handleFocus = () => {
		setTimeout(() => {
			addressInput = document.querySelector('.address-input')

			if (addressInput) {
				addressInput.focus()
				setinputFocus(true)
			}
		}, 300)
	}

	// useEffect(() => {
	// 	if (!inputFocus) {
	// 		onPlaceChanged()
	// 	}
	// }, [inputFocus])

	useEffect(() => {
		if (fillAllFields) {
			userPhoneError === '' && !errors.tel && setfillAllFields(false)
		}
	}, [userPhoneError, errors?.tel, fillAllFields])

	return (
		<>
			<div style={{ width: '100%' }}>
				<DashboardHeading heading='Delivery Address' />

				<form className={styles.form_wrapper}>
					<div className={styles.wrapper}>
						{/* first name */}
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
									pattern: { value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/, message: 'Enter valid name' },
									onChange: (e) => setValue('first_name', e.target.value)
								})}
								aria-invalid={errors.first_name ? 'true' : 'false'}
								className={`${styles.input} ${errors.first_name ? 'input-error' : undefined}`}
								type='text'
								placeholder='First Name'
								minLength={2}
								maxLength={20}
							/>
						</div>

						{/* last name */}
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
									pattern: { value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/, message: 'Enter valid name' },
									onChange: (e) => setValue('last_name', e.target.value)
								})}
								aria-invalid={errors.last_name ? 'true' : 'false'}
								className={`${styles.input} ${errors.last_name ? 'input-error' : undefined}`}
								type='text'
								placeholder='Last Name'
								minLength={2}
								maxLength={20}
							/>
						</div>
					</div>

					{/* phone */}
					<div className={styles.wrapper}>
						<div className={styles.fields_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='tel'>
									Phone <span>*</span>
								</label>

								{userPhoneError === '' && errors?.tel?.message === '' && (
									<div className={styles.error_msg} role='alert'>
										required
									</div>
								)}

								{userPhoneError !== '' && (
									<div className={styles.error_msg} role='alert'>
										{userPhoneError}
									</div>
								)}
							</div>

							<Controller
								control={control}
								name='tel'
								rules={{
									validate: () => userPhone !== '' && userPhone !== null && userPhone?.length > 10
								}}
								render={({ field: { onBlur } }) => (
									<PhoneInput
										enableSearch={true}
										style={{ marginTop: '1rem' }}
										className={`custom_number address_phone ${errors.tel || userPhoneError === 'Min 10 digits' ? 'error_number' : undefined}`}
										searchPlaceholder={'Search country'}
										searchNotFound={'No country found...'}
										placeholder='+1(201) 555-5555'
										onPaste={(e) => e.preventDefault()}
										aria-invalid={userPhoneError ? 'true' : 'false'}
										country={'us'}
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
								<label htmlFor='company'>Company</label>
								{errors.company?.message && (
									<div className={styles.error_msg} role='alert'>
										{errors.company?.message}
									</div>
								)}
							</div>

							<input {...register('company', { pattern: { value: /.*\S.*/, message: 'Enter valid name' }, onChange: (e) => setValue('company', e.target.value) })} className={styles.input} type='text' placeholder='Company Name' />
						</div>
					</div>

					{/* address */}
					<>
						{addressType === 'manual' ? (
							<>
								{/* manual */}
								<div className={styles.fields_wrapper}>
									<div className={styles.inner_wrapper}>
										<label htmlFor='address'>
											Address <span>*</span>
										</label>

										{errors?.address && (
											<div className={styles.error_msg} role='alert'>
												{errors?.address?.message}
											</div>
										)}
									</div>
									<input
										{...register('address', {
											required: false,
											validate: (val) => addressType === 'manual' && validateAddress(val),
											onChange: (e) => setValue('address', e.target.value)
										})}
										aria-invalid={errors?.address ? 'true' : 'false'}
										defaultValue={userData?.address_type === 'manual' && userData?.address1 ? userData?.address1 : ''}
										className={`${styles.input} ${errors?.address ? 'input-error' : undefined} address-input`}
										type='text'
										placeholder='Address'
									/>
								</div>

								<div className={styles.wrapper}>
									{/* country */}
									<div className={styles.fields_wrapper} onBlur={() => setshowSelectMenu(false)}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='country'>
												Country
												<span className='red-color'> *</span>
											</label>

											{errors?.country && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
										</div>

										<Controller
											control={control}
											name='country'
											rules={{
												validate: () => selectedcountry !== 'Select your country' || 'required'
											}}
											render={({ field: { onBlur } }) => (
												<CustomSelectInput
													input_errors={errors?.country}
													showSearch={true}
													className={`${styles.select} ${styles.custom_element}`}
													data={countriesList}
													defaultOption={selectedcountry}
													dataLoading={countriesLoading}
													countryValueChange={countryValueChange}
													name='country'
													placeholder='Search country'
													showSelectMenu={showSelectMenu}
													setshowSelectMenu={setshowSelectMenu}
													onChange={(e) => {
														setselectedCountryOption(e.target.value), setselectedcountry(e.target.title), setcountryValueChange(true), setselectedState('Select your state'), setselectedStateOption(null), clearErrors('country')
													}}
												/>
											)}
										/>
									</div>

									{/* state */}
									<div className={styles.fields_wrapper} onBlur={() => setshowSelectState(false)}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='state'>
												State
												<span className='red-color'> *</span>
											</label>
											{errors?.state && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
										</div>

										<Controller
											control={control}
											name='state'
											rules={{
												validate: () => (selectedState !== 'Select your state' && selectedState !== 'No state found') || 'required'
											}}
											render={({ field: { onBlur } }) => (
												<CustomSelectInput
													input_errors={errors?.state}
													showSearch={true}
													className={`${styles.select} ${styles.custom_element}`}
													data={stateList}
													defaultOption={selectedState}
													dataLoading={stateLoading}
													countryValueChange={countryValueChange}
													name='state'
													placeholder='Search state'
													showSelectMenu={showSelectState}
													setshowSelectMenu={setshowSelectState}
													onChange={(e) => {
														setselectedStateOption(e.target.value), setselectedState(e.target.title), clearErrors('state')
													}}
												/>
											)}
										/>
									</div>
								</div>

								<div className={styles.wrapper}>
									{/* city */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='city'>
												City <span>*</span>
											</label>
											{errors.city?.type === 'required' && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
										</div>

										<input
											{...register('city', {
												required: true
											})}
											aria-invalid={errors.city ? 'true' : 'false'}
											className={`${styles.input} ${errors.city ? 'input-error' : undefined}`}
											type='text'
											placeholder='City'
										/>
									</div>

									{/* zip */}
									<div className={styles.fields_wrapper}>
										<div className={styles.inner_wrapper}>
											<label htmlFor='zip'>
												Zip / Postal Code<span>*</span>
											</label>
											{errors.zip?.type === 'required' && (
												<div className={styles.error_msg} role='alert'>
													required
												</div>
											)}
											{errors.zip?.message && (
												<div className={styles.error_msg} role='alert'>
													{errors.zip?.message}
												</div>
											)}
										</div>

										<input
											{...register('zip', {
												required: true
											})}
											aria-invalid={errors.zip ? 'true' : 'false'}
											className={`${styles.input} ${errors.zip ? 'input-error' : undefined}`}
											type='text'
											placeholder='Zip / Postal code'
										/>
										<div className={styles.edit_address_btn}>
											<p
												className='link primary-color'
												onClick={() => {
													// setValue('address', '')
													setaddressType('google')
													// setValue('google_address', '')
													clearErrors('google_address')
													handleFocus()
												}}
											>
												Add auto address
											</p>
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								{/* auto */}
								<div className={styles.fields_wrapper} onBlur={() => setinputFocus(false)}>
									<div className={styles.inner_wrapper}>
										<label htmlFor='google_address'>
											Address <span>*</span>{' '}
											{getValues('google_address')?.length > 0 && (
												<div className={styles.tooltip_wrapper} onMouseEnter={setshowTooltip} onMouseLeave={() => setshowTooltip(!showTooltip)}>
													<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className='w-6 h-6'>
														<path strokeLinecap='round' strokeLinejoin='round' d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z' />
													</svg>
													<div className={`${styles.tooltip} gray-border shadow transition black-color ${showTooltip ? styles.show_tooltip : undefined}`}>{getValues('google_address')}</div>
												</div>
											)}
										</label>

										{errors?.google_address?.type === 'required' && errors?.google_address?.message === '' && (
											<div className={styles.error_msg} role='alert'>
												enter valid address
											</div>
										)}

										{errors?.google_address?.message && (
											<div className={styles.error_msg} role='alert'>
												{errors?.google_address?.message}
											</div>
										)}
									</div>

									<Controller
										control={control}
										name='google_address'
										render={({ field: { onBlur } }) =>
											!isLoaded ? (
												<DarkLoader className={styles.input} />
											) : loadError ? (
												<div>{`Google Map script can't be loaded, please reload the page`}</div>
											) : (
												<Autocomplete fields={['']} onLoad={onLoad} onPlaceChanged={onPlaceChanged} onKeypress={onKeypress}>
													<input
														{...register('google_address', {
															required: true,
															validate: (val) => validateAddress(val),
															onChange: (e) => (setplacesData({}), setValue('google_address', e.target.value))
														})}
														onFocus={() => setinputFocus(true)}
														onKeyDown={(e) => {
															setinputFocus(false)
														}}
														aria-invalid={errors?.google_address ? 'true' : 'false'}
														defaultValue={userData?.address_type === 'google' && userData?.address1 ? userData?.address1 : ''}
														className={`${styles.input} ${errors?.google_address ? 'input-error' : undefined} address-input`}
														type='text'
														placeholder='Address'
													/>
												</Autocomplete>
											)
										}
									/>
									<div className={styles.edit_address_btn}>
										<p
											className='link primary-color'
											onClick={() => {
												setaddressType('manual')
												clearErrors('address')
												// setValue('address', '')
												// setValue('google_address', '')

												handleFocus()
											}}
										>
											Add address manually
										</p>
									</div>
								</div>
							</>
						)}
					</>

					{pageType === 'address-listing' && userData?.default_shipping !== 'Y' && (
						<div className={`${styles.fields_wrapper} ${styles.default_check}`}>
							<div ref={defualt_address_check}>
								<CustomCheckbox labeltitle='Set as default address' name='default-check' type='checkbox' />
							</div>
						</div>
					)}

					{fillAllFields && <div className='red-color'>All Fields are required</div>}

					{formSubmit && <Message resMsg={resMsg} formSuccess={formSuccess} />}
					{!resMsg?.includes('shipping calculations') && (
						<button
							disabled={btndisabled}
							type='submit'
							className={`${styles.btn} primary-btn`}
							onClick={(e) => {
								e.preventDefault()
								if (eventKey !== 'Enter' || !inputFocus) {
									handleSubmit(onSubmit)()
								}
							}}
							onKeyDown={(e) => {
								seteventKey(e.key)
							}}
						>
							Save
							{loading && <LiteLoader className={styles.submit_loader} />}
						</button>
					)}
				</form>

				{resMsg?.includes('shipping calculations') && (
					<div className={styles.address_btns}>
						<button type='button' className='primary-btn white-color' onClick={forceSave}>
							Continue {forceLoading && <LiteLoader className={styles.submit_loader} />}
						</button>
						<button
							className='primary-border primary-color white-bg'
							onClick={() => {
								handleFocus()
								continueAddress = false
								setformSubmit(false)
								setresMsg('')
							}}
						>
							Edit Address
						</button>
					</div>
				)}
			</div>
		</>
	)
}

export default AddressForm

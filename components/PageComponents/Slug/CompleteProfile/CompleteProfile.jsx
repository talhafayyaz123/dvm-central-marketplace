import React, { useEffect, useState } from 'react'
import styles from './CompleteProfile.module.css'
import { Controller, useForm } from 'react-hook-form'
import { baseApiUrl } from '../../../../utils/config'
import axios from 'axios'
import { DarkLoader, LiteLoader } from '../../../Loader/Loader'
import Message from '../../../UI/Message/Message'
import leftwaveimg from '/public/landing-page/shape/left-wave.webp'
import rightwaveimg from '/public/landing-page/shape/right-wave.webp'
import Image from 'next/image'
import CustomSelectInput from '../../../UI/CustomSelectInput/CustomSelectInput'
import data from './data'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'
// import { useRouter } from 'next/router'

const CompleteProfile = ({ result }) => {
	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [formsubmit, setformsubmit] = useState(false)
	const [resMsg, setresMsg] = useState('')
	const [formSuccess, setformSuccess] = useState(false)

	// const [countryLoading, setcountryLoading] = useState(true)
	// const [countriesList, setcountriesList] = useState([])
	// const [selectedCountry, setselectedCountry] = useState(233)
	// const [selectedCountryOption, setselectedCountryOption] = useState('United States')

	// const [countryValueChange, setcountryValueChange] = useState(false)
	// const [stateLoading, setstateLoading] = useState(false)
	// const [stateList, setstateList] = useState([])
	// const [selectedState, setselectedState] = useState('')
	// const [selectedStateOption, setselectedStateOption] = useState('Select state')

	const [selectedInterest, setselectedInterest] = useState('')
	const [selectedInterestOption, setselectedInterestOption] = useState('Select interest')

	// const [showSelectMenu, setshowSelectMenu] = useState(false)
	// const [showSelectState, setshowSelectState] = useState(false)
	const [showSelectInterest, setshowSelectInterest] = useState(false)

	const [placesData, setplacesData] = useState({})

	const [showTooltip, setshowTooltip] = useState(false)

	const scriptOptions = {
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
		libraries: ['places']
	}

	const { isLoaded, loadError } = useLoadScript(scriptOptions)

	const [autocomplete, setAutocomplete] = useState(null)

	// const { asPath } = useRouter()

	// useEffect(() => {
	// 	console.log(atob(asPath.slice(18, asPath?.length)))
	// }, [])

	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit,
		reset,
		control,
		clearErrors,
		getValues
	} = useForm()

	// const getallCountries = async () => {
	// 	setcountryLoading(true)
	// 	const res = await fetch(`${baseApiUrl}/countries`).then((resp) => resp.json())
	// 	setcountriesList(res?.allCountries)
	// 	setcountryLoading(false)
	// }

	// const getAllStates = async () => {
	// 	setstateLoading(true)
	// 	const allStates = await axios.get(`${baseApiUrl}/states/${selectedCountry}`)
	// 	setstateList(allStates?.data?.allStates)
	// 	setstateLoading(false)
	// }

	// useEffect(() => {
	// 	getallCountries()
	// 	setcountryValueChange(true)
	// }, [])

	// useEffect(() => {
	// 	if (countryValueChange) {
	// 		getAllStates()
	// 		setselectedStateOption('Select state')
	// 		setselectedState(null)
	// 		const stateCheckbox = Array.from(document.querySelectorAll('.custom-select-container .state-input')).find((label) => label.querySelector('input').checked)
	// 		stateCheckbox !== undefined && (stateCheckbox.querySelector('input').checked = false)
	// 	}
	// }, [countryValueChange, selectedCountry])

	const onSubmit = async (data) => {
		setformsubmit(false)
		const { address, city, company, special_interest, zip, state, country } = data

		const formData = {
			email: result?.email,
			registration_id: btoa(result?.regsitration_id),
			company: company,
			address: address,
			city: city,
			country_name: country,
			state_name: state,
			zip_code: zip,
			speciality: selectedInterest
		}

		setbtndisabled(true)
		setloading(true)

		const res = await axios.post(`${baseApiUrl}/complete-your-profile`, formData)
		console.log('res from submi', res)
		setformSuccess(res?.data?.success === true ? true : false)
		setresMsg(res?.data?.success ? res?.data?.message + '. ' + 'You can close this page now.' : res?.data?.message)
		setloading(false)
		setbtndisabled(false)
		setformsubmit(true)

		if (res?.data?.success) {
			reset()
			setValue('address', '')
			// setselectedCountry(233)
			// setselectedCountryOption('United States')
			// setcountryValueChange(true)
			// setselectedState(null)
			setselectedInterestOption('Select Interest')
			setselectedInterest(null)
		}
	}

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

	const onPlaceChanged = async () => {
		setplacesData({})
		if (autocomplete) {
			const place = await autocomplete.getPlace()

			console.log('place', place)

			if (place?.address_components?.length > 0) {
				const timeZone = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&location=${place?.geometry?.location.lat()},${place?.geometry?.location.lng()}&timestamp=${Math.round(new Date().getTime() / 1000)}`)
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

				console.log(zip, country, state, city)

				if (zip?.length > 0) {
					setValue('zip', zip[0].long_name)
					clearErrors('zip')
				} else setValue('zip', '')

				if (country?.length > 0) {
					setValue('country', country[0].long_name)
					clearErrors('country')
				} else setValue('country', '')

				if (state?.length > 0) {
					setValue('state', state[0].long_name)
					clearErrors('state')
				} else setValue('state', '')

				if (city?.length > 0) {
					setValue('city', city[0].long_name)
					clearErrors('city')
				} else setValue('city', '')

				setplacesData({
					zip: zip?.length > 0 ? zip[0].long_name : '',
					country: country?.length > 0 ? country[0].long_name : '',
					state: state?.length > 0 ? state[0].long_name : '',
					city: city?.length > 0 ? city[0].long_name : '',
					lat: place?.geometry?.location.lat(),
					lng: place?.geometry?.location.lng(),
					timeZone: timeZone
				})

				if (zip?.length > 0 && country?.length > 0 && state?.length > 0 && city?.length > 0) {
					clearErrors('address')
				}
			}
		}
	}

	return (
		<>
			<section className='sec-p'>
				<div className={`${styles.img_2} img-2`}>
					<Image src={rightwaveimg} alt='VatandTech' />
				</div>
				<div className={`${styles.img_1} img-1`}>
					<Image src={leftwaveimg} alt='VatandTech' />
				</div>
				<div className='sec-container'>
					<div className={styles.form_container}>
						<h1 className={`${styles.title} primary-color`}>Complete your Profile</h1>
						<form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
							{/* address */}

							{/* 
							<div className={styles.fields_wrapper}>
								<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
									<label htmlFor='country'>
										Country:
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
										validate: () => selectedCountryOption !== null && selectedCountryOption !== ''
									}}
									render={({ field: { onBlur } }) => (
										<CustomSelectInput
											showSearch={true}
											dataLoading={countryLoading}
											input_errors={errors.country}
											isRequired
											visibleLabelId='country_label'
											data={countriesList}
											defaultOption={selectedCountryOption}
											name='country'
											placeholder='Search country'
											showSelectMenu={showSelectMenu}
											setshowSelectMenu={setshowSelectMenu}
											onBlur={onBlur}
											onClick={(e) => {
												setselectedCountry(e.target.value), setselectedCountryOption(e.target.title), setcountryValueChange(true), setselectedState('Select your state'), setselectedStateOption(null)
											}}
										/>
									)}
								/>
							</div>

							<div className={`${styles.fields_wrapper} state-wrapper`}>
								<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
									<label htmlFor='state'>
										State:
										<span className='red-color'> *</span>
									</label>

									{errors.state && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}
								</div>

								<Controller
									control={control}
									name='state'
									rules={{
										validate: () => selectedState !== null && selectedState !== ''
									}}
									render={({ field: { onBlur } }) => (
										<CustomSelectInput
											showSearch={true}
											dataLoading={stateLoading}
											countriesLoading={countryLoading}
											countryValueChange={countryValueChange}
											input_errors={errors.state}
											isRequired
											visibleLabelId='state_label'
											data={stateList}
											defaultOption={selectedStateOption}
											name='state'
											placeholder='Search state'
											showSelectMenu={showSelectState}
											setshowSelectMenu={setshowSelectState}
											onBlur={onBlur}
											onChange={() => clearErrors('state')}
											onClick={(e) => {
												setselectedStateOption(e.target.value), setselectedState(e.target.title)
											}}
										/>
									)}
								/>

							</div>

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
									{errors.city?.message && (
										<div className={styles.error_msg} role='alert'>
											{errors.city?.message}
										</div>
									)}
								</div>

								<input
									autoComplete='new-password'
									{...register('city', {
										required: true,
										pattern: {
											value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
											message: 'Enter valid city'
										},
										onChange: (e) => setValue('city', e.target.value)
									})}
									aria-invalid={errors.city ? 'true' : 'false'}
									className={`${styles.input} ${errors.city ? 'input-error' : 'gray-border'}`}
									type='text'
									placeholder='City'
								/>
							</div>

							<div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='zip'>Zip / Postal Code</label>
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
									autoComplete='new-password'
									{...register('zip', {
										required: false,
										// minLength: { value: 4, message: 'Min 4 digit' },
										// maxLength: { value: 10, message: 'Max 10 digit' },
										// pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Enter valid zip/ postal code' },
										onChange: (e) => setValue('zip', e.target.value)
									})}
									aria-invalid={errors.zip ? 'true' : 'false'}
									className={styles.input}
									// minLength={4}
									// maxLength={10}
									type='text'
									placeholder='Zip / Postal Code'
								/>
							</div> */}
							{/* address */}
							<div className={`${styles.fields_wrapper} ${styles.address_input}`}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='address'>
										Address <span>*</span>
										{getValues('address') !== '' && (
											<div className={styles.tooltip_wrapper} onMouseEnter={setshowTooltip} onMouseLeave={() => setshowTooltip(!showTooltip)}>
												<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--gray-icon)' className='w-6 h-6'>
													<path strokeLinecap='round' strokeLinejoin='round' d='m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z' />
												</svg>
												<div className={`${styles.tooltip} black-color gray-border shadow transition ${showTooltip ? styles.show_tooltip : undefined}`}>{getValues('address')}</div>
											</div>
										)}
									</label>

									{errors.address && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}
								</div>

								<Controller
									control={control}
									name='address'
									rules={{
										validate: () => placesData.length !== 0 && placesData?.zip !== '' && placesData?.country !== '' && placesData?.state !== '' && placesData?.city !== ''
									}}
									render={({ field: { onBlur } }) =>
										!isLoaded ? (
											<DarkLoader className={styles.input} />
										) : loadError ? (
											<div>{`Google Map script can't be loaded, please reload the page`}</div>
										) : (
											<Autocomplete fields={['']} onLoad={onLoad} onPlaceChanged={onPlaceChanged} onKeypress={onKeypress}>
												<input
													{...register('address', {
														required: true,
														onChange: (e) => (setValue('address', e.target.value), e.target.value.length === 0 && (setplacesData({}), setValue('country', ''), setValue('state', ''), setValue('city', ''), setValue('zip', '')))
													})}
													aria-invalid={errors.address ? 'true' : 'false'}
													className={`${styles.input} ${errors.address ? 'input-error' : undefined}`}
													type='text'
													placeholder='Address'
												/>
											</Autocomplete>
										)
									}
								/>
							</div>

							{/* country & state */}
							<div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='country'>
										Country:
										<span className='red-color'> *</span>
									</label>
									{errors.country && <div className={styles.error_msg}>required</div>}
								</div>
								<input
									readOnly
									{...register('country', {
										required: true
									})}
									aria-invalid={errors.country ? 'true' : 'false'}
									className={`${styles.input} ${errors.country ? 'input-error' : undefined}`}
									type='text'
									placeholder=''
								/>
							</div>

							<div className={styles.fields_wrapper}>
								<div className={`${styles.inner_wrapper}`}>
									<label htmlFor='state'>
										State:
										<span className='red-color'> *</span>
									</label>
									{errors.state && <div className={styles.error_msg}>required</div>}
								</div>

								<input
									readOnly
									{...register('state', {
										required: true
									})}
									aria-invalid={errors.state ? 'true' : 'false'}
									className={`${styles.input} ${errors.state ? 'input-error' : undefined}`}
									type='text'
									placeholder=''
								/>
							</div>
							<div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label className='black-color' htmlFor='city'>
										City <span className='red-color'>*</span>
									</label>
									{errors.city?.type === 'required' && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}
								</div>

								<input
									readOnly
									{...register('city', {
										required: true
									})}
									aria-invalid={errors.city ? 'true' : 'false'}
									className={`${styles.input} ${errors.city ? 'input-error' : undefined}`}
									type='text'
									placeholder=''
								/>
							</div>

							<div className={styles.fields_wrapper}>
								<div className={styles.inner_wrapper}>
									<label className='black-color' htmlFor='zip'>
										Zip / Postal Code<span className='red-color'>*</span>
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
									readOnly
									{...register('zip', {
										required: true
									})}
									aria-invalid={errors.zip ? 'true' : 'false'}
									className={`${styles.input} ${errors.zip ? 'input-error' : undefined}`}
									type='text'
									placeholder=''
								/>
							</div>
							{/* company */}
							<div className={`${styles.fields_wrapper} ${styles.address_input}`}>
								<div className={styles.inner_wrapper}>
									<label htmlFor='company'>
										Company / Institute <span>*</span>
									</label>
									{errors.company?.type === 'required' && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}
								</div>
								<input
									autoComplete='new-password'
									{...register('company', {
										required: true,
										minLength: { value: 2, message: 'name is too short' },
										onChange: (e) => setValue('company', e.target.value)
									})}
									aria-invalid={errors.tel ? 'true' : 'false'}
									className={`${styles.input} ${errors.company ? 'input-error' : undefined}`}
									type='text'
									placeholder='Company Name'
								/>
							</div>
							{/* specail interest */}
							<div className={`${styles.fields_wrapper} ${styles.address_input}`}>
								<div className={`${styles.inner_wrapper} ${styles.custom_element}`}>
									<label htmlFor='special_interest'>
										Special Interests: <span>*</span>
									</label>

									{errors.special_interest && (
										<div className={styles.error_msg} role='alert'>
											required
										</div>
									)}
								</div>

								<Controller
									control={control}
									name='special_interest'
									rules={{
										validate: () => selectedInterest !== null && selectedInterest !== ''
									}}
									render={({ field: { onBlur } }) => (
										<CustomSelectInput
											showFrom='top'
											dataLoading={false}
											countriesLoading={false}
											input_errors={errors.special_interest}
											isRequired
											visibleLabelId='special_interest_label'
											data={data}
											defaultOption={selectedInterestOption}
											name='special_interest'
											placeholder='Search interest'
											showSelectMenu={showSelectInterest}
											setshowSelectMenu={setshowSelectInterest}
											onBlur={onBlur}
											onChange={() => clearErrors('special_interest')}
											onClick={(e) => {
												setselectedInterest(e.target.value), setselectedInterestOption(e.target.title)
											}}
										/>
									)}
								/>

								{/* <select
									className={`${styles.input} ${styles.select_input} ${errors.special_interest ? 'input-error' : 'gray-border'}`}
									{...register('special_interest', {
										required: true,
										validate: { check: (val) => val !== '' || 'required' }
									})}
									aria-invalid={errors.special_interest ? 'true' : 'false'}
									type='select'
									name='special_interest'
									defaultValue={''}
									onChange={(e) => setValue('special_interest', e.target.value)}
								>
									<option value=''>Selct your Interests</option>
									<option value='Avian and exotic animal medicine'>Avian and exotic animal medicine</option>
									<option value='Dentistry'>Dentistry</option>
									<option value='Internal medicine'>Internal medicine</option>
									<option value='Orthopedic surgery'>Orthopedic surgery</option>
									<option value='Practice management'>Practice management</option>
									<option value='Shelter medicine'>Shelter medicine</option>
									<option value='Soft tissue surgery'>Soft tissue surgery </option>
									<option value='Emergency Medicine'>Emergency Medicine</option>
									<option value='Imaging'>Imaging</option>
									<option value='Other'>Other</option>
								</select> */}
							</div>

							{formsubmit && <Message className={styles.address_input} resMsg={resMsg} formSuccess={formSuccess} />}

							<button disabled={btndisabled} type='submit' className={`${styles.btn} gradient-btn`}>
								Submit
								{loading && <LiteLoader className={styles.submit_loader} />}
							</button>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}

export default CompleteProfile

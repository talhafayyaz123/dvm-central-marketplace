import React from 'react'
import styles from './SurveyForm.module.css'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import { useState } from 'react'
import { LiteLoader } from '../../Loader/Loader'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { baseApiUrl } from '../../../utils/config'
import Link from 'next/link'
import { GlobalProvider } from '../../../context/AppProvider'
import { useContext } from 'react'
import { unlockScroll } from '../../../utils/scrollLock'

const SurveyForm = ({ setmodal }) => {
	const { loginUser, userData } = useContext(GlobalProvider)
	console.log('loginuser value', loginUser, 'userData value', userData)
	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [submitmsg, setsubmitmsg] = useState('')
	const [formsubmit, setformsubmit] = useState(false)
	const [aware, setaware] = useState(1)
	const [purchase, setpurchase] = useState(1)
	const [selectedDietPlans, setSelectedDietPlans] = useState([])
	const [selectedFactors, setSelectedFactors] = useState([])
	// console.log('selectedtfactores', selectedFactors)
	const [otherText, setOtherText] = useState('')
	const [marketplace, setmarketplace] = useState('Definitely')

	const dietPlans = [{ name: 'GI-Health™ – Supports digestion and gut health' }, { name: 'Gluco-Balance™ – Helps maintain endocrine function' }, { name: 'Lo-Cal™ – Supports healthy weight management' }, { name: 'pH-Balance™ – Promotes urinary health' }, { name: 'Haven’t decided yet' }]
	const catFoodFactorsList = [
		{ id: 1, name: 'High protein content' },
		{ id: 2, name: 'Grain-free recipes' },
		{ id: 3, name: 'Inclusion of organ meats' },
		{ id: 4, name: 'Absence of artificial preservatives' },
		{ id: 5, name: 'Moisture content' },
		{ id: 6, name: 'Non-GMO ingredients' },
		{ id: 7, name: 'Other' } // "Other" option ( Please Specify )
	]

	const handleDietPlanSelection = (e) => {
		const selectedPlan = e.target.value
		if (selectedDietPlans.includes(selectedPlan)) {
			setSelectedDietPlans(selectedDietPlans.filter((name) => name !== selectedPlan))
		} else {
			setSelectedDietPlans([...selectedDietPlans, selectedPlan])
		}
	}

	const handleSelectionChange = (e, factorName) => {
		setSelectedFactors((prev) => {
			if (factorName === 'Other') {
				if (prev.includes('Other')) {
					return prev.filter((item) => item !== 'Other' && item !== otherText)
				} else {
					return [...prev, 'Other']
				}
			} else {
				return prev.includes(factorName) ? prev.filter((name) => name !== factorName) : [...prev, factorName]
			}
		})
	}

	const handleOtherTextChange = (e) => {
		const text = e.target.value
		setOtherText(text)

		setSelectedFactors((prev) => {
			console.log('Updating Other text')

			// Remove only the previous custom text but keep "Other" and all other selections
			const withoutOldOtherText = prev.filter((item) => item !== otherText || item === 'Other')

			return text ? [...withoutOldOtherText, text] : withoutOldOtherText
		})
	}

	const {
		formState: { errors },
		handleSubmit,
		control,
		reset
	} = useForm()

	const onSubmit = async () => {
		setbtndisabled(true)
		setloading(true)

		const formData = {
			first_name: loginUser?.first_name,
			last_name: loginUser?.last_name,
			phone_number: loginUser?.phone,
			email: loginUser?.email,
			is_aware_feline_nutrition_products: Number(aware),
			is_purchasing_products_veterinary_solutions: Number(purchase),
			veterinary_solutions_diet_plans_interest: selectedDietPlans,
			factors_cat_food: selectedFactors,
			like_purchase_veterinary_products: marketplace
		}

		const res = await axios.post(`${baseApiUrl}/tiki-cat-store-survey`, formData)

		setsubmitmsg(res?.data?.message)
		setloading(false)
		setbtndisabled(false)
		reset()
		setformsubmit(true)
		setaware(1)
		setpurchase(1)
		setSelectedFactors([])
		setSelectedDietPlans([])
		setmarketplace('Definitely')
		setOtherText('')
		if (res?.data?.success) {
			setTimeout(() => {
				setmodal(false)
				unlockScroll()
			}, 3000)
		}

		setTimeout(() => {
			setformsubmit(false)
		}, 5000)

		// if (res?.data?.success) {
		document.querySelectorAll('.checkbox-wrapper').forEach((wrapper) => {
			wrapper.querySelector('input').checked = false
		})
		// }
	}

	return (
		<div className={styles.main_wrapper}>
			<div className={`${styles.form_notify} shadow white-color primary-bg transition ${formsubmit && styles.show_notify}`}>{submitmsg}</div>
			<form className={styles.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
				<h4 className='primary-color' style={{ textAlign: 'center' }}>
					Tiki Cat® Product Interest Survey
				</h4>
				<p>Thank you for visiting the Tiki Cat® Veterinary Solutions™ page on DVM Central. Your insights help us better understand your needs and preferences. Please take a moment to complete this brief survey.</p>

				{/* aware */}
				<div className={`${styles.wrapper}`}>
					<p className={`${styles.label} gray-color`}>
						Were you previously aware of Tiki Cat® Veterinary Solutions™ products? <span className='color-red'>*</span>
					</p>
					<div className={styles.checkbox_wrapper}>
						<CustomCheckbox
							className={`${styles.checkbox}`}
							pageType={'surveyForm'}
							type='radio'
							labeltitle='Yes'
							name='aware'
							checked={aware == 1}
							value={1}
							onClick={(e) => {
								setaware(e.target.value)
							}}
						/>

						<CustomCheckbox
							className={`${styles.checkbox}`}
							pageType={'surveyForm'}
							type='radio'
							labeltitle='No'
							name='aware'
							checked={aware == 0}
							value={0}
							onClick={(e) => {
								setaware(e.target.value)
							}}
						/>
					</div>
				</div>

				{/* purchasing */}
				<div className={`${styles.wrapper}`}>
					<p className={`${styles.label} gray-color`}>
						Are you currently considering purchasing Tiki Cat® Veterinary Solutions™ products? <span className='color-red'>*</span>
					</p>
					<div className={styles.checkbox_wrapper}>
						<CustomCheckbox
							className={`${styles.checkbox}`}
							pageType={'surveyForm'}
							type='radio'
							labeltitle='Yes'
							name='purchase'
							checked={purchase == 1}
							value={1}
							onClick={(e) => {
								setpurchase(e.target.value)
							}}
						/>

						<CustomCheckbox
							className={`${styles.checkbox}`}
							pageType={'surveyForm'}
							type='radio'
							labeltitle='No'
							name='purchase'
							checked={purchase == 0}
							value={0}
							onClick={(e) => {
								setpurchase(e.target.value)
							}}
						/>
					</div>
				</div>

				{/*  */}
				<div className={styles.fields_wrapper}>
					<div className={styles.diet_plan}>
						<p className={`${styles.label} gray-color`}>
							What factors are most important when selecting cat food? <span className='color-red'>*</span> <br />
							(Select all that apply)
						</p>
						{errors.factors && (
							<div className='error-msg' role='alert'>
								required
							</div>
						)}
					</div>
					<Controller
						control={control}
						name='factors'
						rules={{
							validate: (value) => (value && value.length > 0) || 'Select at least one factor'
						}}
						render={({ field }) => (
							<>
								<div className={`${styles.upcoming_container}`}>
									{catFoodFactorsList.map((factor) => (
										<CustomCheckbox
											pageType={'surveyForm'}
											key={factor.name}
											type='checkbox'
											name='factors'
											value={factor.name}
											labeltitle={factor.name}
											checked={selectedFactors.includes(factor.name) || (factor.name === 'Other' && selectedFactors.includes('Other'))}
											onChange={(e) => {
												handleSelectionChange(e, factor.name)

												const selectedFactorsArray = field.value || [] // Ensure it's always an array
												const newSelectedFactors = e.target.checked
													? [...selectedFactorsArray, factor.name] // Store name instead of ID
													: selectedFactorsArray.filter((name) => name !== factor.name)

												field.onChange(newSelectedFactors)
											}}
										/>
									))}
								</div>
							</>
						)}
					/>

					{/* Show text area if "Other" is selected */}
					{selectedFactors.includes('Other') && (
						<div className={styles.fields_wrapper}>
							<input id='other_factor' type='text' placeholder='Specify your preference' value={otherText} onChange={handleOtherTextChange} className={`${styles.input} ${errors.other_factor ? 'input-error' : ''}`} autoComplete='off' />
						</div>
					)}
				</div>

				{/*  */}
				<div className={styles.fields_wrapper}>
					<div className={styles.diet_plan}>
						<p className={`${styles.label} gray-color`}>
							What factors are most important when selecting feline nutrition products? <span className='color-red'>*</span> <br /> (Select all that apply)
						</p>

						{/* ✅ Validation Error Display */}
						{errors.dietPlans && (
							<div className='error-msg' role='alert'>
								required
							</div>
						)}
					</div>

					<div>
						{' '}
						{/* ✅ Fixed bracket issue here */}
						<Controller
							control={control}
							name='dietPlans'
							rules={{
								validate: (value) => (value && value.length > 0) || 'Select at least one diet plan'
							}}
							render={({ field }) => (
								<>
									<div className={`${styles.upcoming_container}`}>
										{dietPlans.map((plan) => (
											<CustomCheckbox
												pageType={'surveyForm'}
												key={plan.name}
												type='checkbox'
												name='dietPlans'
												value={plan.name}
												labeltitle={plan.name}
												onChange={(e) => {
													handleDietPlanSelection(e)

													const selectedPlans = field.value || [] // ✅ Ensure field.value is always an array
													const newSelectedPlans = e.target.checked ? [...selectedPlans, plan.name] : selectedPlans.filter((name) => name !== plan.name)

													field.onChange(newSelectedPlans)
												}}
												checked={selectedDietPlans.includes(plan.name)}
											/>
										))}
									</div>
								</>
							)}
						/>
					</div>
				</div>

				{/*  */}
				{/* purchasing */}
				<div className={`${styles.wrapper}`}>
					<p className={`${styles.label} gray-color`}>
						Are you currently considering purchasing Tiki Cat® Veterinary Solutions™ products? <span className='color-red'>*</span>
					</p>
					<div className={styles.checkbox_wrapper}>
						<CustomCheckbox
							className={`${styles.checkbox}`}
							pageType={'surveyForm'}
							type='radio'
							labeltitle='Definitely'
							name='marketplace'
							checked={marketplace == 'Definitely'}
							value='Definitely'
							onClick={(e) => {
								setmarketplace(e.target.value)
							}}
						/>

						<CustomCheckbox
							className={`${styles.checkbox}`}
							pageType={'surveyForm'}
							type='radio'
							labeltitle='Probably'
							name='marketplace'
							checked={marketplace == 'Probably'}
							value='Probably'
							onClick={(e) => {
								setmarketplace(e.target.value)
							}}
						/>

						<CustomCheckbox
							className={`${styles.checkbox}`}
							pageType={'surveyForm'}
							type='radio'
							labeltitle='Unsure'
							name='marketplace'
							checked={marketplace == 'Unsure'}
							value='Unsure'
							onClick={(e) => {
								setmarketplace(e.target.value)
							}}
						/>
					</div>
				</div>

				<button disabled={btndisabled} type='submit' className={`${styles.btn} primary-btn`}>
					Submit
					{loading && <LiteLoader className={styles.submit_loader} />}
				</button>
				<p className='gray-color'>
					Thank you for your time! Explore{' '}
					<Link href='/'>
						<a className='link primary-color'>DVM Central Marketplace</a>
					</Link>{' '}
					for more veterinary solutions.
				</p>
			</form>
		</div>
	)
}

export default SurveyForm

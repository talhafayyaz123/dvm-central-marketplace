import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './TwoFaFrom.module.css'
import Message from '../../../../UI/Message/Message'
import { LiteLoader } from '../../../../Loader/Loader'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

const TwoFaForm = ({
	loading,
	setloading,

	show2FAMessage
}) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		clearErrors
	} = useForm()

	const router = useRouter()
	const [formSuccess, setformSuccess] = useState(false)
	const [resMsg, setresMsg] = useState('')

	const handle2faform = async (data) => {
		setloading(true)

		await signIn('twoFA', {
			code: data?.twofa,
			redirect: false
		}).then((resp) => {
			console.log('res from admin', resp)

			if (resp?.ok) {
				router?.push('/admin')
				setloading(false)
			} else {
				setformSuccess(resp?.error && false)
				setresMsg(resp?.error)
				setloading(false)
			}
		})
	}

	useEffect(() => {
		setformSuccess(show2FAMessage.includes('sent you verification code') ? true : false)
		setresMsg(show2FAMessage)
	}, [show2FAMessage])

	return (
		<div className={styles.forgot_form}>
			<Message formSuccess={formSuccess} resMsg={resMsg} />
			<h4 className={styles.heading}>Enter Verification code</h4>
			<form onSubmit={handleSubmit(handle2faform)}>
				<div className={styles.wrapper}>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label className='gray-color' htmlFor='twofa'>
								Code <span className='red-color'>*</span>
							</label>
							{errors.twofa?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									required
								</div>
							)}
							{errors.twofa?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.twofa?.message}
								</div>
							)}
						</div>

						<input
							{...register('twofa', {
								required: true,
								minLength: {
									value: 8,
									message: 'Code must be exactly 8 digits'
								},
								maxLength: {
									value: 8,
									message: 'Code must be exactly 8 digits'
								}
							})}
							aria-invalid={errors.twofa ? 'true' : 'false'}
							className={`${styles.input} ${errors.twofa ? 'input-error' : undefined}`}
							type='text'
							placeholder='Enter Verification Code'
							maxLength={8}
							onKeyDown={(e) => {
								if (e.key === ' ') {
									e.preventDefault()
								}
							}}
							onChange={(e) => {
								e.target.value = e.target.value.replace(/[^0-9]/g, '')
								if (e.target.value !== '') {
									clearErrors('twofa')
								}
							}}
						/>
					</div>
				</div>

				<div className={styles.inner_wrapper}>
					<button type='submit' className={`${styles.btn} primary-btn`}>
						Verify
						{loading && <LiteLoader className={styles.submit_loader} />}
					</button>
				</div>
			</form>
		</div>
	)
}

export default TwoFaForm

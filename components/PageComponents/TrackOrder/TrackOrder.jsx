import React, { useState } from 'react'
import { LiteLoader } from '../../Loader/Loader'
import styles from './TrackOrder.module.css'
import axios from 'axios'
import { baseApiUrl } from '../../../utils/config'
import { useForm } from 'react-hook-form'
import Message from '../../UI/Message/Message'
import { useRouter } from 'next/router'

const TrackOrder = ({ setshowTrackOrderInfo, setshowTrackOrderForm, setorderTrackDetail, settrackOrderResMsg, trackOrderResMsg }) => {
	const { push } = useRouter()
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm()

	const [tracking, settracking] = useState(false)
	const [btnDisabled, setBtnDisabled] = useState(false)

	const onSubmit = async (data) => {
		settracking(true)
		setBtnDisabled(true)
		let orderNo = await data?.order
		push(`/user/order-details/${orderNo}`)

		// const reqData = {
		// 	orderNo: orderNo
		// }

		// const res = await axios.post(`${baseApiUrl}/track-your-order`, reqData)
		// console.log('res from track', res)

		// res?.data?.success === true ? (setshowTrackOrderForm(false), setshowTrackOrderInfo(true), setorderTrackDetail(res?.data?.orderData)) : (setshowTrackOrderForm(true), setshowTrackOrderInfo(false), settrackOrderResMsg(res?.data?.message))

		// settracking(false)
		// setBtnDisabled(false)

		// setTimeout(() => {
		// 	settrackOrderResMsg(false)
		// }, 3000)
	}
	return (
		<>
			{/* <HeroBanner className={styles.hero_banner} /> */}
			<section className={`${styles.main_wrapper} sec-container`}>
				<div className={`${styles.inner_headings} sec-mt`}>
					<h4>Order Tracking</h4>
					<p className='gray-color'>
						To track your order please enter your Order ID in the box below and press the <span className={`${styles.track_text} primary-color`}>Track Your Order</span> button
					</p>
				</div>
				{trackOrderResMsg && <Message className={styles.reset_msg} resMsg={trackOrderResMsg} />}
				<form onSubmit={handleSubmit(onSubmit)} className='sec-mb'>
					<div className={styles.fields_wrapper}>
						<div className={styles.inner_wrapper}>
							<label className='gray-color' htmlFor='email'>
								Order ID
							</label>
							{errors.order?.type === 'required' && (
								<div className={styles.error_msg} role='alert'>
									Please add your order number
								</div>
							)}
							{errors.order?.message && (
								<div className={styles.error_msg} role='alert'>
									{errors.order?.message}
								</div>
							)}
						</div>

						<input {...register('order', { required: true })} aria-invalid={errors.order ? 'true' : 'false'} className={`${styles.input} ${errors.order ? 'input-error' : undefined}`} type='order' placeholder='Your order id' />
					</div>

					<div className={`${styles.inner_wrapper} ${styles.btn}`}>
						<button className='primary-btn' type='submit' disabled={btnDisabled}>
							Track Your Order {tracking && <LiteLoader className={styles.tracking_loader} />}
						</button>
					</div>
				</form>
			</section>
		</>
	)
}

export default TrackOrder

import React, { useState, useRef } from 'react'
import styles from './Submit.module.css'
// import Rating from '../../../../../UI/Rating/Rating'
import { Rating } from '@smastrom/react-rating'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { baseApiUrl } from '../../../../../../../utils/config'
import Message from '../../../../../../UI/Message/Message'
import { LiteLoader } from '../../../../../../Loader/Loader'
import coinsAnim from '../../../../../../../utils/coinsAnim'
import { useEffect } from 'react'
import Resizer from 'react-image-file-resizer'
import getBlobImg from '../../../../../../../utils/getBlobImage'
import Link from 'next/link'

const Submit = ({ serviceId, modal, setmodal, loginUser, className }) => {
	const [loading, setloading] = useState(false)
	const [btndisabled, setbtndisabled] = useState(false)
	const [formSubmit, setformSubmit] = useState(false)
	const [formSuccess, setformSuccess] = useState(false)

	const [reviewVideo, setreviewVideo] = useState('Select a video')
	const [reviewImage1, setreviewImage1] = useState('Select an image')
	const [reviewImage2, setreviewImage2] = useState('Select an image')
	const [reviewImage3, setreviewImage3] = useState('Select an image')
	const [reviewImage4, setreviewImage4] = useState('Select an image')
	const [reviewImage5, setreviewImage5] = useState('Select an image')
	const [showRequired, setshowRequired] = useState(true)

	const imageRef = useRef(null)

	const [resMsg, setresMsg] = useState(null)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		getValues,
		reset,
		clearErrors,
		setError,
		setValue
	} = useForm({
		mode: 'onBlur'
	})

	if (typeof window !== 'undefined') {
		document.body.addEventListener('mousedown', (e) => {
			e.stopPropagation()
			if (showRequired === false) {
				if (!imageRef?.current?.contains(e.target)) {
					setshowRequired(true)
				}
			} else return
		})
	}

	const imgValidate = (val) => {
		const imageMaxSize = 1024 * 1024
		const imageSize = val[0]?.size / imageMaxSize
		if (val?.length > 0) {
			if (val[0]?.type !== 'image/png' && val[0]?.type !== 'image/jpg' && val[0]?.type !== 'image/jpeg' && val[0]?.type !== 'image/jfif' && val[0]?.type !== 'image/pjpeg' && val[0]?.type !== 'image/pjp' && val[0]?.type !== 'image/webp') {
				return 'Only .png, .jpg etc files are allowed.'
			} else if (imageSize > 2) {
				return 'Max 2MB size is allowed.'
			}
		} else return true
	}

	const videoValidate = (val) => {
		const videoMaxSize = 1024 * 1024
		const videoSize = val[0]?.size / videoMaxSize
		if (val?.length > 0) {
			if (val[0]?.type !== 'video/mp4' && val[0]?.type !== 'video/mpeg' && val[0]?.name.slice(-3) !== 'mkv' && val[0]?.type !== 'video/webm') {
				return 'Only .mp4, .mkv or .webm format is allowed.'
			} else if (videoSize > 20) {
				return 'Max 20MB size is allowed.'
			} else return true
		}
	}

	const resizeFile = (file) =>
		new Promise((resolve) => {
			Resizer.imageFileResizer(
				file,
				1000,
				1000,
				'JPEG',
				100,
				0,
				(uri) => {
					resolve(uri)
				},
				'jpeg'
			)
		})

	const compressedImg = async (image) => {
		if (image?.length > 0) {
			const compressedImage = await resizeFile(image[0])
			const blob = await getBlobImg(compressedImage)
			return await fetch(blob).then((r) => r.blob())
		} else return
	}

	const onSubmit = async (data) => {
		setshowRequired(true)
		// if (data?.review_img1?.length > 0) {
		// 	if (
		// 		data?.review_img1[0]?.type !== 'image/png' &&
		// 		data?.review_img1[0]?.type !== 'image/jpg' &&
		// 		data?.review_img1[0]?.type !== 'image/jpeg' &&
		// 		data?.review_img1[0]?.type !== 'image/jfif' &&
		// 		data?.review_img1[0]?.type !== 'image/pjpeg' &&
		// 		data?.review_img1[0]?.type !== 'image/pjp' &&
		// 		data?.review_img1[0]?.type !== 'image/webp'
		// 	) {
		// 		setError('review_img1', {
		// 			type: 'filetype',
		// 			message: 'Only .png, .jpg etc files are allowed.'
		// 		})
		// 	} else if (data?.review_img1[0]?.2) {
		// 		setError('review_img1', {
		// 			type: 'filesize',
		// 			message: 'Max 2MB size is allowed.'
		// 		})
		// 	}
		// }
		// if (data?.review_img2?.length > 0) {
		// 	if (
		// 		data?.review_img2[0]?.type !== 'image/png' &&
		// 		data?.review_img2[0]?.type !== 'image/jpg' &&
		// 		data?.review_img2[0]?.type !== 'image/jpeg' &&
		// 		data?.review_img2[0]?.type !== 'image/jfif' &&
		// 		data?.review_img2[0]?.type !== 'image/pjpeg' &&
		// 		data?.review_img2[0]?.type !== 'image/pjp' &&
		// 		data?.review_img2[0]?.type !== 'image/webp'
		// 	) {
		// 		setError('review_img2', {
		// 			type: 'filetype',
		// 			message: 'Only .png, .jpg etc files are allowed.'
		// 		})
		// 	} else if (data?.review_img2[0]?.size > 2) {
		// 		setError('review_img2', {
		// 			type: 'filesize',
		// 			message: 'Max 2MB size is allowed.'
		// 		})
		// 	}
		// }
		// if (data?.review_img3?.length > 0) {
		// 	if (
		// 		data?.review_img3[0]?.type !== 'image/png' &&
		// 		data?.review_img3[0]?.type !== 'image/jpg' &&
		// 		data?.review_img3[0]?.type !== 'image/jpeg' &&
		// 		data?.review_img3[0]?.type !== 'image/jfif' &&
		// 		data?.review_img3[0]?.type !== 'image/pjpeg' &&
		// 		data?.review_img3[0]?.type !== 'image/pjp' &&
		// 		data?.review_img3[0]?.type !== 'image/webp'
		// 	) {
		// 		setError('review_img3', {
		// 			type: 'filetype',
		// 			message: 'Only .png, .jpg etc files are allowed.'
		// 		})
		// 	} else if (data?.review_img3[0]?.size > 2000000) {
		// 		setError('review_img3', {
		// 			type: 'filesize',
		// 			message: 'Max 2MB size is allowed.'
		// 		})
		// 	}
		// }
		// if (data?.review_img4?.length > 0) {
		// 	if (
		// 		data?.review_img4[0]?.type !== 'image/png' &&
		// 		data?.review_img4[0]?.type !== 'image/jpg' &&
		// 		data?.review_img4[0]?.type !== 'image/jpeg' &&
		// 		data?.review_img4[0]?.type !== 'image/jfif' &&
		// 		data?.review_img4[0]?.type !== 'image/pjpeg' &&
		// 		data?.review_img4[0]?.type !== 'image/pjp' &&
		// 		data?.review_img4[0]?.type !== 'image/webp'
		// 	) {
		// 		setError('review_img4', {
		// 			type: 'filetype',
		// 			message: 'Only .png, .jpg etc files are allowed.'
		// 		})
		// 	} else if (data?.review_img4[0]?.size > 2000000) {
		// 		setError('review_img4', {
		// 			type: 'filesize',
		// 			message: 'Max 2MB size is allowed.'
		// 		})
		// 	}
		// }
		// if (data?.review_img5?.length > 0) {
		// 	if (
		// 		data?.review_img5[0]?.type !== 'image/png' &&
		// 		data?.review_img5[0]?.type !== 'image/jpg' &&
		// 		data?.review_img5[0]?.type !== 'image/jpeg' &&
		// 		data?.review_img5[0]?.type !== 'image/jfif' &&
		// 		data?.review_img5[0]?.type !== 'image/pjpeg' &&
		// 		data?.review_img5[0]?.type !== 'image/pjp' &&
		// 		data?.review_img5[0]?.type !== 'image/webp'
		// 	) {
		// 		setError('review_img5', {
		// 			type: 'filetype',
		// 			message: 'Only .png, .jpg etc files are allowed.'
		// 		})
		// 	} else if (data?.review_img5[0]?.size > 2000000) {
		// 		setError('review_img5', {
		// 			type: 'filesize',
		// 			message: 'Max 2MB size is allowed.'
		// 		})
		// 	}
		// }
		// if (data?.review_video?.length > 0) {
		// 	if (data?.review_video[0]?.type !== 'video/mp4' && data?.review_video[0]?.type !== 'video/mpeg' && data?.review_video[0]?.name.slice(-3) !== 'mkv' && data?.review_video[0]?.type !== 'video/webm') {
		// 		setError('review_video', {
		// 			type: 'filetype',
		// 			message: 'Only .mp4, .mkv or .webm format is allowed.'
		// 		})
		// 	} else if (data?.review_video[0]?.size > 20000000) {
		// 		setError('review_video', {
		// 			type: 'filesize',
		// 			message: 'Max 20MB size is allowed.'
		// 		})
		// 	}
		// }
		// if (
		// 	(data?.review_img1?.length > 0 &&
		// 		data?.review_img1[0]?.type !== 'image/png' &&
		// 		data?.review_img1[0]?.type !== 'image/jpg' &&
		// 		data?.review_img1[0]?.type !== 'image/jpeg' &&
		// 		data?.review_img1[0]?.type !== 'image/jfif' &&
		// 		data?.review_img1[0]?.type !== 'image/pjpeg' &&
		// 		data?.review_img1[0]?.type !== 'image/pjp' &&
		// 		data?.review_img1[0]?.type !== 'image/webp') ||
		// 	(data?.review_img1?.length > 0 && data?.review_img1[0]?.size > 2000000) ||
		// 	(data?.review_img2?.length > 0 &&
		// 		data?.review_img2[0]?.type !== 'image/png' &&
		// 		data?.review_img2[0]?.type !== 'image/jpg' &&
		// 		data?.review_img2[0]?.type !== 'image/jpeg' &&
		// 		data?.review_img2[0]?.type !== 'image/jfif' &&
		// 		data?.review_img2[0]?.type !== 'image/pjpeg' &&
		// 		data?.review_img2[0]?.type !== 'image/pjp' &&
		// 		data?.review_img2[0]?.type !== 'image/webp') ||
		// 	(data?.review_img2?.length > 0 && data?.review_img2[0]?.size > 2000000) ||
		// 	(data?.review_img3?.length > 0 &&
		// 		data?.review_img3[0]?.type !== 'image/png' &&
		// 		data?.review_img3[0]?.type !== 'image/jpg' &&
		// 		data?.review_img3[0]?.type !== 'image/jpeg' &&
		// 		data?.review_img3[0]?.type !== 'image/jfif' &&
		// 		data?.review_img3[0]?.type !== 'image/pjpeg' &&
		// 		data?.review_img3[0]?.type !== 'image/pjp' &&
		// 		data?.review_img3[0]?.type !== 'image/webp') ||
		// 	(data?.review_img3?.length > 0 && data?.review_img3[0]?.size > 2000000) ||
		// 	(data?.review_img4?.length > 0 &&
		// 		data?.review_img4[0]?.type !== 'image/png' &&
		// 		data?.review_img4[0]?.type !== 'image/jpg' &&
		// 		data?.review_img4[0]?.type !== 'image/jpeg' &&
		// 		data?.review_img4[0]?.type !== 'image/jfif' &&
		// 		data?.review_img4[0]?.type !== 'image/pjpeg' &&
		// 		data?.review_img4[0]?.type !== 'image/pjp' &&
		// 		data?.review_img4[0]?.type !== 'image/webp') ||
		// 	(data?.review_img4?.length > 0 && data?.review_img4[0]?.size > 2000000) ||
		// 	(data?.review_img5?.length > 0 &&
		// 		data?.review_img5[0]?.type !== 'image/png' &&
		// 		data?.review_img5[0]?.type !== 'image/jpg' &&
		// 		data?.review_img5[0]?.type !== 'image/jpeg' &&
		// 		data?.review_img5[0]?.type !== 'image/jfif' &&
		// 		data?.review_img5[0]?.type !== 'image/pjpeg' &&
		// 		data?.review_img5[0]?.type !== 'image/pjp' &&
		// 		data?.review_img5[0]?.type !== 'image/webp') ||
		// 	(data?.review_img5?.length > 0 && data?.review_img5[0]?.size > 2000000) ||
		// 	(data?.review_video?.length > 0 && data?.review_video[0]?.type !== 'video/mp4' && data?.review_video[0]?.type !== 'video/mpeg' && data?.review_video[0]?.name.slice(-3) !== 'mkv' && data?.review_video[0]?.type !== 'video/webm') ||
		// 	(data?.review_video?.length > 0 && data?.review_video[0]?.size > 10000000)
		// ) {
		// 	return
		// } else {
		setbtndisabled(true)
		setloading(true)
		// const resizeFile = (file) =>
		// 	new Promise((resolve) => {
		// 		Resizer.imageFileResizer(
		// 			file,
		// 			1000,
		// 			1000,
		// 			'JPEG',
		// 			100,
		// 			0,
		// 			(uri) => {
		// 				resolve(uri)
		// 			},
		// 			'jpeg'
		// 		)
		// 	})

		// let blobImg1, blobImg2, blobImg3, blobImg4, blobImg5
		// if (data?.review_img1?.length > 0) {
		// 	const compressedImg1 = await resizeFile(data?.review_img1[0])
		// 	const blob1 = await getBlobImg(compressedImg1)
		// 	blobImg1 = await fetch(blob1).then((r) => r.blob())
		// }

		// if (data?.review_img2?.length > 0) {
		// 	const compressedImg2 = await resizeFile(data?.review_img2[0])
		// 	const blob2 = await getBlobImg(compressedImg2)
		// 	blobImg2 = await fetch(blob2).then((r) => r.blob())
		// }

		// if (data?.review_img3?.length > 0) {
		// 	const compressedImg3 = await resizeFile(data?.review_img3[0])
		// 	const blob3 = await getBlobImg(compressedImg3)
		// 	blobImg3 = await fetch(blob3).then((r) => r.blob())
		// }

		// if (data?.review_img4?.length > 0) {
		// 	const compressedImg4 = await resizeFile(data?.review_img4[0])
		// 	const blob4 = await getBlobImg(compressedImg4)
		// 	blobImg4 = await fetch(blob4).then((r) => r.blob())
		// }

		// if (data?.review_img5?.length > 0) {
		// 	const compressedImg5 = await resizeFile(data?.review_img5[0])
		// 	const blob5 = await getBlobImg(compressedImg5)
		// 	blobImg5 = await fetch(blob5).then((r) => r.blob())
		// }
		const blobImg1 = await compressedImg(data?.review_img1)
		const blobImg2 = await compressedImg(data?.review_img2)
		const blobImg3 = await compressedImg(data?.review_img3)
		const blobImg4 = await compressedImg(data?.review_img4)
		const blobImg5 = await compressedImg(data?.review_img5)

		let formData = new FormData()
		formData.append('service_id', serviceId)
		loginUser?.id === undefined && formData.append('name', data?.name)
		formData.append('email', loginUser?.id === undefined ? data?.email : loginUser?.email)
		formData.append('comments', data?.review)
		formData.append('rating', data?.rating)
		formData.append('images[0]', blobImg1, data?.review_img1[0]?.name)
		data?.review_img2?.length > 0 && formData.append('images[1]', blobImg2, data?.review_img2[0]?.name)
		data?.review_img3?.length > 0 && formData.append('images[2]', blobImg3, data?.review_img3[0]?.name)
		data?.review_img4?.length > 0 && formData.append('images[3]', blobImg4, data?.review_img4[0]?.name)
		data?.review_img5?.length > 0 && formData.append('images[4]', blobImg5, data?.review_img5[0]?.name)
		data?.review_video?.length > 0 && formData.append('video', data?.review_video[0], data?.review_video[0]?.name)

		const res = await axios.post(`${baseApiUrl}/save-review`, formData)
		console.log('res from review', res)
		if (res?.data?.success) {
			const userData = {
				customer_id: loginUser?.id,
				product_id: serviceId,
				url: 'reviews'
			}
			const coinsRes = await axios.post(`${baseApiUrl}/save-user-coins`, userData)
			console.log('res from coins', coinsRes)
			coinsRes?.data?.success && coinsAnim(coinsRes?.data?.coins, coinsRes?.data?.coins + Number(coinsRes?.data?.new_coins))
		}
		setresMsg(res.data?.messgae)
		setformSuccess(res?.data?.success ? true : false)
		setloading(false)
		setbtndisabled(false)
		setformSubmit(true)
		if (res?.data?.success) {
			reset()
			setreviewImage1('Select an image')
			setreviewImage2('Select an image')
			setreviewImage3('Select an image')
			setreviewImage4('Select an image')
			setreviewImage5('Select an image')
			setreviewVideo('Select a video')
		}
		setTimeout(
			() => {
				setformSubmit(false)
				modal && setmodal(false)
			},
			!modal ? 3000 : 2500
		)
	}
	// }

	useEffect(() => {
		!modal && reset()
	}, [modal])

	return (
		<div className={`${styles.form_container} gray-border`}>
			<div className={`${styles.title} primary-color`}>Submit Your Review</div>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
				{/* Adding photos */}
				<div className={styles.fields_wrapper}>
					<div className={`${styles.image_feilds_wrapper} ${className}`}>
						<div className={styles.inner_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='review_img1'>
									Upload Image <span>*</span>
								</label>
								{(getValues('review_img1')?.length === 0 || reviewImage1 === 'Select an image') && showRequired && errors.review_img1?.type === 'required' && (
									<div className={`${styles.error_msg} ${styles.msg_error_msg}`} role='alert'>
										required
									</div>
								)}
								{errors.review_img1?.message && (
									<div className={styles.error_msg} role='alert'>
										{errors.review_img1?.message}
									</div>
								)}
							</div>
							<div
								className={`${styles.image_input} ${showRequired && errors.review_img1 && (reviewImage1 === 'Select an image' || getValues('review_img1')?.length === 0 || errors.review_img1?.message === 'Only .png, .jpg etc files are allowed.') ? 'input-error' : undefined}`}
								tabIndex={0}
								ref={imageRef}
							>
								<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
									<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
								</svg>

								<span>{reviewImage1}</span>

								<input
									{...register('review_img1', {
										required: true,
										validate: (val) => imgValidate(val),
										onChange: (e) => (setreviewImage1(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an image'), setshowRequired(true))
									})}
									className={styles.image_input}
									onClick={() => errors?.review_img1?.type !== 'required' && setshowRequired(false)}
									accept='image/png, image/jpeg, image/jpg, image/webp'
									tabIndex={-1}
									type='file'
									placeholder='png, jpg or webp etc files only with the dimensions of 1440 × 360'
								/>
								<div
									className='delete_icons'
									onClick={() => (
										setreviewImage1('Select an image'),
										setshowRequired(true),
										setValue('review_img1', ''),
										setTimeout(() => {
											setError('review_img1', { type: 'required', message: '' })
										}, 100)
									)}
								>
									{reviewImage1 !== 'Select an image' && (
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
											/>
										</svg>
									)}
								</div>
							</div>
						</div>
						<div className={styles.inner_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='review_img2'>Upload Image</label>
								{errors.review_img2?.message && (
									<div className={styles.error_msg} role='alert'>
										{errors.review_img2?.message}
									</div>
								)}
							</div>
							<div className={`${styles.image_input} ${errors.review_img2 ? 'input-error' : undefined}`} tabIndex={0}>
								<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
									<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
								</svg>

								<span>{reviewImage2}</span>

								<input
									{...register('review_img2', {
										required: false,
										validate: (val) => imgValidate(val),
										onChange: (e) => setreviewImage2(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an image')
									})}
									className={styles.image_input}
									accept='image/png, image/jpeg, image/jpg, image/webp'
									tabIndex={-1}
									type='file'
									placeholder='png, jpg or webp etc files only with the dimensions of 1440 × 360'
								/>
								<div className='delete_icons' onClick={() => (setreviewImage2('Select an image'), setValue('review_img2', ''), clearErrors('review_img2'))}>
									{reviewImage2 !== 'Select an image' && (
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
											/>
										</svg>
									)}
								</div>
							</div>
						</div>
						<div className={styles.inner_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='review_img3'>Upload Image</label>
								{errors.review_img3?.message && (
									<div className={styles.error_msg} role='alert'>
										{errors.review_img3?.message}
									</div>
								)}
							</div>
							<div className={`${styles.image_input} ${errors.review_img3 ? 'input-error' : undefined}`} tabIndex={0}>
								<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
									<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
								</svg>

								<span>{reviewImage3}</span>

								<input
									{...register('review_img3', {
										required: false,
										validate: (val) => imgValidate(val),
										onChange: (e) => setreviewImage3(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an image')
									})}
									className={styles.image_input}
									accept='image/png, image/jpeg, image/jpg, image/webp'
									tabIndex={-1}
									type='file'
									placeholder='png, jpg or webp etc files only with the dimensions of 1440 × 360'
								/>
								<div className='delete_icons' onClick={() => (setreviewImage3('Select an image'), setValue('review_img3', ''), clearErrors('review_img3'))}>
									{reviewImage3 !== 'Select an image' && (
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
											/>
										</svg>
									)}
								</div>
							</div>
						</div>
						<div className={styles.inner_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='review_img4'>Upload Image</label>
								{errors.review_img4?.message && (
									<div className={styles.error_msg} role='alert'>
										{errors.review_img4?.message}
									</div>
								)}
							</div>
							<div className={`${styles.image_input} ${errors.review_img4 ? 'input-error' : undefined}`} tabIndex={0}>
								<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
									<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
								</svg>

								<span>{reviewImage4}</span>

								<input
									{...register('review_img4', {
										required: false,
										validate: (val) => imgValidate(val),
										onChange: (e) => setreviewImage4(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an image')
									})}
									tabIndex={-1}
									className={styles.image_input}
									accept='image/png, image/jpeg, image/jpg, image/webp'
									type='file'
									placeholder='png, jpg or webp etc files only with the dimensions of 1440 × 360'
								/>
								<div className='delete_icons' onClick={() => (setreviewImage4('Select an image'), setValue('review_img4', ''), clearErrors('review_img4'))}>
									{reviewImage4 !== 'Select an image' && (
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
											/>
										</svg>
									)}
								</div>
							</div>
						</div>
						<div className={styles.inner_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='review_img5'>Upload Image</label>
								{errors.review_img5?.message && (
									<div className={styles.error_msg} role='alert'>
										{errors.review_img5?.message}
									</div>
								)}
							</div>
							<div className={`${styles.image_input} ${errors.review_img5 ? 'input-error' : undefined}`} tabIndex={0}>
								<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
									<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
								</svg>

								<span>{reviewImage5}</span>

								<input
									{...register('review_img5', {
										required: false,
										validate: (val) => imgValidate(val),
										onChange: (e) => {
											setreviewImage5(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an image')
										}
									})}
									className={styles.image_input}
									accept='image/png, image/jpeg, image/jpg, image/webp'
									tabIndex={-1}
									type='file'
									placeholder='png, jpg or webp etc files only with the dimensions of 1440 × 360'
								/>
								<div className='delete_icons' onClick={() => (setreviewImage5('Select an image'), setValue('review_img5', ''), clearErrors('review_img5'))}>
									{reviewImage5 !== 'Select an image' && (
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
											/>
										</svg>
									)}
								</div>
							</div>
						</div>
						<div className={styles.inner_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='review_video'>Upload Video(optional)</label>
								{errors.review_video?.message && (
									<div className={styles.error_msg} role='alert'>
										{errors.review_video?.message}
									</div>
								)}
							</div>
							<div className={`${styles.image_input} ${errors.review_video ? 'input-error' : undefined}`} tabIndex={0}>
								<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
									<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
								</svg>

								<span>{reviewVideo}</span>

								<input
									{...register('review_video', {
										required: false,
										validate: (val) => videoValidate(val),
										onChange: (e) => setreviewVideo(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an video')
									})}
									className={styles.image_input}
									accept='video/mp4, .mkv, video/webm'
									type='file'
									placeholder='mp4, mkv or webm files only'
								/>
								<div className='delete_icons' onClick={() => (setreviewVideo('Select a video'), setValue('review_video', ''), clearErrors('review_video'))}>
									{reviewVideo !== 'Select a video' && (
										<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
											/>
										</svg>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* {loginUser?.id === undefined && (
					<div className={styles.session_wrapper}>
						<div className={styles.fields_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='name'>
									Name <span>*</span>
								</label>
								{errors.name?.type === 'required' && (
									<div className={styles.error_msg} role='alert'>
										required
									</div>
								)}
								{errors.name?.message && (
									<div className={styles.error_msg} role='alert'>
										{errors.name?.message}
									</div>
								)}
							</div>

							<input
								{...register('name', {
									required: true,
									minLength: { value: 2, message: 'Min 2 characters' },
									maxLength: { value: 40, message: 'Max 40 characters' },
									pattern: {
										value: /^[\s]*[A-Za-z]+[A-Za-z\s]*$/,
										message: 'Enter valid name'
									}
								})}
								aria-invalid={errors.name ? 'true' : 'false'}
								className={`${styles.input} ${errors.name ? 'input-error' : undefined}`}
								minLength='2'
								maxLength='40'
								type='text'
								placeholder='Name'
							/>
						</div>

						<div className={styles.fields_wrapper}>
							<div className={styles.inner_wrapper}>
								<label htmlFor='email'>
									Email <span>*</span>
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
								{...register('email', {
									required: true,
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
										message: 'Enter valid email'
									}
								})}
								aria-invalid={errors.email ? 'true' : 'false'}
								className={`${styles.input} ${errors.email ? 'input-error' : undefined}`}
								type='email'
								placeholder='Email'
							/>
						</div>
					</div>
				)} */}
				{/* message */}
				<div className={`${styles.fields_wrapper} ${loginUser?.id === undefined ? styles.msg_wrapper : undefined}`}>
					<div className={styles.inner_wrapper}>
						<label htmlFor='review'>
							Your Review <span>*</span>
						</label>
						{errors.review?.type === 'required' && (
							<div className={`${styles.error_msg} ${styles.msg_error_msg}`} role='alert'>
								required
							</div>
						)}
						{errors.review?.message && (
							<div className={styles.error_msg} role='alert'>
								{errors.review?.message}
							</div>
						)}
					</div>

					<textarea
						{...register('review', {
							required: true,
							minLength: { value: 2, message: 'Min 2 characters' },
							pattern: { value: /.*\S.*/, message: 'Enter something' }
						})}
						aria-invalid={errors.review ? 'true' : 'false'}
						className={`${styles.textarea} ${errors.review ? 'input-error' : undefined} transition`}
						min={2}
						placeholder='Write your review'
					/>
				</div>

				{/* rating */}
				<div className={`${styles.fields_wrapper} ${styles.rating_wrapper}`}>
					<div className={`${styles.inner_wrapper}`}>
						<div id='rating_label' className='gray-color'>
							Your rating of this product <span>*</span>
						</div>
						{errors.rating && <div className={styles.error_msg}>required</div>}
					</div>
					<div className={styles.rating}>
						<Controller
							control={control}
							name='rating'
							rules={{
								validate: (rating) => rating > 0
							}}
							render={({ field: { onChange, onBlur, value } }) => <Rating className='custom-classname' spaceBetween='small' style={{ maxWidth: 170 }} value={value} isRequired onChange={onChange} visibleLabelId='rating_label' onBlur={onBlur} />}
						/>
					</div>
				</div>

				{formSubmit && <Message resMsg={resMsg} formSuccess={formSuccess} />}
				{loginUser?.id !== undefined ? (
					<button disabled={btndisabled} type='submit' className={`${styles.btn} primary-btn`}>
						Submit Review
						{loading && <LiteLoader className={styles.submit_loader} />}
					</button>
				) : (
					<Link href={'/auth/signin'}>
						<a>
							<button className={`${styles.btn} primary-btn`}>Sign in to Submit Review</button>
						</a>
					</Link>
				)}
			</form>
		</div>
	)
}

export default Submit

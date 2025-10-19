import axios from 'axios'
import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { baseApiUrl } from '../../../../utils/config'
import { LiteLoader } from '../../../Loader/Loader'
import styles from './ProfileImgUpload.module.css'
import Message from '../../../UI/Message/Message'
import { unlockScroll } from '../../../../utils/scrollLock'
import AvatarEditor from 'react-avatar-editor'

const ProfileImgUpload = ({ data, setmodal, loginUser }) => {
	const [btndisabled, setbtndisabled] = useState(false)
	const [loading, setloading] = useState(false)
	const [resMsg, setresMsg] = useState('')
	const [formSuccess, setformSuccess] = useState(false)
	const [formSubmit, setformSubmit] = useState(false)
	const [profileImageCaption, setprofileImageCaption] = useState('Select an image')
	const [image, setImage] = useState('')
	const [zoom, setZoom] = useState('1.2')
	const imageRef = useRef()

	const {
		register,
		setError,
		formState: { errors },
		handleSubmit,
		reset,
		setValue
	} = useForm()

	const onChangeFile = (file) => {
		setImage(file[0])
	}

	const imgValidate = (val) => {
		const imageMaxSize = 1024 * 1024
		const imageSize = val[0]?.size / imageMaxSize
		if (val[0]?.type !== 'image/png' && val[0]?.type !== 'image/jpg' && val[0]?.type !== 'image/jpeg' && val[0]?.type !== 'image/jfif' && val[0]?.type !== 'image/pjpeg' && val[0]?.type !== 'image/pjp' && val[0]?.type !== 'image/webp') {
			return 'Only .png, .jpg, .webp etc files are allowed.'
		} else if (imageSize > 1) {
			return 'Only 1MB file is allowed'
		} else return true
	}

	const onSubmit = async (inputdata) => {
		setformSubmit(false)

		setbtndisabled(true)
		setloading(true)
		const canvas = await imageRef.current.getImage().toDataURL('image/jpeg')

		let formData = new FormData()
		formData.append('vet_dvm_profile_image', canvas)
		formData.append('email', loginUser?.email)
		formData.append('base_64', true)

		const res = await axios.post(`${baseApiUrl}/user/upload-profile-picture`, formData)

		setresMsg(res?.data?.message)
		setformSuccess(() => (res?.data?.success === true ? true : false))
		setloading(false)
		setbtndisabled(false)
		res?.data?.success &&
			(setmodal(false),
			unlockScroll(),
			reset(),
			setTimeout(() => {
				setImage(null), setprofileImageCaption('Select an image')
			}, 300))
		await data()
		!res?.data?.success && (setformSubmit(false), setformSubmit(true))
	}

	return (
		<div className={styles.upload_container}>
			<div className={styles.image_container}>
				<AvatarEditor style={{ cursor: image ? 'grab' : 'auto' }} ref={imageRef} image={image} border={50} color={!image ? [196, 109, 225, 0.2] : [0, 0, 0, 0.5]} scale={+zoom} rotate={0} borderRadius={100} />
				{image ? (
					<input onChange={(event) => setZoom(event.target.value)} type='range' min='1' max='3' step='.1' className={styles.range_input} value={zoom} />
				) : (
					<div className={styles.no_image}>
						<span>Preview your image here</span>
					</div>
				)}
			</div>
			<form className={styles.upload_wrapper} onSubmit={handleSubmit(onSubmit)}>
				{formSubmit && <Message resMsg={resMsg} formSuccess={formSuccess} />}
				<div className={styles.wrapper}>
					<div className={styles.inner_wrapper}>
						<label htmlFor='profile_img'>
							Upload your profile image <span className='red-color'>*</span>
						</label>
						{errors.profile_img?.type === 'required' && (
							<div className={`${styles.error_msg} ${!errors.profile_img?.type === 'required' ? styles.not_visible_error : undefined}`} role='alert'>
								required
							</div>
						)}

						{errors.profile_img && (
							<div className={`${styles.error_msg} ${errors.profile_img.message === '' ? styles.not_visible_error : undefined}`} role='alert'>
								{errors.profile_img?.message}
							</div>
						)}
					</div>

					<div className={`${styles.image_input} ${errors.profile_img ? 'check-box-error' : undefined}`} tabIndex={0}>
						<svg fill='var(--primary)' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
							<path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
						</svg>

						<span className='gray-color'>{profileImageCaption}</span>
						<input
							{...register('profile_img', {
								required: true,
								validate: (val) => imgValidate(val),
								onChange: (e) => (setprofileImageCaption(e.target.files[0]?.name ? (e.target.files[0].name?.length > 25 ? e.target.files[0].name?.substring(0, 25) + '...' + e.target.files[0].type?.substring(6) : e.target.files[0].name) : 'Select an image'), onChangeFile(e.target.files))
							})}
							tabIndex={-1}
							className={`${styles.image_input}`}
							accept='image/png, image/jpeg, image/jpg, image/webp'
							type='file'
							placeholder='png, jpg or webp etc files only with the dimensions of 1440 × 360'
						/>
						<div className={`delete_icons ${styles.delete_margin}`} onClick={() => (setprofileImageCaption('Select an image'), setValue('profile_img', ''), setError('profile_img', { type: 'required', message: '' }), setImage(null))}>
							{profileImageCaption !== 'Select an image' && (
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

				<button disabled={btndisabled} type='submit' className={`${styles.btn} primary-btn`}>
					Upload
					{loading && <LiteLoader className={styles.submit_loader} />}
				</button>
			</form>
		</div>
	)
}

export default ProfileImgUpload

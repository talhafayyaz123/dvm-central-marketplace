import axios from 'axios'
import React, { useState } from 'react'
import { baseApiUrl } from '../../../../../../utils/config'
import { LiteLoader } from '../../../../../Loader/Loader'
import styles from './RegisteredOnOtherPlatform.module.css'
import { unlockScroll } from '../../../../../../utils/scrollLock'

const RegisteredOnOtherPlatform = ({ modalData, setmodal, setformSuccess, setformSubmit, registeredOnOtherPlatformEmail, setresMsg }) => {
	const [allowLoading, setallowLoading] = useState(false)
	const [allowBtnDisabled, setallowBtnDisabled] = useState(false)

	const allowSignInHandler = async () => {
		setallowLoading(true)
		setallowBtnDisabled(true)
		const res = await axios.get(`${baseApiUrl}/allow-login/${registeredOnOtherPlatformEmail}/dvm_central`)
		setformSuccess(true)
		setformSubmit(true)
		setallowLoading(false)
		setallowBtnDisabled(false)
		setresMsg(res?.data?.error)
		setmodal(false)
		unlockScroll()
	}
	return (
		<div className={`${styles.allow_container}`}>
			<div className={`${styles.error}`}>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--red)' className='w-6 h-6'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' />
				</svg>

				{modalData}
			</div>
			<div className={styles.allow_wrapper}>
				<button disabled={allowBtnDisabled} type='button' className='primary-btn white-color sml-btn' onClick={() => allowSignInHandler()}>
					Yes {allowLoading && <LiteLoader className={styles.allow_loader} loaderType='sml' />}
				</button>
				<button type='button' className='sml-btn' onClick={() => (setmodal(false), unlockScroll())}>
					No
				</button>
			</div>
		</div>
	)
}

export default RegisteredOnOtherPlatform

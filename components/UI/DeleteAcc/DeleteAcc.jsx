import axios from 'axios'
import React, { useState } from 'react'
import styles from './DeleteAcc.module.css'
import { DarkLoader } from '../../Loader/Loader'
import { baseApiUrl } from '../../../utils/config'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { unlockScroll } from '../../../utils/scrollLock'
import Cookies from 'js-cookie'

const DeleteAcc = ({ setmodal, setmodalAlertType, setresMsgforPopup, setshowresMsg, setpopupSuccess, loginUser, setloginUser }) => {
	const router = useRouter()
	const [loading, setloading] = useState(false)
	const [disableBtn, setdisableBtn] = useState(false)

	const Modal = () => {
		setmodal(false)
		unlockScroll()
		setTimeout(() => {
			setmodalAlertType(null)
		}, 500)
	}

	const onDelete = async () => {
		setloading(true)
		setdisableBtn(true)

		const res = await axios.get(`${baseApiUrl}/delete-user-account/${loginUser?.id}`)
		console.log('data', res)
		setshowresMsg(true)
		setpopupSuccess(res?.data?.success ? true : false)

		setresMsgforPopup(() => res?.data?.message)
		if (res?.data?.success) {
			setTimeout(() => {
				setloading(false)
				setshowresMsg(false)
				signOut({ redirect: false })
				setloginUser({})
				Cookies.remove('impersonateUserId')
				Cookies.remove('dvm_cen_tral_user_id')
				router?.push('/')
				setmodal(false)
			}, 2000)

			setdisableBtn(false)
		}
	}

	return (
		<div className={styles.main_wrapper}>
			<div className={`${styles.delete_wrapper} inner-sec-p`}>
				<div className={styles.inner_wrapper}>
					<h4 className='red-color'>Are you sure, you want to delete your account?</h4>
					<p>You can recover your account within 60 days by contacting on info@dvmcentral.com.</p>
				</div>
				<div className={styles.inner_wrapper}>
					<div className={styles.btn_wrapper}>
						<button disabled={disableBtn} className={`btn ${loading && styles.loader_btn}`} onClick={() => onDelete()}>
							<span>Yes</span>
							{loading && (
								<DarkLoader
									alertType='delete'
									//   loaderType="sml"
									className={styles.red_loader}
								/>
							)}{' '}
						</button>
						<button className={`btn ${styles.no_btn}`} onClick={() => Modal()}>
							No
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DeleteAcc

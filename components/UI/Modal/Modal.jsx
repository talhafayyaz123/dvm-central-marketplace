import React, { useRef } from 'react'
import { elUnlockScroll, unlockScroll } from '../../../utils/scrollLock'
import styles from './Modal.module.css'

const Modal = ({ modal, setmodal, className = '', registerType, children, modalType, pageType, setformsubmit, displayType, mobSearchSidebar, alertType, setcheckingUserData, setmodalAlertType, modalAlertType, setshowCounter }) => {
	const wrapperRef = useRef(null)
	const modalRef = useRef(null)
	// close modal if clicked elsewhere
	// if (typeof window !== 'undefined') {
	//    document.body.addEventListener('mousedown', (e) => {
	//       e.stopPropagation()
	//       if (modal) {
	//          if (!wrapperRef?.current?.contains(e.target)) {
	//             setmodal(false)
	//             unlockScroll()
	//             elUnlockScroll(mobSearchSidebar)
	//          }
	//       } else return
	//    })
	// }

	//    document.body.addEventListener('keydown', (e) => {
	//       if (modal) {
	//          if (e.key === 'Escape') {
	//             if (!wrapperRef?.current?.contains(e.target)) {
	//                setmodal(false)
	//             }
	//          } else return
	//       }
	//    })
	// }

	const modalCloseHandler = () => {
		wrapperRef.current.classList.remove(displayType === 'sidebar' ? styles.show_sidebar : styles.show_modal_wrapper)

		pageType === 'home' && setshowCounter(true)
		if (displayType !== 'sidebar') {
			modalType === 'deals-form' && setformsubmit(false)
			setTimeout(() => {
				setmodal(false)
				unlockScroll()
				;(modalType === 'expo-register' || modalType === 'expo-form') && setcheckingUserData(true)
			}, 300)
		} else {
			modalType === 'deals-form' && setformsubmit(false)
			setTimeout(() => {
				setmodal(false)
				unlockScroll()
				elUnlockScroll(mobSearchSidebar)
			}, 300)
		}
		setTimeout(() => {
			modalAlertType === 'delete-account' && setmodalAlertType(null)
		}, 500)
	}

	return (
		<div ref={modalRef} className={`${styles.modal_container} modal-container modal-bg transition ${modal ? 'show-bd' : 'hide-bd'} ${displayType === 'sidebar' && styles.sidebar} ${modalType === 'video' && styles.stack_modal}`}>
			<div
				ref={wrapperRef}
				className={`${styles.inner_wrapper} ${modalType === 'course' ? styles.modal_size : undefined} ${displayType === 'card-modal' ? styles.card_inner_wrapper : undefined} ${modalType === 'crop' ? styles.crop_modal : undefined} ${registerType === 'ListingPage' ? className : undefined} ${
					displayType === 'sidebar' ? styles.sidebar_wrapper : undefined
				} ${modal && (displayType === 'sidebar' ? styles.show_sidebar : styles.show_modal_wrapper)}  ${modalType !== 'video' && 'white-bg'} ${displayType !== 'sidebar' ? 'radius' : undefined} transition ${modalType == 'review' ? styles.review_modal : undefined} ${
					modalType === 'expo-register' || modalType === 'expo-form' ? styles.webinar_form : undefined
				} modal-wrapper`}
				style={{ opacity: displayType === 'sidbar' ? 1 : undefined }}
			>
				{/* modal close btn */}
				{alertType !== 'address' &&
					alertType !== 'grand-total' &&
					modalType !== 'expo-quiz' &&
					// modalType !== 'address-missing' &&
					(modal && displayType !== 'sidebar' ? (
						<div className={`${styles.modal_cls_wrapper} black-bg full-radius transition `} onClick={() => modalCloseHandler()}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='var(--white)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M4.5 19.5l15-15m-15 0l15 15' />
							</svg>
						</div>
					) : (
						<div className={`${styles.modal_cls_wrapper} black-bg full-radius transition `} onClick={() => modalCloseHandler()}>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--white)'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
							</svg>
						</div>
					))}
				{modalType !== 'video' && modalType !== 'product' && modalType !== 'expo-register' && modalType !== 'reviews' && modalType !== 'meeting' && <div className={`${styles.gradient} ${modalType === 'curvey_form' ? styles.survey_modal : undefined} radius`} />}
				<div
					className={`${styles.modal_wrapper} ${modalType === 'course' ? styles.modal_max : undefined} ${displayType === 'card-modal' ? styles.card_wrapper : undefined} ${modalType === 'crop' ? styles.crop_wrapper : undefined} ${registerType !== 'ListingPage' ? className : undefined}  ${
						pageType === 'address-listing' && styles.form_wrapper
					} transition `}
				>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Modal

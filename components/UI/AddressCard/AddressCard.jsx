import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseApiUrl } from '../../../utils/config'
import { DarkLoader } from '../../Loader/Loader'
import AddressForm from '../AddressForm/AddressForm'
import Modal from '../Modal/Modal'
import styles from './AddressCard.module.css'
import { unlockScroll } from '../../../utils/scrollLock'
import { phoneFormat } from '../../../utils/phoneFormat'

const AddressCard = ({ data, index, setinitialData }) => {
	const { id, first_name, last_name, company, address1, address2, city, country_name, state_name, zip, phone, default_shipping } = data

	const [addressAdding, setaddressAdding] = useState(false)
	const [addressDeleting, setaddressDeleting] = useState(false)

	const [addingIndex, setaddingIndex] = useState(null)
	const [deletingIndex, setdeletingIndex] = useState(null)

	const [modal, setmodal] = useState(false)
	const [formSubmit, setformSubmit] = useState(false)

	// set default address handler
	const activeAddressHanlder = async (id, index) => {
		setaddressAdding(true)
		setaddingIndex(index)
		const res = await axios.get(`${baseApiUrl}/set-default-address/${id}`)

		res?.data?.success && setinitialData(res?.data?.delivery_addresses)
		setaddingIndex(null)
		setaddressAdding(false)
	}

	// delete address handler
	const addressDeleteHandler = async (id, index) => {
		setaddressDeleting(true)
		setdeletingIndex(index)
		const res = await axios.delete(`${baseApiUrl}/user/address/${id}`)

		res?.data?.success && setinitialData(res?.data?.delivery_addresses)
		setdeletingIndex(null)
		setaddressDeleting(false)
	}

	return (
		<>
			<Modal modal={modal} setmodal={setmodal} pageType='address-listing'>
				{modal && <AddressForm userData={data} setinitialData={setinitialData} formType='edit-address' setmodal={setmodal} setformSubmit={setformSubmit} formSubmit={formSubmit} pageType='address-listing' />}
			</Modal>

			<div className={`${styles.address_card} radius shadow`}>
				{default_shipping === 'Y' ? (
					<button className={`${styles.dflt_addr_btn} sml-btn`}>
						Default Address
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='var(--green)'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
						</svg>
					</button>
				) : (
					<div className={styles.delete_btn_wrapper}>
						<button className='sml-btn gray-border black-color' onClick={() => activeAddressHanlder(id, index)}>
							Set as Default Address {addressAdding && addingIndex === index && <DarkLoader className={styles.loader} loaderType='sml' />}
						</button>
						<div>
							{addressDeleting && deletingIndex === index ? (
								<DarkLoader className={styles.loader} loaderType='sml' />
							) : (
								<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='var(--red)' onClick={() => addressDeleteHandler(id, index)}>
									<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
								</svg>
							)}
						</div>
					</div>
				)}
				{(first_name || last_name) && (
					<div className={styles.wrapper}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
							<path fillRule='evenodd' d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z' clipRule='evenodd' />
						</svg>
						<span className='semibold-text'>Name:</span> {first_name} {last_name}
					</div>
				)}

				{company && (
					<div className={styles.wrapper}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
							<path
								fillRule='evenodd'
								d='M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z'
								clipRule='evenodd'
							/>
						</svg>
						<span className='semibold-text'>Company:</span> {company}
					</div>
				)}

				{(address1 || city || state_name || zip) && (
					<div className={styles.wrapper} style={{ alignItems: 'flex-start' }}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
							<path d='M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z' />
							<path d='m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z' />
						</svg>
						<span className='semibold-text' style={{ marginTop: '2px' }}>
							Address:
						</span>{' '}
						{address1}, {city}, {state_name}, {zip}
					</div>
				)}

				{/* <div className={styles.wrapper}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
						<path
							fillRule='evenodd'
							d='m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
							clipRule='evenodd'
						/>
					</svg>
					<span className='semibold-text'>City:</span> {city}
				</div>

				<div className={styles.wrapper}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
						<path
							fillRule='evenodd'
							d='M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z'
							clipRule='evenodd'
						/>
					</svg>
					<span className='semibold-text'>State:</span> {state_name}
				</div>
				<div className={styles.wrapper}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
						<path
							fillRule='evenodd'
							d='M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z'
							clipRule='evenodd'
						/>
					</svg>
					<span className='semibold-text'>Country:</span> {country_name}
				</div> */}

				{/* <div className={styles.wrapper}>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
						<path d='M6 3a3 3 0 0 0-3 3v1.5a.75.75 0 0 0 1.5 0V6A1.5 1.5 0 0 1 6 4.5h1.5a.75.75 0 0 0 0-1.5H6ZM16.5 3a.75.75 0 0 0 0 1.5H18A1.5 1.5 0 0 1 19.5 6v1.5a.75.75 0 0 0 1.5 0V6a3 3 0 0 0-3-3h-1.5ZM12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM4.5 16.5a.75.75 0 0 0-1.5 0V18a3 3 0 0 0 3 3h1.5a.75.75 0 0 0 0-1.5H6A1.5 1.5 0 0 1 4.5 18v-1.5ZM21 16.5a.75.75 0 0 0-1.5 0V18a1.5 1.5 0 0 1-1.5 1.5h-1.5a.75.75 0 0 0 0 1.5H18a3 3 0 0 0 3-3v-1.5Z' />
					</svg>
					<span className='semibold-text'>Zipcode:</span> {zip}
				</div> */}

				{phone && (
					<div className={styles.wrapper}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='var(--primary)'>
							<path
								fillRule='evenodd'
								d='M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z'
								clipRule='evenodd'
							/>
						</svg>
						<span className='semibold-text'>Phone:</span> {phoneFormat(phone)}
					</div>
				)}
				<div className={styles.icon_wrapper}>
					<div className='red-color'>
						<button className={`${styles.edit_btn} sml-btn primary-btn primary-color`} onClick={() => (setmodal(true), unlockScroll())}>
							Edit{' '}
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125' />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default AddressCard

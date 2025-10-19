import React, { useContext, useEffect, useState } from 'react'
import ListingLayout from '../../../UI/ListingLayout/ListingLayout'
import LeftCol from '../../../UI/ListingLayout/LeftCol/LeftCol'
import RightCol from '../../../UI/ListingLayout/RigthCol/RightCol'
import styles from './ServiceProviderDetail.module.css'
import LefColContent from './LefColContent/LefColContent'
import { baseApiUrl, imgApiUrl } from '../../../../utils/config'
import Modal from '../../../UI/Modal/Modal'
import DealsForm from './LefColContent/DealsForm/DealsForm'
import { lockScroll } from '../../../../utils/scrollLock'
import ImgWithLoader from '../../../UI/ImgWithLoader/ImgWithLoader'
import headerBg from '/public/imgs/banner.jpg'
import axios from 'axios'
import coinsAnim from '../../../../utils/coinsAnim'
import { GlobalProvider } from '../../../../context/AppProvider'

const SserviceProviderDetail = ({ result }) => {
	const [modal, setmodal] = useState(false)
	const [formsubmit, setformsubmit] = useState(false)

	const { loginUser, userData } = useContext(GlobalProvider)

	const spforDealsFormData = {
		sp_Id: result?.serviceProviderDetail?.id,
		sp_email: result?.serviceProviderDetail?.email
	}

	const getUserCoins = async () => {
		const userData = {
			customer_id: loginUser?.id,
			url: 'service-providers',
			vendor_id: result?.serviceProviderDetail?.id
		}
		const res = await axios.post(`${baseApiUrl}/save-user-coins`, userData)
		console.log('res from coins', res)
		res?.data?.success && coinsAnim(res?.data?.coins, res?.data?.coins + Number(res?.data?.new_coins))
	}

	useEffect(() => {
		if (loginUser?.id !== undefined && userData?.position !== undefined && userData?.position !== 'Sales Rep') {
			setTimeout(() => getUserCoins(), 1000)
		}
	}, [loginUser, userData?.position])

	return (
		<>
			<Modal className={styles.modal_wrapper} modal={modal} setmodal={setmodal} setformsubmit={setformsubmit} modalType='deals-form'>
				{modal && <DealsForm setmodal={setmodal} data={spforDealsFormData} formsubmit={formsubmit} setformsubmit={setformsubmit} />}
			</Modal>

			<ImgWithLoader
				unoptimized={result?.serviceProviderDetail?.header_image === null ? true : false}
				className={`${styles.logo_wrapper} ${result?.serviceProviderDetail?.header_image === null ? styles.placeholderImg : undefined}`}
				layout='fill'
				priority
				src={result?.serviceProviderDetail?.header_image !== null ? `${imgApiUrl.vendor.header_banner}/${result?.serviceProviderDetail?.header_image}` : headerBg}
				alt={result?.serviceProviderDetail?.name}
			>
				{result?.serviceProviderDetail?.header_image === null && <h1>{result?.serviceProviderDetail?.name}</h1>}
			</ImgWithLoader>

			<ListingLayout className={styles.layout_wrapper}>
				<LeftCol className={styles.left_col}>
					<LefColContent result={result} />
				</LeftCol>
				<RightCol>
					<div className={`${styles.deals_section_wrapper}`} onClick={() => (setmodal(true), lockScroll())}>
						<div className={styles.deal_wrapper}>
							<svg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>
								<defs>
									<style
										dangerouslySetInnerHTML={{
											__html: '.cls-1,.cls-2{fill:none;stroke:var(--primary);strokeLinejoin:round;strokeWidth:2px;}.cls-1{strokeLinecap:round;}'
										}}
									/>
								</defs>
								<g id='tag'>
									<circle cx='12.9734' cy='29.2732' r='1.0691' />
									<circle cx='56.9734' cy='8.2732' r='1.0691' />
									<circle className='cls-1' cx={11} cy={16} r={2} />
									<line className='cls-1' x1='52.5509' x2='55.5509' y1='19.0547' y2='22.0547' />
									<line className='cls-1' x1='55.5509' x2='52.5509' y1='19.0547' y2='22.0547' />
									<path className='cls-1' d='M31.109,57.2064l.6384,2.1166A2.0746,2.0746,0,0,0,34.3328,60.71l17.09-5.1545A2.0746,2.0746,0,0,0,52.81,52.97L43.6584,22.6266a2.0747,2.0747,0,0,0-1.561-1.4316l-4.1764-.8745' />
									<path className='cls-1' d='M23.0809,19.774l-3,1.6362A2.0748,2.0748,0,0,0,19,23.2316V54.9254A2.0746,2.0746,0,0,0,21.0747,57H38.9253A2.0746,2.0746,0,0,0,41,54.9254V23.2316A2.0748,2.0748,0,0,0,39.9188,21.41l-8.9254-4.8683a2.0743,2.0743,0,0,0-1.9868,0l-2.8848,1.5735' />
									<path className='cls-1' d='M28.1461,19.6413A3,3,0,1,1,27.04,22.4926' />
									<path className='cls-2' d='M36.7476,19.6805A10.1731,10.1731,0,0,0,39,13.25c0-5.376-4.0371-9.75-9-9.75s-9,4.374-9,9.75S25.0371,23,30,23a8.3277,8.3277,0,0,0,2.9547-.5508' />
									<path className='cls-2' d='M31.8608,19.6637A5.3692,5.3692,0,0,1,30,20c-3.3086,0-6-3.0278-6-6.75S26.6914,6.5,30,6.5s6,3.0278,6,6.75a7.129,7.129,0,0,1-1.9457,4.9614' />
									<line className='cls-1' x1={24} x2={34} y1={53} y2={53} />
									<line className='cls-1' x1={24} x2={27} y1={50} y2={50} />
									<line className='cls-1' x1={34} x2={26} y1={31} y2={41} />
									<circle className='cls-1' cx='26.5' cy='32.5' r='1.5' />
									<circle className='cls-1' cx='33.5' cy='39.5' r='1.5' />
								</g>
							</svg>

							<div>
								<h4 className='primary-color'>{result?.serviceProviderDetail?.name} Deal</h4>
								<p className='primary-color'>
									{result?.serviceProviderDetail?.sp_deal} {result?.serviceProviderDetail?.name} plattorm
								</p>
							</div>
						</div>
						<button className='primary-btn white-color'>VIEW DEAL</button>
					</div>
					<div className={`${styles.detail_section_wrapper} radius`}>
						<h4>{result?.serviceProviderDetail?.name} Overview</h4>
						<div
							className={`${styles.detail} gray-color`}
							dangerouslySetInnerHTML={{
								__html: result?.serviceProviderDetail?.sp_short_details
							}}
						/>
					</div>
				</RightCol>
			</ListingLayout>
		</>
	)
}

export default SserviceProviderDetail

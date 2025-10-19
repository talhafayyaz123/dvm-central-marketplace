import React, { useContext, useEffect, useState } from 'react'

import FilterResults from './FilterResults/FilterResults'
import styles from './Jobs.module.css'
import MetaTags from '../../UI/MetaTags/MetaTags'
import HeroBanner from '../../UI/HeroBanner/HeroBanner'
import banner from '/public/imgs/jobs.png'
import mobBanner from '/public/imgs/jobs.png'
import { GlobalProvider } from '../../../context/AppProvider'

import NotAuthorized from '../../UI/NotAuthorized/NotAuthorized'
import { DarkLoader } from '../../Loader/Loader'
import { useSession } from 'next-auth/react'

const Jobs = ({ data }) => {
	const { userData, loginUser } = useContext(GlobalProvider)

	const [loading, setloading] = useState(true)

	const { data: status } = useSession()

	useEffect(() => {
		status !== 'loading' &&
			setTimeout(
				() => {
					;(loginUser?.id === undefined || (loginUser?.id !== undefined && userData.position !== undefined)) && setloading(false)
				},
				loginUser?.id === undefined ? 0 : 1000
			)
	}, [loginUser?.id, userData?.position])

	return (
		<>
			<MetaTags title={data?.meta_title} description={data?.meta_description} keywords={data?.meta_keywords} />

			{loading ? (
				<DarkLoader className={styles.loader} />
			) : loginUser?.id === undefined || (userData?.position === 'Sales Rep' && userData.position !== undefined) ? (
				<>
					<HeroBanner pageType='single_col' title='Join Us' src={banner} mobImgSrc={mobBanner} fullImg={true} />
					<FilterResults filterData={data} loginUser={loginUser} userData={userData} />
				</>
			) : (
				userData?.position !== 'Sales Rep' &&
				userData.position !== undefined && (
					<NotAuthorized heading='You are not authorized to access this page.' btnText={'Request for Position Change'} href={'/contact?pos_req_change'}>
						<p className='gray-color' style={{ textAlign: 'center', marginTop: '1rem' }}>
							To view and apply for jobs, you should have selected the <span className='text-semibold primary-color'>{`"Sales Rep"`}</span> position.
						</p>
						<p className='gray-color' style={{ textAlign: 'center', marginTop: '0.5rem' }}>
							Click below button to request to change your position.
						</p>

						<p className='red-color' style={{ textAlign: 'center', marginTop: '1rem' }}>
							Note: Users with <span className='text-semibold primary-color'>{`"Sales Rep"`}</span> position cannot buy any product on our platform.
						</p>
					</NotAuthorized>
				)
			)}
		</>
	)
}

export default Jobs

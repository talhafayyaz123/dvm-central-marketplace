import React, { useContext, useEffect, useState } from 'react'
import JobOverview from './JobOverview/JobOverview'
import JobDetailInfo from './JobDetailInfo/JobDetailInfo'
import MetaTags from '../../../UI/MetaTags/MetaTags'
import ListingLayout from '../../../UI/ListingLayout/ListingLayout'
import LeftCol from '../../../UI/ListingLayout/LeftCol/LeftCol'
import RightCol from '../../../UI/ListingLayout/RigthCol/RightCol'
import styles from './JobDetail.module.css'
import HeroBanner from '../../../UI/HeroBanner/HeroBanner'
import banner from '/public/imgs/jobs.png'
import mobBanner from '/public/imgs/jobs.png'
import { GlobalProvider } from '../../../../context/AppProvider'
import NotAuthorized from '../../../UI/NotAuthorized/NotAuthorized'
import { DarkLoader } from '../../../Loader/Loader'
import { useSession } from 'next-auth/react'

const JobDetail = ({ data }) => {
	const { loginUser, userData } = useContext(GlobalProvider)
	const [loading, setloading] = useState(true)
	const { data: status } = useSession()

	useEffect(() => {
		status !== 'loading' &&
			setTimeout(() => {
				;(loginUser?.id === undefined || (loginUser?.id !== undefined && userData.position !== undefined)) && setloading(false)
			}, 1000)
	}, [loginUser?.id, userData?.position])

	return (
		<>
			<MetaTags title={data?.job_detail?.meta_title} description={data?.job_detail?.meta_description} keywords={data?.job_detail?.meta_keywords} />

			{loading ? (
				<DarkLoader className={styles.loader} />
			) : loginUser?.id === undefined || (userData?.position !== undefined && userData?.position === 'Sales Rep') ? (
				<>
					<HeroBanner pageType='single_col' title='Apply for your Dream Job' src={banner} mobImgSrc={mobBanner} fullImg={true} />
					<ListingLayout className='inner-sec-p'>
						<LeftCol className={styles.left_col}>
							<JobOverview data={data?.job_detail} loginUser={loginUser} userData={userData} />
						</LeftCol>
						<RightCol>
							<JobDetailInfo educationList={data?.education_list_for_jobs} data={data?.job_detail} userDataExists={data?.user_data_exit} loginUser={loginUser} userData={userData} status={status} />
						</RightCol>
					</ListingLayout>
				</>
			) : (
				userData?.position !== undefined &&
				userData?.position !== 'Sales Rep' && (
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

export default JobDetail

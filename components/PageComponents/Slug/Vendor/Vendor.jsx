import React, { useContext, useEffect } from 'react'
import Hero from './Hero/Hero'
import HotSelling from './HotSelling/HotSelling'
import styles from './Vendors.module.css'
import ServiceCard from '../../../UI/ServiceCard/ServiceCard'
import coinsAnim from '../../../../utils/coinsAnim'
import axios from 'axios'
import { baseApiUrl } from '../../../../utils/config'
import { GlobalProvider } from '../../../../context/AppProvider'

const Vendor = ({ result }) => {
	const { loginUser, userData } = useContext(GlobalProvider)

	const getUserCoins = async () => {
		const userData = {
			customer_id: loginUser?.id,
			url: 'vendors',
			vendor_id: result?.vendor_id
		}
		const res = await axios.post(`${baseApiUrl}/save-user-coins`, userData)
		console.log('res from coins', res)
		res?.data?.success && coinsAnim(res?.data?.coins, res?.data?.coins + Number(res?.data?.new_coins))
	}

	useEffect(() => {
		if (loginUser?.id !== undefined && userData?.position !== undefined && userData?.position !== 'Sales Rep') {
			setTimeout(() => getUserCoins(), 1000)
		}
	}, [loginUser?.id, userData?.position])
	return (
		<>
			<Hero result={result} />
			{result?.page_type === 'Shop_Vendor' ? (
				<HotSelling
					banner={result?.banner}
					vendorId={result?.vendor_id}
					hotProduts={result?.hot_products}
					allProducts={result?.all_products}
					vendorSlug={result?.vendor?.slug}
					vendorName={result?.vendor?.name}
					pageList={result?.page_list}
					alone_videos={result?.stand_alone_videos}
					vboothUrl={result?.vendor?.virtual_booth_url}
					allProductsPage={result?.all_products_page}
					appointmentData={result?.vendor?.schedules}
					courses={result?.courses}
					userAddress={result?.address}
				/>
			) : (
				<section className='sec-container'>
					<div className='sec-m'>
						<h1 className={styles.title}>Services</h1>
						<div className={styles.services_wrapoper}>
							{result?.services?.length > 0 ? (
								result?.services?.map((service) => {
									return <ServiceCard key={service?.id} data={service} />
								})
							) : (
								<div className='red-color'>Coming soon...</div>
							)}
						</div>
					</div>
				</section>
			)}
		</>
	)
}

export default Vendor

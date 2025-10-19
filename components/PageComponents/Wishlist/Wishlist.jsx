import React, { useState } from 'react'
import styles from './Wishlist.module.css'
import DashboardLayout from '../../UI/DashboardLayout/DashboardLayout'
import WishlistData from './WishlistData/WishlistData'
import { LiteLoader } from '../../Loader/Loader'
import MetaTags from '../../UI/MetaTags/MetaTags'

const Wishlist = ({ wishlistData }) => {
	const [loading, setloading] = useState(false)
	const [initialwishlistData, setinitialwishlistData] = useState(wishlistData)
	return (
		<>
			<MetaTags title={`Wishlist - Dashboard - DVM Central`} description={`Curate and organize your favorite items into a wishlist directly from your DVM Central dashboard for easy access and future purchases.`} />
			<LiteLoader className={`${styles.delete_loader} ${loading ? 'show-bd' : 'hide-bd'} transition`} />
			<DashboardLayout>
				<WishlistData initialwishlistData={initialwishlistData} setinitialwishlistData={setinitialwishlistData} setloading={setloading} />
			</DashboardLayout>
		</>
	)
}

export default Wishlist

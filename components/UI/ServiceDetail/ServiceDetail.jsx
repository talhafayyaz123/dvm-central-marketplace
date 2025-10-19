import React from 'react'
import ImgsGallery from './ImgsGallery/ImgsGallery'
import styles from './ServiceDetail.module.css'
import ServiceInfo from './ServiceInfo/ServiceInfo'

const ServiceDetail = ({ data }) => {
	return (
		<>
			<div className={`${styles.product_detail_wrapper}`}>
				<div className={`${styles.imgs_container} white-bg radius`}>
					<div className={`${styles.imgs_inner_container}`}>{<ImgsGallery media={data?.files} name={data?.service?.name} />}</div>
				</div>
				<ServiceInfo data={data} vendorName={data?.vendor?.name} />
			</div>
		</>
	)
}

export default ServiceDetail

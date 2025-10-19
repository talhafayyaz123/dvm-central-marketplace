import React from 'react'
import styles from './VendorAllVideos.module.css'
import NewCourseCard from '../../../UI/NewCourseCard/NewCourseCard'
const VendorAllVideos = ({ data, name }) => {
	const { vendor_all_video_courses, vendor } = data
	return (
		<section className='sec-mt sec-pb'>
			<div className='sec-container'>
				<h4>{name}</h4>
				<div className={styles.courses_wrapper}>
					{vendor_all_video_courses?.map((course, i) => {
						return <NewCourseCard key={course?.id} data={course} vendor={vendor.slug} />
					})}
				</div>
			</div>
		</section>
	)
}

export default VendorAllVideos

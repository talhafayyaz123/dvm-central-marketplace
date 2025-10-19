import React, { useContext } from 'react'
import styles from './CourseChapter.jsx.module.css'
import HeroBanner from '../../../UI/HeroBanner/HeroBanner'
import { GlobalProvider } from '../../../../context/AppProvider'
import PlayList from '../../../UI/PlayList/PlayList'
import { useSession } from 'next-auth/react'
import NotAuthorized from '../../../UI/NotAuthorized/NotAuthorized'

const CourseChapter = ({ data, breadcrumbs }) => {
	const { course, is_buyed, videos } = data
	const { description, discount_end_time, price_original, price_discounted, thumbnail, title } = course

	const { loginUser } = useContext(GlobalProvider)

	const { data: status } = useSession()

	return loginUser?.id !== undefined && is_buyed && status !== 'loading' ? (
		<>
			<HeroBanner title={data?.title} pageType='single_col' heroType='coursePage' info={description} />

			{videos?.length > 0 ? (
				<section className='sec-container'>
					<div className='sec-m'>
						<div className={styles.title_wrapper}>
							<h5>Video{videos?.length > 1 ? 's' : ''} in this chapter</h5>
						</div>
						<div className={styles.videos}>
							{videos?.map((videos, index) => {
								return <PlayList playListType='chapter' isByed={is_buyed} breadcrumbs={breadcrumbs} video={videos} key={index} index={index} />
							})}
						</div>
					</div>
				</section>
			) : (
				<div className={`gray-color ${styles.no_data}`}>Coming soon...</div>
			)}
		</>
	) : (
		<NotAuthorized heading='You are not authorized to access this page.' />
	)
}

export default CourseChapter

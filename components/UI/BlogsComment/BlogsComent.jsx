import React, { useState } from 'react'
import styles from './BlogsComent.module.css'
import ImgWithLoader from '../ImgWithLoader/ImgWithLoader'
import profileImg from '/public/imgs/no-profile-img.png'
import { imgApiUrl } from '../../../utils/config'

const BlogsComent = ({ key, comment }) => {
	const [readMore, setreadMore] = useState(false)
	const [activeReadMore, setactiveReadMore] = useState(null)
	return (
		<div className={`${styles.comment_container}`}>
			<ImgWithLoader
				src={comment?.customer?.vet_dvm_profile_image?.includes('base64') ? comment?.customer?.vet_dvm_profile_image : comment?.customer?.vet_dvm_profile_image !== null && comment?.customer?.vet_dvm_profile_image ? `${imgApiUrl?.profileImg}/${comment?.customer?.vet_dvm_profile_image}` : profileImg}
				loaderType='sml'
				width={60}
				height={60}
				className={`${styles.comment_img}`}
			/>
			<div className={styles.info_sec}>
				<div className={styles.user_name}>
					<div className='primary-color semibold-text'>
						{comment?.customer?.first_name} {comment?.customer?.last_name}
					</div>{' '}
					<p className='gray-color'> - {comment?.posted_on}</p>
				</div>
				<p
					className={styles.comment}
					style={{
						lineBreak: comment?.comment?.includes(' ') ? 'auto' : 'anywhere',
						wordBreak: comment?.comment?.includes(' ') ? 'auto' : 'break-all'
					}}
				>
					{comment?.comment?.substring(0, 500)}
					{!readMore && activeReadMore === key && comment?.comment}
					{comment?.comment?.length > 500
						? !readMore &&
						  activeReadMore !== key && (
								<span className={styles.read_more} onClick={() => (setactiveReadMore(key), setreadMore(activeReadMore === key ? true : false))}>
									...
									<button className='primary-color link'> Read More</button>
								</span>
						  )
						: ''}
				</p>
			</div>
		</div>
	)
}

export default BlogsComent

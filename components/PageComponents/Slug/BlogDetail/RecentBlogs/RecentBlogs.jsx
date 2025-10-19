import React from 'react'
import styles from './RecentBlogs.module.css'
import BlogCard from '../../../../UI/BlogCard/BlogCard'

const RecentBlogs = ({ data }) => {
	return (
		<div className={styles.recent_blogs_container}>
			<h4>Latest Posts</h4>
			{
				<div className={styles.recent_blogs_wrapper}>
					{data.map((recentblogs) => {
						return <BlogCard key={recentblogs.id} data={recentblogs} type='recent-blogs' />
					})}
				</div>
			}
		</div>
	)
}

export default RecentBlogs

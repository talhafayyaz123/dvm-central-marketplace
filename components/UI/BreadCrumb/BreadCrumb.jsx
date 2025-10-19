import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import styles from './BreadCrumb.module.css'

const BreadCrumb = ({ breadcrumbsData, pageType }) => {
	const [breadCrumbList, setBreadCrumbList] = useState()

	useEffect(() => {
		const defaultFunc = async () => {
			let array = [
				{
					name: 'Home',
					link: '/'
				}
			]
			await breadcrumbsData?.map((breadcrumb) => {
				array.push({
					name: breadcrumb.name,
					link: breadcrumb.link ? breadcrumb.link : ''
				})
			})
			await setBreadCrumbList(array)
		}
		defaultFunc()
	}, [setBreadCrumbList, breadcrumbsData, pageType])

	return (
		<>
			<div className={styles.breadcrumb_wrapper}>
				<div className='sec-container'>
					{breadCrumbList?.map((breadcrum, index) => {
						return breadcrum.link ? (
							<Link key={index} href={`${breadcrum.link}`}>
								<a className={styles.breadcrum_link}>{breadcrum.name}</a>
							</Link>
						) : (
							<span className={styles.breadcrum_span} key={index}>
								{breadcrum.name}
							</span>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default BreadCrumb

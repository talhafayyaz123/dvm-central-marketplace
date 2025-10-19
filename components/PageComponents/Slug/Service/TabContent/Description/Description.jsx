import React from 'react'
import styles from './Description.module.css'

const Description = ({ data }) => {
	return (
		<div className='description'>
			<div>
				<h5>Service Description</h5>
				<div className={`${styles.desc} dynamic-data`} dangerouslySetInnerHTML={{ __html: data }} />
			</div>
		</div>
	)
}

export default Description

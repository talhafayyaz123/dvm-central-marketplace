import React from 'react'
import styles from './PageContent.module.css'

const PageContent = ({ content }) => {
	return <div className={styles.content_wrapper} dangerouslySetInnerHTML={{ __html: content }} />
}

export default PageContent

import React, { useState } from 'react'
import { DarkLoader, LiteLoader } from '../../Loader/Loader'
import styles from './IframeWithLoader.module.css'

const IframeWithLoader = ({ className = '', src, title, loaderColor, ...props }) => {
	const [loading, setloading] = useState(true)

	return (
		<>
			{loading && (loaderColor == 'white' ? <LiteLoader className={styles.iframe_loader} /> : <DarkLoader className={styles.iframe_loader} />)}
			<iframe {...props} onLoad={() => setloading(false)} className={className} src={src} title={title} allow='autoplay' allowFullScreen width='100%' height='100%' />
		</>
	)
}

export default IframeWithLoader

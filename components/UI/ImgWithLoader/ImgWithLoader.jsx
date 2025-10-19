import Image from 'next/image'
import React, { useState } from 'react'
import { DarkLoader, LiteLoader } from '../../Loader/Loader'
import styles from './ImgWithLoader.module.css'

const ImgWithLoader = ({ src, alt, bg, loaderColor, loaderType, onClick, children, className = '', ...props }) => {
	const [loading, setLoading] = useState(Boolean(src))
	
	return (
		<div 
			className={`${styles.img_wrapper} ${bg === 'bg' ? styles.bg : ''} transition ${className}`} onClick={onClick}>
			{loading && (loaderColor === 'white' ? 
				<LiteLoader loaderType={loaderType} className={styles.img_loader} /> : 
				<DarkLoader loaderType={loaderType} className={styles.img_loader} />
			)}
			<Image 
				{...props} 
				onLoadingComplete={() => setLoading(false)} 
				src={src} 
				alt={alt}
				style={{ opacity: loading ? 0 : 1 }}
				className="transition"
			/>
			{children}
		</div>
	)
}

export default ImgWithLoader

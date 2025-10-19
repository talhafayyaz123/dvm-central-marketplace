import React from 'react'
import styles from './Wave.module.css'
import waveImg from '/public/imgs/wave/bl-shape.png'
import Image from 'next/image'

const Wave = ({ className = '', type }) => {
	return type === 'gray' ? (
		<div className={`${styles.wave_wrapper} ${styles.waveAnimation} ${className}`}>
			<Image layout='fill' src={waveImg} alt='DVM Central' />
			{/* <div className={`${styles.wave_wrapper_inner} ${styles.bgMiddle}`}>
				<div className={`${styles.wave} ${styles.waveMiddle}`} />
			</div>

			<div className={`${styles.wave_wrapper_inner} ${styles.bgBottom}`}>
				<div className={`${styles.wave} ${styles.graywaveBottom}`} />
			</div> */}
		</div>
	) : (
		<div className={`${styles.wave_wrapper} ${styles.waveAnimation} ${className}`}>
			<Image priority layout='fill' src={waveImg} alt='DVM Central' />
			{/* <div className={`${styles.wave_wrapper_inner} ${styles.bgMiddle}`}>
				<div className={`${styles.wave} ${styles.waveMiddle}`} />
			</div>

			<div className={`${styles.wave_wrapper_inner} ${styles.bgBottom}`}>
				<div className={`${styles.wave} ${styles.waveBottom}`} />
			</div> */}
		</div>
	)
}

export default Wave

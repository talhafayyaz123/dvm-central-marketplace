import React from 'react'
import styles from './PlayerBtn.module.css'

const PlayerBtn = ({ onClick, className, btnType, size }) => {
	return (
		<div className={`${styles.video_icon_container} player-btn ${className} ${btnType === 'white' || btnType === 'img' ? styles.white_btn : undefined} ${size === 'sml' ? styles.sml_icon : undefined}`}>
			<div className={styles.wrapper}>
				<div className={styles.video_main}>
					<div className={styles.promo_video}>
						<div className={`${styles.waves_block}`}>
							<div className={`${styles.waves} ${styles.wave_1} ${btnType === 'img' && styles.img_wave}`} />
							<div className={`${styles.waves} ${styles.wave_2} ${btnType === 'img' && styles.img_wave}`} />
							<div className={`${styles.waves} ${styles.wave_3} ${btnType === 'img' && styles.img_wave}`} />
						</div>
					</div>
					<div className={`${styles.video_btn} ${btnType === 'img' ? styles.img_video_btn : undefined}`} onClick={onClick}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={btnType === 'white' || btnType === 'img' ? 'var(--primary)' : 'var(--white)'}>
							<path fillRule='evenodd' d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z' clipRule='evenodd' />
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlayerBtn

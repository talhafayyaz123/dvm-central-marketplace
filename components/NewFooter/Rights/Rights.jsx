import React from 'react'
import styles from './Rights.module.css'
import Image from 'next/image'
import logoTech from '../../../public/imgs/logo/logotech.png'

const Rights = () => {
	return (
		<>
			<div className={styles.copy_right_container}>
				<div className={`${styles.copy_right_wrapper} sec-container`}>
					<p className={styles.tech_logo}>
						<span className='primary-color'>Designed & Developed By</span>{' '}
						<a href='https://tecsolpro.com/' target='_blank' rel='noreferrer'>
							<Image src={logoTech} alt='techlogo' width={110} height={30} />
						</a>
					</p>
				</div>
			</div>
		</>
	)
}

export default Rights

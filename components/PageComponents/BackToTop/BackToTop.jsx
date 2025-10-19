import React, { useState, useEffect, useRef } from 'react'
import styles from './BackToTop.module.css'

const BackToTop = () => {
	const [show, setShow] = useState(false)
	const scrollTop = useRef()
	const backToTop = () => {
		if (window.scrollY < 1000) {
			setShow(false)
		} else {
			setShow(true)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', backToTop)
	})

	return (
		<div>
			<button aria-label='Back to Top' ref={scrollTop} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`${styles.back_to_top} primary-btn full-radius ${show ? styles.show : undefined}`}>
				<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2.5} stroke='var(--white)' className='w-6 h-6'>
					<path strokeLinecap='round' strokeLinejoin='round' d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18' />
				</svg>
			</button>
		</div>
	)
}

export default BackToTop

import React, { useEffect } from 'react'
import styles from './Accordion.module.css'

const Accordion = ({ className, answerClass, questionClass, question, children, index, router, type, loginUser, userPosition }) => {
	const openAccordion = async () => {
		console.log('RUN')
		let currentAccordionElement = document.querySelectorAll('.question-wrapper')[index]
		let linksHider = document.querySelectorAll('.links-hider')
		let allArrowIcons = document.querySelectorAll('.question-wrapper svg')
		let thisText = currentAccordionElement.nextElementSibling
		let thisIcon = currentAccordionElement.querySelector('svg')

		await linksHider.forEach((hider) => {
			if (hider != thisText && hider.classList.contains('acc-opened')) {
				allArrowIcons.forEach((icon) => {
					if (icon.classList.contains('icon-rotated')) {
						icon.classList.remove('icon-rotated')
					}
				})

				hider.classList.remove('acc-opened')
				hider.style.maxHeight = 0
			}
		})
		if (thisText?.classList.contains('acc-opened') === false) {
			thisText?.classList.add('acc-opened')
			thisText.style.maxHeight = thisText.scrollHeight + 'px'
			thisIcon?.classList.add('icon-rotated')
		} else {
			thisText?.classList.remove('acc-opened')
			thisText.style.maxHeight = 0
			if (thisIcon?.classList.contains('icon-rotated')) {
				thisIcon?.classList.remove('icon-rotated')
			}
		}
	}

	useEffect(() => {
		setTimeout(() => {
			if (type === 'resume' && (router?.asPath === `/dashboard/build-resume` || router?.asPath === `/dashboard/profile`)) {
				let currentAccordionElement = document.querySelectorAll('.question-wrapper')[index]

				let thisText = currentAccordionElement.nextElementSibling
				let thisIcon = currentAccordionElement.querySelector('svg')

				thisText?.classList.add('acc-opened')
				thisText.style.maxHeight = thisText.scrollHeight + 'px'
				thisIcon?.classList.add('icon-rotated')
			}
		}, 1500)
	}, [router?.asPath, type])

	return (
		<div className={`${styles.qa_wrapper} ${router?.pathname.includes('dashboard/faq') ? styles.qa_wrapper_width : undefined}  qa-wrapper transition ${type === 'product-faq' ? styles.product_faq : undefined} ${className}`}>
			{/* question */}
			<div
				className={`${styles.question_wrapper} ${type === 'blog-accordion' ? styles.padding : undefined} question-wrapper ${questionClass}`}
				onClick={() => {
					openAccordion()
				}}
			>
				<div className={`${styles.question} semibold-text`}>{question}</div>
				<div className={type === 'blog-accordion' ? styles.blogs_arrow : undefined}>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke={type !== 'blog-accordion' ? 'var(--gray-icon)' : 'var(--white)'} className='transition'>
						<path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
					</svg>
				</div>
			</div>

			{/* answer */}
			<div className={`${styles.answer_wrapper} ${type === 'blog-accordion' ? styles.acc_blog_opened : undefined} links-hider transition ${answerClass}`}>{children}</div>
		</div>
	)
}

export default Accordion

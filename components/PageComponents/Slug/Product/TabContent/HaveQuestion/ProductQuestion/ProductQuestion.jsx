import React from 'react'
import styles from './ProductQuestion.module.css'
import Accordion from '../../../../../../UI/Accordion/Accordion'

const ProductQuestion = ({ productFAQ }) => {
	return (
		<div>
			<h5 className={styles.title}>{`Product FAQ's`}</h5>
			{productFAQ?.map((faq, i) => {
				const { question, answer, id } = faq
				return (
					<Accordion className={styles.accordion} key={id} question={question} index={i} type='product-faq'>
						<p className={`${styles.answer} grey-color`}>{answer}</p>
					</Accordion>
				)
			})}
		</div>
	)
}

export default ProductQuestion

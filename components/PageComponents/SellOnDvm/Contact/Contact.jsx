import React from 'react'
import ContactForm from './ContactForm/ContactForm'
import styles from './Contact.module.css'

const Contact = () => {
	return (
		<section className={`${styles.container}`}>
			<div className='sec-container'>
				<div className={`${styles.contact_wrapper}`}>
					<ContactForm />
				</div>
			</div>
		</section>
	)
}

export default Contact

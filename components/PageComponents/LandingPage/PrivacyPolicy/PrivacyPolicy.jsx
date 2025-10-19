import React from 'react'
import styles from './PrivacyPolicy.module.css'

const PrivacyPolicy = () => {
	return (
		<div className={`${styles.policy} sec-m`}>
			<div className='sml-sec-container'>
				<h2 className='secondary-color'>Privacy Policy</h2>
				<p className='gray-color'>
					{`We have created a platform where veterinarians can get  various veterinary medical supplies from reliable manufacturers. By doing so, we interface with multiple services and collect information that is effective to use on our platform. The policy designates what information we share, use, and collect. As you appraise our privacy policy, don’t forget that it is applicable to all the DVM Central services and products. There is no separate privacy policy link for the vendors and buyers of DVM Central. Most of all, we believe in confidentiality and highly committed to being clear about privacy concerns, including how to secure the information.`}
				</p>
				<h5>What information do we collect?</h5>
				<p className='gray-color'>
					{`We collect different types of information, including your business, company, group, clinic, or the entity you represent. However, information collection depends on which services you use. Likewise, we gather information and content when you are using the services of DVM Central. For example, when you sign up for a particular account, or when you contribute to our community. Also, it includes text, date, time, and other actions that are taken. It also includes encrypted versions of any accounts that you provide.`}
				</p>
				<p className='gray-color'>
					{`We excise the personal information of sellers to run the businesses and provide the best services to the buyers. By means of accepting the terms and conditions, you concede that DVM Central will use the information in North American states and other countries where DVM Central  operates. Also, by acknowledging our policies, you approve that you understood the policy, including why and how the information will be used. Nevertheless, you should not use the services if you don’t want us to gather personal information.`}
				</p>
				<p className='gray-color'>
					{`Be aware that privacy conditions and other standards will vary in some countries. For instance, the rights of authorities to access information can differ from one country to another. However, we will be transferring the information to those countries that permit us. `}
				</p>

				<h5>Things You Do</h5>
				<p className='gray-color'>{`As an authorized agent, DVM Central stores the data of the third-party purchases to prevent troubles in the future.`}</p>

				<h5>Purchase History</h5>
				<p className='gray-color'>{`As an authorized agent, Vet and Tech stores the data of the third-party purchases to prevent troubles in the future.`}</p>

				<h5>Security</h5>
				<p className='gray-color'>{`The security of all buyers and sellers is highly significant to us. Generally, we follow the industry standards for protecting all the information collected during a visit to our website. Whether the information is provided during transmission or after receiving the order. For instance, the encryption is retrieved for particular information (such as debit or credit card numbers) as per the standards of transport layer security. Inopportunely, no transmission method on the electronic storage or internet is 100 percent safe. Hence, we endeavor to keep personal information confidential; we guarantee utter security.`}</p>
				<p className='gray-color'>{`Moreover, the account information is secured with a password. It is significant that you have protection against illegal access to your information about products and services. So, choose the password carefully and keep it confidential by signing out after using the amenities.`}</p>
				<p className='gray-color'>{`Not only that, we offer advanced security features, and you can check the information in detail by clicking on the account settings. Contact us instantaneously if you have any queries about personal information security.`}</p>

				<h5>Retention</h5>
				<p className='gray-color'>{`DVM Central will retain the information as long as it is vital for policy purposes and until the account is active. However, you can close your DVM Central account if you no longer want us to use the information to deliver services to you.`}</p>
				<p className='gray-color'>{`DVM Central will retain the information as long as it is vital for policy purposes and until the account is active. However, you can close your DVM Central account if you no longer want us to use the information to deliver services to you.`}</p>

				<h5>Your Responsibilities</h5>
				<p className='gray-color'>{`If you are selling through DVM Central, you should receive and determine what is important to do with individuals’ information. The privacy duties include acting as an independent controller of the data. (It is crucial to decide what individual data should be collected and what is the purpose of using that data) that is visible in the DVM Central seller policy and terms of use.`}</p>

				<h5>Accessible Information</h5>
				<p className='gray-color'>There are some examples below for the accessible information that includes the following:</p>

				<ul>
					<li>Check out the status of orders</li>
					<li>{`Identifiable information such as (name, password, email, and address book)`}</li>
					<li>Payment settings include card payment information</li>
					<li>{`Email notifications – availability of the product, delivery, and reminders`}</li>
					<li>Recommendations about the recently viewed products and how to improve your recommendations</li>
					<li>{`The content, services, relevant settings, communication, advertising customizations, and devices`}</li>
					<li>Recently reviewed content</li>
					<li>{`Visibility of the personal profile, reviews, and product reviews`}</li>
					<li>{`As a vendor, you will have access to your account and information, and you can adjust the settings to have convenience in communication in your account`}</li>
				</ul>

				<h5>Privacy Policy Changes</h5>
				<p className='gray-color'>We may change or revise our privacy policies after a certain time. The changes can be done in several aspects such as</p>

				<ul>
					<li>{`Posting changes or through services`}</li>
					<li>{`Sending a message or email about certain changes, or `}</li>
					<li>{`Posting the updates on the platform; thus we reassure you to check the policies regularly. Similarly, check the updated reviews from time to time.`}</li>
				</ul>

				<h5>Contact</h5>
				<p className='gray-color'>{`If you have any queries:`}</p>
				<p className='gray-color'>contact our support team via our help center</p>
				<p className='gray-color'>
					Or email us at{' '}
					<a href='mailto:info@dvmcentral.com' className='secondary-color semibold-text'>
						{`info@dvmcentral.com`}
					</a>
				</p>
			</div>
		</div>
	)
}

export default PrivacyPolicy

import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from './TermsAndConditions.module.css'
import Link from 'next/link'

const TermsAndConditions = ({ type }) => {
	const router = useRouter()

	const [userType, setuserType] = useState('user')
	return (
		<section className={`${router.pathname.includes('terms-and-conditions') ? 'sec-m' : 'inner-sec-mt'}`}>
			<div className={`${styles.about} sml-sec-container`}>
				{router.pathname.includes('terms-and-conditions') ? <h2 className='secondary-color'>Terms and Conditions</h2> : <h4 className='primary-color'>Terms and Conditions</h4>}
				{type === 'page' && (
					<div className={styles.tab_wrapper}>
						<button className={`${userType === 'user' ? styles.active : undefined} secondary-border secondary-color white-bg`} onClick={() => setuserType('user')}>
							I am a Buyer
						</button>
						<button className={`${userType === 'vendor' ? styles.active : undefined} secondary-border secondary-color white-bg`} onClick={() => setuserType('vendor')}>
							I am a Vendor
						</button>
					</div>
				)}

				{(userType === 'user' && type === 'page') || type === 'user' ? (
					<div className={`${styles.inner_wrapper} inner-sec-mt`}>
						<h5>Introduction</h5>
						<p className='gray-color'>
							{`Welcome to DVM Central! We are happy to have you at our veterinary marketplace, designed to directly connect buyers with sellers and meet all needs for quality animal health supplies. At DVM Central, our goal is straightforward: to equip veterinary clinics, animal hospitals, and
							veterinary nonprofits with the technological tools necessary for their success. Our procurement platform and mobile app, collectively referred to as the "Platform," along with our associated services ("Services"), are crafted to simplify and streamline your procurement and inventory
							management tasks. The Platform is thoughtfully designed to meet your specific needs, serving as a comprehensive resource for accessing all essential products and supplies required for your veterinary practice. Everything you need, from veterinary medications and medical equipment to
							daily necessities, is readily available.`}
						</p>

						<p className='gray-color'>
							{`Before you join a journey with us, it's important to clarify how our Platform and Services operate and the expectations for both parties involved. This agreement, established between you, the user, and DVM Central ("we" or "us"), outlines the terms and conditions, along with any
							referenced documents (collectively, "Terms of Use"), that govern your use of and access to`}{' '}
							<span>
								<Link href='/'>
									<a className='link'>www.dvmcentral.com</a>
								</Link>
							</span>{' '}
							{`and our mobile app, including any content, functionality, and services offered through our Platform.`}
						</p>

						<p className='gray-color'>
							Please carefully review the Terms of Use before using or accessing the Platform. By engaging with the Platform, you consent to abide by these Terms of Use and our Privacy Policy, found at{' '}
							<span>
								<Link href='/privacy-policy'>
									<a className='link'>Privacy Policy | DVMCentral</a>
								</Link>
							</span>
							. Should you disagree with these Terms of Use or our Privacy Policy, you are prohibited from accessing or utilizing our Platform.
						</p>

						<p className='gray-color'>
							We prioritize your trust and satisfaction and are dedicated to delivering an exceptional experience. Should you have any inquiries or require assistance, our dedicated support team is just a phone call{' '}
							<span>
								<a href='tel:+1(407)-557 6073)' className='link'>
									+1(407)-557 6073
								</a>
							</span>{' '}
							or email{' '}
							<span>
								<a href='mailto:info@dvmcentral.com' className='link'>
									info@dvmcentral.com
								</a>
							</span>{' '}
							away!
						</p>

						<p className='gray-color'>
							{`The Platform is accessible to veterinarians, veterinary professionals, and their staff, provided they are authorized by a veterinarian or veterinary professional to utilize the services. Access and usage of our Platform and Services necessitate that you are at least eighteen (18) years
							old and reside within the United States of America ("U.S.") or Canada. By using our website and accessing the Platform and DVM Central Services, you confirm that you are legally capable of entering into a binding agreement with DVM Central and meet all the aforementioned eligibility
							criteria. Access or use of the Platform is not permitted if these conditions are not met.`}
						</p>

						<div>
							<p>
								<span className='semibold-text black-color'>IMPORTANT:</span> <span>PLEASE REVIEW CAREFULLY, AS THESE TERMS INCLUDE AN ARBITRATION CLAUSE, DISCLAIMERS, AND LIMITATIONS ON LIABILITY.</span>
							</p>
						</div>

						<h5>Changes to the Terms of Use</h5>
						<p className='gray-color'>
							We reserve the right to modify these Terms of Use at our sole discretion. Changes become effective immediately upon posting and apply to all subsequent access and use of the Platform. Amendments to the dispute resolution provisions outlined in the “Governing Law; Disputes” section will
							not affect disputes for which the parties have actual notice before the changes are posted.
						</p>

						<p className='gray-color'>
							{`Your continued use of the Platform after changes have been posted signifies your acceptance of those changes. You are encouraged to review this page periodically to stay informed of any updates. Whenever we update these Terms of Use, we'll endeavor to notify you through platform
							banners, emails, or other reasonable means. The current version of these Terms of Use can be identified by the "Last Reviewed On" date stated above.`}
						</p>

						<h5>{`What We Do – and Don’t Do…`}</h5>
						<p className='gray-color'>
							DVM Central serves as an online marketplace for veterinary products and supplies without owning, storing, selling, shipping, fulfilling, or directly managing any of the products available. Our Platform and Services simply facilitate connections between veterinary product buyers and
							sellers, with sellers responsible for all order transactions, processing, and fulfillment. As an intermediary, DVM Central assumes no liability or responsibility for any quality, shipping, fulfillment, or other order-related issues. We do not oversee the quality, availability, or
							effectiveness of products offered by sellers on the Platform, nor are we involved in shipping or fulfillment processes.
						</p>

						<p className='gray-color'>
							Consequently, DVM Central disclaims all liability for any damages, losses, claims, or disputes arising between consumers and sellers. We strongly advise reviewing the terms and policies of sellers you transact with on the Platform, as these terms will govern your purchase(s). By using
							our Platform and Services, you acknowledge and accept this disclaimer.
						</p>

						<h5>Reliance on Information Posted</h5>
						<p className='gray-color'>
							The information available on the Platform is provided for general information purposes only. Product information, including names, descriptions, images, documentation, availability, pricing, and other details, is sourced from various places, including supplier websites and
							documentation. While we strive to curate accurate and up-to-date product information, DVM Central cannot guarantee the accuracy, completeness, reliability, or timeliness of such information. Despite our efforts, inaccuracies in pricing or stock status may occur due to technical errors.
							We disclaim all liability for reliance on this information. If you encounter pricing or information errors, please contact us at{' '}
							<span>
								<a href='tel:+1(407)-557 6073)' className='link'>
									+1(407)-557 6073
								</a>
							</span>{' '}
							so we can investigate.
						</p>

						<p className='gray-color'>
							Content on the Platform, including product reviews and related information, is for informational purposes and should not substitute professional medical advice. DVM Central does not endorse or verify the accuracy of veterinary content or reviews posted on our Platform. By using the
							Platform, you acknowledge that DVM Central is not responsible for any decisions or outcomes based on these reviews.
						</p>

						<p className='gray-color'>Some content on the Platform, including company names, logos, product names, descriptions, and images, may be owned by their originators. DVM Central uses this content to provide the Platform and Services but claims no ownership of such materials.</p>

						<p className='gray-color'>
							DVM Central takes copyright and trademark infringement seriously and will respond to notices of alleged infringement in accordance with applicable law. If you believe that content on the Platform infringes on the copyright or trademark you own, you may notify us at{' '}
							<span>
								<a href='mailto:contact@dvmcentral.com' className='link'>
									contact@dvmcentral.com
								</a>
							</span>
							.
						</p>

						<h5>Legal Department</h5>
						<address className='gray-color' style={{ marginTop: '1rem' }}>
							4700 Millenia Boulevard Suite 175 Orlando, FL 32839
						</address>

						<p>
							<a href='tel:+1(407)-557 6073)' className='link'>
								+1(407)-557 6073
							</a>
						</p>

						<p className='gray-color'>
							{`Under the guidelines of the Digital Millennium Copyright Act, Title 17, United States Code, Section 512(c)(2) ("DMCA"), we commit to swiftly addressing allegations of copyright infringement. Refer to 17 U.S.C. § 512(c)(3) for the specifics of submitting a valid notification. Be aware
							that falsely alleging copyright infringement on our Platform can hold you accountable for certain costs and damages to DVM Central.`}
						</p>

						<h5>Changes to the Platform and Services</h5>
						<p className='gray-color'>We may periodically update the content on our Platform and Services, yet we do not guarantee that such content will always be complete or up-to-date. Any material on the Platform may become outdated at any time, and we have no obligation to update it.</p>

						<h5>Accessing the Platform and Account Security</h5>
						<p className='gray-color'>
							DVM Central reserves the right, at our sole discretion and without prior notice, to withdraw or modify the Platform and any Services or materials we offer. We shall not be held liable if, for any reason, the Platform or any part of it is unavailable at any moment or for any duration.
							Access to certain parts of the Platform, or the entire Platform, may occasionally be limited.
						</p>

						<p className='gray-color'>
							You are responsible for: (a) arranging all necessary access to the Platform and (b) ensuring that all individuals accessing the Platform through your internet connection are aware of these Terms of Use and comply with them. Only veterinarians holding an active U.S. or Canadian
							veterinary license or individuals explicitly authorized by such veterinarians, including veterinary technicians, office managers, and inventory managers, are permitted to access and use the Platform and Services.
						</p>

						<p className='gray-color'>
							When registering on the Platform or accessing certain resources, you may be asked to provide specific registration details and other information. Your use of the Platform and Services is conditional upon all provided information being accurate, current, and complete. By registering or
							using the Platform, you agree that our Privacy Policy governs all information you provide, and you consent to all actions we take with your information in line with this policy. Additionally, you acknowledge that some products on DVM Central may be hazardous or controlled substances,
							and obtaining or diverting such products illicitly is a serious crime. You are solely responsible for ensuring compliance with all laws and regulations regarding the procurement of such products by users of your account and agree to indemnify DVM Central against any actions taken by
							account users contrary to these Terms of Use or applicable laws or regulations.
						</p>

						<p className='gray-color'>
							To use the Platform, you may need to set up a username, password, and account. This information is confidential and must not be shared with any third parties. Notify us immediately if you suspect unauthorized use of your username or password or any other security breach. Always log out
							at the end of your session, especially when using a computer not affiliated with your veterinary practice, to prevent unauthorized access to your account information. Despite any contrary provisions, you are responsible for maintaining the confidentiality of your account and password
							and for restricting access to your account and computer, accepting responsibility for all activities that occur under your account.
						</p>

						<h5>Account Suspension, Deactivation & Termination</h5>

						<p className='gray-color'>
							DVM Central may suspend, deactivate, or terminate your account or access to the Platform and Services at any time for any reason at our discretion, including for breaches of these Terms of Use: unauthorized use of your username, password, or account; abusive behavior; violation of
							Content Standards; lack of an active veterinary license or unauthorized user status; or actions contrary to laws or regulations. Should your account be suspended, deactivated, or terminated, you are not permitted to create another account without our prior written consent. You can
							terminate your account at any time by contacting us at{' '}
							<span>
								<a href='tel:+1(407)-557 6073)' className='link'>
									+1(407)-557 6073
								</a>
							</span>
						</p>

						<h5>Account Information from Third-Party Sites</h5>
						<p className='gray-color'>
							{`By using the Platform and Services, you may ask DVM Central to retrieve your data and information held online by third parties with whom you have customer relationships ("Account Information") for account maintenance and transaction facilitation. In doing so, you: (a) acknowledge that
							accessing and connecting with vendors and suppliers through the Platform may involve the collection, encryption, and use of your credentials by DVM Central for providing the Platform and Services; (b) authorize DVM Central to collect, encrypt, and use your credentials; access your
							vendors' and suppliers' websites; view, retrieve, download, and store your Account Information; and take necessary actions to provide the Platform and Services to you. This includes accessing information such as product availability, pricing, cart modifications, order histories, and
							order placement details. You warrant that the Account Information is yours, that you have the right to use it as described, and that you authorize DVM Central to act as your agent in accessing and using this information.`}
						</p>

						<p className='gray-color'>
							DVM Central does not verify the accuracy, legality, or non-infringement of the Account Information. Technical issues may prevent data retrieval or cause data loss or service interruptions. DVM Central is not responsible for the timeliness, accuracy, deletion, non-delivery, or failure
							to store any Account Information, user data, communications, or personalization settings.
						</p>

						<h5>Your Grant of Authority to DVM Central</h5>
						<p className='gray-color'>
							In alignment with the above, to facilitate the provision of you with account information as part of our services, you hereby grant DVM Central a limited power of attorney, naming DVM Central as your attorney-in-fact and authorized agent. This is to access third-party sites you
							designate, retrieve, and utilize your information with all necessary actions as fully as you can with your own rights and authorizations. You recognize and agree that when DVM Central accesses and retrieves Account Information from third-party sites, it acts solely as your agent, not
							on behalf of the third-party site operators. Should there be any breach of your assurances regarding Account Information ownership or your designation of DVM Central as your agent, you commit to fully indemnifying and holding DVM Central harmless against any claims, losses, or
							liabilities that may result.
						</p>

						<h5>Intellectual Property Rights</h5>
						<p className='gray-color'>
							{`The entirety of the Platform's content, including texts, images, videos, audio, and the design, selection, and arrangement thereof, along with the Services, are the property of DVM Central, its licensors, or other content providers. These are safeguarded by U.S. and international laws
							on copyright, trademark, patent, trade secrets, and other intellectual or proprietary rights. These Terms of Use grant you permission to use the Platform and Services solely for procuring products for your veterinary entity. Any reproduction, modification, creation of derivative works,
							public display, performance, downloading, storage, or transmission of material from the Platform beyond what is necessary for your use, as outlined here, is prohibited. Specifically, you must not: (a) alter Platform materials; (b) remove or alter any copyright or trademark notices; or
							(c) create derivatives using the Platform. No rights, titles, or interests in the Platform or its content are transferred to you, and all rights not explicitly granted are reserved by DVM Central. The DVM Central name, logo, and all related trademarks are owned by DVM Central or its
							affiliates. Their use without DVM Central's prior written permission is forbidden. Trademarks of other entities on the Platform are their respective owners' property.`}
						</p>

						<h5>Applications</h5>
						<p className='gray-color'>
							{`We offer mobile applications ("Apps") through which the Platform and Services can be accessed. Using our Apps requires a compatible device. We do not guarantee compatibility with your device. You are granted a limited, non-exclusive, non-transferable, and revocable license to use the
							App linked to your account strictly for your veterinary business. This license does not constitute a sale of the App, and all rights, titles, and interests in the Apps remain with us or our partners. You consent to automatic upgrades of the App on your device and agree that these Terms
							of Use apply to all such upgrades. The Apps may not be exported or re-exported to certain countries or entities prohibited from receiving U.S. exports. You agree to abide by all U.S. and foreign laws regarding App use.`}
						</p>

						<h5>Prohibited Uses</h5>
						<p className='gray-color'>The Platform and Services are to be used strictly for lawful purposes and in line with these Terms of Use. When accessing or using the Platform, you agree not to:</p>
						<ul>
							<li>Violate any federal, state, local, or international laws or regulations, including those related to data or software export from or into the U.S. or veterinary practice regulations.</li>
							<li>{`Post, upload, transmit, or receive any content that fails to adhere to DVM Central's standards or guidelines, including those outlined in DVM Central's Review Guidelines.`}</li>
							<li>Impersonate DVM Central, its employees, other users, or any individuals or entities, including using their email addresses or screen names.</li>
							<li>Exploit, harm, or attempt to exploit or harm other Platform users in any manner.</li>
							<li>{`Engage in deceptive acts, unfair competition, or conduct that limits or harms the Platform's use and enjoyment, potentially causing harm to DVM Central or its users or exposing them to liability.`}</li>
						</ul>

						<p className='gray-color'>Furthermore, you are prohibited from and should not permit others to assist or engage in the following:</p>

						<ol>
							<li className={`${styles.numb} ${styles.alphas}`}>{`Using the Platform in a way that could disable, overburden, damage, or impair it or interfere with any other party's use, including their real-time activities on the Platform.`}</li>
							<li className={`${styles.numb} ${styles.alphas}`}>Reverse engineering, decompiling, disassembling, deriving source code, selling, leasing, sub-licensing, or creating derivative works related to the Platform and its services, directly or indirectly.</li>
							<li className={`${styles.numb} ${styles.alphas}`}>Using any manual or automated process to monitor or copy any Platform material without express prior consent for any purpose not explicitly authorized by these Terms.</li>
							<li className={`${styles.numb} ${styles.alphas}`}>{`Employing any devices, software, or routines that disrupt the Platform's proper functioning.`}</li>
							<li className={`${styles.numb} ${styles.alphas}`}>Introducing malware, including viruses, Trojan horses, worms, or other harmful tech.</li>
							<li className={`${styles.numb} ${styles.alphas}`}>{`Attempting unauthorized access to, or disrupting, the Platform's parts, its servers, or any connected servers, computers, or databases.`}</li>
							<li className={`${styles.numb} ${styles.alphas}`}>Initiating a denial-of-service attack or a distributed denial-of-service attack against the Platform.</li>
							<li className={`${styles.numb} ${styles.alphas}`}>{`Attempting to interfere with the Platform's proper operation in any other way.`}</li>
						</ol>

						<h5>User Contributions</h5>
						<p className='gray-color'>
							{`The Platform hosts forums, message boards, bulletin boards, and various interactive features ("Interactive Services") that enable users to post, submit, publish, display, or transmit content or materials ("User Contributions") to other users or entities on or through the Platform. All
							User Contributions must adhere to the Content Standards specified in these Terms of Use and any additional guidelines associated with the Interactive Service.`}
						</p>

						<p className='gray-color'>
							Any User Contribution you make on the site is considered non-confidential and non-proprietary. By posting any User Contribution on the Platform, you grant us, our affiliates, service providers, and their and our respective licensees, successors, and assigns the right to use, reproduce,
							modify, perform, display, distribute, and disclose to third parties such material for any purpose.
						</p>

						<p className='gray-color'>
							You affirm and guarantee that: (a) you possess or control all rights to the User Contributions and are authorized to grant the license mentioned above to us, our affiliates, and service providers, and their and our respective licensees, successors, and assigns; and (b) all your User
							Contributions comply and will comply with these Terms of Use.
						</p>

						<p className='gray-color'>
							{`You acknowledge that you are solely responsible for any User Contributions you submit or contribute, and not DVM Central, bearing full responsibility for the content's legality, reliability, accuracy, and appropriateness. We are not accountable or liable to any third party for the
							content or accuracy of any User Contributions posted by you or any other user of the Platform.`}
						</p>

						<h5>Monitoring and Enforcement; Termination</h5>
						<p className='gray-color'>
							{`We reserve the right to: (a) remove or refuse to post any User Contributions for any reason at our discretion; (b) take any action deemed necessary or appropriate regarding any User Contribution that we believe violates these Terms of Use, infringes on any rights, threatens safety, or
							could result in liability for DVM Central; (c) reveal your identity to any third party claiming that your posts infringe on their rights; (d) take legal action for any illegal or unauthorized use of the Platform; (e) terminate or suspend your access to the Platform for any reason,
							including violations of these Terms of Use.`}
						</p>

						<p className='gray-color'>
							We do not review materials or User Contributions before they are posted and cannot guarantee the prompt removal of objectionable content once posted. Therefore, we assume no liability for any action or inaction regarding user or third-party communications or content. We are not
							responsible for performing or not performing the activities described in this section.
						</p>

						<h5>Content Standards</h5>
						<p className='gray-color'>These standards apply to all User Contributions and interactions on the Platform. User Contributions must comply with all applicable laws and regulations and must not:</p>

						<ul>
							<li>Include defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or objectionable material.</li>
							<li>Promote sexually explicit material, violence, or discrimination of any kind.</li>
							<li>{`Infringe on anyone's intellectual property or other rights.`}</li>
							<li>Violate any rights of publicity and privacy or contain material that could lead to civil or criminal liability under applicable laws, conflicting with these Terms of Use or our Privacy Policy.</li>
							<li>Be likely to deceive any person.</li>
							<li>Advocate or assist unlawful acts.</li>
							<li>Impersonate any person or falsely represent your identity or affiliation.</li>
							<li>Involve commercial activities not approved by us.</li>
							<li>Appear to be endorsed by us or others without proper authorization.</li>
						</ul>

						<p className='gray-color'>
							Specific parts, services, or features of the Platform and Interactive Services may have additional terms and conditions, such as DVM Central’s Review Guidelines for posting product reviews. All such terms are incorporated into these Terms of Use by reference.
						</p>

						<h5>Information About You and Your Visits to the Website</h5>
						<p className='gray-color'>All data collected through the Platform is governed by our Privacy Policy. By utilizing the Platform, you consent to our actions regarding your information in accordance with the Privacy Policy.</p>

						<h5>Safety</h5>
						<p className='gray-color'>
							{`The safety and security of the Platform and its users are paramount at DVM Central. We strive to provide a safe, lawful environment and reserve the right to fully cooperate with law enforcement, regulatory bodies, and court orders that require or direct us to disclose users' identity
							or other information. DVM Central may also choose to assist with investigations by veterinary businesses or other entities regarding the Platform and Services. YOU WAIVE AND HOLD HARMLESS DVM Central from any claims arising from any actions taken during or as a result of investigations
							by any party, law enforcement, veterinary businesses, or other third parties.`}
						</p>

						<p className='gray-color'>{`DVM Central's cooperation aims to maintain the law and ensure the safety and integrity of our Platform and its users. We value your trust and are dedicated to providing a secure and positive experience for our community.`}</p>

						<h5>Links from Website</h5>
						<p className='gray-color'>
							{`The Platform may include links to third-party sites and resources for convenience. These links, found in advertisements or sponsored content, lead to sites outside our control, for which we are not responsible. We accept no liability for any loss or damage from your use of these
							third-party sites. Accessing third-party websites linked from our Platform is done at your own risk, subject to those sites' terms and conditions.`}
						</p>

						<h5>Geographic Restrictions</h5>
						<p className='gray-color'>
							DVM Central operates within the USA and Canada. We make no representations that the Platform or any of its content is accessible or suitable for use outside of the U.S. and Canada. If you access the Platform from other locations, you do so by your own volition and are responsible for
							compliance with local laws.
						</p>

						<h5>User Rewards and Rebate Program</h5>
						<p className='gray-color'>Our User Reward Program is designed to provide added value to our customers. As part of commitment to enhancing your shopping experience, the Platform offers a Purchase Rebate detailed as follows:</p>

						<ul>
							<li className='semibold-text'>
								<p>
									<span className='semibold-text black-color'>1% Purchase Rebate: </span> <span className='gray-color'>Customers who achieve a cumulative purchase total of $10,000 are eligible to receive a 1% rebate on their purchases.</span>
								</p>
							</li>
							<li className='semibold-text'>
								<p>
									<span className='semibold-text black-color'>2% Purchase Rebate: </span> <span className='gray-color'>Customers whose cumulative purchases reach $20,000 will be eligible for a 2% rebate on their total purchases.</span>
								</p>
							</li>
							<li className='semibold-text'>
								<p>
									<span className='semibold-text black-color'>3% Purchase Rebate: </span> <span className='gray-color'>A 3% rebate will be awarded to customers whose cumulative purchases exceed $30,000.</span>
								</p>
							</li>
						</ul>

						<h5>Eligibility and Claiming Process</h5>
						<p className='gray-color'>Rebates are calculated based on the cumulative total of purchases made within the calendar year.</p>

						<ul>
							<li>Eligible customers will be automatically enrolled in the rebate program, and rebates will be credited to their account following the achievement of the specified purchase thresholds.</li>
							<li>Rebates can be used towards future purchases on the Platform and cannot be exchanged for cash or transferred to another account.</li>
						</ul>

						<h5>Terms</h5>
						<ul>
							<li>The Purchase Rebate is only valid for purchases made through the DVM Central.</li>
							<li>Returns, refunds, or canceled transactions will be deducted from the cumulative purchase total for the purpose of calculating eligibility for the rebate.</li>
							<li>Platform reserves the right to modify, suspend, or terminate the User Reward Program at any time without prior notice, subject to applicable laws and regulations.</li>
						</ul>

						<p className='gray-color'>
							Reward distributions may be taxable under various tax laws, making you solely responsible for any tax liabilities. You must provide DVM Central with requested tax-related information and are responsible for any tax-related liabilities incurred by DVM Central due to your actions or
							inactions, with DVM Central authorized to offset such liabilities from your Rewards or bonuses.
						</p>

						<p className='gray-color'>Customers agree to be bound by these terms and conditions by participating in the User Reward Program.</p>

						<h5>Coins Reward</h5>

						<ol>
							<li className={`${styles.numb} ${styles.nos}`}>
								<div>
									<span className='semibold-text black-color'>Daily Login Reward </span>{' '}
									<span className={`${styles.inner_nos} gray-color`}>
										<span>Buyers will receive 40 coins once a day upon logging in.</span>
									</span>
								</div>
							</li>

							<li className={`${styles.numb} ${styles.nos}`}>
								<div>
									<span className='semibold-text black-color'>Vendor and Service Provider Store Visits</span>{' '}
									<span className={`${styles.inner_nos} gray-color`}>
										<span>Buyers will receive 25 coins once a day for visiting a vendor or service provider store page.</span>
										<span>This reward is limited to a maximum of three times per month for each vendor/service provider store visit.</span>
									</span>
								</div>
							</li>

							<li className={`${styles.numb} ${styles.nos}`}>
								<div>
									<span className='semibold-text black-color'>Product Detail Page Visits</span>{' '}
									<span className={`${styles.inner_nos} gray-color`}>
										<span>Buyers will receive 25 coins once a day for visiting a product detail page.</span>
										<span>This reward is limited to a maximum of three times per month for product detail page visits. Please note, this applies to the product detail page category and not for each individual product page visit.</span>
									</span>
								</div>
							</li>

							<li className={`${styles.numb} ${styles.nos}`}>
								<div>
									<span className='semibold-text black-color'>Product Reviews</span>{' '}
									<span className={`${styles.inner_nos} gray-color`}>
										<span>Buyers will receive 25 coins for giving a product review, provided they have purchased that product. This reward is applicable only once per product review.</span>
									</span>
								</div>
							</li>

							<li className={`${styles.numb} ${styles.nos}`}>
								<div>
									<span className='semibold-text black-color'>Checkout Reward</span>{' '}
									<span className={`${styles.inner_nos} gray-color`}>
										<span>Buyers will receive coins equivalent to the subtotal amount during checkout. For example, a $200 subtotal will earn 200 coins.</span>
									</span>
								</div>
							</li>

							<li className={`${styles.numb} ${styles.nos}`}>
								<div>
									<span className='semibold-text black-color'>Coins Value</span>{' '}
									<span className={`${styles.inner_nos} gray-color`}>
										<span>The value of coins is set at 1000 earned coins, equaling $1.</span>
									</span>
								</div>
							</li>
						</ol>

						<p className='gray-color'>Please note, all coin rewards are subject to these terms and conditions and may be adjusted at the discretion of DVM Central.</p>

						<h5>Disclaimer of Warranties</h5>
						<p className='gray-color'>
							{`We cannot assure that files available for download from the internet or the Platform, including the App, will be free from harmful components such as viruses. It's your responsibility to implement measures that satisfy your requirements for anti-virus protection and data accuracy and
							to maintain external means for data reconstruction. WE DISCLAIM ALL LIABILITY FOR ANY LOSS OR DAMAGE RESULTING FROM MALWARE OR OTHER HARMFUL MATERIALS DUE TO PLATFORM USE, SERVICE USE, OR DOWNLOADING ANY MATERIAL POSTED ON IT, ITS APPS, OR LINKED SITES.`}
						</p>

						<p className='gray-color'>
							{`THE PLATFORM, INCLUDING ALL CONTENT AND SERVICES, IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES, EXPRESS OR IMPLIED. DVM Central, nor any associated with it, guarantees the completeness, security, reliability, quality, accuracy, or availability of the Platform or
							Services. Specifically, we do not warrant that the Platform or its services will be accurate, reliable, error-free, uninterrupted, that defects will be corrected, or that the Platform or servers are free of harmful components. WE HEREBY DISCLAIM ALL WARRANTIES, WHETHER EXPRESS,
							IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE. DVM Central does not warrant that the Platform will meet your requirements, will be secure, error-free, or that data and content
							provided will be accurate.`}
						</p>

						<h5>Limitation on Liability</h5>
						<p className='gray-color'>
							UNDER NO CIRCUMSTANCES WILL DVM Central, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES ARISING FROM YOUR USE OR INABILITY TO USE THE PLATFORM OR SERVICES, INCLUDING DIRECT, INDIRECT, SPECIAL, INCIDENTAL,
							CONSEQUENTIAL, OR PUNITIVE DAMAGES, REGARDLESS OF LEGAL THEORY, EVEN IF FORESEEABLE. Your only remedy is to discontinue using the Platform.
						</p>

						<p className='gray-color'>{`DVM Central's total liability to you for all claims, if any, will not exceed one hundred dollars ($100), acknowledging this cap as essential regardless of the remedy's effectiveness.`}</p>

						<h5>Jurisdictional Variance</h5>
						<p className='gray-color'>Certain jurisdictions may not allow the exclusion or limitation of certain warranties or damages, so some exclusions and limitations in these terms may not apply to you.</p>

						<h5>Indemnification</h5>
						<p className='gray-color'>
							{`By using the Platform, you commit to defend, indemnify, and protect DVM Central, its affiliates, and their service providers, officers, directors, employees, agents, and successors from any claims, damages, costs, liabilities, and expenses (including reasonable attorneys' fees) arising
							from your access or use of the Platform, misuse of materials or data obtained from the Platform, your contributions, any breach of these Terms, unlawful or unauthorized activities related to the Platform, or any usage not explicitly permitted by these Terms. DVM Central reserves the
							exclusive right you provide to manage the defense of any matter for which you are required to indemnify us.`}
						</p>

						<h5>Governing Law and Dispute Resolution</h5>
						<p className='gray-color'>
							{`The Platform and Services and any disputes or claims arising from or related to them (including non-contractual disputes or claims) are governed by Florida's laws, excluding its conflict of laws rules. Disputes are to be resolved exclusively through binding arbitration upon submission
							by the disputing party. Parties will first attempt to resolve disputes within 30 days of notification. If unresolved, arbitration through JAMS will proceed. This arbitration agreement waives the right to court trials or class actions. Disputes must be initiated within one year of the
							discovery of the claim.`}
						</p>

						<h5>Class Action Waiver</h5>
						<p className='gray-color'>
							You and DVM Central agree to bring claims in arbitration only on an individual basis and not as a plaintiff or class member in any purported class or representative action. The arbitrator will not have the authority to consolidate or hear claims on a class basis.
						</p>

						<h5>Waiver and Severability</h5>
						<p className='gray-color'>Failure by DVM Central to enforce any provision of these Terms does not waive our right to enforce it. If any provision is deemed unenforceable, it will be modified to the minimum extent necessary, leaving the remaining provisions intact.</p>

						<h5>Entire Agreement</h5>
						<p className='gray-color'>
							These Terms, Privacy Policy, and any referenced documents constitute the entire agreement between you and DVM Central regarding the Platform, superseding all prior agreements. Conflicts between these Terms and any corporate hospital group agreements are resolved by prioritizing the
							corporate agreement for relevant aspects, followed by these Terms.
						</p>

						<h5>Electronic Communications</h5>
						<p className='gray-color'>Communicating electronically with DVM Central by using the Platform or sending emails constitutes your consent to receive communications from us electronically, satisfying legal requirements for written communications.</p>

						<h5>Feedback and Comments</h5>
						<p className='gray-color'>DVM Central invites feedback about the Platform, these Terms, and the Privacy Policy. Feedback provided will not be treated as confidential and may be used at our discretion.</p>

						<h5>General Provisions</h5>
						<p className='gray-color'>
							{`Provisions in these Terms intended to persist after termination, such as those regarding indemnification, liability limits, or dispute resolution, shall remain valid after any termination of your access or use of the Platform or Services. DVM Central is not responsible for any delays
							or failures in performance or service delivery due to unforeseen forces, including natural disasters, public enemy actions, terrorism, civil unrest, actions of the United States or any state or local government, extraordinary natural events, telecommunications or internet failures, and
							other similar events. All documentation, agreements, notices, and communications between you and DVM Central may be delivered to you electronically, as allowed by law. You are encouraged to keep printed or electronic copies of all important documents for your records. The use of
							headings is for organizational purposes only and does not impact the interpretation of these Terms. The terms "include," "includes," and "including" are to be considered inclusive and followed by "without limitation."`}
						</p>
					</div>
				) : (
					<div className={`${styles.inner_wrapper} inner-sec-mt`}>
						<h5>Introduction</h5>
						<p className='gray-color'>
							Welcome to DVM Central, the online marketplace for veterinary products and supplies. These Terms and Conditions are designed to ensure a productive, secure, and reliable environment for the Platform’s users. By registering as a vendor on our platform, you agree to these terms, which
							govern your use of the DVM Central services and platform.
						</p>

						<h5>Acceptance of Terms of Use</h5>
						<p className='gray-color'>
							Carefully review the Terms of Use before using or accessing the Platform. By engaging with the Platform, you consent to abide by these Terms of Use and our Privacy Policy, found at{' '}
							<span>
								<Link href='/privacy-policy'>
									<a className='link'>Privacy Policy | DVMCentral</a>
								</Link>
							</span>
							You are not permitted to access or use our Platform if you disagree with our Terms of Use or Privacy Policy.
						</p>

						<h5>Platform Use and Services</h5>
						<p className='gray-color'>
							As a vendor on DVM Central, you are granted the opportunity to connect with a broad audience of buyers interested in veterinary products and supplies. It is your responsibility to manage order transactions, processing, and fulfillment efficiently and effectively. You must guarantee the
							quality, availability, and timely delivery of your products. DVM Central acts as an intermediary platform only.
						</p>

						<h5>Eligibility and Access</h5>
						<p className='gray-color'>
							{`The Platform is accessible to only authorized manufacturers, suppliers, and vendors of veterinary products and services. Access and usage of our Platform necessitate that you are at least eighteen (18) years old and reside within the United States of America ("U.S.") or Canada. By
							using our website and accessing the Platform and DVM Central Services, you confirm that you are legally capable of entering into a binding agreement with DVM Central and meet all the aforementioned eligibility criteria. Access or use of the Platform is not permitted if these conditions
							are not met.`}
						</p>

						<h5>Vendor Licensing Requirement</h5>
						<p className='gray-color'>
							All vendors must be verified license holders within their respective jurisdictions to sell veterinary products and supplies on DVM Central. This requirement ensures that all products offered on our platform meet the highest standards of quality and regulatory compliance.
						</p>

						<h5>Our Fees and Tax Policy</h5>
						<p className='gray-color'>
							{`According to our policy, you are liable to pay a 10% applicable fee whenever you use our Services. In case of a payment dispute, we can change the fee at any time without any limitation. It's important to note that at DVM Central, all transactions, charges, and fees are expressed in US
							currency. The fee is charged the moment we process the transaction.`}
						</p>

						<h5>Stripe Charges, Fee Policy, and Bank Transfer</h5>
						<p className='gray-color'>Vendors on DVM Central are subject to a transaction processing fee imposed by Stripe, amounting to 2.9% + 30 cents per transaction. This fee will be automatically deducted from the vendor’s account upon the completion of a transaction. </p>
						<p className='gray-color'>Vendors can also integrate their regular bank accounts to receive payments.</p>

						<h5>Note</h5>
						<p className='gray-color'>{`Vendors are directed to manually update the status of an order to "Delivered" once the product has successfully reached the customer, ensuring accurate record-keeping and customer satisfaction. The vendor will receive the payment after updating the status. `}</p>

						<h5>Intellectual Property Rights & Prohibited Uses</h5>
						<p className='gray-color'>
							Vendors must ensure that their product listings, images, and related content do not infringe on any intellectual property rights, including copyrights and trademarks. The platform must be used in compliance with all applicable laws and regulations and in a manner that does not damage
							or undermine the integrity of DVM Central or its community. Prohibited activities include, but are not limited to, illegal conduct, posting of harmful or offensive content, and any form of impersonation or fraud.
						</p>

						<h5>Submission Guidelines: Prohibited Contact Details</h5>
						<p className='gray-color'>
							To maintain the integrity and safety of our platform, vendors are strictly prohibited from including personal or business contact information on product images, in videos, or within submitted PDFs. This includes phone numbers, email addresses, websites, or social media handles.
							Violation of this policy will result in immediate termination of your vendor account. Ensure all submissions are compliant with our guidelines to avoid any disruptions to your account status.
						</p>

						<h5>Account Security and Management</h5>
						<p className='gray-color'>
							To use the Platform, you may need to set up a username, password, and account. This information is confidential and must not be shared with any third parties. Notify us immediately if you suspect unauthorized use of your username or password or any other security breach. Always log out
							at the end of your session, especially when using a computer not affiliated with your veterinary practice, to prevent unauthorized access to your account information. Despite any contrary provisions, you are responsible for maintaining the confidentiality of your account and password
							and for restricting access to your account and computer, accepting responsibility for all activities that occur under your account.
						</p>

						<h5>Account Suspension and Termination</h5>
						<p className='gray-color'>Repeated complaints or failure to adhere to our Terms and Conditions may result in account suspension or termination. DVM Central prioritizes maintaining a trustworthy and safe platform and will take necessary actions to protect its users and integrity.</p>

						<h5>Vendor and Buyer Relationship Disclaimer </h5>
						<p className='gray-color'>
							{`DVM Central disclaims any and all liability for damages, losses, claims, or disputes that may arise between vendors and buyers. We encourage both vendors and buyers to research and understand one another before engaging in any transactions on our Platform. By using our Platform and Services, you acknowledge and accept this disclaimer.`}
						</p>

						<h5>Applications</h5>
						<p className='gray-color'>
							DVM Central may offer mobile applications to access the platform. Vendors using these applications are granted a limited, non-exclusive, and revocable license for business use linked to their accounts. All rights not expressly granted to you are reserved by DVM Central and its
							licensors. You agree to comply with all application updates and U.S. and foreign export laws.
						</p>

						<h5>Enforcement and Monitoring</h5>
						<ol>
							<li className={`${styles.numb} semibold-text`}>
								<p>
									<span className='semibold-text black-color'>Compliance Obligations</span>: <span className='gray-color'>As a vendor on DVM Central, you are required to adhere to all applicable laws, regulations, and the terms outlined in this agreement.</span>
								</p>
							</li>

							<li className={`${styles.numb} semibold-text`}>
								<p>
									<span className='semibold-text black-color'>Monitoring: </span>
									<span className='gray-color'>DVM Central reserves the right to monitor vendor activities on the platform to ensure compliance with platform policies, including but not limited to product listings, communications with customers, and adherence to community standards.</span>
								</p>
							</li>

							<li className={`${styles.numb} semibold-text`}>
								<p>
									<span className='semibold-text black-color'>Reporting Violations: </span>
									<span className='gray-color'>Vendors are encouraged to promptly report any violations of the Terms and Conditions, including instances of fraudulent activities, intellectual property infringement, or breaches of community standards.</span>
								</p>
							</li>

							<li className={`${styles.numb} semibold-text`}>
								<p>
									<span className='semibold-text black-color'>Investigations: </span>
									<span className='gray-color'>Upon receiving reports of violations, DVM Central will conduct thorough investigations. In cases where violations are substantiated, DVM Central reserves the right to suspend or terminate vendor accounts pending investigation.</span>
								</p>
							</li>

							<li className={`${styles.numb} semibold-text`}>
								<p>
									<span className='semibold-text black-color'>Remedial Actions: </span>
									<span className='gray-color'>
										Violations of the Terms and Conditions may result in various consequences, including but not limited to account suspension, termination, or financial penalties. DVM Central will determine the appropriate action based on the severity and nature of the violation.
									</span>
								</p>
							</li>

							<li className={`${styles.numb} semibold-text`}>
								<p>
									<span className='semibold-text black-color'>Appeals Process: </span>
									<span className='gray-color'>Vendors have the right to appeal any enforcement actions taken against them. The appeals process will be clearly outlined, including the steps and timeline for resolution.</span>
								</p>
							</li>

							<li className={`${styles.numb} semibold-text`}>
								<p>
									<span className='semibold-text black-color'>Education and Training: </span>
									<span className='gray-color'>DVM Central is committed to supporting vendors in understanding and complying with the Terms and Conditions. Resources, training materials, and guidance will be provided to assist vendors, including updates or changes to platform policies.</span>
								</p>
							</li>

							<li className={`${styles.numb} semibold-text`}>
								<p>
									<span className='semibold-text black-color'>Third-Party Verification: </span>
									<span className='gray-color'>DVM Central reserves the right to conduct third-party audits or verifications of vendor compliance with the Terms and Conditions. Vendors agree to cooperate fully with such audits.</span>
								</p>
							</li>

							<li className={`${styles.numb} semibold-text`}>
								<p>
									<span className='semibold-text black-color'>Data Privacy and Security: </span>
									<span className='gray-color'>{`All monitoring activities will comply with applicable data privacy laws and regulations. Vendor data will be handled and protected in accordance with DVM Central's privacy policy.`}</span>
								</p>
							</li>

							<li className={`${styles.numb} semibold-text`}>
								<p>
									<span className='semibold-text black-color'>Continuous Improvement: </span>
									<span className='gray-color'>DVM Central is dedicated to continuously reviewing and updating the enforcement and monitoring processes to adapt to evolving threats, technologies, and regulatory requirements.</span>
								</p>

								<p className='gray-color'>By agreeing to these Terms and Conditions, vendors acknowledge and accept their obligations regarding enforcement and monitoring on DVM Central.</p>
							</li>
						</ol>

						<h5>Changes to Terms and Conditions</h5>
						<p className='gray-color'>
							DVM Central reserves the right to modify or update these Terms and Conditions at any time without prior notice. Such modifications will be effective immediately upon posting on our platform. Your continued use of our services following any such changes will constitute your acceptance
							of the new Terms and Conditions. We encourage vendors to review these terms regularly to ensure compliance.
						</p>

						<p className='gray-color'>Thank you for choosing DVM Central as your platform for connecting with the veterinary community.</p>
					</div>
				)}
			</div>
		</section>
	)
}

export default TermsAndConditions

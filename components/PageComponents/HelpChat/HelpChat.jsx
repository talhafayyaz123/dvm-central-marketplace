import React, { useContext, useState } from 'react'
import styles from './HelpChat.module.css'
import HelpChatModal from '../../UI/HelpChatModal/HelpChatModal'
import { useSession } from 'next-auth/react'
import { GlobalProvider } from '../../../context/AppProvider'
// import Image from 'next/image'
// import operator from '../../../public/imgs/home/operator.png'

const HelpChat = () => {
	const { chatModal, setChatModal, messages, setMessages } = useContext(GlobalProvider)

	const { data: session } = useSession()

	const [needHelp, setneedHelp] = useState(true)

	return (
		<div className={styles.chat_Wrapper}>
			{/* help chat text */}
			<div className={`${styles.help_text} shadow transition ${needHelp ? 'show-bd' : 'hide-bd'}`}>
				<div className={`${styles.close_slogan} white-bg full-radius`} onClick={() => setneedHelp(false)}>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className={styles.close_btn}>
						<path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
					</svg>
				</div>
				{/* <div>
					<Image src={operator} alt='need help' />
				</div> */}

				<div className={styles.slogan_wrapper}>
					<h5 className={styles.need_help_txt}>Need help?</h5>

					<p>Our staff is ready to help</p>
				</div>
			</div>
			{/* help chat button */}
			<div className={styles.help_Container}>
				<div className={`${styles.help_Button}  full-radius`} onClick={() => (setChatModal(true), setneedHelp(false))}>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className={styles.help_svg}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
						/>
					</svg>
				</div>
			</div>
			{/* help chat modal */}
			<HelpChatModal session={session} chatModal={chatModal} messages={messages} setMessages={setMessages} setChatModal={setChatModal} />
		</div>
	)
}

export default HelpChat

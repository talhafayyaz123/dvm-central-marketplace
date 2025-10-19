import React, { useEffect, useRef, useState } from 'react'
import styles from './HelpChatModal.module.css'
import axios from 'axios'
import { helpchaturl } from '../../../utils/config'
import { deletechatfunc } from '../../../utils/deletechatfunc'

const HelpChatModal = ({ session, chatModal, messages, setMessages, setChatModal }) => {
	const emailref = useRef(null)
	const sendmsgref = useRef(null)

	const [emailError, setEmailError] = useState('')

	const [inputFocus, setinputFocus] = useState(false)
	const [inputmsgFocus, setinputmsgFocus] = useState(false)

	const [emailSubmitted, setEmailSubmitted] = useState(false)
	const [newChatMsg, setnewChatMsg] = useState('')

	const [sendingMsg, setsendingMsg] = useState(false)
	const [isDisabled, setIsDisabled] = useState(false)

	// email validation
	const handleEmailValidation = (email) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/
		return emailRegex.test(email)
	}

	// Handle SVG click to save email
	const handleSvgClick = () => {
		const email = emailref.current?.value
		if (!email) {
			setEmailError('required')
		} else if (!handleEmailValidation(email)) {
			setEmailError('invalid email')
		} else {
			localStorage.setItem('dvm_chat_user_email', email)
			setEmailError('')
			setEmailSubmitted(true)
		}
	}

	// chat func

	const hanldeChat = async () => {
		if (newChatMsg.trim().length === 0) return

		setnewChatMsg('')
		setIsDisabled(true)

		setsendingMsg(true)
		setEmailError('')

		setTimeout(() => {
			const chat = document.querySelector('.chat-group-wrapper')
			chat.scrollTop = chat.scrollHeight
		}, 0)

		const userEmail = session ? session?.user?.email || session?.email : localStorage.getItem('dvm_chat_user_email')
		const userMessage = newChatMsg.trim()
		setMessages((prev) => [...prev, { type: 'sender', text: userMessage }])

		const body = {
			question: newChatMsg,
			user_id: userEmail
		}

		try {
			const res = await axios.post(`${helpchaturl}/chatbot`, body)

			const updatedMessages = [...messages, { type: 'sender', text: newChatMsg }, { type: 'receiver', text: res?.data?.answer }]
			setMessages(updatedMessages)

			// Save messages to localStorage
			localStorage.setItem('dvm_chat_messages', JSON.stringify(updatedMessages))
		} catch (error) {
			setsendingMsg(false)
			setIsDisabled(false)
		} finally {
			setsendingMsg(false)
			setIsDisabled(false)
		}

		if (!session && !emailSubmitted) {
			setEmailSubmitted(true)
		}

		setTimeout(() => {
			const chat = document.querySelector('.chat-group-wrapper')
			chat.scrollTop = chat.scrollHeight
		}, 0)
	}

	const onDelete = async () => {
		deletechatfunc(session, setChatModal, setMessages)

		setnewChatMsg('')
		setEmailSubmitted(false)

		setsendingMsg(false)

		setChatModal(false)
	}

	// focus email
	useEffect(() => {
		if (chatModal && emailref.current) {
			setTimeout(() => {
				emailref.current.focus()
			}, 300)
		}
	}, [chatModal])

	useEffect(() => {
		const savedMessages = localStorage.getItem('dvm_chat_messages')

		if (savedMessages) {
			setMessages(JSON.parse(savedMessages))
			setTimeout(() => {
				const chat = document.querySelector('.chat-group-wrapper')
				chat.scrollTop = chat.scrollHeight
			}, 100)
		}
	}, [])

	useEffect(() => {
		if (localStorage.getItem('dvm_chat_user_email') || session?.user?.email) {
			setTimeout(() => {
				sendmsgref.current.focus()
			}, 300)
		}
	}, [chatModal, emailSubmitted])

	return (
		<div className={`${styles.chat_Modal} shadow transition ${chatModal ? 'show-bd' : 'hide-bd'}`}>
			<div className={styles.close_wrapper}>
				<p className={styles.chat_Header}>AI Chat </p>
				<div
					className={styles.close_Button}
					onClick={() => {
						onDelete()
					}}
				>
					<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className={styles.close_btn}>
						<path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
					</svg>
				</div>
			</div>
			<div className={styles.chat_Body}>
				<div className={` ${styles.questions_wrapper} chat-group-wrapper`}>
					{!session && !emailSubmitted && !localStorage.getItem('dvm_chat_user_email') && (
						<div className={styles.email_wrapper}>
							<div className={styles.error_msg}>
								<label className={styles.email_label}>Enter Email : </label>
								{emailError && <div className={styles.error_message}>{emailError}</div>}
							</div>
							<div className={`${styles.input_wrapper}  ${inputFocus ? styles.focus_border : 'gray-border'}`} onFocus={() => setinputFocus(true)} onBlur={() => setinputFocus(false)}>
								<input
									ref={emailref}
									className='gray-color'
									type='search'
									placeholder='Enter Your Email'
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleSvgClick()
										}
									}}
								/>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' classname='size-6' onClick={handleSvgClick}>
									<path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
								</svg>
							</div>
						</div>
					)}

					{/* messages */}
					{messages?.length > 0
						? messages?.map((message, index) => (
								<div key={index} className={message.type === 'sender' ? styles.sender_Message : styles.receiver_Message}>
									{message?.type === 'receiver' ? <div className={styles.ai_text} dangerouslySetInnerHTML={{ __html: message?.text }} /> : <p>{message?.text}</p>}
								</div>
						  ))
						: (localStorage.getItem('dvm_chat_user_email') || session?.user?.email || session?.email) && (
								<div className={styles.welcome}>
									<h5>Welcome to DVM Central</h5>
									<p className='gray-color'>I’m your AI assistant. How can I help you today?</p>
								</div>
						  )}
					{sendingMsg && (
						<div className={`gray-color ${styles.loader_wrapper}`}>
							Anna is typing
							<div className={styles.loader} />
						</div>
					)}
				</div>
			</div>

			{/* message input */}
			{(session?.user?.email || session?.email || localStorage.getItem('dvm_chat_user_email')) && (
				<div className={styles.input_outer_wrapper}>
					<div className={`${styles.input_wrapper} ${inputmsgFocus ? styles.focus_border : 'gray-border'}`} onFocus={() => setinputmsgFocus(true)} onBlur={() => setinputmsgFocus(false)}>
						<input
							className='gray-color'
							type='search'
							placeholder='Type Something...'
							ref={sendmsgref}
							value={newChatMsg}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !isDisabled) {
									hanldeChat()
								}
							}}
							onChange={(e) => setnewChatMsg(e.target.value)}
						/>

						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							classname='size-6'
							onClick={() => {
								if (!isDisabled && newChatMsg.trim() !== '') {
									hanldeChat()
								}
							}}
							style={isDisabled ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
						>
							<path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
						</svg>
					</div>
				</div>
			)}
		</div>
	)
}

export default HelpChatModal

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import HeaderIcons from './HeaderIcons/HeaderIcons'
import styles from './MainNavigation.module.css'
import SearchInput from '../SearchInput/SearchInput'
import dvmLogo from '/public/icons/dvm-logo.svg'

const MainNavigation = ({ setmodal, setModalData, closeSearchHanlder }) => {
	return (
		<header className={`${styles.header_container} white-bg`}>
			<div className={`${styles.header_wrapper} sec-container`}>
				{/* logo */}
				<Link href='/'>
					<a className={styles.logo}>
						<Image priority src={dvmLogo} alt='DVM Central' width={200} height={50} />
					</a>
				</Link>

				{/* {loginUser?.type && loginUser?.type !== 'admin' && ( */}
				<div className={styles.desktop_search_container}>
					<SearchInput setmodal={setmodal} setModalData={setModalData} closeSearchHanlder={closeSearchHanlder} type='desktop' />
				</div>
				{/* )} */}
				<HeaderIcons />
			</div>
		</header>
	)
}

export default MainNavigation

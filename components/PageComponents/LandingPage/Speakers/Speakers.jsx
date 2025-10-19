import React from 'react'
import styles from './Speakers.module.css'
import HeadingBoxes from '../HeadingBoxes/HeadingBoxes'
import bgImg from '../../../../public/landing-page/background/appbg.jpg'
import Image from 'next/image'
import Link from 'next/link'
import SpeakerCard from '../../../UI/SpeakerCard/SpeakerCard'
import { imgApiUrl } from '../../../../utils/config'

const Speakers = ({ speakers }) => {
	return (
		<section id='speakers' className='speakers sec-p'>
			<div className={styles.bg_wrapper}>
				<Image src={bgImg} alt='VetandTech' />
			</div>
			<div className='sec-container'>
				<div className={`${styles.heading_container} lp-heading-container`}>
					<h4 className='lp-sml-heading'>
						<HeadingBoxes />
						Our Speakers
					</h4>
					<h2 className='lp-heading-wrapper'>
						Learn With Our <span>Influential Speakers</span>
					</h2>
				</div>

				<div className={`${styles.speakers_wrapper} inner-sec-m`}>
					{speakers.map((speaker) => {
						const { profile, first_name, last_name, practice_role, institute } = speaker
						return <SpeakerCard key={speaker.id} src={`${imgApiUrl.speakers.img}/${profile}`} name={`${first_name} ${last_name}`} role={practice_role} institute={institute} />
					})}
				</div>
				<div className={styles.btn_wrapper}>
					<Link href='#'>
						<a>
							<button className='lp-btn'>View All</button>
						</a>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default Speakers

import React from 'react'
import styles from './AdditionalInfo.module.css'

const AdditionalInfo = ({ data, variationType }) => {
	let value = Object.values(data)

	return (
		<div>
			{value[0] && <h5>Product Information</h5>}
			{value[0] && (
				<div className={styles.additional_info}>
					{value[0] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Item Type</div>
							<h3 className={styles.info}>{value[0] ? value[0] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[1] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Therapeutic Specialty</div>
							<h3 className={styles.info}>{value[1] ? value[1] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[2] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Instrument Length</div>
							<h3 className={styles.info}>{value[2] ? value[2] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[3] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Tip Size/ Sr No</div>
							<h3 className={styles.info}>{value[3] ? value[3] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[4] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Curvature</div>
							<h3 className={styles.info}>{value[4] ? value[4] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[5] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Handle Type</div>
							<h3 className={styles.info}>{value[5] ? value[5] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[6] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Material</div>
							<h3 className={styles.info}>{value[6] ? value[6] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[7] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>{`Material (Secondary)`}</div>
							<h3 className={styles.info}>{value[7] ? value[7] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[8] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Usage</div>
							<h3 className={styles.info}>{value[8] ? value[8] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[9] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Sterility</div>
							<h3 className={styles.info}>{value[9] ? value[9] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[10] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Grade</div>
							<h3 className={styles.info}>{value[10] ? value[10] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[11] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>Unit of Measure</div>
							<h3 className={styles.info}>{value[11] ? value[11] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
					{value[12] && (
						<div className={styles.wrapper}>
							<div className={styles.title}>TradeMark</div>
							<h3 className={styles.info}>{value[12] ? value[12] : variationType ? 'Select variation' : 'N/A'}</h3>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default AdditionalInfo

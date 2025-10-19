import React from 'react'
import styles from './InfoCol.module.css'
import InfoDetail from './InfoDetail/InfoDetail'
import SellerDetail from './SellerDetail/SellerDetail'

const InfoCol = ({ data, setshowHelpVideo, setvideoSrc }) => {
	return (
		<div className={styles.info_wrapper}>
			<InfoDetail setshowHelpVideo={setshowHelpVideo} setvideoSrc={setvideoSrc} />
			<SellerDetail data={data} />
		</div>
	)
}

export default InfoCol

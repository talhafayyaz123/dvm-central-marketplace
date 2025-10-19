import React from 'react'

const OurMission = ({ mission }) => {
	return <div className='inner-sec-mt dynamic-data sec-mb'>{mission !== undefined && <div dangerouslySetInnerHTML={{ __html: mission?.content }} />}</div>
}

export default OurMission

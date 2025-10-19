import React from 'react'
import styles from './NewTwitterIcon.module.css'

const NewTwitterIcon = ({ className, type, twitterShare }) => {
	return (
		<a className={`${styles.twitter_icon} ${className} ${type === 'social-share' ? styles.share_icon : undefined}`} href={twitterShare ? twitterShare : 'https://twitter.com/DvmCentral'} target='_blank' rel='noreferrer' aria-label='Visit our Twitter page'>
			<svg xmlns='http://www.w3.org/2000/svg' shapeRendering='geometricPrecision' textRendering='geometricPrecision' imageRendering='optimizeQuality' fillRule='evenodd' clipRule='evenodd' viewBox='0 0 512 462.799'>
				<path fillRule='nonzero' d='M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z' />
			</svg>
		</a>
	)
}

export default NewTwitterIcon

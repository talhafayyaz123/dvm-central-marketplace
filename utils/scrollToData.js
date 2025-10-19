// scroll to an element
const scrollToData = (g, ref, offset, duration) => {
	g.to(window, { duration: duration ? duration : 0.6, scrollTo: { y: ref, offsetY: offset, ease: 'expo.out' } })
}

export default scrollToData

// scroll to an element
const scrollToData = (g, ref, offsetY) => {
	g.to(window, { duration: 0.6, scrollTo: { y: ref, offsetY: offsetY ? offsetY : 100, ease: 'expo.out' } })
}

export { scrollToData }

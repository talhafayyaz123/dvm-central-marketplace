const touchStartHandler = (ref) => {
	Array.from(ref?.querySelectorAll('.swiper-slide')).forEach((slide) => {
		slide.classList.add('swiper-drag')
	})
}

const touchEndHandler = (ref) => {
	Array.from(ref?.querySelectorAll('.swiper-slide')).forEach((slide) => {
		slide.classList.remove('swiper-drag')
	})
}

export { touchStartHandler, touchEndHandler }

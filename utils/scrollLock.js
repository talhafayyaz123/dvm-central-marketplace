const lockScroll = () => {
	if (document !== 'undefined') {
		document.body.style.overflowY = 'hidden'
	}
}

const unlockScroll = () => {
	if (document !== 'undefined') {
		document.body.style.overflowY = 'initial'
	}
}

const elLockScroll = (el) => {
	if (el) {
		el.style.overflowY = 'hidden'
	}
}

const elUnlockScroll = (el) => {
	if (el) {
		el.style.overflowY = 'auto'
	}
}

export { lockScroll, unlockScroll, elLockScroll, elUnlockScroll }

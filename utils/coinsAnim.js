import { gsap as g } from 'gsap/dist/gsap'

const coinsAnim = async (oldVal, newVal) => {
	// const { data: session } = useSession()

	const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

	if (typeof window !== 'undefined' && !noMotion) {
		const coinTl = g.timeline()
		const coins = document.querySelector('.coins-badge')

		if (coins) {
			coinTl
				.add(() => (coins.parentElement.style.zIndex = 100))
				.to('.coins-badge', {
					y: 10,
					scale: 3,
					ease: 'expo.inOut',
					duration: 1.5
				})
				.fromTo(
					'.coins-anim svg',
					{
						y: -100,
						autoAlpha: 1
					},
					{
						y: 0,
						autoAlpha: 0,
						stagger: 0.1
					},
					'<50%'
				)
				.fromTo(
					'.coins-badge',
					{
						innerText: oldVal
					},
					{
						innerText: newVal,
						duration: 3,
						ease: 'expo.inOut',
						snap: {
							innerText: 1
						},
						onComplete: () => {
							g.to('.coins-badge', {
								y: 0,
								scale: 0,
								ease: 'expo.in',
								duration: 1.5,
								onComplete: () => {
									;(coins.parentElement.style.zIndex = 1), (coins.innerText = newVal.toString().length > 5 ? Number(newVal?.toString()?.slice(0, 5)) + '...' : newVal)
								}
							})
						}
					}
				)
				.set(
					'.coins-text',
					{
						innerText: newVal
					},
					'<50%'
				)

			return coinTl
		}
	}
}

export default coinsAnim

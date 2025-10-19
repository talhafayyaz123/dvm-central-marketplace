export const phoneFormat = (number) => {
	if (number?.toString()?.length < 4) return number
	if (number?.toString()?.length < 7) return number.replace(/(\d{3})(\d{1})/, '$1-$2')
	if (number?.toString()?.length < 11) return number.replace(/(\d{3})(\d{3})(\d{1})/, '$1-$2-$3')
	return number?.toString()?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
}

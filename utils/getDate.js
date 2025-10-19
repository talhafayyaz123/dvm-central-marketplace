const dateOptions = {
	year: 'numeric',
	month: 'short',
	day: 'numeric'
}
// const getDate = (created_at) => new Date(created_at).toLocaleString('en-us', dateOptions)

const getDate = (created_at) => new Intl.DateTimeFormat('en-us', dateOptions).format(new Date(created_at))

export default getDate

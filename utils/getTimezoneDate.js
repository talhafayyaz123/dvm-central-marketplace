const getTimezoneDate = (date_time) => {
	const time = new Date(date_time),
		timeZoneOffset = new Date(date_time).getTimezoneOffset(),
		localTime = new Date(time.getTime() - timeZoneOffset * 60000).toLocaleTimeString(),
		localTime12HoursBase =
			localTime.slice(0, 2) > 12
				? localTime.slice(0, 2) - 12 === 0
					? 12 + localTime.slice(2)
					: localTime.slice(0, 2) - 12 < 10
					? `0${localTime.slice(0, 2) - 12}${localTime.slice(2)}`
					: localTime.slice(0, 2) - 12 === 11 || localTime.slice(0, 2) - 12 === 10
					? `${localTime.slice(0, 2) - 12}${localTime.slice(2)}`
					: `12${localTime.slice(2)}`
				: localTime,
		date = date_time?.slice(0, 12),
		pmAm = localTime?.slice(0, 2) < 12 ? 'AM' : 'PM'

	return [date, localTime12HoursBase, pmAm]
}

export default getTimezoneDate

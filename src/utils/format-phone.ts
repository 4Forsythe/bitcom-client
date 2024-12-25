export const formatPhone = (value: string) => {
	if (!value) return value

	let number = value.replace(/[^\d]/g, '')

	if (number.length === 0) return ''

	if (number[0] !== '8') {
		number = '8' + number
	}

	const length = number.length

	if (length === 1) return number
	if (length < 5) {
		return `${number[0]} (${number.slice(1)}`
	}
	if (length < 8) {
		return `${number[0]} (${number.slice(1, 4)}) ${number.slice(4)}`
	}
	if (length < 11) {
		return `${number[0]} (${number.slice(1, 4)}) ${number.slice(4, 7)} ${number.slice(7)}`
	}

	return `${number[0]} (${number.slice(1, 4)}) ${number.slice(4, 7)} ${number.slice(7, 9)}-${number.slice(9, 11)}`
}

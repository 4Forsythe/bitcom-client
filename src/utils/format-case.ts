export function formatCase(str: string) {
	const isAllUpperCase = str === str.toUpperCase()

	if (isAllUpperCase) {
		str = str.toLowerCase()
		str = str.charAt(0).toUpperCase() + str.slice(1)
	}

	return str
}

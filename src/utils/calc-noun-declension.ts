export function calcNounDeclension(
	count: number,
	nominative: string,
	genitiveSingular: string,
	genitivePlural: string
): string {
	const lastTwoDigits = count % 100
	const lastDigit = count % 10

	let word
	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		word = genitivePlural
	} else if (lastDigit === 1) {
		word = nominative
	} else if (lastDigit >= 2 && lastDigit <= 4) {
		word = genitiveSingular
	} else {
		word = genitivePlural
	}

	return `${count} ${word}`
}

export const calcReadingTime = (text: string): number => {
	const wordsPerMinute = 200 / 2
	const words = text.split(/\s+/).length
	const readingTimeMinutes = Math.ceil(words / wordsPerMinute)

	return readingTimeMinutes
}

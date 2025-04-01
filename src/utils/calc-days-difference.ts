export function calcDaysDifference(
	timestamp: string,
	difference: number
): number {
	const now = new Date()
	const createdAt = new Date(timestamp)

	const msOffset = now.getTime() - createdAt.getTime()
	const daysOffset = Math.floor(msOffset / (1000 * 60 * 60 * 24))

	const timeLeft = difference - daysOffset

	return timeLeft > 0 ? timeLeft : 0
}

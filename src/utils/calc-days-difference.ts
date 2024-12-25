export function calcDaysDifference(
	timestamp: string,
	difference: number
): number {
	const now = new Date()
	const createdAt = new Date(timestamp)

	const offset = Math.floor(now.getDay() - createdAt.getDay())
	const days = difference - offset

	return days > 0 ? days : 0
}

export function calcActionCountdown(timestamp: string): number {
	const today = new Date()
	today.setHours(0, 0, 0, 0)

	const target = new Date(timestamp)
	target.setHours(0, 0, 0, 0)

	const difference = target.getTime() - today.getTime()

	const result = Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1

	return result
}

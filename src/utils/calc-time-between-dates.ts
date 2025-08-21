import { calcNounDeclension } from './calc-noun-declension'

export function calcTimeBetweenDates(start: Date, end: Date): string | 0 {
	const diff = start.getTime() - end.getTime()

	if (diff <= 0) {
		return 0
	}

	const hours = Math.floor(diff / (1000 * 60 * 60))
	const days = Math.floor(diff / (1000 * 60 * 60 * 24))
	const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))

	if (weeks >= 1) return calcNounDeclension(weeks, 'неделя', 'недели', 'недель')
	if (days >= 1) return calcNounDeclension(days, 'день', 'дня', 'дней')
	if (hours >= 1) return calcNounDeclension(hours, 'час', 'часа', 'часов')

	return 0
}

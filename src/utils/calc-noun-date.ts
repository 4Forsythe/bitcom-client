import { calcNounDeclension } from './calc-noun-declension'

export const calcNounDate = (iso: string) => {
	const date = new Date(iso)
	const now = new Date()

	const milliseconds = now.getTime() - date.getTime()
	const seconds = milliseconds / 1000
	const minutes = seconds / 60
	const hours = minutes / 60
	const days = hours / 24
	const weeks = days / 7
	const months = days / 30

	if (months >= 1) {
		return months >= 2 ? 'более месяца назад' : 'менее месяца назад'
	} else if (weeks >= 1) {
		return `${calcNounDeclension(Math.floor(weeks), 'неделю', 'недели', 'недель')} назад`
	} else if (days >= 1) {
		return `${calcNounDeclension(Math.floor(days), 'день', 'дня', 'дней')} назад`
	} else if (hours >= 1) {
		return `${calcNounDeclension(Math.floor(hours), 'час', 'часа', 'часов')} назад`
	} else if (minutes >= 1) {
		return `${calcNounDeclension(Math.floor(minutes), 'минуту', 'минуты', 'минут')} назад`
	} else {
		return 'только что'
	}
}

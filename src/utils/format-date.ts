export const formatDate = (iso: string) => {
	const date = new Date(iso)

	return date.toLocaleString('ru-RU', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	})
}

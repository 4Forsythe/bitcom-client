const BASE_URL = process.env.BASE_URL

export async function getPrices() {
	const response = await fetch(BASE_URL + '/api/price-list', {
		next: { revalidate: 60 }
	})

	if (!response.ok) {
		console.error('Не удалось получить прайс-листы', response.statusText)
		return []
	}

	const data: string[] = await response.json()

	return data
}

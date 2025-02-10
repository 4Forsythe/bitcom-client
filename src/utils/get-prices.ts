const BASE_URL = process.env.BASE_URL

export async function getPrices() {
	if (process.env.NODE_ENV === 'production') {
		return []
	}

	const response = await fetch(BASE_URL + '/api/price-list', {
		next: { revalidate: 60 }
	})

	if (!response.ok) {
		throw new Error('Не удалось получить прайс-листы')
	}

	const data: string[] = await response.json()

	return data
}

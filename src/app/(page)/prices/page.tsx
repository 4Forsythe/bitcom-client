import type { Metadata } from 'next'

import { Prices } from './prices'
import { Breadcrumb } from '@/components'
import { ROUTE } from '@/config/routes.config'

export const metadata: Metadata = {
	title: 'Прайс-листы',
	description:
		'Здесь размещены все настоящие и актуальные прайс-листы компании «БитКом».'
}

const BASE_URL = process.env.BASE_URL

export default async function PricesPage() {
	const response = await fetch(BASE_URL + '/api/price-list', {
		next: { revalidate: 300 }
	})

	if (!response.ok) {
		throw new Error('Не удалось получить прайс-листы')
	}

	const prices: string[] = await response.json()

	return (
		<>
			<Breadcrumb
				value='Прайс-листы'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<Prices items={prices} />
		</>
	)
}

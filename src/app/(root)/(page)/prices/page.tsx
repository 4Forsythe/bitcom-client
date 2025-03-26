import type { Metadata } from 'next'

import { ROUTE } from '@/config/routes.config'

import { Prices } from './prices'
import { Breadcrumb } from '@/components'
import { getPrices } from '@/utils/get-prices'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Прайс-листы',
	description:
		'Здесь размещены все настоящие и актуальные прайс-листы товаров и услуг компании «БитКом».'
}

export default async function PricesPage() {
	const data = await getPrices()

	if (!data || !data.length) {
		return notFound()
	}

	return (
		<>
			<Breadcrumb
				value='Прайс-листы'
				items={[{ href: ROUTE.HOME, value: 'Главная' }]}
			/>
			<Prices items={data} />
		</>
	)
}

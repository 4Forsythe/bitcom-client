import type { Metadata } from 'next'

import { Prices } from './prices'
import { Breadcrumb } from '@/components'
import { ROUTE } from '@/config/routes.config'
import { getPrices } from '@/utils/get-prices'

export const metadata: Metadata = {
	title: 'Прайс-листы',
	description:
		'Здесь размещены все настоящие и актуальные прайс-листы товаров и услуг компании «БитКом».'
}

export default async function PricesPage() {
	const prices = await getPrices()

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
